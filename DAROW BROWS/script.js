function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top < window.innerHeight - 100 && // элемент появился снизу
        rect.bottom > 0
    );
}


function handleScrollAnimation() {
    const elements = document.querySelectorAll('.scroll-animate');
    elements.forEach(el => {
        if (isElementInViewport(el)) {
            el.classList.add('visible');
        }
    });
}

window.addEventListener('load', handleScrollAnimation);

window.addEventListener('scroll', handleScrollAnimation);


// ===== МОБИЛЬНЫЙ СЛАЙДЕР С СВАЙПОМ =====
(function() {
    const slider = document.getElementById('mobileSlider');
    if (!slider) return;

    const slides = slider.querySelectorAll('.mobile-slide');
    const dotsContainer = document.getElementById('mobileDots');
    let currentIndex = 0;
    let startX = 0;
    let currentX = 0;
    let isDragging = false;
    let isSwiping = false;

    slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.className = 'mobile-dot' + (index === 0 ? ' active' : '');
        dot.setAttribute('data-index', index);
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll('.mobile-dot');

    function goToSlide(index) {
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;
        
        currentIndex = index;
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }

    // Touch события для свайпа
    slider.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
        isSwiping = false;
        slider.style.transition = 'none';
    }, { passive: true });

    slider.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        currentX = e.touches[0].clientX;
        const diff = currentX - startX;
        
        if (Math.abs(diff) > 5) {
            isSwiping = true;
            e.preventDefault(); 
        }
        
        const offset = -currentIndex * 100 + (diff / slider.offsetWidth) * 100;
        slider.style.transform = `translateX(${offset}%)`;
    }, { passive: false });

    slider.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        isDragging = false;
        slider.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        
        if (isSwiping) {
            const diff = currentX - startX;
            const threshold = 50; 
            
            if (diff < -threshold) {
                goToSlide(currentIndex + 1);
            } else if (diff > threshold) {
                goToSlide(currentIndex - 1);
            } else {
                goToSlide(currentIndex);
            }
        }
        
        isSwiping = false;
    }, { passive: true });

    let mouseStartX = 0;
    let mouseCurrentX = 0;
    let isMouseDown = false;

    slider.addEventListener('mousedown', (e) => {
        if (window.innerWidth > 768) return;
        mouseStartX = e.clientX;
        isMouseDown = true;
        slider.style.transition = 'none';
        slider.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', (e) => {
        if (!isMouseDown || window.innerWidth > 768) return;
        mouseCurrentX = e.clientX;
        const diff = mouseCurrentX - mouseStartX;
        const offset = -currentIndex * 100 + (diff / slider.offsetWidth) * 100;
        slider.style.transform = `translateX(${offset}%)`;
    });

    document.addEventListener('mouseup', (e) => {
        if (!isMouseDown || window.innerWidth > 768) return;
        isMouseDown = false;
        slider.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        slider.style.cursor = 'grab';
        
        const diff = mouseCurrentX - mouseStartX;
        if (diff < -50) {
            goToSlide(currentIndex + 1);
        } else if (diff > 50) {
            goToSlide(currentIndex - 1);
        } else {
            goToSlide(currentIndex);
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            slider.style.transform = 'none';
        } else {
            goToSlide(currentIndex);
        }
    });

    window.goToMobileSlide = goToSlide;
})();


// ===== МОБИЛЬНЫЙ СЛАЙДЕР УСЛУГ =====
(function() {
    const slider = document.getElementById('mobilePriceSlider');
    if (!slider) return;

    const slides = slider.querySelectorAll('.mobile-price-slide');
    const dotsContainer = document.getElementById('mobilePriceDots');
    let currentIndex = 0;
    let startX = 0;
    let currentX = 0;
    let isDragging = false;
    let isSwiping = false;
    let slideWidthPercent = 65; // ширина слайда в %
    let gapPercent = 0; // gap между слайдами в % (будем вычислять)

    // Создаем точки
    slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.className = 'mobile-price-dot' + (index === 0 ? ' active' : '');
        dot.setAttribute('data-index', index);
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll('.mobile-price-dot');

    // Вычисляем реальную ширину слайда в процентах с учетом gap
    function getActualSlideWidth() {
        const containerWidth = slider.parentElement.offsetWidth;
        const slideWidth = slides[0]?.offsetWidth || 0;
        if (containerWidth > 0 && slideWidth > 0) {
            return (slideWidth / containerWidth) * 100;
        }
        return slideWidthPercent;
    }

    function goToSlide(index) {
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;
        
        currentIndex = index;
        const actualWidth = getActualSlideWidth();
        slider.style.transform = `translateX(-${currentIndex * actualWidth}%)`;
        
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }

    // Обновляем при ресайзе
    function updateSlider() {
        if (window.innerWidth <= 768) {
            goToSlide(currentIndex);
        } else {
            slider.style.transform = 'none';
        }
    }

    // Touch события
    slider.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
        isSwiping = false;
        slider.style.transition = 'none';
    }, { passive: true });

    slider.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        currentX = e.touches[0].clientX;
        const diff = currentX - startX;
        
        if (Math.abs(diff) > 5) {
            isSwiping = true;
            e.preventDefault();
        }
        
        const actualWidth = getActualSlideWidth();
        const offset = -currentIndex * actualWidth + (diff / slider.offsetWidth) * 100;
        slider.style.transform = `translateX(${offset}%)`;
    }, { passive: false });

    slider.addEventListener('touchend', () => {
        if (!isDragging) return;
        isDragging = false;
        slider.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        
        if (isSwiping) {
            const diff = currentX - startX;
            const threshold = 20; // уменьшенный порог
            
            if (diff < -threshold) {
                goToSlide(currentIndex + 1);
            } else if (diff > threshold) {
                goToSlide(currentIndex - 1);
            } else {
                goToSlide(currentIndex);
            }
        }
        isSwiping = false;
    }, { passive: true });

    // Поддержка мыши
    let mouseStartX = 0;
    let mouseCurrentX = 0;
    let isMouseDown = false;

    slider.addEventListener('mousedown', (e) => {
        if (window.innerWidth > 768) return;
        mouseStartX = e.clientX;
        isMouseDown = true;
        slider.style.transition = 'none';
        slider.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', (e) => {
        if (!isMouseDown || window.innerWidth > 768) return;
        mouseCurrentX = e.clientX;
        const diff = mouseCurrentX - mouseStartX;
        const actualWidth = getActualSlideWidth();
        const offset = -currentIndex * actualWidth + (diff / slider.offsetWidth) * 100;
        slider.style.transform = `translateX(${offset}%)`;
    });

    document.addEventListener('mouseup', () => {
        if (!isMouseDown || window.innerWidth > 768) return;
        isMouseDown = false;
        slider.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        slider.style.cursor = 'grab';
        
        const diff = mouseCurrentX - mouseStartX;
        if (diff < -20) {
            goToSlide(currentIndex + 1);
        } else if (diff > 20) {
            goToSlide(currentIndex - 1);
        } else {
            goToSlide(currentIndex);
        }
    });

    window.addEventListener('resize', updateSlider);

    // Инициализация
    setTimeout(() => {
        if (window.innerWidth <= 768) {
            goToSlide(0);
        }
    }, 100);

    window.goToMobilePriceSlide = goToSlide;
})();