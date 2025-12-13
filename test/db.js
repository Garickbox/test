// ====================================================================
// ДЕБАГ-ТЕСТ ДЛЯ СИСТЕМЫ ТЕСТИРОВАНИЯ ВЫСОКОВСКОЙ ШКОЛЫ №25
// Файл: test/debug.js
// Назначение: Отладочный тест для проверки работы системы
// Особенность: Интегрировано окно для тестирования Telegram
// Для запуска: введите "debug" на главной странице
// ====================================================================

console.log('🔍 DEBUG MODE: Загрузка отладочного теста...');

// ОБЩАЯ ИНФОРМАЦИЯ О ПРОЕКТЕ
window.PROJECT_INFO = {
    name: "Система тестирования Высоковской школы №25",
    version: "7.2",
    author: "Школьный IT-отдел",
    description: "Модульная система для проведения контрольных работ с античит-системой и Telegram-интеграцией",
    features: [
        "Модульная архитектура тестов",
        "Антикопирование и античит защита",
        "Telegram-уведомления о результатах",
        "Автосохранение прогресса",
        "Пропуск вопросов",
        "Адаптивный дизайн",
        "Полноэкранные результаты",
        "Тестовое окно Telegram",
        "Снежный фон на главной странице"
    ],
    lastUpdated: "2024",
    repository: "https://github.com/vysokovskaya-school/testing-system",
    supportEmail: "it-support@vysokovskaya25.ru"
};

// ОТЛАДОЧНАЯ КОНФИГУРАЦИЯ ТЕСТА
window.TEST_CONFIG = {
    title: "🔧 Отладочный тест системы (с Telegram)",
    totalQuestions: 3,
    totalProblems: 1,
    maxScore: 6,
    
    telegram: {
        // ПРИМЕР ДАННЫХ TELEGRAM (замените на свои)
        botToken: "8344281396:AAGZ9-M2XRyPMHiI2akBSSIN7QAtRGDmLOY",
        chatId: "1189539923",
        parseMode: "Markdown",
        disableNotification: false
    },
    
    gradingScale: {
        5: 5,
        4: 4,
        3: 2,
        2: 0
    },
    
    anticheat: {
        password: "0000",
        blockTime: 30
    },
    
    shuffleQuestions: false,
    shuffleOptions: false,
    showCorrectAnswer: true,
    debugMode: true
};

// ИНФОРМАЦИОННЫЕ ВОПРОСЫ
window.questionsBank = [
    {
        text: "Это отладочный тест системы. Выберите 'Правильно' для продолжения.",
        options: [
            {t: "Правильно", v: "correct"},
            {t: "Неправильно", v: "wrong"},
            {t: "Не знаю", v: "wrong"},
            {t: "Пропустить", v: "wrong"}
        ],
        points: 1
    },
    {
        text: "Система тестирования поддерживает отправку результатов в Telegram?",
        options: [
            {t: "Да, с полной статистикой", v: "correct"},
            {t: "Нет, не поддерживает", v: "wrong"},
            {t: "Только для администраторов", v: "wrong"},
            {t: "Только по email", v: "wrong"}
        ],
        points: 1
    },
    {
        text: "Какой пароль используется в античит-системе для отладки?",
        options: [
            {t: "3265", v: "wrong"},
            {t: "0000", v: "correct"},
            {t: "1234", v: "wrong"},
            {t: "admin", v: "wrong"}
        ],
        points: 1
    }
];

// ДЕМОНСТРАЦИОННЫЕ ЗАДАЧИ
window.problemsBank = [
    {
        text: "Сколько будет 2 + 2 × 2?",
        options: [
            {t: "6", v: "correct"},
            {t: "8", v: "wrong"},
            {t: "4", v: "wrong"},
            {t: "10", v: "wrong"}
        ],
        points: 3
    }
];

// ====================================================================
// ТЕЛЕГРАМ ТЕСТОВОЕ ОКНО
// ====================================================================

/**
 * Создает и показывает окно для тестирования Telegram
 */
