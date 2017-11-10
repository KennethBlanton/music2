var url = 'http://localhost:3001';
var socket = io.connect(url);




class Sound {
    
    constructor(context) {
        this.context = context;
    }
    
    setup() {
        this.oscillator = this.context.createOscillator();
        this.gainNode = this.context.createGain();

        this.oscillator.connect(this.gainNode);
        this.gainNode.connect(this.context.destination);
        this.oscillator.type = 'sine';
    }

    play(value) {
        this.setup();

        this.oscillator.frequency.value = value;
        this.gainNode.gain.setValueAtTime(0, this.context.currentTime);
        this.gainNode.gain.linearRampToValueAtTime(.1, this.context.currentTime + 0.015);
                
        this.oscillator.start(this.context.currentTime);
        this.stop(this.context.currentTime);
    }
    
    stop() {
        let stopTime = this.context.currentTime +1;
        this.gainNode.gain.value = .1
        this.gainNode.gain.exponentialRampToValueAtTime(0.01, stopTime);
        setTimeout(()=>{
           this.gainNode.gain.exponentialRampToValueAtTime(0.000001, this.context.currentTime+1)
           this.oscillator.stop(this.context.currentTime+ 1)
       },2000)
    }
 
}
// function changeStuff(e) {
//     e.preventDefault();
// }

class GridManager {
    constructor(string) {
        if(string == 'short') {
            gridSize = 'short'
        } else if(string == 'medium') {
            gridSize = 'medium'
        } else if (string == 'long') {
            gridSize = 'long'
        }

    }
    createGrid() {
        for (let i = 1; i <= GRID_HEIGHT*GRID_WIDTH; i++){
            let block = document.createElement('div');
            let effect = document.createElement('div');
            effect.className = ('effect');
            block.className = ('block new');
            block.id = i; 
            // effect.id = i
            block.setAttribute('data-frequency', BASE_FREQUENCY*( Math.pow(A_VAL, SCALE[count] )));
            sounds[block.id] = {note:block,effect:effect,play:false};
            if(block.id % GRID_WIDTH == 0 && count !== GRID_HEIGHT) {
                count++;
            }
            block.style.width = (100/GRID_WIDTH)-.1  + "%";
            block.style.height = (100/GRID_HEIGHT)- .22 + 'vh';
            effect.style.width = (100/GRID_WIDTH)-.1  + "%";
            effect.style.height = (100/GRID_HEIGHT)- .22 + 'vh';
            document.querySelector('.effects').appendChild(effect);
            document.querySelector('.blocks').appendChild(block);
        }
        console.log(sounds);
        noteCount = document.querySelectorAll('.block').length;
    }
    controlInterval(string) {
        

        setInterval(
            function() {
                // console.log('ran')
                for (var i = 1; i < noteCount+1; i++) {
                    // sounds[i].note.classList.remove('playing');
                    sounds[i].effect.classList.remove('playing');
                }
                play(sounds);
            }, TIME
        );
    }

}

let grid;

let GRID_WIDTH = 12 ; // changes affect columns aka measures

const BASE_FREQUENCY =  1174.66; // controls starting note currently set to the key of G
// const SCALE = [0,-2,-3,-5,-7,-8,-10,-12]; // note dispersions relative to scale formula.
let scaleExtenstion = [0,-2,-3,-5,-7,-8,-10,-12,-20,-22,-24,-26,-27,-29,-31,-32,]; 
// extreme low [-32,-34,-36,-38,-39,-41,-43,-44]
const SCALE = scaleExtenstion; // temp just for tweaking
const GRID_HEIGHT = SCALE.length;
const A_VAL = Math.pow(2, 1/12);
let count = 0;
let sounds = {};
let beat = 0;
let bpm = 60;
let minNote = 2;// quarter note, 2== eigth;
const TIME = (60000/bpm)/minNote; // time in ms of a minute divided beats/ smallest note



