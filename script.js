document.addEventListener('DOMContentLoaded', function () {
    const chatBox = document.getElementById('chat-box');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');

    sendButton.addEventListener('click', sendMessage);
    userInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });

function toggleTyping(){
    const status = document.getElementById('status');
    if(status.innerHTML == "Reveille is Online"){
        status.innerHTML = "typing..."
    }
    else{
        status.innerHTML = "Reveille is Online"
    }
}


    async function sendMessage() {
        const userMessage = userInput.value.trim();

        if (userMessage !== '') {
            // Simulate sending user message to API (replace with actual API call)
            

            // Display user message in the chat
            displayMessage('user', userMessage);
            try{
                toggleTyping()
                const response = await simulateApiCall(userMessage);
                displayMessage('bot', response);
            } catch (error) {
                console.error('API call failed:', error.message);
                // Handle error gracefully
                displayMessage('bot', 'Error: Unable to fetch response from API.');
            }
            toggleTyping()
            // Clear the input field
            userInput.value = '';
        }
    }

    async function simulateApiCall(userMessage) {

        let userMessageJSON = {'message': userMessage}

        console.log(userMessageJSON)

        var myHeaders = new Headers();
        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: userMessage,
            redirect: 'follow'
        };

        await fetch('https://oxq73twtxno5nj4rgx3imivksa0odnqc.lambda-url.us-east-2.on.aws/', 
                    requestOptions)
        .then(response => response.text())
        .then(result => displayMessage('bot', result))
        .catch(error => console.log('error', error))


        
    }

    function displayMessage(sender, message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        messageDiv.textContent = message;
    
        // Append the new message at the end of the chat box
        chatBox.appendChild(messageDiv);
    
        // Scroll to the bottom to show the latest message
        chatBox.scrollTop = chatBox.scrollHeight;
    
        // If the sender is 'user', position the message to the bottom right
        if (sender === 'user') {
            messageDiv.classList.add('user-message');
        }
    }

    // Scroll to the bottom initially
    chatBox.scrollTop = chatBox.scrollHeight;
});
