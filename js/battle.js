const B = {
    EMPTY: 0, P1: 1, P2: 2, P3: 3, P4: 4,
    SPAWN_RATE: 0.7,
    TROOP_SPEED: 2.8,
    SEND_RATIO: 0.5,
    COLORS: {
        0: { main: '#556677', light: '#7799aa', glow: 'rgba(85,102,119,', dark: '#334455', name: '空' },
        1: { main: '#00ee77', light: '#55ffaa', glow: 'rgba(0,238,119,', dark: '#007744', name: '你' },
        2: { main: '#ee4455', light: '#ff7788', glow: 'rgba(238,68,85,', dark: '#992233', name: '红' },
        3: { main: '#4488ff', light: '#77aaff', glow: 'rgba(68,136,255,', dark: '#224488', name: '蓝' },
        4: { main: '#cc55ff', light: '#dd88ff', glow: 'rgba(204,85,255,', dark: '#772299', name: '紫' },
    },
    CELL_TYPES: {
        normal:  { icon: '', spawnMult: 1.0, capMult: 1.0,  defMult: 1.0, desc: '普通' },
        factory: { icon: '⚡', spawnMult: 2.0, capMult: 0.8, defMult: 0.8, desc: '工厂-产兵x2' },
        fort:    { icon: '🛡', spawnMult: 0.6, capMult: 1.8, defMult: 1.5, desc: '堡垒-防御强' },
        speed:   { icon: '💨', spawnMult: 1.0, capMult: 1.0, defMult: 1.0, desc: '加速-兵速x1.5' },
    },
    SKILL_COOLDOWNS: { rush: 30, shield: 45, boost: 25 },
};

