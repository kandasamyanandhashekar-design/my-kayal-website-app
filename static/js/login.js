// /* =====================================================
//    KAYAL VENTURERS
//    LOGIN JAVASCRIPT
// ===================================================== */

// document.addEventListener("DOMContentLoaded", function () {


//     /* =================================================
//        GET LOGIN FORM
//     ================================================= */

//     const loginForm =
//         document.getElementById("loginForm");


//     /* =================================================
//        GET BACKGROUND COLOR CONTROL
//     ================================================= */

//     const backgroundColor =
//         document.getElementById("backgroundColor");


//     /* =================================================
//        LOGIN FORM
//     ================================================= */

//     if (loginForm) {

//         loginForm.addEventListener(
//             "submit",
//             function (event) {

//                 event.preventDefault();


//                 /* =========================================
//                    GET USERNAME
//                 ========================================== */

//                 const username =
//                     document
//                         .getElementById("username")
//                         .value
//                         .trim();


//                 /* =========================================
//                    GET PASSWORD
//                 ========================================== */

//                 const password =
//                     document
//                         .getElementById("password")
//                         .value;


//                 /* =========================================
//                    BASIC CHECK
//                 ========================================== */

//                 if (
//                     username === "" ||
//                     password === ""
//                 ) {

//                     alert(
//                         "Please enter your username and password."
//                     );

//                     return;

//                 }


//                 /* =========================================
//                    TEMPORARY LOGIN
                   
//                    IMPORTANT:
//                    This is only a frontend test.
//                    It is NOT secure authentication.
//                 ========================================== */

//                 console.log(
//                     "Username:",
//                     username
//                 );

//                 console.log(
//                     "Login submitted."
//                 );


//                 alert(
//                     "Login submitted successfully."
//                 );

//             }
//         );

//     }


//     /* =================================================
//        BACKGROUND COLOR CONTROL
//     ================================================= */

//     if (backgroundColor) {

//         backgroundColor.addEventListener(
//             "input",
//             function () {

//                 document.documentElement.style
//                     .setProperty(
//                         "--background-color",
//                         this.value
//                     );

//             }
//         );

//     }

// });




/* =====================================================
   KAYAL VENTURERS
   LOGIN JAVASCRIPT
===================================================== */

document.addEventListener("DOMContentLoaded", function () {


    /* =================================================
       GET LOGIN FORM
    ================================================= */

    const loginForm =
        document.getElementById("loginForm");


    /* =================================================
       GET BACKGROUND COLOR CONTROL
    ================================================= */

    const backgroundColor =
        document.getElementById("backgroundColor");


    /* =================================================
       LOGIN FORM
    ================================================= */

    if (loginForm) {

        loginForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                /* =========================================
                   GET USERNAME
                ========================================== */

                const username =
                    document
                        .getElementById("username")
                        .value
                        .trim();


                /* =========================================
                   GET PASSWORD
                ========================================== */

                const password =
                    document
                        .getElementById("password")
                        .value;


                /* =========================================
                   BASIC CHECK
                ========================================== */

                if (
                    username === "" ||
                    password === ""
                ) {

                    alert(
                        "Please enter your username and password."
                    );

                    return;

                }


                /* =========================================
                   TEMPORARY LOGIN
                   
                   IMPORTANT:
                   This is only a frontend test.
                   It is NOT secure authentication.
                ========================================== */

                console.log(
                    "Username:",
                    username
                );

                console.log(
                    "Login submitted."
                );


                alert(
                    "Login submitted successfully."
                );

            }
        );

    }


    /* =================================================
       BACKGROUND COLOR CONTROL
    ================================================= */

    if (backgroundColor) {

        backgroundColor.addEventListener(
            "input",
            function () {

                document.documentElement.style
                    .setProperty(
                        "--background-color",
                        this.value
                    );

            }
        );

    }

});