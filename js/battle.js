const BATTLE_CONFIG = {
    OWNER_NONE: 0,
    OWNER_PLAYER: 1,
    OWNER_ENEMY: 2,
    SPAWN_RATE: 0.8,
    TROOP_SPEED: 2.5,
    SEND_RATIO: 0.5,
    COLORS: {
        0: { main: '#556677', light: '#7799aa', glow: 'rgba(85,102,119,', dark: '#334455' },
        1: { main: '#00ee77', light: '#55ffaa', glow: 'rgba(0,238,119,', dark: '#007744' },
        2: { main: '#ee4455', light: '#ff7788', glow: 'rgba(238,68,85,', dark: '#992233' },
    },
};

const LEVELS = [
    {
        name: '新手培养皿',
        desc: '学习基本操作',
        stars: 0,
        aiInterval: 4.0,
        obstacles: [],
        cells: [
            { x: 200, y: 350, r: 42, troops: 10, owner: 1 },
            { x: 1000, y: 350, r: 42, troops: 10, owner: 2 },
            { x: 600, y: 350, r: 36, troops: 6, owner: 0 },
            { x: 400, y: 220, r: 30, troops: 4, owner: 0 },
            { x: 400, y: 480, r: 30, troops: 4, owner: 0 },
            { x: 800, y: 220, r: 30, troops: 4, owner: 0 },
            { x: 800, y: 480, r: 30, troops: 4, owner: 0 },
        ],
    },
    {
        name: '双线夹击',
        desc: '两条战线同时推进',
        stars: 0,
        aiInterval: 3.5,
        obstacles: [],
        cells: [
            { x: 150, y: 200, r: 40, troops: 10, owner: 1 },
            { x: 150, y: 500, r: 34, troops: 8, owner: 1 },
            { x: 1050, y: 200, r: 40, troops: 10, owner: 2 },
            { x: 1050, y: 500, r: 34, troops: 8, owner: 2 },
            { x: 400, y: 200, r: 28, troops: 5, owner: 0 },
            { x: 400, y: 500, r: 28, troops: 5, owner: 0 },
            { x: 600, y: 350, r: 38, troops: 10, owner: 0 },
            { x: 800, y: 200, r: 28, troops: 5, owner: 0 },
            { x: 800, y: 500, r: 28, troops: 5, owner: 0 },
            { x: 400, y: 350, r: 24, troops: 3, owner: 0 },
            { x: 800, y: 350, r: 24, troops: 3, owner: 0 },
        ],
    },
    {
        name: '环形战场',
        desc: '围绕中心展开战斗',
        stars: 0,
        aiInterval: 3.0,
        obstacles: [
            { x: 400, y: 350, w: 20, h: 120 },
            { x: 800, y: 350, w: 20, h: 120 },
        ],
        cells: [
            { x: 300, y: 350, r: 40, troops: 10, owner: 1 },
            { x: 900, y: 350, r: 40, troops: 10, owner: 2 },
            { x: 600, y: 150, r: 32, troops: 6, owner: 0 },
            { x: 600, y: 550, r: 32, troops: 6, owner: 0 },
            { x: 450, y: 200, r: 26, troops: 4, owner: 0 },
            { x: 450, y: 500, r: 26, troops: 4, owner: 0 },
            { x: 750, y: 200, r: 26, troops: 4, owner: 0 },
            { x: 750, y: 500, r: 26, troops: 4, owner: 0 },
            { x: 600, y: 350, r: 44, troops: 15, owner: 0 },
            { x: 200, y: 180, r: 22, troops: 2, owner: 0 },
            { x: 200, y: 520, r: 22, troops: 2, owner: 0 },
            { x: 1000, y: 180, r: 22, troops: 2, owner: 0 },
            { x: 1000, y: 520, r: 22, troops: 2, owner: 0 },
        ],
    },
    {
        name: '资源争夺',
        desc: '中间高价值细胞是关键',
        stars: 0,
        aiInterval: 2.5,
        obstacles: [
            { x: 450, y: 200, w: 16, h: 100 },
            { x: 450, y: 420, w: 16, h: 100 },
            { x: 750, y: 200, w: 16, h: 100 },
            { x: 750, y: 420, w: 16, h: 100 },
        ],
        cells: [
            { x: 120, y: 350, r: 38, troops: 12, owner: 1 },
            { x: 1080, y: 350, r: 38, troops: 12, owner: 2 },
            { x: 350, y: 180, r: 26, troops: 5, owner: 0 },
            { x: 350, y: 520, r: 26, troops: 5, owner: 0 },
            { x: 500, y: 280, r: 24, troops: 4, owner: 0 },
            { x: 500, y: 420, r: 24, troops: 4, owner: 0 },
            { x: 600, y: 350, r: 48, troops: 20, owner: 0 },
            { x: 700, y: 280, r: 24, troops: 4, owner: 0 },
            { x: 700, y: 420, r: 24, troops: 4, owner: 0 },
            { x: 850, y: 180, r: 26, troops: 5, owner: 0 },
            { x: 850, y: 520, r: 26, troops: 5, owner: 0 },
            { x: 250, y: 350, r: 22, troops: 3, owner: 0 },
            { x: 950, y: 350, r: 22, troops: 3, owner: 0 },
            { x: 600, y: 180, r: 22, troops: 3, owner: 0 },
            { x: 600, y: 520, r: 22, troops: 3, owner: 0 },
        ],
    },
    {
        name: '四面楚歌',
        desc: '敌人从多个方向进攻',
        stars: 0,
        aiInterval: 2.5,
        obstacles: [
            { x: 500, y: 280, w: 80, h: 14 },
            { x: 620, y: 410, w: 80, h: 14 },
        ],
        cells: [
            { x: 600, y: 350, r: 44, troops: 15, owner: 1 },
            { x: 150, y: 150, r: 34, troops: 8, owner: 2 },
            { x: 1050, y: 150, r: 34, troops: 8, owner: 2 },
            { x: 150, y: 550, r: 34, troops: 8, owner: 2 },
            { x: 1050, y: 550, r: 34, troops: 8, owner: 2 },
            { x: 400, y: 200, r: 26, troops: 5, owner: 0 },
            { x: 800, y: 200, r: 26, troops: 5, owner: 0 },
            { x: 400, y: 500, r: 26, troops: 5, owner: 0 },
            { x: 800, y: 500, r: 26, troops: 5, owner: 0 },
            { x: 300, y: 350, r: 28, troops: 6, owner: 0 },
            { x: 900, y: 350, r: 28, troops: 6, owner: 0 },
            { x: 600, y: 180, r: 24, troops: 4, owner: 0 },
            { x: 600, y: 520, r: 24, troops: 4, owner: 0 },
            { x: 450, y: 350, r: 20, troops: 2, owner: 0 },
            { x: 750, y: 350, r: 20, troops: 2, owner: 0 },
        ],
    },
    {
        name: '迷宫通道',
        desc: '狭窄的战术通道',
        stars: 0,
        aiInterval: 2.2,
        obstacles: [
            { x: 360, y: 130, w: 16, h: 180 },
            { x: 360, y: 400, w: 16, h: 180 },
            { x: 520, y: 280, w: 16, h: 140 },
            { x: 680, y: 280, w: 16, h: 140 },
            { x: 840, y: 130, w: 16, h: 180 },
            { x: 840, y: 400, w: 16, h: 180 },
        ],
        cells: [
            { x: 120, y: 350, r: 40, troops: 12, owner: 1 },
            { x: 1080, y: 350, r: 40, troops: 12, owner: 2 },
            { x: 280, y: 200, r: 26, troops: 5, owner: 0 },
            { x: 280, y: 500, r: 26, troops: 5, owner: 0 },
            { x: 440, y: 350, r: 30, troops: 8, owner: 0 },
            { x: 440, y: 150, r: 22, troops: 3, owner: 0 },
            { x: 440, y: 550, r: 22, troops: 3, owner: 0 },
            { x: 600, y: 220, r: 28, troops: 6, owner: 0 },
            { x: 600, y: 480, r: 28, troops: 6, owner: 0 },
            { x: 760, y: 350, r: 30, troops: 8, owner: 0 },
            { x: 760, y: 150, r: 22, troops: 3, owner: 0 },
            { x: 760, y: 550, r: 22, troops: 3, owner: 0 },
            { x: 920, y: 200, r: 26, troops: 5, owner: 0 },
            { x: 920, y: 500, r: 26, troops: 5, owner: 0 },
            { x: 600, y: 350, r: 34, troops: 12, owner: 0 },
        ],
    },
    {
        name: '蚁群战争',
        desc: '大量小型细胞的混战',
        stars: 0,
        aiInterval: 1.8,
        obstacles: [
            { x: 600, y: 250, w: 14, h: 80 },
            { x: 600, y: 400, w: 14, h: 80 },
        ],
        cells: [
            { x: 150, y: 250, r: 36, troops: 10, owner: 1 },
            { x: 150, y: 450, r: 30, troops: 6, owner: 1 },
            { x: 1050, y: 250, r: 36, troops: 10, owner: 2 },
            { x: 1050, y: 450, r: 30, troops: 6, owner: 2 },
            { x: 300, y: 150, r: 20, troops: 3, owner: 0 },
            { x: 300, y: 350, r: 22, troops: 4, owner: 0 },
            { x: 300, y: 550, r: 20, troops: 3, owner: 0 },
            { x: 450, y: 220, r: 22, troops: 4, owner: 0 },
            { x: 450, y: 480, r: 22, troops: 4, owner: 0 },
            { x: 600, y: 150, r: 24, troops: 5, owner: 0 },
            { x: 600, y: 350, r: 32, troops: 8, owner: 0 },
            { x: 600, y: 550, r: 24, troops: 5, owner: 0 },
            { x: 750, y: 220, r: 22, troops: 4, owner: 0 },
            { x: 750, y: 480, r: 22, troops: 4, owner: 0 },
            { x: 900, y: 150, r: 20, troops: 3, owner: 0 },
            { x: 900, y: 350, r: 22, troops: 4, owner: 0 },
            { x: 900, y: 550, r: 20, troops: 3, owner: 0 },
            { x: 450, y: 350, r: 18, troops: 2, owner: 0 },
            { x: 750, y: 350, r: 18, troops: 2, owner: 0 },
        ],
    },
    {
        name: '堡垒攻防',
        desc: '突破敌方防线',
        stars: 0,
        aiInterval: 1.5,
        obstacles: [
            { x: 650, y: 150, w: 16, h: 150 },
            { x: 650, y: 400, w: 16, h: 150 },
        ],
        cells: [
            { x: 150, y: 350, r: 42, troops: 15, owner: 1 },
            { x: 1050, y: 200, r: 42, troops: 15, owner: 2 },
            { x: 1050, y: 500, r: 36, troops: 12, owner: 2 },
            { x: 350, y: 200, r: 26, troops: 4, owner: 0 },
            { x: 350, y: 500, r: 26, troops: 4, owner: 0 },
            { x: 550, y: 300, r: 28, troops: 6, owner: 0 },
            { x: 550, y: 400, r: 28, troops: 6, owner: 0 },
            { x: 750, y: 200, r: 30, troops: 8, owner: 0 },
            { x: 750, y: 350, r: 36, troops: 12, owner: 0 },
            { x: 750, y: 500, r: 30, troops: 8, owner: 0 },
            { x: 900, y: 350, r: 22, troops: 4, owner: 0 },
            { x: 250, y: 200, r: 20, troops: 2, owner: 0 },
            { x: 250, y: 500, r: 20, troops: 2, owner: 0 },
            { x: 450, y: 350, r: 24, troops: 5, owner: 0 },
        ],
    },
    {
        name: '终极对决',
        desc: '最强AI的终极挑战',
        stars: 0,
        aiInterval: 1.2,
        obstacles: [
            { x: 400, y: 200, w: 14, h: 100 },
            { x: 400, y: 420, w: 14, h: 100 },
            { x: 800, y: 200, w: 14, h: 100 },
            { x: 800, y: 420, w: 14, h: 100 },
            { x: 550, y: 300, w: 100, h: 14 },
            { x: 550, y: 400, w: 100, h: 14 },
        ],
        cells: [
            { x: 120, y: 350, r: 40, troops: 12, owner: 1 },
            { x: 1080, y: 200, r: 40, troops: 12, owner: 2 },
            { x: 1080, y: 500, r: 36, troops: 10, owner: 2 },
            { x: 880, y: 350, r: 32, troops: 8, owner: 2 },
            { x: 300, y: 180, r: 24, troops: 4, owner: 0 },
            { x: 300, y: 520, r: 24, troops: 4, owner: 0 },
            { x: 450, y: 280, r: 26, troops: 5, owner: 0 },
            { x: 450, y: 420, r: 26, troops: 5, owner: 0 },
            { x: 600, y: 180, r: 22, troops: 4, owner: 0 },
            { x: 600, y: 350, r: 42, troops: 18, owner: 0 },
            { x: 600, y: 520, r: 22, troops: 4, owner: 0 },
            { x: 750, y: 200, r: 24, troops: 5, owner: 0 },
            { x: 750, y: 500, r: 24, troops: 5, owner: 0 },
            { x: 200, y: 350, r: 20, troops: 2, owner: 0 },
            { x: 450, y: 150, r: 18, troops: 2, owner: 0 },
            { x: 450, y: 550, r: 18, troops: 2, owner: 0 },
            { x: 950, y: 350, r: 20, troops: 3, owner: 0 },
        ],
    },
];