const LEVELS = [
    {
        name: '初识培养皿', desc: '学习拖拽派兵', aiInterval: 4.0,
        cells: [
            { x: 200, y: 350, r: 44, t: 12, o: 1 },
            { x: 1000, y: 350, r: 44, t: 12, o: 2 },
            { x: 600, y: 350, r: 38, t: 6, o: 0 },
            { x: 400, y: 200, r: 30, t: 4, o: 0 },
            { x: 400, y: 500, r: 30, t: 4, o: 0 },
            { x: 800, y: 200, r: 30, t: 4, o: 0 },
            { x: 800, y: 500, r: 30, t: 4, o: 0 },
        ],
    },
    {
        name: '工厂争夺', desc: '抢占工厂细胞', aiInterval: 3.5,
        cells: [
            { x: 150, y: 350, r: 40, t: 10, o: 1 },
            { x: 1050, y: 350, r: 40, t: 10, o: 2 },
            { x: 600, y: 350, r: 42, t: 8, o: 0, type: 'factory' },
            { x: 400, y: 200, r: 28, t: 4, o: 0 },
            { x: 800, y: 500, r: 28, t: 4, o: 0 },
            { x: 400, y: 500, r: 26, t: 3, o: 0 },
            { x: 800, y: 200, r: 26, t: 3, o: 0 },
            { x: 300, y: 350, r: 24, t: 3, o: 0 },
            { x: 900, y: 350, r: 24, t: 3, o: 0 },
        ],
    },
    {
        name: '堡垒攻略', desc: '突破敌方堡垒', aiInterval: 3.0,
        cells: [
            { x: 150, y: 350, r: 42, t: 12, o: 1 },
            { x: 1050, y: 250, r: 40, t: 10, o: 2 },
            { x: 1050, y: 450, r: 36, t: 8, o: 2 },
            { x: 750, y: 350, r: 44, t: 15, o: 0, type: 'fort' },
            { x: 400, y: 200, r: 28, t: 5, o: 0, type: 'factory' },
            { x: 400, y: 500, r: 28, t: 5, o: 0 },
            { x: 600, y: 200, r: 24, t: 3, o: 0 },
            { x: 600, y: 500, r: 24, t: 3, o: 0 },
            { x: 300, y: 350, r: 22, t: 2, o: 0 },
            { x: 900, y: 350, r: 22, t: 4, o: 0 },
        ],
    },
    {
        name: '三方混战', desc: '三方势力同时作战', aiInterval: 2.5,
        cells: [
            { x: 600, y: 120, r: 40, t: 10, o: 1 },
            { x: 200, y: 520, r: 40, t: 10, o: 2 },
            { x: 1000, y: 520, r: 40, t: 10, o: 3 },
            { x: 400, y: 300, r: 30, t: 5, o: 0 },
            { x: 800, y: 300, r: 30, t: 5, o: 0 },
            { x: 600, y: 480, r: 32, t: 6, o: 0 },
            { x: 350, y: 420, r: 26, t: 3, o: 0 },
            { x: 850, y: 420, r: 26, t: 3, o: 0 },
            { x: 600, y: 300, r: 36, t: 8, o: 0, type: 'factory' },
            { x: 450, y: 150, r: 22, t: 2, o: 0 },
            { x: 750, y: 150, r: 22, t: 2, o: 0 },
        ],
    },
    {
        name: '速攻战场', desc: '快速扩张是关键', aiInterval: 2.0,
        cells: [
            { x: 150, y: 350, r: 38, t: 10, o: 1 },
            { x: 1050, y: 200, r: 38, t: 10, o: 2 },
            { x: 1050, y: 500, r: 34, t: 8, o: 2 },
            { x: 350, y: 180, r: 26, t: 4, o: 0, type: 'speed' },
            { x: 350, y: 520, r: 26, t: 4, o: 0, type: 'speed' },
            { x: 550, y: 280, r: 28, t: 5, o: 0 },
            { x: 550, y: 420, r: 28, t: 5, o: 0 },
            { x: 750, y: 200, r: 30, t: 6, o: 0, type: 'factory' },
            { x: 750, y: 500, r: 30, t: 6, o: 0 },
            { x: 600, y: 350, r: 40, t: 12, o: 0, type: 'fort' },
            { x: 900, y: 350, r: 24, t: 3, o: 0 },
            { x: 250, y: 350, r: 22, t: 2, o: 0 },
        ],
    },
    {
        name: '四面楚歌', desc: '被三方围攻！', aiInterval: 2.0,
        cells: [
            { x: 600, y: 350, r: 46, t: 18, o: 1, type: 'fort' },
            { x: 150, y: 180, r: 34, t: 8, o: 2 },
            { x: 1050, y: 180, r: 34, t: 8, o: 3 },
            { x: 600, y: 600, r: 36, t: 10, o: 4 },
            { x: 350, y: 250, r: 26, t: 4, o: 0 },
            { x: 850, y: 250, r: 26, t: 4, o: 0 },
            { x: 350, y: 500, r: 26, t: 4, o: 0 },
            { x: 850, y: 500, r: 26, t: 4, o: 0 },
            { x: 450, y: 350, r: 24, t: 3, o: 0, type: 'factory' },
            { x: 750, y: 350, r: 24, t: 3, o: 0, type: 'factory' },
            { x: 600, y: 200, r: 22, t: 2, o: 0 },
            { x: 600, y: 500, r: 22, t: 2, o: 0 },
        ],
    },
    {
        name: '蚁群大战', desc: '大量小细胞混战', aiInterval: 1.8,
        cells: [
            { x: 150, y: 250, r: 36, t: 10, o: 1 },
            { x: 150, y: 450, r: 28, t: 6, o: 1 },
            { x: 1050, y: 250, r: 36, t: 10, o: 2 },
            { x: 1050, y: 450, r: 28, t: 6, o: 2 },
            { x: 600, y: 150, r: 32, t: 8, o: 3 },
            { x: 600, y: 550, r: 32, t: 8, o: 4 },
            ...Array.from({ length: 8 }, (_, i) => ({
                x: 300 + (i % 4) * 160, y: 250 + Math.floor(i / 4) * 200,
                r: 22, t: 3, o: 0, type: i === 3 ? 'factory' : i === 6 ? 'speed' : 'normal',
            })),
        ],
    },
    {
        name: '终极堡垒', desc: '攻克敌方堡垒群', aiInterval: 1.5,
        cells: [
            { x: 150, y: 350, r: 44, t: 15, o: 1 },
            { x: 300, y: 200, r: 26, t: 4, o: 1, type: 'factory' },
            { x: 300, y: 500, r: 26, t: 4, o: 1 },
            { x: 900, y: 200, r: 40, t: 12, o: 2, type: 'fort' },
            { x: 900, y: 350, r: 44, t: 18, o: 2, type: 'fort' },
            { x: 900, y: 500, r: 40, t: 12, o: 2, type: 'fort' },
            { x: 600, y: 200, r: 30, t: 6, o: 0, type: 'speed' },
            { x: 600, y: 350, r: 36, t: 10, o: 0, type: 'factory' },
            { x: 600, y: 500, r: 30, t: 6, o: 0 },
            { x: 450, y: 280, r: 22, t: 3, o: 0 },
            { x: 450, y: 420, r: 22, t: 3, o: 0 },
            { x: 750, y: 280, r: 24, t: 5, o: 0 },
            { x: 750, y: 420, r: 24, t: 5, o: 0 },
        ],
    },
    {
        name: '终极对决', desc: '四方终极混战', aiInterval: 1.2,
        cells: [
            { x: 150, y: 180, r: 40, t: 12, o: 1 },
            { x: 1050, y: 180, r: 40, t: 12, o: 2 },
            { x: 150, y: 520, r: 40, t: 12, o: 3 },
            { x: 1050, y: 520, r: 40, t: 12, o: 4 },
            { x: 600, y: 350, r: 48, t: 20, o: 0, type: 'fort' },
            { x: 400, y: 200, r: 28, t: 5, o: 0, type: 'factory' },
            { x: 800, y: 200, r: 28, t: 5, o: 0, type: 'factory' },
            { x: 400, y: 500, r: 28, t: 5, o: 0, type: 'speed' },
            { x: 800, y: 500, r: 28, t: 5, o: 0, type: 'speed' },
            { x: 300, y: 350, r: 26, t: 4, o: 0 },
            { x: 900, y: 350, r: 26, t: 4, o: 0 },
            { x: 600, y: 180, r: 24, t: 3, o: 0 },
            { x: 600, y: 520, r: 24, t: 3, o: 0 },
            { x: 450, y: 350, r: 20, t: 2, o: 0 },
            { x: 750, y: 350, r: 20, t: 2, o: 0 },
        ],
    },
];

