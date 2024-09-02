document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('myAudio');
    const audioButton = document.getElementById('audioButton');

    
    const image1 = '/images/1.png'; 
    const image2 = '/images/2.png'; 

  
    let isPlaying = false;

    
    audioButton.style.backgroundImage = `url(${image1})`;

    
    audioButton.addEventListener('click', () => {
        if (isPlaying) {
            audio.pause();
            audioButton.style.backgroundImage = `url(${image1})`;
        } else {
            audio.play();
            audioButton.style.backgroundImage = `url(${image2})`;
        }
        isPlaying = !isPlaying;
    });
});