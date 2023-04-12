
const textarea = document.querySelector(".input");

textarea.addEventListener("input", () => {
  textarea.style.height = "auto";
  textarea.style.height = `${
    textarea.scrollHeight < 115 ? textarea.scrollHeight : 115
  }px`;
});

const chatLog = document.getElementById("chat-log");
const message = document.getElementById("message");
const form = document.querySelector("form");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const messageText = message.value;

  message.value = "";

  const messageElement = document.createElement("div");
  messageElement.classList.add("message");
  messageElement.classList.add("message--sent");
  messageElement.innerHTML = `
				<div class="message__text">${messageText}</div>
			`;
  chatLog.appendChild(messageElement);
  chatLog.scrollTop = chatLog.scrollHeight;
  await fetch("https://chatai-2-0.onrender.com/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: messageText,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      const messageElement = document.createElement("div");
      messageElement.classList.add("message");
      messageElement.classList.add("message--received");
      messageElement.innerHTML = `
					<div class="message__text">${data.information.content}</div>
				`;
      chatLog.appendChild(messageElement);
      chatLog.scrollTop = chatLog.scrollHeight;
    });
});