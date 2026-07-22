import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, Activity, Database } from 'lucide-react';

export const Remotion3DHero: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeFrame, setActiveFrame] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const setupCanvasSize = () => {
      const parent = canvas.parentElement;
      if (!parent) return { width: 500, height: 450 };

      const dpr = window.devicePixelRatio || 1;
      const cssWidth = parent.clientWidth;
      const cssHeight = parent.clientHeight;

      canvas.width = cssWidth * dpr;
      canvas.height = cssHeight * dpr;
      ctx.scale(dpr, dpr);

      return { width: cssWidth, height: cssHeight };
    };

    let { width, height } = setupCanvasSize();

    const handleResize = () => {
      const dims = setupCanvasSize();
      width = dims.width;
      height = dims.height;
    };

    window.addEventListener('resize', handleResize);

    // 3D Nodes Setup
    const numNodes = 40;
    const nodes: { x: number; y: number; z: number; baseR: number; label: string }[] = [];
    const labels = ['Python', 'NeuralNet', 'Pandas', 'PyTorch', 'SQL', 'Scikit', 'PowerBI', 'LLM', 'TensorFlow', 'Stats'];

    for (let i = 0; i < numNodes; i++) {
      const theta = Math.acos(2 * Math.random() - 1);
      const phi = 2 * Math.PI * Math.random();
      const radius = 135 + Math.random() * 25;

      nodes.push({
        x: radius * Math.sin(theta) * Math.cos(phi),
        y: radius * Math.sin(theta) * Math.sin(phi),
        z: radius * Math.cos(theta),
        baseR: 3 + Math.random() * 3,
        label: labels[i % labels.length],
      });
    }

    let angleX = 0;
    let angleY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = (e.clientX - rect.left - width / 2) * 0.0003;
      mouseY = (e.clientY - rect.top - height / 2) * 0.0003;
    };

    window.addEventListener('mousemove', handleMouseMove);

    let frame = 0;

    const render = () => {
      frame++;
      setActiveFrame(frame);

      ctx.clearRect(0, 0, width, height);

      // Mouse-tracked spring rotation
      angleY += 0.006 + mouseX * 0.4;
      angleX += 0.003 + mouseY * 0.4;

      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);

      // Project 3D to 2D
      const projectedNodes: { px: number; py: number; pz: number; r: number; label: string; index: number }[] = [];

      nodes.forEach((node, i) => {
        const x1 = node.x * cosY - node.z * sinY;
        const z1 = node.z * cosY + node.x * sinY;

        const y2 = node.y * cosX - z1 * sinX;
        const z2 = z1 * cosX + node.y * sinX;

        const fov = 320;
        const scale = fov / (fov + z2);
        const px = width / 2 + x1 * scale;
        const py = height / 2 + y2 * scale;

        projectedNodes.push({
          px,
          py,
          pz: z2,
          r: Math.max(1.5, node.baseR * scale),
          label: node.label,
          index: i,
        });
      });

      projectedNodes.sort((a, b) => b.pz - a.pz);

      // Draw 3D Connecting Lines
      ctx.lineWidth = 1;
      for (let i = 0; i < projectedNodes.length; i++) {
        for (let j = i + 1; j < projectedNodes.length; j++) {
          const n1 = projectedNodes[i];
          const n2 = projectedNodes[j];
          const dx = n1.px - n2.px;
          const dy = n1.py - n2.py;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            const alpha = (1 - dist / 110) * 0.25;
            ctx.strokeStyle = `rgba(0, 103, 255, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(n1.px, n1.py);
            ctx.lineTo(n2.px, n2.py);
            ctx.stroke();
          }
        }
      }

      // Draw Nodes & Labels
      projectedNodes.forEach((node) => {
        const depthAlpha = Math.min(1, Math.max(0.3, (node.pz + 180) / 360));

        if (node.pz < 0) {
          const glowGrad = ctx.createRadialGradient(node.px, node.py, 0, node.px, node.py, node.r * 4);
          glowGrad.addColorStop(0, `rgba(79, 70, 229, ${depthAlpha * 0.6})`);
          glowGrad.addColorStop(1, 'rgba(0, 103, 255, 0)');
          ctx.fillStyle = glowGrad;
          ctx.beginPath();
          ctx.arc(node.px, node.py, node.r * 4, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.fillStyle = node.pz < 0 ? '#0067FF' : '#4F46E5';
        ctx.beginPath();
        ctx.arc(node.px, node.py, node.r, 0, Math.PI * 2);
        ctx.fill();

        if (node.pz < -20 && node.index % 3 === 0) {
          ctx.font = '600 11px "JetBrains Mono", monospace';
          ctx.fillStyle = `rgba(15, 23, 42, ${depthAlpha * 0.95})`;
          ctx.fillText(node.label, node.px + node.r + 5, node.py + 3);
        }
      });

      // Render Central Pulsing Core
      const coreR = 24 + Math.sin(frame * 0.05) * 4;
      const coreGrad = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, coreR * 2.5);
      coreGrad.addColorStop(0, 'rgba(0, 103, 255, 0.25)');
      coreGrad.addColorStop(0.5, 'rgba(79, 70, 229, 0.08)');
      coreGrad.addColorStop(1, 'rgba(250, 250, 252, 0)');
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, coreR * 2.5, 0, Math.PI * 2);
      ctx.fill();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="relative w-full h-[450px] rounded-3xl overflow-hidden glass-panel flex items-center justify-center border border-slate-200/80 shadow-xl shadow-slate-200/50 group">
      {/* Background Grid Accent */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#0067FF]/5 via-transparent to-[#4F46E5]/5 pointer-events-none" />

      {/* Real-time Remotion Frame Indicator Badge */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 border border-slate-200 shadow-sm text-xs font-mono text-[#0067FF]">
        <span className="w-2 h-2 rounded-full bg-[#0067FF] animate-ping" />
        <span>REMOTION 3D ENGINE • FRAME {activeFrame}</span>
      </div>

      <canvas ref={canvasRef} className="w-full h-full cursor-grab active:cursor-grabbing z-10" />

      {/* Floating Micro Cards */}
      <div className="absolute bottom-4 left-4 right-4 z-20 grid grid-cols-3 gap-2">
        <div className="p-3 rounded-2xl bg-white/95 border border-slate-200 shadow-md text-xs flex items-center gap-2.5">
          <Database className="w-4 h-4 text-[#0067FF]" />
          <div>
            <div className="font-bold text-slate-900">24 Weeks</div>
            <div className="text-[10px] text-slate-500">Master Roadmap</div>
          </div>
        </div>
        <div className="p-3 rounded-2xl bg-white/95 border border-slate-200 shadow-md text-xs flex items-center gap-2.5">
          <Sparkles className="w-4 h-4 text-[#4F46E5]" />
          <div>
            <div className="font-bold text-slate-900">₹14,999</div>
            <div className="text-[10px] text-slate-500">Complete Fee</div>
          </div>
        </div>
        <div className="p-3 rounded-2xl bg-white/95 border border-slate-200 shadow-md text-xs flex items-center gap-2.5">
          <Activity className="w-4 h-4 text-emerald-600" />
          <div>
            <div className="font-bold text-slate-900">100% Assist</div>
            <div className="text-[10px] text-slate-500">Placement Lock</div>
          </div>
        </div>
      </div>
    </div>
  );
};
