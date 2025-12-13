// ====================================================================
// КОМПЛЕКСНЫЙ ОТЛАДОЧНЫЙ ТЕСТ ДЛЯ СИСТЕМЫ ТЕСТИРОВАНИЯ
// Файл: test/debug.js
// Версия: 8.0 (Полный функционал)
// Назначение: Комплексная отладка всех компонентов системы
// Для запуска: введите "debug" на главной странице
// ====================================================================

console.log('🔧 DEBUG MODE v8.0: Загрузка комплексного отладочного теста...');

// ГЛОБАЛЬНАЯ ИНФОРМАЦИЯ О ПРОЕКТЕ
window.PROJECT_INFO = {
    name: "Система тестирования Высоковской школы №25",
    version: "8.0",
    author: "Школьный IT-отдел",
    created: "2023",
    updated: "2024",
    description: "Модульная система для проведения контрольных работ с полным набором функций",
    
    features: [
        "🎯 Модульная архитектура тестов",
        "🚨 Античит-система с таймером блокировки",
        "📋 Антикопирование текста",
        "📨 Telegram-интеграция с реальными данными",
        "💾 Автосохранение прогресса",
        "⏭️ Пропуск и возврат к вопросам",
        "📊 Детальная статистика результатов",
        "🎨 Адаптивный дизайн",
        "❄️ Снежный фон на главной странице",
        "🔧 Комплексная отладка и диагностика"
    ],
    
    contact: {
        email: "it-support@vysokovskaya25.ru",
        telegram: "@vysokovskaya_school",
        website: "https://vysokovskaya25.ru"
    },
    
    systemRequirements: {
        browser: "Chrome 80+, Firefox 75+, Safari 14+",
        javascript: "ES6+",
        storage: "LocalStorage",
        internet: "Требуется для Telegram"
    }
};

// КОМПЛЕКСНАЯ КОНФИГУРАЦИЯ ТЕСТА
window.TEST_CONFIG = {
    title: "🔧 Комплексный отладочный тест системы",
    subtitle: "Проверка всех функций и компонентов",
    totalQuestions: 5,
    totalProblems: 2,
    maxScore: 11, // 5×1 + 2×3 = 11 баллов
    
    // РЕАЛЬНЫЕ ДАННЫЕ TELEGRAM ИЗ ПРОЕКТА
    telegram: {
        botToken: "8344281396:AAGZ9-M2XRyPMHiI2akBSSIN7QAtRGDmLOY",
        chatId: "1189539923",
        parseMode: "Markdown",
        disableNotification: false,
        webhook: false
    },
    
    gradingScale: {
        5: 10,    // 10-11 баллов = 5
        4: 8,     // 8-9 баллов = 4
        3: 5,     // 5-7 баллов = 3
        2: 0      // 0-4 баллов = 2
    },
    
    anticheat: {
        password: "3265",     // Реальный пароль из конфига
        blockTime: 60,        // Уменьшено для отладки (60 сек)
        maxAttempts: 3,
        enableCopyProtection: true,
        enableTabProtection: true
    },
    
    system: {
        shuffleQuestions: false,  // Для удобства отладки
        shuffleOptions: false,
        showCorrectAnswer: true,
        allowSkip: true,
        allowReview: true,
        autoSave: true,
        autoSaveInterval: 30,     // секунд
        debugMode: true,
        logLevel: "verbose"
    },
    
    timings: {
        questionTimeout: 0,       // без таймаута
        answerShowTime: 2000,     // 2 секунды
        resultShowTime: 8000      // 8 секунд
    }
};