window.showTelegramTestWindow = function() {
    // Если окно уже существует, показываем его
    if (document.getElementById('telegramTestWindow')) {
        document.getElementById('telegramTestWindow').style.display = 'flex';
        return;
    }
    
    // Создаем HTML для окна Telegram
    const telegramWindowHTML = `
    <div id="telegramTestWindow" class="telegram-modal-overlay">
        <div class="telegram-modal">
            <div class="telegram-modal-header">
                <h3><i class="fab fa-telegram"></i> Тестирование Telegram</h3>
                <button class="telegram-close-btn" onclick="document.getElementById('telegramTestWindow').style.display='none'">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            
            <div class="telegram-modal-content">
                <div class="telegram-config-section">
                    <h4><i class="fas fa-cog"></i> Конфигурация бота</h4>
                    
                    <div class="telegram-input-group">
                        <label for="telegramToken">
                            <i class="fas fa-key"></i> Токен бота:
                        </label>
                        <input type="password" id="telegramToken" 
                               value="${window.TEST_CONFIG.telegram.botToken}"
                               placeholder="Введите токен бота">
                        <button class="telegram-toggle-password" onclick="toggleTelegramTokenVisibility()">
                            <i class="fas fa-eye"></i>
                        </button>
                    </div>
                    
                    <div class="telegram-input-group">
                        <label for="telegramChatId">
                            <i class="fas fa-comment"></i> Chat ID:
                        </label>
                        <input type="text" id="telegramChatId" 
                               value="${window.TEST_CONFIG.telegram.chatId}"
                               placeholder="Введите Chat ID">
                    </div>
                    
                    <div class="telegram-status">
                        <div id="telegramConnectionStatus">
                            <i class="fas fa-circle" style="color: #ccc;"></i> Статус: Не проверен
                        </div>
                    </div>
                </div>
                
                <div class="telegram-message-section">
                    <h4><i class="fas fa-paper-plane"></i> Тестовое сообщение</h4>
                    
                    <div class="telegram-input-group">
                        <label for="telegramMessage">
                            <i class="fas fa-edit"></i> Текст сообщения:
                        </label>
                        <textarea id="telegramMessage" rows="4" placeholder="Введите текст сообщения...">
🔧 *Тестовая отправка из системы тестирования*

✅ Система работает корректно!
🕐 Время: ${new Date().toLocaleString('ru-RU')}
👤 Отправлено из: Отладочный тест
📊 Версия системы: ${window.PROJECT_INFO.version}

Тестовое сообщение проверяет интеграцию с Telegram API.
                        </textarea>
                    </div>
                    
                    <div class="telegram-test-buttons">
                        <button class="telegram-btn telegram-test-btn" onclick="testTelegramConnection()">
                            <i class="fas fa-plug"></i> Проверить подключение
                        </button>
                        <button class="telegram-btn telegram-send-btn" onclick="sendTestTelegramMessage()">
                            <i class="fas fa-paper-plane"></i> Отправить сообщение
                        </button>
                    </div>
                    
                    <div class="telegram-result" id="telegramResult">
                        <div class="telegram-result-title">
                            <i class="fas fa-history"></i> Результаты отправки
                        </div>
                        <div class="telegram-result-content" id="telegramResultContent">
                            Сообщений еще не отправлялось
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="telegram-modal-footer">
                <button class="telegram-btn telegram-save-btn" onclick="saveTelegramConfig()">
                    <i class="fas fa-save"></i> Сохранить настройки
                </button>
                <button class="telegram-btn telegram-help-btn" onclick="showTelegramHelp()">
                    <i class="fas fa-question-circle"></i> Помощь
                </button>
            </div>
        </div>
    </div>
    
    <style>
        .telegram-modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            backdrop-filter: blur(5px);
            animation: fadeIn 0.3s ease;
        }
        
        .telegram-modal {
            background: white;
            border-radius: 16px;
            width: 90%;
            max-width: 700px;
            max-height: 90vh;
            overflow-y: auto;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            border: 2px solid #0088cc;
            animation: slideUp 0.4s ease;
        }
        
        .telegram-modal-header {
            background: linear-gradient(135deg, #0088cc 0%, #005a99 100%);
            color: white;
            padding: 20px;
            border-radius: 14px 14px 0 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .telegram-modal-header h3 {
            margin: 0;
            font-size: 20px;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .telegram-close-btn {
            background: rgba(255, 255, 255, 0.2);
            border: none;
            color: white;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            cursor: pointer;
            font-size: 16px;
            transition: all 0.3s;
        }
        
        .telegram-close-btn:hover {
            background: rgba(255, 255, 255, 0.3);
            transform: rotate(90deg);
        }
        
        .telegram-modal-content {
            padding: 25px;
        }
        
        .telegram-config-section, .telegram-message-section {
            margin-bottom: 25px;
            padding: 20px;
            background: #f8f9fa;
            border-radius: 12px;
            border: 1px solid #e0e0e0;
        }
        
        .telegram-config-section h4, .telegram-message-section h4 {
            color: #0088cc;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 16px;
        }
        
        .telegram-input-group {
            margin-bottom: 15px;
        }
        
        .telegram-input-group label {
            display: block;
            margin-bottom: 6px;
            font-weight: 500;
            color: #555;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        .telegram-input-group input, 
        .telegram-input-group textarea {
            width: 100%;
            padding: 12px 15px;
            border: 1px solid #ddd;
            border-radius: 8px;
            font-size: 14px;
            font-family: inherit;
            transition: all 0.3s;
            background: white;
        }
        
        .telegram-input-group input:focus, 
        .telegram-input-group textarea:focus {
            outline: none;
            border-color: #0088cc;
            box-shadow: 0 0 0 3px rgba(0, 136, 204, 0.1);
        }
        
        .telegram-input-group {
            position: relative;
        }
        
        .telegram-toggle-password {
            position: absolute;
            right: 10px;
            top: 35px;
            background: none;
            border: none;
            color: #666;
            cursor: pointer;
            font-size: 16px;
        }
        
        .telegram-status {
            padding: 12px;
            background: #e8f4ff;
            border-radius: 8px;
            margin-top: 10px;
            border-left: 4px solid #0088cc;
        }
        
        .telegram-test-buttons {
            display: flex;
            gap: 10px;
            margin: 20px 0;
            flex-wrap: wrap;
        }
        
        .telegram-btn {
            padding: 12px 20px;
            border: none;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            font-size: 14px;
        }
        
        .telegram-test-btn {
            background: #34b86e;
            color: white;
        }
        
        .telegram-send-btn {
            background: #0088cc;
            color: white;
        }
        
        .telegram-save-btn {
            background: #9c27b0;
            color: white;
        }
        
        .telegram-help-btn {
            background: #ff9800;
            color: white;
        }
        
        .telegram-btn:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
        
        .telegram-btn:disabled {
            opacity: 0.6;
            cursor: not-allowed;
        }
        
        .telegram-result {
            margin-top: 20px;
            border: 1px solid #e0e0e0;
            border-radius: 10px;
            overflow: hidden;
        }
        
        .telegram-result-title {
            background: #f5f5f5;
            padding: 12px 15px;
            font-weight: 600;
            color: #333;
            border-bottom: 1px solid #e0e0e0;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .telegram-result-content {
            padding: 15px;
            max-height: 200px;
            overflow-y: auto;
            font-family: monospace;
            font-size: 13px;
            line-height: 1.5;
            background: white;
        }
        
        .telegram-modal-footer {
            padding: 20px;
            background: #f8f9fa;
            border-top: 1px solid #e0e0e0;
            display: flex;
            gap: 10px;
            justify-content: center;
            border-radius: 0 0 14px 14px;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes slideUp {
            from { 
                opacity: 0;
                transform: translateY(30px) scale(0.95);
            }
            to { 
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
        
        @media (max-width: 768px) {
            .telegram-modal {
                width: 95%;
                margin: 10px;
            }
            
            .telegram-test-buttons {
                flex-direction: column;
            }
            
            .telegram-modal-footer {
                flex-direction: column;
            }
            
            .telegram-btn {
                width: 100%;
            }
        }
    </style>
    `;
    
    // Добавляем окно в DOM
    document.body.insertAdjacentHTML('beforeend', telegramWindowHTML);
    console.log('✅ Окно тестирования Telegram создано');
};

