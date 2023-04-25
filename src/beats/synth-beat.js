const AudioContext = window.AudioContext || window.webkitAudioContext; // Obtem o AudioContext compatível com o navegador
const audioContext = new AudioContext();

const envelope = audioContext.createGain();
envelope.connect(audioContext.destination);

const synthBeat = (level) => {
  envelope.gain.cancelScheduledValues(0);
  const oscillator = audioContext.createOscillator();
  oscillator.type = "square";
  oscillator.frequency.value = level > 2 ? 1000 : level > 1 ? 800 : 600;
  oscillator.connect(envelope);

  envelope.gain.value = 0;
  const time = audioContext.currentTime;
  envelope.gain.linearRampToValueAtTime(1, time + 0.01);
  envelope.gain.setValueAtTime(1, time + 0.04);
  envelope.gain.linearRampToValueAtTime(0, time + 0.07);

  oscillator.start();
  oscillator.stop(time + 0.1);
};

export default synthBeat;
