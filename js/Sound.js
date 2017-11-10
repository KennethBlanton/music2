class Sound {
    
    constructor(context) {
        this.context = context;
    }
    
    setup() {
        this.oscillator = this.context.createOscillator();
        this.gainNode = this.context.createGain();

        this.oscillator.connect(this.gainNode);
        this.gainNode.connect(this.context.destination);
        this.oscillator.type = 'sine';
    }

    play(value) {
        this.setup();

        this.oscillator.frequency.value = value;
        this.gainNode.gain.setValueAtTime(0, this.context.currentTime);
        this.gainNode.gain.linearRampToValueAtTime(.1, this.context.currentTime + 0.015);
                
        this.oscillator.start(this.context.currentTime);
        this.stop(this.context.currentTime);
    }
    
    stop() {
        let stopTime = this.context.currentTime +1;
        this.gainNode.gain.value = .1
        this.gainNode.gain.exponentialRampToValueAtTime(0.01, stopTime);
        setTimeout(()=>{
           this.gainNode.gain.exponentialRampToValueAtTime(0.000001, this.context.currentTime+1)
           this.oscillator.stop(this.context.currentTime+ 1)
       },2000)
    }
 
}