// БАНК ТЕОРЕТИЧЕСКИХ ВОПРОСОВ ДЛЯ ОТЛАДКИ
window.questionsBank = [
    {
        id: "debug_1",
        text: "Данный отладочный тест проверяет работу всех систем. Выберите 'Верно' для продолжения.",
        options: [
            {t: "Верно", v: "correct", hint: "Это правильный ответ для отладки"},
            {t: "Неверно", v: "wrong", hint: "Неправильный вариант"},
            {t: "Не уверен", v: "wrong", hint: "Попробуйте еще раз"},
            {t: "Пропустить", v: "wrong", hint: "Можно будет вернуться позже"}
        ],
        points: 1,
        category: "Система",
        difficulty: "Легкий",
        explanation: "Этот вопрос демонстрирует базовую работу системы тестирования."
    },
    {
        id: "debug_2",
        text: "Система тестирования поддерживает отправку результатов в Telegram с реальными данными бота?",
        options: [
            {t: "Да, с токеном 8344281396:AAGZ9-M2XRyPMHiI2akBSSIN7QAtRGDmLOY", v: "correct", hint: "Токен указан верно"},
            {t: "Нет, Telegram не подключен", v: "wrong", hint: "Telegram настроен"},
            {t: "Только в платной версии", v: "wrong", hint: "Система бесплатна"},
            {t: "Только для администраторов", v: "wrong", hint: "Для всех пользователей"}
        ],
        points: 1,
        category: "Telegram",
        difficulty: "Средний",
        explanation: "В конфигурации указаны реальные данные Telegram бота для тестирования."
    },
    {
        id: "debug_3",
        text: "Какой пароль используется в античит-системе для разблокировки?",
        options: [
            {t: "3265", v: "correct", hint: "Пароль из конфигурации"},
            {t: "0000", v: "wrong", hint: "Упрощенный пароль только для отладки"},
            {t: "1234", v: "wrong", hint: "Стандартный пароль не используется"},
            {t: "admin", v: "wrong", hint: "Неверный пароль"}
        ],
        points: 1,
        category: "Безопасность",
        difficulty: "Легкий",
        explanation: "Пароль 3265 установлен в конфигурации античит-системы."
    },
    {
        id: "debug_4",
        text: "Система автоматически сохраняет прогресс тестирования?",
        options: [
            {t: "Да, каждые 30 секунд в localStorage", v: "correct", hint: "Автосохранение включено"},
            {t: "Нет, только вручную", v: "wrong", hint: "Автосохранение работает"},
            {t: "Только при завершении теста", v: "wrong", hint: "Чаще, чем только при завершении"},
            {t: "Только в облачном хранилище", v: "wrong", hint: "Используется localStorage"}
        ],
        points: 1,
        category: "Система",
        difficulty: "Средний",
        explanation: "Система использует автосохранение в localStorage каждые 30 секунд."
    },
    {
        id: "debug_5",
        text: "Можно ли пропустить вопрос и вернуться к нему позже?",
        options: [
            {t: "Да, с помощью кнопки ↻", v: "correct", hint: "Кнопка перезагрузки/пропуска"},
            {t: "Нет, нельзя пропускать", v: "wrong", hint: "Пропуск разрешен"},
            {t: "Только один раз за тест", v: "wrong", hint: "Неограниченное количество раз"},
            {t: "Только с разрешения учителя", v: "wrong", hint: "Автоматически"}
        ],
        points: 1,
        category: "Интерфейс",
        difficulty: "Легкий",
        explanation: "Система поддерживает пропуск вопросов с возможностью вернуться к ним позже."
    }
];

// БАНК ЗАДАЧ ДЛЯ ОТЛАДКИ
window.problemsBank = [
    {
        id: "problem_1",
        text: "Сколько будет (5 + 3) × 2 - 4?",
        options: [
            {t: "12", v: "correct", hint: "(5+3)=8, 8×2=16, 16-4=12"},
            {t: "14", v: "wrong", hint: "Неверный порядок операций"},
            {t: "18", v: "wrong", hint: "Сначала умножение, потом сложение"},
            {t: "10", v: "wrong", hint: "Проверьте вычисления"}
        ],
        points: 3,
        category: "Математика",
        difficulty: "Легкий",
        solution: "Сначала выполняем сложение в скобках: 5 + 3 = 8. Затем умножение: 8 × 2 = 16. И вычитание: 16 - 4 = 12.",
        formula: "(5 + 3) × 2 - 4 = 8 × 2 - 4 = 16 - 4 = 12"
    },
    {
        id: "problem_2",
        text: "Если автосохранение происходит каждые 30 секунд, сколько раз оно сработает за 5 минут теста?",
        options: [
            {t: "10 раз", v: "correct", hint: "5 мин = 300 сек, 300/30 = 10"},
            {t: "5 раз", v: "wrong", hint: "300/30 = 10, не 5"},
            {t: "15 раз", v: "wrong", hint: "300/20 было бы 15"},
            {t: "20 раз", v: "wrong", hint: "300/15 было бы 20"}
        ],
        points: 3,
        category: "Система",
        difficulty: "Средний",
        solution: "5 минут = 300 секунд. 300 секунд ÷ 30 секунд = 10 раз.",
        formula: "300 сек ÷ 30 сек/раз = 10 раз"
    }
];

// ====================================================================
// ОСНОВНЫЕ ФУНКЦИИ ОТЛАДКИ
// ====================================================================

/**
 * Инициализация отладочного режима
 */
window.initDebugMode = function() {
    console.log('🚀 Инициализация отладочного режима...');
    
    // Создаем глобальный объект для хранения отладочных данных
    window.DEBUG_DATA = {
        startTime: new Date(),
        testStarted: false,
        cheatAttempts: 0,
        telegramTests: 0,
        autoSaves: 0,
        questionsAnswered: 0,
        problemsAnswered: 0,
        skipsUsed: 0,
        history: []
    };
    
    // Добавляем стили для отладки
    addDebugStyles();
    
    // Запускаем автоматические тесты
    setTimeout(() => {
        runAutomaticTests();
        addDebugInterface();
    }, 1000);
    
    console.log('✅ Отладочный режим инициализирован');
};

/**
 * Запуск автоматических тестов системы
 */
