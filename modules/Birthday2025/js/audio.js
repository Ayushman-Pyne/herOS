/**
 * Romantic Audio Engine
 * Procedurally generates soft romantic chords and sound effects using Web Audio API.
 */

class RomanticAudioEngine {
  constructor() {
    this.ctx = null;
    this.isMusicPlaying = false;
    this.musicInterval = null;
  }

  initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playNote(freq, startTime, duration, gainValue = 0.12) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, startTime);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, startTime);
    filter.frequency.exponentialRampToValueAtTime(350, startTime + duration);

    gain.gain.setValueAtTime(0.0001, startTime);
    gain.gain.linearRampToValueAtTime(gainValue, startTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + duration + 0.1);
  }

  playChordProgression() {
    if (!this.ctx || !this.isMusicPlaying) return;

    const chords = [
      [261.63, 329.63, 392.00, 493.88], // Cmaj7
      [220.00, 261.63, 329.63, 392.00], // Am7
      [174.61, 261.63, 329.63, 349.23], // Fmaj7
      [196.00, 293.66, 392.00, 440.00], // Gsus
    ];

    const now = this.ctx.currentTime;
    chords.forEach((chord, chordIdx) => {
      const chordStart = now + chordIdx * 3.5;
      chord.forEach((note, noteIdx) => {
        this.playNote(note, chordStart + noteIdx * 0.45, 3.2, 0.08);
      });
      const highNote = chord[chord.length - 1] * 1.5;
      this.playNote(highNote, chordStart + 1.8, 2.5, 0.04);
    });
  }

  toggleMusic() {
    this.initContext();
    this.isMusicPlaying = !this.isMusicPlaying;

    if (this.isMusicPlaying) {
      this.playChordProgression();
      if (this.musicInterval) clearInterval(this.musicInterval);
      this.musicInterval = setInterval(() => {
        if (this.isMusicPlaying) {
          this.playChordProgression();
        }
      }, 14000);
    } else {
      if (this.musicInterval) {
        clearInterval(this.musicInterval);
        this.musicInterval = null;
      }
    }

    return this.isMusicPlaying;
  }

  playChime() {
    this.initContext();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.5, 1318.51];
    notes.forEach((freq, i) => {
      this.playNote(freq, now + i * 0.08, 1.8, 0.1);
    });
  }

  playBlowSound() {
    this.initContext();
    if (!this.ctx) return;
    const bufferSize = this.ctx.sampleRate * 0.6;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(400, this.ctx.currentTime);
    filter.Q.setValueAtTime(1.5, this.ctx.currentTime);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.01, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.35, this.ctx.currentTime + 0.15);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.6);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start();
  }

  playCelebrationChime() {
    this.initContext();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const notes = [392.0, 523.25, 659.25, 783.99, 1046.5, 1318.51, 1567.98];
    notes.forEach((freq, idx) => {
      this.playNote(freq, now + idx * 0.09, 2.2, 0.12);
    });
  }

  playHeartClick() {
    this.initContext();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(440, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.1);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.1);
  }
}

const romanticAudio = new RomanticAudioEngine();

if (typeof window !== 'undefined') {
  window.RomanticAudioEngine = RomanticAudioEngine;
  window.romanticAudio = romanticAudio;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { RomanticAudioEngine, romanticAudio };
}
