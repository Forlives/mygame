(function () {
    const canvas = document.getElementById('gameCanvas');
    const battleGame = new BattleGame(canvas);
    const levelGrid = document.getElementById('level-grid');

    let currentMode = null;
    let lastTime = 0;
    let isLoggedIn = false;
    let authMode = 'login';

    initSupabase();

    const authScreen = document.getElementById('auth-screen');
    const authTitle = document.getElementById('auth-title');
    const authUsername = document.getElementById('auth-username');
    const authPassword = document.getElementById('auth-password');
    const authSubmit = document.getElementById('auth-submit');
    const authError = document.getElementById('auth-error');
    const authToggleText = document.getElementById('auth-toggle-text');
    const authToggleLink = document.getElementById('auth-toggle-link');
    const authSkip = document.getElementById('auth-skip');

    function hideAll() {
        ['auth-screen', 'level-screen', 'battle-hud', 'battle-info', 'battle-result'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.style.display = 'none';
        });
    }

    function showAuth() {
        hideAll();
        authScreen.style.display = 'flex';
        authError.textContent = '';
        authUsername.value = '';
        authPassword.value = '';
    }

    function switchAuthMode(mode) {
        authMode = mode;
        if (mode === 'login') {
            authTitle.textContent = 'LOGIN';
            authSubmit.textContent = '登 录';
            authToggleText.textContent = '没有账号？';
            authToggleLink.textContent = '注册';
        } else {
            authTitle.textContent = 'REGISTER';
            authSubmit.textContent = '注 册';
            authToggleText.textContent = '已有账号？';
            authToggleLink.textContent = '登录';
        }
        authError.textContent = '';
    }

    authToggleLink.addEventListener('click', () => {
        switchAuthMode(authMode === 'login' ? 'register' : 'login');
    });

    authSubmit.addEventListener('click', async () => {
        const username = authUsername.value.trim();
        const password = authPassword.value;

        if (!username || username.length < 2) {
            authError.textContent = '用户名至少2个字符';
            return;
        }
        if (!password || password.length < 6) {
            authError.textContent = '密码至少6个字符';
            return;
        }

        authSubmit.disabled = true;
        authSubmit.textContent = '请稍候...';
        authError.textContent = '';

        let result;
        if (authMode === 'login') {
            result = await signIn(username, password);
        } else {
            result = await signUp(username, password);
        }

        if (result.error) {
            authError.textContent = result.error.message || '操作失败，请重试';
            switchAuthMode(authMode);
            authSubmit.disabled = false;
            return;
        }

        isLoggedIn = true;
        authSubmit.disabled = false;

        const progress = await loadProgress();
        battleGame.completedLevels = progress;

        showLevelSelect();
    });

    authPassword.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') authSubmit.click();
    });

    authSkip.addEventListener('click', () => {
        isLoggedIn = false;
        showLevelSelect();
    });

    async function showLevelSelect() {
        hideAll();
        document.getElementById('level-screen').style.display = 'flex';
        currentMode = null;

        const container = document.getElementById('user-bar-container');
        if (isLoggedIn && currentUser) {
            container.innerHTML = `<div class="user-bar" style="position:static;margin-bottom:16px">
                <span class="username">${currentUser.username}</span>
                <button id="logout-btn">退出</button>
            </div>`;
            document.getElementById('logout-btn').addEventListener('click', async () => {
                await signOut();
                isLoggedIn = false;
                showAuth();
            });
        } else {
            container.innerHTML = `<div class="user-bar" style="position:static;margin-bottom:16px">
                <span>未登录（离线模式）</span>
                <button id="login-btn">登录</button>
            </div>`;
            document.getElementById('login-btn').addEventListener('click', showAuth);
        }

        buildLevelGrid();
    }

    function buildLevelGrid() {
        levelGrid.innerHTML = '';
        for (let i = 0; i < LEVELS.length; i++) {
            const lv = LEVELS[i];
            const stars = battleGame.completedLevels[i] || 0;
            const unlocked = i === 0 || (battleGame.completedLevels[i - 1] || 0) > 0;

            const card = document.createElement('div');
            card.className = 'level-card' + (unlocked ? '' : ' locked');
            card.innerHTML = `
                <div class="lv-number">STAGE ${String(i + 1).padStart(2, '0')}</div>
                <div class="lv-name">${lv.name}</div>
                <div class="lv-desc">${lv.desc}</div>
                <div class="lv-stars">${stars > 0 ? '⭐'.repeat(stars) + '☆'.repeat(3 - stars) : '☆☆☆'}</div>
            `;

            if (unlocked) card.addEventListener('click', () => startBattle(i));
            levelGrid.appendChild(card);
        }
    }

    function startBattle(levelIndex) {
        hideAll();
        document.getElementById('battle-hud').style.display = 'flex';
        document.getElementById('battle-info').style.display = 'flex';
        currentMode = 'battle';
        battleGame.init(levelIndex);
    }

    const origEndGame = BattleGame.prototype.endGame;
    BattleGame.prototype.endGame = function (result) {
        origEndGame.call(this, result);
        if (result === 'win' && isLoggedIn) {
            const stars = this.completedLevels[this.currentLevel] || 1;
            saveProgress(this.completedLevels);
            saveScore(this.currentLevel, this.time, stars);
        }
    };

    document.getElementById('battle-back-btn').addEventListener('click', () => {
        battleGame.state = 'idle';
        showLevelSelect();
    });

    document.getElementById('battle-rematch').addEventListener('click', () => startBattle(battleGame.currentLevel));

    document.getElementById('battle-next').addEventListener('click', () => {
        const next = battleGame.currentLevel + 1;
        if (next < LEVELS.length) startBattle(next);
    });

    document.getElementById('battle-menu').addEventListener('click', showLevelSelect);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && currentMode === 'battle') {
            battleGame.state = 'idle';
            showLevelSelect();
        }
    });

    function gameLoop(timestamp) {
        const dt = Math.min((timestamp - lastTime) / 1000, 0.05);
        lastTime = timestamp;

        if (currentMode === 'battle') {
            battleGame.update(dt);
            battleGame.render();
        } else {
            const ctx = canvas.getContext('2d');
            const bg = ctx.createRadialGradient(600, 350, 100, 600, 350, 600);
            bg.addColorStop(0, '#080e14');
            bg.addColorStop(1, '#030610');
            ctx.fillStyle = bg;
            ctx.fillRect(0, 0, CONFIG.CANVAS_W, CONFIG.CANVAS_H);

            const t = timestamp / 1000;
            ctx.strokeStyle = 'rgba(0,255,136,0.02)';
            ctx.lineWidth = 1;
            for (let x = 0; x < CONFIG.CANVAS_W; x += 80) {
                ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, CONFIG.CANVAS_H); ctx.stroke();
            }
            for (let y = 0; y < CONFIG.CANVAS_H; y += 80) {
                ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(CONFIG.CANVAS_W, y); ctx.stroke();
            }

            for (let i = 0; i < 15; i++) {
                const angle = (i / 15) * Math.PI * 2 + t * 0.1;
                const r = 150 + Math.sin(t * 0.3 + i) * 50;
                const x = 600 + Math.cos(angle) * r;
                const y = 350 + Math.sin(angle) * r;
                ctx.beginPath();
                ctx.arc(x, y, 2 + Math.sin(t + i) * 1, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0,255,136,${0.04 + Math.sin(t + i * 0.5) * 0.02})`;
                ctx.fill();
            }
        }

        requestAnimationFrame(gameLoop);
    }

    (async () => {
        const session = await getSession();
        if (session) {
            isLoggedIn = true;
            const progress = await loadProgress();
            battleGame.completedLevels = progress;
            showLevelSelect();
        } else {
            showAuth();
        }
        requestAnimationFrame(gameLoop);
    })();
})();