/**
 * Переключает видимость токена Telegram
 */
window.toggleTelegramTokenVisibility = function() {
    const tokenInput = document.getElementById('telegramToken');
    const toggleButton = document.querySelector('.telegram-toggle-password');
    
    if (tokenInput.type === 'password') {
        tokenInput.type = 'text';
        toggleButton.innerHTML = '<i class="fas fa-eye-slash"></i>';
    } else {
        tokenInput.type = 'password';
        toggleButton.innerHTML = '<i class="fas fa-eye"></i>';
    }
};

/**
 * Проверяет подключение к Telegram API
 */
window.testTelegramConnection = async function() {
    const token = document.getElementById('telegramToken').value.trim();
    const statusElement = document.getElementById('telegramConnectionStatus');
    
    if (!token) {
        statusElement.innerHTML = '<i class="fas fa-circle" style="color: #f44336;"></i> Статус: Токен не указан';
        return;
    }
    
    statusElement.innerHTML = '<i class="fas fa-circle" style="color: #ff9800;"></i> Статус: Проверка подключения...';
    
    const url = `https://api.telegram.org/bot${token}/getMe`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.ok) {
            const botName = data.result.first_name;
            const botUsername = data.result.username;
            
            statusElement.innerHTML = `
                <i class="fas fa-circle" style="color: #4CAF50;"></i> 
                Статус: ✅ Подключено
                <div style="font-size: 12px; margin-top: 5px; color: #666;">
                    Бот: <strong>${botName}</strong> (@${botUsername})
                </div>
            `;
            console.log('✅ Telegram бот доступен:', data.result);
            return true;
        } else {
            statusElement.innerHTML = `
                <i class="fas fa-circle" style="color: #f44336;"></i> 
                Статус: ❌ Ошибка подключения
                <div style="font-size: 12px; margin-top: 5px; color: #666;">
                    ${data.description || 'Неизвестная ошибка'}
                </div>
            `;
            console.error('❌ Ошибка Telegram:', data);
            return false;
        }
    } catch (error) {
        statusElement.innerHTML = `
            <i class="fas fa-circle" style="color: #f44336;"></i> 
            Статус: ❌ Ошибка сети
            <div style="font-size: 12px; margin-top: 5px; color: #666;">
                ${error.message}
            </div>
        `;
        console.error('❌ Ошибка сети:', error);
        return false;
    }
};

