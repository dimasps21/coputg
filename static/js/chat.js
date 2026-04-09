class ChatManager {
    static openChat(chatId) {
        store.currentChatId = chatId;
        UI.renderChats();

        const chat = store.getChat(chatId);
        if (!chat) return;

        // Показываем чат интерфейс
        document.getElementById('profilePlaceholder').style.display = 'none';
        document.getElementById('chatPlaceholder').style.display = 'flex';

        this.renderChatHeader(chat);
        this.renderMessages(chat);

        // Прокручиваем вниз
        const messagesContainer = document.querySelector('.chat-messages');
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    static renderChatHeader(chat) {
        const header = document.getElementById('chatHeader');
        header.innerHTML = `
            <div class="chat-avatar">${chat.avatar}</div>
            <div class="chat-name">${chat.name}</div>
        `;
    }

    static renderMessages(chat) {
        const container = document.getElementById('chatMessages');
        container.innerHTML = chat.messages.map(msg => `
            <div class="message ${msg.own ? 'own' : ''}">
                <div class="message-bubble ${msg.own ? '' : 'other'}">
                    ${msg.text}
                    <div class="message-time">${msg.time}</div>
                </div>
            </div>
        `).join('');
    }

    static sendMessage(text) {
        if (!store.currentChatId) return;

        store.addMessage(store.currentChatId, text, true);
        this.renderMessages(store.getChat(store.currentChatId));

        // Имитация ответа через 1-2 секунды
        setTimeout(() => {
            const responses = [
                'Понял!', 'Окей!', 'Хорошо!', 'Спасибо!', 'Конечно!',
                'Согласен!', 'Отлично!', 'Договорились!'
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            store.addMessage(store.currentChatId, randomResponse, false);
            this.renderMessages(store.getChat(store.currentChatId));
        }, 1000 + Math.random() * 1000);
    }
}
