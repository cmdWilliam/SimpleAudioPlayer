# SimpleAudioPlayer
 A simple clean audio player

 No external plug-ins
 CSS and JS only

![Player Stopped](docs/PlayerStopped.JPG)
![Player Playing](docs/PlayerPlaying.JPG)

## Thank yous:
Some parts of this was copied from somewhere, but unfortunately I cannot recall.
Look and feel was changed and JS simplified and adapted to handle multiple players on a single page.


## Import into your page by adding:
Links
```HTML
<link rel="stylesheet" href="/css/audioPlayerCss.css">
<script type="module" src="/js/audioPlayerJS.js"></script>
```
Player
```HTML
<div id="playerId_1" class="audioPlayer">
    <audio src="/docs/HighCloudRingOfMystery.mp3" preload="metadata" loop></audio>
    <p class="audioDescription"></p>
    <button class="audioButton" id="play-icon"></button>
    <span style="display: none" id="current-time" class="audioTime">0:00</span>
    <input style="display: none" class="audioRange" type="range" id="seek-slider" max="100" value="0">
    <span style="display: none" id="duration" class="audioTime">0:00</span>
    <output style="display: none" class="audioOutput" id="volume-output">100</output>
    <input hidden class="audioRange" type="range" id="volume-slider" max="100" value="100">
    <button hidden class="audioButton" id="mute-icon"></button>
    </div>      
</div>
```

## Customising
Colors are altered by changing the audioPlayer css.
```CSS
.audioPlayer{ 
    --seek-before-width: 0%;
    --volume-before-width: 100%;
    --buffered-width: 0%;
    --audioPlayButtonColor:#fff;
    --audioPlayerBorderColor:#C51818;
    --audioPlayerSlider:rgba(197,24,24,0.6);
    --audioPlayerSliderBufferColor:rgba(197,24,24,0.2);
} 
```


Positioning the Slider can also be changed in the css.

## TODOs
1. Handle audio description better... for now, it is left blank.

2. Make it easier to customise the position of the slider.
