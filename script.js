const photos = [
    'assets/img/foto1.jpg',
    'assets/img/foto2.jpg',
    'assets/img/foto3.jpg',
    'assets/img/foto4.jpg',
    'assets/img/foto5.jpg',
    'assets/img/foto6.jpg',
    'assets/img/foto7.jpg',
    'assets/img/foto8.jpg',
    'assets/img/foto9.jpg',
    'assets/img/foto10.jpg',
    'assets/img/foto11.jpg',
    'assets/img/foto12.jpg',
    'assets/img/foto13.jpg',
];

const envelopeWrapper = document.getElementById('envelope');
const clickTrigger = document.getElementById('click-trigger');
const letter = document.getElementById('letter');
const photoFrame = document.getElementById('photo-frame');
const currentPhotoImg = document.getElementById('current-photo');
const music = document.getElementById('music');
const instruction = document.querySelector('.click-instruction');
const shadow = document.getElementById('shadow');
const musicToggleBtn = document.getElementById('music-toggle');

let step = 0; 
let photoIndex = 0;
let isAnimating = false;

// BAŞLANGIÇTA ZARF SÜZÜLSÜN
envelopeWrapper.classList.add('floating');

musicToggleBtn.addEventListener('click', () => {
    if (music.paused) {
        music.volume = 0.5;
        music.play();
        musicToggleBtn.style.background = "#e69096"; 
        musicToggleBtn.style.color = "#fff";
    } else {
        music.pause();
        musicToggleBtn.style.background = "#fffbf0"; 
        musicToggleBtn.style.color = "#4a2c2a";
    }
});

function handleInteraction() {
    if (isAnimating) return;
    isAnimating = true;

   // script.js dosyasında bu kısmı bul:
if (step === 0) {
    // ... müzik kodları vs ...
    
    instruction.style.opacity = 0; // Eski yazıyı gizlemiştik
    shadow.style.opacity = 0;
    
    envelopeWrapper.classList.add('open'); 
    
    setTimeout(() => {
        letter.classList.add('fullscreen');
        
        // --- BURAYA DİKKAT (Değişiklik Burada) ---
        setTimeout(() => { 
            // BU İKİ SATIRI EKLE:
            instruction.innerText = "Zaman kapsülünü aç!"; // Yazıyı değiştir
            instruction.style.opacity = 1;         // Tekrar görünür yap
            
            isAnimating = false; 
        }, 800);
        // ----------------------------------------

    }, 400);

    step = 1;
}
    else if (step === 1) {
        letter.classList.remove('fullscreen');
        setTimeout(() => {
            photoIndex = 0;
            showPhoto(photoIndex);
        }, 800);
        instruction.style.opacity = 1;
        instruction.innerText = "Devam et!";
        step = 2;
    } 
    else if (step === 2) {
        photoFrame.classList.remove('floating');
        photoFrame.classList.remove('popping-out');
        photoFrame.classList.add('falling-down');

        setTimeout(() => {
            photoFrame.classList.remove('falling-down');
            photoIndex++;
            if (photoIndex >= photos.length) {
                // FİNAL KAPANIŞI
                envelopeWrapper.classList.remove('open'); 
                
                // NOT: 'floating' sınıfını hemen eklemiyoruz!
                // CSS'teki 2.5s transition bitene kadar bekliyoruz.
                
                setTimeout(() => {
                    instruction.innerText = "umarım begenmissindir askim";
                    instruction.style.opacity = 1;
                    shadow.style.opacity = 0.3;
                    
                    // Kapanma bitti, şimdi tekrar süzülmeye başla
                    envelopeWrapper.classList.add('floating');
                    
                    step = 0; 
                    photoIndex = 0;
                    isAnimating = false;
                }, 2500); // 2.5 Saniye Bekle (CSS transition süresi ile aynı)
                
            } else {
                showPhoto(photoIndex);
            }
        }, 1000); 
    }
}

function showPhoto(index) {
    currentPhotoImg.src = photos[index];
    setTimeout(() => {
        photoFrame.classList.add('popping-out');
    }, 50);

    setTimeout(() => {
        if(step === 2 && photoFrame.classList.contains('popping-out')) {
            photoFrame.classList.add('floating');
        }
        isAnimating = false; 
    }, 800); 
}

envelopeWrapper.addEventListener('click', handleInteraction);
clickTrigger.addEventListener('click', handleInteraction);
photoFrame.addEventListener('click', handleInteraction);