/**
 * Отправляет тестовое сообщение в Telegram
 */
window.sendTestTelegramMessage = async function() {
    const token = document.getElementById('telegramToken').value.trim();
    const chatId = document.getElementById('telegramChatId').value.trim();
    const message = document.getElementById('telegramMessage').value;
    const resultElement = document.getElementById('telegramResultContent');
    
    if (!token || !chatId || !message) {
        resultElement.innerHTML = `
            <div style="color: #f44336;">
                <i class="fas fa-times-circle"></i> 
                Заполните все поля: токен, chat ID и сообщение
            </div>
        `;
        return;
    }
    
    resultElement.innerHTML = `
        <div style="color: #ff9800;">
            <i class="fas fa-spinner fa-spin"></i> 
            Отправка сообщения...
        </div>
    `;
    
    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    const timestamp = new Date().toISOString();
    
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
                parse_mode: 'Markdown'
            })
        });
        
        const data = await response.json();
        
        if (data.ok) {
            const messageId = data.result.message_id;
            const chatTitle = data.result.chat.title || 'Личный чат';
            
            resultElement.innerHTML = `
                <div style="color: #4CAF50; margin-bottom: 10px;">
                    <i class="fas fa-check-circle"></i> 
                    <strong>✅ Сообщение успешно отправлено!</strong>
                </div>
                <div style="font-size: 12px; color: #666;">
                    <div><strong>Время:</strong> ${new Date().toLocaleString('ru-RU')}</div>
                    <div><strong>ID сообщения:</strong> ${messageId}</div>
                    <div><strong>Чат:</strong> ${chatTitle}</div>
                    <div><strong>Статус:</strong> Доставлено</div>
                    <div style="margin-top: 10px; padding: 8px; background: #f8f9fa; border-radius: 5px;">
                        <strong>Отправленный текст:</strong><br>
                        ${message.substring(0, 200)}${message.length > 200 ? '...' : ''}
                    </div>
                </div>
            `;
            
            console.log('✅ Тестовое сообщение отправлено:', data.result);
            
            // Добавляем в историю отправок
            addToSendHistory({
                timestamp: timestamp,
                success: true,
                messageId: messageId,
                chatId: chatId
            });
            
        } else {
            resultElement.innerHTML = `
                <div style="color: #f44336; margin-bottom: 10px;">
                    <i class="fas fa-times-circle"></i> 
                    <strong>❌ Ошибка отправки</strong>
                </div>
                <div style="font-size: 12px; color: #666;">
                    <div><strong>Код ошибки:</strong> ${data.error_code || 'Неизвестно'}</div>
                    <div><strong>Описание:</strong> ${data.description || 'Неизвестная ошибка'}</div>
                    <div style="margin-top: 10px; padding: 8px; background: #ffebee; border-radius: 5px;">
                        <strong>Возможные причины:</strong><br>
                        1. Неверный токен бота<br>
                        2. Неверный Chat ID<br>
                        3. Бот не добавлен в чат<br>
                        4. Проблемы с интернет-соединением
                    </div>
                </div>
            `;
            
            console.error('❌ Ошибка отправки Telegram:', data);
            
            // Добавляем в историю ошибок
            addToSendHistory({
                timestamp: timestamp,
                success: false,
                error: data.description || 'Unknown error',
                errorCode: data.error_code
            });
        }
    } catch (error) {
        resultElement.innerHTML = `
            <div style="color: #f44336; margin-bottom: 10px;">
                <i class="fas fa-times-circle"></i> 
                <strong>❌ Ошибка сети</strong>
            </div>
            <div style="font-size: 12px; color: #666;">
                <div><strong>Ошибка:</strong> ${error.message}</div>
                <div style="margin-top: 10px; padding: 8px; background: #ffebee; border-radius: 5px;">
                    <strong>Проверьте:</strong><br>
                    1. Интернет-соединение<br>
                    2. Доступность Telegram API<br>
                    3. Настройки CORS (если запущено локально)
                </div>
            </div>
        `;
        
        console.error('❌ Ошибка сети при отправке:', error);
        
        addToSendHistory({
            timestamp: timestamp,
            success: false,
            error: 'Network error: ' + error.message
        });
    }
};

