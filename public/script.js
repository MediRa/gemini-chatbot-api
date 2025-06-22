const form = document.getElementById('chat-form');
const input = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');

form.addEventListener('submit', async function (e) {
  e.preventDefault();

  const userMessage = input.value.trim();
  if (!userMessage) return;

  // Display the user's message and clear the input
  appendMessage('user', userMessage);
  input.value = '';

  // Get the bot's response and display it
  const botMessage = await submitChatMessage(userMessage);
  appendMessage('bot', botMessage);
});

function appendMessage(sender, text) {
  const msg = document.createElement('div');
  msg.classList.add('message', sender);
  msg.textContent = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

async function submitChatMessage(message) {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.reply; // Assuming your backend returns a JSON with a "reply" field.
  } catch (error) {
    console.error('Error submitting chat message:', error);
    return 'Error: Could not get a response.'; // Handle errors gracefully.
  }
}