class Cell {
    constructor(x, y, radius, troops, owner, type) {
        this.x = x; this.y = y;
        this.radius = radius;
        this.troops = troops;
        this.owner = owner;
        this.type = type || 'normal';
        this.level = 0;
        const tc = B.CELL_TYPES[this.type];
        this.maxTroops = Math.floor(radius * 2.5 * tc.capMult);
        this.spawnRate = B.SPAWN_RATE * tc.spawnMult;
        this.defense = tc.defMult;
        this.spawnTimer = 0;
        this.pulsePhase = Math.random() * Math.PI * 2;
        this.selected = false;
        this.hovered = false;
        this.shakeTimer = 0;
        this.shakeIntensity = 0;
        this.captureFlash = 0;
        this.shieldTimer = 0;
        this.boostTimer = 0;
    }

    update(dt) {
        this.pulsePhase += dt * 1.5;
        if (this.shakeTimer > 0) this.shakeTimer -= dt;
        if (this.captureFlash > 0) this.captureFlash -= dt * 3;
        if (this.shieldTimer > 0) this.shieldTimer -= dt;
        if (this.boostTimer > 0) this.boostTimer -= dt;

        if (this.owner !== B.EMPTY) {
            const rate = this.boostTimer > 0 ? this.spawnRate * 2 : this.spawnRate;
            this.spawnTimer += dt;
            if (this.spawnTimer >= 1 / rate && this.troops < this.maxTroops) {
                this.troops++;
                this.spawnTimer = 0;
            }
        }
    }

    contains(mx, my) { return Math.hypot(mx - this.x, my - this.y) <= this.radius + 5; }
    shake() { this.shakeTimer = 0.3; this.shakeIntensity = 5; }
    flash() { this.captureFlash = 1.0; }

    getUpgradeCost() { return [8, 15, 25][this.level] || Infinity; }

    upgrade() {
        if (this.level >= 3) return false;
        const cost = this.getUpgradeCost();
        if (this.troops < cost) return false;
        this.troops -= cost;
        this.level++;
        this.maxTroops = Math.floor(this.maxTroops * 1.2);
        this.spawnRate *= 1.15;
        this.defense *= 1.1;
        return true;
    }
}

class Pipeline {
    constructor(from, to, owner) {
        this.from = from; this.to = to; this.owner = owner;
        this.dead = false;
        this.totalDist = Math.hypot(to.x - from.x, to.y - from.y);
        this.flowRate = 4.0;
        this.flowTimer = 0;
        this.dots = [];
        const isSpeed = from.type === 'speed' || to.type === 'speed';
        this.speedMult = isSpeed ? 1.5 : 1.0;
    }