window.runAutomaticTests = async function() {
    console.group('🤖 АВТОМАТИЧЕСКИЕ ТЕСТЫ СИСТЕМЫ');
    
    const testResults = {
        passed: 0,
        failed: 0,
        total: 0
    };
    
    // Тест 1: Проверка конфигурации
    testResults.total++;
    if (await testConfiguration()) {
        testResults.passed++;
        logTestResult('Конфигурация', true);
    } else {
        testResults.failed++;
        logTestResult('Конфигурация', false);
    }
    
    // Тест 2: Проверка Telegram
    testResults.total++;
    if (await testTelegramConnection()) {
        testResults.passed++;
        logTestResult('Telegram подключение', true);
    } else {
        testResults.failed++;
        logTestResult('Telegram подключение', false);
    }
    
    // Тест 3: Проверка localStorage
    testResults.total++;
    if (testLocalStorage()) {
        testResults.passed++;
        logTestResult('LocalStorage', true);
    } else {
        testResults.failed++;
        logTestResult('LocalStorage', false);
    }
    
    // Тест 4: Проверка вопросов
    testResults.total++;
    if (testQuestions()) {
        testResults.passed++;
        logTestResult('Банк вопросов', true);
    } else {
        testResults.failed++;
        logTestResult('Банк вопросов', false);
    }
    
    // Тест 5: Проверка системы оценки
    testResults.total++;
    if (testGradingSystem()) {
        testResults.passed++;
        logTestResult('Система оценки', true);
    } else {
        testResults.failed++;
        logTestResult('Система оценки', false);
    }
    
    console.log(`📊 ИТОГО: ${testResults.passed}/${testResults.total} тестов пройдено`);
    console.groupEnd();
    
    // Сохраняем результаты
    window.DEBUG_DATA.testResults = testResults;
    window.DEBUG_DATA.lastTestRun = new Date();
    
    return testResults.passed === testResults.total;
};

/**
 * Тест конфигурации системы
 */
async function testConfiguration() {
    try {
        if (!window.TEST_CONFIG) throw new Error('TEST_CONFIG не определен');
        if (!window.TEST_CONFIG.title) throw new Error('Название теста не указано');
        if (!window.TEST_CONFIG.telegram) throw new Error('Конфигурация Telegram не найдена');
        if (!window.TEST_CONFIG.telegram.botToken) throw new Error('Токен бота не указан');
        if (!window.TEST_CONFIG.telegram.chatId) throw new Error('Chat ID не указан');
        if (!window.TEST_CONFIG.anticheat) throw new Error('Конфигурация античитов не найдена');
        if (!window.TEST_CONFIG.anticheat.password) throw new Error('Пароль античитов не указан');
        
        console.log('✅ Конфигурация: Все необходимые поля присутствуют');
        console.log('   • Название:', window.TEST_CONFIG.title);
        console.log('   • Telegram токен:', window.TEST_CONFIG.telegram.botToken.substring(0, 10) + '...');
        console.log('   • Chat ID:', window.TEST_CONFIG.telegram.chatId);
        console.log('   • Пароль античитов:', window.TEST_CONFIG.anticheat.password);
        
        return true;
    } catch (error) {
        console.error('❌ Ошибка конфигурации:', error.message);
        return false;
    }
}

/**
 * Тест подключения к Telegram
 */
async function testTelegramConnection() {
    const token = window.TEST_CONFIG.telegram.botToken;
    
    if (!token || token === 'DEMO_TOKEN_DEBUG_ONLY') {
        console.warn('⚠️ Telegram: Используется тестовый токен');
        return false;
    }
    
    const url = `https://api.telegram.org/bot${token}/getMe`;
    
    try {
        console.log('🔄 Telegram: Проверка подключения...');
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.ok) {
            console.log('✅ Telegram: Бот доступен');
            console.log('   • Имя бота:', data.result.first_name);
            console.log('   • Username:', data.result.username);
            console.log('   • ID бота:', data.result.id);
            
            // Проверяем права бота
            const botInfo = await getBotInfo();
            if (botInfo) {
                console.log('   • Может присоединяться к группам:', botInfo.can_join_groups ? 'Да' : 'Нет');
                console.log('   • Может читать сообщения:', botInfo.can_read_all_group_messages ? 'Да' : 'Нет');
            }
            
            return true;
        } else {
            console.error('❌ Telegram: Ошибка API:', data.description);
            return false;
        }
    } catch (error) {
        console.error('❌ Telegram: Ошибка сети:', error.message);
        return false;
    }
}

/**
 * Получение информации о боте
 */
async function getBotInfo() {
    const token = window.TEST_CONFIG.telegram.botToken;
    const url = `https://api.telegram.org/bot${token}/getMe`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.ok ? data.result : null;
    } catch (error) {
        console.error('Ошибка получения информации о боте:', error);
        return null;
    }
}

/**
 * Тест localStorage
 */
function testLocalStorage() {
    try {
        // Пытаемся записать и прочитать тестовые данные
        const testKey = 'debug_test_' + Date.now();
        const testValue = 'test_value_' + Math.random();
        
        localStorage.setItem(testKey, testValue);
        const retrievedValue = localStorage.getItem(testKey);
        localStorage.removeItem(testKey);
        
        if (retrievedValue === testValue) {
            console.log('✅ LocalStorage: Работает корректно');
            
            // Проверяем доступное пространство
            let totalSpace = 0;
            try {
                for (let i = 0; i < 1000; i++) {
                    const key = 'test_space_' + i;
                    const value = 'x'.repeat(1024); // 1KB
                    localStorage.setItem(key, value);
                    totalSpace += 1024;
                }
            } catch (e) {
                // Достигнут лимит
            }
            
            // Очищаем тестовые данные
            for (let i = 0; i < 1000; i++) {
                localStorage.removeItem('test_space_' + i);
            }
            
            console.log(`   • Доступное пространство: ${Math.round(totalSpace / 1024)}KB`);
            return true;
        } else {
            console.error('❌ LocalStorage: Данные не совпадают');
            return false;
        }
    } catch (error) {
        console.error('❌ LocalStorage: Ошибка доступа:', error.message);
        return false;
    }
}

