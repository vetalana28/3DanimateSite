document.addEventListener('mousemove', e => {
    Object.assign(document.documentElement,
        {
            style: `
            --move-x: ${(e.clientX - window.innerWidth / 2) * -.005}deg;
            --move-y: ${(e.clientY - window.innerHeight / 2) * -.01}deg;
            `
        }
    )
}
)

const audio = new Audio('audio/zvuki-prirody-1_-kapli-dozhdya.mp3')
audio.loop = true;
const musicBtn = document.querySelector('.music-btn')

musicBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play()
        musicBtn.classList.remove('stop')
    }
    else {
        audio.pause()
        musicBtn.classList.add('stop')

    }
}
)
