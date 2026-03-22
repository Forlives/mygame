(function () {
    const canvas = document.getElementById('gameCanvas');
    const container = document.getElementById('game-container');
    const battleGame = new BattleGame(canvas);
    window.battleGame = battleGame;
    const levelGrid = document.getElementById('level-grid');

    let scene3d = null;
    try {
        if (typeof THREE !== 'undefined') {
            scene3d = new Scene3D(container);
        }
    } catch (e) {
        console.warn('Three.js not available, running without 3D effects');
    }

    let currentMode = null;
    let lastTime = 0;
    let isLoggedIn = false;
    let authMode = 'login';

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
        ['auth-screen', 'level-screen', 'battle-hud', 'battle-info', 'battle-result', 'skill-bar', 'pause-overlay', 'tutorial-overlay'].forEach(id => {
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
        try {
            if (authMode === 'login') {
                result = await signIn(username, password);
            } else {
                result = await signUp(username, password);
            }
        } catch (e) {
            result = { error: { message: '网络错误: ' + (e.message || '请检查网络连接') } };
        }

        if (!result || result.error) {
            const msg = result?.error?.message || '操作失败，请重试';
            const friendlyMsg = msg.includes('Invalid login') ? '用户名或密码错误' :
                                msg.includes('already registered') ? '用户名已被注册' :
                                msg.includes('Email not confirmed') ? '请先验证邮箱（Supabase后台关闭Confirm email）' :
                                msg;
            authError.textContent = friendlyMsg;
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

    let tutorialShown = false;
    const pauseOverlay = document.getElementById('pause-overlay');
    const btnPause = document.getElementById('btn-pause');
    const btnSpeed = document.getElementById('btn-speed');
    const speedLabel = document.getElementById('speed-label');
    const btnMute = document.getElementById('btn-mute');
    const speedSteps = [1, 1.5, 2, 3];
    let speedIndex = 0;

    function startBattle(levelIndex) {
        hideAll();
        document.getElementById('battle-hud').style.display = 'flex';
        document.getElementById('battle-info').style.display = 'flex';
        document.getElementById('skill-bar').style.display = 'flex';
        currentMode = 'battle';

        if (levelIndex === 0 && !tutorialShown && !localStorage.getItem('bacteria_tutorial_done')) {
            battleGame.init(levelIndex);
            battleGame.state = 'paused';
            document.getElementById('tutorial-overlay').style.display = 'flex';
        } else {
            battleGame.init(levelIndex);
        }

        speedIndex = 0;
        battleGame.gameSpeed = 1;
        if (speedLabel) speedLabel.textContent = '1x';
        if (btnPause) btnPause.textContent = '⏸';
    }

    document.getElementById('tutorial-close').addEventListener('click', () => {
        document.getElementById('tutorial-overlay').style.display = 'none';
        battleGame.state = 'playing';
        tutorialShown = true;
        try { localStorage.setItem('bacteria_tutorial_done', '1'); } catch {}
    });

    const origEndGame = BattleGame.prototype.endGame;
    BattleGame.prototype.endGame = function (result) {
        origEndGame.call(this, result);
        if (result === 'win' && isLoggedIn) {
            const stars = this.completedLevels[this.currentLevel] || 1;
            saveProgress(this.completedLevels);
            saveScore(this.currentLevel, this.time, stars);
        }
        showLeaderboard(this.currentLevel);
    };

    async function showLeaderboard(levelIndex) {
        const el = document.getElementById('leaderboard');
        if (!el) return;
        const data = await getLeaderboard(levelIndex);
        if (!data || data.length === 0) {
            el.innerHTML = '';
            return;
        }
        el.innerHTML = `<h3>LEADERBOARD</h3>` + data.map((r, i) =>
            `<div class="lb-row">
                <span class="lb-rank">${i + 1}</span>
                <span class="lb-name">${r.username}</span>
                <span class="lb-time">${r.time_seconds}s</span>
                <span class="lb-stars">${'⭐'.repeat(r.stars)}</span>
            </div>`
        ).join('');
    }

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

    function togglePause() {
        if (battleGame.state === 'playing') {
            battleGame.state = 'paused';
            pauseOverlay.style.display = 'flex';
            btnPause.textContent = '▶';
        } else if (battleGame.state === 'paused') {
            battleGame.state = 'playing';
            pauseOverlay.style.display = 'none';
            btnPause.textContent = '⏸';
        }
    }

    btnPause.addEventListener('click', togglePause);

    document.getElementById('pause-resume').addEventListener('click', () => {
        battleGame.state = 'playing';
        pauseOverlay.style.display = 'none';
        btnPause.textContent = '⏸';
    });

    document.getElementById('pause-quit').addEventListener('click', () => {
        battleGame.state = 'idle';
        pauseOverlay.style.display = 'none';
        btnPause.textContent = '⏸';
        showLevelSelect();
    });

    btnSpeed.addEventListener('click', () => {
        speedIndex = (speedIndex + 1) % speedSteps.length;
        battleGame.gameSpeed = speedSteps[speedIndex];
        speedLabel.textContent = speedSteps[speedIndex] + 'x';
    });

    btnMute.addEventListener('click', () => {
        gameAudio.enabled = !gameAudio.enabled;
        btnMute.textContent = gameAudio.enabled ? '🔊' : '🔇';
        btnMute.classList.toggle('active', !gameAudio.enabled);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && currentMode === 'battle') {
            if (battleGame.state === 'playing' || battleGame.state === 'paused') {
                togglePause();
            }
        }
    });

    function gameLoop(timestamp) {
        const dt = Math.min((timestamp - lastTime) / 1000, 0.05);
        lastTime = timestamp;

        if (scene3d) {
            scene3d.update(dt);
            scene3d.render();
        }

        if (currentMode === 'battle') {
            battleGame.update(dt);
            battleGame.render();
        } else {
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, CONFIG.CANVAS_W, CONFIG.CANVAS_H);
        }

        requestAnimationFrame(gameLoop);
    }

    (async () => {
        const supabaseAvailable = initSupabase();
        if (supabaseAvailable) {
            const session = await getSession();
            if (session) {
                isLoggedIn = true;
                const progress = await loadProgress();
                battleGame.completedLevels = progress;
                showLevelSelect();
            } else {
                showAuth();
            }
        } else {
            isLoggedIn = false;
            const progress = await loadProgress();
            battleGame.completedLevels = progress;
            showLevelSelect();
        }
        requestAnimationFrame(gameLoop);
    })();
})();
