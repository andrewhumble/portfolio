import * as Tone from 'tone';

let synth: Tone.PolySynth | null = null;
let isPaused = false;
let pausedPosition = 0;
let songMap: SongNote[];

interface SongNote {
    string: number[];
    fret: number[];
    note: string[];
    sequence: number;
}

const playNote = (notes: SongNote, startWave: (index: number, stringIndex: number) => void) => {
    if (isPaused) return;

    const now = Tone.now();
    const scaler = 0.3;
    const playTime = now + scaler * notes.sequence;

    if (synth) {
        synth.triggerAttackRelease(notes.note, "8n", playTime);

        setTimeout(() => {
            if (!isPaused) {
                notes.string.forEach((stringIndex) => {
                    startWave(50, stringIndex - 1);
                    pausedPosition++
                });
            }
        }, (playTime - now) * 1000);
    }
};

export const playSong = async (startWave: (index: number, stringIndex: number) => void) => {
    isPaused = false;
    await Tone.start();
    synth = await new Tone.PolySynth(Tone.Synth).toDestination();
    try {
        if (!songMap) {
            const response = await fetch('/song_output.json');
            if (!response.ok) throw new Error('Failed to load song data');
            songMap = await response.json();
        }
        songMap.slice(pausedPosition).forEach(note => {
            playNote(note, startWave);
        });
        
    } catch (error) {
        console.error('Error fetching song data:', error);
    }
};

export const pauseSong = () => {
    if (synth) {
        synth.releaseAll(); // Stops all currently playing notes
    }
    Tone.Transport.stop();
    Tone.Transport.cancel(); // Stops scheduled events
    isPaused = true;
};