    update(dt) {
        if (this.from.owner !== this.owner || this.from.troops <= 1) {
            if (this.dots.length === 0) this.dead = true;
        } else {
            this.flowTimer += dt * this.flowRate;
            if (this.flowTimer >= 1) {
                this.flowTimer -= 1;
                if (this.from.troops > 1) {
                    this.from.troops--;
                    this.dots.push({ progress: 0 });
                }
            }
        }

        const speed = B.TROOP_SPEED * this.speedMult * 60 * dt / this.totalDist;
        for (const d of this.dots) d.progress += speed;

        const arrived = this.dots.filter(d => d.progress >= 1);
        this.dots = this.dots.filter(d => d.progress < 1);

        for (const _ of arrived) {
            const t = this.to;
            if (t.shieldTimer > 0 && t.owner !== this.owner) continue;
            if (t.owner === this.owner) {
                t.troops++;
            } else {
                const dmg = Math.max(1, Math.round(1 / t.defense));
                t.troops -= dmg;
                t.shake();
                if (t.troops <= 0) {
                    t.troops = 1;
                    t.owner = this.owner;
                    t.flash();
                    gameAudio.play('capture');
                    if (window.battleGame) {
                        window.battleGame.spawnParticles(t.x, t.y, B.COLORS[this.owner].main, 12);
                    }
                }
            }
        }
    }

    getDots() {
        return this.dots.map(d => ({
            x: this.from.x + (this.to.x - this.from.x) * d.progress,
            y: this.from.y + (this.to.y - this.from.y) * d.progress,
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
        this.mouseX = 0; this.mouseY = 0;
        this.hoveredCell = null;
        this.dragging = false;
        this.dragSource = null;
        this.time = 0;
        this.aiTimer = 0;
        this.aiInterval = 2.0;
        this.gameSpeed = 1;

        this.skills = {
            rush: { cd: 0, maxCd: B.SKILL_COOLDOWNS.rush, name: '全军出击', desc: '所有细胞同时派兵' },
            shield: { cd: 0, maxCd: B.SKILL_COOLDOWNS.shield, name: '防御护盾', desc: '所有细胞无敌5秒' },
            boost: { cd: 0, maxCd: B.SKILL_COOLDOWNS.boost, name: '加速产兵', desc: '产兵速度x2持续8秒' },
        };

        this.completedLevels = this.loadProgress();
        this.bindEvents();
    }

    loadProgress() {
        try { const d = localStorage.getItem('bacteria_war_progress'); return d ? JSON.parse(d) : {}; }
        catch { return {}; }
    }

    saveProgress() {
        try { localStorage.setItem('bacteria_war_progress', JSON.stringify(this.completedLevels)); } catch {}
    }

    init(levelIndex) {
        this.currentLevel = levelIndex;
        const lv = LEVELS[levelIndex];
        this.aiInterval = lv.aiInterval;
        this.cells = lv.cells.map(c => new Cell(c.x, c.y, c.r, c.t, c.o, c.type));
        this.pipelines = [];
        this.particles = [];
        this.floatingTexts = [];
        this.dragging = false;
        this.dragSource = null;
        this.time = 0;
        this.aiTimer = this.aiInterval;
        this.state = 'playing';
        Object.values(this.skills).forEach(s => s.cd = 0);
        this.updateUI();
        this.updateSkillUI();
    }

    bindEvents() {
        const getPos = (e) => {
            const r = this.canvas.getBoundingClientRect();
            return { x: (e.clientX - r.left) * (CONFIG.CANVAS_W / r.width), y: (e.clientY - r.top) * (CONFIG.CANVAS_H / r.height) };
        };
        const findCell = (x, y) => this.cells.find(c => c.contains(x, y)) || null;

        this.canvas.addEventListener('mousemove', (e) => {
            if (this.state !== 'playing') return;
            const p = getPos(e);
            this.mouseX = p.x; this.mouseY = p.y;
            this.hoveredCell = null;
            for (const c of this.cells) { c.hovered = c.contains(p.x, p.y); if (c.hovered) this.hoveredCell = c; }
        });

        this.canvas.addEventListener('mousedown', (e) => {
            if (this.state !== 'playing' || e.button !== 0) return;
            const p = getPos(e);
            const cell = findCell(p.x, p.y);
            if (cell && cell.owner === B.P1 && cell.troops > 1) {
                this.dragging = true;
                this.dragSource = cell;
                cell.selected = true;
            }
        });

        this.canvas.addEventListener('mouseup', (e) => {
            if (!this.dragging || e.button !== 0) return;
            const p = getPos(e);
            const target = findCell(p.x, p.y);
            if (target && target !== this.dragSource) {
                this.sendTroops(this.dragSource, target, B.P1);
            }
            if (this.dragSource) this.dragSource.selected = false;
            this.dragging = false;
            this.dragSource = null;
        });

        this.canvas.addEventListener('dblclick', (e) => {
            if (this.state !== 'playing') return;
            const p = getPos(e);
            const cell = findCell(p.x, p.y);
            if (cell && cell.owner === B.P1) {
                if (cell.upgrade()) {
                    gameAudio.play('upgrade');
                    this.addFloat(cell.x, cell.y - 20, `LV.${cell.level}↑`, '#ffcc00');
                }
            }
        });

        this.canvas.addEventListener('mouseleave', () => {
            if (this.dragging && this.dragSource) this.dragSource.selected = false;
            this.dragging = false;
            this.dragSource = null;
        });
        this.canvas.addEventListener('contextmenu', (e) => e.preventDefault());

        this.lastTapTime = 0;
        this.canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            if (this.state !== 'playing') return;
            const touch = e.touches[0];
            const p = getPos(touch);
            this.mouseX = p.x; this.mouseY = p.y;
            this.hoveredCell = null;
            for (const c of this.cells) { c.hovered = c.contains(p.x, p.y); if (c.hovered) this.hoveredCell = c; }

            const now = Date.now();
            const cell = findCell(p.x, p.y);
            if (cell && cell.owner === B.P1 && now - this.lastTapTime < 350 && this._lastTapCell === cell) {
                if (cell.upgrade()) {
                    gameAudio.play('upgrade');
                    this.addFloat(cell.x, cell.y - 20, `LV.${cell.level}↑`, '#ffcc00');
                }
                this.lastTapTime = 0;
                return;
            }
            this.lastTapTime = now;
            this._lastTapCell = cell;

            if (cell && cell.owner === B.P1 && cell.troops > 1) {
                this.dragging = true;
                this.dragSource = cell;
                cell.selected = true;
            }
        }, { passive: false });

        this.canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            if (this.state !== 'playing') return;
            const touch = e.touches[0];
            const p = getPos(touch);
            this.mouseX = p.x; this.mouseY = p.y;
            this.hoveredCell = null;
            for (const c of this.cells) { c.hovered = c.contains(p.x, p.y); if (c.hovered) this.hoveredCell = c; }
        }, { passive: false });

