// File: frontend/src/utils/speechVoice.ts

import { useState, useEffect } from 'react';

/**
 * Native Browser Web Speech API helper for reading out farming instructions,
 * diets, animal descriptions, and prices in clear speech for rural farmers.
 */

type VoiceStateListener = (isSpeaking: boolean, text: string) => void;

class FarmVoiceAssistant {
  private isSpeaking: boolean = false;
  private currentText: string = '';
  private listeners: Set<VoiceStateListener> = new Set();

  private notify() {
    this.listeners.forEach((listener) => listener(this.isSpeaking, this.currentText));
  }

  subscribe(listener: VoiceStateListener): () => void {
    this.listeners.add(listener);
    listener(this.isSpeaking, this.currentText);
    return () => {
      this.listeners.delete(listener);
    };
  }

  speak(text: string, onEnd?: () => void) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      console.warn('Web Speech API is not supported in this browser.');
      return;
    }

    try {
      window.speechSynthesis.cancel();

      // If user clicks the exact same button that is currently speaking, toggle off
      if (this.isSpeaking && this.currentText === text) {
        this.stop();
        return;
      }

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95; // Slightly slower, easy to understand for rural ears
      utterance.pitch = 1.0;
      utterance.volume = 1.0;

      // Select appropriate English or Indian English voice if available
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(
        (v) => v.lang.includes('en-IN') || v.lang.includes('en-GB') || v.lang.includes('en-US')
      );
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }

      this.isSpeaking = true;
      this.currentText = text;
      this.notify();

      utterance.onend = () => {
        this.isSpeaking = false;
        this.currentText = '';
        this.notify();
        if (onEnd) onEnd();
      };

      utterance.onerror = () => {
        this.isSpeaking = false;
        this.currentText = '';
        this.notify();
        if (onEnd) onEnd();
      };

      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.error('Speech synthesis error:', err);
      this.isSpeaking = false;
      this.notify();
      if (onEnd) onEnd();
    }
  }

  stop() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.isSpeaking = false;
    this.currentText = '';
    this.notify();
  }

  getIsSpeaking(): boolean {
    return this.isSpeaking;
  }

  getCurrentText(): string {
    return this.currentText;
  }
}

export const farmVoice = new FarmVoiceAssistant();

/**
 * Custom React Hook for consuming voice synthesis status
 */
export const useFarmVoice = () => {
  const [isSpeaking, setIsSpeaking] = useState<boolean>(farmVoice.getIsSpeaking());
  const [currentText, setCurrentText] = useState<string>(farmVoice.getCurrentText());

  useEffect(() => {
    const unsubscribe = farmVoice.subscribe((speaking, text) => {
      setIsSpeaking(speaking);
      setCurrentText(text);
    });
    return unsubscribe;
  }, []);

  return {
    isSpeaking,
    currentText,
    speak: (text: string, onEnd?: () => void) => farmVoice.speak(text, onEnd),
    stop: () => farmVoice.stop(),
  };
};
