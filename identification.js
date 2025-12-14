// ===============================================
// СИСТЕМА ИДЕНТИФИКАЦИИ УЧЕНИКОВ
// ВЕРСИЯ 2.0 - С улучшенным сохранением между тестами
// ===============================================

window.selectedStudent = null;

class StudentIdentification {
  constructor() {
    this.init();
  }
  
  init() {
    this.createIdentificationForm();
    this.setupEventListeners();
    this.checkPreviousSession();
  }
  
  createIdentificationForm() {
    const identificationHTML = `
      <div class="section" id="student-info-section">
        <div class="section-title">
          <i class="fas fa-user-graduate"></i> Идентификация ученика
        </div>
        
        <div class="student-search">
          <div class="input-group">
            <label for="student-last-name"><i class="fas fa-signature"></i> Фамилия:</label>
            <input type="text" id="student-last-name" placeholder="Например: Иванов" autocomplete="off">
          </div>
          
          <div class="input-group">
            <label for="student-first-name"><i class="fas fa-user"></i> Имя:</label>
            <input type="text" id="student-first-name" placeholder="Например: Иван" autocomplete="off">
          </div>
          
          <div class="input-group">
            <label for="student-class"><i class="fas fa-school"></i> Класс:</label>
            <select id="student-class">
              <option value="">Выберите класс</option>
              <option value="7">7 класс</option>
              <option value="8">8 класс</option>
              <option value="9">9 класс</option>
              <option value="10">10 класс</option>
              <option value="11">11 класс</option>
            </select>
          </div>
          
          <div class="search-actions">
            <button id="find-student-btn" class="search-btn">
              <i class="fas fa-search"></i> Найти меня
            </button>
            
            <button id="admin-login-btn" class="admin-btn">
              <i class="fas fa-user-shield"></i> Вход для учителя
            </button>
          </div>
        </div>
        
        <div id="search-results" class="search-results" style="display: none;">
          <h3><i class="fas fa-users"></i> Результаты поиска:</h3>
          <div id="students-list" class="students-list"></div>
        </div>
        
        <div id="admin-login-form" class="admin-login-form" style="display: none;">
          <h3><i class="fas fa-lock"></i> Вход для администратора</h3>
          
          <div class="input-group">
            <label for="admin-class">Класс:</label>
            <select id="admin-class">
              <option value="7">7 класс</option>
              <option value="8">8 класс</option>
              <option value="9">9 класс</option>
              <option value="10">10 класс</option>
              <option value="11">11 класс</option>
            </select>
          </div>
          
          <div class="input-group">
            <label for="admin-password">Пароль:</label>
            <input type="password" id="admin-password" placeholder="Введите пароль">
          </div>
          
          <div class="admin-actions">
            <button id="admin-login-confirm" class="admin-confirm-btn">
              <i class="fas fa-sign-in-alt"></i> Войти
            </button>
            <button id="admin-login-cancel" class="admin-cancel-btn">
              <i class="fas fa-times"></i> Отмена
            </button>
          </div>
          
          <div class="admin-hint">
            <p><i class="fas fa-info-circle"></i> Для входа используйте пароль, полученный от администратора школы.</p>
          </div>
        </div>
        
        <button class="start-test-btn test-btn winter-btn" id="start-test-btn" disabled>
          <i class="fas fa-play-circle"></i> Начать контрольную
        </button>
      </div>
    `;
    
    const testContent = document.getElementById('test-content');
    if (testContent) {
      testContent.insertAdjacentHTML('beforebegin', identificationHTML);
    }
  }
  
  setupEventListeners() {
    document.getElementById('find-student-btn').addEventListener('click', () => this.findStudent());
    document.getElementById('admin-login-btn').addEventListener('click', () => this.showAdminLogin());
    document.getElementById('admin-login-confirm').addEventListener('click', () => this.adminLogin());
    document.getElementById('admin-login-cancel').addEventListener('click', () => this.hideAdminLogin());
    
    ['student-last-name', 'student-first-name'].forEach(id => {
      document.getElementById(id).addEventListener('keypress', (e) => {
        if (e.key === 'Enter') this.findStudent();
      });
    });
    
    document.getElementById('start-test-btn').addEventListener('click', () => {
      if (window.selectedStudent) {
        this.startTestWithSelectedStudent();
      }
    });
  }
  
  findStudent() {
    const lastName = document.getElementById('student-last-name').value.trim();
    const firstName = document.getElementById('student-first-name').value.trim();
    const className = document.getElementById('student-class').value;
    
    if (!lastName || !firstName) {
      alert('⚠️ Пожалуйста, введите фамилию и имя');
      return;
    }
    
    if (!className) {
      alert('⚠️ Пожалуйста, выберите класс');
      return;
    }
    
    const results = window.SCHOOL_DATABASE.searchStudents(lastName, firstName, className);
    
    if (results.length > 0) {
      this.showSearchResults(results, { lastName, firstName, className });
    } else {
      this.showNoResults({ lastName, firstName, className });
    }
  }
  
