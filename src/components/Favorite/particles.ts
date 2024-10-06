// particlesAlgorithm.js (или .ts)
const colors = ['#ffc000', '#ff3b3b', '#ff8400'];
const heartColor = '#ff0000';
const bubbles = 17;
const hearts = 8;

export const explode = (x: number, y: number) => {
    let particles = [];
    let heartsArray = [];
    let ratio = window.devicePixelRatio;
    let c = document.createElement('canvas');
    let ctx = c.getContext('2d');

    c.style.position = 'absolute';
    c.style.left = x - 100 + 'px';
    c.style.top = y - 100 + 'px';
    c.style.pointerEvents = 'none';
    c.style.width = '200px';
    c.style.height = '200px';
    c.style.zIndex = '100';
    c.width = 200 * ratio;
    c.height = 200 * ratio;
    document.body.appendChild(c);

    // Генерация обычных частиц
    for (let i = 0; i < bubbles; i++) {
        particles.push({
            x: c.width / 2,
            y: c.height / 2,
            radius: r(20, 30),
            color: colors[Math.floor(Math.random() * colors.length)],
            rotation: r(0, 360, true),
            speed: r(8, 12),
            friction: 0.9,
            opacity: r(0, 0.5, true),
            yVel: 0,
            gravity: 0.1,
        });
    }

    // Генерация сердечек
    for (let i = 0; i < hearts; i++) {
        heartsArray.push({
            x: c.width / 2,
            y: c.height / 2,
            size: r(20, 30),
            color: heartColor,
            rotation: r(0, 360, true),
            speed: r(8, 12),
            friction: 0.9,
            opacity: r(0, 0.5, true),
            yVel: 0,
            gravity: 0.1,
        });
    }

    render(particles, heartsArray, ctx, c.width, c.height);
    setTimeout(() => document.body.removeChild(c), 1000);
};

const render = (particles, heartsArray, ctx, width, height) => {
    requestAnimationFrame(() =>
        render(particles, heartsArray, ctx, width, height)
    );
    ctx.clearRect(0, 0, width, height);

    // Рендеринг частиц
    particles.forEach(p => {
        p.x += p.speed * Math.cos((p.rotation * Math.PI) / 180);
        p.y += p.speed * Math.sin((p.rotation * Math.PI) / 180);
        p.opacity -= 0.01;
        p.speed *= p.friction;
        p.radius *= p.friction;
        p.yVel += p.gravity;
        p.y += p.yVel;

        if (p.opacity < 0 || p.radius < 0) return;

        ctx.beginPath();
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, false);
        ctx.fill();
    });

    // Рендеринг сердечек
    heartsArray.forEach(h => {
        h.x += h.speed * Math.cos((h.rotation * Math.PI) / 180);
        h.y += h.speed * Math.sin((h.rotation * Math.PI) / 180);
        h.opacity -= 0.01;
        h.speed *= h.friction;
        h.size *= h.friction;
        h.yVel += h.gravity;
        h.y += h.yVel;

        if (h.opacity < 0 || h.size < 0) return;

        ctx.globalAlpha = h.opacity;
        ctx.fillStyle = h.color;
        drawHeart(ctx, h.x, h.y, h.size);
    });
};

const drawHeart = (ctx, x, y, size) => {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.bezierCurveTo(
        x - size / 2,
        y - size / 2,
        x - size,
        y + size / 3,
        x,
        y + size
    );
    ctx.bezierCurveTo(x + size, y + size / 3, x + size / 2, y - size / 2, x, y);
    ctx.fill();
};

const r = (a, b, c) =>
    parseFloat(
        (Math.random() * ((a ? a : 1) - (b ? b : 0)) + (b ? b : 0)).toFixed(
            c ? c : 0
        )
    );
