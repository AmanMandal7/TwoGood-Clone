// Using this locomotiveScroller() if you want to use locomotive and scrollTrigger both simultaneously

function locomotiveScroller() {
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector(".main"),
        smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy(".main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
    });

    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();
}
locomotiveScroller();

// Uisng this locomotiveScroller() if you want to use only locomotiveScroller and not the scrollTrigger 

// function locomotiveScroller() {
//     const scroll = new LocomotiveScroll({
//         el: document.querySelector('.main'),
//         smooth: true
//     });
// }
// locomotiveScroller();

function navAnimation() {
    gsap.to("nav .left svg", {
        transform: "translateY(-100%)",
        scrollTrigger: {
            trigger: ".page1",
            scroller: ".main",
            start: "top 0",
            end: "top -5",
            scrub: 1
        }
    })
    
    gsap.to("nav .right .links", {
        transform: "translateY(-100%)",
        opacity: 0,
        scrollTrigger: {
            trigger: ".page1",
            scroller: ".main",
            start: "top 0",
            end: "top -5",
            scrub: 1
        }
    })
}
navAnimation();

function imageCursor() {
    document.addEventListener("mousemove", function (dets) {
        gsap.to('.cursor', {
            x: dets.x,
            y: dets.y
        })
    });

    const image = document.querySelectorAll(".page3 .image");

    image.forEach((e) => {
        e.addEventListener("mouseenter", function () {
            gsap.to('.cursor', {
                transform: 'translate(-50%, -50%) scale(1)',
                opacity: 1,
            })
        })

        e.addEventListener("mouseleave", function () {
            gsap.to('.cursor', {
                transform: 'translate(-50%, -50%) scale(0)',
                opacity: 0,
            })
        })
    })
}
imageCursor();

function page1Anim() {
    const tl = gsap.timeline();
    tl.from(".page1 h1", {
        y: 400,
        delay: 0.5,
        stagger: 0.25,
        ease: 'power1'
    })
    tl.from(".video-container", {
        opacity: 0,
        duration: 0.1

    })


    const play = document.querySelector(".page1 .video-container .play");
    const videoContainer = document.querySelector(".page1 .video-container")

    gsap.to(play, {
        scale: 0,
        opacity: 0
    })

    videoContainer.addEventListener("mousemove", function (dets) {
        gsap.to(play, {
            x: dets.offsetX,
            y: dets.offsetY,
            ease: "power1",
            duration: 0.5
        })
    })

    videoContainer.addEventListener("mouseenter", function () {
        gsap.to(play, {
            scale: 1,
            opacity: 1,
            duration: 0.3
        })
    })

    videoContainer.addEventListener("mouseleave", function () {
        gsap.to(play, {
            opacity: 0,
            scale: 0,
            duration: 0.3
        })
    })
}
page1Anim();




