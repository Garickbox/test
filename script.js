// Глобальные переменные
let currentQuestionIndex = 0;
let totalScore = 0;
let userAnswers = [];
let shuffledQuestionsAndProblems = [];
let isSubmitted = false;
let isShowingAnswer = false;
let currentShuffledOptions = [];

// Кэшируем DOM
const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');
const questionText = document.getElementById('question-text');
const questionType = document.getElementById('question-type');
const optionsContainer = document.getElementById('options-container');
const confirmBtn = document.getElementById('confirm-btn');
const resetBtn = document.getElementById('reset-btn');
const resultsDiv = document.getElementById('results');
const scoreValue = document.getElementById('score-value');
const gradeValue = document.getElementById('grade-value');
const pointsBreakdown = document.getElementById('points-breakdown');
const telegramStatus = document.getElementById('telegram-status');
const studentNameInput = document.getElementById('student-name');
const studentClassSelect = document.getElementById('student-class');
const fullscreenResult = document.getElementById('fullscreen-result');
const fullscreenGrade = document.getElementById('fullscreen-grade');
const fullscreenScore = document.getElementById('fullscreen-score');
const fullscreenBreakdown = document.getElementById('fullscreen-breakdown');
const finishBtn = document.getElementById('finish-btn');
const startTestBtn = document.getElementById('start-test-btn');
const studentInfoSection = document.getElementById('student-info-section');
const testContent = document.getElementById('test-content');

// Используем данные из загруженного теста
const TEST_CONFIG = window.TEST_CONFIG || {
    title: "Тест по умолчанию",
    totalQuestions: 21,
    totalProblems: 3,
    maxScore: 30,
    telegram: {
        botToken: "8344281396:AAGZ9-M2XRyPMHiI2akBSSIN7QAtRGDmLOY",
        chatId: "1189539923"
    },
    gradingScale: {
        5: 27,
        4: 22,
        3: 10,
        2: 0
    }
};

// Используем банки вопросов или пустые массивы
const questionsBank = window.questionsBank || [];
const problemsBank = window.problemsBank || [];

// Обновляем заголовок страницы
if (TEST_CONFIG.title) {
    document.title = TEST_CONFIG.title;
    if (document.getElementById('test-title')) {
        document.getElementById('test-title').textContent = TEST_CONFIG.title;
    }
}

// Функция для перемешивания массива
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Инициализация контрольной работы
function initTest() {
    if (questionsBank.length === 0 || problemsBank.length === 0) {
        alert('Ошибка: данные теста не загружены.');
        return;
    }
    
    const totalNeededQuestions = TEST_CONFIG.totalQuestions || 21;
    const totalNeededProblems = TEST_CONFIG.totalProblems || 3;
    
    // Выбираем случайные вопросы и задачи
    const selectedQuestions = shuffleArray([...questionsBank]).slice(0, totalNeededQuestions);
    const selectedProblems = shuffleArray([...problemsBank]).slice(0, totalNeededProblems);
    
    // Объединяем вопросы и задачи
    shuffledQuestionsAndProblems = [...selectedQuestions, ...selectedProblems];
    shuffledQuestionsAndProblems = shuffleArray(shuffledQuestionsAndProblems);
    
    // Сбрасываем состояние
    currentQuestionIndex = 0;
    totalScore = 0;
    userAnswers = Array(shuffledQuestionsAndProblems.length).fill(null);
    isSubmitted = false;
    isShowingAnswer = false;
    currentShuffledOptions = [];
    
    // Сбрасываем UI
    confirmBtn.disabled = false;
    if (resultsDiv) resultsDiv.style.display = 'none';
    if (fullscreenResult) fullscreenResult.style.display = 'none';
    
    showQuestion(0);
}

// Показать вопрос/задачу
function showQuestion(index) {
    const item = shuffledQuestionsAndProblems[index];
    questionText.textContent = item.text;
    
    if (item.points === 3) {
        questionType.textContent = "Задача (3 балла)";
        questionType.className = "question-type problem-type";
    } else {
        questionType.textContent = "Теоретический вопрос (1 балл)";
        questionType.className = "question-type";
    }
    
    currentShuffledOptions = shuffleArray([...item.options]);
    
    optionsContainer.innerHTML = '';
    currentShuffledOptions.forEach((option, i) => {
        const label = document.createElement('label');
        label.className = 'option-label';
        if (userAnswers[index] === option.v) {
            label.classList.add('selected');
        }
        
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'option';
        radio.value = option.v;
        radio.disabled = isShowingAnswer;
        
        label.appendChild(radio);
        label.appendChild(document.createTextNode(option.t));
        
        if (!isShowingAnswer) {
            label.addEventListener('click', () => {
                document.querySelectorAll('.option-label').forEach(l => l.classList.remove('selected'));
                label.classList.add('selected');
                radio.checked = true;
                confirmBtn.disabled = false;
            });
        }
        
        optionsContainer.appendChild(label);
    });
    
    updateProgress();
}

