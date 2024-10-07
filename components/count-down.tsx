"use client";
import { useState, useRef, useEffect, ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import React from 'react'
// Making a function to handle all the time duration and return values
export default function CountDown (){
    // State value to manage the time duration input
    const[duration,setDuration] = useState<number|string>("");
    // State value to manage the CountDown timer values 
    const [timeLeft,setTimeLeft]=useState<number>(0);
    // State to track if the timer is active 
    const[isActive,setIsActive] = useState<boolean>(false);
    // State to track if the timer is paused 
    const[isPaused,setIsPaused] = useState<boolean>(false);
    // Reference to store the timer value
    const timerRef = useRef <NodeJS.Timeout |null>(null);
    // Function to handle timer time duration values in CountDown
    const handleSetDuration = (): void =>{
        if(typeof duration === "number" && duration >0){
            setTimeLeft(duration);
            setIsActive(false);
            setIsPaused(false);
            if(timerRef.current){
                clearInterval(timerRef.current)
            }
        }
    };
    // Function to start the CountDown time 
    const handleStart =(): void =>{
        if(timeLeft > 0){
            setIsActive(true);
            setIsPaused(false);
        }
    };

    // Function to paused the timer 
    const handlePause = ():void=>{
        if(isActive){
            setIsPaused(true);
            setIsActive(false);
            if(timerRef.current){
                clearInterval(timerRef.current)
            }
        }
    };
    // Function to reset the CountDown timer 
    const handleReset = ():void=>{
        setIsActive(false);
        setIsPaused(false);
        setTimeLeft(typeof duration === "number"? duration : 0);
        if(timerRef.current){
            clearInterval(timerRef.current)
        }
    };
     // useEffect hook to manage the countdown interval
     useEffect(()=>{
        if(isActive && !isPaused){
            timerRef.current = setInterval(()=>{
                setTimeLeft((prevTime) => {
                    if(prevTime <= 1){
                        clearInterval(timerRef.current!);
                        return 0;
                    }
                    return prevTime -1;
                });
            },1000)
        }
        return()=>{
            if(timerRef.current){
                clearInterval(timerRef.current);
            }
        };
     },[isActive , isPaused]
    );
     // Function to format the time left into mm:ss format
  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60); // Calculate minutes
    const seconds = time % 60; // Calculate seconds
    // Return the formatted string
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  // Function to handle changes in the duration input field
  const handleDurationChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setDuration(Number(e.target.value) || ""); // Update the duration state
  };
// JSX return statement rendering the Countdown UI
return (
    // Container div for centering the content
    <div className="flex flex-col items-center justify-center h-screen bg-black 100 dark:bg-gray-900">
      <h1 className="name">Made by Abdul Wasay</h1>
      {/* Timer box container */}
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-md">
        {/* Title of the countdown timer */}
        <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200 text-center">
          Countdown Timer
        </h1>
        {/* Input and set button container */}
        <div className="flex items-center mb-6">
          <Input
            type="number"
            id="duration"
            placeholder="Enter duration in seconds"
            value={duration}
            onChange={handleDurationChange}
            className="flex-1 mr-4 rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
          />
          <Button
            onClick={handleSetDuration}
            variant="outline"
            className="text-gray-800 dark:text-gray-200"
          >
            Set
          </Button>
        </div>
        {/* Display the formatted time left */}
        <div className="text-6xl font-bold text-gray-800 dark:text-gray-200 mb-8 text-center">
          {formatTime(timeLeft)}
        </div>
        {/* Buttons to start, pause, and reset the timer */}
        <div className="flex justify-center gap-4">
          <Button
            onClick={handleStart}
            variant="outline"
            className="text-gray-800 dark:text-gray-200"
          >
            {isPaused ? "Resume" : "Start"}
          </Button>
          <Button
            onClick={handlePause}
            variant="outline"
            className="text-gray-800 dark:text-gray-200"
          >
            Pause
          </Button>
          <Button
            onClick={handleReset}
            variant="outline"
            className="text-gray-800 dark:text-gray-200"
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
}