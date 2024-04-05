class ChatView {
    constructor() {
        this.chatBox = document.getElementById("chat-box");
        this.userInput = document.getElementById("user-input");
        this.historyButton = document.getElementById("history-btn");
        this.historyButton.addEventListener("click", this.showChatHistory.bind(this));
    }

    showChatHistory() {

        const allMessages = controller.model.getMessages();


        // Check if there are any messages to display
        if (allMessages.length === 0) {
            alert("No chat history available.");
            return;
        }
        const popup = document.createElement("div");
        popup.classList.add("chat-history-popup");

        const closeButton = document.createElement("button");
        closeButton.textContent = "Close";
        closeButton.addEventListener("click", () => {
            popup.remove();
        });
        popup.appendChild(closeButton);

        const historyContainer = document.createElement("div");
        historyContainer.classList.add("chat-history-container");

        allMessages.forEach(({ sender, message }) => {
            const messageElement = document.createElement("div");
            messageElement.classList.add("chat-message");
            messageElement.textContent = `${sender}: ${message}`;
            historyContainer.appendChild(messageElement);
        });

        popup.appendChild(historyContainer);

        document.body.appendChild(popup);
    }

    clearInput() {
        this.userInput.value = "";
    }

    displayMessage(sender, message) {
        const messageContainer = document.createElement("div");
        messageContainer.classList.add("chat-message");
        messageContainer.classList.add(sender + "-message");
        messageContainer.textContent = message;
        this.chatBox.appendChild(messageContainer);
        this.chatBox.scrollTop = this.chatBox.scrollHeight;
    }


    displayLoadingIndicator() {
        const loadingMessage = "Loading...";
        this.displayMessage("bot", loadingMessage);
    }

    removeLoadingIndicator() {
        const loadingMessage = "Loading...";
        const chatMessages = this.chatBox.querySelectorAll(".bot-message");
        chatMessages.forEach(message => {
            if (message.textContent.includes(loadingMessage)) {
                message.remove();
            }
        });
    }
    
}