/**
 * Сохраняет настройки Telegram в конфигурацию
 */
window.saveTelegramConfig = function() {
    const token = document.getElementById('telegramToken').value.trim();
    const chatId = document.getElementById('telegramChatId').value.trim();
    
    if (!token || !chatId) {
        alert('Пожалуйста, заполните токен и Chat ID');
        return;
    }
    
    window.TEST_CONFIG.telegram.botToken = token;
    window.TEST_CONFIG.telegram.chatId = chatId;
    
    // Обновляем глобальную конфигурацию
    if (window.electricityTestConfig) {
        window.electricityTestConfig.telegram.botToken = token;
        window.electricityTestConfig.telegram.chatId = chatId;
    }
    
    // Показываем уведомление
    const resultElement = document.getElementById('telegramResultContent');
    resultElement.innerHTML = `
        <div style="color: #4CAF50;">
            <i class="fas fa-save"></i> 
            <strong>Настройки сохранены!</strong>
            <div style="font-size: 12px; margin-top: 5px;">
                Токен и Chat ID обновлены в конфигурации теста.
                <br>Для применения в реальном тесте потребуется перезагрузка.
            </div>
        </div>
    `;
    
    console.log('💾 Настройки Telegram сохранены:', { token: token.substring(0, 10) + '...', chatId });
};