/**
 * Тест банка вопросов
 */
function testQuestions() {
    try {
        if (!window.questionsBank || !Array.isArray(window.questionsBank)) {
            throw new Error('Банк вопросов не найден');
        }
        
        if (!window.problemsBank || !Array.isArray(window.problemsBank)) {
            throw new Error('Банк задач не найден');
        }
        
        const totalNeeded = window.TEST_CONFIG.totalQuestions + window.TEST_CONFIG.totalProblems;
        const totalAvailable = window.questionsBank.length + window.problemsBank.length;
        
        if (totalAvailable < totalNeeded) {
            throw new Error(`Недостаточно вопросов: нужно ${totalNeeded}, доступно ${totalAvailable}`);
        }
        
        // Проверяем структуру вопросов
        let validQuestions = 0;
        window.questionsBank.forEach((q, i) => {
            if (q.text && q.options && q.points) {
                validQuestions++;
            } else {
                console.warn(`⚠️ Вопрос ${i} имеет неполную структуру`);
            }
        });
        
        // Проверяем структуру задач
        let validProblems = 0;
        window.problemsBank.forEach((p, i) => {
            if (p.text && p.options && p.points === 3) {
                validProblems++;
            } else {
                console.warn(`⚠️ Задача ${i} имеет неполную структуру`);
            }
        });
        
        console.log('✅ Банки вопросов: Проверены');
        console.log(`   • Вопросов: ${validQuestions}/${window.questionsBank.length} валидных`);
        console.log(`   • Задач: ${validProblems}/${window.problemsBank.length} валидных`);
        console.log(`   • Нужно для теста: ${window.TEST_CONFIG.totalQuestions} вопросов + ${window.TEST_CONFIG.totalProblems} задач`);
        
        return validQuestions >= window.TEST_CONFIG.totalQuestions && 
               validProblems >= window.TEST_CONFIG.totalProblems;
    } catch (error) {
        console.error('❌ Банки вопросов: Ошибка:', error.message);
        return false;
    }
}

/**
 * Тест системы оценки
 */
function testGradingSystem() {
    try {
        const scale = window.TEST_CONFIG.gradingScale;
        const maxScore = window.TEST_CONFIG.maxScore;
        
        if (!scale || typeof scale !== 'object') {
            throw new Error('Шкала оценок не определена');
        }
        
        // Проверяем границы оценок
        const testScores = [
            {score: maxScore, expected: 5},
            {score: scale[5], expected: 5},
            {score: scale[5] - 1, expected: 4},
            {score: scale[4], expected: 4},
            {score: scale[4] - 1, expected: 3},
            {score: scale[3], expected: 3},
            {score: scale[3] - 1, expected: 2},
            {score: 0, expected: 2}
        ];
        
        let allCorrect = true;
        
        testScores.forEach(test => {
            const grade = calculateGrade(test.score);
            if (grade !== test.expected) {
                console.error(`❌ Ошибка оценки: ${test.score} баллов -> ${grade} (ожидалось ${test.expected})`);
                allCorrect = false;
            }
        });
        
        if (allCorrect) {
            console.log('✅ Система оценки: Работает корректно');
            console.log(`   • Макс. балл: ${maxScore}`);
            console.log(`   • На 5: от ${scale[5]} баллов`);
            console.log(`   • На 4: от ${scale[4]} до ${scale[5] - 1}`);
            console.log(`   • На 3: от ${scale[3]} до ${scale[4] - 1}`);
            console.log(`   • На 2: до ${scale[3] - 1}`);
        }
        
        return allCorrect;
    } catch (error) {
        console.error('❌ Система оценки: Ошибка:', error.message);
        return false;
    }
}

/**
 * Вспомогательная функция для расчета оценки
 */
function calculateGrade(score) {
    const scale = window.TEST_CONFIG.gradingScale;
    if (score >= scale[5]) return 5;
    if (score >= scale[4]) return 4;
    if (score >= scale[3]) return 3;
    return 2;
}

/**
 * Логирование результата теста
 */
function logTestResult(name, passed) {
    const status = passed ? '✅' : '❌';
    const message = passed ? 'Пройден' : 'Не пройден';
    console.log(`${status} ${name}: ${message}`);
}

// ====================================================================
// ТЕСТИРОВАНИЕ АНТИЧИТ-СИСТЕМЫ
// ====================================================================

/**
 * Тестирование античит-системы
 */
