// document.addEventListener("DOMContentLoaded", () => {

//     const fishVideo = document.querySelector(".fish-animation");

//     if (!fishVideo) return;

//     fishVideo.muted = true;
//     fishVideo.loop = true;
//     fishVideo.playsInline = true;
//     fishVideo.preload = "auto";

//     const startFish = () => {
//         fishVideo.play().catch(() => {
//             console.log("Fish video waiting for browser permission");
//         });
//     };

//     startFish();

//     fishVideo.addEventListener("ended", () => {
//         fishVideo.currentTime = 0;
//         startFish();
//     });

//     fishVideo.addEventListener("pause", () => {
//         if (!fishVideo.ended) {
//             startFish();
//         }
//     });

// });


// document.addEventListener("DOMContentLoaded", () => {

//     const fishVideo = document.querySelector(".fish-animation");

//     if (!fishVideo) return;

//     fishVideo.muted = true;
//     fishVideo.loop = true;
//     fishVideo.playsInline = true;
//     fishVideo.preload = "auto";

//     fishVideo.play().catch(() => {
//         console.log("Fish video waiting for browser permission");
//     });

// });


// document.addEventListener("DOMContentLoaded", () => {

//     const fishVideo = document.querySelector(".fish-animation");

//     if (!fishVideo) return;

//     fishVideo.muted = true;
//     fishVideo.loop = false;
//     fishVideo.playsInline = true;
//     fishVideo.preload = "auto";

//     let reversing = false;
//     let animationFrame;

//     fishVideo.addEventListener("loadedmetadata", () => {
//         fishVideo.play();
//     });

//     function animateFish() {

//         if (!fishVideo.paused && !fishVideo.ended) {

//             if (!reversing) {

//                 // Normal forward playback
//                 if (fishVideo.currentTime >= fishVideo.duration - 0.03) {
//                     reversing = true;
//                 }

//             } else {

//                 // Reverse playback
//                 fishVideo.currentTime -= 0.03;

//                 if (fishVideo.currentTime <= 0.03) {
//                     reversing = false;
//                     fishVideo.currentTime = 0;
//                 }
//             }
//         }

//         animationFrame = requestAnimationFrame(animateFish);
//     }

//     fishVideo.addEventListener("play", () => {
//         cancelAnimationFrame(animationFrame);
//         animateFish();
//     });

// });


// document.addEventListener("DOMContentLoaded", () => {

//     const fishVideo = document.querySelector(".fish-animation");

//     if (!fishVideo) return;

//     fishVideo.muted = true;
//     fishVideo.loop = true;
//     fishVideo.playsInline = true;
//     fishVideo.preload = "auto";

//     fishVideo.play().catch(() => {
//         console.log("Fish video could not autoplay.");
//     });

// });
