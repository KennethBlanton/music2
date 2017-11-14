var url = 'http://localhost:3001';
var socket = io.connect(url);
// let playMode,gridSize;
class App {
	constructor(props) {
		this.state =  {
			A_VAL: Math.pow(2, 1/12),
			count: 0,
			sounds: [],
			gridWidth:props.width,
			scale:[0,-2,-3,-5,-7,-8,-10,-12,-20,-22,-24,-26,-27,-29,-31,-32,],
			frequency:1174.66,
			beat:0,
			bpm:60,
			minNote:2,
			noteCount:undefined,
			context:new (window.AudioContext || window.webkitAudioContext)(),
			beat:0,
			sessionType:props.type,
			color:'yellow'
		}
		this.state.sessionType == 'multi' ? this.state.sessionType = this.state.gridWidth : null;
		// console.log(props);
		this.state.time = (60000/this.state.bpm)/this.state.minNote;
		this.grid = new GridManager();
		this.player = new Player();

		// props.gridWidth ? this.gridWidth = props.gridWidth :this.gridWidth =  12;
		// props.frequency ? this.frequency = props.frequency :this.frequency = 1174.66; 
		// props.scale ? this.scale = props.scale : this.scale = [0,-2,-3,-5,-7,-8,-10,-12,-20,-22,-24,-26,-27,-29,-31,-32,];
		// this.gridHeight = this.scale.length;
	}
	init() {
		this.grid.createGrid();
		this.grid.controlInterval('start');
		if(app.state.sessionType !== 'single') {
			console.log(app.state.gridWidth);
			socket.emit('loaded', {session: app.state.sessionType, sounds:app.state.sounds});
		}
		// Player.create();
	}
	changeDefaults(params) {
		console.log(params);
	} 

}
// app = new App();
