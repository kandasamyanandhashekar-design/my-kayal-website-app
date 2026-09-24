
/* =====================================================
   KAYAL VENTURERS  COW DUNG
   3D CAROUSEL + TYPING + SPEECH SYNCHRONIZATION
   FULL CORRECTED VERSION WITH DELAY
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    console.log("typing_speech_element_corrected.js loaded");


    /* =====================================================
       GET ELEMENTS
    ===================================================== */

    const slider = document.querySelector(".slider");

    const typingTitle =
        document.getElementById("typingTitle");

    const typingText =
        document.getElementById("typingText");


    /* =====================================================
       CHECK ELEMENTS
    ===================================================== */

    if (!slider) {
        console.error("Slider element not found.");
        return;
    }

    if (!typingTitle || !typingText) {
        console.error("Typing elements not found.");
        return;
    }

    console.log("All elements found.");


    /* =====================================================
       CONTENT FOR 4 IMAGES
    ===================================================== */

    const sliderContent = [

        {
            title: "Natural & Powerful",

            text:
            // "Discover the traditional power of natural cow dung products, carefully prepared for a better and sustainable future."
            "Discover the traditional power of natural cow dung products, expertly prepared for gardening and a sustainable future."
        },

        {
            title: "Eco Friendly Products",

            text:
            // "Our natural products are designed to support an eco friendly lifestyle while respecting nature and traditional practices."
            "Our natural products are designed to support an eco friendly lifestyle while enriching soil conditions and respecting nature."
        },

        {
            title: "Traditional Knowledge",

            text:
            // "Ancient knowledge and traditional methods inspire our products, connecting natural resources with modern needs."
            "Ancient wisdom and traditional methods inspire our products, ideal for a wide variety of plants and trees."
        },

        {
            title: "A Sustainable Future",

            text:
            // "Choose natural solutions today and help build a cleaner, greener and more sustainable future for tomorrow."
            "Choose natural solutions today and help build a cleaner, greener and more sustainable future."
        }

    ];


    /* =====================================================
       SETTINGS
    ===================================================== */

    const titleTypingSpeed = 80;

    const textTypingSpeed = 40;

    const delayBeforeText = 400;

    const delayBeforeNextSlide = 800;

    const rotationSpeed = 1200;


    /* =====================================================
       CURRENT SLIDE
    ===================================================== */

    let currentSlide = 0;


    /* =====================================================
       TYPING TIMER
    ===================================================== */

    let typingTimer = null;


    /* =====================================================
       SPEECH STATE
    ===================================================== */

    let speechStarted = false;

    let waitingForUserInteraction = false;

    let speechUnlocked = true;


    /* =====================================================
       STOP TYPING
    ===================================================== */

    function stopTyping() {

        if (typingTimer !== null) {

            clearTimeout(typingTimer);

            typingTimer = null;

        }

    }


    /* =====================================================
       STOP SPEECH
    ===================================================== */

    function stopSpeech() {

        if ("speechSynthesis" in window) {

            window.speechSynthesis.cancel();

        }

        speechStarted = false;

    }


    /* =====================================================
       ROTATE CAROUSEL
    ===================================================== */

    function rotateCarousel() {

        const rotation = currentSlide * 90;

        slider.style.transform =
            `translate(-50%, -50%) rotateY(${rotation}deg)`;

    }


    /* =====================================================
       TYPE CONTENT
    ===================================================== */

    function typeContent(content) {

        stopTyping();

        stopSpeech();

        speechStarted = false;

        waitingForUserInteraction = false;


        /* -------------------------------------------------
           CLEAR OLD CONTENT
        ------------------------------------------------- */

        typingTitle.textContent = "";

        typingText.textContent = "";


        let titleIndex = 0;

        let textIndex = 0;


        /* =================================================
           TYPE TITLE
        ================================================= */

        function typeTitle() {

            if (titleIndex < content.title.length) {

                typingTitle.textContent +=
                    content.title.charAt(titleIndex);

                titleIndex++;

                typingTimer = setTimeout(
                    typeTitle,
                    titleTypingSpeed
                );

            }

            else {

                typingTimer = setTimeout(
                    typeDescription,
                    delayBeforeText
                );

            }

        }


        /* =================================================
           TYPE DESCRIPTION
        ================================================= */

        function typeDescription() {

            if (textIndex < content.text.length) {

                typingText.textContent +=
                    content.text.charAt(textIndex);

                textIndex++;

                typingTimer = setTimeout(
                    typeDescription,
                    textTypingSpeed
                );

            }

            else {

                console.log(
                    "Typing completed - Starting speech."
                );

                startSpeech(content.text);

            }

        }


        /* =================================================
           START TITLE TYPING
        ================================================= */

        typeTitle();

    }


    /* =====================================================
       TEXT TO SPEECH
    ===================================================== */

    function startSpeech(text) {

        /* -------------------------------------------------
           CHECK BROWSER SUPPORT
        ------------------------------------------------- */

        if (!("speechSynthesis" in window)) {

            console.error(
                "Speech synthesis is not supported."
            );

            moveToNextSlide();

            return;

        }


        /* -------------------------------------------------
           STOP OLD SPEECH
        ------------------------------------------------- */

        window.speechSynthesis.cancel();

        speechStarted = false;


        /* -------------------------------------------------
           CREATE SPEECH
        ------------------------------------------------- */

        const speech =
            new SpeechSynthesisUtterance(text);


        speech.lang = "en-IN";

        speech.rate = 0.9;

        speech.pitch = 1;

        speech.volume = 1;


        /* =================================================
           SPEECH STARTED
        ================================================= */

        speech.onstart = function () {

            speechStarted = true;

            waitingForUserInteraction = false;

            console.log(
                "Speech started - Slide",
                currentSlide + 1
            );

        };


        /* =================================================
           SPEECH FINISHED
        ================================================= */

        speech.onend = function () {

            console.log(
                "Speech completed - Slide",
                currentSlide + 1
            );

            speechStarted = false;

            waitingForUserInteraction = false;


            /* ---------------------------------------------
               WAIT BEFORE NEXT SLIDE
            --------------------------------------------- */

            setTimeout(function () {

                moveToNextSlide();

            }, delayBeforeNextSlide);

        };


        /* =================================================
           SPEECH ERROR
        ================================================= */

        speech.onerror = function (event) {

            console.error(
                "Speech error:",
                event.error
            );

            speechStarted = false;


            /* ---------------------------------------------
               BROWSER BLOCKED SPEECH
            --------------------------------------------- */

            if (
                event.error === "not-allowed" ||
                event.error === "audio-busy"
            ) {

                waitingForUserInteraction = true;

                console.log(
                    "Browser blocked speech."
                );

                console.log(
                    "Waiting for user interaction."
                );

                return;

            }


            /* ---------------------------------------------
               OTHER ERROR
            --------------------------------------------- */

            waitingForUserInteraction = false;


            setTimeout(function () {

                moveToNextSlide();

            }, delayBeforeNextSlide);

        };


        /* =================================================
           START SPEECH
        ================================================= */

        try {

            window.speechSynthesis.speak(speech);

            console.log(
                "Speech requested - Slide",
                currentSlide + 1
            );

        }

        catch (error) {

            console.error(
                "Speech could not start:",
                error
            );

            waitingForUserInteraction = true;

        }

    }


    /* =====================================================
       MOVE TO NEXT SLIDE
    ===================================================== */

    function moveToNextSlide() {

        /* -------------------------------------------------
           STOP OLD TYPING
        ------------------------------------------------- */

        stopTyping();


        /* -------------------------------------------------
           STOP OLD SPEECH
        ------------------------------------------------- */

        stopSpeech();


        /* -------------------------------------------------
           CHECK IF SLIDE 4 IS FINISHED
        ------------------------------------------------- */

        if (currentSlide === sliderContent.length - 1) {

            console.log(
                "Slide 4 completed → Starting Slider 1 exit"
            );


            /* -------------------------------------------------
               START SLIDER 1 → SLIDER 2
            ------------------------------------------------- */

            if (
                typeof window.startSliderTransition === "function"
            ) {

                window.startSliderTransition();

            } else {

                console.error(
                    "startSliderTransition() function not found."
                );

            }


            /* -------------------------------------------------
               STOP HERE
               DO NOT GO BACK TO SLIDE 1
            ------------------------------------------------- */

            return;

        }


        /* -------------------------------------------------
           MOVE TO NEXT SLIDE
        ------------------------------------------------- */

        currentSlide++;


        console.log(
            "Moving to slide:",
            currentSlide + 1
        );


        /* -------------------------------------------------
           ROTATE CAROUSEL
        ------------------------------------------------- */

        rotateCarousel();


        /* -------------------------------------------------
           WAIT FOR ROTATION
        ------------------------------------------------- */

        setTimeout(function () {

            typeContent(
                sliderContent[currentSlide]
            );

        }, rotationSpeed);

    }


    /* =====================================================
       USER INTERACTION BACKUP
    ===================================================== */

    document.addEventListener(
        "click",
        function () {

            speechUnlocked = true;

            console.log(
                "User interaction detected."
            );


            /* ---------------------------------------------
               RETRY SPEECH IF BROWSER BLOCKED IT
            --------------------------------------------- */

            if (
                waitingForUserInteraction &&
                !speechStarted
            ) {

                waitingForUserInteraction = false;

                console.log(
                    "Retrying speech..."
                );


                startSpeech(
                    sliderContent[currentSlide].text
                );

            }

        }
    );


    /* =====================================================
       KEYBOARD BACKUP
    ===================================================== */

    document.addEventListener(
        "keydown",
        function () {

            speechUnlocked = true;

            console.log(
                "Keyboard interaction detected."
            );


            if (
                waitingForUserInteraction &&
                !speechStarted
            ) {

                waitingForUserInteraction = false;

                console.log(
                    "Retrying speech..."
                );


                startSpeech(
                    sliderContent[currentSlide].text
                );

            }

        }
    );


    /* =====================================================
       INITIAL CAROUSEL POSITION
    ===================================================== */

    slider.style.transition =
        `transform ${rotationSpeed}ms ease-in-out`;


    rotateCarousel();


    /* =====================================================
       START FIRST SLIDE AUTOMATICALLY WITH DELAY
    ===================================================== */

    speechUnlocked = true;

    console.log(
        "Waiting 6 seconds before starting first slide..."
    );

    // =====================================================
    // ADDED: 6 SECOND DELAY BEFORE TYPING STARTS
    // =====================================================
    setTimeout(function() {
        console.log(
            "Starting first slide automatically now..."
        );
        typeContent(sliderContent[0]);
    }, 7000); // ← 6 second delay

});