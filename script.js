gsap.registerPlugin(ScrollTrigger);

// ==========================================
// 8. STORY MODAL (CHAPTER DETAILS & GRID GALLERY)
// ==========================================
const CHAPTER_DATA = {
    xi: {
        title: "The Awakening: Chapter XI",
        paragraphs: [
            "Tahun XI bukan sekadar angka, melainkan awal dari sebuah mantra yang belum terucap. Di koridor sekolah ini, kita datang sebagai orang asing yang membawa mimpi masing-masing, tidak menyadari bahwa takdir sedang menenun benang merah di antara kita.",
            "Setiap sudut sekolah memiliki cerita. Dari kantin yang bising hingga perpustakaan yang tenang, kita mulai berbagi tawa, rahasia, dan juga kegagalan. Di sinilah persaudaraan 'Enchanted' pertama kali ditempa, di bawah langit sekolah yang sama yang menyaksikan transformasi kita dari 'aku' menjadi 'kita'.",
            "Momen-momen kecil itulah yang paling berharga. Saat kita saling membantu memahami pelajaran yang sulit, atau saat kita bersorak bersama di lapangan. Kita belajar bahwa sihir sejati bukanlah tentang tongkat atau mantra, melainkan tentang ikatan yang tumbuh di tengah kesederhanaan hari-hari sekolah kita."
        ],
        photos: Array.from({ length: 28 }, (_, i) => `src/images/chapter-xi/photo-${i + 1}.jpg`)
    },
    xii: {
        title: "Mastery: Chapter XII",
        paragraphs: [
            "Memasuki Tahun XII, ada rasa bangga yang bercampur dengan kegelisahan akan perpisahan. Kita bukan lagi murid baru yang bingung, melainkan 'penyihir' senior yang telah menguasai seni bertahan hidup di sekolah. Namun, setiap detik terasa lebih cepat dari biasanya.",
            "Ujian akhir bukan lagi sekadar kertas dan tinta, melainkan pembuktian dari semua malam yang kita habiskan untuk belajar bersama. Di tengah tekanan itu, kita menemukan kekuatan satu sama lain. Kita belajar bahwa keberanian sejati adalah melangkah maju meskipun kita tahu bahwa di ujung jalan ini, pelukan perpisahan telah menunggu.",
            "Babak ini adalah grand finale dari perjalanan panjang kita. Meskipun kita akan berpencar ke berbagai penjuru dunia untuk mengejar takdir baru, warisan 'Enchanted' akan selalu hidup di dalam hati kita. Sekolah ini mungkin hanya sebuah bangunan, tapi kenangan yang kita bangun di dalamnya adalah abadi."
        ],
        photos: Array.from({ length: 51 }, (_, i) => `src/images/chapter-xii/photo-${i + 1}.jpg`)
    }
};

