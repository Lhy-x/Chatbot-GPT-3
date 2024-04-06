let conversation = [
    {
        role: "system",
        content:
            "Your instructions and settings here",
    },
];


// Function to handle user input and interact with the chatbot
async function sendPrompt() {
    const promptInput = document.getElementById("prompt");
    const prompt = promptInput.value.trim();

    if (prompt !== "") {
        // Add user's input to the conversation
        conversation.push({ role: "user", content: prompt });

        try {
            // Add thinking message while waiting for the AI response
            addMessage("thinking", "Please wait while I process your request");

            // Make a POST request to the OpenAI API for chat completions
            const xhr = new XMLHttpRequest();
            xhr.open("POST", "https://api.openai.com/v1/chat/completions", true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.setRequestHeader(
                "Authorization",
                "Bearer Your PrivateAPIKey here"
            );

            xhr.onreadystatechange = function () {
                if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                    // Parse the API response and extract the assistant's message
                    const apiResponse = JSON.parse(xhr.responseText);
                    const aiMessage = apiResponse.choices[0].message.content;

                    // Add assistant's message to the conversation
                    conversation.push({
                        role: "assistant",
                        content: aiMessage,
                    });

                    // Remove thinking message from the chat
                    const thinkingMessage = document.getElementsByClassName("thinking")[0];
                    thinkingMessage.parentNode.removeChild(thinkingMessage);

                    // Append the AI's message to the chat container
                    addMessage("received", aiMessage);
                }
            };

            // Send the conversation to the OpenAI API for processing
            xhr.send(
                JSON.stringify({
                    model: "gpt-3.5-turbo",
                    messages: conversation,
                    max_tokens: 1024,
                    temperature: 0.1,
                    top_p: 1,
                    frequency_penalty: 0,
                    presence_penalty: 0.5,
                })
            );

            // Append the user's message to the chat container
            addMessage("sent", prompt);

            // Clear the input box after sending the message
            promptInput.value = "";
        } catch (error) {
            console.error("Error in sendPrompt:", error);
        }
    }
}

// Function to dynamically add messages to the chat container
function addMessage(type, text) {
    // Create message container with appropriate styling
    const messageContainer = document.createElement("div");
    messageContainer.classList.add(type);
    messageContainer.classList.add("message");

    // Create sender's name and message body elements
    const senderName = document.createElement("h6");
    senderName.classList.add("mb-1");
    senderName.classList.add("bot-title");
    senderName.innerText = "";
    senderName.style.marginLeft = type == "received" ? "60px !important" : "0";

    const messageBody = document.createElement("div");
    messageBody.classList.add(type == "received" ? "received_withd_msg" : "sent_msg");

    // Create paragraph element for the message text
    const messageText = document.createElement("p");
    messageText.innerText = text;

    // Append elements to construct the message structure
    messageBody.appendChild(messageText);

    const imageTextContainer = document.createElement("div");
    imageTextContainer.classList.add("imageText");

    // Add chatbot image to received messages
    if (type == "received") {
        const imageContainer = document.createElement("div");
        imageContainer.classList.add("incoming_msg_img");

        const image = document.createElement("img");
        image.src = "./assets/chatbot.png";
        image.alt = "agentpic";

        imageContainer.appendChild(image);
        imageTextContainer.appendChild(imageContainer);
    }

    imageTextContainer.appendChild(messageBody);

    messageContainer.appendChild(senderName);
    messageContainer.appendChild(imageTextContainer);

    // Append the message container to the chat body
    document.getElementById("chat-body").appendChild(messageContainer);

    // Scroll to the bottom of the chat for the latest messages
    scrollToBottom();
}

// Function to scroll to the bottom of the chat
function scrollToBottom() {
    const chatBody = document.getElementById("chat-body");
    chatBody.scrollTop = chatBody.scrollHeight;
}

// Event listeners for sending prompts on button click and Enter key press
document.getElementById("send-button").addEventListener("click", sendPrompt);

document.getElementById("prompt").addEventListener("keyup", function (event) {
    if (event.keyCode === 13 && !event.shiftKey) {
        event.preventDefault();
        sendPrompt();
    }
});

// Function to reset the chat by clearing the chat body
function resetChat() {
    document.getElementById("chat-body").innerHTML = "";
}
