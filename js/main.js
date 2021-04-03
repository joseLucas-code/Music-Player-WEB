const playerContainer = document.querySelector('.player-container')
const artistiIMG = document.querySelector('.album-content img')
const songTittle = document.querySelector('.album-content h2')
const artistName = document.querySelector('.album-content p')
const prevBTN = document.querySelector('.fa-step-backward')
const playBTN = document.querySelector('.fa-play')
const nextBTN = document.querySelector('.fa-step-forward')
const muteBTN = document.querySelector('.fa-volume-mute')
const volumeBTN = document.querySelector('.fa-volume-up')
const volumeRange = document.querySelector('.volume-range')
const sidebarMusic = document.querySelector('.sidebar-music');
const musicBoxContainer = document.querySelector('.music-box-container');
const songTime = document.querySelector('song-time')
const songDuration = document.querySelector('.duration-range')
const openMusicList = document.querySelector('.nav-player i.fa-bars')
const closeMusicList = document.querySelector('.sidebar-music i.fa-times')


let duration = 0;
let currentTime = 0;
let songIndex = 0;
let isPlaying = false;
let Muted = false
const audioEl = new Audio()
const allSongs = [
    {
        name: 'The Heart Wants What It Wants ',
        artist: 'Selena Gomez',
        thumb: 'img/artist1.jpg',
        source: 'songs/audio1.mp3'
    },
    {
        name: 'Past Life',
        artist: 'Trevor Daniel & Selena Gomez',
        thumb: 'img/artist2.jpg',
        source: 'songs/audio2.mp3'
    },
    {
        name: 'Paradise',
        artist: 'Coldplay',
        thumb: 'img/artist3.jpg',
        source: 'songs/audio3.mp3'
    },
    {
        name: 'lie to me',
        artist: 'Tate McRae & Ali Gatie',
        thumb: 'img/artist4.jpg',
        source: 'songs/audio4.mp3'
    },
    {
        name: 'Dead of Night',
        artist: 'If Found',
        thumb: 'img/artist5.jpg',
        source: 'songs/audio5.mp3'
    },
    {
        name: 'Lose Your Self',
        artist: 'Eminem',
        thumb: 'img/artist6.jpg',
        source: 'songs/audio6.mp3'
    },
    {
        name: 'Such a Whore',
        artist: 'JVLA',
        thumb: 'img/artist7.jpg',
        source: 'songs/audio7.mp3'
    },
    {
        name: 'About Me',
        artist: 'Koven x Roy',
        thumb: 'img/artist8.jpg',
        source: 'songs/audio8.mp3'
    }
];
let totalSongs = allSongs.length - 1;


muteBTN.addEventListener('click', ()=>{
    if(Muted){
        audioEl.muted = false
        muteBTN.style.backgroundColor = '#030D13';
        Muted = false
    }else{
        audioEl.muted = true
        muteBTN.style.backgroundColor = '#430000';
        Muted = true
    }
})

volumeBTN.addEventListener('click', ()=>{
    const volumeMenu = document.querySelector('.volume-menu')

    volumeBTN.classList.toggle('volumeUpOpen')
    volumeMenu.classList.toggle('openVolumeMenu')

})

volumeRange.addEventListener('input', ()=>{
    const volumeSpan = document.querySelector('.volume-menu span')

    audioEl.volume = (volumeRange.value / 100)
    volumeSpan.innerHTML = `${volumeRange.value}%`
})

openMusicList.addEventListener('click', ()=>{
    sidebarMusic.classList.add('OpenSidebar')
})

closeMusicList.addEventListener('click', ()=>{
    sidebarMusic.classList.remove('OpenSidebar')
})

function createSidebarElements(){
    

    for(let i in allSongs){
        const musicBox = document.createElement('div')
        const artistContent = document.createElement('div')
        const artistiImage = document.createElement('img')
        const artistText = document.createElement('div')
        const artistTextH1 = document.createElement('h1')
        const artistTextP = document.createElement('p')
        const iconPlay = document.createElement('i')

        musicBox.classList.add('music-box')
        artistContent.classList.add('artist-content')
        artistText.classList.add('artist-text')
        iconPlay.classList.add('fas','fa-play')

        musicBoxContainer.appendChild(musicBox)
        musicBox.appendChild(artistContent)
        artistContent.appendChild(artistiImage)
        artistiImage.src = allSongs[i].thumb
        artistContent.appendChild(artistText)
        artistText.appendChild(artistTextH1)
        artistText.appendChild(artistTextP)
        artistTextH1.innerHTML = allSongs[i].name
        artistTextP.innerHTML = allSongs[i].artist
        musicBox.appendChild(iconPlay)

        iconPlay.addEventListener('click', ()=>{
            i = parseInt(i)
            songIndex = i

            loadSong()
            playSong()

            changeActiveBox()
        })

        
    }

    musicBoxContainer.children[0].classList.add('activeBox')

}

songDuration.addEventListener('input', ()=>{
    audioEl.currentTime = songDuration.value;
})

audioEl.addEventListener("timeupdate", ()=>{
    songDuration.value = audioEl.currentTime
    duration = audioEl.duration
    songDuration.max = duration
})

audioEl.addEventListener('ended', nextSong)

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

    changeActiveBox()
})

playBTN.addEventListener('click', ()=>{
    if(isPlaying){
        pauseSong()
    }else{
        playSong()
    }
})

nextBTN.addEventListener('click', nextSong)
function nextSong(){
    
    if(songIndex === totalSongs){
        songIndex = 0;
        loadSong();
        playSong();
    }else{
        songIndex++
        loadSong()
        playSong()
    }

    changeActiveBox()
}

function pauseSong(){
    audioEl.pause()
    isPlaying = false;
    audioEl.autoplay = false
    playBTN.classList.remove('pauseIcon')
}

function playSong(){
    audioEl.play()
    audioEl.autoplay = true
    isPlaying = true;
    playBTN.classList.add('pauseIcon')
}

function loadSong(){
    let currentVolume = (volumeRange.value / 100)
    
    audioEl.src = allSongs[songIndex].source
    audioEl.volume = currentVolume
    songTittle.innerHTML = allSongs[songIndex].name
    artistName.innerHTML = allSongs[songIndex].artist
    artistiIMG.src = allSongs[songIndex].thumb
}



function init(){
    loadSong()
    createSidebarElements()
    
}

init()