window.testAnticheatSystem = function() {
    console.group('🛡️ ТЕСТИРОВАНИЕ АНТИЧИТ-СИСТЕМЫ');
    
    // Тест 1: Проверка пароля
    const password = window.TEST_CONFIG.anticheat.password;
    console.log(`1. Пароль античитов: "${password}"`);
    console.log(`   • Длина: ${password.length} символов`);
    console.log(`   • Только цифры: ${/^\d+$/.test(password) ? 'Да' : 'Нет'}`);
    
    // Тест 2: Имитация срабатывания античитов
    console.log('2. Имитация срабатывания системы:');
    
    // Проверяем наличие необходимых функций
    const functionsToCheck = [
        'triggerAnticheat',
        'startBlockTimer',
        'closeAntiCheat'
    ];
    
    let functionsFound = 0;
    functionsToCheck.forEach(func => {
        if (typeof window[func] === 'function') {
            console.log(`   • ${func}(): ✅ Найдена`);
            functionsFound++;
        } else {
            console.log(`   • ${func}(): ❌ Не найдена`);
        }
    });
    
    // Тест 3: Проверка защиты от копирования
    console.log('3. Защита от копирования:');
    const copyProtection = window.TEST_CONFIG.anticheat.enableCopyProtection;
    console.log(`   • Включена: ${copyProtection ? 'Да' : 'Нет'}`);
    
    if (copyProtection) {
        // Проверяем обработчики событий
        document.addEventListener('copy', function(e) {
            console.log('   • Обработчик copy: ✅ Активен');
        });
        
        console.log('   • Попробуйте скопировать текст со страницы для теста');
    }
    
    // Тест 4: Защита от переключения вкладок
    console.log('4. Защита от переключения вкладок:');
    const tabProtection = window.TEST_CONFIG.anticheat.enableTabProtection;
    console.log(`   • Включена: ${tabProtection ? 'Да' : 'Нет'}`);
    
    if (tabProtection) {
        console.log('   • При переключении вкладок должен сработать античит');
    }
    
    console.log(`📊 ИТОГО: ${functionsFound}/${functionsToCheck.length} функций найдено`);
    console.groupEnd();
    
    return functionsFound === functionsToCheck.length;
};

/**
 * Запустить тест античит-системы с визуальным подтверждением
 */
window.runAnticheatTest = function() {
    if (!confirm('Запустить тест античит-системы? Будет имитировано срабатывание защиты.')) {
        return;
    }
    
    console.log('🚨 Запуск теста античит-системы...');
    
    // Имитируем срабатывание античитов
    if (typeof window.triggerAnticheat === 'function') {
        window.triggerAnticheat();
        console.log('✅ Античит-система активирована');
        
        // Показываем уведомление
        showDebugNotification('Античит-система активирована', 'Проверьте работу блокировки', 'warning');
        
        // Записываем в историю
        window.DEBUG_DATA.cheatAttempts++;
        addToDebugHistory('Античит-тест', 'Система активирована вручную');
    } else {
        console.error('❌ Функция triggerAnticheat не найдена');
        showDebugNotification('Ошибка', 'Функция античит не найдена', 'error');
    }
};

// ====================================================================
// ТЕСТИРОВАНИЕ TELEGRAM
// ====================================================================

/**
 * Комплексное тестирование Telegram
 */
window.testTelegramComprehensive = async function() {
    console.group('📨 КОМПЛЕКСНОЕ ТЕСТИРОВАНИЕ TELEGRAM');
    
    const token = window.TEST_CONFIG.telegram.botToken;
    const chatId = window.TEST_CONFIG.telegram.chatId;
    
    if (!token || token === 'DEMO_TOKEN_DEBUG_ONLY') {
        console.error('❌ Telegram: Не указан реальный токен');
        showDebugNotification('Ошибка', 'Укажите реальный токен Telegram', 'error');
        console.groupEnd();
        return false;
    }
    
    // Тест 1: Проверка доступности бота
    console.log('1. Проверка доступности бота...');
    const botAvailable = await testTelegramConnection();
    
    if (!botAvailable) {
        console.error('❌ Telegram: Бот недоступен');
        console.groupEnd();
        return false;
    }
    
    // Тест 2: Отправка тестового сообщения
    console.log('2. Отправка тестового сообщения...');
    
    const testMessage = `🔧 *Тестовое сообщение из отладочного режима*

✅ Система тестирования: ${window.PROJECT_INFO.name}
🚀 Версия: ${window.PROJECT_INFO.version}
🕐 Время отправки: ${new Date().toLocaleString('ru-RU')}
🔍 Режим: Комплексная отладка

*Проверка функций:*
✓ Подключение к Telegram API
✓ Отправка сообщений
✓ Форматирование Markdown
✓ Обработка ошибок

📊 *Статистика отладки:*
• Запущено: ${window.DEBUG_DATA ? window.DEBUG_DATA.startTime.toLocaleString() : 'Неизвестно'}
• Тестов Telegram: ${window.DEBUG_DATA ? window.DEBUG_DATA.telegramTests + 1 : 1}
• Попыток античитов: ${window.DEBUG_DATA ? window.DEBUG_DATA.cheatAttempts : 0}

_Это тестовое сообщение, проверяющее работу интеграции._`;
    
    try {
        const url = `https://api.telegram.org/bot${token}/sendMessage`;
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: chatId,
                text: testMessage,
                parse_mode: 'Markdown',
                disable_notification: false
            })
        });
        
        const data = await response.json();
        
        if (data.ok) {
            console.log('✅ Telegram: Сообщение отправлено успешно');
            console.log(`   • ID сообщения: ${data.result.message_id}`);
            console.log(`   • Чат: ${data.result.chat.title || 'Личный чат'}`);
            console.log(`   • Дата: ${new Date(data.result.date * 1000).toLocaleString()}`);
            
            // Обновляем статистику
            if (window.DEBUG_DATA) {
                window.DEBUG_DATA.telegramTests++;
                window.DEBUG_DATA.lastTelegramTest = new Date();
                addToDebugHistory('Telegram-тест', `Сообщение #${data.result.message_id} отправлено`);
            }
            
            // Тест 3: Проверка webhook (если настроен)
            if (window.TEST_CONFIG.telegram.webhook) {
                console.log('3. Проверка webhook...');
                await testTelegramWebhook();
            }
            
            showDebugNotification('Telegram', 'Тестовое сообщение отправлено', 'success');
            console.groupEnd();
            return true;
        } else {
            console.error('❌ Telegram: Ошибка отправки:', data.description);
            showDebugNotification('Ошибка Telegram', data.description, 'error');
            console.groupEnd();
            return false;
        }
    } catch (error) {
        console.error('❌ Telegram: Ошибка сети:', error.message);
        showDebugNotification('Ошибка сети', error.message, 'error');
        console.groupEnd();
        return false;
    }
};

