"use client";

import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { useTheme } from "@/providers/ThemeProvider";
import { useMediaQuery } from 'react-responsive';
import { playSong, pauseSong } from '@/lib/utils/tone';
import { IconPlayerPlayFilled, IconPlayerPauseFilled } from "@tabler/icons-react";
import * as Tone from 'tone';

interface FretboardProps {
  song?: Array<{ note: string; timestamp: number; scheduledTime: string }>; // Define the structure of the song prop
}

const Fretboard = forwardRef(({ }: FretboardProps, ref) => { // TODO: pass song
  useImperativeHandle(ref, () => ({
    pluckStrings() {
      pluckStrings();
    },
  }));

  const [isPlaying, setIsPlaying] = useState(false); // State to track if the song is playing

  const { theme } = useTheme();
  const [currentWidth, setCurrentWidth] = useState(window.innerWidth); // Track current page width
  const isMobile = useMediaQuery({ query: '(max-width: 700px)' });
  const isMedium = useMediaQuery({ query: '(max-width: 999px)' });

  useEffect(() => {
    const handleResize = () => {
      setCurrentWidth(window.innerWidth); // Update width on resize
    };

    window.addEventListener('resize', handleResize); // Add event listener

    return () => {
      window.removeEventListener('resize', handleResize); // Clean up on unmount
    };
  }, []);

  const numPoints = 100;
  const svgWidth = isMobile ? 1500 * currentWidth / 1000 : isMedium ? 1000 * currentWidth / 1000 : 1000 * currentWidth / 1000;
  const svgHeight = isMobile ? 150 * currentWidth / 1000 : isMedium ? 400 * currentWidth / 1000 : 400 * currentWidth / 1000;
  const circleRadius = "11vw";
  const circleCx = isMobile ? svgWidth / 2.5 + (40 * Math.log(9)) : isMedium ? svgWidth / 2.5 + (10 * Math.log(9)) : svgWidth / 2.5 + (10 * Math.log(9));
  const circleCy = isMobile ? svgHeight / 2 - (42 * currentWidth / 1500) : isMedium ? svgHeight / 2 - (227 * currentWidth / 1500) : svgHeight / 2 - (227 * currentWidth / 1500);
  const duration = 1500;
  const frameRate = 100;
  const totalFrames = (duration / 1000) * frameRate;
  const dampingFactor = 0.985;
  const amplitude = 15;
  const stringSpacing = 50 * currentWidth / 1500;
  const frequency = 2.5;

  // Graphic positioning
  const svgTop = isMobile ? '30%' : isMedium ? '60%' : '50%';
  const svgLeft = isMobile ? '50%' : isMedium ? '90%' : '50%';

  const [strings, setStrings] = useState(Array(6).fill(null).map(() =>
    Array(numPoints).fill(0)
  ));

  const handleStringClick = async (stringIndex: number, event: React.MouseEvent<SVGPathElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const index = Math.round((clickX / svgWidth) * (numPoints - 1));

    // Play notes for different strings
    if (Tone.getContext().state !== "running") {
      await Tone.start();
    }

    const synth = new Tone.Synth().toDestination();
    switch (stringIndex) {
      case 0:
        synth.triggerAttackRelease("E2", "8n"); // Low E
        break;
      case 1:
        synth.triggerAttackRelease("A2", "8n"); // A
        break;
      case 2:
        synth.triggerAttackRelease("D3", "8n"); // D
        break;
      case 3:
        synth.triggerAttackRelease("G3", "8n"); // G
        break;
      case 4:
        synth.triggerAttackRelease("B3", "8n"); // B
        break;
      case 5:
        synth.triggerAttackRelease("E4", "8n"); // High E
        break;
    }

    startWave(index, stringIndex);
  };

  const startWave = (index: number, stringIndex: number) => {
    let frame = 0;
    const currentStrings = strings.map(str => [...str]);

    const updateWave = () => {
      if (frame >= totalFrames) {
        return; // Stop the animation when done
      }

      currentStrings[stringIndex] = currentStrings[stringIndex].map((_, i) => {
        const distance = Math.abs(i - index);
        const decay = Math.exp(-0.02 * distance) *
          Math.sin((frame * 0.5 - distance) * 0.2 * frequency) * // Increase frequency here
          (1 - Math.exp(-frame * 0.1));
        return decay * amplitude * Math.pow(dampingFactor, frame);
      });

      setStrings(prevStrings => {
        const newStrings = [...prevStrings];
        newStrings[stringIndex] = currentStrings[stringIndex];
        return newStrings;
      });

      frame++;
      requestAnimationFrame(updateWave);
    };

    updateWave(); // Start the wave animation
  };

  const getPath = (points: number[], xOffset: number, yOffset: number) => {
    const step = (svgWidth - xOffset) / (numPoints - 1);
    if (Array.isArray(points)) {
      return `M ${xOffset},${yOffset} ${points
        .map((y, i) => `L ${xOffset + i * step},${yOffset + y}`)
        .join(" ")} L ${svgWidth},${yOffset}`;
    } else {
      // Return a straight line if points is not an array
      return `M ${xOffset},${yOffset} L ${svgWidth},${yOffset}`;
    }
  };

  const getColor = () => {
    return {
      circleFill: theme === 'dark'
        ? (isMobile ? 'white' : 'white') // dark mode
        : (isMobile ? 'black' : 'black'), // light mode
      circleStroke: theme === 'dark'
        ? (isMobile ? '#e9e9e9' : '#e9e9e9')
        : (isMobile ? '#161616' : '#161616'),
      pathStroke: theme === 'dark'
        ? (isMobile ? '#e9e9e9' : '#E4E4E7')
        : (isMobile ? '#161616' : '#1b1b18')
    };
  };

  const { circleFill, circleStroke, pathStroke } = getColor();

  const pluckStrings = async () => {
    for (let i = 0; i < strings.length; i++) {
      startWave(50, i);
      await new Promise((resolve) => setTimeout(resolve, 10));
    }
  };

  const handlePlaySong = () => {
    setIsPlaying(!isPlaying); // Toggle play state
    if (isPlaying) {
      pauseSong();
    } else {
      playSong(startWave);
    }
  };

  return (
    <div
      className="relative w-full h-full"
      style={{ clipPath: 'inset(-240px)', position: 'relative', aspectRatio: '5 / 2' }} // Ensure the container is relative
    >
      {false && ( // Block song playing for now, to be released later
        <button
          onClick={handlePlaySong}
          aria-label={isPlaying ? "Pause the tune" : "Play the tune"}
          className={`play-button flex items-center justify-center transition duration-200 
            ${theme === 'dark' ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-white text-black hover:bg-gray-200'}`}
          style={{
            position: 'absolute',
            bottom: '20%',
            right: '0%',
            zIndex: 10,
            borderRadius: '50%', // Make the button circular
            width: '3vw', // Set a fixed width
            height: '3vw' // Set a fixed height
          }} // Added zIndex for clickability
        >
          {isPlaying ? (
            <IconPlayerPauseFilled size="50%" /> // Render pause icon when playing
          ) : (
            <IconPlayerPlayFilled size="50%" /> // Render play icon when not playing
          )}
        </button>
      )}
      <svg
        width={svgWidth}
        height={svgHeight}
        style={{
          rotate: "-45deg",
          marginLeft: "-200px",
          overflow: "visible",
          position: 'absolute', // Position the SVG absolutely
          top: svgTop, // Adjust as needed
          left: svgLeft, // Adjust as needed
          transform: 'translate(-0%, -70%)' // Center the SVG
        }}
      >
        <circle
          cx={circleCx}
          cy={circleCy}
          r={circleRadius}
          fill={circleFill}
          stroke={circleStroke}
          strokeWidth="3"
        />
        {strings.map((stringPoints, i) => (
          <path
            key={i}
            d={getPath(stringPoints, i * stringSpacing - (75 * currentWidth / 1500), (-50 * currentWidth / 1500) + i * stringSpacing)}
            stroke={pathStroke}
            strokeWidth={2.5 + (0.5 * (strings.length - 1 - i))}
            fill="transparent"
            onClick={(e) => handleStringClick(i, e)}
            style={{ cursor: "pointer" }}
          />
        ))}
      </svg>
    </div>
  );
});

Fretboard.displayName = "Fretboard";
export default Fretboard;