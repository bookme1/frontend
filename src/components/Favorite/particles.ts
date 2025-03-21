// particles.ts
type Particle = {
    x: number;
    y: number;
    radius: number;
    color: string;
    rotation: number;
    speed: number;
    friction: number;
    opacity: number;
    yVel: number;
    gravity: number;
};

type Heart = {
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
};

const colors = ['#ffc000', '#ff3b3b', '#ff8400'];
const heartColor = '#ff0000';
const bubbles = 17;
const hearts = 8;

export const explode = (x: number, y: number): void => {
    const ratio = window.devicePixelRatio;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    canvas.style.position = 'absolute';
    canvas.style.left = `${x - 100}px`;
    canvas.style.top = `${y - 100}px`;
    canvas.style.pointerEvents = 'none';
    canvas.style.width = '200px';
    canvas.style.height = '200px';
    canvas.style.zIndex = '100';

    canvas.width = 200 * ratio;
    canvas.height = 200 * ratio;

    document.body.appendChild(canvas);

    const particles: Particle[] = [];
    const heartsArray: Heart[] = [];

    for (let i = 0; i < bubbles; i++) {
        particles.push({
            x: canvas.width / 2,
            y: canvas.height / 2,
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

    for (let i = 0; i < hearts; i++) {
        heartsArray.push({
            x: canvas.width / 2,
            y: canvas.height / 2,
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

    render(particles, heartsArray, ctx, canvas.width, canvas.height);

    setTimeout(() => {
        if (document.body.contains(canvas)) {
            document.body.removeChild(canvas);
        }
    }, 1000);
};

const render = (
    particles: Particle[],
    heartsArray: Heart[],
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
): void => {
    requestAnimationFrame(() =>
        render(particles, heartsArray, ctx, width, height)
    );
    ctx.clearRect(0, 0, width, height);

    // Render particles
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
        ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI);
        ctx.fill();
    });

    // Render hearts
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

const r = (a: number, b: number, float = false): number =>
    parseFloat((Math.random() * (b - a) + a).toFixed(float ? 1 : 0));
