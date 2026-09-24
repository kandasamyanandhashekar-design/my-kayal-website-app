// // Wait for the DOM to fully load
// document.addEventListener('DOMContentLoaded', function() {

//     console.log('🖼️ Image Gallery Loaded Successfully!');

//     // ----- 1. IMAGE CLICK ALERT -----
//     // Get all gallery images
//     const images = document.querySelectorAll('.gallery img');

//     images.forEach((img, index) => {
//         img.addEventListener('click', function(e) {
//             // Get the image alt text
//             const altText = this.getAttribute('alt') || 'Image';
//             console.log(`📸 Clicked: ${altText}`);
            
//             // Optional: Show a friendly alert
//             // alert(`You clicked on: ${altText}`);
//         });
//     });

//     // ----- 2. IMAGE COUNTER -----
//     const totalImages = document.querySelectorAll('.responsive').length;
//     console.log(`📊 Total images in gallery: ${totalImages}`);

//     // ----- 3. HOVER EFFECT LOG (optional) -----
//     const galleryItems = document.querySelectorAll('.gallery');
    
//     galleryItems.forEach((item, index) => {
//         item.addEventListener('mouseenter', function() {
//             const desc = this.querySelector('.desc');
//             if (desc) {
//                 console.log(`👆 Hovering over: ${desc.textContent.trim()}`);
//             }
//         });
//     });

//     // ----- 4. KEYBOARD SHORTCUT: Press 'R' to reset view -----
//     document.addEventListener('keydown', function(e) {
//         if (e.key === 'r' || e.key === 'R') {
//             // Scroll to top of page smoothly
//             window.scrollTo({
//                 top: 0,
//                 behavior: 'smooth'
//             });
//             console.log('🔄 Scrolled to top (keyboard shortcut: R)');
//         }
//     });

//     // ----- 5. WINDOW RESIZE LOG -----
//     let resizeTimeout;
//     window.addEventListener('resize', function() {
//         clearTimeout(resizeTimeout);
//         resizeTimeout = setTimeout(() => {
//             const width = window.innerWidth;
//             let layout = '';
            
//             if (width > 700) {
//                 layout = '4 columns';
//             } else if (width > 500) {
//                 layout = '2 columns';
//             } else {
//                 layout = '1 column (stacked)';
//             }
            
//             console.log(`📱 Window resized to ${width}px → ${layout}`);
//         }, 300);
//     });

//     // ----- 6. DYNAMIC DESCRIPTION UPDATE (example) -----
//     // Change the description of the first image after 5 seconds
//     setTimeout(() => {
//         const firstDesc = document.querySelector('.desc');
//         if (firstDesc) {
//             // You can uncomment this to test dynamic updates
//             // firstDesc.textContent = '✨ Updated description!';
//             // console.log('✏️ First description updated dynamically');
//         }
//     }, 5000);

//     // ----- 7. ADD CLICK COUNTER (optional feature) -----
//     let clickCount = 0;
//     const allImages = document.querySelectorAll('.gallery img');
    
//     allImages.forEach(img => {
//         img.addEventListener('click', function() {
//             clickCount++;
//             console.log(`👆 Total image clicks: ${clickCount}`);
            
//             // Show click count in console
//             if (clickCount === 5) {
//                 console.log('⭐ You\'ve clicked 5 images!');
//             }
//         });
//     });

//     console.log('✅ Gallery ready! Try:\n');
//     console.log('  • Click any image');
//     console.log('  • Hover over a gallery card');
//     console.log('  • Press "R" to scroll to top');
//     console.log('  • Resize your browser window');
// });




document.addEventListener("DOMContentLoaded", function () {

    const productCards = document.querySelectorAll(".product-item");

    productCards.forEach(function (card) {

        card.addEventListener("click", function () {

            // Remove active effect from other cards
            productCards.forEach(function (otherCard) {
                if (otherCard !== card) {
                    otherCard.classList.remove("active");
                }
            });

            // Toggle current card
            card.classList.toggle("active");

        });

    });

});


document.addEventListener("DOMContentLoaded", function () {

    const productImages = document.querySelectorAll(".product-item img");

    // Create lightbox
    const lightbox = document.createElement("div");

    lightbox.className = "image-lightbox";

    lightbox.innerHTML = `
        <img src="" alt="">
    `;

    document.body.appendChild(lightbox);

    const lightboxImage = lightbox.querySelector("img");


    /* =====================================================
       CLICK PRODUCT IMAGE
    ===================================================== */

    productImages.forEach(function (image) {

        image.addEventListener("click", function (event) {

            // Prevent card click from activating
            event.stopPropagation();

            lightboxImage.src = image.src;
            lightboxImage.alt = image.alt;

            lightbox.classList.add("show");

        });

    });


    /* =====================================================
       CLICK OUTSIDE IMAGE = CLOSE
    ===================================================== */

    lightbox.addEventListener("click", function (event) {

        if (event.target === lightbox) {

            lightbox.classList.remove("show");

        }

    });


    /* =====================================================
       ESC KEY = CLOSE
    ===================================================== */

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {

            lightbox.classList.remove("show");

        }

    });

});



document.addEventListener("DOMContentLoaded", function () {

    const productImages = document.querySelectorAll(".product-item img");

    /* CREATE HINT */

    const photoHint = document.createElement("div");

    photoHint.className = "photo-hint";

    photoHint.textContent = "Click photo to enlarge";

    document.body.appendChild(photoHint);


    /* =====================================================
       MOUSE ENTER IMAGE
    ===================================================== */

    productImages.forEach(function (image) {

        image.addEventListener("mouseenter", function () {

            photoHint.classList.add("show");

        });


        /* =================================================
           MOVE CURSOR
        ================================================= */

        image.addEventListener("mousemove", function (event) {

            photoHint.style.left = (event.clientX + 15) + "px";

            photoHint.style.top = (event.clientY + 15) + "px";

        });


        /* =================================================
           LEAVE IMAGE
        ================================================= */

        image.addEventListener("mouseleave", function () {

            photoHint.classList.remove("show");

        });

    });

});