/**
 * Тестирование webhook Telegram
 */
async function testTelegramWebhook() {
    const token = window.TEST_CONFIG.telegram.botToken;
    
    try {
        // Получаем информацию о webhook
        const url = `https://api.telegram.org/bot${token}/getWebhookInfo`;
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.ok) {
            const webhookInfo = data.result;
            console.log('   • Webhook URL:', webhookInfo.url || 'Не настроен');
            console.log('   • Ожидающих обновлений:', webhookInfo.pending_update_count);
            console.log('   • Последняя ошибка:', webhookInfo.last_error_date ? 
                new Date(webhookInfo.last_error_date * 1000).toLocaleString() : 'Нет');
            
            return webhookInfo.url && webhookInfo.url.length > 0;
        }
    } catch (error) {
        console.error('   • Ошибка проверки webhook:', error.message);
        return false;
    }
}

// ====================================================================
// ИНТЕРФЕЙС ОТЛАДКИ
// ====================================================================

/**
 * Добавление интерфейса отладки
 */
window.addDebugInterface = function() {
    console.log('🎨 Добавление интерфейса отладки...');
    
    // Создаем контейнер для отладочной панели
    const debugPanel = document.createElement('div');
    debugPanel.id = 'debug-panel';
    debugPanel.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #2c3e50, #34495e);
        color: white;
        border-radius: 12px;
        padding: 15px;
        z-index: 9999;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        font-family: -apple-system, BlinkMacSystemFont, sans-serif;
        max-width: 300px;
        border: 2px solid #3498db;
        display: none;
        animation: slideInRight 0.5s ease;
    `;
    
    debugPanel.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
            <h3 style="margin: 0; font-size: 16px; display: flex; align-items: center; gap: 8px;">
                <i class="fas fa-bug"></i> Панель отладки
            </h3>
            <button id="debug-close" style="background: none; border: none; color: white; cursor: pointer; font-size: 18px;">
                <i class="fas fa-times"></i>
            </button>
        </div>
        
        <div style="margin-bottom: 15px;">
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; margin-bottom: 10px;">
                <div class="debug-stat">
                    <div style="font-size: 12px; opacity: 0.8;">Версия</div>
                    <div style="font-weight: bold;">${window.PROJECT_INFO.version}</div>
                </div>
                <div class="debug-stat">
                    <div style="font-size: 12px; opacity: 0.8;">Telegram</div>
                    <div id="telegram-status" style="font-weight: bold; color: #2ecc71;">✅</div>
                </div>
                <div class="debug-stat">
                    <div style="font-size: 12px; opacity: 0.8;">Античит</div>
                    <div style="font-weight: bold; color: #e74c3c;">${window.TEST_CONFIG.anticheat.password}</div>
                </div>
                <div class="debug-stat">
                    <div style="font-size: 12px; opacity: 0.8;">Вопросы</div>
                    <div style="font-weight: bold;">${window.questionsBank.length}</div>
                </div>
            </div>
        </div>
        
        <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 15px;">
            <button class="debug-btn" onclick="window.showSystemInfo()" style="background: #3498db;">
                <i class="fas fa-info-circle"></i> Информация
            </button>
            <button class="debug-btn" onclick="window.runAutomaticTests()" style="background: #2ecc71;">
                <i class="fas fa-play"></i> Тесты системы
            </button>
            <button class="debug-btn" onclick="window.testTelegramComprehensive()" style="background: #9b59b6;">
                <i class="fab fa-telegram"></i> Тест Telegram
            </button>
            <button class="debug-btn" onclick="window.runAnticheatTest()" style="background: #e74c3c;">
                <i class="fas fa-shield-alt"></i> Тест античитов
            </button>
        </div>
        
        <div style="font-size: 12px; opacity: 0.7; text-align: center; padding-top: 10px; border-top: 1px solid rgba(255,255,255,0.1);">
            <i class="fas fa-clock"></i> Загружено: ${new Date().toLocaleTimeString()}
        </div>
    `;
    
    document.body.appendChild(debugPanel);
    
    // Создаем кнопку для показа/скрытия панели
    const toggleButton = document.createElement('button');
    toggleButton.id = 'debug-toggle';
    toggleButton.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #e74c3c, #c0392b);
        color: white;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: none;
        font-size: 20px;
        cursor: pointer;
        z-index: 9998;
        box-shadow: 0 4px 15px rgba(231, 76, 60, 0.4);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s;
    `;
    toggleButton.innerHTML = '<i class="fas fa-bug"></i>';
    toggleButton.title = 'Показать панель отладки';
    
    toggleButton.addEventListener('click', function() {
        const panel = document.getElementById('debug-panel');
        if (panel.style.display === 'block') {
            panel.style.display = 'none';
            this.innerHTML = '<i class="fas fa-bug"></i>';
            this.title = 'Показать панель отладки';
        } else {
            panel.style.display = 'block';
            this.innerHTML = '<i class="fas fa-times"></i>';
            this.title = 'Скрыть панель отладки';
        }
    });
    
    document.body.appendChild(toggleButton);
    
    // Закрытие панели
    document.getElementById('debug-close').addEventListener('click', function() {
        document.getElementById('debug-panel').style.display = 'none';
        toggleButton.innerHTML = '<i class="fas fa-bug"></i>';
        toggleButton.title = 'Показать панель отладки';
    });
    
    // Стили для кнопок и статистики
    const style = document.createElement('style');
    style.textContent = `
        .debug-btn {
            padding: 10px;
            border: none;
            border-radius: 8px;
            color: white;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            font-size: 13px;
        }
        
        .debug-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            opacity: 0.9;
        }
        
        .debug-stat {
            background: rgba(255,255,255,0.1);
            padding: 8px;
            border-radius: 6px;
            text-align: center;
        }
        
        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(50px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }
        
        #debug-toggle:hover {
            animation: pulse 1s infinite;
        }
    `;
    
    document.head.appendChild(style);
    
    // Проверяем статус Telegram
    updateTelegramStatus();
    
    console.log('✅ Интерфейс отладки добавлен');
};

/**
 * Обновление статуса Telegram в интерфейсе
 */
async function updateTelegramStatus() {
    const statusElement = document.getElementById('telegram-status');
    if (!statusElement) return;
    
    const token = window.TEST_CONFIG.telegram.botToken;
    
    if (!token || token === 'DEMO_TOKEN_DEBUG_ONLY') {
        statusElement.innerHTML = '❌';
        statusElement.title = 'Токен не настроен';
        return;
    }
    
    try {
        const url = `https://api.telegram.org/bot${token}/getMe`;
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.ok) {
            statusElement.innerHTML = '✅';
            statusElement.title = `Бот: ${data.result.first_name} (@${data.result.username})`;
            statusElement.style.color = '#2ecc71';
        } else {
            statusElement.innerHTML = '❌';
            statusElement.title = `Ошибка: ${data.description}`;
            statusElement.style.color = '#e74c3c';
        }
    } catch (error) {
        statusElement.innerHTML = '⚠️';
        statusElement.title = `Ошибка сети: ${error.message}`;
        statusElement.style.color = '#f39c12';
    }
}

