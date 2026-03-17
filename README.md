# Enchanted Memory Website 🪄✨

Website kenangan kelas interaktif, modern, dan responsif menggunakan HTML, CSS, JavaScript murni.

## Fitur Lengkap ✅
- ✅ Background salju animasi terus-menerus
- ✅ Background music toggle (floating button)
- ✅ Preloader dengan logo floating (2-3 detik)
- ✅ GSAP ScrollTrigger + SplitText (animasi scroll & text reveal)
- ✅ Swiper.js gallery carousel (XI & XII Enchanted - 4 kolom desktop)
- ✅ Lightbox fullscreen dengan nav panah
- ✅ Struktur kelas org chart dengan profile modal (bio + mini gallery 2x2 + social)
- ✅ 100% Mobile Responsive
- ✅ Glassmorphism design (modern estetik)

## Cara Penggunaan
1. Buka `index.html` di browser
2. Ganti semua placeholder:
   - **Audio**: `assets/audio/bgm.mp3`
   - **Images**: `assets/images/` (hero, xi/, xii/, profiles/)
   - **Data Profil**: Edit `script.js` `profileData` object
3. Upload gambar Anda sendiri

## Struktur Folder
```
enchanted-memory-website/
├── index.html
├── style.css
├── script.js
└── assets/
    ├── audio/
    │   └── bgm-placeholder.mp3  ← GANTI
    └── images/
        ├── hero/     ← Logo, hero bg
        ├── xi/       ← XI gallery (12+ foto)
        ├── xii/      ← XII gallery (12+ foto)
        └── profiles/ ← Profile pics + mini galleries
```

## Library (CDN)
- GSAP 3.12+ (ScrollTrigger, SplitText)
- Swiper.js 11+
- Font Awesome 6.5
- Google Fonts (Poppins)

## Customisasi Mudah
- **Warna**: Edit gradient di `style.css` (`.section-title`, `.hero-title`, etc.)
- **Konten**: Inline comments `<!-- GANTI ... -->`
- **Tambah Anggota**: Duplicate `.profile-card` + tambah `profileData['anggotaX']`
- **Social**: Edit `social` object di `profileData`

## Test Command
```bash
# Windows (PowerShell/Command)
start enchanted-memory-website/index.html

# Atau Live Server extension VSCode
```

Website siap pakai! 🚀✨ No build, no install.

