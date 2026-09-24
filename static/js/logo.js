// /* =====================================================
//    KAYAL VENTURERS
//    COMPANY LOGO INTRO
// ===================================================== */

// document.addEventListener(
//     "DOMContentLoaded",
//     function () {

//         console.log(
//             "Kayal Venturers logo intro started."
//         );


//         /* =================================================
//            GET LOGO INTRO
//         ================================================= */

//         const logoIntro =
//             document.getElementById(
//                 "logoIntro"
//             );


//         if (!logoIntro) {

//             console.error(
//                 "ERROR: #logoIntro not found."
//             );

//             return;
//         }


//         /* =================================================
//            INTRO DURATION
           
//            4200 = 4.2 seconds
//         ================================================= */

//         const introDuration = 4200;


//         /* =================================================
//            WAIT THEN EXIT
//         ================================================= */

//         setTimeout(
//             function () {

//                 console.log(
//                     "Logo intro completed."
//                 );


//                 /* -----------------------------------------
//                    FADE OUT LOGO
//                 ----------------------------------------- */

//                 logoIntro.classList.add(
//                     "logo-intro-hide"
//                 );


//                 /* -----------------------------------------
//                    START SLIDER 1
//                 ----------------------------------------- */

//                 setTimeout(
//                     function () {

//                         console.log(
//                             "Starting Slider 1..."
//                         );


//                         /*
//                          * If your Slider 1 JavaScript
//                          * has this function, start it.
//                          */

//                         if (
//                             typeof
//                             window.startSliderOneSpeech
//                             ===
//                             "function"
//                         ) {

//                             window.startSliderOneSpeech();

//                         }

//                     },
//                     1200
//                 );


//             },
//             introDuration
//         );

//     }
// );





document.addEventListener("DOMContentLoaded", function () {

    const logoIntro =
        document.getElementById("logoIntro");


    /* =====================================================
       WAIT FOR LOGO ANIMATION
    ===================================================== */

    setTimeout(function () {

        /*
         * Start exit animation
         */

        logoIntro.classList.add("logo-exit");


    }, 5000);


    /* =====================================================
       AFTER LOGO COMPLETELY DISAPPEARS
    ===================================================== */

    logoIntro.addEventListener(
        "animationend",
        function (event) {

            /*
             * Only respond to final exit animation
             */

            if (event.animationName !== "logoIntroExit") {

                return;

            }


            /*
             * Completely remove logo intro
             */

            logoIntro.style.display = "none";


            /*
             * NOW START YOUR 3D SLIDER
             */

            if (
                typeof window.startSliderOne ===
                "function"
            ) {

                window.startSliderOne();

            }


            /*
             * If your existing slider uses
             * another function name,
             * call that function here.
             */

        }
    );

});