  showSearchResults(results, userInput) {
    const resultsDiv = document.getElementById('search-results');
    const studentsList = document.getElementById('students-list');
    
    studentsList.innerHTML = '';
    
    const topResults = results.slice(0, 3);
    
    topResults.forEach((result) => {
      const student = result.student;
      const matchPercent = Math.round(result.scores.total * 100);
      
      const studentItem = document.createElement('div');
      studentItem.className = 'student-item';
      studentItem.innerHTML = `
        <div class="student-info">
          <div class="student-name">
            <strong>${student.lastName} ${student.firstName}</strong>
          </div>
          <div class="student-class">
            Класс: ${student.class}
            ${student.isAdmin ? '<span class="admin-badge">👑 Админ</span>' : ''}
          </div>
        </div>
        <div class="student-match">
          <div class="match-percent">${matchPercent}% совпадение</div>
          <button class="select-student-btn" data-id="${student.id}">
            <i class="fas fa-check"></i> Это я
          </button>
        </div>
      `;
      
      studentsList.appendChild(studentItem);
      
      studentItem.querySelector('.select-student-btn').addEventListener('click', () => {
        this.selectStudent(student.id, userInput);
      });
    });
    
    if (results.length > 3) {
      const showMore = document.createElement('div');
      showMore.className = 'show-more';
      showMore.innerHTML = `
        <p>и ещё ${results.length - 3} похожих результатов...</p>
        <button id="show-all-results">Показать все</button>
      `;
      studentsList.appendChild(showMore);
      
      document.getElementById('show-all-results').addEventListener('click', () => {
        this.showAllResults(results, userInput);
      });
    }
    
    resultsDiv.style.display = 'block';
    document.getElementById('admin-login-form').style.display = 'none';
  }
  
  selectStudent(studentId, userInput) {
    const student = window.SCHOOL_DATABASE.getStudentById(studentId);
    
    if (!student) {
      alert('Ошибка: ученик не найден');
      return;
    }
    
    if (student.isAdmin) {
      document.getElementById('admin-class').value = student.class;
      this.showAdminLogin();
      return;
    }
    
    window.selectedStudent = {
      id: student.id,
      lastName: student.lastName,
      firstName: student.firstName,
      class: student.class,
      isAdmin: false
    };
    
    // ВАЖНОЕ ИСПРАВЛЕНИЕ: Сохраняем ученика сразу при выборе
    this.saveStudentToLocalStorage();
    
    this.showIdentificationSuccess(student);
    
    document.getElementById('start-test-btn').disabled = false;
    document.getElementById('start-test-btn').innerHTML = `
      <i class="fas fa-play-circle"></i> Начать контрольную (${student.firstName} ${student.lastName})
    `;
  }
  
  showIdentificationSuccess(student) {
    const resultsDiv = document.getElementById('search-results');
    
    resultsDiv.innerHTML = `
      <div class="success-identification">
        <div class="success-icon">
          <i class="fas fa-check-circle"></i>
        </div>
        <h3 style="color: #4CAF50;">Успешно идентифицирован!</h3>
        <div class="identified-student">
          <div class="student-card">
            <div class="student-avatar">
              ${student.firstName.charAt(0)}${student.lastName.charAt(0)}
            </div>
            <div class="student-details">
              <h4>${student.lastName} ${student.firstName}</h4>
              <p>Класс: ${student.class}</p>
              <p class="student-id">ID: ${student.id}</p>
            </div>
          </div>
        </div>
        <p class="success-message">
          Нажмите "Начать контрольную" для продолжения.
          <br><small>Ученик сохранен для всех тестов</small>
        </p>
        <button id="change-student-btn" class="change-btn">
          <i class="fas fa-redo"></i> Это не я
        </button>
      </div>
    `;
    
    resultsDiv.style.display = 'block';
    
    document.getElementById('change-student-btn').addEventListener('click', () => {
      window.selectedStudent = null;
      localStorage.removeItem('lastStudent');
      resultsDiv.style.display = 'none';
      document.getElementById('start-test-btn').disabled = true;
      document.getElementById('start-test-btn').innerHTML = `
        <i class="fas fa-play-circle"></i> Начать контрольную
      `;
      if (document.getElementById('student-last-name')) {
        document.getElementById('student-last-name').focus();
      }
    });
  }
  
