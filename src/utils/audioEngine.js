// Procedural Audio Engine with Background Music Support
// Combines natural ambient elements with the background music track from the invitation

class AudioEngine {
  constructor() {
    this.ctx = null;
    this.initialized = false;
    this.playing = false;
    this.bgMusic = null;

    // Node references for ambient synth control
    this.masterGain = null;
    this.windGain = null;
    this.waterGain = null;

    // Intervals and state
    this.birdTimer = null;
  }

  init() {
    if (this.initialized && this.bgMusic) return;

    // Initialize HTML5 Audio for background music
    this.bgMusic = new Audio("./audio/joyful-celebration.mp3");
    this.bgMusic.loop = true;
    this.bgMusic.volume = 0.6; // Clear audible volume

    // Create audio context for Web Audio API if supported
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      try {
        this.ctx = new AudioContextClass();
      } catch (e) {
        console.warn("Could not initialize AudioContext:", e);
      }
    }

    this.initialized = true;
  }

  setupWind(noiseBuffer) {
    const windSource = this.ctx.createBufferSource();
    windSource.buffer = noiseBuffer;
    windSource.loop = true;

    const windFilter = this.ctx.createBiquadFilter();
    windFilter.type = "bandpass";
    windFilter.frequency.setValueAtTime(400, this.ctx.currentTime);
    windFilter.Q.setValueAtTime(1.5, this.ctx.currentTime);

    const lfo = this.ctx.createOscillator();
    lfo.frequency.setValueAtTime(0.05, this.ctx.currentTime);
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(150, this.ctx.currentTime);

    this.windGain = this.ctx.createGain();
    this.windGain.gain.setValueAtTime(0.08, this.ctx.currentTime); // Lower ambient so music stands out

    lfo.connect(lfoGain);
    lfoGain.connect(windFilter.frequency);
    windSource.connect(windFilter);
    windFilter.connect(this.windGain);
    this.windGain.connect(this.masterGain);

    lfo.start();
    windSource.start();
  }

  setupWater(noiseBuffer) {
    const waterSource = this.ctx.createBufferSource();
    waterSource.buffer = noiseBuffer;
    waterSource.loop = true;

    const waterFilter = this.ctx.createBiquadFilter();
    waterFilter.type = "bandpass";
    waterFilter.frequency.setValueAtTime(800, this.ctx.currentTime);
    waterFilter.Q.setValueAtTime(3.0, this.ctx.currentTime);

    const lfo = this.ctx.createOscillator();
    lfo.frequency.setValueAtTime(0.8, this.ctx.currentTime);
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(0.03, this.ctx.currentTime);

    this.waterGain = this.ctx.createGain();
    this.waterGain.gain.setValueAtTime(0.03, this.ctx.currentTime); // Lower ambient so music stands out

    lfo.connect(lfoGain);
    lfoGain.connect(this.waterGain.gain);
    waterSource.connect(waterFilter);
    waterFilter.connect(this.waterGain);
    this.waterGain.connect(this.masterGain);

    lfo.start();
    waterSource.start();
  }

  playSingleBirdCall() {
    if (!this.playing || !this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sine";
    const baseFreq = 2200 + Math.random() * 800;
    osc.frequency.setValueAtTime(baseFreq, now);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.7, now + 0.15);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.1, now + 0.3);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.6, now + 0.45);

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.01, now + 0.05); // Very soft chirping
    gain.gain.linearRampToValueAtTime(0.005, now + 0.2);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.5);
  }

  playWaxCrack() {
    if (!this.playing || !this.ctx) return;
    const now = this.ctx.currentTime;

    const bufferSize = 0.1 * this.ctx.sampleRate;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const source = this.ctx.createBufferSource();
    source.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = "highpass";
    filter.frequency.setValueAtTime(3000, now);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);

    source.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    source.start(now);
    source.stop(now + 0.1);
  }

  playPaperRuffle() {
    if (!this.playing || !this.ctx) return;
    const now = this.ctx.currentTime;

    const bufferSize = 0.6 * this.ctx.sampleRate;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const source = this.ctx.createBufferSource();
    source.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(1000, now);
    filter.frequency.exponentialRampToValueAtTime(1500, now + 0.4);
    filter.Q.setValueAtTime(2.0, now);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.0, now);
    gain.gain.linearRampToValueAtTime(0.08, now + 0.15);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);

    source.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    source.start(now);
    source.stop(now + 0.6);
  }

  startBirds() {
    const triggerNext = () => {
      if (!this.playing) return;
      this.playSingleBirdCall();
      if (Math.random() > 0.6) {
        setTimeout(() => this.playSingleBirdCall(), 300);
      }
      const delay = 6000 + Math.random() * 8000;
      this.birdTimer = setTimeout(triggerNext, delay);
    };

    triggerNext();
  }

  stopBirds() {
    if (this.birdTimer) {
      clearTimeout(this.birdTimer);
      this.birdTimer = null;
    }
  }

  start() {
    this.init();
    
    // Play background music track safely avoiding AbortError interruptions
    if (this.bgMusic) {
      const playPromise = this.bgMusic.play();
      if (playPromise !== undefined) {
        playPromise.catch(err => {
          if (err.name !== 'AbortError') {
            console.warn("Background music play error:", err);
          }
        });
      }
    }

    this.playing = true;
  }

  stop() {
    // Pause background music safely
    if (this.bgMusic) {
      this.bgMusic.pause();
    }

    this.playing = false;
  }
}

export const audioEngine = new AudioEngine();
