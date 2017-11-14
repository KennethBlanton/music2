class GridManager {
    constructor(string) {
        this.state = {
        }
    }
    createGrid() {
        for (let i = 1; i <= app.state.scale.length*app.state.gridWidth; i++){
            let block = document.createElement('div');
            let effect = document.createElement('div');
            effect.className = ('effect');
            block.className = ('block new');
            block.id = i; 
            // effect.id = i
            block.setAttribute('data-frequency', app.state.frequency*( Math.pow(app.state.A_VAL, app.state.scale[app.state.count] )));
            app.state.sounds[block.id] = {note:block,effect:effect,play:false};
            if(block.id % app.state.gridWidth == 0 && app.state.count !== app.state.scale.length) {
                app.state.count++;
            }
            block.style.width = (100/app.state.gridWidth)-.1  + "%";
            block.style.height = (100/app.state.scale.length)- .22 + 'vh';
            effect.style.width = (100/app.state.gridWidth)-.1  + "%";
            effect.style.height = (100/app.state.scale.length)- .22 + 'vh';
            document.querySelector('.effects').appendChild(effect);
            document.querySelector('.blocks').appendChild(block);
        }
        app.state.noteCount = document.querySelectorAll('.block').length;
    }
    controlInterval(string) {
        if(string == 'start') {
            this.state.tempo = setInterval(
                ()=> {
                    // console.log('ran')
                    for (var i = 1; i < app.state.noteCount+1; i++) {
                        // sounds[i].note.classList.remove('playing');
                        app.state.sounds[i].effect.classList.remove('playing');
                    }
                    this.play(app.state.sounds);
                }, app.state.time
            );
        } else {
            clearInterval(this.state.tempo);
        }
       
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
             app.state.sounds[app.state.gridWidth *i +1 + app.state.beat].effect.classList.add('playing')
            this.playSound(sounds[app.state.gridWidth *(i) +1 + app.state.beat])
            // sounds[app.state.gridWidth *i +1 + app.state.beat].note.classList.add('playing');
           

        }
        if(app.state.beat < app.state.gridWidth -1) {
            app.state.beat++;
        } else {
            app.state.beat = 0;
        }
    }

}