function initStoryModal() {
    const modal = document.getElementById('story-modal');
    if (!modal) return;

    const content = modal.querySelector('.article-layout');
    const closeBtn = modal.querySelector('.close-story');
    const openBtns = document.querySelectorAll('.open-story-btn');
    const textContainer = document.getElementById('story-text-container');
    const titleEl = document.getElementById('story-title');
    
    let storySwiper = null;

    // Lightbox
    const sLightbox = document.getElementById('story-lightbox');
    const sLightboxImg = document.getElementById('story-lightbox-img');
    const sLightboxClose = document.querySelector('.close-story-lightbox');

    openBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const chId = btn.dataset.chapter;
            const data = CHAPTER_DATA[chId];
            if(!data) return;

            // Set Title
            titleEl.innerText = data.title;

            // Inject Paragraphs
            textContainer.innerHTML = '';
            data.paragraphs.forEach(pText => {
                const p = document.createElement('p');
                p.innerText = pText;
                textContainer.appendChild(p);
            });

            // Inject Photos into Vertical Grid
            const galleryGrid = document.getElementById('story-gallery-grid');
            if (galleryGrid) {
                galleryGrid.innerHTML = '';
                data.photos.forEach((url, idx) => {
                    const card = document.createElement('div');
                    card.className = 'grid-card';
                    card.innerHTML = `<img src="${url}" alt="Memory" loading="lazy" onerror="this.src='https://picsum.photos/800/600?blur=2'">`;
                    
                    card.addEventListener('click', () => {
                        window.openLightbox(data.photos, idx);
                    });
                    
                    galleryGrid.appendChild(card);
                });
            }

            // Cinematic Entry
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';

            // Animate In
            gsap.fromTo(content, 
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
            );

            // Stagger reveal text and grid
            gsap.fromTo(modal.querySelectorAll('.article-header, .article-text p, #story-gallery-grid'), 
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, delay: 0.2, ease: "power2.out" }
            );
        });
    });

    const closeModal = () => {
        gsap.to(content, {
            y: 50,
            opacity: 0,
            duration: 0.5,
            ease: "power2.in",
            onComplete: () => {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    };

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if(e.target === modal) closeModal();
    });
    
    // --- Magic Lightbox Shared Logic ---
    let currentLightboxImages = [];
    let currentLightboxIndex = 0;

    const navPrev = document.querySelector('.lightbox-nav-prev');
    const navNext = document.querySelector('.lightbox-nav-next');

    window.openLightbox = (images, index) => {
        currentLightboxImages = images;
        currentLightboxIndex = index;
        updateLightboxContent();
        sLightbox.classList.add('active');
    };

    function updateLightboxContent() {
        if (currentLightboxImages.length === 0) return;
        const url = currentLightboxImages[currentLightboxIndex];
        sLightboxImg.style.opacity = '0';
        setTimeout(() => {
            sLightboxImg.src = url;
            sLightboxImg.style.opacity = '1';
        }, 200);

        // Hide nav if only 1 image
        const hasMultiple = currentLightboxImages.length > 1;
        if(navPrev) navPrev.style.display = hasMultiple ? 'flex' : 'none';
        if(navNext) navNext.style.display = hasMultiple ? 'flex' : 'none';
    }

    function nextImg() {
        if (currentLightboxImages.length <= 1) return;
        currentLightboxIndex = (currentLightboxIndex + 1) % currentLightboxImages.length;
        updateLightboxContent();
    }

    function prevImg() {
        if (currentLightboxImages.length <= 1) return;
        currentLightboxIndex = (currentLightboxIndex - 1 + currentLightboxImages.length) % currentLightboxImages.length;
        updateLightboxContent();
    }

    if(navNext) navNext.addEventListener('click', (e) => { e.stopPropagation(); nextImg(); });
    if(navPrev) navPrev.addEventListener('click', (e) => { e.stopPropagation(); prevImg(); });

    // Lightbox Close
    if (sLightboxClose) sLightboxClose.addEventListener('click', () => sLightbox.classList.remove('active'));
    if (sLightbox) sLightbox.addEventListener('click', (e) => { if(e.target === sLightbox) sLightbox.classList.remove('active'); });

    // Keyboard Support
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (sLightbox && sLightbox.classList.contains('active')) sLightbox.classList.remove('active');
            else if (modal.classList.contains('active')) closeModal();
        }
        if (sLightbox && sLightbox.classList.contains('active')) {
            if (e.key === 'ArrowRight') nextImg();
            if (e.key === 'ArrowLeft') prevImg();
        }
    });
}

function initIntroSliders() {
    // Chapter XI Intro Slider
    new Swiper('.intro-swiper-xi', {
        effect: 'cards',
        grabCursor: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        loop: true,
        perSlideRotate: 2,
        perSlideOffset: 8,
    });

    // Chapter XII Intro Slider
    new Swiper('.intro-swiper-xii', {
        effect: 'cards',
        grabCursor: true,
        autoplay: {
            delay: 3500,
            disableOnInteraction: false,
        },
        loop: true,
        perSlideRotate: 2,
        perSlideOffset: 8,
    });
}

