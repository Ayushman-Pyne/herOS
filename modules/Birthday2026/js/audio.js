/**
 * Romantic Audio Engine
 * Procedurally generates soft romantic chords and sound effects using Web Audio API.
 * Features instant audio stopping, master gain buses for music and SFX, and zero lingering notes.
 */

class RomanticAudioEngine {
  constructor() {
    this.ctx = null;
    this.musicGain = null;
    this.sfxGain = null;
    this.isMusicPlaying = false;
    this.isSfxEnabled = true;
    this.musicInterval = null;
    this.activeMusicOscillators = [];
    this.audioElement = null;
    this.audioElementChecked = false;
  }

  initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();

      // Master music bus
      this.musicGain = this.ctx.createGain();
      this.musicGain.gain.setValueAtTime(1, this.ctx.currentTime);
      this.musicGain.connect(this.ctx.destination);

      // Master sound effects bus
      this.sfxGain = this.ctx.createGain();
      this.sfxGain.gain.setValueAtTime(this.isSfxEnabled ? 1 : 0, this.ctx.currentTime);
      this.sfxGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      return this.ctx.resume();
    }
    return Promise.resolve();
  }

  // --- Music Management ---

  playMusicNote(freq, startTime, duration, gainValue = 0.12) {
    if (!this.ctx || !this.isMusicPlaying) return;
    try {
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
      gain.connect(this.musicGain || this.ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + duration + 0.1);

      this.activeMusicOscillators.push(osc);
      osc.onended = () => {
        const idx = this.activeMusicOscillators.indexOf(osc);
        if (idx !== -1) this.activeMusicOscillators.splice(idx, 1);
        try { osc.disconnect(); } catch (e) {}
      };
    } catch (e) {}
  }

  // Backward compatibility alias
  playNote(freq, startTime, duration, gainValue = 0.12) {
    this.playMusicNote(freq, startTime, duration, gainValue);
  }

  scheduleChords() {
    if (!this.ctx || !this.isMusicPlaying) return;

    const chords = [
      [261.63, 329.63, 392.00, 493.88], // Cmaj7
      [220.00, 261.63, 329.63, 392.00], // Am7
      [174.61, 261.63, 329.63, 349.23], // Fmaj7
      [196.00, 293.66, 392.00, 440.00], // Gsus
    ];

    const now = Math.max(this.ctx.currentTime, 0.05);
    chords.forEach((chord, chordIdx) => {
      const chordStart = now + chordIdx * 3.5;
      chord.forEach((note, noteIdx) => {
        this.playMusicNote(note, chordStart + noteIdx * 0.45, 3.2, 0.08);
      });
      const highNote = chord[chord.length - 1] * 1.5;
      this.playMusicNote(highNote, chordStart + 1.8, 2.5, 0.04);
    });
  }

  playChordProgression() {
    if (!this.ctx || !this.isMusicPlaying) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume().then(() => {
        if (this.isMusicPlaying) this.scheduleChords();
      });
      return;
    }
    this.scheduleChords();
  }

  startProceduralLoop() {
    if (!this.isMusicPlaying) return;
    this.playChordProgression();
    if (this.musicInterval) clearInterval(this.musicInterval);
    this.musicInterval = setInterval(() => {
      if (this.isMusicPlaying) {
        this.playChordProgression();
      }
    }, 14000);
  }

  startMusic() {
    this.initContext();
    this.stopMusic(); // Clean any previous notes/timers
    this.isMusicPlaying = true;

    // Smoothly ramp up music volume
    if (this.ctx && this.musicGain) {
      const t = this.ctx.currentTime;
      this.musicGain.gain.cancelScheduledValues(t);
      this.musicGain.gain.setValueAtTime(0.0001, t);
      this.musicGain.gain.linearRampToValueAtTime(1, t + 0.06);
    }

    // Check if background-music.mp3 is provided
    if (!this.audioElementChecked) {
      this.audioElementChecked = true;
      const testAudio = new Audio('../assets/background-music.mp3');
      testAudio.loop = true;
      testAudio.volume = 0.6;
      testAudio.addEventListener('canplaythrough', () => {
        this.audioElement = testAudio;
        if (this.isMusicPlaying) {
          // Fade procedural out and play mp3 track
          this.activeMusicOscillators.forEach((osc) => {
            try { osc.stop(); osc.disconnect(); } catch (e) {}
          });
          this.activeMusicOscillators = [];
          if (this.musicInterval) {
            clearInterval(this.musicInterval);
            this.musicInterval = null;
          }
          this.audioElement.play().catch(() => {});
        }
      }, { once: true });
      testAudio.addEventListener('error', () => {
        this.audioElement = null;
      }, { once: true });
      testAudio.load();
    }

    if (this.audioElement) {
      this.audioElement.play().catch(() => {
        this.startProceduralLoop();
      });
    } else {
      this.startProceduralLoop();
    }
  }

  stopMusic() {
    this.isMusicPlaying = false;

    // 1. Clear recurring interval
    if (this.musicInterval) {
      clearInterval(this.musicInterval);
      this.musicInterval = null;
    }

    // 2. Pause audio element if active
    if (this.audioElement) {
      try {
        this.audioElement.pause();
        this.audioElement.currentTime = 0;
      } catch (e) {}
    }

    // 3. Smoothly fade out music bus in 35ms (eliminates audio clicks)
    if (this.ctx && this.musicGain) {
      const t = this.ctx.currentTime;
      this.musicGain.gain.cancelScheduledValues(t);
      this.musicGain.gain.setValueAtTime(this.musicGain.gain.value, t);
      this.musicGain.gain.linearRampToValueAtTime(0.0001, t + 0.04);
    }

    // 4. Immediately stop and disconnect all scheduled oscillators
    if (this.activeMusicOscillators && this.activeMusicOscillators.length > 0) {
      const stopT = (this.ctx ? this.ctx.currentTime : 0) + 0.045;
      this.activeMusicOscillators.forEach((osc) => {
        try {
          osc.stop(stopT);
          setTimeout(() => {
            try { osc.disconnect(); } catch (e) {}
          }, 50);
        } catch (e) {}
      });
      this.activeMusicOscillators = [];
    }
  }

  toggleMusic() {
    this.initContext();
    if (this.isMusicPlaying) {
      this.stopMusic();
      return false;
    } else {
      this.startMusic();
      return true;
    }
  }

  // --- Sound Effects (SFX) Management ---

  toggleSfx() {
    this.initContext();
    this.isSfxEnabled = !this.isSfxEnabled;
    if (this.sfxGain && this.ctx) {
      const t = this.ctx.currentTime;
      this.sfxGain.gain.cancelScheduledValues(t);
      this.sfxGain.gain.setValueAtTime(this.isSfxEnabled ? 1 : 0, t);
    }
    return this.isSfxEnabled;
  }

  playSfxNote(freq, startTime, duration, gainValue = 0.1) {
    if (!this.ctx || !this.isSfxEnabled) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1200, startTime);
      filter.frequency.exponentialRampToValueAtTime(400, startTime + duration);

      gain.gain.setValueAtTime(0.0001, startTime);
      gain.gain.linearRampToValueAtTime(gainValue, startTime + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.sfxGain || this.ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + duration + 0.05);
    } catch (e) {}
  }

  playChime() {
    if (!this.isSfxEnabled) return;
    this.initContext();
    if (!this.ctx) return;
    const now = Math.max(this.ctx.currentTime, 0.01);
    const notes = [523.25, 659.25, 783.99, 1046.5, 1318.51];
    notes.forEach((freq, i) => {
      this.playSfxNote(freq, now + i * 0.08, 1.8, 0.1);
    });
  }

  playBlowSound() {
    if (!this.isSfxEnabled) return;
    this.initContext();
    if (!this.ctx) return;
    try {
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
      gain.connect(this.sfxGain || this.ctx.destination);

      noise.start();
    } catch (e) {}
  }

  playCelebrationChime() {
    if (!this.isSfxEnabled) return;
    this.initContext();
    if (!this.ctx) return;
    const now = Math.max(this.ctx.currentTime, 0.01);
    const notes = [392.00, 523.25, 659.25, 783.99, 1046.5, 1318.51, 1567.98];
    notes.forEach((freq, idx) => {
      this.playSfxNote(freq, now + idx * 0.09, 2.2, 0.12);
    });
  }

  playHeartClick() {
    if (!this.isSfxEnabled) return;
    this.initContext();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.1);

      osc.connect(gain);
      gain.connect(this.sfxGain || this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.1);
    } catch (e) {}
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
