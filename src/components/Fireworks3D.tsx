import React from 'react';
interface Fireworks3DProps {
  onRestart: () => void;
}
function GlassyCard({ children, className = '', style = {} }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <div
      className={`relative glassy-card shadow-2xl ${className}`}
      style={{
        borderRadius: 18,
        background: 'rgba(30,32,38,0.55)',
        boxShadow: '0 8px 48px 0 #23252688, 0 0 0 2px rgba(56,189,248,0.18) inset, 0 0 24px 4px #818cf822 inset',
        border: 'none',
        backdropFilter: 'blur(18px)',
        overflow: 'hidden',
        ...style,
      }}
    >
      {/* 顶部流动高光 */}
      <div className="absolute left-0 top-0 w-full h-1/4 pointer-events-none z-10"
        style={{
          background: 'linear-gradient(90deg,rgba(255,255,255,0.18) 0%,rgba(56,189,248,0.10) 100%)',
          filter: 'blur(12px)'
        }} />
      {/* 动画渐变边框（伪元素实现） */}
      <style>{`
        .glassy-card {
          position: relative;
        }
        .glassy-card::before {
          content: '';
          position: absolute;
          z-index: 2;
          inset: 0;
          border-radius: 18px;
          padding: 2px;
          background: linear-gradient(120deg, #38bdf8, #818cf8, #f472b6, #38bdf8 90%);
          background-size: 300% 300%;
          animation: borderFlow 4s linear infinite;
          -webkit-mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }
        .glassy-card:hover::before {
          animation: borderFlow 1.5s linear infinite;
          background: linear-gradient(120deg, #bae6fd, #818cf8, #f472b6, #bae6fd 90%);
          box-shadow: 0 0 24px 6px #bae6fd88, 0 0 48px 12px #818cf888;
        }
        @keyframes borderFlow {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
        .drop-shadow-glow {
          text-shadow: 0 0 32px #38bdf8, 0 0 64px #818cf8, 0 0 12px #fff;
        }
        .animate-float {
          animation: floatY 3.2s ease-in-out infinite alternate;
        }
        @keyframes floatY {
          0% { transform: translateY(0);}
          100% { transform: translateY(-10px);}
        }
      `}</style>
      <div className="relative z-20 w-full h-full flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
}

// 粒子点缀
function FloatingParticles() {
  // 8~12个主色小圆点，随机位置和动画
  const particles = Array.from({ length: 10 }).map((_, i) => ({
    left: `${10 + Math.random() * 80}%`,
    top: `${60 + Math.random() * 30}%`,
    size: 6 + Math.random() * 8,
    delay: Math.random() * 2,
    color: ['#38bdf8', '#818cf8', '#f472b6'][i % 3],
  }));
  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      {particles.map((p, i) => (
        <span
          key={i}
          style={{
            position: 'absolute',
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            background: p.color,
            opacity: 0.18 + 0.18 * (i % 2),
            filter: 'blur(1.5px)',
            animation: `floatUp 6s ${p.delay}s linear infinite alternate`
          }}
        />
      ))}
      <style>{`
        @keyframes floatUp {
          0% { transform: translateY(0);}
          100% { transform: translateY(-40px);}
        }
      `}</style>
    </div>
  );
}

const Fireworks3D: React.FC<Fireworks3DProps> = () => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-[60vh] py-12">
      {/* 背后主色柔光晕 */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] rounded-full z-0"
        style={{
          background: 'radial-gradient(circle, #38bdf833 0%, #818cf822 60%, transparent 100%)',
          filter: 'blur(24px)'
        }} />
      <FloatingParticles />
      <GlassyCard className="mx-auto w-full max-w-md p-10 flex flex-col items-center shadow-2xl">
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent drop-shadow-glow animate-float">
          感谢观看 · 未来可期
        </h1>
        <p className="text-base text-blue-100 mb-8 text-center">
          从AI生产力出发，我持续探索、成长、进化。<br/>
          转正不是终点，而是一个新的起点。<br/>
          感谢支持我的每一位同事，让我们一起迈向更加智能高效的未来！🚀
        </p>
      </GlassyCard>
    </div>
  );
};

export default Fireworks3D;
