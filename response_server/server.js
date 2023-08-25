const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors middleware
const CharacterAI = require('node_characterai');
const characterAI = new CharacterAI();

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors()); // Use the cors middleware

// Your existing route for handling user input
app.post('/', async (req, res) => {
    console.log("helloooo")
  try {
    const { input } = req.body;
    try{
        await characterAI.authenticateWithToken("4a4af96d5d92c581ae6b0d61d2247d474a699faf");
    }catch(error){
        console.log("Already authenticated");
    }

    const characterId = "YU_x3uvz4KYFJbVGDHIlmMcsEJp5y1VlKSsXmr1U79k"; // Discord moderator
    const chat = await characterAI.createOrContinueChat(characterId);

    const response = await chat.sendAndAwaitResponse(input, true);
    res.json({ aiResponse: response.text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
