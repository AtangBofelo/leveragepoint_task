class ChatController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.llavaEndpoint = "https://148ftvxv-11434.uks1.devtunnels.ms/api/chat";

        
    }

    showChatHistory() {
        this.view.showChatHistory();
    }

    async sendMessageToLlava(messages) {
        try {
            this.view.displayLoadingIndicator();
    
            const response = await fetch(this.llavaEndpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    model: "llava", // llava model
                    stream: false,
                    messages: messages
                })
            });
            
            if (!response.ok) {
                throw new Error("Failed to send message to Llava.");
            }
            
            const responseData = await response.json();
            const botMessage = responseData.message.content;
            

            this.model.addMessage("bot", botMessage);
            this.updateChat();
        } catch (error) {
            console.error("Error sending message to Llava:", error);
        } finally {
            this.view.removeLoadingIndicator();
        }
    }
    
    

    sendMessage() {
        const userInput = this.view.userInput.value.trim(); // Trim whitespace from the input
        if (userInput === "") {
            // If the input is empty, return without sending the message
            return;
        }
    
        // Display the user message immediately
        this.model.addMessage("user", userInput);
        this.view.displayMessage("user", userInput);
        this.view.clearInput(); // Clear the input field
    
        // Construct messages to send to the API
        const messages = this.model.getMessages().map(({ sender, message }) => {
            return {
                role: sender,
                content: message,
                images: []
            };
        });
    
        // Send the message to the API
        this.sendMessageToLlava(messages);
    }
    


    updateChat() {
        this.view.chatBox.innerHTML = ""; // Clear chat box
        const messages = this.model.getMessages();
        messages.forEach(({ sender, message }) => {
            this.view.displayMessage(sender, message);
        });
    }
}
