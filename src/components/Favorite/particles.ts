// particlesAlgorithm.ts
const colors: string[] = ['#ffc000', '#ff3b3b', '#ff8400'];
const heartColor: string = '#ff0000';
const hearts: number = 15;

interface Particle {
    x: number;
    y: number;
    size: number;
    color: string;
    rotation: number;
    speed: number;
    friction: number;
    opacity: number;
    yVel: number;
    gravity: number;
}

export const explode = (x: number, y: number): void => {
    let particles: Particle[] = [];
    let ratio: number = window.devicePixelRatio;
    let c: HTMLCanvasElement = document.createElement('canvas');
    let ctx = c.getContext('2d');

    if (!ctx) return; // Проверка на случай, если контекст не поддерживается

    c.style.position = 'absolute';
    c.style.left = `${x - 100}px`;
    c.style.top = `${y - 100}px`;
    c.style.pointerEvents = 'none';
    c.style.width = '200px';
    c.style.height = '200px';
    c.style.zIndex = '100';
    c.width = 200 * ratio;
    c.height = 200 * ratio;
    document.body.appendChild(c);

    // Генерация сердечек
    for (let i = 0; i < hearts; i++) {
        particles.push({
            x: c.width / 2,
            y: c.height / 2,
            size: r(20, 30),
            color: heartColor,
            rotation: r(0, 360, true),
            speed: r(6, 10),
            friction: 0.9,
            opacity: r(0, 0.5, true),
            yVel: 0,
            gravity: 0.02,
        });
    }

    render(particles, ctx, c.width, c.height);
    setTimeout(() => document.body.removeChild(c), 1000);
};

const render = (
    particles: Particle[],
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
): void => {
    requestAnimationFrame(() => render(particles, ctx, width, height));
    ctx.clearRect(0, 0, width, height);

    // Рендеринг сердечек
    particles.forEach((h: Particle) => {
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

const drawHeart = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    size: number
): void => {
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

const r = (a: number, b: number, c?: boolean): number =>
    parseFloat((Math.random() * (a - b) + b).toFixed(c ? 0 : 2));
