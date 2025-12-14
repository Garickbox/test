// ============ РАДИО СИСТЕМА ============
(function() {
    const audioElement = document.getElementById('radioPlayer');
    if (!audioElement) return;
    
    const radioMini = document.getElementById('radioMini');
    const radioPanel = document.getElementById('radioPanel');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const currentStationName = document.getElementById('stationTitle');
    const stationStatus = document.getElementById('stationStatus');
    const statusDot = document.getElementById('statusDot');
    const radioIconMini = document.getElementById('radioIconMini');
    const volumeSlider = document.getElementById('volumeSlider');
    const volumeValue = document.getElementById('volumeValue');
    const volumeIcon = document.getElementById('volumeIcon');
    const stationList = document.getElementById('stationList');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    const radioStations = [
        { name: "Pop", key: "pop", type: "audio/mpeg" },
        { name: "Club", key: "club", type: "audio/mpeg" },
        { name: "NewRock", key: "rock", type: "audio/mpeg" },
        { name: "Disco", key: "disco", type: "audio/mpeg" },
        { name: "Шансон", key: "shanson", type: "audio/mpeg" },
        { name: "Rus", key: "rus", type: "audio/mpeg" },
        { name: "RnB", key: "rnb", type: "audio/mpeg" },
        { name: "Relax", key: "relax", type: "audio/mpeg" },
        { name: "Зайчата", key: "zaychata", type: "audio/mpeg" },
        { name: "K-Pop", key: "kpop", type: "audio/mpeg" },
        { name: "Rap", key: "rap", type: "audio/mpeg" },
        { name: "Metal", key: "metal", type: "audio/mpeg" },
        { name: "Bass", key: "bass", type: "audio/mpeg" },
        { name: "Love", key: "love", type: "audio/mpeg" },
        { name: "РуРок", key: "rurock", type: "audio/mpeg" },
        { name: "Folk", key: "folk", type: "audio/mpeg" },
        { name: "Classic", key: "classic", type: "audio/mpeg" }
    ];
    
    const stationQualities = {};
    let currentStationIndex = 0;
    let isRadioPlaying = false;
    let isMuted = false;
    let savedVolume = 0.3;
    let isPanelVisible = false;
    let isTouching = false;
    let touchStartY = 0;
    
    // Инициализация радио
    function initRadio() {
        updateVolumeDisplay();
        createStationList();
        
        radioStations.forEach(station => {
            stationQualities[station.key] = 128;
        });
        
        const lastStation = localStorage.getItem('lastStation');
        if (lastStation) {
            try {
                const saved = JSON.parse(lastStation);
                const index = saved.index || 0;
                if (index < radioStations.length) {
                    currentStationIndex = index;
                    stationQualities[radioStations[index].key] = saved.quality || 128;
                    currentStationName.textContent = `${radioStations[index].name} (${saved.quality || 128}k)`;
                }
            } catch (e) {
                console.log("Не удалось восстановить последнюю станцию");
            }
        }
        
        audioElement.volume = savedVolume;
        volumeSlider.value = savedVolume * 100;
        
        setupEventListeners();
    }
    
    // Создание списка станций
    function createStationList() {
        if (!stationList) return;
        stationList.innerHTML = '';
        radioStations.forEach((station, index) => {
            const item = document.createElement('div');
            const quality = stationQualities[station.key] || 128;
            item.className = `station-item ${index === currentStationIndex ? `active-${quality}` : ''}`;
            item.innerHTML = `
                <span>🎵 ${station.name}</span>
                <span class="quality-indicator">${quality}k</span>
            `;
            item.onclick = () => selectStation(index);
            stationList.appendChild(item);
        });
    }
    
    // Настройка обработчиков событий
    function setupEventListeners() {
        if (!audioElement) return;
        
        audioElement.addEventListener('playing', () => {
            isRadioPlaying = true;
            updateRadioUI();
            updateStatus("В эфире", "playing");
        });
        
        audioElement.addEventListener('pause', () => {
            isRadioPlaying = false;
            updateRadioUI();
            updateStatus("Пауза", "paused");
        });
        
        audioElement.addEventListener('error', (e) => {
            console.log("Ошибка радио:", e);
            updateStatus("Ошибка подключения", "error");
            isRadioPlaying = false;
            updateRadioUI();
        });
        
        audioElement.addEventListener('stalled', () => {
            if (isRadioPlaying) {
                updateStatus("Переподключение...", "connecting");
                setTimeout(() => {
                    if (isRadioPlaying && audioElement.src) {
                        audioElement.load();
                        audioElement.play().catch(() => {
                            updateStatus("Требуется действие", "error");
                        });
                    }
                }, 3000);
            }
        });
        
        // Клик по пиктограмме
        if (radioMini) {
            radioMini.addEventListener('click', function(e) {
                e.stopPropagation();
                toggleRadioPanel();
            });
        }
        
        // Закрытие панели при клике вне ее
        document.addEventListener('click', (e) => {
            if (isPanelVisible && 
                radioPanel && !radioPanel.contains(e.target) && 
                radioMini && !radioMini.contains(e.target)) {
                toggleRadioPanel();
            }
        });
        
        // Предотвращаем закрытие при клике внутри панели
        if (radioPanel) {
            radioPanel.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        }
        
        // Громкость
        if (volumeSlider) {
            volumeSlider.addEventListener('input', function() {
                const volume = this.value / 100;
                savedVolume = volume;
                if (!isMuted) {
                    audioElement.volume = volume;
                }
                updateVolumeDisplay();
            });
        }
        
        // Предотвращаем pull-to-refresh
        if (stationList) {
            stationList.addEventListener('touchstart', (e) => {
                isTouching = true;
                touchStartY = e.touches[0].clientY;
            }, { passive: true });
            
            stationList.addEventListener('touchmove', (e) => {
                if (!isTouching) return;
                
                const touchY = e.touches[0].clientY;
                const diff = touchY - touchStartY;
                
                const isAtTop = stationList.scrollTop === 0;
                const isAtBottom = stationList.scrollHeight - stationList.scrollTop <= stationList.clientHeight + 1;
                
                if ((isAtTop && diff > 0) || (isAtBottom && diff < 0)) {
                    e.preventDefault();
                }
            }, { passive: false });
            
            stationList.addEventListener('touchend', () => {
                isTouching = false;
            });
        }
        
        // Кнопки управления
        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                changeStation(-1);
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                changeStation(1);
            });
        }
        
        if (playPauseBtn) {
            playPauseBtn.addEventListener('click', toggleRadioPlay);
        }
        
        if (volumeIcon) {
            volumeIcon.addEventListener('click', toggleMute);
        }
    }
    
    // Прокрутка к активной станции
    function scrollToActiveStation() {
        if (!stationList) return;
        
        setTimeout(() => {
            const activeItem = stationList.querySelector('.station-item.active-128, .station-item.active-256');
            if (activeItem) {
                activeItem.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                    inline: 'nearest'
                });
            }
        }, 50);
    }
    
    // Загрузка станции
    function loadStation(index, autoPlay = false) {
        if (index >= radioStations.length) index = 0;
        if (index < 0) index = radioStations.length - 1;
        
        currentStationIndex = index;
        const station = radioStations[index];
        const quality = stationQualities[station.key] || 128;
        
        const streamUrl = `https://abs.zaycev.fm/${station.key}${quality}k`;
        
        if (currentStationName) {
            currentStationName.textContent = `${station.name} (${quality}k)`;
        }
        updateStationList();
        updateStatus("Подключение...", "connecting");
        
        scrollToActiveStation();
        
        audioElement.src = streamUrl;
        audioElement.type = station.type;
        
        localStorage.setItem('lastStation', JSON.stringify({
            index: index,
            quality: quality
        }));
        
        if (autoPlay) {
            playRadio();
        }
    }
    
    // Выбор станции
    function selectStation(index) {
        const station = radioStations[index];
        const isSameStation = index === currentStationIndex;
        
        if (isSameStation) {
            stationQualities[station.key] = stationQualities[station.key] === 128 ? 256 : 128;
        } else {
            if (typeof stationQualities[station.key] === 'undefined') {
                stationQualities[station.key] = 128;
            }
            currentStationIndex = index;
        }
        
        loadStation(currentStationIndex, isRadioPlaying);
    }
    
    // Воспроизведение радио
    function playRadio() {
        const playPromise = audioElement.play();
        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    audioElement.volume = isMuted ? 0 : savedVolume;
                })
                .catch(error => {
                    updateStatus("Нажмите ▶ для запуска", "paused");
                    console.log("Ошибка воспроизведения:", error);
                });
        }
    }
    
    // Переключение воспроизведения
    function toggleRadioPlay() {
        if (!audioElement.src) {
            loadStation(currentStationIndex, true);
            return;
        }
        
        if (isRadioPlaying) {
            audioElement.pause();
        } else {
            playRadio();
        }
    }
    
    // Смена станции
    function changeStation(direction) {
        const newIndex = (currentStationIndex + direction + radioStations.length) % radioStations.length;
        loadStation(newIndex, isRadioPlaying);
    }
    
    // Обновление списка станций
    function updateStationList() {
        const items = document.querySelectorAll('.station-item');
        if (!items.length) return;
        
        items.forEach((item, index) => {
            const station = radioStations[index];
            const quality = stationQualities[station.key] || 128;
            
            item.classList.remove('active-128', 'active-256');
            
            if (index === currentStationIndex) {
                item.classList.add(`active-${quality}`);
            }
            
            const qualityIndicator = item.querySelector('.quality-indicator');
            if (qualityIndicator) {
                qualityIndicator.textContent = `${quality}k`;
                qualityIndicator.className = 'quality-indicator';
                if (index === currentStationIndex) {
                    qualityIndicator.classList.add(`active-${quality}`);
                }
            }
        });
    }
    
    // Управление звуком
    function toggleMute() {
        isMuted = !isMuted;
        if (isMuted) {
            savedVolume = audioElement.volume;
            audioElement.volume = 0;
            if (volumeIcon) {
                volumeIcon.innerHTML = '🔇';
                volumeIcon.title = "Включить звук";
            }
        } else {
            audioElement.volume = savedVolume;
            if (volumeIcon) {
                volumeIcon.innerHTML = '🔊';
                volumeIcon.title = "Выключить звук";
            }
        }
        updateVolumeDisplay();
    }
    
    // Обновление UI
    function updateRadioUI() {
        if (isRadioPlaying) {
            if (radioMini) {
                radioMini.classList.add('playing');
                radioMini.innerHTML = '🎵';
            }
            if (radioIconMini) radioIconMini.innerHTML = '🎵';
            if (playPauseBtn) {
                playPauseBtn.innerHTML = '⏸';
                playPauseBtn.title = "Пауза";
            }
        } else {
            if (radioMini) {
                radioMini.classList.remove('playing');
                radioMini.innerHTML = '📻';
            }
            if (radioIconMini) radioIconMini.innerHTML = '📻';
            if (playPauseBtn) {
                playPauseBtn.innerHTML = '▶';
                playPauseBtn.title = "Воспроизведение";
            }
        }
    }
    
    // Обновление статуса
    function updateStatus(text, type) {
        if (!stationStatus || !statusDot) return;
        
        stationStatus.textContent = text;
        
        switch(type) {
            case 'playing':
                statusDot.style.background = '#17B169';
                statusDot.style.animation = 'blink 2s infinite';
                break;
            case 'connecting':
                statusDot.style.background = '#FFA500';
                statusDot.style.animation = 'blink 1s infinite';
                break;
            case 'error':
                statusDot.style.background = '#FF4444';
                statusDot.style.animation = 'none';
                break;
            case 'paused':
                statusDot.style.background = '#666';
                statusDot.style.animation = 'none';
                break;
        }
    }
    
    // Управление панелью
    function toggleRadioPanel() {
        isPanelVisible = !isPanelVisible;
        
        if (radioPanel) {
            if (isPanelVisible) {
                radioPanel.classList.add('show');
                setTimeout(scrollToActiveStation, 100);
            } else {
                radioPanel.classList.remove('show');
            }
        }
    }
    
    // Обновление отображения громкости
    function updateVolumeDisplay() {
        if (!volumeValue) return;
        const volumePercent = Math.round((isMuted ? 0 : savedVolume) * 100);
        volumeValue.textContent = volumePercent + '%';
    }
    
    // Инициализация при загрузке
    document.addEventListener('DOMContentLoaded', function() {
        if (document.getElementById('radioPlayer')) {
            initRadio();
        }
    });
})();

