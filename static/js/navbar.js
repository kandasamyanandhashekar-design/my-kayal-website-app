/* =====================================================
   KAYAL VENTURERS
   3D GLASS NAVBAR JAVASCRIPT
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {


        console.log(
            "navbar.js loaded"
        );


        /* =================================================
           ELEMENTS
        ================================================= */

        const navbar =
            document.getElementById(
                "navbar"
            );


        const menuToggle =
            document.getElementById(
                "menuToggle"
            );


        const navMenu =
            document.getElementById(
                "navMenu"
            );


        const navLinks =
            document.querySelectorAll(
                ".nav-link"
            );


        const chatButton =
            document.getElementById(
                "navChatButton"
            );


        /* =================================================
           CHECK NAVBAR
        ================================================= */

        if (!navbar) {

            console.error(
                "Navbar not found."
            );

            return;

        }


        /* =================================================
           SCROLL EFFECT
        ================================================= */

        function handleScroll() {

            if (
                window.scrollY > 50
            ) {

                document.body.classList.add(
                    "scrolled"
                );

            }

            else {

                document.body.classList.remove(
                    "scrolled"
                );

            }

        }


        window.addEventListener(
            "scroll",
            handleScroll,
            {
                passive: true
            }
        );


        handleScroll();


        /* =================================================
           3D MOUSE TILT
        ================================================= */

        navbar.addEventListener(
            "mousemove",
            function (event) {


                /* -----------------------------------------
                   Disable on mobile
                ----------------------------------------- */

                if (
                    window.innerWidth <= 900
                ) {

                    return;

                }


                const rect =
                    navbar.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                const centerX =
                    rect.width / 2;


                const centerY =
                    rect.height / 2;


                let rotateY =
                    (
                        (x - centerX) /
                        centerX
                    ) * 3;


                let rotateX =
                    (
                        (centerY - y) /
                        centerY
                    ) * 2;


                /* -----------------------------------------
                   Limit rotation
                ----------------------------------------- */

                rotateY =
                    Math.max(
                        -3,
                        Math.min(
                            3,
                            rotateY
                        )
                    );


                rotateX =
                    Math.max(
                        -2,
                        Math.min(
                            2,
                            rotateX
                        )
                    );


                navbar.style.transform =

                    `
                    perspective(1200px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    `;

            }
        );


        /* =================================================
           RESET TILT
        ================================================= */

        navbar.addEventListener(
            "mouseleave",
            function () {

                navbar.style.transform =
                    `
                    perspective(1200px)
                    rotateX(0deg)
                    rotateY(0deg)
                    `;

            }
        );


        /* =================================================
           MOBILE MENU
        ================================================= */

        if (
            menuToggle &&
            navMenu
        ) {


            menuToggle.addEventListener(
                "click",
                function () {


                    menuToggle.classList.toggle(
                        "active"
                    );


                    navMenu.classList.toggle(
                        "open"
                    );


                    const isOpen =
                        navMenu.classList.contains(
                            "open"
                        );


                    menuToggle.setAttribute(
                        "aria-label",
                        isOpen
                            ? "Close navigation menu"
                            : "Open navigation menu"
                    );


                }
            );

        }


        /* =================================================
           CLOSE MOBILE MENU
        ================================================= */

        navLinks.forEach(
            function (link) {

                link.addEventListener(
                    "click",
                    function () {


                        if (navMenu) {

                            navMenu.classList.remove(
                                "open"
                            );

                        }


                        if (menuToggle) {

                            menuToggle.classList.remove(
                                "active"
                            );

                        }

                    }
                );

            }
        );


        /* =================================================
           ACTIVE NAVIGATION
        ================================================= */

        const sections =
            document.querySelectorAll(
                "section[id]"
            );


        function updateActiveNavigation() {

            /*changed this section*/
            
            // let current =
            //     "home";

            let current = null;


            sections.forEach(
                function (section) {


                    const sectionTop =
                        section.offsetTop -
                        180;


                    if (
                        window.scrollY >=
                        sectionTop
                    ) {

                        current =
                            section.getAttribute(
                                "id"
                            );

                    }

                }
            );


            navLinks.forEach(
                function (link) {


                    link.classList.remove(
                        "active"
                    );


                    const href =
                        link.getAttribute(
                            "href"
                        );


                    if (
                        href ===
                        "#" + current
                    ) {

                        link.classList.add(
                            "active"
                        );

                    }

                }
            );

        }


        window.addEventListener(
            "scroll",
            updateActiveNavigation,
            {
                passive: true
            }
        );


        updateActiveNavigation();



        /* =================================================
                    LOGIN BUTTON
            ================================================= */

        const loginButton =
             document.getElementById("loginButton");

        const loginScreen =
            document.getElementById("loginScreen");


        if (loginButton && loginScreen) {

            loginButton.addEventListener(
             "click",
        function (event) {

            event.preventDefault();

            loginScreen.classList.add("show");

            document.body.style.overflow = "hidden";

        }
    );

}


        /* =================================================
           CHAT BUTTON
        ================================================= */

        if (chatButton) {

            chatButton.addEventListener(
                "click",
                function () {


                    /*
                       Connect this later to
                       your existing chat button.
                    */


                    const existingChatButton =
                        document.getElementById(
                            "chatButton"
                        );


                    if (
                        existingChatButton
                    ) {

                        existingChatButton.click();

                    }

                    else {

                        console.log(
                            "Existing chat button not found."
                        );

                    }

                }
            );

        }


        /* =================================================
           WINDOW RESIZE
        ================================================= */

        window.addEventListener(
            "resize",
            function () {


                if (
                    window.innerWidth <= 900
                ) {

                    navbar.style.transform =
                        "none";

                }

                else {

                    navMenu &&
                    navMenu.classList.remove(
                        "open"
                    );


                    menuToggle &&
                    menuToggle.classList.remove(
                        "active"
                    );

                }

            }
        );


        /* =================================================
           INITIAL LOAD ANIMATION
        ================================================= */

        navbar.style.opacity = "0";

        navbar.style.transform =
            "translateY(-25px)";


        setTimeout(
            function () {


                navbar.style.transition =

                    `
                    opacity 0.7s ease,
                    transform 0.7s
                    cubic-bezier(
                        0.22,
                        1,
                        0.36,
                        1
                    )
                    `;


                navbar.style.opacity = "1";


                navbar.style.transform =
                    "translateY(0)";


            },
            100
        );


    }
);