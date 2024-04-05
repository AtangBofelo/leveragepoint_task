class ChatModel {
    constructor() {
        this.messages = [];
    }

    addMessage(sender, message) {
        this.messages.push({ sender, message });
    }

    getMessages() {
        return this.messages;
    }
}