        this.canvas.addEventListener('touchend', (e) => {
            e.preventDefault();
            if (this.dragging) {
                const target = this.hoveredCell;
                if (target && target !== this.dragSource) {
                    this.sendTroops(this.dragSource, target, B.P1);
                }
                if (this.dragSource) this.dragSource.selected = false;
                this.dragging = false;
                this.dragSource = null;
            }
        }, { passive: false });
    }

    sendTroops(from, to, owner) {
        if (from.troops <= 1) return;
        const existing = this.pipelines.find(p => p.from === from && !p.dead && p.owner === owner);
        if (existing) existing.dead = true;
        this.pipelines.push(new Pipeline(from, to, owner));
        gameAudio.play(to.owner === owner ? 'clone' : 'jump');
    }

    useSkill(name) {
        const s = this.skills[name];
        if (!s || s.cd > 0 || this.state !== 'playing') return;

        s.cd = s.maxCd;
        gameAudio.play('wave');

        if (name === 'rush') {
            const myCells = this.cells.filter(c => c.owner === B.P1 && c.troops > 3);
            const enemies = this.cells.filter(c => c.owner !== B.P1 && c.owner !== B.EMPTY);
            if (enemies.length > 0) {
                for (const mc of myCells) {
                    const nearest = enemies.reduce((best, e) =>
                        Math.hypot(e.x - mc.x, e.y - mc.y) < Math.hypot(best.x - mc.x, best.y - mc.y) ? e : best
                    );
                    this.sendTroops(mc, nearest, B.P1);
                }
            }
            this.addFloat(600, 300, '全军出击!', '#ffcc00');
        } else if (name === 'shield') {
            this.cells.filter(c => c.owner === B.P1).forEach(c => c.shieldTimer = 5);
            this.addFloat(600, 300, '护盾启动!', '#4488ff');
        } else if (name === 'boost') {
            this.cells.filter(c => c.owner === B.P1).forEach(c => c.boostTimer = 8);
            this.addFloat(600, 300, '产兵加速!', '#00ff88');
        }

        this.updateSkillUI();
    }

    addFloat(x, y, text, color) {
        this.floatingTexts.push({ x, y, text, color, timer: 1.5, maxTimer: 1.5 });
    }

    update(dt) {
        if (this.state !== 'playing') return;
        const sdt = dt * this.gameSpeed;
        this.time += sdt;

        for (const c of this.cells) c.update(sdt);
        for (const p of this.pipelines) p.update(sdt);
        this.pipelines = this.pipelines.filter(p => !p.dead);

        for (const p of this.particles) { p.x += p.vx * sdt; p.y += p.vy * sdt; p.life -= sdt; }
        this.particles = this.particles.filter(p => p.life > 0);
        for (const ft of this.floatingTexts) { ft.timer -= sdt; ft.y -= sdt * 25; }
        this.floatingTexts = this.floatingTexts.filter(ft => ft.timer > 0);

        Object.values(this.skills).forEach(s => { if (s.cd > 0) s.cd = Math.max(0, s.cd - sdt); });

        this.aiTimer -= sdt;
        if (this.aiTimer <= 0) {
            const factions = [...new Set(this.cells.filter(c => c.owner > 1).map(c => c.owner))];
            for (const f of factions) this.aiThink(f);
            this.aiTimer = this.aiInterval + Math.random() * 0.5;
        }

        this.updateUI();
        if (Math.floor(this.time * 2) % 2 === 0) this.updateSkillUI();
        this.checkGameOver();
    }

    aiThink(faction) {
        const myCells = this.cells.filter(c => c.owner === faction && c.troops > 4);
        if (myCells.length === 0) return;

        let best = null, bestScore = -Infinity;
        for (const src of myCells) {
            for (const tgt of this.cells) {
                if (tgt === src || tgt.owner === faction) continue;
                const dist = Math.hypot(tgt.x - src.x, tgt.y - src.y);
                let score = -dist * 0.012;
                const send = Math.ceil(src.troops * B.SEND_RATIO);

                if (tgt.owner === B.EMPTY) {
                    score += send > tgt.troops + 2 ? 20 + tgt.maxTroops * 0.2 : -5;
                } else if (tgt.owner === B.P1) {
                    score += send > tgt.troops * 0.6 ? 35 + tgt.troops * 0.4 : (send - tgt.troops) * 1.2;
                } else {
                    score += send > tgt.troops * 0.7 ? 15 : -3;
                }

                if (score > bestScore) { bestScore = score; best = { src, tgt }; }
            }
        }
        if (best && bestScore > 0) this.sendTroops(best.src, best.tgt, faction);
    }

    checkGameOver() {
        const p = this.cells.filter(c => c.owner === B.P1);
        const enemies = this.cells.filter(c => c.owner > 1);
        const pp = this.pipelines.some(pipe => pipe.owner === B.P1 && pipe.dots.length > 0);
        const ep = this.pipelines.some(pipe => pipe.owner > 1 && pipe.dots.length > 0);

        if (p.length === 0 && !pp) this.endGame('lose');
        else if (enemies.length === 0 && !ep) this.endGame('win');
    }

    endGame(result) {
        this.state = 'ended';
        if (result === 'win') {
            const stars = this.time < 60 ? 3 : this.time < 120 ? 2 : 1;
            this.completedLevels[this.currentLevel] = Math.max(this.completedLevels[this.currentLevel] || 0, stars);
            this.saveProgress();
        }

        const pc = this.cells.filter(c => c.owner === B.P1);
        const pt = pc.reduce((s, c) => s + Math.floor(c.troops), 0);

        const el = document.getElementById('battle-result');
        const title = document.getElementById('battle-result-title');
        const stats = document.getElementById('battle-result-stats');

        if (result === 'win') {
            title.textContent = '占 领 成 功!';
            title.style.color = '#00ff88';
            el.style.background = 'radial-gradient(ellipse at center, rgba(0,60,30,0.9) 0%, rgba(3,6,16,0.98) 70%)';
            const s = this.completedLevels[this.currentLevel];
            stats.innerHTML = `${'⭐'.repeat(s)}${'☆'.repeat(3 - s)}<br>占领 ${pc.length} 个细胞（${pt}兵力）<br>用时 ${Math.floor(this.time)}秒`;
            gameAudio.play('win');
        } else {
            title.textContent = '全 军 覆 没';
            title.style.color = '#ff4444';
            el.style.background = 'radial-gradient(ellipse at center, rgba(60,0,0,0.9) 0%, rgba(3,6,16,0.98) 70%)';
            stats.innerHTML = `坚持了 ${Math.floor(this.time)} 秒`;
            gameAudio.play('lose');
        }

        const next = document.getElementById('battle-next');
        if (next) next.style.display = result === 'win' && this.currentLevel < LEVELS.length - 1 ? 'inline-block' : 'none';
        el.style.display = 'flex';

        document.getElementById('skill-bar')?.style && (document.getElementById('skill-bar').style.display = 'none');
    }

    // ====== Rendering ======

    render() {
        const ctx = this.ctx;
        ctx.clearRect(0, 0, CONFIG.CANVAS_W, CONFIG.CANVAS_H);
        ctx.fillStyle = 'rgba(3, 6, 16, 0.7)';
        ctx.fillRect(0, 0, CONFIG.CANVAS_W, CONFIG.CANVAS_H);

        for (const pipe of this.pipelines) {
            if (pipe.dead && pipe.dots.length === 0) continue;
            const c = B.COLORS[pipe.owner];
            ctx.beginPath();
            ctx.moveTo(pipe.from.x, pipe.from.y);
            ctx.lineTo(pipe.to.x, pipe.to.y);
            ctx.strokeStyle = c.glow + '0.12)';
            ctx.lineWidth = 2.5;
            ctx.stroke();

            for (const d of pipe.getDots()) {
                ctx.beginPath();
                ctx.arc(d.x, d.y, 3.5, 0, Math.PI * 2);
                ctx.fillStyle = c.main;
                ctx.fill();
                ctx.beginPath();
                ctx.arc(d.x, d.y, 6, 0, Math.PI * 2);
                ctx.fillStyle = c.glow + '0.12)';
                ctx.fill();
            }
        }

        if (this.dragging && this.dragSource) {
            const s = this.dragSource;
            const rp = Math.sin(this.time * 4) * 4;
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.radius + 10 + rp, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(0,238,119,${0.35 + Math.sin(this.time * 3) * 0.1})`;
            ctx.lineWidth = 2.5;
            ctx.stroke();

            let ex = this.mouseX, ey = this.mouseY;
            const t = this.hoveredCell;
            if (t && t !== s) { ex = t.x; ey = t.y; }

            const angle = Math.atan2(ey - s.y, ex - s.x);
            const sx = s.x + Math.cos(angle) * (s.radius + 5);
            const sy = s.y + Math.sin(angle) * (s.radius + 5);

            ctx.save();
            ctx.strokeStyle = 'rgba(255,220,0,0.5)';
            ctx.lineWidth = 3;
            ctx.setLineDash([8, 5]);
            ctx.lineDashOffset = -this.time * 50;
            ctx.beginPath();
            ctx.moveTo(sx, sy);
            ctx.lineTo(ex, ey);
            ctx.stroke();
            ctx.setLineDash([]);
            ctx.restore();

            ctx.save();
            ctx.translate(ex, ey);
            ctx.rotate(angle);
            ctx.beginPath();
            ctx.moveTo(10, 0); ctx.lineTo(-5, -6); ctx.lineTo(-2, 0); ctx.lineTo(-5, 6);
            ctx.closePath();
            ctx.fillStyle = 'rgba(255,220,0,0.7)';
            ctx.fill();
            ctx.restore();

            if (t && t !== s) {
                const send = Math.ceil(s.troops * B.SEND_RATIO);
                ctx.font = 'bold 15px Orbitron, Consolas, monospace';
                ctx.textAlign = 'center';
                ctx.fillStyle = '#fff';
                ctx.fillText(send, (s.x + ex) / 2, (s.y + ey) / 2 - 10);
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
            ctx.font = 'bold 18px Rajdhani, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillStyle = ft.color;
            ctx.shadowColor = ft.color;
            ctx.shadowBlur = 8;
            ctx.fillText(ft.text, ft.x, ft.y);
            ctx.shadowBlur = 0;
            ctx.restore();
        }
    }

    renderCell(ctx, cell) {
        const c = B.COLORS[cell.owner];
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

        if (cell.shieldTimer > 0) {
            ctx.beginPath();
            ctx.arc(cx, cy, r + 8, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(68,136,255,${0.3 + Math.sin(this.time * 5) * 0.15})`;
            ctx.lineWidth = 3;
            ctx.setLineDash([6, 4]);
            ctx.stroke();
            ctx.setLineDash([]);
        }

        const glow = ctx.createRadialGradient(cx, cy, r * 0.4, cx, cy, r + 12);
        glow.addColorStop(0, c.glow + '0.18)');
        glow.addColorStop(1, c.glow + '0)');
        ctx.beginPath();
        ctx.arc(cx, cy, r + 12, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        const membrane = ctx.createRadialGradient(cx, cy, r * 0.6, cx, cy, r);
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
        ctx.ellipse(cx - r * 0.2, cy - r * 0.2, r * 0.25, r * 0.12, -0.3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,0.15)';
        ctx.fill();

        if (cell.selected) {
            ctx.beginPath();
            ctx.arc(cx, cy, r + 8, 0, Math.PI * 2);
            ctx.strokeStyle = '#00ee77';
            ctx.lineWidth = 2;
            ctx.setLineDash([5, 5]);
            ctx.stroke();
            ctx.setLineDash([]);
        }

        const fs = Math.max(13, r * 0.5);
        ctx.font = `bold ${fs}px Orbitron, Consolas, monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#fff';
        ctx.shadowColor = 'rgba(0,0,0,0.5)';
        ctx.shadowBlur = 3;
        ctx.fillText(Math.floor(cell.troops), cx, cy);
        ctx.shadowBlur = 0;

        const tc = B.CELL_TYPES[cell.type];
        if (tc.icon) {
            ctx.font = `${Math.max(10, r * 0.3)}px sans-serif`;
            ctx.fillText(tc.icon, cx, cy - r - 6);
        }

        if (cell.level > 0) {
            ctx.font = '10px Orbitron, monospace';
            ctx.fillStyle = '#ffcc00';
            ctx.fillText('★'.repeat(cell.level), cx, cy + r + 12);
        }

        if (cell.owner !== B.EMPTY && cell.troops < cell.maxTroops) {
            const bw = r * 1.6, bh = 3, by = cy + r + (cell.level > 0 ? 20 : 8);
            ctx.fillStyle = 'rgba(0,0,0,0.4)';
            ctx.fillRect(cx - bw / 2, by, bw, bh);
            ctx.fillStyle = c.main;
            ctx.fillRect(cx - bw / 2, by, bw * (cell.troops / cell.maxTroops), bh);
        }

        if (cell.hovered && cell.owner === B.P1 && !cell.selected) {
            ctx.beginPath();
            ctx.arc(cx, cy, r + 4, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(255,255,255,0.2)';
            ctx.lineWidth = 1.5;
            ctx.stroke();
        }
    }

    updateUI() {
        const pc = this.cells.filter(c => c.owner === B.P1);
        const pt = pc.reduce((s, c) => s + Math.floor(c.troops), 0);
        const ec = this.cells.filter(c => c.owner > 1);
        const et = ec.reduce((s, c) => s + Math.floor(c.troops), 0);
        const nc = this.cells.filter(c => c.owner === B.EMPTY).length;

        const g = document.getElementById('bp-green-count');
        const r = document.getElementById('bp-red-count');
        const tl = document.getElementById('battle-turn-label');
        const tc = document.getElementById('battle-turn-count');

        if (g) g.textContent = `${pc.length} (${pt})`;
        if (r) r.textContent = `${ec.length} (${et})`;
        if (tl) tl.textContent = `${Math.floor(this.time)}s`;
        if (tc) tc.textContent = `${nc} 空细胞`;
    }

    updateSkillUI() {
        const bar = document.getElementById('skill-bar');
        if (!bar) return;
        bar.style.display = this.state === 'playing' ? 'flex' : 'none';

        for (const [name, s] of Object.entries(this.skills)) {
            const btn = document.getElementById(`skill-${name}`);
            if (!btn) continue;
            const ready = s.cd <= 0;
            btn.className = 'skill-btn' + (ready ? '' : ' on-cd');
            const cdEl = btn.querySelector('.skill-cd');
            if (cdEl) cdEl.textContent = ready ? '' : `${Math.ceil(s.cd)}s`;
        }
    }

    spawnParticles(x, y, color, count) {
        for (let i = 0; i < count; i++) {
            const a = Math.random() * Math.PI * 2;
            const sp = 30 + Math.random() * 60;
            this.particles.push({ x, y, color, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, life: 0.5 + Math.random() * 0.5, maxLife: 0.5 + Math.random() * 0.5, size: 2 + Math.random() * 3 });
        }
    }
}