/**
 * Показывает справку по настройке Telegram
 */
window.showTelegramHelp = function() {
    const resultElement = document.getElementById('telegramResultContent');
    resultElement.innerHTML = `
        <div style="color: #2196F3;">
            <i class="fas fa-question-circle"></i> 
            <strong>Помощь по настройке Telegram</strong>
        </div>
        <div style="font-size: 12px; margin-top: 10px; line-height: 1.6;">
            <strong>1. Как создать бота:</strong><br>
            • Откройте @BotFather в Telegram<br>
            • Отправьте команду /newbot<br>
            • Укажите имя и username бота<br>
            • Сохраните полученный токен<br><br>
            
            <strong>2. Как получить Chat ID:</strong><br>
            • Добавьте бота в нужный чат<br>
            • Отправьте любое сообщение боту<br>
            • Перейдите по ссылке: https://api.telegram.org/botВАШ_ТОКЕН/getUpdates<br>
            • Найдите "chat":{"id":ЧИСЛО} в ответе<br><br>
            
            <strong>3. Возможные проблемы:</strong><br>
            • Бот должен быть администратором в чате<br>
            • В личных сообщениях бота нужно начать диалог<br>
            • Токен должен начинаться с "bot"<br><br>
            
            <strong>Пример токена:</strong> bot123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11<br>
            <strong>Пример Chat ID:</strong> -1001234567890 (для групп) или 123456789 (для личных)
        </div>
    `;
};

/**
 * Добавляет запись в историю отправок
 */
function addToSendHistory(entry) {
    if (!window.telegramSendHistory) {
        window.telegramSendHistory = [];
    }
    
    window.telegramSendHistory.unshift(entry);
    
    // Ограничиваем историю 10 записями
    if (window.telegramSendHistory.length > 10) {
        window.telegramSendHistory.pop();
    }
    
    console.log('📨 Запись добавлена в историю отправок:', entry);
}

// ====================================================================
// ФУНКЦИИ ДЛЯ ОТЛАДКИ И ДИАГНОСТИКИ
// ====================================================================

/**
 * Выводит полную информацию о системе в консоль
 */
window.showSystemInfo = function() {
    console.group('🎓 ИНФОРМАЦИЯ О СИСТЕМЕ ТЕСТИРОВАНИЯ');
    console.log('📋 Название:', window.PROJECT_INFO.name);
    console.log('🚀 Версия:', window.PROJECT_INFO.version);
    console.log('👨‍💻 Автор:', window.PROJECT_INFO.author);
    console.log('📝 Описание:', window.PROJECT_INFO.description);
    console.log('⭐ Особенности:', window.PROJECT_INFO.features);
    console.log('🔄 Последнее обновление:', window.PROJECT_INFO.lastUpdated);
    console.log('🤖 Telegram настроен:', window.TEST_CONFIG.telegram.botToken ? '✅ Да' : '❌ Нет');
    console.groupEnd();
    
    console.group('⚙️ КОНФИГУРАЦИЯ ТЕСТА');
    console.log('📚 Тест:', window.TEST_CONFIG.title);
    console.log('❓ Вопросы:', window.questionsBank.length, 'из', window.TEST_CONFIG.totalQuestions, 'будут выбраны');
    console.log('🧮 Задачи:', window.problemsBank.length, 'из', window.TEST_CONFIG.totalProblems, 'будут выбраны');
    console.log('🎯 Макс. балл:', window.TEST_CONFIG.maxScore);
    console.log('🤖 Telegram бот:', window.TEST_CONFIG.telegram.botToken ? '✅ Настроен' : '❌ Не настроен');
    console.log('💬 Chat ID:', window.TEST_CONFIG.telegram.chatId || 'Не указан');
    console.log('🔒 Античит пароль:', window.TEST_CONFIG.anticheat.password);
    console.groupEnd();
};