class BattleCell {
    constructor(x, y, radius, troops, owner) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.troops = troops;
        this.maxTroops = Math.floor(radius * 2.5);
        this.owner = owner;
        this.spawnTimer = 0;
        this.pulsePhase = Math.random() * Math.PI * 2;
        this.selected = false;
        this.hovered = false;
        this.shakeTimer = 0;
        this.shakeIntensity = 0;
        this.captureFlash = 0;
    }

    update(dt) {
        this.pulsePhase += dt * 1.5;
        if (this.shakeTimer > 0) this.shakeTimer -= dt;
        if (this.captureFlash > 0) this.captureFlash -= dt * 3;

        if (this.owner !== BATTLE_CONFIG.OWNER_NONE) {
            this.spawnTimer += dt;
            const interval = 1.0 / BATTLE_CONFIG.SPAWN_RATE;
            if (this.spawnTimer >= interval && this.troops < this.maxTroops) {
                this.troops++;
                this.spawnTimer = 0;
            }
        }
    }

    contains(mx, my) {
        return Math.hypot(mx - this.x, my - this.y) <= this.radius + 5;
    }

    shake() {
        this.shakeTimer = 0.3;
        this.shakeIntensity = 5;
    }

    flash() {
        this.captureFlash = 1.0;
    }
}

