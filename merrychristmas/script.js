const messages = ["OH OH OH", "Happy Holidays!", "By Pusit"];
let currentMessageIndex = 0;

function updateMessage() {
    const messageElement = document.getElementById("message");
    messageElement.textContent = messages[currentMessageIndex];
    currentMessageIndex = (currentMessageIndex + 1) % messages.length;
}

setInterval(updateMessage, 3000); // Change message every 2 seconds
updateMessage(); // Initialize the first message


// Redirect to the specified page after 5 seconds
setTimeout(function () {
    window.location.href = "C:/Users/PUSITCH/Desktop/web/merrychristmas/merry/merry.html";
}, 20000);