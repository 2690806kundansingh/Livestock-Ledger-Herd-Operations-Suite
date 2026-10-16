// File: frontend/src/utils/audioSynthesizer.ts

/**
 * Web Audio API based animal sound synthesizer & voice announcer.
 * Generates realistic animal acoustic signatures without requiring external audio files.
 */

class LivestockAudioEngine {
  private ctx: AudioContext | null = null;

  private getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  /**
   * Synthesize a deep resonant cow/cattle "Moo"
   */
  playCattleSound() {
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const subOsc = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();

    // Cow moo fundamental frequency starts around 140Hz, glides to 110Hz, then softly down to 95Hz
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.exponentialRampToValueAtTime(115, now + 0.4);
    osc.frequency.exponentialRampToValueAtTime(100, now + 1.2);
    osc.frequency.exponentialRampToValueAtTime(80, now + 1.8);

    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(70, now);
    subOsc.frequency.exponentialRampToValueAtTime(55, now + 1.5);

    // Formant filter (mouth cavity)
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(450, now);
    filter.frequency.linearRampToValueAtTime(650, now + 0.3);
    filter.frequency.exponentialRampToValueAtTime(320, now + 1.6);
    filter.Q.setValueAtTime(4, now);

    // Envelope
    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.35, now + 0.25);
    gain.gain.setValueAtTime(0.3, now + 1.0);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 1.9);

    osc.connect(filter);
    subOsc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    subOsc.start(now);
    osc.stop(now + 1.95);
    subOsc.stop(now + 1.95);

    this.speakAnimalName('Cattle, Dairy and Bos taurus breeds');
  }

  /**
   * Synthesize a deep, guttural buffalo bellow
   */
  playBuffaloSound() {
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();

    // Buffalo low rumble bellow
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(95, now);
    osc.frequency.exponentialRampToValueAtTime(82, now + 0.5);
    osc.frequency.exponentialRampToValueAtTime(70, now + 1.4);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(280, now);
    filter.Q.setValueAtTime(5, now);

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.4, now + 0.3);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 1.7);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 1.75);

    this.speakAnimalName('Murrah and Nili-Ravi Buffalo breeds');
  }

  /**
   * Synthesize a goat bleat ("Maa-aaa-aaa")
   */
  playGoatSound() {
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    const gain = ctx.createGain();

    // Goat bleat vibrato
    lfo.frequency.setValueAtTime(14, now); // 14 Hz fast vibrato
    lfoGain.gain.setValueAtTime(35, now);

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(290, now + 0.8);

    lfo.connect(osc.frequency);

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.28, now + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

    osc.connect(gain);
    gain.connect(ctx.destination);

    lfo.start(now);
    osc.start(now);
    lfo.stop(now + 1.25);
    osc.stop(now + 1.25);

    this.speakAnimalName('Sirohi and Barbari Goat breeds');
  }

  /**
   * Synthesize a poultry rooster crow / cluck
   */
  playPoultrySound() {
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    // Series of 3 quick pulses (cluck-cluck-crow)
    [0, 0.22, 0.5].forEach((offset, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const pitch = idx === 2 ? 620 : 480;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(pitch, now + offset);
      osc.frequency.exponentialRampToValueAtTime(pitch * 0.7, now + offset + 0.18);

      gain.gain.setValueAtTime(0.01, now + offset);
      gain.gain.linearRampToValueAtTime(0.3, now + offset + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + offset);
      osc.stop(now + offset + 0.21);
    });

    this.speakAnimalName('Poultry, Kadaknath and Layer breeds');
  }

  private speakAnimalName(text: string) {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1.05;
        utterance.pitch = 1.0;
        utterance.volume = 0.8;
        window.speechSynthesis.speak(utterance);
      } catch {
        // Ignore speech synthesis errors if blocked by browser policy
      }
    }
  }
}

export const livestockAudio = new LivestockAudioEngine();