class Pipeline {
    constructor(fromCell, toCell, owner) {
        this.fromCell = fromCell;
        this.toCell = toCell;
        this.owner = owner;
        this.dead = false;
        this.totalDist = Math.hypot(toCell.x - fromCell.x, toCell.y - fromCell.y);
        this.angle = Math.atan2(toCell.y - fromCell.y, toCell.x - fromCell.x);

        this.flowRate = 4.0;
        this.flowTimer = 0;
        this.dots = [];
    }

    update(dt) {
        if (this.fromCell.owner !== this.owner || this.fromCell.troops <= 1) {
            if (this.dots.length === 0) this.dead = true;
        } else {
            this.flowTimer += dt * this.flowRate;
            if (this.flowTimer >= 1) {
                this.flowTimer -= 1;
                if (this.fromCell.troops > 1) {
                    this.fromCell.troops--;
                    this.dots.push({ progress: 0 });
                }
            }
        }

        const speed = BATTLE_CONFIG.TROOP_SPEED * 60 * dt / this.totalDist;
        for (const dot of this.dots) {
            dot.progress += speed;
        }

        const arrived = this.dots.filter(d => d.progress >= 1);
        this.dots = this.dots.filter(d => d.progress < 1);

        for (const _ of arrived) {
            const target = this.toCell;
            if (target.owner === this.owner) {
                target.troops++;
            } else {
                target.troops--;
                target.shake();
                if (target.troops <= 0) {
                    target.troops = 1;
                    target.owner = this.owner;
                    target.flash();
                    gameAudio.play('capture');
                }
            }
        }
    }

