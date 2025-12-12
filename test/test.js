// Тестовый конфиг для проверки
window.TEST_CONFIG = {
    title: "Тестовый тест",
    totalQuestions: 5,
    totalProblems: 2,
    maxScore: 11,
    telegram: {
        botToken: "8344281396:AAGZ9-M2XRyPMHiI2akBSSIN7QAtRGDmLOY",
        chatId: "1189539923"
    },
    gradingScale: {
        5: 10,
        4: 8,
        3: 5,
        2: 0
    }
};

// Тестовые вопросы
window.questionsBank = [
    { text: "Вопрос 1: Что такое HTML?", options: [{t:"Язык разметки", v:"correct"},{t:"Язык программирования", v:"wrong"},{t:"База данных", v:"wrong"},{t:"Операционная система", v:"wrong"}], points: 1 },
    { text: "Вопрос 2: Что такое CSS?", options: [{t:"Язык разметки", v:"wrong"},{t:"Язык стилей", v:"correct"},{t:"База данных", v:"wrong"},{t:"Фреймворк", v:"wrong"}], points: 1 },
    { text: "Вопрос 3: Что такое JavaScript?", options: [{t:"Язык разметки", v:"wrong"},{t:"Язык стилей", v:"wrong"},{t:"Язык программирования", v:"correct"},{t:"База данных", v:"wrong"}], points: 1 },
    { text: "Вопрос 4: Какой тег для заголовка?", options: [{t:"<p>", v:"wrong"},{t:"<div>", v:"wrong"},{t:"<h1>", v:"correct"},{t:"<span>", v:"wrong"}], points: 1 },
    { text: "Вопрос 5: Какой тег для ссылки?", options: [{t:"<a>", v:"correct"},{t:"<link>", v:"wrong"},{t:"<url>", v:"wrong"},{t:"<href>", v:"wrong"}], points: 1 }
];

// Тестовые задачи
window.problemsBank = [
    { text: "Задача 1: 2 + 2 = ?", options: [{t:"3", v:"wrong"},{t:"4", v:"correct"},{t:"5", v:"wrong"},{t:"6", v:"wrong"}], points: 3 },
    { text: "Задача 2: 3 × 3 = ?", options: [{t:"6", v:"wrong"},{t:"9", v:"correct"},{t:"12", v:"wrong"},{t:"15", v:"wrong"}], points: 3 }
];

console.log('test.js загружен успешно!');