// ============ СНЕЖНЫЙ CANVAS (только для index.html) ============
let snowCanvas, snowflakes = [], snowflakeCount = 150;

class Snowflake {
    constructor() {
        this.x = Math.random() * snowCanvas.width;
        this.y = Math.random() * -100;
        this.size = Math.random() * 3 + 1;
        this.speed = Math.random() * 1.5 + 0.5;
        this.wind = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.6 + 0.4;
        this.wobble = Math.random() * Math.PI * 2;
        this.wobbleSpeed = Math.random() * 0.05;
        this.wobbleAmount = Math.random() * 2;
    }
    
    update() {
        this.y += this.speed;
        this.x += this.wind + Math.sin(this.wobble) * this.wobbleAmount * 0.1;
        this.wobble += this.wobbleSpeed;
        
        if (this.y > snowCanvas.height) {
            this.y = -10;
            this.x = Math.random() * snowCanvas.width;
        }
        
        if (this.x > snowCanvas.width + 10) this.x = -10;
        if (this.x < -10) this.x = snowCanvas.width + 10;
    }
    
    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        
        const gradient = ctx.createRadialGradient(
            this.x, this.y, 0,
            this.x, this.y, this.size * 2
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${this.opacity})`);
        gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity * 0.2})`;
        ctx.fill();
    }
}

