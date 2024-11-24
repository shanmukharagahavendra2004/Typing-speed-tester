// src/components/TypingSpeedTest.js
import React, { useState, useEffect } from 'react';


function TypingSpeedTest() {
    const [text, setText] = useState('');
    const [userInput, setUserInput] = useState('');
    const [timeLeft, setTimeLeft] = useState(60);
    const [selectedTime, setSelectedTime] = useState(60); // Default time
    const [mistakes, setMistakes] = useState(0);
    const [wpm, setWpm] = useState(0);
    const [cpm, setCpm] = useState(0);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        fetchRandomText();
    }, []);

    // Fetch random text for the test
    const fetchRandomText = async () => {
        try {
            const response = await fetch('http://localhost:5000/random-text?length=medium');
            const data = await response.json();
            setText(data.text);
            resetTest();
        } catch (error) {
            console.error('Failed to fetch text:', error);
        }
    };

    // Reset the test to initial state
    const resetTest = () => {
        setUserInput('');
        setTimeLeft(selectedTime);
        setMistakes(0);
        setWpm(0);
        setCpm(0);
        setIsActive(false);
    };

    // Start the test
    const startTest = () => {
        setIsActive(true);
    };

    // Update user input and calculate mistakes
    const handleInputChange = (e) => {
        const value = e.target.value;
        setUserInput(value);

        const currentText = text.slice(0, value.length);
        const mistakesCount = value.split('').reduce((acc, char, index) => {
            return acc + (char !== currentText[index] ? 1 : 0);
        }, 0);
        setMistakes(mistakesCount);

        // Calculate WPM and CPM
        const wordsTyped = value.trim().split(' ').length;
        setWpm(((wordsTyped / (selectedTime - timeLeft)) * 60).toFixed(2));
        setCpm((value.length / (selectedTime - timeLeft) * 60).toFixed(2));
    };

    // Timer countdown
    useEffect(() => {
        let timer;
        if (isActive && timeLeft > 0) {
            timer = setInterval(() => setTimeLeft((prevTime) => prevTime - 1), 1000);
        } else if (timeLeft === 0) {
            setIsActive(false);
        }
        return () => clearInterval(timer);
    }, [isActive, timeLeft]);

    return (
        <div className="typing-speed-test">
       

            <div className="text-box">
                <p>{text}</p>
            </div>

            <textarea
                value={userInput}
                onChange={handleInputChange}
                disabled={!isActive || timeLeft === 0}
                placeholder="Start typing here..."
            />

            <div className="stats">
                <p>Time Left: {timeLeft}s</p>
                <p>Mistakes: {mistakes}</p>
                <p>WPM: {wpm}</p>
                <p>CPM: {cpm}</p>
            </div>

            <button onClick={startTest} disabled={isActive}>
                Start Test
            </button>
            <button onClick={fetchRandomText}>Try Again</button>
        </div>
    );
}

export default TypingSpeedTest;
