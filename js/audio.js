class GameAudio {
    constructor() {
        this.ctx = null;
        this.enabled = true;
        this.volume = 0.3;
    }

    init() {
        try {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            this.enabled = false;
        }
    }

    ensureContext() {
        if (!this.ctx) this.init();
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    play(type) {
        if (!this.enabled || !this.ctx) return;
        try {
            switch (type) {
                case 'place': this.playTone(440, 0.08, 'sine', 0.2); break;
                case 'shoot': this.playTone(880, 0.05, 'square', 0.1); break;
                case 'hit': this.playTone(220, 0.1, 'sawtooth', 0.12); break;
                case 'kill': this.playKill(); break;
                case 'wave': this.playWaveStart(); break;
                case 'error': this.playTone(150, 0.15, 'square', 0.15); break;
                case 'upgrade': this.playUpgrade(); break;
                case 'sell': this.playTone(330, 0.1, 'triangle', 0.15); break;
                case 'clone': this.playClone(); break;
                case 'jump': this.playJump(); break;
                case 'capture': this.playCapture(); break;
                case 'win': this.playWin(); break;
                case 'lose': this.playLose(); break;
            }
        } catch (e) { /* silent fail */ }
    }

    playTone(freq, duration, waveform, vol) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = waveform;
        osc.frequency.value = freq;
        gain.gain.value = vol * this.volume;
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + duration);
    }

    playKill() {
        this.playTone(600, 0.05, 'sine', 0.15);
        setTimeout(() => this.playTone(800, 0.08, 'sine', 0.12), 50);
    }

    playWaveStart() {
        [400, 500, 600, 800].forEach((f, i) => {
            setTimeout(() => this.playTone(f, 0.1, 'sine', 0.15), i * 80);
        });
    }

    playUpgrade() {
        [500, 700, 900].forEach((f, i) => {
            setTimeout(() => this.playTone(f, 0.08, 'triangle', 0.15), i * 60);
        });
    }

    playClone() {
        this.playTone(500, 0.08, 'sine', 0.2);
        setTimeout(() => this.playTone(700, 0.1, 'sine', 0.15), 60);
    }

    playJump() {
        this.playTone(300, 0.05, 'sine', 0.15);
        setTimeout(() => this.playTone(600, 0.08, 'sine', 0.2), 80);
    }

    playCapture() {
        this.playTone(400, 0.06, 'sawtooth', 0.1);
        setTimeout(() => this.playTone(500, 0.06, 'sawtooth', 0.1), 40);
    }

    playWin() {
        [523, 659, 784, 1047].forEach((f, i) => {
            setTimeout(() => this.playTone(f, 0.15, 'sine', 0.2), i * 120);
        });
    }

    playLose() {
        [400, 350, 300, 200].forEach((f, i) => {
            setTimeout(() => this.playTone(f, 0.2, 'sine', 0.15), i * 150);
        });
    }
}

const gameAudio = new GameAudio();

document.addEventListener('click', () => {
    gameAudio.ensureContext();
}, { once: true });
