var url = 'http://localhost:3001';
var socket = io.connect(url);
// let playMode,gridSize;
class App {
	constructor(props) {
		this.state =  {
			A_VAL: Math.pow(2, 1/12),
			count: 0,
			sounds: {},
			gridWidth:16,
			scale:[0,-2,-3,-5,-7,-8,-10,-12,-20,-22,-24,-26,-27,-29,-31,-32,],
			frequency:1174.66,
			beat:0,
			bpm:60,
			minNote:2,
			noteCount:undefined,
			context:new (window.AudioContext || window.webkitAudioContext)(),
			beat:0,
		}
		this.state.time = (60000/this.state.bpm)/this.state.minNote;
		this.state.grid = new GridManager();
		// this.player = new Player();

		// props.gridWidth ? this.gridWidth = props.gridWidth :this.gridWidth =  12;
		// props.frequency ? this.frequency = props.frequency :this.frequency = 1174.66; 
		// props.scale ? this.scale = props.scale : this.scale = [0,-2,-3,-5,-7,-8,-10,-12,-20,-22,-24,-26,-27,-29,-31,-32,];
		// this.gridHeight = this.scale.length;
	}
	init() {
		this.state.grid.createGrid();
		this.state.grid.controlInterval('start');
		socket.emit('loaded', app.state.sounds);
		// Player.create();
	}
    playSound(note) {
    	// console.log(note);
	    if(note.play) {
	        let sound = new Sound(app.state.context);
	        let value = note.note.dataset.frequency;
	        sound.play(value);
	        setTimeout(sound.stop(), app.state.time*app.state.gridWidth);
	    } 
	}
	play(sounds) {
        for (let i = 0; i < app.state.scale.length; i++) {
        	// console.log(app.state.sounds);
        	// console.log(this.state.sounds[app.state.gridWidth *i +1 + app.state.beat].effect)
             this.state.sounds[app.state.gridWidth *i +1 + app.state.beat].effect.classList.add('playing')
            this.playSound(sounds[app.state.gridWidth *(i) +1 + app.state.beat])
            // sounds[app.state.gridWidth *i +1 + app.state.beat].note.classList.add('playing');
           

        }
        if(app.state.beat < app.state.gridWidth -1) {
            app.state.beat++;
        } else {
            app.state.beat = 0;
        }
	}
	changeDefaults(params) {
		console.log(params);
	} 

}
app = new App();
