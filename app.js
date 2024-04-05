const model = new ChatModel();
const view = new ChatView();
const controller = new ChatController(model, view);

document.getElementById("send-btn").addEventListener("click", () => {
    controller.sendMessage();
});