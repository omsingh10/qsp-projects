const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector("#send-btn");
const headerControls = document.querySelectorAll(".header-controls .material-symbols-outlined");
const refreshBtn = headerControls[0];
const expandBtn = headerControls[1];

let userMessage = null;
const inputInitHeight = chatInput.scrollHeight;

const welcomeMessageHTML = `
    <li class="chat incoming">
        <span class="material-symbols-outlined">auto_awesome</span>
        <div class="message-content">
            <p>Hello 👋<br>How can I help you today?</p>
            <div class="suggestions">
                <button class="suggestion-chip">I need help choosing the right hosting plan</button>
                <button class="suggestion-chip">I want to migrate to Hostinger</button>
                <button class="suggestion-chip">I want to create a website</button>
            </div>
        </div>
    </li>
`;

const responses = {
    greetings: [
        "Hello! 👋 Are you looking to bring your idea online, start a website, or explore hosting options today? If you've been waiting for the right moment, this is it—let's turn your one day into your day one of success! What kind of project or website do you have in mind?"
    ],
    howAreYou: [
        "I'm doing great, thanks for asking! How about you?",
        "I'm fine! Ready to help you with anything."
    ],
    help: [
        "Sure! I'm here to help. What do you need assistance with?",
        "Of course! Tell me what you're looking for."
    ],
    hosting: [
        "We offer various hosting plans! Would you like shared hosting, VPS, or cloud hosting?",
        "Great choice! Our hosting plans start at $2.99/month with 99.9% uptime guarantee."
    ],
    website: [
        "I can help you create a website! Do you want to use a website builder or WordPress?",
        "Creating a website is easy with us! We have drag-and-drop builders and one-click WordPress install."
    ],
    migrate: [
        "Migration is free! Our team will handle everything for you.",
        "We offer free website migration with zero downtime."
    ],
    pricing: [
        "Our plans are very affordable! Basic starts at $2.99/month, Premium at $6.99/month.",
        "Would you like me to show you our pricing comparison?"
    ],
    thanks: [
        "You're welcome! 😊",
        "Happy to help!",
        "Anytime! Let me know if you need anything else."
    ],
    bye: [
        "Goodbye! Have a great day! 👋",
        "See you later! Take care!",
        "Bye! Come back anytime!"
    ],
    default: [
        "That's interesting! Tell me more.",
        "I understand. How can I assist you further?",
        "Got it! Is there anything specific you'd like to know?",
        "Thanks for sharing! What else can I help you with?",
        "I'm here to help! Feel free to ask me anything."
    ]
};

const getRandomResponse = (responseArray) => {
    return responseArray[Math.floor(Math.random() * responseArray.length)];
};

const getResponse = (message) => {
    const lowerMsg = message.toLowerCase();
    
    if (lowerMsg.match(/\b(hi|hello|hey|greetings)\b/)) {
        return getRandomResponse(responses.greetings);
    }
    if (lowerMsg.match(/\b(how are you|how's it going|what's up)\b/)) {
        return getRandomResponse(responses.howAreYou);
    }
    if (lowerMsg.match(/\b(help|support|assist)\b/)) {
        return getRandomResponse(responses.help);
    }
    if (lowerMsg.match(/\b(hosting|host|server)\b/)) {
        return getRandomResponse(responses.hosting);
    }
    if (lowerMsg.match(/\b(website|site|web|create)\b/)) {
        return getRandomResponse(responses.website);
    }
    if (lowerMsg.match(/\b(migrate|migration|transfer|move)\b/)) {
        return getRandomResponse(responses.migrate);
    }
    if (lowerMsg.match(/\b(price|pricing|cost|plan|plans)\b/)) {
        return getRandomResponse(responses.pricing);
    }
    if (lowerMsg.match(/\b(thanks|thank you|thx)\b/)) {
        return getRandomResponse(responses.thanks);
    }
    if (lowerMsg.match(/\b(bye|goodbye|see you|later)\b/)) {
        return getRandomResponse(responses.bye);
    }
    
    return getRandomResponse(responses.default);
};

const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    const chatContent = className === "outgoing" 
        ? `<p></p>` 
        : `<span class="material-symbols-outlined">auto_awesome</span>
           <div class="message-content">
               <p></p>
               <div class="feedback-buttons">
                   <button class="feedback-btn" title="Good response">👍</button>
                   <button class="feedback-btn" title="Bad response">👎</button>
               </div>
           </div>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi;
};

const generateBotResponse = (message) => {
    const botResponse = getResponse(message);
    const incomingChatLi = createChatLi(botResponse, "incoming");
    chatbox.appendChild(incomingChatLi);
    chatbox.scrollTo(0, chatbox.scrollHeight);
};

const handleChat = () => {
    userMessage = chatInput.value.trim();
    if (!userMessage) return;

    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`;

    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);

    setTimeout(() => generateBotResponse(userMessage), 600);
};

const handleSuggestionClick = (e) => {
    if (e.target.classList.contains("suggestion-chip")) {
        const suggestionText = e.target.textContent.trim();
        userMessage = suggestionText;
        
        chatbox.appendChild(createChatLi(suggestionText, "outgoing"));
        chatbox.scrollTo(0, chatbox.scrollHeight);
        
        setTimeout(() => generateBotResponse(suggestionText), 600);
    }
};

const resetChat = () => {
    chatbox.innerHTML = welcomeMessageHTML;
    chatbox.scrollTo(0, 0);
};

const toggleFullscreen = () => {
    const chatbotElement = document.querySelector(".chatbot");
    chatbotElement.classList.toggle("fullscreen");
};

chatInput.addEventListener("input", () => {
    chatInput.style.height = `${inputInitHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
        handleChat();
    }
});

sendChatBtn.addEventListener("click", handleChat);
closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
refreshBtn.addEventListener("click", resetChat);
expandBtn.addEventListener("click", toggleFullscreen);
chatbox.addEventListener("click", handleSuggestionClick);
