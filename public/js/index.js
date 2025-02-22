const windowHeight = window.innerHeight;

function handleScrollAnimations() {
    const scrollTop = window.scrollY;

    document.querySelectorAll('.screenshot-bg').forEach(elem => {
        const elemBox = document.getElementById('screenshot').getBoundingClientRect(),
        start = 0;
        end = elemBox.bottom + scrollTop,
        angleRad = getComputedStyle(elem).getPropertyValue('--angle') * Math.PI / 180,
        distance = parseFloat(getComputedStyle(elem).getPropertyValue('--distance'));

        if (scrollTop >= start && scrollTop <= end) {
            // Calculate how far into the animation we are
            const progress = (scrollTop - start) / (end - start),
                x = distance * progress * Math.sin(angleRad),
                y = distance * progress * Math.cos(angleRad);

            // Set the element's transform based on the scroll progress
            elem.style.transform = `translateX(${x}px) translateY(${y}px)`;
        } else {
            // If before the start, reset the element's position
            elem.style.transform = `translate(0px)`;
        }
    });

    document.querySelectorAll('.fade-in').forEach(elem => {
        const elemTop = elem.getBoundingClientRect().top + scrollTop,
        start = elemTop - windowHeight,
        end = elemTop - (windowHeight * (3/4));

        if (scrollTop >= start && scrollTop <= end) {
            // Calculate how far into the animation we are
            const progress = (scrollTop - start) / (end - start);

            elem.style.opacity = progress;
            elem.style.transform = `translateY(${100 * (1 - progress)}px)`;
        } else if (scrollTop > end) {
            // If scrolled past, set to final state
            elem.style.opacity = 1;
            elem.style.transform = 'translateY(0)';
        } else {
            // If not yet reached, set to initial state
            elem.style.opacity = 0;
            elem.style.transform = 'translateY(100px)';
        }
    });

    requestAnimationFrame(handleScrollAnimations);
}

// Start the scroll animation
window.addEventListener('scroll', handleScrollAnimations);

function imagesLoaded(imgs) {
    return new Promise(res => {
        let numLoaded = 0;
        const totalImgs = imgs.length;
        imgs.forEach(img => {
            if(img.complete) {
                numLoaded++;
                if(numLoaded == totalImgs) res();
            }
            else {
                img.addEventListener('load', () => {
                    numLoaded++;
                    if(numLoaded == totalImgs) res();
                });
            }
        });
    });
}

imagesLoaded(document.querySelectorAll('.screenshot')).then(() => {
    document.querySelectorAll('.anim').forEach(elem => {
        elem.classList.add('loaded');
    });
    document.querySelectorAll('.hidden-load').forEach(elem => {
        elem.classList.remove('hide');
    });
    document.querySelectorAll('.unloaded').forEach(elem => {
        elem.classList.remove('unloaded');
    });
});