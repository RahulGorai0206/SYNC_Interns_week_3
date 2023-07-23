const play=document.querySelector('#play');
const pause=document.querySelector('#pause');
const music=document.querySelector('audio');
const prev=document.querySelector('#prev');
const next=document.querySelector('#next');
const songImage=document.querySelector('#songImage');
const artist=document.querySelector('#artist');
const title=document.querySelector('#title');
const ind=document.querySelector('#ind');

let indexPointer=0;
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
async function nextSong(){
    const objectOfObject = await fetchJSON();
    let x =Math.floor((Math.random() * objectOfObject.length) + 1);
    music.src="https://raw.githubusercontent.com/RahulGorai0206/songs/main/music/"+x+".mp3"
    prevSongArray.push(x);
    playMusic();
    console.log(prevSongArray)
}
async function prevSong(){
    const objectOfObject = await fetchJSON();
    if(prevSongArray.length>1){
        music.src="https://raw.githubusercontent.com/RahulGorai0206/songs/main/music/"+prevSongArray[prevSongArray.length-2]+".mp3"
        prevSongArray.pop(prevSongArray.length)
    }else{
        music.src="https://raw.githubusercontent.com/RahulGorai0206/songs/main/music/1.mp3"
    }
    playMusic();
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