    getDotPositions() {
        return this.dots.map(d => ({
            x: this.fromCell.x + (this.toCell.x - this.fromCell.x) * d.progress,
            y: this.fromCell.y + (this.toCell.y - this.fromCell.y) * d.progress,
        }));
    }
}

class BattleGame {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.state = 'idle';
        this.currentLevel = 0;
        this.cells = [];
        this.pipelines = [];
        this.particles = [];
        this.floatingTexts = [];
        this.selectedCell = null;
        this.hoveredCell = null;
        this.mouseX = 0;
        this.mouseY = 0;
        this.time = 0;
        this.aiTimer = 0;
        this.aiInterval = 2.0;
        this.gameSpeed = 1;

        this.completedLevels = this.loadProgress();

        this.bindEvents();
    }

    loadProgress() {
        try {
            const data = localStorage.getItem('bacteria_war_progress');
            return data ? JSON.parse(data) : {};
        } catch { return {}; }
    }

    saveProgress() {
        try {
            localStorage.setItem('bacteria_war_progress', JSON.stringify(this.completedLevels));
        } catch {}
    }

    init(levelIndex) {
        this.currentLevel = levelIndex;
        const level = LEVELS[levelIndex];
        this.aiInterval = level.aiInterval;
        this.cells = level.cells.map(c => new BattleCell(c.x, c.y, c.r, c.troops, c.owner));
        this.obstacles = (level.obstacles || []).map(o => ({ ...o }));
        this.pipelines = [];
        this.particles = [];
        this.floatingTexts = [];
        this.selectedCell = null;
        this.time = 0;
        this.aiTimer = this.aiInterval;
        this.state = 'playing';
        this.updateUI();
    }

    bindEvents() {
        this.dragging = false;
        this.dragSource = null;

        const getPos = (e) => {
            const rect = this.canvas.getBoundingClientRect();
            return {
                x: (e.clientX - rect.left) * (CONFIG.CANVAS_W / rect.width),
                y: (e.clientY - rect.top) * (CONFIG.CANVAS_H / rect.height),
            };
        };

        const findCell = (mx, my) => {
            for (const cell of this.cells) {
                if (cell.contains(mx, my)) return cell;
            }
            return null;
        };

        this.canvas.addEventListener('mousemove', (e) => {
            if (this.state !== 'playing') return;
            const pos = getPos(e);
            this.mouseX = pos.x;
            this.mouseY = pos.y;
            this.hoveredCell = null;
            for (const cell of this.cells) {
                cell.hovered = cell.contains(pos.x, pos.y);
                if (cell.hovered) this.hoveredCell = cell;
            }
        });

        this.canvas.addEventListener('mousedown', (e) => {
            if (this.state !== 'playing' || e.button !== 0) return;
            const pos = getPos(e);
            const cell = findCell(pos.x, pos.y);
            if (cell && cell.owner === BATTLE_CONFIG.OWNER_PLAYER && cell.troops > 1) {
                this.dragging = true;
                this.dragSource = cell;
                cell.selected = true;
            }
        });

        this.canvas.addEventListener('mouseup', (e) => {
            if (!this.dragging || e.button !== 0) return;
            const pos = getPos(e);
            const target = findCell(pos.x, pos.y);

            if (target && target !== this.dragSource) {
                this.sendTroops(this.dragSource, target, BATTLE_CONFIG.OWNER_PLAYER);
            }

            if (this.dragSource) this.dragSource.selected = false;
            this.dragging = false;
            this.dragSource = null;
        });

        this.canvas.addEventListener('mouseleave', () => {
            if (this.dragging && this.dragSource) {
                this.dragSource.selected = false;
            }
            this.dragging = false;
            this.dragSource = null;
        });

        this.canvas.addEventListener('contextmenu', (e) => e.preventDefault());
    }

    sendTroops(from, to, owner) {
        if (from.troops <= 1) return;

        const existing = this.pipelines.find(p => p.fromCell === from && !p.dead);
        if (existing) {
            existing.dead = true;
        }

        this.pipelines.push(new Pipeline(from, to, owner));
        gameAudio.play(to.owner === owner ? 'clone' : 'jump');
    }

    update(dt) {
        if (this.state !== 'playing') return;
        const sdt = dt * this.gameSpeed;
        this.time += sdt;

        for (const cell of this.cells) cell.update(sdt);
        for (const p of this.pipelines) p.update(sdt);
        this.pipelines = this.pipelines.filter(p => !p.dead);

        for (const p of this.particles) { p.x += p.vx * sdt; p.y += p.vy * sdt; p.life -= sdt; }
        this.particles = this.particles.filter(p => p.life > 0);

        for (const ft of this.floatingTexts) { ft.timer -= sdt; ft.y -= sdt * 25; }
        this.floatingTexts = this.floatingTexts.filter(ft => ft.timer > 0);

        this.aiTimer -= sdt;
        if (this.aiTimer <= 0) {
            this.aiThink();
            this.aiTimer = this.aiInterval + Math.random() * 0.5;
        }

        this.updateUI();
        this.checkGameOver();
    }

    aiThink() {
        const myCells = this.cells.filter(c => c.owner === BATTLE_CONFIG.OWNER_ENEMY && c.troops > 3);
        if (myCells.length === 0) return;

        let best = null, bestScore = -Infinity;
        for (const src of myCells) {
            for (const tgt of this.cells) {
                if (tgt === src) continue;
                const score = this.aiScore(src, tgt);
                if (score > bestScore) { bestScore = score; best = { src, tgt }; }
            }
        }
        if (best && bestScore > 0) {
            this.sendTroops(best.src, best.tgt, BATTLE_CONFIG.OWNER_ENEMY);
        }
    }

    aiScore(src, tgt) {
        const send = Math.ceil(src.troops * BATTLE_CONFIG.SEND_RATIO);
        const dist = Math.hypot(tgt.x - src.x, tgt.y - src.y);
        let score = -dist * 0.015;

        if (tgt.owner === BATTLE_CONFIG.OWNER_NONE) {
            score += send > tgt.troops + 2 ? 25 + tgt.maxTroops * 0.3 - tgt.troops : -5;
        } else if (tgt.owner === BATTLE_CONFIG.OWNER_PLAYER) {
            score += send > tgt.troops * 0.7 ? 40 + tgt.troops * 0.5 : (send - tgt.troops) * 1.5;
        } else {
            score += tgt.troops < tgt.maxTroops * 0.4 ? 8 : 3;
        }

        const srcAfter = src.troops - send;
        const threats = this.cells.filter(c =>
            c.owner === BATTLE_CONFIG.OWNER_PLAYER &&
            Math.hypot(c.x - src.x, c.y - src.y) < 250 &&
            c.troops > srcAfter + 3
        );
        score -= threats.length * 15;

        return score;
    }

    checkGameOver() {
        const p = this.cells.filter(c => c.owner === BATTLE_CONFIG.OWNER_PLAYER);
        const e = this.cells.filter(c => c.owner === BATTLE_CONFIG.OWNER_ENEMY);
        const pPipes = this.pipelines.some(pp => pp.owner === BATTLE_CONFIG.OWNER_PLAYER && pp.dots.length > 0);
        const ePipes = this.pipelines.some(pp => pp.owner === BATTLE_CONFIG.OWNER_ENEMY && pp.dots.length > 0);

        if (p.length === 0 && !pPipes) this.endGame('lose');
        else if (e.length === 0 && !ePipes) this.endGame('win');
    }

    endGame(result) {
        this.state = 'ended';

        if (result === 'win') {
            const timeBonus = this.time < 60 ? 3 : this.time < 120 ? 2 : 1;
            this.completedLevels[this.currentLevel] = Math.max(
                this.completedLevels[this.currentLevel] || 0, timeBonus
            );
            this.saveProgress();
        }

        const pc = this.cells.filter(c => c.owner === BATTLE_CONFIG.OWNER_PLAYER);
        const ec = this.cells.filter(c => c.owner === BATTLE_CONFIG.OWNER_ENEMY);
        const pt = pc.reduce((s, c) => s + Math.floor(c.troops), 0);
        const et = ec.reduce((s, c) => s + Math.floor(c.troops), 0);

        const el = document.getElementById('battle-result');
        const title = document.getElementById('battle-result-title');
        const stats = document.getElementById('battle-result-stats');

        if (result === 'win') {
            title.textContent = '占 领 成 功!';
            title.style.color = '#00ff88';
            el.style.background = 'radial-gradient(ellipse at center, rgba(0,60,30,0.9) 0%, rgba(10,14,20,0.98) 70%)';
            const stars = this.completedLevels[this.currentLevel];
            stats.innerHTML = `${'⭐'.repeat(stars)}${'☆'.repeat(3 - stars)}<br>占领 ${pc.length} 个细胞（兵力 ${pt}）<br>用时 ${Math.floor(this.time)} 秒`;
            gameAudio.play('win');
        } else {
            title.textContent = '细 菌 灭 绝';
            title.style.color = '#ff4444';
            el.style.background = 'radial-gradient(ellipse at center, rgba(60,0,0,0.9) 0%, rgba(10,14,20,0.98) 70%)';
            stats.innerHTML = `敌方剩余 ${ec.length} 个细胞（兵力 ${et}）<br>坚持 ${Math.floor(this.time)} 秒`;
            gameAudio.play('lose');
        }

        const nextBtn = document.getElementById('battle-next');
        if (nextBtn) {
            nextBtn.style.display = result === 'win' && this.currentLevel < LEVELS.length - 1 ? 'inline-block' : 'none';
        }
        el.style.display = 'flex';
    }

    // --- Rendering ---

    render() {
        const ctx = this.ctx;
        ctx.clearRect(0, 0, CONFIG.CANVAS_W, CONFIG.CANVAS_H);

        const bg = ctx.createRadialGradient(600, 350, 100, 600, 350, 600);
        bg.addColorStop(0, '#080e14');
        bg.addColorStop(1, '#030610');
        ctx.fillStyle = bg;
        ctx.fillRect(0, 0, CONFIG.CANVAS_W, CONFIG.CANVAS_H);

        ctx.strokeStyle = 'rgba(0, 255, 136, 0.025)';
        ctx.lineWidth = 1;
        for (let x = 0; x < CONFIG.CANVAS_W; x += 80) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, CONFIG.CANVAS_H);
            ctx.stroke();
        }
        for (let y = 0; y < CONFIG.CANVAS_H; y += 80) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(CONFIG.CANVAS_W, y);
            ctx.stroke();
        }

        for (let i = 0; i < 40; i++) {
            const x = (i * 47 + 30) % 1150 + 25;
            const y = (i * 73 + 20) % 650 + 25;
            const a = 0.02 + Math.sin(this.time * 0.5 + i) * 0.01;
            ctx.beginPath();
            ctx.arc(x, y, 1 + (i % 3) * 0.5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0,255,136,${a})`;
            ctx.fill();
        }

        if (this.obstacles) {
            for (const o of this.obstacles) {
                const ox = o.x - o.w / 2, oy = o.y - o.h / 2;
                ctx.fillStyle = 'rgba(80, 40, 60, 0.6)';
                ctx.fillRect(ox, oy, o.w, o.h);
                ctx.strokeStyle = 'rgba(150, 60, 90, 0.4)';
                ctx.lineWidth = 1.5;
                ctx.strokeRect(ox, oy, o.w, o.h);

                for (let i = 0; i < 3; i++) {
                    const sx = ox + Math.random() * o.w;
                    const sy = oy + Math.random() * o.h;
                    ctx.beginPath();
                    ctx.arc(sx, sy, 1.5, 0, Math.PI * 2);
                    ctx.fillStyle = 'rgba(200, 80, 120, 0.3)';
                    ctx.fill();
                }
            }
        }

        for (const pipe of this.pipelines) {
            if (pipe.dead && pipe.dots.length === 0) continue;
            const colors = BATTLE_CONFIG.COLORS[pipe.owner];

            ctx.beginPath();
            ctx.moveTo(pipe.fromCell.x, pipe.fromCell.y);
            ctx.lineTo(pipe.toCell.x, pipe.toCell.y);
            ctx.strokeStyle = colors.glow + '0.1)';
            ctx.lineWidth = 3;
            ctx.stroke();

            const dotPositions = pipe.getDotPositions();
            for (const dp of dotPositions) {
                ctx.beginPath();
                ctx.arc(dp.x, dp.y, 4, 0, Math.PI * 2);
                ctx.fillStyle = colors.main;
                ctx.fill();

                ctx.beginPath();
                ctx.arc(dp.x, dp.y, 6, 0, Math.PI * 2);
                ctx.fillStyle = colors.glow + '0.15)';
                ctx.fill();
            }
        }

        if (this.dragging && this.dragSource) {
            const s = this.dragSource;

            const ringPulse = Math.sin(this.time * 4) * 4;
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.radius + 10 + ringPulse, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(0,238,119,${0.35 + Math.sin(this.time * 3) * 0.1})`;
            ctx.lineWidth = 2.5;
            ctx.stroke();

            let endX = this.mouseX, endY = this.mouseY;
            const target = this.hoveredCell;
            if (target && target !== s) {
                endX = target.x;
                endY = target.y;
            }

            const dx = endX - s.x, dy = endY - s.y;
            const angle = Math.atan2(dy, dx);
            const startX = s.x + Math.cos(angle) * (s.radius + 5);
            const startY = s.y + Math.sin(angle) * (s.radius + 5);

            ctx.save();
            ctx.strokeStyle = 'rgba(255, 220, 0, 0.5)';
            ctx.lineWidth = 3.5;
            ctx.setLineDash([8, 5]);
            ctx.lineDashOffset = -this.time * 50;
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(endX, endY);
            ctx.stroke();
            ctx.setLineDash([]);
            ctx.restore();

            ctx.save();
            ctx.translate(endX, endY);
            ctx.rotate(angle);
            ctx.beginPath();
            ctx.moveTo(12, 0);
            ctx.lineTo(-6, -7);
            ctx.lineTo(-2, 0);
            ctx.lineTo(-6, 7);
            ctx.closePath();
            ctx.fillStyle = 'rgba(255, 220, 0, 0.7)';
            ctx.fill();
            ctx.restore();

            if (target && target !== s) {
                const send = Math.ceil(s.troops * BATTLE_CONFIG.SEND_RATIO);
                const isOwn = target.owner === BATTLE_CONFIG.OWNER_PLAYER;
                ctx.font = 'bold 16px sans-serif';
                ctx.textAlign = 'center';
                ctx.fillStyle = '#fff';
                ctx.shadowColor = 'rgba(0,0,0,0.8)';
                ctx.shadowBlur = 4;
                ctx.fillText(send, (s.x + endX) / 2, (s.y + endY) / 2 - 10);
                ctx.shadowBlur = 0;

                ctx.beginPath();
                ctx.arc(target.x, target.y, target.radius + 6, 0, Math.PI * 2);
                ctx.strokeStyle = isOwn ? 'rgba(0,238,119,0.5)' : 'rgba(255,100,100,0.5)';
                ctx.lineWidth = 2;
                ctx.stroke();
            }
        }

        for (const cell of this.cells) this.renderCell(ctx, cell);

        for (const p of this.particles) {
            ctx.save();
            ctx.globalAlpha = Math.max(0, p.life / p.maxLife);
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * ctx.globalAlpha, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
            ctx.restore();
        }

        for (const ft of this.floatingTexts) {
            ctx.save();
            ctx.globalAlpha = Math.max(0, ft.timer / ft.maxTimer);
            ctx.font = 'bold 16px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillStyle = ft.color;
            ctx.fillText(ft.text, ft.x, ft.y);
            ctx.restore();
        }
    }

    renderCell(ctx, cell) {
        const c = BATTLE_CONFIG.COLORS[cell.owner];
        const pulse = Math.sin(cell.pulsePhase) * 0.04 + 0.96;
        const r = cell.radius * pulse;
        let sx = 0, sy = 0;
        if (cell.shakeTimer > 0) {
            sx = (Math.random() - 0.5) * cell.shakeIntensity;
            sy = (Math.random() - 0.5) * cell.shakeIntensity;
        }
        const cx = cell.x + sx, cy = cell.y + sy;

        if (cell.captureFlash > 0) {
            ctx.beginPath();
            ctx.arc(cx, cy, r + 20 * cell.captureFlash, 0, Math.PI * 2);
            ctx.fillStyle = c.glow + (cell.captureFlash * 0.3) + ')';
            ctx.fill();
        }

        const glow = ctx.createRadialGradient(cx, cy, r * 0.4, cx, cy, r + 12);
        glow.addColorStop(0, c.glow + '0.18)');
        glow.addColorStop(1, c.glow + '0)');
        ctx.beginPath();
        ctx.arc(cx, cy, r + 12, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        const membrane = ctx.createRadialGradient(cx, cy, r * 0.7, cx, cy, r);
        membrane.addColorStop(0, c.dark + 'cc');
        membrane.addColorStop(0.7, c.main);
        membrane.addColorStop(1, c.light);
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fillStyle = membrane;
        ctx.fill();

        ctx.strokeStyle = c.light + 'aa';
        ctx.lineWidth = cell.selected ? 3 : 1.5;
        ctx.stroke();

        ctx.beginPath();
        ctx.ellipse(cx - r * 0.2, cy - r * 0.25, r * 0.3, r * 0.15, -0.3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,0.18)';
        ctx.fill();

        if (cell.owner !== BATTLE_CONFIG.OWNER_NONE) {
            ctx.beginPath();
            ctx.arc(cx + r * 0.1, cy + r * 0.1, r * 0.3, 0, Math.PI * 2);
            ctx.fillStyle = c.glow + '0.12)';
            ctx.fill();
            ctx.beginPath();
            ctx.arc(cx - r * 0.15, cy + r * 0.2, r * 0.15, 0, Math.PI * 2);
            ctx.fillStyle = c.glow + '0.08)';
            ctx.fill();
        }

        if (cell.selected) {
            ctx.beginPath();
            ctx.arc(cx, cy, r + 8, 0, Math.PI * 2);
            ctx.strokeStyle = '#00ee77';
            ctx.lineWidth = 2;
            ctx.setLineDash([5, 5]);
            ctx.stroke();
            ctx.setLineDash([]);
        }

        if (cell.hovered && cell.owner === BATTLE_CONFIG.OWNER_PLAYER && cell.troops > 1 && !cell.selected) {
            ctx.beginPath();
            ctx.arc(cx, cy, r + 5, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(255,255,255,0.25)';
            ctx.lineWidth = 1.5;
            ctx.stroke();
        }

        const fontSize = Math.max(14, r * 0.55);
        ctx.font = `bold ${fontSize}px 'Orbitron', 'Consolas', monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#fff';
        ctx.shadowColor = 'rgba(0,0,0,0.5)';
        ctx.shadowBlur = 3;
        ctx.fillText(Math.floor(cell.troops), cx, cy);
        ctx.shadowBlur = 0;

        if (cell.owner !== BATTLE_CONFIG.OWNER_NONE && cell.troops < cell.maxTroops) {
            const bw = r * 1.6, bh = 3, by = cy + r + 8;
            ctx.fillStyle = 'rgba(0,0,0,0.4)';
            ctx.fillRect(cx - bw / 2, by, bw, bh);
            ctx.fillStyle = c.main;
            ctx.fillRect(cx - bw / 2, by, bw * (cell.troops / cell.maxTroops), bh);
        }
    }

    updateUI() {
        const pc = this.cells.filter(c => c.owner === BATTLE_CONFIG.OWNER_PLAYER);
        const ec = this.cells.filter(c => c.owner === BATTLE_CONFIG.OWNER_ENEMY);
        const pt = pc.reduce((s, c) => s + Math.floor(c.troops), 0);
        const et = ec.reduce((s, c) => s + Math.floor(c.troops), 0);
        const nc = this.cells.length - pc.length - ec.length;

        const g = document.getElementById('bp-green-count');
        const r = document.getElementById('bp-red-count');
        const tl = document.getElementById('battle-turn-label');
        const tc = document.getElementById('battle-turn-count');

        if (g) g.textContent = `${pc.length} (${pt})`;
        if (r) r.textContent = `${ec.length} (${et})`;
        if (tl) tl.textContent = `${Math.floor(this.time)}s`;
        if (tc) tc.textContent = `${nc} 空细胞`;
    }

    spawnParticles(x, y, color, count) {
        for (let i = 0; i < count; i++) {
            const a = Math.random() * Math.PI * 2;
            const sp = 30 + Math.random() * 60;
            this.particles.push({
                x, y, color,
                vx: Math.cos(a) * sp, vy: Math.sin(a) * sp,
                life: 0.5 + Math.random() * 0.5,
                maxLife: 0.5 + Math.random() * 0.5,
                size: 2 + Math.random() * 3,
            });
        }
    }
}
