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
        // await characterAI.authenticateWithToken("4a4af96d5d92c581ae6b0d61d2247d474a699faf");
        await characterAI.authenticateAsGuest();
    }catch(error){
        console.log("Already authenticated");
    }

    const negative_depressed = "YU_x3uvz4KYFJbVGDHIlmMcsEJp5y1VlKSsXmr1U79k"; // Discord moderator
    const  positive_happy= "B_5Zx5zs_4-EKZKMTiK0yCvWg9pQwZuPKo08b0hbxQQ"; // Discord moderator
    const  mildly_positive= "ST44qsH1FGEQnrnHCTwIK64NdMrSEFsYUfU_OcEKX8g"; // Discord moderator
    const  mildly_negative= "uaorvJTzWoiC1xGqCzD0RGR9Whex4Wn5HSxBsG4amwM"; // Discord moderator

    const chat = await characterAI.createOrContinueChat(positive_happy);

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
