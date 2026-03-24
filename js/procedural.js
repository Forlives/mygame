const ProceduralGen = (() => {
    function hashSeed(str) {
        let h = 0;
        for (let i = 0; i < str.length; i++) {
            h = ((h << 5) - h + str.charCodeAt(i)) | 0;
        }
        return Math.abs(h);
    }

    class SeededRNG {
        constructor(seed) {
            this.state = seed % 2147483647;
            if (this.state <= 0) this.state += 2147483646;
        }
        next() {
            this.state = (this.state * 16807) % 2147483647;
            return (this.state - 1) / 2147483646;
        }
        int(min, max) { return Math.floor(this.next() * (max - min + 1)) + min; }
        pick(arr) { return arr[this.int(0, arr.length - 1)]; }
        chance(p) { return this.next() < p; }
    }

    function getTodaySeed() {
        const d = new Date();
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    }

    function generateLevel(rng, difficulty) {
        const W = 1200, H = 700;
        const pad = 80;
        const factionCount = difficulty < 2 ? 2 : difficulty < 4 ? rng.int(2, 3) : rng.int(2, 4);
        const neutralCount = rng.int(4, 6) + difficulty;
        const totalCells = factionCount + neutralCount;
        const cells = [];
        const types = ['normal', 'normal', 'normal', 'factory', 'fort', 'speed'];

        function noOverlap(x, y, r) {
            return cells.every(c => Math.hypot(c.x - x, c.y - y) > c.r + r + 30);
        }

        function placeCell(owner, minR, maxR, minT, maxT, typePool) {
            for (let attempt = 0; attempt < 200; attempt++) {
                const r = rng.int(minR, maxR);
                const x = rng.int(pad + r, W - pad - r);
                const y = rng.int(pad + r, H - pad - r);
                if (noOverlap(x, y, r)) {
                    const type = typePool ? rng.pick(typePool) : 'normal';
                    cells.push({ x, y, r, t: rng.int(minT, maxT), o: owner, type });
                    return true;
                }
            }
            return false;
        }

        placeCell(1, 36, 44, 10, 14, ['normal']);

        for (let f = 2; f <= factionCount; f++) {
            placeCell(f, 34, 42, 8, 12, ['normal']);
        }

        for (let i = 0; i < neutralCount; i++) {
            const typePool = rng.chance(0.3) ? types : ['normal'];
            placeCell(0, 20, 34, 2, 8, typePool);
        }

        const aiInterval = Math.max(1.2, 3.5 - difficulty * 0.35 + rng.next() * 0.3);

        const names = [
            '随机培养皿', '未知生态', '混沌战场', '异变区域', '生物实验',
            '变异温床', '微观战争', '细胞风暴', '基因竞技', '病原争霸',
        ];
        const descs = [
            '每日随机生成的挑战', '今天的独特战场', '适应未知环境',
            '随机地形考验策略', '探索新的可能性',
        ];

        return {
            name: rng.pick(names),
            desc: rng.pick(descs),
            aiInterval,
            cells,
            seed: true,
        };
    }

    function generateDailyLevels(dateStr) {
        const seed = dateStr || getTodaySeed();
        const h = hashSeed(seed);
        const levels = [];
        for (let i = 0; i < 3; i++) {
            const rng = new SeededRNG(h + i * 7919);
            levels.push(generateLevel(rng, i * 2));
        }
        return { seed, levels };
    }

    function generateFromSeed(seedStr) {
        const h = hashSeed(seedStr);
        const rng = new SeededRNG(h);
        return generateLevel(rng, 2);
    }

    return { generateDailyLevels, generateFromSeed, getTodaySeed, SeededRNG, hashSeed };
})();
