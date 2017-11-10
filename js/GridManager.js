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
                function() {
                    // console.log('ran')
                    for (var i = 1; i < app.state.noteCount+1; i++) {
                        // sounds[i].note.classList.remove('playing');
                        app.state.sounds[i].effect.classList.remove('playing');
                    }
                    app.play(app.state.sounds);
                }, app.state.time
            );
        } else {
            clearInterval(this.state.tempo);
        }
       
    }

}