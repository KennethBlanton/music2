var url = 'http://localhost:3001';
var socket = io.connect(url);

// let grid;
// let GRID_WIDTH = 12 ; 
// const BASE_FREQUENCY =  1174.66; 
// // const SCALE = [0,-2,-3,-5,-7,-8,-10,-12]; // note dispersions relative to scale formula.
// let scaleExtenstion = [0,-2,-3,-5,-7,-8,-10,-12,-20,-22,-24,-26,-27,-29,-31,-32,]; 
// // extreme low [-32,-34,-36,-38,-39,-41,-43,-44]
// const SCALE = scaleExtenstion; 
// const GRID_HEIGHT = SCALE.length;
// const A_VAL = Math.pow(2, 1/12);
// let count = 0;
// let sounds = {};
// let beat = 0;
// let bpm = 60;
// let minNote = 2;
// const TIME = (60000/bpm)/minNote; 
// let noteCount;
// let context = new (window.AudioContext || window.webkitAudioContext)();

// (function() {
//     // console.log('ran');
   
// })();
// let playMode,gridSize;



// NON_OWNED FUNCTIONS


// function playSound(note) {
//     if(note.play) {
//         let sound = new Sound(context);
//         let value = note.note.dataset.frequency;
//         sound.play(value);
//         setTimeout(sound.stop(), TIME*GRID_WIDTH);
//     } 
// }
// function play(sounds) {
//         for (let i = 0; i < GRID_HEIGHT; i++) {
//              sounds[GRID_WIDTH *i +1 + beat].effect.classList.add('playing')
//             playSound(sounds[GRID_WIDTH *(i) +1 + beat])
//             // sounds[GRID_WIDTH *i +1 + beat].note.classList.add('playing');
           

//         }
//         if(beat < GRID_WIDTH -1) {
//             beat++;
//         } else {
//             beat = 0;
//         }
// } 

// EVENT_LISTENERS