/**
 * Добавление стилей для отладки
 */
function addDebugStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .debug-notification {
            position: fixed;
            top: 80px;
            right: 20px;
            background: white;
            border-radius: 10px;
            padding: 15px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.15);
            z-index: 10000;
            max-width: 300px;
            animation: slideDown 0.3s ease;
            border-left: 4px solid #3498db;
        }
        
        .debug-notification.success {
            border-left-color: #2ecc71;
        }
        
        .debug-notification.warning {
            border-left-color: #f39c12;
        }
        
        .debug-notification.error {
            border-left-color: #e74c3c;
        }
        
        .debug-notification h4 {
            margin: 0 0 8px 0;
            font-size: 14px;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        .debug-notification p {
            margin: 0;
            font-size: 12px;
            color: #666;
        }
        
        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    
    document.head.appendChild(style);
}

/**
 * Показать отладочное уведомление
 */
function showDebugNotification(title, message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `debug-notification ${type}`;
    
    const icon = type === 'success' ? '✅' : 
                 type === 'warning' ? '⚠️' : 
                 type === 'error' ? '❌' : 'ℹ️';
    
    notification.innerHTML = `
        <h4>${icon} ${title}</h4>
        <p>${message}</p>
    `;
    
    document.body.appendChild(notification);
    
    // Автоматическое скрытие
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

/**
 * Добавить запись в историю отладки
 */
function addToDebugHistory(action, details) {
    if (!window.DEBUG_DATA) return;
    
    const entry = {
        timestamp: new Date().toISOString(),
        action: action,
        details: details,
        page: window.location.pathname
    };
    
    window.DEBUG_DATA.history.push(entry);
    
    // Ограничиваем историю 50 записями
    if (window.DEBUG_DATA.history.length > 50) {
        window.DEBUG_DATA.history.shift();
    }
    
    console.log(`📝 История: ${action} - ${details}`);
}

// ====================================================================
// ПРОВЕРКА СИСТЕМНЫХ ВОЗМОЖНОСТЕЙ
// ====================================================================

/**
 * Проверка всех системных возможностей
 */
window.checkSystemCapabilities = function() {
    console.group('🔍 ПРОВЕРКА СИСТЕМНЫХ ВОЗМОЖНОСТЕЙ');
    
    const capabilities = {
        // Браузерные API
        localStorage: 'localStorage' in window,
        sessionStorage: 'sessionStorage' in window,
        geolocation: 'geolocation' in navigator,
        vibration: 'vibrate' in navigator,
        clipboard: 'clipboard' in navigator,
        offline: 'onLine' in navigator,
        
        // JavaScript возможности
        es6: {
            arrowFunctions: () => { return true; },
            promises: 'Promise' in window,
            asyncAwait: 'async' in window,
            templateLiterals: true,
            destructuring: true
        },
        
        // Веб API
        fetch: 'fetch' in window,
        webSockets: 'WebSocket' in window,
        webWorkers: 'Worker' in window,
        serviceWorkers: 'serviceWorker' in navigator,
        
        // CSS возможности
        flexbox: 'flexBasis' in document.documentElement.style,
        grid: 'grid' in document.documentElement.style,
        transforms: 'transform' in document.documentElement.style,
        transitions: 'transition' in document.documentElement.style,
        
        // Размер экрана
        screen: {
            width: window.screen.width,
            height: window.screen.height,
            orientation: window.screen.orientation ? window.screen.orientation.type : 'unknown',
            pixelRatio: window.devicePixelRatio
        },
        
        // Производительность
        performance: 'performance' in window,
        memory: 'memory' in performance,
        hardwareConcurrency: 'hardwareConcurrency' in navigator
    };
    
    // Выводим результаты
    console.log('🌐 Браузерные API:');
    Object.entries(capabilities).forEach(([key, value]) => {
        if (typeof value === 'boolean') {
            console.log(`   • ${key}: ${value ? '✅' : '❌'}`);
        }
    });
    
    console.log('📱 Размер экрана:');
    console.log(`   • Ширина: ${capabilities.screen.width}px`);
    console.log(`   • Высота: ${capabilities.screen.height}px`);
    console.log(`   • Плотность пикселей: ${capabilities.screen.pixelRatio}`);
    console.log(`   • Ориентация: ${capabilities.screen.orientation}`);
    
    if (capabilities.performance) {
        console.log('⚡ Производительность:');
        const timing = performance.timing;
        const loadTime = timing.loadEventEnd - timing.navigationStart;
        console.log(`   • Время загрузки: ${loadTime}ms`);
        
        if (capabilities.memory) {
            const memory = performance.memory;
            console.log(`   • Использовано памяти: ${Math.round(memory.usedJSHeapSize / 1024 / 1024)}MB`);
            console.log(`   • Всего памяти: ${Math.round(memory.totalJSHeapSize / 1024 / 1024)}MB`);
        }
    }
    
    if (capabilities.hardwareConcurrency) {
        console.log(`   • Ядер процессора: ${navigator.hardwareConcurrency}`);
    }
    
    console.groupEnd();
    
    return capabilities;
};

// ====================================================================
// АВТОМАТИЧЕСКАЯ ЗАГРУЗКА И ИНИЦИАЛИЗАЦИЯ
// ====================================================================

// Вывод информации при загрузке
console.log('===============================================');
console.log('🔧 КОМПЛЕКСНЫЙ ОТЛАДОЧНЫЙ ТЕСТ v8.0');
console.log('===============================================');
console.log('📋 Система:', window.PROJECT_INFO.name);
console.log('🚀 Версия:', window.PROJECT_INFO.version);
console.log('📅 Дата:', new Date().toLocaleString());
console.log('🌐 URL:', window.location.href);
console.log('===============================================');

// Автоматическая инициализация отладочного режима
setTimeout(() => {
    window.initDebugMode();
    
    // Добавляем информацию в консоль для разработчика
    console.log('💡 Доступные команды отладки:');
    console.log('   • window.showSystemInfo() - полная информация');
    console.log('   • window.runAutomaticTests() - автоматические тесты');
    console.log('   • window.testTelegramComprehensive() - тест Telegram');
    console.log('   • window.testAnticheatSystem() - проверка античитов');
    console.log('   • window.runAnticheatTest() - запуск теста античитов');
    console.log('   • window.checkSystemCapabilities() - возможности системы');
    console.log('   • window.addDebugInterface() - показать интерфейс отладки');
    console.log('');
    console.log('🎮 Для быстрого доступа используйте кнопку 🐛 в правом верхнем углу');
}, 1000);

// Обработка ошибок для отладки
window.addEventListener('error', function(event) {
    console.error('🚨 Необработанная ошибка:', event.error);
    
    if (window.DEBUG_DATA) {
        addToDebugHistory('Ошибка', `${event.error.name}: ${event.error.message}`);
    }
});

// Экспорт для глобального использования
window.debugTestConfig = window.TEST_CONFIG;
window.debugQuestions = window.questionsBank;
window.debugProblems = window.problemsBank;

console.log('✅ Отладочный тест загружен и готов к использованию!');
console.log('👉 Введите "debug" на главной странице для запуска.');
console.log('👉 Используйте панель отладки (кнопка 🐛) для тестирования.');