// ==========================================
// 1. PRELOADER (FOOLPROOF)
// Murni setTimeout, tidak bergantung pada koneksi gambar/audio.
// PASTI hilang dalam 2.5 detik maksimal.
// ==========================================
function initPreloader() {
    const preloader = document.getElementById('preloader');
    
    // Animasi munculnya ring sihir (GSAP)
    gsap.fromTo('.magic-ring', 
        { scale: 0, opacity: 0 }, 
        { scale: 1, opacity: 1, duration: 1, stagger: 0.2, ease: "back.out(1.7)" }
    );

    // Fungsi absolut hapus preloader
    function dismiss() {
        gsap.to(preloader, {
            opacity: 0,
            duration: 0.6,
            ease: "power2.inOut",
            onComplete: () => {
                preloader.remove(); // Hapus total dari DOM
                document.body.classList.remove('loading');
                
                // Refresh ScrollTrigger agar perhitungan tinggi akurat (terutama di mobile)
                ScrollTrigger.refresh();

                // Mulai animasi Hero
                gsap.fromTo('.hero-title',
                    { y: 50, opacity: 0, filter: 'blur(10px)' },
                    { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.5, ease: "power3.out" }
                );
                gsap.fromTo('.hero-subtitle',
                    { y: 30, opacity: 0 },
                    { y: 0, opacity: 1, duration: 1, delay: 0.5, ease: "power2.out" }
                );
            }
        });
    }

    // Jika load cepat, hilang dalam 1 detik. Jika lambat, MAX 2.5 detik pasti hilang.
    let isDismissed = false;
    window.addEventListener('load', () => {
        if (!isDismissed) { isDismissed = true; setTimeout(dismiss, 800); }
    });
    setTimeout(() => {
        if (!isDismissed) { isDismissed = true; dismiss(); }
    }, 2500);
}

// ==========================================
// 2. MAGIC PARTICLES CANVAS
// ==========================================
function initMagicCanvas() {
    const canvas = document.getElementById('magic-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 2.5 + 0.5;
            this.speedY = Math.random() * -0.5 - 0.2; // Bergerak ke atas
            this.speedX = (Math.random() - 0.5) * 0.5;
            // Warna ungu/pink magic
            const colors = ['rgba(168, 85, 247,', 'rgba(236, 72, 153,', 'rgba(126, 184, 247,'];
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.life = Math.random();
        }
        update() {
            this.y += this.speedY;
            this.x += this.speedX + Math.sin(this.life * 10) * 0.5; // Melayang zigzag
            this.life += 0.01;

            if (this.y < -10) {
                this.y = height + 10;
                this.x = Math.random() * width;
            }
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            // Glowing effect
            const alpha = (Math.sin(this.life * 5) + 1) / 2 * 0.8 + 0.1; 
            ctx.fillStyle = `${this.color} ${alpha})`;
            ctx.shadowBlur = 10;
            ctx.shadowColor = `${this.color} 0.8)`;
            ctx.fill();
        }
    }

    // Buat 60 partikel
    for (let i = 0; i < 60; i++) particles.push(new Particle());

    function animate() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => { p.update(); p.draw(); });
        requestAnimationFrame(animate);
    }
    animate();
}

// ==========================================
// 3. BACKGROUND MUSIC
// ==========================================
function initBGM() {
    const btn = document.getElementById('bgmToggle');
    const audio = document.getElementById('bgmAudio');
    let isPlaying = false;

    if (!btn || !audio) return;

    btn.addEventListener('click', () => {
        if (isPlaying) {
            audio.pause();
            btn.innerHTML = '<i class="fas fa-volume-mute"></i>';
            isPlaying = false;
        } else {
            audio.play().catch(console.error);
            btn.innerHTML = '<i class="fas fa-volume-up" style="color: var(--magic-primary)"></i>';
            btn.style.boxShadow = '0 0 30px var(--magic-glow)';
            isPlaying = true;
        }
    });
}