socket.addEventListener('noteChange', (id)=>{
    console.log(sounds)
    
    if(!sounds[id].play) {
        document.getElementById(''+id).classList.add('active');
        sounds[id].play = true;
        socket.emit('soundUpdate', sounds);
        if(!document.getElementById(''+id).classList.contains('new')) {
            document.getElementById(''+id).classList.add('new');
        }
    } else {
        document.getElementById(''+id).classList.remove('active');
        sounds[id].play = false;
        socket.emit('soundUpdate', sounds);
    }
});
socket.addEventListener('loaded', (soundObj)=>{
    console.log(soundObj['1'])
    console.log(sounds);
    if(soundObj) {
       for (var i = 1; i < noteCount+1; i++) {
           if(sounds[i].play !== soundObj[i].play) {
                sounds[i].play = soundObj[i].play;
           };
           // console.log(soundsObj[i].play);
           if(soundObj[i].play) {
                sounds[i].note.classList.remove('new');
               sounds[i].note.classList.add('active');
           }
       }
    }
   // console.log(sounds);
});



let noteCount;
let context = new (window.AudioContext || window.webkitAudioContext)();

let notes = document.querySelectorAll('.block');

//code to test worst possible scenario.
// for (var i = 1; i < notes.length + 1; i++) {
//     console.log(sounds[i])
//     sounds[i].note.classlist.add('active');
//     sounds[i].play = true
// }
document.body.addEventListener('click',(e) => {
    console.log(e.target, e.currentTarget);
    if(e.target.classList.contains('block')) {
        socket.emit('noteChange', e.target.id);
    } 
    if(e.target.classList.contains('single-play')) {
        console.log('working');
    socket.emit('playMode', 'single-play')
    playMode = true;
    e.target.classList.add('selected')
    } else if(e.target.classList.contains('multi-play')) {
        socket.emit('playMode', 'multi-play');
        playMode = true;
        e.target.classList.add('selected')
    }
    if(e.target.classList.contains('short')) {
        GRID_WIDTH = 8;
        gridSize = true;
        e.target.classList.add('selected')
    } else if(e.target.classList.contains('medium')) {
        GRID_WIDTH = 16;
        gridSize = true;
        e.target.classList.add('selected')
    } else if(e.target.classList.contains('long')) {
        GRID_WIDTH = 32;
        gridSize = true;
        e.target.classList.add('selected')
    }
    if(e.target.classList.contains('go-button')) {
        if(gridSize && playMode) {
            document.querySelector('.overlay').classList.add('hide');
            grid = new GridManager();
            console.log(sounds);
            grid.createGrid();
            grid.controlInterval();
        } else {
            if(!document.querySelector('.warning')) {  
                let warning = document.createElement('h1');
                warning.innerHTML = `You missed one!`;
                warning.className = 'warning'
                document.querySelector('.overlay').appendChild(warning);
            } else {
                document.querySelector('.warning').innerHTML = 'Still missing one';
            }
        }
    }  
});
function playSound(note) {
    if(note.play) {
        let sound = new Sound(context);
        let value = note.note.dataset.frequency;
        sound.play(value);
        setTimeout(sound.stop(), TIME*GRID_WIDTH);
    } 
}
function play(sounds) {
    console.log(sounds)
        for (let i = 0; i < GRID_HEIGHT; i++) {
             sounds[GRID_WIDTH *i +1 + beat].effect.classList.add('playing')
            playSound(sounds[GRID_WIDTH *(i) +1 + beat])
            // sounds[GRID_WIDTH *i +1 + beat].note.classList.add('playing');
           

        }
        if(beat < GRID_WIDTH -1) {
            beat++;
        } else {
            beat = 0;
        }
} 


(function() {
    // console.log('ran');
    socket.emit('loaded', sounds);
})();
let playMode,gridSize;
// document.querySelector('.button').addEventListener('click',function(e) {
//     console.log(e.target);

// })



