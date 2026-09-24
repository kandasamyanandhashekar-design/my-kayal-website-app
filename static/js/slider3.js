
/* =====================================================
   KAYAL VENTURERS  (SMALL ONION)
   SLIDER 3
   3D ROTATION + TYPING + SPEECH
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    console.log("slider3.js loaded");


    /* =====================================================
       GET ELEMENTS
    ===================================================== */

    const sliderThree =
        document.querySelector(".slider-three");

    const typingTitle =
        document.getElementById("typingTitle");

    const typingText =
        document.getElementById("typingText");


    /* =====================================================
       CHECK ELEMENTS
    ===================================================== */

    if (!sliderThree) {

        console.error(
            "ERROR: .slider-three not found."
        );

        return;
    }


    if (!typingTitle || !typingText) {

        console.error(
            "ERROR: typingTitle or typingText not found."
        );

        return;
    }


    console.log("Slider 3 elements found.");


    /* =====================================================
       SLIDER 3 CONTENT
    ===================================================== */

    const sliderThreeContent = [

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

    let currentSlideThree = 0;

    let typingTimerThree = null;

    let nextSlideTimerThree = null;


    /* =====================================================
       STOP TYPING
    ===================================================== */

    function stopTypingThree() {

        if (typingTimerThree !== null) {

            clearTimeout(typingTimerThree);

            typingTimerThree = null;

        }

    }


    /* =====================================================
       STOP TIMERS
    ===================================================== */

    function stopTimersThree() {

        if (nextSlideTimerThree !== null) {

            clearTimeout(nextSlideTimerThree);

            nextSlideTimerThree = null;

        }

        stopTypingThree();

    }


    /* =====================================================
       STOP SPEECH
    ===================================================== */

    function stopSpeechThree() {

        if ("speechSynthesis" in window) {

            window.speechSynthesis.cancel();

        }

    }


    /* =====================================================
       STOP EVERYTHING
    ===================================================== */

    function stopSliderThree() {

        stopTimersThree();

        stopSpeechThree();

    }


    /* =====================================================
       3D ROTATION
    ===================================================== */

    function rotateSliderThree() {


        const totalSlides = sliderThreeContent.length;

        const rotation =
            currentSlideThree * (360 / totalSlides);


        console.log(
            "SLIDER 3 ROTATION:",
            rotation + "deg"
        );


        sliderThree.style.transform =
            `translate(-50%, -50%) rotateY(${rotation}deg)`;

    }


    /* =====================================================
       TYPE SLIDER 3 CONTENT
    ===================================================== */

    function typeSliderThreeContent(content) {

        stopTypingThree();

        stopSpeechThree();


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


                typingTimerThree =
                    setTimeout(
                        typeTitle,
                        titleTypingSpeed
                    );

            }

            else {

                typingTimerThree =
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


                typingTimerThree =
                    setTimeout(
                        typeDescription,
                        textTypingSpeed
                    );

            }

            else {

                typingTimerThree = null;


                console.log(
                    "Slider 3 typing completed."
                );


                speakSliderThree(
                    content.text
                );

            }

        }


        typeTitle();

    }


    /* =====================================================
       SPEECH
    ===================================================== */

    function speakSliderThree(text) {

        if (!("speechSynthesis" in window)) {

            console.error(
                "Speech synthesis not supported."
            );

            moveToNextSliderThree();

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
                "Slider 3 speech started - Slide",
                currentSlideThree + 1
            );

        };


        speech.onend = function () {

            console.log(
                "Slider 3 speech completed - Slide",
                currentSlideThree + 1
            );


            nextSlideTimerThree =
                setTimeout(function () {

                    nextSlideTimerThree = null;

                    moveToNextSliderThree();

                }, delayBeforeNextSlide);

        };


        speech.onerror = function (event) {

            console.error(
                "Slider 3 speech error:",
                event.error
            );


            moveToNextSliderThree();

        };


        window.speechSynthesis.speak(
            speech
        );

    }


    /* =====================================================
       NEXT SLIDE
    ===================================================== */

    function moveToNextSliderThree() {

        stopTypingThree();

        stopSpeechThree();


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
            currentSlideThree >=
            sliderThreeContent.length - 1
        ) {

            console.log("SLIDER 3 LAST SLIDE FINISHED");

            stopSliderThree();

            /* ---------------------------------------------
               GET WRAPPERS
            --------------------------------------------- */
            const sliderThreeWrapper =
                sliderThree.closest(".slider-wrapper-three");

            const sliderFourWrapper =
                document.querySelector(".slider-wrapper-four");

            /* ---------------------------------------------
               EXIT SLIDER 3 WRAPPER
            --------------------------------------------- */
            if (sliderThreeWrapper) {
                sliderThreeWrapper.style.transition =
                    "opacity 900ms ease, transform 900ms ease";
                sliderThreeWrapper.style.opacity = "0";
                sliderThreeWrapper.style.transform = "translateY(-50px)";
                sliderThreeWrapper.style.pointerEvents = "none";
            }

            sliderThree.style.opacity = "0";

        
            
            /* ---------------------------------------------
               AFTER SLIDER 3 DISAPPEARS → START SLIDER 4
            --------------------------------------------- */
            setTimeout(function () {

                /* HIDE SLIDER 3 COMPLETELY */
                if (sliderThreeWrapper) {
                    sliderThreeWrapper.style.visibility = "hidden";
                }

                /* REVEAL SLIDER 4 WRAPPER */
                if (sliderFourWrapper) {
                    sliderFourWrapper.style.transition = "none";
                    sliderFourWrapper.style.visibility = "visible";
                    sliderFourWrapper.style.opacity = "0";
                    sliderFourWrapper.style.transform = "translateY(50px)";
                    sliderFourWrapper.style.pointerEvents = "auto";

                    /* FORCE REFLOW so transition fires */
                    void sliderFourWrapper.offsetWidth;

                    sliderFourWrapper.style.transition =
                        "opacity 900ms ease, transform 900ms ease";
                    sliderFourWrapper.style.opacity = "1";
                    sliderFourWrapper.style.transform = "translateY(0)";
                }

                /* CALL SLIDER 4 */
                if (typeof window.startSliderFourSpeech === "function") {
                    console.log("STARTING SLIDER 4");
                    window.startSliderFourSpeech();
                } else {
                    console.error("ERROR: startSliderFourSpeech() not found. Load slider4.js!");
                }

            }, 1000);

            return;
        }




        /* =================================================
           NEXT SLIDE
        ================================================= */

        currentSlideThree++;


        console.log(
            "Moving to Slider 3 Slide",
            currentSlideThree + 1
        );


        /* =================================================
           ROTATE 3D
        ================================================= */

        rotateSliderThree();


        /* =================================================
           WAIT FOR ROTATION
        ================================================= */

        typingTimerThree =
            setTimeout(function () {

                typingTimerThree = null;


                typeSliderThreeContent(
                    sliderThreeContent[
                        currentSlideThree
                    ]
                );


            }, rotationDuration);

    }


    /* =====================================================
       PUBLIC START FUNCTION
    ===================================================== */

    window.startSliderThreeSpeech =
        function () {

            console.log(
                "================================"
            );

            console.log(
                "STARTING SLIDER 3"
            );

            console.log(
                "================================"
            );


            /* ---------------------------------------------
               STOP EVERYTHING
            --------------------------------------------- */

            stopSliderThree();


            /* ---------------------------------------------
               RESET SLIDE
            --------------------------------------------- */

            currentSlideThree = 0;


            /* ---------------------------------------------
               RESET ROTATION
            --------------------------------------------- */

            sliderThree.style.transform =
                "translate(-50%, -50%) rotateY(0deg)";


            /* ---------------------------------------------
               CLEAR TEXT
            --------------------------------------------- */

            typingTitle.textContent = "";

            typingText.textContent = "";


            /* ---------------------------------------------
               START SLIDE 1
            --------------------------------------------- */

            typeSliderThreeContent(
                sliderThreeContent[0]
            );

        };


    console.log(
        "Slider 3 3D system ready."
    );

});







































