const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors middleware
const CharacterAI = require('node_characterai');
const characterAI = new CharacterAI();
const MoodDetector = require("./MoodDetector");
const updater = new MoodDetector();
const axios = require("axios");
let num = 0;

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors()); // Use the cors middleware

const negative_depressed = "YU_x3uvz4KYFJbVGDHIlmMcsEJp5y1VlKSsXmr1U79k";
const positive_happy = "B_5Zx5zs_4-EKZKMTiK0yCvWg9pQwZuPKo08b0hbxQQ";
const mildly_positive = "ST44qsH1FGEQnrnHCTwIK64NdMrSEFsYUfU_OcEKX8g";
const mildly_negative = "uaorvJTzWoiC1xGqCzD0RGR9Whex4Wn5HSxBsG4amwM";
var dominant_emotion = mildly_positive;
axios.defaults.headers.post['Authorization'] = "Bearer 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";

const emotionCategories = {
    mildPositive: new Set(["approval", "approval", "caring", "curiosity", "optimism", "pride", "realization", "relief", "remorse", "surprise", "neutral"]),
    positive: new Set( ["admiration", "amusement", "desire", "excitement", "gratitude", "joy", "love"]),
    mildNegative: new Set(["annoyance", "confusion", "disapproval", "embarrassment", "nervousness"]),
    negative: new Set(["anger", "disappointment", "disgust", "fear", "grief", "sadness"])
};

async function handleRequest(req, res) {
    try {
        const { input } = req.body;

        if (!characterAI.isAuthenticated()) {
            await characterAI.authenticateAsGuest();
        }

        const apiRequest = axios.post("https://api-inference.huggingface.co/models/SamLowe/roberta-base-go_emotions", {
            text: input
        });

        const chatRequest = characterAI.createOrContinueChat(dominant_emotion);

        const [apiResponse, chat] = await Promise.all([apiRequest, chatRequest]);

        const scores = {};
        for (const data of apiResponse.data) {
            scores[data.label] = data.score;
        }
        updater.updateScores(scores);

        const dominant = updater.get_dominant_emotion();
        if (num % 3 === 0) {
            if (emotionCategories.mildPositive.has(dominant)) {
                dominant_emotion = mildly_positive;
                console.log("Changing to mildly positive")
            } else if (emotionCategories.positive.has(dominant)) {
                dominant_emotion = positive_happy;
                console.log("Changing to positive happy")
            } else if (emotionCategories.mildNegative.has(dominant)) {
                dominant_emotion = mildly_negative;
                console.log("Changing to mildly negative")
            } else if (emotionCategories.negative.has(dominant)) {
                dominant_emotion = negative_depressed;
                console.log("Changing to negative depressed")
            }
            num = 0;
        }
        num += 1;

        const response = await chat.sendAndAwaitResponse(input, true);
        res.json({ aiResponse: response.text });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred' });
    }
}

app.post('/', handleRequest);

// ... (app.listen)


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