  showNoResults(userInput) {
    const resultsDiv = document.getElementById('search-results');
    const studentsList = document.getElementById('students-list');
    
    studentsList.innerHTML = `
      <div class="no-results">
        <div class="no-results-icon">
          <i class="fas fa-user-slash"></i>
        </div>
        <h4>Ученик не найден</h4>
        <p>Мы не нашли ученика с такими данными:</p>
        <div class="entered-data">
          <p><strong>Фамилия:</strong> ${userInput.lastName}</p>
          <p><strong>Имя:</strong> ${userInput.firstName}</p>
          <p><strong>Класс:</strong> ${userInput.className}</p>
        </div>
        <div class="no-results-suggestions">
          <p><i class="fas fa-lightbulb"></i> Проверьте:</p>
          <ul>
            <li>Правильность написания фамилии и имени</li>
            <li>Выбранный класс</li>
            <li>Отсутствие лишних пробелов</li>
          </ul>
        </div>
      </div>
    `;
    
    resultsDiv.style.display = 'block';
  }
  
  showAdminLogin() {
    document.getElementById('admin-login-form').style.display = 'block';
    document.getElementById('search-results').style.display = 'none';
    document.getElementById('admin-class').focus();
  }
  
  hideAdminLogin() {
    document.getElementById('admin-login-form').style.display = 'none';
    document.getElementById('admin-password').value = '';
  }
  
  adminLogin() {
    const className = document.getElementById('admin-class').value;
    const password = document.getElementById('admin-password').value;
    
    if (!password) {
      alert('⚠️ Введите пароль');
      return;
    }
    
    if (window.SCHOOL_DATABASE.checkAdminPassword(password)) {
      window.selectedStudent = {
        id: -parseInt(className),
        lastName: "Admin",
        firstName: "Admin",
        class: className,
        isAdmin: true,
        adminClass: className
      };
      
      // ВАЖНОЕ ИСПРАВЛЕНИЕ: Сохраняем админа сразу при входе
      this.saveStudentToLocalStorage();
      
      this.showAdminWelcome(className);
      
      document.getElementById('start-test-btn').disabled = false;
      document.getElementById('start-test-btn').innerHTML = `
        <i class="fas fa-play-circle"></i> Начать контрольную (Админ ${className} класса)
      `;
    } else {
      alert('❌ Неверный пароль');
      document.getElementById('admin-password').value = '';
      document.getElementById('admin-password').focus();
    }
  }
  
  showAdminWelcome(className) {
    const resultsDiv = document.getElementById('search-results');
    
    resultsDiv.innerHTML = `
      <div class="admin-welcome">
        <div class="admin-icon">
          <i class="fas fa-user-shield"></i>
        </div>
        <h3 style="color: #673AB7;">Вход выполнен как администратор</h3>
        <div class="admin-info">
          <p><strong>Класс:</strong> ${className}</p>
          <p><strong>Права:</strong> Просмотр результатов, управление тестами</p>
        </div>
        <button id="admin-logout-btn" class="logout-btn">
          <i class="fas fa-sign-out-alt"></i> Выйти
        </button>
      </div>
    `;
    
    resultsDiv.style.display = 'block';
    document.getElementById('admin-login-form').style.display = 'none';
    
    document.getElementById('admin-logout-btn').addEventListener('click', () => {
      window.selectedStudent = null;
      localStorage.removeItem('lastStudent');
      resultsDiv.style.display = 'none';
      document.getElementById('start-test-btn').disabled = true;
      document.getElementById('start-test-btn').innerHTML = `
        <i class="fas fa-play-circle"></i> Начать контрольную
      `;
      document.getElementById('student-last-name').focus();
    });
  }
  
  startTestWithSelectedStudent() {
    if (!window.selectedStudent) {
      alert('Пожалуйста, сначала выберите ученика');
      return;
    }
    
    window.STUDENT_INFO = {
      id: window.selectedStudent.id,
      name: window.selectedStudent.lastName + ' ' + window.selectedStudent.firstName,
      lastName: window.selectedStudent.lastName,
      firstName: window.selectedStudent.firstName,
      class: window.selectedStudent.class,
      isAdmin: window.selectedStudent.isAdmin || false,
      startTime: new Date().toISOString()
    };
    
    // ВАЖНОЕ ИСПРАВЛЕНИЕ: Сохраняем ученика в localStorage
    localStorage.setItem('lastStudent', JSON.stringify(window.STUDENT_INFO));
    console.log('💾 Ученик сохранен в localStorage');
    
    document.getElementById('student-info-section').style.display = 'none';
    document.getElementById('test-content').style.display = 'block';
    
    if (window.startTestFromScript) {
      window.startTestFromScript();
    }
  }
  
  /**
   * Сохраняет выбранного ученика в localStorage
   * Это ключевое исправление для запоминания ученика
   */
  saveStudentToLocalStorage() {
    if (window.selectedStudent) {
      try {
        localStorage.setItem('lastStudent', JSON.stringify({
          id: window.selectedStudent.id,
          lastName: window.selectedStudent.lastName,
          firstName: window.selectedStudent.firstName,
          class: window.selectedStudent.class,
          isAdmin: window.selectedStudent.isAdmin || false
        }));
        console.log('💾 Ученик сохранен в localStorage');
      } catch (e) {
        console.error('Ошибка сохранения ученика:', e);
      }
    }
  }
  
