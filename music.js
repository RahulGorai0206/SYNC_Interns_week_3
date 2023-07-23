const play=document.querySelector('#play');
const pause=document.querySelector('#pause');
const music=document.querySelector('audio');
const prev=document.querySelector('#prev');
const next=document.querySelector('#next');
const songImage=document.querySelector('#songImage');
const artist=document.querySelector('#artist');
const title=document.querySelector('#title');
const ind=document.querySelector('#ind');
const CurrenTime=document.querySelector('#current-time');
const Duration=document.querySelector('#duration');
const progress=document.querySelector('.progress');

let prevSongArray=new Array();
const url = "https://raw.githubusercontent.com/RahulGorai0206/songs/main/song.json";

async function fetchJSON() {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

function playMusic(){
    music.play();
    play.style.display="none";
    pause.style.display="inline-flex";
}
function pauseMusic(){
    music.pause();
    pause.style.display="none";
    play.style.display="inline-flex";
}
function setDetails(songObject,songIndex){
    songImage.src="https://raw.githubusercontent.com/RahulGorai0206/songs/main/images/"+songObject[songIndex].image;
    title.textContent=`${songObject[songIndex].title}`;
    artist.textContent=`${songObject[songIndex].artist}`;
}
function autoFetch(){
    songImage.src="https://raw.githubusercontent.com/RahulGorai0206/songs/main/images/1.jpg";
    title.textContent=`APNA BANA LE PIYA`;
    artist.textContent=`Arijit Singh`;
    music.src="https://raw.githubusercontent.com/RahulGorai0206/songs/main/music/1.mp3";
}
async function nextSong(){
    const objectOfObject = await fetchJSON();
    let x =Math.floor((Math.random() * objectOfObject.length) + 1);
    music.src="https://raw.githubusercontent.com/RahulGorai0206/songs/main/music/"+x+".mp3";
    prevSongArray.push(x);
    playMusic();
    setDetails(objectOfObject,x-1);
}
async function prevSong(){
    const objectOfObject = await fetchJSON();
    if(prevSongArray.length>1){
        music.src="https://raw.githubusercontent.com/RahulGorai0206/songs/main/music/"+prevSongArray[prevSongArray.length-2]+".mp3";
        prevSongArray.pop(prevSongArray.length)
    }else{
        music.src="https://raw.githubusercontent.com/RahulGorai0206/songs/main/music/1.mp3";
    }
    playMusic();
    setDetails(objectOfObject,x-1);
}
play.addEventListener("click",()=>{
    playMusic();
});
pause.addEventListener("click",()=>{
    pauseMusic();
});
next.addEventListener("click",()=>{
    nextSong();
});
prev.addEventListener("click",()=>{
    prevSong();
});

music.addEventListener('timeupdate',(event)=>{
    const {currentTime, duration}=event.target;
    if(currentTime<10){
        CurrenTime.textContent=Math.floor(currentTime/60)+":0"+Math.floor(currentTime%60);
    }else{
        CurrenTime.textContent=Math.floor(currentTime/60)+":"+Math.floor(currentTime%60);
    }
    if(duration){
        if(duration%60<10){
            Duration.textContent=Math.floor(duration/60)+":0"+Math.floor(duration%60);
        }else{
            Duration.textContent=Math.floor(duration/60)+":"+Math.floor(duration%60);
        }
    }
    progress.style.width=`${currentTime/duration*100}%`
    if(Math.floor(currentTime)==Math.floor(duration)){
        nextSong();
    }
})