/**
 * Тестирует все основные функции системы
 */
window.runSystemTests = async function() {
    console.group('🧪 ЗАПУСК СИСТЕМНЫХ ТЕСТОВ');
    
    const tests = [
        { name: 'Конфигурация', test: () => !!window.TEST_CONFIG },
        { name: 'Банк вопросов', test: () => window.questionsBank && Array.isArray(window.questionsBank) },
        { name: 'Банк задач', test: () => window.problemsBank && Array.isArray(window.problemsBank) },
        { name: 'Telegram конфиг', test: () => window.TEST_CONFIG.telegram && window.TEST_CONFIG.telegram.botToken }
    ];
    
    let allPassed = true;
    
    for (const test of tests) {
        try {
            const result = test.test();
            console.log(`${result ? '✅' : '❌'} ${test.name}: ${result ? 'Пройден' : 'Не пройден'}`);
            if (!result) allPassed = false;
        } catch (error) {
            console.error(`❌ ${test.name}: Ошибка - ${error.message}`);
            allPassed = false;
        }
    }
    
    // Тест Telegram
    console.log('🔗 Тестирование Telegram API...');
    try {
        const connected = await testTelegramConnection();
        console.log(`${connected ? '✅' : '❌'} Telegram API: ${connected ? 'Доступен' : 'Недоступен'}`);
    } catch (error) {
        console.error('❌ Telegram API: Ошибка тестирования');
    }
    
    console.groupEnd();
    return allPassed;
};

/**
 * Создает тестового студента и начинает тест
 */
window.startDebugTest = function() {
    console.log('🚀 Запуск отладочного теста...');
    
    if (window.studentNameInput && window.studentClassSelect) {
        window.studentNameInput.value = 'Тестовый Студент';
        window.studentClassSelect.value = '8';
        
        if (window.startTestBtn) {
            console.log('👤 Создан тестовый студент');
            window.startTestBtn.click();
        }
    }
};

/**
 * Показывает все доступные тесты в системе
 */
window.showAvailableTests = function() {
    console.group('📂 ДОСТУПНЫЕ ТЕСТЫ В СИСТЕМЕ');
    console.log('1. electricity.js - Контрольная по электричеству');
    console.log('2. debug.js - Отладочный тест (этот файл)');
    console.log('3. trew.js - Пример другого теста');
    console.log('');
    console.log('💡 Для открытия теста введите его имя на главной странице');
    console.groupEnd();
};

// ====================================================================
// АВТОМАТИЧЕСКИЕ ДЕЙСТВИЯ ПРИ ЗАГРУЗКЕ
// ====================================================================

console.log('=========================================');
console.log('🔧 ОТЛАДОЧНЫЙ РЕЖИМ СИСТЕМЫ ТЕСТИРОВАНИЯ');
console.log('=========================================');

// Автоматически показываем информацию о системе
setTimeout(() => {
    window.showSystemInfo();
    
    // Добавляем кнопки отладки в интерфейс
    if (window.location.pathname.includes('test.html')) {
        setTimeout(() => {
            addDebugButtons();
        }, 1000);
    }
}, 500);

/**
 * Добавляет кнопки отладки в интерфейс
 */
