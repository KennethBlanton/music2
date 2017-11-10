socket.addEventListener('noteChange', (id)=>{
    console.log(app.state.sounds)
    
    if(!app.state.sounds[id].play) {
        document.getElementById(''+id).classList.add('active');
        app.state.sounds[id].play = true;
        socket.emit('soundUpdate', app.state.sounds);
        if(!document.getElementById(''+id).classList.contains('new')) {
            document.getElementById(''+id).classList.add('new');
        }
    } else {
        document.getElementById(''+id).classList.remove('active');
        app.state.sounds[id].play = false;
        socket.emit('soundUpdate', app.state.sounds);
    }
});
socket.addEventListener('loaded', (soundObj)=>{
    console.log(soundObj['1'])
    console.log(app.state.sounds);
    if(soundObj) {
       for (var i = 1; i < app.state.noteCount+1; i++) {
           if(app.state.sounds[i].play !== soundObj[i].play) {
                app.state.sounds[i].play = soundObj[i].play;
           };
           // console.log(app.state.soundsObj[i].play);
           if(soundObj[i].play) {
                app.state.sounds[i].note.classList.remove('new');
               app.state.sounds[i].note.classList.add('active');
           }
       }
    }
   // console.log(app.state.sounds);
});

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
        // app.changeState({gridWidth:32,gridSize:true});
        GRID_WIDTH = 32;
        gridSize = true;
        e.target.classList.add('selected')
    }
    if(e.target.classList.contains('go-button')) {
        if(gridSize && playMode) {
            document.querySelector('.overlay').classList.add('hide');
            app.init();
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