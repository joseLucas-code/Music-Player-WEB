const playerContainer = document.querySelector('.player-container')
const artistiIMG = document.querySelector('.album-content img')
const songTittle = document.querySelector('.album-content h2')
const prevBTN = document.querySelector('.fa-step-backward')
const playBTN = document.querySelector('.fa-play')
const nextBTN = document.querySelector('.fa-step-forward')

let timer;
let autoplay = 0;
let songIndex = 0;
let playingSong = false;
let audioEl = document.createElement('audio')
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
    playerContainer.appendChild(audioEl)
    audioEl.volume = 0.5
    audioEl.src = allSongs[songIndex].source
    songTittle.innerHTML = allSongs[songIndex].name
    artistiIMG.src = allSongs[songIndex].thumb
}

playBTN.addEventListener('click', ()=>{
    if(playingSong === false){
        audioEl.play()
        playingSong = true
    }else{
        audioEl.pause()
        playingSong = false
    }
})

nextBTN.addEventListener('click', ()=>{
    songIndex === totalSongs ? songIndex = 0 : songIndex++

    audioEl.autoplay
    loadSong()
})

prevBTN.addEventListener('click', ()=>{
    songIndex === 0 ? songIndex = totalSongs : songIndex--

    loadSong()
})

loadSong()