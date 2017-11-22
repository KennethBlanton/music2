class Player {
	toggleNote(obj) {
		let classList = document.getElementById(''+obj.id).classList;
		for (var i = classList.length - 1; i >= 0; i--) {
			if(classList[i] !== "block" && classList[i] !== "new" && classList !== "active") {
				classList.remove(classList[i]);
			}
		}
		console.log(classList.length);
	    if(!app.state.sounds[obj.id].play) {
	    	console.log(document.getElementById(''+obj.id).classList)
	        document.getElementById(''+obj.id).classList.add('active', obj.color);
	        app.state.sounds[obj.id].play = true;
	        if(!document.getElementById(''+obj.id).classList.contains('new')) {
	            document.getElementById(''+obj.id).classList.add('new');
	        }
	    } else {

	        document.getElementById(''+obj.id).classList.remove('active', obj.color);
	        console.log(document.getElementById(''+obj.id).classList)
	        app.state.sounds[obj.id].play = false;
	    }
	}
	changeColor(color) {
		app.state.color = color;
		console.log(app.state.color);
	}
	changeTempo(newTempo) {
		app.grid.controlInterval('stop');
		app.state.bpm = newTempo;
		app.state.time = (60000/app.state.bpm)/app.state.minNote;
		app.grid.controlInterval('start');
	}
	changeKey() {
		let blocks = document.querySelector('.blocks').children;
		app.state.count = 0;
		for (var i = 0; i < blocks.length; i++) {
			blocks[i].dataset.frequency = app.state.frequency*( Math.pow(app.state.A_VAL, app.state.scale[app.state.count] ));
			if(blocks[i].id % app.state.gridWidth == 0 && app.state.count !== app.state.scale.length) {
                app.state.count++;
            }
		}
	}
}