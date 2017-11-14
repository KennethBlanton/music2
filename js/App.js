var url = 'http://localhost:3001';
var socket = io.connect(url);
// let playMode,gridSize;
// old scale [0,-2,-3,-5,-7,-8,-10,-12,-20,-22,-24,-26,-27,-29,-31,-32,]
let keys = {
	'G':1567.98,
	'G#':1661.22,
	'A':1760.00,
	'A#':1864.66,
	'B':1975.53,
	'C':1046.50,
	'C#':1108.73,
	'D':1174.66,
	'D#':1244.51,
	'E':1318.51,
	'F':1396.91,
	'F#':1479.98,
}
document.querySelector('.current-bpm').innerHTML = document.querySelector('.slider').value;

class App {
	constructor(props) {
		this.state =  {
			A_VAL: Math.pow(2, 1/12),
			count: 0,
			sounds: [],
			gridWidth:props.width,
			scale:[0,-3,-5,-7-10,-12,-15,-17,-19,-22,-24,-27,-29,-31,-34,-36,-39],
			frequency:1174.66,
			beat:0,
			bpm:120,
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
