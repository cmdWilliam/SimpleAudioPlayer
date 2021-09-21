import lottieWeb from 'https://cdn.skypack.dev/lottie-web';
const audioPlayers = document.querySelectorAll('.audioPlayer');
const calculateTime = (secs) => {
    if(!isNaN(secs)){

    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${minutes}:${returnedSeconds}`;
    }else{
        return '0:00'
    }
}
audioPlayers.forEach((element,index) => {
    console.log(element)
    let raf = null;
    const audioPlayerContainer = element;
    const playIconContainer = element.querySelector('#play-icon');
    const seekSlider = element.querySelector('#seek-slider');
    const volumeSlider = element.querySelector('#volume-slider');
    const muteIconContainer = element.querySelector('#mute-icon');
    const audio = element.querySelector('audio');  
    const durationContainer = element.querySelector('#duration');
    const currentTimeContainer = element.querySelector('#current-time');
    const outputContainer = element.querySelector('#volume-output');

    const whilePlaying = () => {
        seekSlider.value=audio.currentTime;
        currentTimeContainer.textContent = calculateTime(seekSlider.value);        
        audioPlayerContainer.style.setProperty('--seek-before-width', `${seekSlider.value / seekSlider.max * 100}%`);
        raf = requestAnimationFrame(whilePlaying);
    }

    const displayDuration = () => {
        durationContainer.textContent = calculateTime(audio.duration);
    }
    const setSliderMax = () => {
        seekSlider.max = Math.floor(audio.duration);
    }
    const displayBufferedAmount = () => {
        if(audio.buffered.length != 0){
            const bufferedAmount = Math.floor(audio.buffered.end(audio.buffered.length - 1));
            audioPlayerContainer.style.setProperty('--buffered-width', `${(bufferedAmount / seekSlider.max) * 100}%`);
        }
    }

    const playAnimation = lottieWeb.loadAnimation({
        container: playIconContainer,
        path: 'https://maxst.icons8.com/vue-static/landings/animated-icons/icons/pause/pause.json',
        renderer: 'svg',
        loop: false,
        autoplay: false,
        name: "Play Animation",
    });

    const muteAnimation = lottieWeb.loadAnimation({
        container: muteIconContainer,
        path: 'https://maxst.icons8.com/vue-static/landings/animated-icons/icons/mute/mute.json',
        renderer: 'svg',
        loop: false,
        autoplay: false,
        name: "Mute Animation",
    });

    playAnimation.goToAndStop(14, true);

    playIconContainer.addEventListener('click', (e) => {
        e.preventDefault();
        let audioContainer = e.target.closest('div');  
        let audio = audioContainer.querySelector('audio');  
        let slider = audioContainer.querySelector('#seek-slider');
        let playState = audio.getAttribute('playState');
        if(playState === 'play' || playState==null) {          
            audio.play();
            playAnimation.playSegments([14, 27], true);
            raf=requestAnimationFrame(whilePlaying);
            audio.setAttribute('playState','pause');
            audioPlayerContainer.style.setProperty('width', '280px');
            seekSlider.style.display="block";

        } else {
            audio.pause();
            playAnimation.playSegments([0, 14], true);
            cancelAnimationFrame(raf);
            audio.setAttribute('playState','play');
            seekSlider.style.display="none";
            audioPlayerContainer.style.setProperty('width', '61px');
        }
    });

    muteIconContainer.addEventListener('click', (e) => {
        e.preventDefault();
        let audioContainer = e.target.closest('div');  
        let audio = audioContainer.querySelector('audio');  
        let muteState = audio.getAttribute('playState');
        if(muteState === 'unmute' || muteState==null) {
            muteAnimation.playSegments([0, 15], true);
            audio.muted = true;
            audio.setAttribute('muteState','mute');
        } else {
            muteAnimation.playSegments([15, 25], true);
            audio.muted = false;
            audio.setAttribute('muteState','unmute');
        }
    });

    seekSlider.addEventListener('input', (e) => {
        let audioContainer = e.target.closest('div'); 
        audioContainer.style.setProperty('--seek-before-width', e.target.value / e.target.max * 100 + '%');
    });
    volumeSlider.addEventListener('input', (e) => {
        let audioContainer = e.target.closest('div'); 
        audioContainer.style.setProperty('--volume-before-width', e.value / e.max * 100 + '%');
    });

    durationContainer.textContent = calculateTime(audio.duration);
    if (audio.readyState > 0) {
        displayDuration();
        setSliderMax();
        displayBufferedAmount();
    } else {
        audio.addEventListener('loadedmetadata', () => {
            displayDuration();
            setSliderMax();
            displayBufferedAmount();
        });
    }

    audio.addEventListener('progress', ()=>displayBufferedAmount());

    seekSlider.addEventListener('input', (e) => {
        let audioContainer = e.target.closest('div'); 
        let timeContainer = audioContainer.querySelector('#current-time');  
        let slider = audioContainer.querySelector('#seek-slider');
        timeContainer.textContent = calculateTime(slider.value);
        if(!audio.paused) {
            cancelAnimationFrame(raf);
        }
    });

    seekSlider.addEventListener('change', () => {
        audio.currentTime = seekSlider.value;
        if(!audio.paused) {
            raf=requestAnimationFrame(whilePlaying);
        }
    });

    volumeSlider.addEventListener('input', (e) => {
        const value = e.target.value;
        outputContainer.textContent = value;
        audio.volume = value / 100;
    });

});
