
/* =====================================================
   KAYAL VENTURERS
   SLIDER 2
   COFFEE WOOD
   3D ROTATION + TYPING + SPEECH
   SLIDER 2 → SLIDER 3 TRANSITION
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    console.log("slider2_typing_speech.js loaded");


    /* =====================================================
       GET ELEMENTS
    ===================================================== */

    const sliderTwo =
        document.querySelector(".slider-two");

    const typingTitle =
        document.getElementById("typingTitle");

    const typingText =
        document.getElementById("typingText");


    /* =====================================================
       CHECK ELEMENTS
    ===================================================== */

    if (!sliderTwo) {

        console.error(
            "ERROR: .slider-two not found."
        );

        return;
    }


    if (!typingTitle || !typingText) {

        console.error(
            "ERROR: typingTitle or typingText not found."
        );

        return;
    }


    console.log("Slider 2 elements found.");


    /* =====================================================
       CONTENT
    ===================================================== */

    const sliderTwoContent = [

        {
            title: "Natural Coffee Wood",

            text:
            // "Discover the natural beauty of coffee wood, carefully selected and prepared to bring traditional value and natural charm to your home and lifestyle."
            "Discover the natural beauty of coffee wood, carefully selected and prepared to bring traditional value and natural charm to your home and lifestyle."
        },

        {
            title: "Strong & Sustainable",

            text:
            // "Coffee wood is naturally strong and durable, making it a sustainable choice for people who appreciate natural materials and traditional craftsmanship."
            "Coffee wood is naturally strong and durable, making it a sustainable choice for furniture and traditional craftsmanship."
        },

        {
            title: "From Nature to You",

            text:
            // "Our coffee wood products connect the richness of nature with everyday needs, offering beautiful natural products prepared with care and respect for the environment."
            "Our coffee wood products connect the richness of nature with everyday needs, offering beautiful natural products prepared with care and respect for the environment."
        }

    ];


    /* =====================================================
       SETTINGS
    ===================================================== */

    const titleTypingSpeed = 80;

    const textTypingSpeed = 40;

    const delayBeforeText = 400;

    const delayBeforeNextSlide = 800;

    const rotationDuration = 1200;

    const transitionDuration = 900;


    /* =====================================================
       STATE
    ===================================================== */

    let currentSlideTwo = 0;

    let typingTimerTwo = null;

    let nextSlideTimerTwo = null;

    let transitionTimerTwo = null;


    /* =====================================================
       STOP TYPING
    ===================================================== */

    function stopTypingTwo() {

        if (typingTimerTwo !== null) {

            clearTimeout(typingTimerTwo);

            typingTimerTwo = null;

        }

    }


    /* =====================================================
       STOP TIMERS
    ===================================================== */

    function stopTimersTwo() {

        if (nextSlideTimerTwo !== null) {

            clearTimeout(nextSlideTimerTwo);

            nextSlideTimerTwo = null;

        }


        if (transitionTimerTwo !== null) {

            clearTimeout(transitionTimerTwo);

            transitionTimerTwo = null;

        }


        stopTypingTwo();

    }


    /* =====================================================
       STOP SPEECH
    ===================================================== */

    function stopSpeechTwo() {

        if ("speechSynthesis" in window) {

            window.speechSynthesis.cancel();

        }

    }


    /* =====================================================
       STOP EVERYTHING
    ===================================================== */

    function stopSliderTwo() {

        stopTimersTwo();

        stopSpeechTwo();

    }


    /* =====================================================
       3D ROTATION
    ===================================================== */

    function rotateSliderTwo() {

        const rotation =
            currentSlideTwo * 120;


        console.log(
            "SLIDER 2 ROTATION:",
            rotation + "deg"
        );


        sliderTwo.style.transform =
            `translate(-50%, -50%) rotateY(${rotation}deg)`;

    }


    /* =====================================================
       TYPE CONTENT
    ===================================================== */

    function typeSliderTwoContent(content) {

        stopTypingTwo();

        stopSpeechTwo();


        typingTitle.textContent = "";

        typingText.textContent = "";


        let titleIndex = 0;

        let textIndex = 0;


        /* =================================================
           TITLE
        ================================================= */

        function typeTitle() {

            if (
                titleIndex <
                content.title.length
            ) {

                typingTitle.textContent +=
                    content.title.charAt(
                        titleIndex
                    );


                titleIndex++;


                typingTimerTwo =
                    setTimeout(
                        typeTitle,
                        titleTypingSpeed
                    );

            }

            else {

                typingTimerTwo =
                    setTimeout(
                        typeDescription,
                        delayBeforeText
                    );

            }

        }


        /* =================================================
           DESCRIPTION
        ================================================= */

        function typeDescription() {

            if (
                textIndex <
                content.text.length
            ) {

                typingText.textContent +=
                    content.text.charAt(
                        textIndex
                    );


                textIndex++;


                typingTimerTwo =
                    setTimeout(
                        typeDescription,
                        textTypingSpeed
                    );

            }

            else {

                typingTimerTwo = null;


                console.log(
                    "Slider 2 typing completed."
                );


                speakSliderTwo(
                    content.text
                );

            }

        }


        typeTitle();

    }


    /* =====================================================
       SPEECH
    ===================================================== */

    function speakSliderTwo(text) {

        if (!("speechSynthesis" in window)) {

            console.error(
                "Speech synthesis not supported."
            );


            moveToNextSliderTwo();

            return;
        }


        window.speechSynthesis.cancel();


        const speech =
            new SpeechSynthesisUtterance(text);


        speech.lang = "en-IN";

        speech.rate = 0.9;

        speech.pitch = 1;

        speech.volume = 1;


        /* =================================================
           SPEECH START
        ================================================= */

        speech.onstart = function () {

            console.log(
                "Slider 2 speech started - Slide",
                currentSlideTwo + 1
            );

        };


        /* =================================================
           SPEECH END
        ================================================= */

        speech.onend = function () {

            console.log(
                "Slider 2 speech completed - Slide",
                currentSlideTwo + 1
            );


            nextSlideTimerTwo =
                setTimeout(function () {

                    nextSlideTimerTwo = null;

                    moveToNextSliderTwo();

                }, delayBeforeNextSlide);

        };


        /* =================================================
           SPEECH ERROR
        ================================================= */

        speech.onerror = function (event) {

            console.error(
                "Slider 2 speech error:",
                event.error
            );


            moveToNextSliderTwo();

        };


        /* =================================================
           START SPEECH
        ================================================= */

        try {

            window.speechSynthesis.speak(
                speech
            );

        }

        catch (error) {

            console.error(
                "Speech could not start:",
                error
            );

            moveToNextSliderTwo();

        }

    }


    /* =====================================================
       GET SLIDER 2 CONTAINER
    ===================================================== */

    function getSliderTwoContainer() {

        /*
         * IMPORTANT:
         *
         * If .slider-two is itself the visible element,
         * use it.
         *
         * If it is inside .slider-wrapper-two,
         * use the wrapper as well.
         */

        const wrapper =
            sliderTwo.closest(
                ".slider-wrapper-two"
            );


        return {
            slider: sliderTwo,
            wrapper: wrapper
        };

    }


    /* =====================================================
       SLIDER 2 EXIT
    ===================================================== */

    function exitSliderTwo() {

        console.log(
            "================================"
        );

        console.log(
            "SLIDER 2 EXIT STARTED"
        );

        console.log(
            "================================"
        );


        const elements =
            getSliderTwoContainer();


        const slider =
            elements.slider;

        const wrapper =
            elements.wrapper;


        /* =================================================
           STOP SLIDER 2
        ================================================= */

        stopSliderTwo();


        /* =================================================
           PREPARE SLIDER 3
        ================================================= */

        const sliderThreeWrapper =
            document.querySelector(
                ".slider-wrapper-three"
            );


        if (sliderThreeWrapper) {

            /*
             * Slider 3 MUST remain completely hidden
             * while Slider 2 is disappearing.
             */

            sliderThreeWrapper.style.transition =
                "none";

            sliderThreeWrapper.style.opacity =
                "0";

            sliderThreeWrapper.style.visibility =
                "hidden";

            sliderThreeWrapper.style.pointerEvents =
                "none";

        }


        /* =================================================
           EXIT SLIDER 2 WRAPPER
        ================================================= */

        if (wrapper) {

            wrapper.style.transition =
                `opacity ${transitionDuration}ms ease, transform ${transitionDuration}ms ease`;

            wrapper.style.opacity =
                "0";

            wrapper.style.transform =
                "translateY(-50px)";

            wrapper.style.pointerEvents =
                "none";

        }


        /* =================================================
           EXIT ACTUAL SLIDER 2
        ================================================= */

        slider.style.transition =
            `opacity ${transitionDuration}ms ease, transform ${transitionDuration}ms ease`;

        slider.style.opacity =
            "0";


        /*
         * Keep the 3D transform while adding the
         * exit movement.
         */

        slider.style.transform =
            "translate(-50%, -50%) translateY(-50px) rotateY(" +
            (currentSlideTwo * 120) +
            "deg)";


        slider.style.pointerEvents =
            "none";


        /* =================================================
           WAIT FOR COMPLETE DISAPPEARANCE
        ================================================= */

        transitionTimerTwo =
            setTimeout(function () {

                transitionTimerTwo = null;


                console.log(
                    "SLIDER 2 COMPLETELY DISAPPEARED"
                );


                /* =================================================
                   HIDE SLIDER 2
                ================================================= */

                if (wrapper) {

                    wrapper.style.visibility =
                        "hidden";

                }


                slider.style.visibility =
                    "hidden";


                /* =================================================
                   RESET SLIDER 2 POSITION
                   WITHOUT SHOWING IT
                ================================================= */

                slider.style.transition =
                    "none";

                slider.style.opacity =
                    "0";

                slider.style.pointerEvents =
                    "none";


                /* =================================================
                   SLIDER 3 ENTER
                ================================================= */

                if (sliderThreeWrapper) {

                    console.log(
                        "SLIDER 3 ENTERING..."
                    );


                    /* ---------------------------------------------
                       INITIAL POSITION
                    --------------------------------------------- */

                    sliderThreeWrapper.style.transition =
                        "none";

                    sliderThreeWrapper.style.visibility =
                        "visible";

                    sliderThreeWrapper.style.opacity =
                        "0";

                    sliderThreeWrapper.style.pointerEvents =
                        "auto";

                    sliderThreeWrapper.style.transform =
                        "translateY(50px)";


                    /* ---------------------------------------------
                       FORCE REFLOW
                    --------------------------------------------- */

                    void sliderThreeWrapper.offsetWidth;


                    /* ---------------------------------------------
                       START ENTER ANIMATION
                    --------------------------------------------- */

                    sliderThreeWrapper.style.transition =
                        `opacity ${transitionDuration}ms ease, transform ${transitionDuration}ms ease`;

                    sliderThreeWrapper.style.opacity =
                        "1";

                    sliderThreeWrapper.style.transform =
                        "translateY(0)";

                }


                /* =================================================
                   START SLIDER 3
                ================================================= */

                if (
                    typeof window.startSliderThreeSpeech ===
                    "function"
                ) {

                    console.log(
                        "STARTING SLIDER 3"
                    );


                    window.startSliderThreeSpeech();

                }

                else {

                    console.error(
                        "ERROR: startSliderThreeSpeech() not found."
                    );

                }


            }, transitionDuration + 100);

    }


    /* =====================================================
       NEXT SLIDE
    ===================================================== */

    function moveToNextSliderTwo() {

        stopTypingTwo();

        stopSpeechTwo();


        /* =================================================
           LAST SLIDE
        ================================================= */

        if (
            currentSlideTwo >=
            sliderTwoContent.length - 1
        ) {

            console.log(
                "SLIDER 2 LAST SLIDE FINISHED"
            );


            /*
             * DO NOT CHANGE currentSlideTwo.
             *
             * Exit Slider 2 completely.
             */

            exitSliderTwo();


            return;

        }


        /* =================================================
           NEXT SLIDE
        ================================================= */

        currentSlideTwo++;


        console.log(
            "Moving to Slider 2 Slide",
            currentSlideTwo + 1
        );


        /* =================================================
           ROTATE
        ================================================= */

        rotateSliderTwo();


        /* =================================================
           WAIT FOR ROTATION
        ================================================= */

        typingTimerTwo =
            setTimeout(function () {

                typingTimerTwo = null;


                typeSliderTwoContent(
                    sliderTwoContent[
                        currentSlideTwo
                    ]
                );


            }, rotationDuration);

    }


    /* =====================================================
       PUBLIC START FUNCTION
    ===================================================== */

    window.startSliderTwoSpeech =
        function () {

            console.log(
                "================================"
            );

            console.log(
                "STARTING SLIDER 2"
            );

            console.log(
                "================================"
            );


            /* =================================================
               STOP EVERYTHING
            ================================================= */

            stopSliderTwo();


            /* =================================================
               RESET SLIDE
            ================================================= */

            currentSlideTwo = 0;


            /* =================================================
               RESET 3D SLIDER
            ================================================= */

            sliderTwo.style.transition =
                `transform ${rotationDuration}ms ease-in-out`;

            sliderTwo.style.transform =
                "translate(-50%, -50%) rotateY(0deg)";


            /* =================================================
               GET SLIDER 2 WRAPPER
            ================================================= */

            const sliderTwoWrapper =
                sliderTwo.closest(
                    ".slider-wrapper-two"
                );


            /* =================================================
               SHOW SLIDER 2
            ================================================= */

            if (sliderTwoWrapper) {

                sliderTwoWrapper.style.transition =
                    "none";

                sliderTwoWrapper.style.visibility =
                    "visible";

                sliderTwoWrapper.style.opacity =
                    "1";

                sliderTwoWrapper.style.pointerEvents =
                    "auto";

                sliderTwoWrapper.style.transform =
                    "translateY(0)";

            }


            sliderTwo.style.transition =
                `transform ${rotationDuration}ms ease-in-out`;

            sliderTwo.style.visibility =
                "visible";

            sliderTwo.style.opacity =
                "1";

            sliderTwo.style.pointerEvents =
                "auto";


            /* =================================================
               HIDE SLIDER 3
            ================================================= */

            const sliderThreeWrapper =
                document.querySelector(
                    ".slider-wrapper-three"
                );


            if (sliderThreeWrapper) {

                sliderThreeWrapper.style.transition =
                    "none";

                sliderThreeWrapper.style.opacity =
                    "0";

                sliderThreeWrapper.style.visibility =
                    "hidden";

                sliderThreeWrapper.style.pointerEvents =
                    "none";

            }


            /* =================================================
               CLEAR TEXT
            ================================================= */

            typingTitle.textContent =
                "";

            typingText.textContent =
                "";


            /* =================================================
               START SLIDE 1
            ================================================= */

            typeSliderTwoContent(
                sliderTwoContent[0]
            );

        };


    /* =====================================================
       INITIAL SETUP
    ===================================================== */

    sliderTwo.style.transition =
        `transform ${rotationDuration}ms ease-in-out`;


    sliderTwo.style.visibility =
        "visible";


    rotateSliderTwo();


    /* =====================================================
       SYSTEM READY
    ===================================================== */

    console.log(
        "Slider 2 3D system ready."
    );

});
