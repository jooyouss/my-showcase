import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';

import 'yet-another-react-lightbox/styles.css';

const demoImages = [
  [{src: '/1.png', link: ''},{src: '/2.png', link: ''}],
  [{src: '/3.jpeg', link: 'https://en.orionstar.com/factory.html'},{src: '/4.jpeg', link: 'https://en.orionstar.com/restaurant.html'}],
  [{src: '/5.png', link: ''},{src: '/6.png', link: ''}],
  [{src: '/7.png', link: 'https://en.orionstar.com/products.html'},{src: '/8.png', link: 'https://en.orionstar.com/robot-waiter-restaurant.html'},{src: '/9.png', link: 'https://en.orionstar.com/PressReleases-1.html'}]
];

const projects = [
  {
    title: '小豹评审平台',
    desc: '支持评论、回复评论、删除评论、划词评论，构建完整的互动与反馈机制，提升用户参与度与内容可读性。',
    images: demoImages[0],
  },
  {
    title: '官网多端适配',
    desc: '实现100%高保真还原设计稿，完成多终端适配，确保在不同设备上良好展示。',
    images: demoImages[1],
  },
  {
    title: '广告投放优化与数据回流机制',
    desc: '聚焦机器人业务线上获客，8万REM投放带来2.2万次点击与750个有效来电，后续销售承接；建立事件回传机制以支持百度投放效果优化。\n跟踪广告获取来源，持续优化投放策略。\n实现用户行为事件回传，确保与平台（如百度）之间的数据闭环与投放效果提升。',
    images: demoImages[2],
  },
  {
    title: 'SEO体系优化建设',
    desc: '优化标签策略与关键词密度，提升页面与搜索Query的语义匹配度。\n规范URL结构，清除冗余参数，强化权重集中。\n构建资讯、博客内容体系，提升整体内容质量。\n推进页面结构化与语义分段，增强主题识别。\n开发分类页与专题页，部署结构化数据，提升搜索引擎解析效率。',
    images: demoImages[3],
  },
];

function ProjectCard({ item, active, onClick, hidden }: { item: any; active: boolean; onClick: () => void; hidden?: boolean }) {
  if (hidden) return null;
  return (
    <Html center>
      <div
        className={`transition-all duration-300 rounded-2xl shadow-lg p-5 bg-white/60 border border-blue-200 backdrop-blur-md cursor-pointer
          ${active ? 'scale-105 border-blue-400 shadow-xl ring-2 ring-blue-200 animate-glow-card' : 'scale-100'}
        `}
        style={{ minWidth: 200, minHeight: 120, textAlign: 'left' }}
        onClick={onClick}
      >
        <div className="text-lg font-bold mb-1 text-blue-700">{item.title}</div>
        {/* <div className="text-gray-600 text-sm mt-1 whitespace-pre-line text-left">{item.desc}</div> */}
      </div>
    </Html>
  );
}

export default function Projects3DSpace() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // 3D空间分布（环形），根据卡片数量自动调整半径
  const baseRadius = 3.2;
  const radius = baseRadius + Math.max(0, (projects.length - 3) * 1.1); // 每多一个卡片，半径增大，避免重叠
  const angleStep = (Math.PI * 2) / projects.length;

  const images = selected !== null ? projects[selected].images : [];

  return (
    <div className="w-full h-screen relative flex items-center justify-center bg-transparent">
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }} style={{minWidth:'1000px',}}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 10, 7]} intensity={1.2} />
        {projects.map((item, i) => {
          const angle = i * angleStep;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius * 0.7;
          return (
            <mesh
              key={i}
              position={[x, y, 0]}
              onPointerOver={() => setHovered(i)}
              onPointerOut={() => setHovered(null)}
              scale={hovered === i ? 1.12 : 1}
            >
              <boxGeometry args={[2, 1.2, 0.2]} />
              <meshStandardMaterial color={hovered === i ? '#bae6fd' : '#fff'} />
              <ProjectCard item={item} active={hovered === i} onClick={() => setSelected(i)} hidden={selected !== null} />
            </mesh>
          );
        })}
        <OrbitControls enablePan={false} />
      </Canvas>
      <div className="absolute top-8 left-1/2 -translate-x-1/2 flex flex-col items-center">
        <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-pink-400 bg-clip-text text-transparent drop-shadow-glow animate-float relative section-title">
          项目成果展示
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
      {/* 弹窗详情 */}
      {selected !== null && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={() => setSelected(null)}>
          <div
            className="bg-white/80 rounded-3xl border border-blue-200 shadow-2xl backdrop-blur-md p-10 min-w-[320px] max-w-[90vw] relative animate-fade-in"
            onClick={e => e.stopPropagation()}
          >
            {/* 优化后的关闭按钮（新版） */}
            <button
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full border-2 border-gray-300 bg-white/70 hover:bg-blue-100 hover:border-blue-400 transition-all duration-200 shadow-lg outline-none focus:ring-2 focus:ring-blue-300 z-20 group"
              aria-label="关闭弹窗"
              onClick={() => setSelected(null)}
            >
              <span className="text-3xl font-extrabold text-gray-700 group-hover:text-blue-500 select-none" style={{lineHeight:1}}>×</span>
            </button>
            {/* 图片区域 */}
            {images.length > 0 && (
              <div className="flex gap-4 mb-6 overflow-x-auto">
                {images.map((img, idx) => (
                  <div key={img.src + idx} className="flex flex-col items-center">
                    <img
                      src={img.src}
                      className="w-40 h-32 object-cover rounded-xl transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-2xl hover:ring-2 hover:ring-blue-400"
                      onClick={() => { setLightboxOpen(true); setLightboxIndex(idx); }}
                      alt="project screenshot"
                    />
                    {img.link && (
                      <button
                        className="mt-2 px-3 py-1 rounded-lg bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition border border-blue-300 text-sm"
                        onClick={() => window.open(img.link, '_blank')}
                      >
                        <span className="inline-block align-middle mr-1">🔗</span>跳转到外部链接
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
            <div className="text-2xl font-bold mb-2 text-blue-700 text-left">{projects[selected].title}</div>
            <div className="text-gray-700 mb-4 whitespace-pre-line text-left">{projects[selected].desc}</div>
          </div>
        </div>
      )}
      {/* 图片放大 Lightbox，支持缩放和点击跳转 */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={images.map(img => ({ src: img.src }))}
        carousel={{ finite: false }}
        plugins={[Zoom]}
        className="my-lightbox"
      />
    </div>
  );
}
