socket.addEventListener('noteChange', (obj)=>{
    console.log('fired');
    if(obj.session == app.state.sessionType) {     
        app.player.toggleNote(obj.id);
        console.log(app.state.sounds);
        socket.emit('soundUpdate', {session:app.state.sessionType, sounds:app.state.sounds});
    }
});
socket.addEventListener('loaded', (soundObj)=>{
    
    // console.log(app.state.sounds);
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

    let options = {};
document.body.addEventListener('click',(e) => {
    console.dir(e.target);
    if(e.target.classList.contains('single-play')) {
        options.type = 'single';
        // console.log(options)
        e.target.classList.add('selected')
    } else if(e.target.classList.contains('multi-play')) {
        options.type = 'multi'
        e.target.classList.add('selected')
    }
    if(e.target.classList.contains('short')) {
        options.width = 8;
        e.target.classList.add('selected')
    } else if(e.target.classList.contains('medium')) {
        options.width = 16;
        e.target.classList.add('selected')
    } else if(e.target.classList.contains('long')) {
        // app.changeState({gridWidth:32,gridSize:true});
        options.width = 32;
        e.target.classList.add('selected')
    }
    if(e.target.classList.contains('go-button')) {
        if(options.width && options.type || join) {
            document.querySelector('.overlay').classList.add('hide');
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
    if(e.target.classList.contains('createSession')) {
        console.log('fired')
        sessionName = document.querySelector('[name="createSession"]').value;
        if(sessionName) {
            socket.emit('createSession', sessionName);
        } else {
            document.querySelector('.sessionMessage').innerHTML = "That's blank bro"
        }


    } else if(e.target.classList.contains('joinSession')) {
        console.log('fired');
        sessionName = document.querySelector('[name="joinSession"]').value;
        if(sessionName) {
            socket.emit('joinSession', sessionName);
        } else {
            document.querySelector('.sessionMessage').innerHTML = "That's blank bro"
        }
        
    }
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

});
let noteSelection = [];
let mouseDown = false
document.querySelector('.blocks').addEventListener('mousedown', (e)=> {
    // if(e.target.classList.contains('block')) {
    //     if(app.state.sessionType == 'single') {
    //         app.player.toggleNote(e.target.id);
    //     } else {
    //         socket.emit('noteChange',{session:app.state.sessionType, id:e.target.id} );     
    //     }
    // } 
    // console.log('mouseDown');

    mouseDown = true;
})
document.querySelector('.blocks').addEventListener('mouseup', (e)=> {
    // console.log('mouseUp');
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
                app.player.toggleNote(e.target.id);
            } else {
                socket.emit('noteChange',{session:app.state.sessionType, id:e.target.id} );     
            }
        }
    }
  
})
document.querySelector('.overlay').addEventListener('click', function(e) {
    console.log('clicked');
})
document.querySelector('.blocks').addEventListener('click' , function(e) {
    console.log('blocks');
});
function test() {
    socket.emit('rooms', {test:test,test:test});
}
socket.addEventListener('rooms',function(obj) {
    console.log('recieved')
    console.dir(obj);
})


    