function addDebugButtons() {
    const buttonContainer = document.querySelector('.button-container') || 
                           document.querySelector('.button-group') ||
                           document.querySelector('.section');
    
    if (!buttonContainer) return;
    
    const debugContainer = document.createElement('div');
    debugContainer.style.cssText = `
        margin: 20px 0;
        padding: 15px;
        background: linear-gradient(135deg, #f0f7ff 0%, #e3f2fd 100%);
        border: 2px dashed #4b6cb7;
        border-radius: 10px;
        text-align: center;
        box-shadow: 0 4px 12px rgba(75, 108, 183, 0.1);
    `;
    
    debugContainer.innerHTML = `
        <div style="font-weight: bold; color: #4b6cb7; margin-bottom: 15px; font-size: 16px;">
            <i class="fas fa-bug"></i> Панель отладки системы
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 10px; margin-bottom: 15px;">
            <button id="debugInfoBtn" style="background: #4b6cb7; color: white; border: none; padding: 10px; border-radius: 8px; cursor: pointer;">
                <i class="fas fa-info-circle"></i> Инфо
            </button>
            <button id="debugTestBtn" style="background: #34b86e; color: white; border: none; padding: 10px; border-radius: 8px; cursor: pointer;">
                <i class="fas fa-play"></i> Тест системы
            </button>
            <button id="debugListBtn" style="background: #9c27b0; color: white; border: none; padding: 10px; border-radius: 8px; cursor: pointer;">
                <i class="fas fa-list"></i> Список тестов
            </button>
            <button id="debugTelegramBtn" style="background: #0088cc; color: white; border: none; padding: 10px; border-radius: 8px; cursor: pointer;">
                <i class="fab fa-telegram"></i> Тест Telegram
            </button>
            <button id="debugStartBtn" style="background: linear-gradient(135deg, #ff9800, #ff5722); color: white; border: none; padding: 10px; border-radius: 8px; cursor: pointer;">
                <i class="fas fa-rocket"></i> Быстрый старт
            </button>
        </div>
        <div id="debugOutput" style="margin-top: 15px; padding: 12px; background: white; 
              border-radius: 8px; font-family: 'Courier New', monospace; font-size: 12px; 
              text-align: left; max-height: 200px; overflow-y: auto; display: none;
              border: 1px solid #e0e0e0;"></div>
    `;
    
    buttonContainer.parentNode.insertBefore(debugContainer, buttonContainer.nextSibling);
    
    // Назначаем обработчики
    document.getElementById('debugInfoBtn').onclick = () => {
        window.showSystemInfo();
        showDebugOutput('✅ Информация о системе выведена в консоль браузера (F12)');
    };
    
    document.getElementById('debugTestBtn').onclick = async () => {
        showDebugOutput('🔄 Запуск системных тестов...');
        const result = await window.runSystemTests();
        showDebugOutput(result ? '✅ Все тесты пройдены успешно' : '❌ Обнаружены ошибки в тестах');
    };
    
    document.getElementById('debugListBtn').onclick = () => {
        window.showAvailableTests();
        showDebugOutput('📋 Список тестов выведен в консоль браузера');
    };
    
    document.getElementById('debugTelegramBtn').onclick = () => {
        window.showTelegramTestWindow();
        showDebugOutput('📨 Открыто окно тестирования Telegram');
    };
    
    document.getElementById('debugStartBtn').onclick = () => {
        window.startDebugTest();
        showDebugOutput('🚀 Запущен быстрый старт теста с тестовым студентом');
    };
    
    function showDebugOutput(message) {
        const output = document.getElementById('debugOutput');
        output.style.display = 'block';
        const time = new Date().toLocaleTimeString();
        output.innerHTML = `<div style="color: #666; margin-bottom: 5px;"><strong>[${time}]</strong> ${message}</div>` + output.innerHTML;
    }
    
    console.log('✅ Панель отладки добавлена в интерфейс');
}

// ====================================================================
// ЭКСПОРТ ДЛЯ ГЛОБАЛЬНОГО ИСПОЛЬЗОВАНИЯ
// ====================================================================

window.debugTestConfig = window.TEST_CONFIG;
window.debugQuestions = window.questionsBank;
window.debugProblems = window.problemsBank;

console.log('✅ Отладочный тест загружен и готов к использованию!');
console.log('👉 Введите "debug" на главной странице для запуска.');
console.log('👉 Доступные функции:');
console.log('   • window.showSystemInfo() - информация о системе');
console.log('   • window.runSystemTests() - проверка системы');
console.log('   • window.showTelegramTestWindow() - окно тестирования Telegram');
console.log('   • window.testTelegramConnection() - проверка подключения к Telegram');
console.log('   • window.sendTestTelegramMessage() - отправка тестового сообщения');