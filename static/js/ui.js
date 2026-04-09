class UI {
    constructor() {
        this.initEventListeners();
    }

    initEventListeners() {
        document.getElementById('menuBtn').addEventListener('click', () => {
            document.querySelector('.left-panel').classList.toggle('open');
            document.querySelector('.overlay').classList.toggle('active');
        });

        document.getElementById('newChatBtn').addEventListener('click', () => {
            this.showNewChatModal();
        });

        document.getElementById('cancelNewChat').addEventListener('click', () => {
            this.hideNewChatModal();
        });

        document.getElementById('createNewChat').addEventListener('click', () => {
            const name = document.getElementById('newChatName').value.trim();
            if (name) {
                store.addChat(name);
                UI.renderChats();
                this.hideNewChatModal();
            }
        });
    }

    static renderChats() {
        const chatsList = document.getElementById('chatsList');
        chatsList.innerHTML = store.getChats().map(chat => `
            <div class="chat-item ${store.currentChatId === chat.id ? 'active' : ''}" 
                 data-chat-id="${chat.id}">
                <div class="chat-avatar">${chat.avatar}</div>
                <div class="chat-info">
                    <div class="chat-name">${chat.name}</div>
                    <div class="chat-preview">${chat.lastMessage}</div>
                </div>
                <div class="chat-meta">
                    <div class="chat-time">${chat.time}</div>
                    ${chat.unread > 0 ? `<div class="unread-badge">${chat.unread}</div>` : ''}
                </div>
            </div>
        `).join('');

        // Добавляем обработчики для чатов
        document.querySelectorAll('.chat-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const chatId = parseInt(e.currentTarget.dataset.chatId);
                ChatManager.openChat(chatId);
            });
        });
    }

    showNewChatModal() {
        document.getElementById('newChatModal').classList.add('active');
        document.getElementById('newChatName').focus();
    }

    hideNewChatModal() {
        document.getElementById('newChatModal').classList.remove('active');
        document.getElementById('newChatName').value = '';
    }

    showSearchResults(query) {
        // Имплементация поиска
        const filteredChats = store.getChats().filter(chat => 
            chat.name.toLowerCase().includes(query.toLowerCase())
        );
        // Здесь можно рендерить результаты поиска
    }
}

const ui = new UI();
