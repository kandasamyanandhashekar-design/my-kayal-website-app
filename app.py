from flask import Flask, render_template, request, redirect, url_for, flash, send_from_directory, jsonify
import json
import os
import re
import threading
import logging
from datetime import datetime

import asyncio
import aiohttp                                         
from dotenv import load_dotenv

app = Flask(__name__)
app.secret_key = "change-this-in-production"

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
JSON_FILE = os.path.join(BASE_DIR, "contacts.json")

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
log = logging.getLogger("kayal")

FILE_LOCK = threading.Lock()


# ---------- Load WhatsApp credentials from .env ----------
load_dotenv(os.path.join(BASE_DIR, ".env"))

app.config["VERSION"]         = os.getenv("VERSION", "v18.0")
app.config["PHONE_NUMBER_ID"] = os.getenv("PHONE_NUMBER_ID")
app.config["ACCESS_TOKEN"]    = os.getenv("ACCESS_TOKEN")
app.config["COMPANY_NUMBER"]  = os.getenv("COMPANY_NUMBER")
app.config["VERIFY_TOKEN"]    = os.getenv("VERIFY_TOKEN")
log.info(f"🔑 VERIFY_TOKEN loaded = {app.config['VERIFY_TOKEN']!r}")


if all([app.config["PHONE_NUMBER_ID"],
        app.config["ACCESS_TOKEN"],
        app.config["COMPANY_NUMBER"]]):
    log.info("📱 WhatsApp credentials loaded from .env")
else:
    log.warning("⚠️  Missing WhatsApp credentials in .env — WhatsApp disabled")


# ---------- WhatsApp sender ----------         ← FIX 2: added function
async def send_whatsapp_message(to_number, body):
    """Send a plain text WhatsApp message via Meta Cloud API."""
    headers = {
        "Content-type": "application/json",
        "Authorization": f"Bearer {app.config['ACCESS_TOKEN']}",
    }
    url = (
        "https://graph.facebook.com"
        f"/{app.config['VERSION']}"
        f"/{app.config['PHONE_NUMBER_ID']}/messages"
    )
    payload = json.dumps({
        "messaging_product": "whatsapp",
        "to": to_number,
        "type": "text",
        "text": {"body": body}
    })

    async with aiohttp.ClientSession() as session:
        async with session.post(url, data=payload, headers=headers) as response:
            text = await response.text()
            print(f"[WhatsApp] {response.status} | {text}")
            return response.status, text


def build_whatsapp_message(record):
    """Format a saved contact record as a WhatsApp message."""
    return (
        f"📩 *New Website Inquiry* (#{record.get('id', '—')})\n"
        f"━━━━━━━━━━━━━━━━━━━━\n"
        f"👤 *Name:* {record.get('name') or '—'}\n"
        f"📧 *Email:* {record.get('email') or '—'}\n"
        f"📱 *Phone:* {record.get('phone') or '—'}\n"
        f"📌 *Subject:* {record.get('subject') or '—'}\n"
        f"━━━━━━━━━━━━━━━━━━━━\n"
        f"💬 *Message:*\n{record.get('message') or '—'}\n"
        f"━━━━━━━━━━━━━━━━━━━━\n"
        f"🕒 {record.get('created', '—')}"
    )


def notify_whatsapp(record):
    """Send ONLY the given record to WhatsApp. Safe to call from sync code."""
    number = app.config.get("COMPANY_NUMBER")
    if not number:
        log.warning("⚠️  COMPANY_NUMBER missing — skipping WhatsApp")
        return
    message = build_whatsapp_message(record)
    try:
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        try:
            loop.run_until_complete(send_whatsapp_message(number, message))
            log.info(f"📱 WhatsApp sent for record #{record.get('id')}")
        finally:
            loop.close()
    except Exception as e:
        log.error(f"❌ WhatsApp send failed: {e}")


# ---------- JSON Storage ----------
def init_json():
    if not os.path.exists(JSON_FILE):
        with open(JSON_FILE, "w", encoding="utf-8") as f:
            json.dump([], f, indent=4)