  checkPreviousSession() {
    const lastStudent = JSON.parse(localStorage.getItem('lastStudent'));
    
    if (lastStudent) {
      console.log('👋 Найден предыдущий сеанс ученика:', lastStudent);
      
      // Создаем улучшенный баннер приветствия
      const welcomeDiv = document.createElement('div');
      welcomeDiv.className = 'welcome-back-banner improved';
      
      if (lastStudent.isAdmin) {
        welcomeDiv.innerHTML = `
          <div class="welcome-admin">
            <p><i class="fas fa-user-shield"></i> С возвращением, администратор ${lastStudent.class} класса!</p>
            <p class="welcome-hint">Вы можете продолжить как администратор или выбрать другого пользователя</p>
            <div class="welcome-buttons">
              <button id="continue-as-admin" class="continue-btn primary">
                <i class="fas fa-play"></i> Продолжить как администратор
              </button>
              <button id="switch-user" class="switch-btn secondary">
                <i class="fas fa-exchange-alt"></i> Выбрать другого пользователя
              </button>
            </div>
          </div>
        `;
      } else {
        welcomeDiv.innerHTML = `
          <div class="welcome-student">
            <p><i class="fas fa-user-graduate"></i> С возвращением, ${lastStudent.firstName} ${lastStudent.lastName} (${lastStudent.class} класс)!</p>
            <p class="welcome-hint">Вы можете продолжить как ${lastStudent.firstName} или выбрать другого ученика</p>
            <div class="welcome-buttons">
              <button id="continue-as-student" class="continue-btn primary">
                <i class="fas fa-play"></i> Продолжить как ${lastStudent.firstName}
              </button>
              <button id="switch-user" class="switch-btn secondary">
                <i class="fas fa-exchange-alt"></i> Выбрать другого ученика
              </button>
            </div>
          </div>
        `;
      }
      
      const identificationSection = document.querySelector('.student-search');
      if (identificationSection) {
        identificationSection.parentNode.insertBefore(welcomeDiv, identificationSection);
      } else {
        const studentInfoSection = document.getElementById('student-info-section');
        if (studentInfoSection) {
          studentInfoSection.insertBefore(welcomeDiv, studentInfoSection.firstChild);
        }
      }
      
      const continueBtn = document.getElementById('continue-as-admin') || document.getElementById('continue-as-student');
      const switchBtn = document.getElementById('switch-user');
      
      if (continueBtn) {
        continueBtn.addEventListener('click', () => {
          window.selectedStudent = lastStudent;
          this.saveStudentToLocalStorage();
          
          // Заполняем форму данными ученика
          if (document.getElementById('student-last-name')) {
            document.getElementById('student-last-name').value = lastStudent.lastName;
          }
          if (document.getElementById('student-first-name')) {
            document.getElementById('student-first-name').value = lastStudent.firstName;
          }
          if (document.getElementById('student-class')) {
            document.getElementById('student-class').value = lastStudent.class;
          }
          
          welcomeDiv.remove();
          document.getElementById('start-test-btn').disabled = false;
          if (lastStudent.isAdmin) {
            document.getElementById('start-test-btn').innerHTML = `
              <i class="fas fa-play-circle"></i> Начать контрольную (Админ ${lastStudent.class} класса)
            `;
          } else {
            document.getElementById('start-test-btn').innerHTML = `
              <i class="fas fa-play-circle"></i> Начать контрольную (${lastStudent.firstName} ${lastStudent.lastName})
            `;
          }
          
          // Автоматически показываем результаты поиска
          this.showIdentificationSuccess(lastStudent);
        });
      }
      
      if (switchBtn) {
        switchBtn.addEventListener('click', () => {
          window.selectedStudent = null;
          localStorage.removeItem('lastStudent');
          welcomeDiv.remove();
          if (document.getElementById('student-last-name')) {
            document.getElementById('student-last-name').focus();
          }
        });
      }
    }
  }
}

// Инициализация системы идентификации при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  console.log('🎓 Инициализация системы идентификации...');
  window.studentIdentification = new StudentIdentification();
  
  // ВАЖНО: Проверяем наличие выбранного ученика сразу при загрузке
  const savedStudent = localStorage.getItem('lastStudent');
  if (savedStudent) {
    try {
      const studentData = JSON.parse(savedStudent);
      console.log('✅ Восстановлен сохраненный ученик:', studentData);
      window.selectedStudent = studentData;
    } catch (e) {
      console.error('Ошибка восстановления ученика:', e);
    }
  }
});