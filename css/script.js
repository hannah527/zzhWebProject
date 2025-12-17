// script.js - 最終完整版 (修正 HOME 點擊問題)

document.addEventListener('DOMContentLoaded', () => {

    // =================================================================
    // --- 功能一：平滑滾動與滾動監聽 (Scroll Spy) ---
    // =================================================================
    const navLinks = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('section, footer'); // 將 footer 也加入，讓 CONTACT 能正確高亮

    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        sections.forEach(section => {
            // 判斷區塊頂部是否已滾動到視窗上半部
            if (window.scrollY >= section.offsetTop - window.innerHeight / 2) {
                currentSectionId = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            // href 格式為 "#section-a"，我們需要 "section-a"
            const correspondingId = link.getAttribute('href').substring(1);
            if (correspondingId === currentSectionId) {
                link.classList.add('active');
            }
        });
        
        // 當滾動到最頂部時，強制 HOME 為 active
        if (window.scrollY < sections[0].offsetTop - window.innerHeight / 2) {
             navLinks.forEach(link => link.classList.remove('active'));
             document.querySelector('nav a[href="#home"]').classList.add('active');
        }
    });


    // --- ↑↑↑ 修正完畢 ↑↑↑ ---


    // =================================================================
    // --- 功能二 & 三 (輪播與燈箱) 的程式碼保持不變 ---
    // =================================================================
    // ... (您之前已有的輪播和燈箱的完整程式碼) ...
    const allCarousels = document.querySelectorAll('.carousel-container');
    const carouselModal = document.getElementById('carousel-modal');
    
    allCarousels.forEach(container => initializeCarousel(container));

    function initializeCarousel(carouselContainer) {
        const carouselTrack = carouselContainer.querySelector('.carousel-track');
        const cards = carouselContainer.querySelectorAll('.card');
        const modalContent = carouselModal.querySelector('.modal-content');
        if (cards.length === 0) return;
        const cardWidth = carouselTrack.offsetWidth / 3;
        let currentIndex = 0;
        let autoPlayInterval;

        for (let i = 0; i < 3; i++) {
            if (cards[i]) carouselTrack.appendChild(cards[i].cloneNode(true));
        }
        
        function moveNext() {
            currentIndex++;
            carouselTrack.style.transition = 'transform 0.5s ease-in-out';
            carouselTrack.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
            if (currentIndex === cards.length) {
                setTimeout(() => {
                    carouselTrack.style.transition = 'none';
                    currentIndex = 0;
                    carouselTrack.style.transform = `translateX(0)`;
                }, 500);
            }
        }

        function startAutoPlay() {
            clearInterval(autoPlayInterval);
            autoPlayInterval = setInterval(moveNext, 3000);
        }
        function stopAutoPlay() {
            clearInterval(autoPlayInterval);
        }

        carouselContainer.addEventListener('mouseenter', stopAutoPlay);
        carouselContainer.addEventListener('mouseleave', startAutoPlay);

        carouselTrack.addEventListener('click', (e) => {
            const clickedCard = e.target.closest('.card');
            if (clickedCard) {
                const mainImg = clickedCard.querySelector('img');
                const contentDiv = clickedCard.querySelector('.card-content');
                let modalHTML = '';
                if (mainImg) {
                    modalHTML += `<img src="${mainImg.src}" alt="${mainImg.alt}">`;
                }
                if (contentDiv) {
                    const contentClone = contentDiv.cloneNode(true);
                    contentClone.querySelectorAll('img').forEach(img => img.remove());
                    modalHTML += `<div class="modal-text-content">${contentClone.innerHTML}</div>`;
                }
                modalContent.innerHTML = modalHTML;
                carouselModal.style.display = 'flex';
            }
        });
        
        startAutoPlay();
    }
    
    const closeCarouselModal = carouselModal.querySelector('.modal-close');
    function hideCarouselModal() { carouselModal.style.display = 'none'; }
    closeCarouselModal.addEventListener('click', hideCarouselModal);
    carouselModal.addEventListener('click', (e) => {
        if (e.target === carouselModal) hideCarouselModal();
    });

    const sectionB = document.getElementById('section-b');
    const lightboxModal = document.getElementById('lightbox-modal');
    const lightboxModalContent = lightboxModal.querySelector('.modal-content');
    const closeLightboxModal = lightboxModal.querySelector('.modal-close');

    sectionB.addEventListener('click', (e) => {
        const clickedCard = e.target.closest('.lightbox-card');
        if (clickedCard) {
            const mainImg = clickedCard.querySelector('img');
            const contentDiv = clickedCard.querySelector('.card-content');
            let modalHTML = '';
            if (mainImg) {
                modalHTML += `<img src="${mainImg.src}" alt="${mainImg.alt}">`;
            }
            if (contentDiv) {
                const contentClone = contentDiv.cloneNode(true);
                contentClone.querySelectorAll('img').forEach(img => img.remove());
                modalHTML += `<div class="modal-text-content">${contentClone.innerHTML}</div>`;
            }
            lightboxModalContent.innerHTML = modalHTML;
            lightboxModal.style.display = 'flex';
        }
    });

    function hideLightboxModal() { lightboxModal.style.display = 'none'; }
    closeLightboxModal.addEventListener('click', hideLightboxModal);
    lightboxModal.addEventListener('click', (e) => {
        if (e.target === lightboxModal) hideLightboxModal();
    });

});