// ==========================================
// 4. NAVBAR BLUR & MOBILE TOGGLE
// ==========================================
function initNavbar() {
    const nav = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) nav.classList.add('scrolled');
        else nav.classList.remove('scrolled');
    });

    // Mobile toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu on link click
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';

                // Smooth scroll for mobile fallback since GSAP pin is disabled
                if (window.innerWidth <= 1024) {
                    const targetId = link.getAttribute('href');
                    const targetSection = document.querySelector(targetId);
                    if (targetSection) {
                        e.preventDefault();
                        window.scrollTo({
                            top: targetSection.offsetTop - 70,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }
}

// ==========================================
// 5. GSAP HORIZONTAL JOURNEY (ARTIKEL)
// ==========================================
function initHorizontalJourney() {
    const container = document.getElementById('horizontal-scroll');
    if (!container || window.innerWidth <= 1024) return; // Matikan horizontal di mobile

    // Pin layar dan scroll menyamping
    let tl = gsap.timeline({
        scrollTrigger: {
            trigger: "#artikel-pin",
            pin: true,           // Kunci layar
            scrub: 1,            // Animasi terikat dengan scroll (smooth)
            end: () => "+=" + container.offsetWidth, // Selesai jika scroll sejauh lebar container
        }
    });

    // Menggeser .horizontal-container ke kiri sebesar total lebarnya dikurangi lebar layar (100vw)
    tl.to(container, {
        x: () => -(container.scrollWidth - document.documentElement.clientWidth) + "px",
        ease: "none"
    });

    // Animate elemen di dalam horizontal saat masuk viewport
    gsap.utils.toArray('.kelas-info').forEach((info, i) => {
        gsap.from(info, {
            y: 50,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
                trigger: info,
                containerAnimation: tl, // Deteksi dalam horizontal scroll
                start: "left 70%",      // Mulai saat elemen masuk viewport dari kanan
                toggleActions: "play none none reverse"
            }
        });
    });
}

// ==========================================
// 6. SWIPER 3D COVERFLOW (UNTUK GALLERY XI & XII)
// ==========================================
function initSwiper3D() {
    // Pengaturan standar untuk kedua swiper
    const swiperConfig = {
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: "auto",
        loop: true,
        coverflowEffect: {
            rotate: 20,       // derajat rotasi
            stretch: 0,       // jarak antar slide
            depth: 200,       // kedalaman Z
            modifier: 1,      // pengali efek
            slideShadows: true,
        },
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        }
    };

    if(document.querySelector('.xi-swiper')) new Swiper(".xi-swiper", swiperConfig);
    if(document.querySelector('.xii-swiper')) new Swiper(".xii-swiper", swiperConfig);
}

// ==========================================
// 7. VANILLA TILT (KARU STRUKTUR KELAS 3D)
// ==========================================
if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll(".tilt-card"), {
        max: 15, speed: 400, glare: true, "max-glare": 0.3, scale: 1.05 
    });
}

