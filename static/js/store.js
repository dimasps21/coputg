class Store {
    constructor() {
        this.chats = JSON.parse(localStorage.getItem('telegram_chats')) || this.getDemoChats();
        this.currentChatId = null;
        this.save();
    }

    getDemoChats() {
        return [
            {
                id: 1,
                name: 'Иван Петров',
                avatar: 'ИП',
                lastMessage: 'Привет! Как дела?',
                time: '14:30',
                unread: 3,
                messages: [
                    {id: 1, text: 'Привет!', time: '14:25', own: false},
                    {id: 2, text: 'Привет! Как дела?', time: '14:26', own: true},
                    {id: 3, text: 'Всё отлично, спасибо!', time: '14:28', own: false}
                ]
            },
            {
                id: 2,
                name: 'Рабочая группа',
                avatar: '📋',
                lastMessage: 'Завтра дедлайн по проекту',
                time: '13:45',
                unread: 12,
                messages: []
            },
            {
                id: 3,
                name: 'Мария Смирнова',
                avatar: 'МС',
                lastMessage: 'Отправил фото',
                time: '12:10',
                unread: 0,
                messages: []
            }
        ];
    }

    getChats() {
        return this.chats;
    }

    getChat(id) {
        return this.chats.find(chat => chat.id === id);
    }

    addChat(name) {
        const newChat = {
            id: Date.now(),
            name,
            avatar: name.slice(0, 2).toUpperCase(),
            lastMessage: '',
            time: '',
            unread: 0,
            messages: []
        };
        this.chats.unshift(newChat);
        this.save();
        return newChat;
    }

    addMessage(chatId, text, own = true) {
        const chat = this.getChat(chatId);
        if (!chat) return;

        const message = {
            id: Date.now(),
            text,
            time: new Date().toLocaleTimeString('ru-RU', {hour: '2-digit', minute: '2-digit'}),
            own
        };

        chat.messages.push(message);
        chat.lastMessage = text;
        chat.time = message.time;
        if (own) {
            chat.unread = 0;
        } else {
            chat.unread++;
        }

        this.save();
    }

    save() {
        localStorage.setItem('telegram_chats', JSON.stringify(this.chats));
    }
}

const store = new Store();
