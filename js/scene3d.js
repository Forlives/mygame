class Scene3D {
    constructor(container) {
        this.container = container;
        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera(45, 1200 / 700, 0.1, 1000);
        this.camera.position.set(0, 8, 6);
        this.camera.lookAt(0, 0, 0);

        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setSize(1200, 700);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.setClearColor(0x030610, 1);
        this.renderer.domElement.style.position = 'absolute';
        this.renderer.domElement.style.top = '0';
        this.renderer.domElement.style.left = '0';
        this.renderer.domElement.style.zIndex = '0';
        container.insertBefore(this.renderer.domElement, container.firstChild);

        this.time = 0;
        this.particles = [];

        this.setupLights();
        this.setupPetriDish();
        this.setupParticles();
        this.setupGrid();
    }

    setupLights() {
        const ambient = new THREE.AmbientLight(0x112233, 0.5);
        this.scene.add(ambient);

        const mainLight = new THREE.PointLight(0x00ff88, 1.5, 20);
        mainLight.position.set(0, 6, 2);
        this.scene.add(mainLight);

        const redLight = new THREE.PointLight(0xff3355, 0.6, 15);
        redLight.position.set(4, 4, -2);
        this.scene.add(redLight);

        const blueLight = new THREE.PointLight(0x3366ff, 0.4, 15);
        blueLight.position.set(-4, 4, 2);
        this.scene.add(blueLight);

        this.mainLight = mainLight;
        this.redLight = redLight;
    }

    setupPetriDish() {
        const ringGeom = new THREE.TorusGeometry(5.5, 0.08, 8, 64);
        const ringMat = new THREE.MeshStandardMaterial({
            color: 0x00ff88,
            emissive: 0x00ff88,
            emissiveIntensity: 0.3,
            transparent: true,
            opacity: 0.4,
        });
        this.ring = new THREE.Mesh(ringGeom, ringMat);
        this.ring.rotation.x = -Math.PI / 2;
        this.ring.position.y = -0.1;
        this.scene.add(this.ring);

        const diskGeom = new THREE.CircleGeometry(5.5, 64);
        const diskMat = new THREE.MeshStandardMaterial({
            color: 0x050810,
            transparent: true,
            opacity: 0.7,
            side: THREE.DoubleSide,
        });
        const disk = new THREE.Mesh(diskGeom, diskMat);
        disk.rotation.x = -Math.PI / 2;
        disk.position.y = -0.15;
        this.scene.add(disk);
    }

    setupParticles() {
        const count = 200;
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const sizes = new Float32Array(count);

        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const radius = Math.random() * 5;
            positions[i * 3] = Math.cos(angle) * radius;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 0.5;
            positions[i * 3 + 2] = Math.sin(angle) * radius;

            const green = 0.3 + Math.random() * 0.7;
            colors[i * 3] = 0;
            colors[i * 3 + 1] = green;
            colors[i * 3 + 2] = green * 0.5;

            sizes[i] = 0.02 + Math.random() * 0.04;
        }

        const geom = new THREE.BufferGeometry();
        geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geom.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geom.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        const mat = new THREE.PointsMaterial({
            size: 0.04,
            vertexColors: true,
            transparent: true,
            opacity: 0.4,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
        });

        this.particleSystem = new THREE.Points(geom, mat);
        this.scene.add(this.particleSystem);
    }

    setupGrid() {
        const gridMat = new THREE.LineBasicMaterial({
            color: 0x00ff88,
            transparent: true,
            opacity: 0.04,
        });

        for (let i = -5; i <= 5; i++) {
            const points = [
                new THREE.Vector3(i, -0.12, -5),
                new THREE.Vector3(i, -0.12, 5),
            ];
            const geom = new THREE.BufferGeometry().setFromPoints(points);
            this.scene.add(new THREE.Line(geom, gridMat));

            const points2 = [
                new THREE.Vector3(-5, -0.12, i),
                new THREE.Vector3(5, -0.12, i),
            ];
            const geom2 = new THREE.BufferGeometry().setFromPoints(points2);
            this.scene.add(new THREE.Line(geom2, gridMat));
        }
    }

    update(dt) {
        this.time += dt;

        this.camera.position.x = Math.sin(this.time * 0.05) * 0.3;
        this.camera.position.z = 6 + Math.cos(this.time * 0.03) * 0.2;
        this.camera.lookAt(0, 0, 0);

        this.mainLight.intensity = 1.5 + Math.sin(this.time * 0.5) * 0.2;

        const positions = this.particleSystem.geometry.attributes.position.array;
        for (let i = 0; i < positions.length; i += 3) {
            positions[i + 1] += Math.sin(this.time * 2 + i) * 0.001;
            if (positions[i + 1] > 0.3) positions[i + 1] = -0.3;
        }
        this.particleSystem.geometry.attributes.position.needsUpdate = true;
        this.particleSystem.rotation.y += dt * 0.02;

        this.ring.material.emissiveIntensity = 0.3 + Math.sin(this.time) * 0.1;
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }
}
