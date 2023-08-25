const readline = require('readline');
const CharacterAI = require('node_characterai');
const characterAI = new CharacterAI();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

(async () => {
  await characterAI.authenticateAsGuest();

  const characterId = "YU_x3uvz4KYFJbVGDHIlmMcsEJp5y1VlKSsXmr1U79k"; // Discord moderator

  const chat = await characterAI.createOrContinueChat(characterId);

  rl.question('You: ', async (input) => {
    const response = await chat.sendAndAwaitResponse(input, true);
    console.log('AI:', response.text);
    
    rl.close();
  });
})();
