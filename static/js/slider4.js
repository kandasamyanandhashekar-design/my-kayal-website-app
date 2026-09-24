
/* =====================================================
   KAYAL VENTURERS  (MAIZE)
   SLIDER 4
   3D ROTATION + TYPING + SPEECH
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    console.log("slider4.js loaded");


    /* =====================================================
       GET ELEMENTS
    ===================================================== */

    const sliderFour =
        document.querySelector(".slider-four");

    const typingTitle =
        document.getElementById("typingTitle");

    const typingText =
        document.getElementById("typingText");


    /* =====================================================
       CHECK ELEMENTS
    ===================================================== */

    if (!sliderFour) {

        console.error(
            "ERROR: .slider-four not found."
        );

        return;
    }


    if (!typingTitle || !typingText) {

        console.error(
            "ERROR: typingTitle or typingText not found."
        );

        return;
    }


    console.log("Slider 4 elements found.");


    /* =====================================================
       SLIDER 3 CONTENT
    ===================================================== */

    const sliderFourContent = [

        {
            title: "Premium Natural Product",

            text:
            "Discover our carefully selected natural products, prepared with attention to quality, purity and traditional value."
        },


        {
            title: "Quality You Can Trust",

            text:
            "Every product is selected with care to provide dependable quality while preserving the natural characteristics of the product."
        },


        // {
        //     title: "From Nature to You",

        //     text:
        //     "We connect natural resources with everyday needs by offering products prepared responsibly and delivered with care."
        // }

    ];


    /* =====================================================
       SETTINGS
    ===================================================== */

    const titleTypingSpeed = 80;

    const textTypingSpeed = 40;

    const delayBeforeText = 400;

    const delayBeforeNextSlide = 800;

    const rotationDuration = 1200;


    /* =====================================================
       STATE
    ===================================================== */

    let currentSlideFour = 0;

    let typingTimerFour = null;

    let nextSlideTimerFour = null;


    /* =====================================================
       STOP TYPING
    ===================================================== */

    function stopTypingFour() {

        if (typingTimerFour !== null) {

            clearTimeout(typingTimerFour);

            typingTimerFour = null;

        }

    }


    /* =====================================================
       STOP TIMERS
    ===================================================== */

    function stopTimersFour() {

        if (nextSlideTimerFour !== null) {

            clearTimeout(nextSlideTimerFour);

            nextSlideTimerFour = null;

        }

        stopTypingFour();

    }


    /* =====================================================
       STOP SPEECH
    ===================================================== */

    function stopSpeechFour() {

        if ("speechSynthesis" in window) {

            window.speechSynthesis.cancel();

        }

    }


    /* =====================================================
       STOP EVERYTHING
    ===================================================== */

    function stopSliderFour() {

        stopTimersFour();

        stopSpeechFour();

    }


    /* =====================================================
       3D ROTATION
    ===================================================== */

    function rotateSliderFour() {


        const totalSlides = sliderFourContent.length;

        const rotation =
            currentSlideFour * (360 / totalSlides);


        console.log(
            "SLIDER 3 ROTATION:",
            rotation + "deg"
        );


        sliderFour.style.transform =
            `translate(-50%, -50%) rotateY(${rotation}deg)`;

    }


    /* =====================================================
       TYPE SLIDER 4 CONTENT
    ===================================================== */

    function typeSliderFourContent(content) {

        stopTypingFour();

        stopSpeechFour();


        typingTitle.textContent = "";

        typingText.textContent = "";


        let titleIndex = 0;

        let textIndex = 0;


        /* =================================================
           TYPE TITLE
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


                typingTimerFour =
                    setTimeout(
                        typeTitle,
                        titleTypingSpeed
                    );

            }

            else {

                typingTimerFour =
                    setTimeout(
                        typeDescription,
                        delayBeforeText
                    );

            }

        }


        /* =================================================
           TYPE DESCRIPTION
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


                typingTimerFour =
                    setTimeout(
                        typeDescription,
                        textTypingSpeed
                    );

            }

            else {

                typingTimerFour = null;


                console.log(
                    "Slider 4 typing completed."
                );


                speakSliderFour(
                    content.text
                );

            }

        }


        typeTitle();

    }


    /* =====================================================
       SPEECH
    ===================================================== */

    function speakSliderFour(text) {

        if (!("speechSynthesis" in window)) {

            console.error(
                "Speech synthesis not supported."
            );

            moveToNextSliderFour();

            return;
        }


        window.speechSynthesis.cancel();


        const speech =
            new SpeechSynthesisUtterance(text);


        speech.lang = "en-IN";

        speech.rate = 0.9;

        speech.pitch = 1;

        speech.volume = 1;


        speech.onstart = function () {

            console.log(
                "Slider 4 speech started - Slide",
                currentSlideFour + 1
            );

        };


        speech.onend = function () {

            console.log(
                "Slider 4 speech completed - Slide",
                currentSlideFour + 1
            );


            nextSlideTimerFour =
                setTimeout(function () {

                    nextSlideTimerFour = null;

                    moveToNextSliderFour();

                }, delayBeforeNextSlide);

        };


        speech.onerror = function (event) {

            console.error(
                "Slider 4 speech error:",
                event.error
            );


            moveToNextSliderFour();

        };


        window.speechSynthesis.speak(
            speech
        );

    }


    /* =====================================================
       NEXT SLIDE
    ===================================================== */

    function moveToNextSliderFour() {

        stopTypingFour();

        stopSpeechFour();


        /* =================================================
           CHECK LAST SLIDE
        ================================================= */

        // if (
        //     currentSlideThree >=
        //     sliderThreeContent.length - 1
        // ) {

        //     console.log(
        //         "Slider 3 finished - hidding slider."
        //     );

        //     /*Hide Slider 3*/

        //     sliderThree.style.opacity = "0";

        //     sliderThree.style.visibility = "hidden";

        //     typingTitle.style.opacity = "0";

        //     typingText.style.opacity = "0";

        //     return;
        // }

    
            if (
            currentSlideFour >=
            sliderFourContent.length - 1
        ) {

            console.log("SLIDER 4 LAST SLIDE FINISHED");

            stopSliderFour();

            /* ---------------------------------------------
               GET WRAPPERS
            --------------------------------------------- */
            const sliderFourWrapper =
                sliderFour.closest(".slider-wrapper-four");

            const sliderFiveWrapper =
                document.querySelector(".slider-wrapper-five");

            /* ---------------------------------------------
               EXIT SLIDER 3 WRAPPER
            --------------------------------------------- */
            if (sliderFourWrapper) {
                sliderFourWrapper.style.transition =
                    "opacity 900ms ease, transform 900ms ease";
                sliderFourWrapper.style.opacity = "0";
                sliderFourWrapper.style.transform = "translateY(-50px)";
                sliderFourWrapper.style.pointerEvents = "none";
            }

            sliderFour.style.opacity = "0";

        
            
            /* ---------------------------------------------
               AFTER SLIDER 4 DISAPPEARS → START SLIDER 5
            --------------------------------------------- */
            setTimeout(function () {

                /* HIDE SLIDER 4 COMPLETELY */

                if (sliderFourWrapper) {
                    sliderFourWrapper.style.visibility = "hidden";
                }

                /* REVEAL SLIDER 4 WRAPPER */
                if (sliderFiveWrapper) {
                    sliderFiveWrapper.style.transition = "none";
                    sliderFiveWrapper.style.visibility = "visible";
                    sliderFiveWrapper.style.opacity = "0";
                    sliderFiveWrapper.style.transform = "translateY(50px)";
                    sliderFiveWrapper.style.pointerEvents = "auto";

                    /* FORCE REFLOW so transition fires */
                    void sliderFiveWrapper.offsetWidth;

                    sliderFiveWrapper.style.transition =
                        "opacity 900ms ease, transform 900ms ease";
                    sliderFiveWrapper.style.opacity = "1";
                    sliderFiveWrapper.style.transform = "translateY(0)";
                }

                /* CALL SLIDER 4 */
                if (typeof window.startSliderFourSpeech === "function") {
                    console.log("STARTING SLIDER 5");
                    window.startSliderFiveSpeech();
                } else {
                    console.error("ERROR: startSliderFiveSpeech() not found. Load slider5.js!");
                }

            }, 1000);

            return;
        }




        /* =================================================
           NEXT SLIDE
        ================================================= */

        currentSlideFour++;


        console.log(
            "Moving to Slider 4 Slide",
            currentSlideFour + 1
        );


        /* =================================================
           ROTATE 3D
        ================================================= */

        rotateSliderFour();


        /* =================================================
           WAIT FOR ROTATION
        ================================================= */

        typingTimerFour =
            setTimeout(function () {

                typingTimerFour = null;


                typeSliderFourContent(
                    sliderFourContent[
                        currentSlideFour
                    ]
                );


            }, rotationDuration);

    }


    /* =====================================================
       PUBLIC START FUNCTION
    ===================================================== */

    window.startSliderFourSpeech =
        function () {

            console.log(
                "================================"
            );

            console.log(
                "STARTING SLIDER 4"
            );

            console.log(
                "================================"
            );


            /* ---------------------------------------------
               STOP EVERYTHING
            --------------------------------------------- */

            stopSliderFour();


            /* ---------------------------------------------
               RESET SLIDE
            --------------------------------------------- */

            currentSlideFour = 0;


            /* ---------------------------------------------
               RESET ROTATION
            --------------------------------------------- */

            sliderFour.style.transform =
                "translate(-50%, -50%) rotateY(0deg)";


            /* ---------------------------------------------
               CLEAR TEXT
            --------------------------------------------- */

            typingTitle.textContent = "";

            typingText.textContent = "";


            /* ---------------------------------------------
               START SLIDE 1
            --------------------------------------------- */

            typeSliderFourContent(
                sliderFourContent[0]
            );

        };


    console.log(
        "Slider 4 3D system ready."
    );

});







































