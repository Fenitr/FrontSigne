document.addEventListener('DOMContentLoaded', () => {
    const chatBox = document.getElementById('chat-box');
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');

    const appendMessage = (message, sender) => {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', sender);
        messageDiv.textContent = message;
        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    };

    const sendMessage = async () => {
        const message = messageInput.value.trim();
        if (message === '') return;

        appendMessage(message, 'user');
        messageInput.value = '';

        try {
            const response = await fetch('https://a1d8-41-207-42-164.ngrok-free.app/?fbclid=IwY2xjawFPbEBleHRuA2FlbQIxMAABHTLCcOgQpg6L-diqQJSiBAg4XU0JNs58bx87wkP-ZoTyLGp0Nn4zNRgdCQ_aem_tj6bDcY_klTbZYAnzJaqSA', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: message })
            });
            const data = await response.json();
            appendMessage(data.response, 'bot');
        } catch (error) {
            console.error('Error:', error);
            appendMessage('Sorry, something went wrong. Please try again.', 'bot');
        }
    };

    sendButton.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            sendMessage();
        }
    });
});
