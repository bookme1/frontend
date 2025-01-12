'use client';

export function lazyloadExp() {
    document.addEventListener('DOMContentLoaded', function () {
        var lazyloadImages = document.querySelectorAll('.lazyload');
        var lazyloadThrottleTimeout;

        function lazyload() {
            if (lazyloadThrottleTimeout) {
                clearTimeout(lazyloadThrottleTimeout);
            }
            lazyloadThrottleTimeout = setTimeout(function () {
                var scrollTop = window.pageYOffset;
                lazyloadImages.forEach(function (div) {
                    if (div.offsetTop < window.innerHeight + scrollTop) {
                        div.style.backgroundImage =
                            'url(' + div.getAttribute('data-bg') + ')';
                        div.classList.remove('lazyload');
                    }
                });
                if (lazyloadImages.length == 0) {
                    document.removeEventListener('scroll', lazyload);
                    window.removeEventListener('resize', lazyload);
                    window.removeEventListener('orientationChange', lazyload);
                }
            }, 20);
        }

        document.addEventListener('scroll', lazyload);
        window.addEventListener('resize', lazyload);
        window.addEventListener('orientationChange', lazyload);
    });
}