def read_contacts():
    try:
        with open(JSON_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        return []


def save_contact(entry):
    with FILE_LOCK:
        try:
            contacts = read_contacts()
            new_id = (max(c.get("id", 0) for c in contacts) + 1) if contacts else 1
            entry["id"] = new_id
            contacts.append(entry)
            temp = JSON_FILE + ".tmp"
            with open(temp, "w", encoding="utf-8") as f:
                json.dump(contacts, f, indent=4, ensure_ascii=False)
            os.replace(temp, JSON_FILE)
            log.info(f"✅ SAVED ID={new_id}")
            return True, "saved", entry
        except Exception as e:
            log.error(f"❌ Save failed: {e}")
            return False, str(e), None


# ---------- Validation ----------
EMAIL_REGEX = re.compile(r"^[\w\.\-]+@[\w\-]+\.[a-zA-Z]{2,}$")
PHONE_REGEX = re.compile(r"^[0-9+\-\s()]{7,20}$")


def validate_form(form):
    errors = {}
    name    = form.get("name", "").strip()
    email   = form.get("email", "").strip()
    phone   = form.get("phone", "").strip()
    subject = form.get("subject", "").strip()
    message = form.get("message", "").strip()

    if not name or len(name) < 2:
        errors["name"] = "Please enter your full name."
    if not email or not EMAIL_REGEX.match(email):
        errors["email"] = "Please enter a valid email."
    if phone and not PHONE_REGEX.match(phone):
        errors["phone"] = "Please enter a valid phone number."
    if not message or len(message) < 10:
        errors["message"] = "Message must be at least 10 characters."

    data = {
        "name": name, "email": email, "phone": phone,
        "subject": subject or "General Enquiry", "message": message,
    }
    return errors, data


# ---------- Static pages ----------
@app.route("/")
def home():
    return send_from_directory("static", "index.html")


@app.route("/about")
def about():
    return send_from_directory("static", "about.html")


@app.route("/gallery")
def gallery():
    return send_from_directory("static", "gallery.html")


@app.route("/login")
def login():
    return send_from_directory("static", "login.html")


# ---------- Contact route ----------
@app.route("/contact", methods=["GET", "POST"])
def contact():
    errors, data = {}, {}

    if request.method == "POST":
        errors, data = validate_form(request.form)
        log.info(f"POST received. Errors={list(errors.keys()) or 'none'}")

        if not errors:
            entry = {**data, "created": datetime.now().strftime("%Y-%m-%d %H:%M:%S")}
            ok, msg, saved_entry = save_contact(entry)
            if ok:
                notify_whatsapp(saved_entry)
                flash("Thank you! Your message has been sent successfully.", "success")
                return redirect(url_for("success"))
            flash(f"Sorry, couldn't save ({msg}).", "error")

    return render_template("contact.html", errors=errors, data=data)


@app.route("/success")
def success():
    return render_template("success.html")


@app.route("/admin")
def admin():
    contacts = read_contacts()
    contacts_sorted = sorted(contacts, key=lambda c: c.get("id", 0), reverse=True)
    return render_template("admin.html", contacts=contacts_sorted, total=len(contacts))


# ============================================================
# WHATSAPP WEBHOOK — Meta verifies & sends notifications here
# ============================================================

@app.route("/webhook", methods=["GET"])
def verify_webhook():
    """Meta calls this once to verify the webhook URL."""
    mode      = request.args.get("hub.mode")
    token     = request.args.get("hub.verify_token")
    challenge = request.args.get("hub.challenge")

    log.info(f"🔔 Webhook verification: mode={mode}")

    if mode == "subscribe" and token == app.config.get("VERIFY_TOKEN"):
        log.info("✅ Webhook verified by Meta")
        return challenge, 200

    log.warning("❌ Webhook verification FAILED (wrong token)")
    return "Forbidden", 403


@app.route("/webhook", methods=["POST"])
def receive_webhook():
    """Meta POSTs delivery status & incoming messages here."""
    data = request.get_json(silent=True) or {}
    try:
        log.info("📬 Webhook POST received from Meta")
        log.info(f"   Payload: {json.dumps(data)[:500]}")
    except Exception as e:
        log.error(f"Webhook log error: {e}")
    return jsonify({"status": "ok"}), 200


# ---------- Startup ----------
init_json()
log.info(f"📁 Data file: {JSON_FILE}")

# if __name__ == "__main__":
#     app.run(debug=True, port=5000)

if __name__ == "__main__":
    # Only used for local development. In production, run via Gunicorn.
    app.run(debug=False, port=5000)