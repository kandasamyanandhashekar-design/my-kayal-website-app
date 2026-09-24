// /* =====================================================
//    SLIDER 1 → SLIDER 2 TRANSITION
//    ===================================================== */

// const sliderOneWrapper =
//     document.querySelector(".slider-wrapper-one");

// const sliderTwoWrapper =
//     document.querySelector(".slider-wrapper-two");


// function showSliderTwo() {

//     /* -----------------------------------------------
//        SLIDER 1 EXIT
//     ----------------------------------------------- */

//     sliderOneWrapper.classList.add("slider-exit");


//     /* -----------------------------------------------
//        Wait for Slider 1 exit animation
//     ----------------------------------------------- */

//     setTimeout(() => {

//         sliderOneWrapper.style.visibility = "hidden";


//         /* -------------------------------------------
//            SLIDER 2 BECOMES VISIBLE
//         ------------------------------------------- */

//         sliderTwoWrapper.style.visibility = "visible";

//         sliderTwoWrapper.classList.add("slider-enter");


//     }, 1200);
// }






// document.addEventListener("DOMContentLoaded", () => {

//     const sliderOne = document.querySelector(".slider");
//     const sliderTwo = document.querySelector(".slider-two");

//     if (!sliderOne || !sliderTwo) {
//         console.log("Slider elements not found");
//         return;
//     }

//     // Slider 2 is hidden initially
//     sliderTwo.style.opacity = "0";
//     sliderTwo.style.visibility = "hidden";
//     sliderTwo.style.pointerEvents = "none";


//     /*
//     =====================================================
//     WAIT FOR SLIDER 1 COMPLETE 15 SECOND CYCLE
//     =====================================================
//     */

//     setTimeout(() => {

//         // -----------------------------------------------
//         // SLIDER 1 EXIT
//         // -----------------------------------------------

//         sliderOne.classList.add("slider-one-exit");


//         // -----------------------------------------------
//         // WAIT FOR EXIT ANIMATION
//         // -----------------------------------------------

//         setTimeout(() => {

//             sliderOne.style.visibility = "hidden";
//             sliderOne.style.pointerEvents = "none";


//             // -------------------------------------------
//             // SHOW SLIDER 2
//             // -------------------------------------------

//             sliderTwo.style.visibility = "visible";
//             sliderTwo.style.pointerEvents = "auto";

//             sliderTwo.classList.add("slider-two-enter");


//         }, 1200);


//     }, 15000);

// })


// document.addEventListener("DOMContentLoaded", () => {

//     const sliderOne = document.querySelector(".slider");
//     const sliderTwo = document.querySelector(".slider-two");

//     if (!sliderOne || !sliderTwo) {

//         console.error("Slider 1 or Slider 2 not found.");

//         return;
//     }


//     /* =====================================================
//        INITIAL STATE
//        SLIDER 1 = VISIBLE
//        SLIDER 2 = HIDDEN
//     ===================================================== */

//     sliderTwo.style.opacity = "0";
//     sliderTwo.style.visibility = "hidden";
//     sliderTwo.style.pointerEvents = "none";


//     /* =====================================================
//        FUNCTION:
//        SLIDER 1 → SLIDER 2
//     ===================================================== */

//     window.startSliderTransition = function () {

//         console.log("Starting Slider 1 → Slider 2 transition");


//         /* -------------------------------------------------
//            SLIDER 1 EXIT
//         ------------------------------------------------- */

//         sliderOne.classList.add("slider-one-exit");


//         /* -------------------------------------------------
//            WAIT FOR EXIT ANIMATION
//         ------------------------------------------------- */

//         setTimeout(() => {

//             /* ---------------------------------------------
//                COMPLETELY HIDE SLIDER 1
//             --------------------------------------------- */

//             sliderOne.style.visibility = "hidden";
//             sliderOne.style.pointerEvents = "none";


//             /* ---------------------------------------------
//                SHOW SLIDER 2
//             --------------------------------------------- */

//             sliderTwo.style.visibility = "visible";
//             sliderTwo.style.pointerEvents = "auto";


//             /* ---------------------------------------------
//                SLIDER 2 ENTRY ANIMATION
//             --------------------------------------------- */

//             sliderTwo.classList.add("slider-two-enter");


//             console.log("Slider 2 entry entered");




//         }, 1200);

//     };

// });


// document.addEventListener("DOMContentLoaded", () => {

//     const sliderOne =
//         document.querySelector(".slider");

//     const sliderTwo =
//         document.querySelector(".slider-two");


//     if (!sliderOne || !sliderTwo) {

//         console.error(
//             "Slider 1 or Slider 2 not found."
//         );

//         return;
//     }


//     /* =====================================================
//        INITIAL STATE
//     ===================================================== */

//     sliderTwo.style.opacity = "0";

//     sliderTwo.style.visibility = "hidden";

//     sliderTwo.style.pointerEvents = "none";


//     /* =====================================================
//        SLIDER 1 → SLIDER 2
//     ===================================================== */

