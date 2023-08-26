class MoodDetector {
    constructor() {
        this.emotions = [
            "admiration", "amusement", "anger", "annoyance", "approval", "caring",
            "confusion", "curiosity", "desire", "disappointment", "disapproval", "disgust",
            "embarrassment", "excitement", "fear", "gratitude", "grief", "joy", "love",
            "nervousness", "optimism", "pride", "realization", "relief", "remorse",
            "sadness", "surprise", "neutral"
        ];
        this.weights = {
            "admiration": 0.6,
            "amusement": 0.7,
            "anger": 0.5,
            "annoyance": 0.4,
            "approval": 0.6,
            "caring": 0.4,
            "confusion": 0.2,
            "curiosity": 0.5,
            "desire": 0.6,
            "disappointment": 0.6,
            "disapproval": 0.5,
            "disgust": 0.7,
            "embarrassment": 0.3,
            "excitement": 0.8,
            "fear": 0.8,
            "gratitude": 0.7,
            "grief": 0.7,
            "joy": 0.9,
            "love": 0.9,
            "nervousness": 0.7,
            "optimism": 0.6,
            "pride": 0.7,
            "realization": 0.4,
            "relief": 0.5,
            "remorse": 0.3,
            "sadness": 0.9,
            "surprise": 0.4,
            "neutral": 0.0
        };
        this.scores = {
            "admiration": 0.5,
            "amusement": 0.5,
            "anger": 0.5,
            "annoyance": 0.5,
            "approval": 0.5,
            "caring": 0.5,
            "confusion": 0.5,
            "curiosity": 0.5,
            "desire": 0.5,
            "disappointment": 0.5,
            "disapproval": 0.5,
            "disgust": 0.5,
            "embarrassment": 0.5,
            "excitement": 0.5,
            "fear": 0.5,
            "gratitude": 0.5,
            "grief": 0.5,
            "joy": 0.5,
            "love": 0.5,
            "nervousness": 0.5,
            "optimism": 0.5,
            "pride": 0.5,
            "realization": 0.5,
            "relief": 0.5,
            "remorse": 0.5,
            "sadness": 0.5,
            "surprise": 0.5,
            "neutral": 0.5
        };

        this.decayFactor = 0.05;
    }

    updateScores(sentiment_scores) {
        // console.log(this. .emotions.length);
        var i = 0;
        // console.log(this.scores["joy"], this.scores["sadness"]);
        for (i = 0; i < this.emotions.length; i++) {
            var emotion = this.emotions[i];
            var score = sentiment_scores[emotion];
            score *= this.weights[emotion];
            this.scores[emotion] = this.scores[emotion] * (1 - this.decayFactor) + score * this.decayFactor;
        }
        // console.log(this.scores["joy"], this.scores["sadness"]);
    }

    get_dominant_emotion() {
        var obj = this.scores;
        // console.log(this.scores["sadness"]);
        return Object.keys(obj).reduce((a, b) => obj[a] > obj[b] ? a : b);
    }

    printScores() {
        console.log(this.weights);
    }
}

module.exports = MoodDetector;