const play=document.querySelector('#play');
const pause=document.querySelector('#pause');
const music=document.querySelector('audio');
let songStatus=0;
play.addEventListener("click",()=>{
        music.play();
        play.style.display="none";
        pause.style.display="inline-flex";
});
pause.addEventListener("click",()=>{
    music.pause();
    pause.style.display="none";
    play.style.display="inline-flex";
});