//     window.startSliderTransition = function () {

//         console.log(
//             "Starting Slider 1 → Slider 2 transition"
//         );


//         /* =================================================
//            CLEAR OLD TYPING CONTENT
//         ================================================= */

//         const typingTitle =
//             document.getElementById("typingTitle");

//         const typingText =
//             document.getElementById("typingText");


//         if (typingTitle) {
//             typingTitle.textContent = "";
//         }

//         if (typingText) {
//             typingText.textContent = "";
//         }


//         /* =================================================
//            SLIDER 1 EXIT
//         ================================================= */

//         sliderOne.classList.add(
//             "slider-one-exit"
//         );


//         /* =================================================
//            WAIT FOR SLIDER 1 EXIT
//         ================================================= */

//         setTimeout(() => {


//             /* =============================================
//                HIDE SLIDER 1
//             ============================================= */

//             sliderOne.style.visibility =
//                 "hidden";

//             sliderOne.style.pointerEvents =
//                 "none";


//             /* =============================================
//                SHOW SLIDER 2
//             ============================================= */

//             sliderTwo.style.visibility =
//                 "visible";

//             sliderTwo.style.opacity =
//                 "1";

//             sliderTwo.style.pointerEvents =
//                 "auto";


//             /* =============================================
//                SLIDER 2 ENTRY
//             ============================================= */

//             sliderTwo.classList.add(
//                 "slider-two-enter"
//             );


//             console.log(
//                 "Slider 2 entry started"
//             );


//             /* =============================================
//                AFTER ENTRY → START 3D ROTATION
//             ============================================= */

//             setTimeout(() => {

//                 sliderTwo.classList.remove(
//                     "slider-two-enter"
//                 );


//                 sliderTwo.classList.add(
//                     "slider-two-rotate"
//                 );


//                 console.log(
//                     "Slider 2 entry completed → 3D rotation started"
//                 );

//             }, 1200);


//         }, 1200);

//     };

// });

/*------------------------------  I AM GOING SELECT THIS-------------*/


/* =====================================================
   SLIDER 1 → SLIDER 2 TRANSITION
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const sliderOne =
        document.querySelector(".slider");

    const sliderTwo =
        document.querySelector(".slider-two");


    /* =====================================================
       CHECK ELEMENTS
    ===================================================== */

    if (!sliderOne) {

        console.error("Slider 1 not found.");

        return;
    }


    if (!sliderTwo) {

        console.error("Slider 2 not found.");

        return;
    }


    console.log(
        "Slider transition system loaded."
    );


    /* =====================================================
       INITIAL SLIDER 2 STATE
    ===================================================== */

    sliderTwo.style.opacity = "0";

    sliderTwo.style.visibility = "hidden";

    sliderTwo.style.pointerEvents = "none";


    /* =====================================================
       SLIDER 1 → SLIDER 2
    ===================================================== */

    window.startSliderTransition = function () {

        console.log(
            "Starting Slider 1 → Slider 2"
        );


        /* =================================================
           SLIDER 1 EXIT
        ================================================= */

        sliderOne.classList.add(
            "slider-one-exit"
        );


        /* =================================================
           WAIT FOR SLIDER 1 EXIT
        ================================================= */

        setTimeout(function () {


            /* ---------------------------------------------
               HIDE SLIDER 1
            --------------------------------------------- */

            sliderOne.style.visibility =
                "hidden";

            sliderOne.style.pointerEvents =
                "none";


            /* ---------------------------------------------
               SHOW SLIDER 2
            --------------------------------------------- */

            sliderTwo.style.visibility =
                "visible";

            sliderTwo.style.opacity =
                "1";

            sliderTwo.style.pointerEvents =
                "auto";


            /* ---------------------------------------------
               RESET SLIDER 2
            --------------------------------------------- */

            sliderTwo.classList.remove(
                "slider-two-rotate"
            );


            sliderTwo.classList.add(
                "slider-two-enter"
            );


            console.log(
                "Slider 2 entry animation started."
            );


            /* =================================================
               AFTER ENTRY ANIMATION
            ================================================= */

            setTimeout(function () {


                /* ---------------------------------------------
                   REMOVE ENTRY
                --------------------------------------------- */

                sliderTwo.classList.remove(
                    "slider-two-enter"
                );


                /* ---------------------------------------------
                   START 3D ROTATION
                --------------------------------------------- */

                sliderTwo.classList.add(
                    "slider-two-rotate"
                );


                console.log(
                    "Slider 2 3D rotation started."
                );


                /* =================================================
                   START SLIDER 2 TYPING + SPEECH
                ================================================= */

                if (
                    typeof window.startSliderTwoSpeech ===
                    "function"
                ) {

                    console.log(
                        "Starting Slider 2 typing and speech..."
                    );


                    window.startSliderTwoSpeech();

                }

                else {

                    console.error(
                        "ERROR: startSliderTwoSpeech() not found."
                    );

                }

            }, 1200);


        }, 1200);

    };


});