// Подсветка правильного ответа
function highlightCorrectAnswer() {
    const options = optionsContainer.querySelectorAll('.option-label');
    
    options.forEach((option, index) => {
        const radio = option.querySelector('input');
        if (currentShuffledOptions[index].v === 'correct') {
            option.classList.add('correct');
        } else if (radio.checked && currentShuffledOptions[index].v === 'wrong') {
            option.classList.add('incorrect');
        }
        
        radio.disabled = true;
    });
}

// Обновление прогресса
function updateProgress() {
    const percent = ((currentQuestionIndex + 1) / shuffledQuestionsAndProblems.length) * 100;
    progressBar.style.width = `${percent}%`;
    progressText.textContent = `Вопрос ${currentQuestionIndex + 1} из ${shuffledQuestionsAndProblems.length}`;
}

// Подтверждение ответа
function confirmAnswer() {
    const selectedOption = document.querySelector('input[name="option"]:checked');
    if (!selectedOption) {
        alert('Выберите вариант ответа');
        return;
    }
    
    userAnswers[currentQuestionIndex] = selectedOption.value;
    
    confirmBtn.disabled = true;
    isShowingAnswer = true;
    
    highlightCorrectAnswer();
    
    setTimeout(() => {
        isShowingAnswer = false;
        
        if (currentQuestionIndex < shuffledQuestionsAndProblems.length - 1) {
            currentQuestionIndex++;
            showQuestion(currentQuestionIndex);
            confirmBtn.disabled = true;
        } else {
            finishTest();
        }
    }, 2000);
}

// Завершение контрольной работы
function finishTest() {
    totalScore = 0;
    let questionScore = 0;
    let problemScore = 0;
    let correctQuestions = 0;
    let correctProblems = 0;
    
    // Подсчитываем баллы
    for (let i = 0; i < shuffledQuestionsAndProblems.length; i++) {
        const item = shuffledQuestionsAndProblems[i];
        if (userAnswers[i] === 'correct') {
            totalScore += item.points;
            if (item.points === 1) {
                questionScore += 1;
                correctQuestions++;
            } else if (item.points === 3) {
                problemScore += 3;
                correctProblems++;
            }
        }
    }
    
    const grade = getGrade(totalScore);
    const maxScore = TEST_CONFIG.maxScore || 30;
    const totalQuestions = TEST_CONFIG.totalQuestions || 21;
    const totalProblems = TEST_CONFIG.totalProblems || 3;
    
    // Обновляем полноэкранный результат
    if (fullscreenResult && fullscreenGrade && fullscreenScore && fullscreenBreakdown) {
        fullscreenGrade.textContent = grade;
        fullscreenScore.textContent = totalScore;
        fullscreenBreakdown.innerHTML = `
            <div>Правильных вопросов: ${correctQuestions}/${totalQuestions} (${questionScore} баллов)</div>
            <div>Правильных задач: ${correctProblems}/${totalProblems} (${problemScore} баллов)</div>
        `;
        fullscreenResult.style.display = 'flex';
    }
    
    // Обновляем обычный результат
    if (scoreValue && gradeValue && pointsBreakdown) {
        scoreValue.textContent = totalScore;
        gradeValue.textContent = grade;
        pointsBreakdown.innerHTML = `
            <div>Правильных вопросов: ${correctQuestions} из ${totalQuestions} (${questionScore} баллов)</div>
            <div>Правильных задач: ${correctProblems} из ${totalProblems} (${problemScore} баллов)</div>
            <div>Всего баллов: ${totalScore} из ${maxScore}</div>
        `;
    }
    
    sendResultsToTelegram(totalScore, grade, correctQuestions, correctProblems, questionScore, problemScore);
}

// Получение оценки по баллам
function getGrade(score) {
    const scale = TEST_CONFIG.gradingScale || {5: 27, 4: 22, 3: 10, 2: 0};
    if (score >= scale[5]) return 5;
    if (score >= scale[4]) return 4;
    if (score >= scale[3]) return 3;
    return 2;
}

// Отправка в Telegram
async function sendTelegramMessage(botToken, chatId, text) {
    const resp = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'Markdown' })
    });
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    const data = await resp.json();
    if (!data.ok) throw new Error(data.description);
}

