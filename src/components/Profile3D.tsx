import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import { useState } from 'react';
import './ProfileUniverseCard.css';

const timeline = [
  { year: '2024.11.27', title: '加入公司', desc: '开启AI之旅' },
  { year: '2024.11～2025.05', title: '官网开发', desc: '助力产品上线，为用户体验赋能' },
  { year: '2025', title: 'AI探索', desc: '结合进行全栈式开发' },
];

function TimelineCard({ item, active }: { item: any; active: boolean }) {
  return (
    <Html center>
      <div
        className={`transition-all duration-300 rounded-2xl shadow-lg p-5 bg-white/60 border border-blue-200 backdrop-blur-md ${
          active ? 'scale-105 border-blue-400 shadow-xl' : 'scale-100'
        }`}
        style={{ minWidth: 180, minHeight: 100, textAlign: 'center' }}
      >
        <div className="text-base font-bold mb-1 text-blue-700">{item.year}</div>
        <div className="text-lg font-semibold text-blue-500 mb-1">{item.title}</div>
        <div className="text-gray-600 text-sm mt-1">{item.desc}</div>
      </div>
    </Html>
  );
}

interface GlowCardProps {
  children: React.ReactNode;
}

export function GlowCard({ children }: GlowCardProps) {
    return (
      <div className="glow-card my-8 mx-auto max-w-xl">
        <div className="glow-card-content">
          {children}
        </div>
      </div>
    );
  }

export default function Profile3D() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="w-full h-screen relative flex items-center justify-center" style={{ background: 'transparent' }}>
      <div className="flex w-full h-full items-center justify-center px-8 gap-8">
        {/* 左侧 3D球+时间轴卡片 */}
        <div className="flex-3 flex flex-col items-center justify-center h-full min-w-[480px]">
          <div className="w-full h-[520px] relative flex flex-col items-center justify-center">
            <Canvas camera={{ position: [0, 0, 8], fov: 60 }} className="!absolute !top-0 !left-0 !w-full !h-full">
              <ambientLight intensity={0.7} />
              <directionalLight position={[5, 10, 7]} intensity={1.2} />
              {/* 3D人物模型占位 */}
              <mesh
                position={[0, 1, 0]}
                onPointerOver={() => setHovered(-1)}
                onPointerOut={() => setHovered(null)}
                scale={hovered === -1 ? 1.2 : 1}
              >
                <sphereGeometry args={[1, 32, 32]} />
                <meshStandardMaterial color={hovered === -1 ? '#38bdf8' : '#818cf8'} />
              </mesh>
              {/* 时间轴卡片 */}
              {timeline.map((item, i) => (
                <mesh
                  key={i}
                  position={[-3 + i * 3, -1.5, 0]}
                  onPointerOver={() => setHovered(i)}
                  onPointerOut={() => setHovered(null)}
                  scale={hovered === i ? 1.12 : 1}
                >
                  <boxGeometry args={[1.8, 1, 0.2]} />
                  <meshStandardMaterial color={hovered === i ? '#bae6fd' : '#fff'} />
                  <TimelineCard item={item} active={hovered === i} />
                </mesh>
              ))}
              <OrbitControls enablePan={false} />
            </Canvas>
          </div>
          <div className="absolute top-8 left-1/2 -translate-x-1/2 flex flex-col items-center">
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-pink-400 bg-clip-text text-transparent drop-shadow-glow animate-float relative section-title">
              个人简介与成长时间轴
              <span className="absolute left-0 top-0 w-full h-full pointer-events-none shine"></span>
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-cyan-400 via-blue-400 to-pink-400 rounded-full mt-2 opacity-80"></div>
            <style>{`
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
        </div>
        {/* 右侧 简介内容 */}
        <div className="flex-1 flex items-center justify-center h-full">
  <GlowCard>
    在过去工作中，框架驱动型开发者，具备从业务抽象到工程落地的完整闭环能力，能够高效推动项目从概念到实际应用的转化。
    目前负责公司官网的日常维护与功能更新，确保用户体验持续优化。开发和实施新功能，提升网站的互动性和视觉效果。
  </GlowCard>
</div>
      </div>
    </div>
  );
}
