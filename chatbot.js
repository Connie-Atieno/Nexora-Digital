const chatBox = document.getElementById('chat-box');
const chatInput = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-btn');

sendBtn.addEventListener('click', async () => {
  const userMessage = chatInput.value.trim();
  if (!userMessage) return;

  addMessage('You', userMessage);
  chatInput.value = '';

  try {
    const response = await fetch('https://nexora-bot-0a6h.onrender.com/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userMessage })
    });

    const data = await response.json();
    addMessage('NexoraBot', data.reply || 'No response from the bot.');
  } catch (error) {
    addMessage('NexoraBot', 'Sorry, there was a problem.');
  }
});

function addMessage(sender, text) {
  const msg = document.createElement('div');
  msg.innerHTML = `<strong>${sender}:</strong> ${text}`;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}
