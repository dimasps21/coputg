// Инициализация приложения
document.addEventListener('DOMContentLoaded', () => {
    // Рендерим начальные чаты
    UI.renderChats();

    // Поиск
    document.getElementById('searchInput').addEventListener('input', (e) => {
        ui.showSearchResults(e.target.value);
    });

    // Обработка отправки сообщений
    document.getElementById('messageInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            const text = e.target.value.trim();
            if (text) {
                ChatManager.sendMessage(text);
                e.target.value = '';
            }
        }
    });

    document.getElementById('sendBtn').addEventListener('click', () => {
        const input = document.getElementById('messageInput');
        const text = input.value.trim();
        if (text) {
            ChatManager.sendMessage(text);
            input.value = '';
        }
    });

    // Overlay для мобильных
    document.querySelector('.overlay').addEventListener('click', () => {
        document.querySelector('.left-panel').classList.remove('open');
        document.querySelector('.overlay').classList.remove('active');
    });
});
