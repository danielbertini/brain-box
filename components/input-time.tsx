/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MinusIcon, PlusIcon } from "lucide-react";

interface InputTimeProps {
  duration: {
    minutes: string;
    seconds: string;
  };
  result: (value: any) => void;
}

const InputTime: React.FC<InputTimeProps> = ({ duration, result }) => {
  const [time, setTime] = useState({
    minutes: Number(duration.minutes),
    seconds: Number(duration.seconds),
  });
  const [isIncrementing, setIsIncrementing] = useState(false);
  const [isDecrementing, setIsDecrementing] = useState(false);
  const [isSecondsIncrementing, setIsSecondsIncrementing] = useState(false);
  const [isSecondsDecrementing, setIsSecondsDecrementing] = useState(false);

  useEffect(() => {
    let incrementInterval: NodeJS.Timeout | undefined,
      decrementInterval: NodeJS.Timeout | undefined,
      secondsIncrementInterval: NodeJS.Timeout | undefined,
      secondsDecrementInterval: NodeJS.Timeout | undefined;

    if (isIncrementing) {
      incrementInterval = setInterval(() => {
        setTime((prevTime) => ({
          minutes:
            prevTime.minutes < 59 ? prevTime.minutes + 1 : prevTime.minutes,
          seconds: prevTime.seconds,
        }));
      }, 100);
    }
    if (isDecrementing) {
      decrementInterval = setInterval(() => {
        setTime((prevTime) => ({
          minutes:
            prevTime.minutes > 0 ? prevTime.minutes - 1 : prevTime.minutes,
          seconds: prevTime.seconds,
        }));
      }, 100);
    }
    if (isSecondsIncrementing) {
      secondsIncrementInterval = setInterval(() => {
        setTime((prevTime) => ({
          minutes:
            prevTime.seconds === 59 ? prevTime.minutes + 1 : prevTime.minutes,
          seconds: prevTime.seconds < 59 ? prevTime.seconds + 1 : 0,
        }));
      }, 100);
    }
    if (isSecondsDecrementing) {
      secondsDecrementInterval = setInterval(() => {
        setTime((prevTime) => ({
          minutes:
            prevTime.seconds === 0
              ? prevTime.minutes > 0
                ? prevTime.minutes - 1
                : prevTime.minutes
              : prevTime.minutes,
          seconds: prevTime.seconds > 0 ? prevTime.seconds - 1 : 59,
        }));
      }, 100);
    }
    return () => {
      clearInterval(incrementInterval);
      clearInterval(decrementInterval);
      clearInterval(secondsIncrementInterval);
      clearInterval(secondsDecrementInterval);
    };
  }, [
    isIncrementing,
    isDecrementing,
    isSecondsIncrementing,
    isSecondsDecrementing,
  ]);
  const handleSecondsIncrement = () => {
    setIsSecondsIncrementing(true);
  };
  const handleSecondsDecrement = () => {
    setIsSecondsDecrementing(true);
  };
  const handleMouseUp = () => {
    setIsIncrementing(false);
    setIsDecrementing(false);
    setIsSecondsIncrementing(false);
    setIsSecondsDecrementing(false);
  };
  const formatTime = (value: any) => {
    var formated = value.toString().padStart(2, "0");
    return formated;
  };
  useEffect(() => {
    const { minutes, seconds } = time;
    result({
      minutes: Number(minutes),
      seconds: Number(seconds),
    });
  }, [time]);
  return (
    <div className="w-full flex flex-row gap-2 items-center justify-end">
      <div className="flex items-center justify-center font-mono text-base">
        {formatTime(time.minutes)}:{formatTime(time.seconds)}
      </div>
      <div className="flex items-center justify-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="icon"
          onMouseDown={handleSecondsDecrement}
          onMouseUp={handleMouseUp}
          onTouchStart={handleSecondsDecrement}
          onTouchEnd={handleMouseUp}>
          <MinusIcon className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon"
          onMouseDown={handleSecondsIncrement}
          onMouseUp={handleMouseUp}
          onTouchStart={handleSecondsIncrement}
          onTouchEnd={handleMouseUp}>
          <PlusIcon className="w-4 h-4" />
          <span className="sr-only">Increment seconds</span>
        </Button>
      </div>
    </div>
  );
};

export default InputTime;
