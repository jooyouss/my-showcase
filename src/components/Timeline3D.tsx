import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { useState } from 'react';

export default function Timeline3D() {
  const [welcome] = useState('欢迎来到我的3D述职空间！');

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* 星空背景全屏固定 */}
      <Canvas
        className="fixed top-0 left-0 w-screen h-screen z-0"
        style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0 }}
        camera={{ position: [0, 0, 8], fov: 60 }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Stars radius={100} depth={50} count={5000} factor={4} />
        {/* 可添加烟雾/粒子/3D物体 */}
        <OrbitControls enableZoom={false} />
      </Canvas>
      {/* 内容区居中，玻璃拟态卡片+渐变标题+动画 */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        <div className="glass-card max-w-xl w-full mx-auto p-10 relative text-center animate-fade-in">
          <h1 className="fancy-title text-4xl md:text-5xl mb-8 bg-gradient-to-r from-cyan-400 via-blue-400 to-pink-400 bg-clip-text text-transparent drop-shadow-glow animate-float relative section-title">
            {welcome}
            <span className="absolute left-0 top-0 w-full h-full pointer-events-none shine"></span>
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-cyan-400 via-blue-400 to-pink-400 rounded-full mt-2 opacity-80 mx-auto"></div>
          {/* 这里可以添加时间轴内容 */}
        </div>
      </div>
      {/* 注入关键样式 */}
      <style>{`
        .glass-card {
          background: rgba(255,255,255,0.15);
          border-radius: 2.5rem;
          box-shadow: 0 12px 48px 0 rgba(31,38,135,0.37), 0 2px 24px 0 #38bdf855, 0 0 32px 0 #fff4 inset;
          backdrop-filter: blur(18px);
          border: 2.5px solid #7f9cf5;
          position: relative;
          overflow: hidden;
          transition: box-shadow 0.3s, border 0.3s, background 0.5s;
        }
        .fancy-title {
          font-family: 'Orbitron', 'Roboto', Arial, sans-serif;
          background: linear-gradient(90deg, #38bdf8, #818cf8, #f472b6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0 2px 16px #818cf844, 0 1px 2px #0008, 0 0 18px #38bdf8cc, 0 0 8px #fff8;
          letter-spacing: 2px;
          font-weight: 900;
          animation: titleGlow 2.5s infinite alternate;
        }
        @keyframes titleGlow {
          0% { text-shadow: 0 2px 16px #818cf844, 0 1px 2px #0008; }
          100% { text-shadow: 0 0 32px #38bdf8cc, 0 1px 2px #f472b6cc; }
        }
        .glow-btn {
          box-shadow: 0 0 12px #38bdf8cc, 0 0 2px #818cf8cc;
          border: 1.5px solid #818cf8;
          position: relative;
          overflow: hidden;
          transition: transform 0.2s, box-shadow 0.2s, border 0.2s;
          animation: btn-breath 2.2s ease-in-out infinite alternate;
          border-image: linear-gradient(90deg, #38bdf8, #818cf8, #f472b6, #38bdf8) 1;
          border-width: 2.5px;
          border-style: solid;
          animation: btn-neon 2.8s linear infinite;
        }
        @keyframes btn-breath {
          0% { box-shadow: 0 0 12px #38bdf8cc, 0 0 2px #818cf8cc; filter: brightness(1); }
          100% { box-shadow: 0 0 32px #38bdf8cc, 0 0 12px #f472b6cc; filter: brightness(1.12); }
        }
        @keyframes btn-neon {
          0% { border-image-source: linear-gradient(90deg, #38bdf8, #818cf8, #f472b6, #38bdf8); }
          100% { border-image-source: linear-gradient(450deg, #f472b6, #38bdf8, #818cf8, #f472b6); }
        }
        .drop-shadow-glow {
          text-shadow: 0 0 24px #38bdf8, 0 0 48px #818cf8, 0 0 8px #fff;
        }
        .animate-float {
          animation: floatY 3.2s ease-in-out infinite alternate;
        }
        @keyframes floatY {
          0% { transform: translateY(0);}
          100% { transform: translateY(-8px);}
        }
        .section-title .shine {
          background: linear-gradient(120deg,rgba(255,255,255,0.18) 0%,rgba(255,255,255,0.01) 60%,transparent 100%);
          filter: blur(2px);
          animation: shineMove 2.8s linear infinite;
          z-index: 2;
        }
        @keyframes shineMove {
          0% { left: -100%; width: 30%; opacity: 0.2;}
          40% { left: 0; width: 30%; opacity: 0.5;}
          60% { left: 70%; width: 30%; opacity: 0.2;}
          100% { left: 100%; width: 30%; opacity: 0;}
        }
      `}</style>
    </div>
  );
}