// Отправка результатов
async function sendResultsToTelegram(score, grade, correctQuestions, correctProblems, questionScore, problemScore) {
    if (isSubmitted) return;
    
    const name = studentNameInput ? studentNameInput.value.trim() : '';
    const klass = studentClassSelect ? studentClassSelect.value : '';
    
    if (!name || !klass) {
        console.log('Имя или класс не заполнены, пропускаем отправку в Telegram');
        return;
    }
    
    try {
        const now = new Date().toLocaleString('ru-RU');
        const maxScore = TEST_CONFIG.maxScore || 30;
        const totalQuestions = TEST_CONFIG.totalQuestions || 21;
        const totalProblems = TEST_CONFIG.totalProblems || 3;
        
        let msg = `⚡ Результаты контрольной работы:

👤 Студент: ${name}
🏫 Класс: ${klass}
🎯 Баллы: ${score}/${maxScore} (${Math.round(score/maxScore*100)}%)
📝 Оценка: ${grade}

Детализация:
📖 Правильных вопросов: ${correctQuestions}/${totalQuestions} (${questionScore} баллов)
📐 Правильных задач: ${correctProblems}/${totalProblems} (${problemScore} баллов)

📅 Дата: ${now}`;
        
        await sendTelegramMessage(TEST_CONFIG.telegram.botToken, TEST_CONFIG.telegram.chatId, msg);
        console.log('Результаты отправлены в Telegram');
    } catch (err) {
        console.error('Ошибка отправки в Telegram:', err);
    }
    
    isSubmitted = true;
}

// Завершение полноэкранного режима
function finishFullScreen() {
    console.log('=== finishFullScreen вызвана ===');
    
    // Скрываем полноэкранный результат
    if (fullscreenResult) {
        fullscreenResult.style.display = 'none';
    }
    
    // Показываем блок результатов
    if (resultsDiv) {
        resultsDiv.style.display = 'block';
        if (testContent) testContent.style.display = 'block';
    }
    
    // Показываем сообщение о статусе отправки
    if (telegramStatus) {
        telegramStatus.textContent = 'Результаты отправлены учителю!';
        telegramStatus.className = 'success';
        telegramStatus.style.display = 'block';
    }
    
    console.log('Сообщение показано, начинаю таймер для перенаправления...');
    
    // Через 5 секунд перенаправляем на главную страницу
    setTimeout(() => {
        console.log('Таймер сработал, перенаправляю...');
        window.location.href = 'index.html';
    }, 5000);
}

// Сброс контрольной работы
function resetAll() {
    if (!confirm('Сбросить всю контрольную работу? Весь прогресс будет потерян.')) return;
    
    if (studentInfoSection) studentInfoSection.style.display = 'block';
    if (testContent) testContent.style.display = 'none';
    
    if (studentNameInput) studentNameInput.value = '';
    if (studentClassSelect) studentClassSelect.value = '';
}

// Валидация формы
function validateForm() {
    const name = studentNameInput ? studentNameInput.value.trim() : '';
    const klass = studentClassSelect ? studentClassSelect.value : '';
    if (!name) { alert('Введите имя'); return false; }
    if (!klass) { alert('Выберите класс'); return false; }
    return true;
}

// Начало контрольной работы
function startTest() {
    if (!validateForm()) return;
    
    if (studentInfoSection) studentInfoSection.style.display = 'none';
    if (testContent) testContent.style.display = 'block';
    
    initTest();
}

// Инициализация
window.onload = function () {
    console.log('Скрипт загружен, инициализирую обработчики...');
    console.log('Загружен тест:', TEST_CONFIG.title);
    console.log('Вопросов:', questionsBank.length, 'Задач:', problemsBank.length);
    
    // Проверяем наличие всех необходимых элементов
    if (!startTestBtn) console.error('startTestBtn не найден');
    if (!confirmBtn) console.error('confirmBtn не найден');
    if (!resetBtn) console.error('resetBtn не найден');
    if (!finishBtn) console.error('finishBtn не найден');
    
    // Добавляем обработчики событий
    if (startTestBtn) {
        startTestBtn.addEventListener('click', startTest);
        console.log('Обработчик startTestBtn добавлен');
    }
    
    if (confirmBtn) {
        confirmBtn.addEventListener('click', confirmAnswer);
        console.log('Обработчик confirmBtn добавлен');
    }
    
    if (resetBtn) {
        resetBtn.addEventListener('click', resetAll);
        console.log('Обработчик resetBtn добавлен');
    }
    
    // Проверяем, что кнопка finishBtn существует
    if (finishBtn) {
        console.log('Кнопка finishBtn найдена, добавляю обработчик');
        finishBtn.addEventListener('click', finishFullScreen);
    } else {
        console.error('Кнопка finishBtn не найдена! Проверьте HTML');
    }
    
    // Обработка клавиши Escape для выхода из полноэкранного режима
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && fullscreenResult && fullscreenResult.style.display === 'flex') {
            finishFullScreen();
        }
    });
    
    // Фокус на поле имени при загрузке
    if (studentNameInput) {
        studentNameInput.focus();
    }
    
    // Проверяем наличие данных теста
    if (questionsBank.length === 0 || problemsBank.length === 0) {
        console.warn('Данные теста не загружены или пусты');
        if (studentInfoSection) {
            studentInfoSection.style.display = 'none';
        }
        if (testContent) {
            testContent.innerHTML = '<h2>Ошибка загрузки теста</h2><p>Данные теста не загружены. Проверьте код теста.</p>';
            testContent.style.display = 'block';
        }
    }
};