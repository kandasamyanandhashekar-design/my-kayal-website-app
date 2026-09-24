/* =====================================================
   KAYAL VENTURERS CHAT
   CHAT.JS
===================================================== */


/* =====================================================
   GET ELEMENTS
===================================================== */

// const chatButton = document.getElementById("chatButton");
// const chatBox = document.getElementById("chatBox");
// const closeChat = document.getElementById("closeChat");

// const chatBody = document.getElementById("chatBody");
// const chatInput = document.getElementById("chatInput");
// const sendMessage = document.getElementById("sendMessage");


// /* =====================================================
//    OPEN CHAT
// ===================================================== */

// chatButton.addEventListener("click", function () {

//     chatBox.classList.add("show");

//     // Scroll message area to bottom
//     setTimeout(function () {
//         scrollChatToBottom();
//     }, 300);

// });


// /* =====================================================
//    OPEN CHAT
// ===================================================== */

// chatButton.addEventListener("click", function () {

//     chatBox.style.display = "flex";

//     // Scroll message area to bottom
//     setTimeout(function () {
//         scrollChatToBottom();
//     }, 50);

// });


// /* =====================================================
//    CLOSE CHAT
// ===================================================== */

// closeChat.addEventListener("click", function () {

//     chatBox.classList.remove("show");

// });



// /* =====================================================
//    AUTO POP-UP AFTER 5 SECONDS
// ===================================================== */

// setTimeout(function () {

//     chatBox.classList.add("show");

//     // Scroll message area to bottom
//     setTimeout(function () {
//         scrollChatToBottom();
//     }, 300);

// }, 5000);




// // /* =====================================================
// //    CLOSE CHAT
// // ===================================================== */

// // closeChat.addEventListener("click", function () {

// //     chatBox.style.display = "none";

// // });


// /* =====================================================
//    SCROLL ONLY THE MESSAGE AREA
// ===================================================== */

// function scrollChatToBottom() {

//     if (!chatBody) {
//         return;
//     }

//     chatBody.scrollTop = chatBody.scrollHeight;

// }


// /* =====================================================
//    SEND MESSAGE
// ===================================================== */

// function sendChatMessage() {

//     const text = chatInput.value.trim();


//     // Don't send empty message

//     if (text === "") {
//         return;
//     }


//     /* -----------------------------------------------
//        CREATE MESSAGE
//     ------------------------------------------------ */

//     const newMessage = document.createElement("div");

//     newMessage.className = "message sent";

//     newMessage.textContent = text;


//     /* -----------------------------------------------
//        ADD MESSAGE TO CHAT BODY
//     ------------------------------------------------ */

//     chatBody.appendChild(newMessage);


//     /* -----------------------------------------------
//        CLEAR INPUT
//     ------------------------------------------------ */

//     chatInput.value = "";


//     /* -----------------------------------------------
//        SCROLL TO NEW MESSAGE
//     ------------------------------------------------ */

//     setTimeout(function () {

//         scrollChatToBottom();

//     }, 20);

// }


// /* =====================================================
//    SEND BUTTON
// ===================================================== */

// sendMessage.addEventListener("click", function () {

//     sendChatMessage();

// });


// /* =====================================================
//    ENTER KEY
// ===================================================== */

// chatInput.addEventListener("keydown", function (event) {

//     if (event.key === "Enter") {

//         event.preventDefault();

//         sendChatMessage();

//     }

// });


// /* =====================================================
//    QUICK MESSAGE BUTTONS
// ===================================================== */

// function selectMessage(message) {

//     chatInput.value = message;

//     chatInput.focus();

// }


// /* =====================================================
//    WATCH FOR NEW MESSAGES
// ===================================================== */

// const chatObserver = new MutationObserver(function () {

//     scrollChatToBottom();

// });


// chatObserver.observe(chatBody, {

//     childList: true,

//     subtree: true

// });


// /* =====================================================
//    INITIAL SCROLL
// ===================================================== */

// window.addEventListener("load", function () {

//     scrollChatToBottom();

// });





/* =====================================================
   GET ELEMENTS
===================================================== */

const chatButton = document.getElementById("chatButton");
const chatBox = document.getElementById("chatBox");
const closeChat = document.getElementById("closeChat");

const chatBody = document.getElementById("chatBody");
const chatInput = document.getElementById("chatInput");
const sendMessage = document.getElementById("sendMessage");


/* =====================================================
   CHECK IF ELEMENTS EXIST
===================================================== */

if (!chatButton) {
    console.error("Chat button not found!");
}

if (!chatBox) {
    console.error("Chat box not found!");
}


/* =====================================================
   OPEN CHAT
===================================================== */

if (chatButton && chatBox) {
    chatButton.addEventListener("click", function () {
        chatBox.classList.add("show");

        // Scroll message area to bottom
        setTimeout(function () {
            scrollChatToBottom();
        }, 300);
    });
}


/* =====================================================
   CLOSE CHAT
===================================================== */

if (closeChat && chatBox) {
    closeChat.addEventListener("click", function () {
        chatBox.classList.remove("show");
    });
}


/* =====================================================
   AUTO POP-UP AFTER 5 SECONDS - FIXED
===================================================== */

document.addEventListener("DOMContentLoaded", function () {
    setTimeout(function () {
        if (chatBox) {
            chatBox.classList.add("show");

            // Scroll message area to bottom
            setTimeout(function () {
                scrollChatToBottom();
            }, 300);
        }
    }, 10000);
});


/* =====================================================
   SCROLL ONLY THE MESSAGE AREA
===================================================== */

function scrollChatToBottom() {
    if (!chatBody) {
        return;
    }
    chatBody.scrollTop = chatBody.scrollHeight;
}


/* =====================================================
   SEND MESSAGE
===================================================== */

function sendChatMessage() {
    const text = chatInput.value.trim();

    // Don't send empty message
    if (text === "") {
        return;
    }

    /* -----------------------------------------------
       CREATE MESSAGE
    ------------------------------------------------ */
    const newMessage = document.createElement("div");
    newMessage.className = "message sent";
    newMessage.textContent = text;

    /* -----------------------------------------------
       ADD MESSAGE TO CHAT BODY
    ------------------------------------------------ */
    chatBody.appendChild(newMessage);

    /* -----------------------------------------------
       CLEAR INPUT
    ------------------------------------------------ */
    chatInput.value = "";

    /* -----------------------------------------------
       SCROLL TO NEW MESSAGE
    ------------------------------------------------ */
    setTimeout(function () {
        scrollChatToBottom();
    }, 20);
}


/* =====================================================
   SEND BUTTON
===================================================== */

if (sendMessage) {
    sendMessage.addEventListener("click", function () {
        sendChatMessage();
    });
}


/* =====================================================
   ENTER KEY
===================================================== */

if (chatInput) {
    chatInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            sendChatMessage();
        }
    });
}


/* =====================================================
   QUICK MESSAGE BUTTONS
===================================================== */

function selectMessage(message) {
    if (chatInput) {
        chatInput.value = message;
        chatInput.focus();
    }
}


/* =====================================================
   WATCH FOR NEW MESSAGES
===================================================== */

if (chatBody) {
    const chatObserver = new MutationObserver(function () {
        scrollChatToBottom();
    });

    chatObserver.observe(chatBody, {
        childList: true,
        subtree: true
    });
}


/* =====================================================
   INITIAL SCROLL
===================================================== */

window.addEventListener("load", function () {
    setTimeout(function () {
        scrollChatToBottom();
    }, 100);
});