class Player {
	toggleNote(id) {
	    if(!app.state.sounds[id].play) {
	        document.getElementById(''+id).classList.add('active', app.state.color);
	        app.state.sounds[id].play = true;
	        if(!document.getElementById(''+id).classList.contains('new')) {
	            document.getElementById(''+id).classList.add('new');
	        }
	    } else {
	        document.getElementById(''+id).classList.remove('active', app.state.color);
	        app.state.sounds[id].play = false;
	    }
	}
	changeColor() {
		
	}
}