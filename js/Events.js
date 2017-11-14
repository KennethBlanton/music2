socket.addEventListener('noteChange', (obj)=>{
    console.log('fired');
    console.log(obj);
    app.state.sounds[obj.id].color = obj.color;
    console.log(app.state.sounds);
    if(obj.session == app.state.sessionType) {     
        app.player.toggleNote(obj);
        console.log(obj);
        socket.emit('soundUpdate', {session:app.state.sessionType, sounds:app.state.sounds});
    }
});
socket.addEventListener('loaded', (soundObj)=>{
    
    console.log(app.state.sounds);
    if(soundObj) {
       for (var i = 1; i < app.state.noteCount+1; i++) {
           if(app.state.sounds[i].play !== soundObj[i].play) {
                app.state.sounds[i].play = soundObj[i].play;
           }
           // console.log(app.state.soundsObj[i].play);
           if(soundObj[i].play) {
                app.state.sounds[i].note.classList.remove('new');
               app.state.sounds[i].note.classList.add('active');
               if(soundObj[i].color){
                app.state.sounds[i].note.classList.add(soundObj[i].color);
               }
           }
       }
    }
});
socket.addEventListener('createSession', (obj)=>{
    console.log(sessionName);
    if(obj.name == sessionName) {
        if(obj.valid) {
            document.querySelector('.sessionMessage').innerHTML = `Congrats ${obj.name} is available click start to begin`;
            options.type = obj.name;
        }else {
            document.querySelector('.sessionMessage').innerHTML = `Someone already has ${obj.name}`;
        } 
    }
});
socket.addEventListener('joinSession', (obj)=>{
    console.log(obj.valid, obj.name);
    if(obj.name == sessionName) {
        if(obj.valid) {
            document.querySelector('.sessionMessage').innerHTML = `Congrats your friends at ${obj.name} are waiting click start to join`;
            options.type = obj.name;
            options.width = (obj.sounds.length-1)/16;
            join = true;
            console.log(obj.sounds.length-1)
            
        }else {
            document.querySelector('.sessionMessage').innerHTML = ` Sorry ${obj.name} doesn't exist`;
        } 
    }
});

    let options = {};
let noteSelection = [];
let mouseDown = false
let join

// Drag  selection
document.querySelector('.blocks').addEventListener('mousedown', (e)=> {
    mouseDown = true;
})
document.querySelector('.blocks').addEventListener('mouseup', (e)=> {
    mouseDown = false;
    noteSelection = []
})

document.querySelector('.blocks').addEventListener('mousemove', (e)=> {
    console.log(noteSelection.indexOf(e.target.id));
    if(mouseDown) {
         if(noteSelection.indexOf(e.target.id) < 0) {
            noteSelection.push(e.target.id);
            console.log(noteSelection);
            if(app.state.sessionType == 'single') {
                app.player.toggleNote({id:e.target.id, color:app.state.color});
            } else {
                socket.emit('noteChange',{session:app.state.sessionType, id:e.target.id, color:app.state.color} );     
            }
        }
    }
  
})
document.querySelector('.overlay').addEventListener('click', (e)=> {
    if(e.target.dataset.play) {
        options.type = e.target.dataset.play;
    } else if (e.target.dataset.width) {
        options.width = e.target.dataset.width;
    }
    if(e.target.dataset) {
        let buttonFamily = e.target.parentNode.children;
        for (var i = 0; i < buttonFamily.length; i++) {
           buttonFamily[i].classList.contains('selected') ? buttonFamily[i].classList.remove('selected') : null 
        }
        e.target.classList.add('selected');
    }
    if(e.target.dataset.session) {
        sessionName = document.querySelector(`[name="${e.target.dataset.session}Session"]`).value;
        if(sessionName) {
            socket.emit(`${e.target.dataset.session}Session`, sessionName);
        } else {
            document.querySelector('.sessionMessage').innerHTML = "That's blank bro";
        }
    }
    if(e.target.classList.contains('start')) {
        if(options.width && options.type || join) {
            document.querySelector('.overlay').classList.add('hide');
            document.querySelector('.toggleMenu').classList.add('shown');
            console.log(options);
            app = new App(options);
            app.init()
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
    if(e.target.dataset.open) {
        document.querySelector('.open') ? document.querySelector('.open').classList.remove('open'):null
        document.querySelector("."+e.target.dataset.open).classList.toggle('open')
    }
})
document.querySelector('.options').addEventListener('click', function(e){
    if(e.target.classList.contains('slider')) {
        app.player.changeTempo(e.target.value);
    } else if(e.target.dataset.color) {
        let colors = e.target.parentNode.children;
        for (var i = 0; i < colors.length; i++) {
            colors[i].classList.remove('active-color');
        };
        e.target.classList.add('active-color');
       app.player.changeColor(e.target.dataset.color);
    } else if(e.target.classList.contains('select')) {
        console.log(e.target.value);
        app.state.frequency = keys[e.target.value];
        app.player.changeKey();
    }
})
document.querySelector('.toggleMenu').addEventListener('click',function(e) {
        console.log(this);
        document.querySelector('.options').classList.toggle('active');
        this.classList.toggle('active');
})
document.querySelector('.slider').addEventListener('mouseup', function(e){
     document.querySelector('.current-bpm').innerHTML = this.value;
})
    



