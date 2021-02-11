const playerContainer = document.querySelector('.player-container')
const artistiIMG = document.querySelector('.album-content img')
const songTittle = document.querySelector('.album-content h2')
const prevBTN = document.querySelector('.fa-step-backward')
const playBTN = document.querySelector('.fa-play')
const nextBTN = document.querySelector('.fa-step-forward')
const muteBTN = document.querySelector('.fa-volume-mute')
const volumeBTN = document.querySelector('.fa-volume-up')
const volumeRange = document.querySelector('.volume-range')

let timer;
let autoplay = 0;
let songIndex = 0;
let playingSong = false;
let hasMuted = false
let audioEl = document.createElement('audio')
playerContainer.appendChild(audioEl)
let allSongs = [
    {
        name: 'First song',
        thumb: 'img/artist1.jpg',
        source: 'songs/audio1.mp3'
    },
    {
        name: 'Second Song',
        thumb: 'img/artist2.jpg',
        source: 'songs/audio2.mp3'
    },
    {
        name: 'Third song',
        thumb: 'img/artist3.jpg',
        source: 'songs/audio3.mp3'
    },
    {
        name: 'Fourth song',
        thumb: 'img/artist4.jpg',
        source: 'songs/audio4.mp3'
    },
];
let totalSongs = allSongs.length - 1;


function loadSong(){
    
    audioEl.src = allSongs[songIndex].source
    songTittle.innerHTML = allSongs[songIndex].name
    artistiIMG.src = allSongs[songIndex].thumb
    
}

function playSong(){
    let playAudio = audioEl.play()
    playingSong = true;
    playBTN.classList.add('pauseIcon')
}

function pauseSong(){
    let pauseAudio = audioEl.pause()
    playingSong = false;
    playBTN.classList.remove('pauseIcon')
}

muteBTN.addEventListener('click', ()=>{
    if(hasMuted === false){
        audioEl.muted = true
        muteBTN.style.backgroundColor = '#E06F26';
        hasMuted = true
    }else{
        audioEl.muted = false
        muteBTN.style.backgroundColor = '#495D69';
        hasMuted = false
    }
})

volumeBTN.addEventListener('click', ()=>{
    const volumeMenu = document.querySelector('.volume-menu')

    volumeBTN.classList.toggle('volumeUpOpen')
    volumeMenu.classList.toggle('openVolumeMenu')

})

nextBTN.addEventListener('click', ()=>{
    
    if(songIndex === totalSongs){
        songIndex = 0;
        loadSong();
        playSong();
    }else{
        songIndex++
        loadSong()
        playSong()
    }
})

prevBTN.addEventListener('click', ()=>{
    if(songIndex === 0){
        songIndex = totalSongs;
        loadSong();
        playSong();
    }else{
        songIndex--
        loadSong()
        playSong()
    }
})

playBTN.addEventListener('click', ()=>{
    if(playingSong === true){
        pauseSong()
    }else{
        playSong()
    }
})

volumeRange.addEventListener('change', ()=>{
    const volumeSpan = document.querySelector('.volume-menu span')

    audioEl.volume = (volumeRange.value / 100)
    volumeSpan.innerHTML = `${volumeRange.value}%`
})

function init(){
    loadSong()
}

init()