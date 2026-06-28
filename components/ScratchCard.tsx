"use client";

import { useEffect, useRef, useState } from "react";

const SPARKLES: [number, number, number, boolean, number][] = [
  [0.07, 0.18, 2.5, false, 0.45], [0.14, 0.65, 2,   false, 0.35],
  [0.22, 0.28, 1.5, false, 0.40], [0.06, 0.82, 2.5, false, 0.50],
  [0.18, 0.48, 2,   false, 0.35], [0.28, 0.78, 2,   false, 0.40],
  [0.32, 0.14, 1.5, false, 0.30], [0.42, 0.88, 2,   false, 0.45],
  [0.55, 0.10, 2.5, false, 0.40], [0.68, 0.90, 2,   false, 0.35],
  [0.75, 0.14, 1.5, false, 0.30], [0.82, 0.74, 3,   false, 0.45],
  [0.88, 0.32, 2,   false, 0.40], [0.94, 0.62, 2.5, false, 0.50],
  [0.90, 0.84, 1.5, false, 0.35], [0.48, 0.94, 2,   false, 0.40],
  [0.05, 0.52, 2,   false, 0.35], [0.95, 0.44, 1.5, false, 0.30],
  [0.50, 0.06, 2,   false, 0.40], [0.35, 0.90, 1.5, false, 0.35],
  [0.72, 0.06, 2.5, false, 0.45], [0.60, 0.96, 2,   false, 0.35],
  [0.78, 0.94, 1.5, false, 0.30], [0.45, 0.04, 2,   false, 0.40],
  [0.10, 0.14, 6, true, 0.75], [0.91, 0.12, 6, true, 0.75],
  [0.38, 0.22, 4, true, 0.55], [0.65, 0.78, 4, true, 0.55],
  [0.03, 0.40, 3, true, 0.45], [0.97, 0.70, 3, true, 0.45],
];

function drawStar(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
  ctx.beginPath();
  for (let i = 0; i < 8; i++) {
    const angle = (i * Math.PI) / 4 - Math.PI / 2;
    const r = i % 2 === 0 ? size : size * 0.2;
    const px = x + Math.cos(angle) * r;
    const py = y + Math.sin(angle) * r;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.fill();
}

export default function ScratchCard({ children }: { children: React.ReactNode }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let rafId: number;
    let ctx: CanvasRenderingContext2D | null = null;
    let W = 0, H = 0;

    function draw() {
      if (!ctx) return;
      // Always reset composite before drawing the card surface
      ctx.globalCompositeOperation = "source-over";

      const grad = ctx.createLinearGradient(0, 0, W * 0.6, H);
      grad.addColorStop(0, "#1E406E");
      grad.addColorStop(1, "#0D2140");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);

      const c = ctx;
      SPARKLES.forEach(([xp, yp, size, isStar, alpha]) => {
        c.fillStyle = `rgba(200, 175, 95, ${alpha})`;
        if (isStar) drawStar(c, xp * W, yp * H, size);
        else {
          c.beginPath();
          c.arc(xp * W, yp * H, size, 0, Math.PI * 2);
          c.fill();
        }
      });

      const MAX_W = W * 0.82;
      const mainText = "✦  SCRATCH TO REVEAL  ✦";
      let mainSize = Math.round(H * 0.20);
      ctx.font = `500 ${mainSize}px "Cormorant Garamond", Georgia, serif`;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (ctx as any).letterSpacing = "2px";
      const mainW = ctx.measureText(mainText).width;
      if (mainW > MAX_W) mainSize = Math.floor(mainSize * MAX_W / mainW);
      ctx.fillStyle = "#C8A24A";
      ctx.font = `500 ${mainSize}px "Cormorant Garamond", Georgia, serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(mainText, W / 2, H * 0.43);

      const subText = "our special day";
      let subSize = Math.round(H * 0.17);
      ctx.font = `${subSize}px "Great Vibes", cursive`;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (ctx as any).letterSpacing = "0px";
      const subW = ctx.measureText(subText).width;
      if (subW > MAX_W) subSize = Math.floor(subSize * MAX_W / subW);
      ctx.fillStyle = "rgba(255, 248, 225, 0.75)";
      ctx.font = `${subSize}px "Great Vibes", cursive`;
      ctx.fillText(subText, W / 2, H * 0.65);
    }

    let scratching = false;
    let count = 0;

    function scratch(x: number, y: number) {
      if (!ctx) return;
      ctx.save();
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(x, y, 22, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      if (++count % 10 === 0) {
        const d = ctx.getImageData(0, 0, canvas!.width, canvas!.height).data;
        let cleared = 0;
        for (let i = 3; i < d.length; i += 4) {
          if (d[i] < 128) cleared++;
        }
        if (cleared / (d.length / 4) > 0.5) setRevealed(true);
      }
    }

    function pos(e: MouseEvent | Touch) {
      const r = canvas!.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    }

    function onMouseDown(e: MouseEvent) { scratching = true; const { x, y } = pos(e); scratch(x, y); }
    function onMouseMove(e: MouseEvent) { if (!scratching) return; const { x, y } = pos(e); scratch(x, y); }
    function onMouseUp() { scratching = false; }
    function onTouchStart(e: TouchEvent) { const { x, y } = pos(e.touches[0]); scratch(x, y); }
    function onTouchMove(e: TouchEvent) { e.preventDefault(); const { x, y } = pos(e.touches[0]); scratch(x, y); }

    canvas.addEventListener("mousedown", onMouseDown);
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseup", onMouseUp);
    canvas.addEventListener("mouseleave", onMouseUp);
    canvas.addEventListener("touchstart", onTouchStart, { passive: true });
    canvas.addEventListener("touchmove", onTouchMove, { passive: false });

    // Use RAF to wait for layout to be fully painted before reading dimensions
    function init() {
      const rect = canvas!.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) {
        rafId = requestAnimationFrame(init);
        return;
      }
      const dpr = window.devicePixelRatio || 1;
      canvas!.width = Math.round(rect.width * dpr);
      canvas!.height = Math.round(rect.height * dpr);
      ctx = canvas!.getContext("2d")!;
      ctx.scale(dpr, dpr);
      W = rect.width;
      H = rect.height;

      // Draw immediately with whatever fonts are available
      draw();
      // Re-draw after fonts load for crisp text
      document.fonts?.ready.then(draw);
    }

    rafId = requestAnimationFrame(init);

    return () => {
      cancelAnimationFrame(rafId);
      canvas.removeEventListener("mousedown", onMouseDown);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseup", onMouseUp);
      canvas.removeEventListener("mouseleave", onMouseUp);
      canvas.removeEventListener("touchstart", onTouchStart);
      canvas.removeEventListener("touchmove", onTouchMove);
    };
  }, []);

  if (revealed) return <>{children}</>;

  return (
    // Outer div = block-level, keeps the scratch card on its own line and centered
    <div className="scratch-outer">
      <span className="scratch-wrap">
        {children}
        <canvas ref={canvasRef} className="scratch-canvas" />
      </span>
      <style jsx>{`
        .scratch-outer {
          display: block;
          text-align: center;
          margin: 0.5rem 0;
        }
        .scratch-wrap {
          position: relative;
          display: inline-block;
          padding: 44px 64px;
        }
        @media (max-width: 480px) {
          .scratch-wrap {
            padding: 36px 40px;
          }
        }
        .scratch-canvas {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 18px;
          cursor: crosshair;
          touch-action: none;
          box-shadow: 0 8px 40px rgba(0, 0, 0, 0.45),
                      0 0 0 1px rgba(180, 150, 80, 0.25);
        }
      `}</style>
    </div>
  );
}