function initSnow() {
    snowCanvas = document.getElementById('snowCanvas');
    if (!snowCanvas) return;
    
    const ctx = snowCanvas.getContext('2d');
    snowCanvas.width = window.innerWidth;
    snowCanvas.height = window.innerHeight;
    
    snowflakes = [];
    for (let i = 0; i < snowflakeCount; i++) {
        snowflakes.push(new Snowflake());
    }
}

function animateSnow() {
    const canvas = document.getElementById('snowCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = 'rgba(26, 31, 53, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    snowflakes.forEach(flake => {
        flake.update();
        flake.draw(ctx);
    });
    
    requestAnimationFrame(animateSnow);
}

// Снежинки на CSS
function createSnowflakesCSS() {
    const snowflakesContainer = document.getElementById('snowflakes');
    if (!snowflakesContainer) return;
    
    const snowflakeCount = 70;
    
    for (let i = 0; i < snowflakeCount; i++) {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');
        
        const size = Math.random() * 6 + 2;
        const left = Math.random() * 100;
        const opacity = Math.random() * 0.7 + 0.3;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 10;
        
        snowflake.style.width = `${size}px`;
        snowflake.style.height = `${size}px`;
        snowflake.style.left = `${left}vw`;
        snowflake.style.opacity = opacity;
        snowflake.style.animationDuration = `${duration}s`;
        snowflake.style.animationDelay = `${delay}s`;
        
        snowflakesContainer.appendChild(snowflake);
    }
}