// ==========================================
// 8. MEMBER PORTFOLIO MODAL
// ==========================================
function initPortfolioModal() {
    const modal = document.getElementById('portfolio-modal');
    if (!modal) return;
    
    const content = modal.querySelector('.portfolio-content');
    const closeBtn = modal.querySelector('.close-portfolio');
    const profileCards = document.querySelectorAll('.tilt-card.member, .tilt-card.ketua, .tilt-card.wali');
    
    const portName = document.getElementById('port-name');
    const portRole = document.getElementById('port-role');
    const portAvatar = document.getElementById('port-avatar');
    const portSocials = document.getElementById('port-socials');
    const portGrid = document.getElementById('port-grid-2x2');

    profileCards.forEach((card, index) => {
        card.addEventListener('click', () => {
            const nameEl = card.querySelector('.card-name');
            const roleEl = card.querySelector('.card-role');
            const imgEl = card.querySelector('.card-img-wrap img');

            const descEl = card.querySelector('.card-desc');

            const name = nameEl ? nameEl.innerText : "Wizard";
            const role = roleEl ? roleEl.innerText : "Wizard";
            const avatar = imgEl ? imgEl.src : "";
            const desc = descEl ? descEl.innerHTML : "A dedicated member of the Enchanted Class.";

            // Populate Info
            portName.innerText = name;
            portRole.innerText = role;
            portAvatar.src = avatar;
            if (document.getElementById('port-desc')) {
                document.getElementById('port-desc').innerHTML = desc;
            }

            // Dynamic Social Data from Data Attributes
            const instagram = card.getAttribute('data-instagram') || "";
            const github = card.getAttribute('data-github') || "";
            const tiktok = card.getAttribute('data-tiktok') || "";
            const email = card.getAttribute('data-email') || "";

            let socialHTML = '';
            if (instagram) socialHTML += `<a href="https://instagram.com/${instagram}" target="_blank" class="social-icon"><i class="fab fa-instagram"></i></a>`;
            if (github) socialHTML += `<a href="https://github.com/${github}" target="_blank" class="social-icon"><i class="fab fa-github"></i></a>`;
            if (tiktok) socialHTML += `<a href="https://tiktok.com/@${tiktok}" target="_blank" class="social-icon"><i class="fab fa-tiktok"></i></a>`;
            if (email) socialHTML += `<a href="mailto:${email}" class="social-icon"><i class="fas fa-envelope"></i></a>`;

            if (socialHTML === '') {
                socialHTML = '<p style="font-size: 0.8rem; opacity: 0.5;">No magical scrolls linked.</p>';
            }
            portSocials.innerHTML = socialHTML;

            // Portfolio Gallery Logic
            const folder = card.getAttribute('data-folder');
            const photosCount = parseInt(card.getAttribute('data-photos')) || 1;

            portGrid.innerHTML = '';
            const photos = [];
            for (let i = 1; i <= 4; i++) {
                let url;
                if (i <= photosCount) {
                    url = `src/images/member/${folder}/foto${i}.jpg`;
                    // Case for officers whose photos might be named differently (e.g. sekretaris.jpg)
                    // But I updated index.html to point to foto1.jpg for them too if I moved them.
                    // Actually I'll stick to folder/foto[i].jpg as the standard now.
                } else {
                    // Fallback to Picsum (Random from Pinterest feel)
                    url = `https://picsum.photos/800/800?random=${index * 10 + i}`;
                }
                
                photos.push(url);
                const imgCard = document.createElement('div');
                imgCard.className = 'grid-card';
                imgCard.innerHTML = `<img src="${url}" alt="Personal">`;
                
                imgCard.addEventListener('click', () => {
                    if(window.openLightbox) window.openLightbox(photos, i-1);
                });
                
                portGrid.appendChild(imgCard);
            }

            // Show Modal
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';

            gsap.fromTo(content, 
                { scale: 0.8, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
            );
        });
    });

    const closePort = () => {
        gsap.to(content, {
            scale: 0.8,
            opacity: 0,
            duration: 0.3,
            onComplete: () => {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    };

    if (closeBtn) closeBtn.addEventListener('click', closePort);
    modal.addEventListener('click', (e) => { if (e.target === modal) closePort(); });
}

// ==========================================
// 8. INITIALIZE ALL
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    initMagicCanvas();
    initBGM();
    initNavbar();
    initHorizontalJourney();
    initSwiper3D();
    initStoryModal();
    initPortfolioModal();
    initScrollFade();
    initIntroSliders();
    initTextSplitAnimation();
});

// ==========================================
// 8.5 TEXT SPLIT & GLOW REVEAL
// ==========================================
function initTextSplitAnimation() {
    const headers = document.querySelectorAll('.section-head h2, .journey-title');
    
    headers.forEach(header => {
        const text = header.innerText;
        header.innerHTML = '';
        
        // Wrap each character in a span
        text.split('').forEach(char => {
            const span = document.createElement('span');
            span.innerText = char === ' ' ? '\u00A0' : char; // Handle spaces
            span.style.display = 'inline-block';
            span.style.opacity = '0';
            span.style.filter = 'blur(10px)';
            span.style.transform = 'translateY(20px)';
            header.appendChild(span);
        });

        // GSAP Reveal
        gsap.to(header.querySelectorAll('span'), {
            scrollTrigger: {
                trigger: header,
                start: "top 90%",
            },
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            duration: 0.8,
            stagger: 0.05,
            ease: "back.out(1.7)"
        });
    });
}

// ==========================================
// 9. SCROLL REVEAL ANIMATION (STAGGERED)
// ==========================================
function initScrollFade() {
    // Standard reveals
    gsap.utils.toArray('.reveal-up').forEach((el) => {
        gsap.to(el, {
            scrollTrigger: {
                trigger: el,
                start: "top 90%",
                toggleActions: "play none none reverse"
            },
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out"
        });
    });

    // Special Stagger for Static 2x2 Grids (XI & XII intro)
    gsap.utils.toArray('.static-grid-2x2').forEach((grid) => {
        gsap.from(grid.querySelectorAll('.grid-card'), {
            scrollTrigger: {
                trigger: grid,
                start: "top 85%",
            },
            y: 40,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out"
        });
    });

    // Special Stagger for Wizard Cards (32 members)
    const membersRow = document.querySelector('.org-row.members');
    if (membersRow) {
        gsap.from(membersRow.querySelectorAll('.tilt-card'), {
            scrollTrigger: {
                trigger: membersRow,
                start: "top 85%",
            },
            y: 30,
            opacity: 0,
            duration: 0.6,
            stagger: {
                each: 0.03,
                grid: "auto",
                from: "left"
            },
            ease: "circ.out"
        });
    }
}

