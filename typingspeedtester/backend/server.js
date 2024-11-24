// backend/server.js
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());

// Sample English sentences for different lengths
const texts = {
    short: [
        "The quick brown fox jumps over the lazy dog.",
        "Consistency is the key to improving typing speed.",
        "React is a JavaScript library for building user interfaces."
    ],
    medium: [
        "Typing fast and accurately is a valuable skill that improves productivity.",
        "Practice makes perfect, especially in typing, as you build muscle memory.",
        "JavaScript is one of the most popular programming languages in the world."
    ],
    long: [
        "Typing tests can help you measure your progress over time and improve your skills. Focus on accuracy first, and the speed will follow naturally. Remember that the journey to become proficient takes time and practice.",
        "Consistency is essential for achieving a high typing speed. Practice every day, and you’ll see gradual improvement. Typing accurately also enhances your coding skills and enables you to work more efficiently.",
        "Learning to type accurately is an invaluable skill. It helps in coding, writing, and general communication. Accuracy is more important than speed when starting, as it forms the basis for faster typing."
    ]
};

// Endpoint to get a random English sentence based on paragraph length
app.get('/random-text', (req, res) => {
    const { length } = req.query; // Retrieve length from query parameters
    const selectedTexts = texts[length] || texts.short; // Default to 'short' if no length specified
    const randomText = selectedTexts[Math.floor(Math.random() * selectedTexts.length)];
    res.json({ text: randomText });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Backend API running at http://localhost:${PORT}`);
});
