const photos = [
    'assets/img/foto1.jpg',
    'assets/img/foto2.jpg',
    'assets/img/foto3.jpg',
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

    if (step === 0) {
        instruction.style.opacity = 0;
        shadow.style.opacity = 0;
        envelopeWrapper.classList.add('open'); 
        
        setTimeout(() => {
            letter.classList.add('fullscreen');
            setTimeout(() => { isAnimating = false; }, 800);
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
        instruction.innerText = "Devam et...";
        step = 2;
    } 
    else if (step === 2) {
        photoFrame.classList.remove('popping-out');
        photoFrame.classList.add('falling-down');
        setTimeout(() => {
            photoFrame.classList.remove('falling-down');
            photoIndex++;
            if (photoIndex >= photos.length) {
                envelopeWrapper.classList.remove('open'); 
                setTimeout(() => {
                    instruction.innerText = "Seni Seviyorum ❤️";
                    instruction.style.opacity = 1;
                    shadow.style.opacity = 0.3;
                }, 500);
                step = 0; 
                photoIndex = 0;
                isAnimating = false;
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
    setTimeout(() => { isAnimating = false; }, 900); 
}

envelopeWrapper.addEventListener('click', handleInteraction);
clickTrigger.addEventListener('click', handleInteraction);
photoFrame.addEventListener('click', handleInteraction);