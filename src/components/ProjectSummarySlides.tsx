import React, { useState, useRef } from 'react';

function GlassyCard({
  children,
  width = 500,
  height = 400,
  className = '',
}: {
  children: React.ReactNode;
  width?: number;
  height?: number;
  className?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  // 动态高光位置
  const handleMouseMove = (e: React.MouseEvent) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--glow-x', `${x}%`);
    card.style.setProperty('--glow-y', `${y}%`);
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty('--glow-x', `15%`);
    card.style.setProperty('--glow-y', `15%`);
  };

  return (
    <div
      ref={cardRef}
      className={`relative flex items-center justify-center glassy-card ${className}`}
      style={{
        width,
        height,
        borderRadius: 18,
        background: 'rgba(30,32,38,0.55)',
        boxShadow:
          '0 4px 32px 0 #000a, 0 0 0 1.5px rgba(255,255,255,0.10) inset, 0 0 16px 2px #fff2 inset',
        border: 'none', // 由伪元素实现动画边框
        backdropFilter: 'blur(18px)',
        overflow: 'hidden',
        transition: 'box-shadow 0.35s, transform 0.35s',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* 动态高光 */}
      <div
        className="absolute left-0 top-0 w-full h-full pointer-events-none z-1"
        style={{
          background: 'radial-gradient(circle at var(--glow-x, 15%) var(--glow-y, 15%), rgba(255,255,255,0.13) 0%, rgba(255,255,255,0.01) 60%, transparent 100%)',
          filter: 'blur(2.5px)',
          transition: 'background 0.25s',
        }}
      />
      {/* 柔和斜向光带 */}
      <div className="absolute left-0 top-0 w-2/3 h-1/4 pointer-events-none z-1"
           style={{
             background: 'linear-gradient(45deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.01) 80%)',
             filter: 'blur(12px)'
           }} />
      {/* 边框流动高光点 */}
      <div className="absolute border-glow-dot z-20" />
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
          animation: borderFlow 6s linear infinite;
          -webkit-mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }
        .glassy-card:hover::before {
          animation: borderFlow 2s linear infinite;
          background: linear-gradient(120deg, #bae6fd, #818cf8, #f472b6, #bae6fd 90%);
          box-shadow: 0 0 16px 4px #bae6fd88, 0 0 32px 8px #818cf888;
        }
        @keyframes borderFlow {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 100% 50%;
          }
        }
        .glassy-card {
          transition: box-shadow 0.35s, transform 0.35s;
        }
        .glassy-card:hover {
          box-shadow:
            0 8px 48px 0 #38bdf855,
            0 0 32px 4px #bae6fd44,
            0 2px 24px 0 #fff2;
          transform: scale(1.025) translateY(-4px);
        }
        .border-glow-dot {
          position: absolute;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: radial-gradient(circle, #fff 70%, #38bdf8 100%, transparent 100%);
          box-shadow: 0 0 16px 4px #38bdf8cc, 0 0 8px 2px #fff8;
          top: -9px;
          left: -9px;
          animation: borderDotMove 4s linear infinite;
          pointer-events: none;
        }
        @keyframes borderDotMove {
          0%   { top: -9px; left: -9px; }
          25%  { top: -9px; left: calc(100% - 9px); }
          50%  { top: calc(100% - 9px); left: calc(100% - 9px); }
          75%  { top: calc(100% - 9px); left: -9px; }
          100% { top: -9px; left: -9px; }
        }
      `}</style>
      {/* 内容 */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-8">
        {children}
      </div>
    </div>
  );
}

const slides = [
  {
    title: '技术架构演进与成效提升',
    subtitle: '技术演进与架构升级',
    content: (
      <>
        <div className="mb-2 font-bold text-blue-200 text-lg">问题识别</div>
        <div className="mb-2 text-gray-100">原有 PHP 与前端混写，结构混乱，维护成本高。</div>
        <div className="mb-2 font-bold text-blue-200 text-lg">演进路径</div>
        <div className="mb-2 text-gray-100">从"前后端混合模式"升级为"分层解耦架构"，职责清晰、组件独立。</div>
        <div className="mb-2 font-bold text-blue-200 text-lg">显著成效</div>
        <ul className="list-disc pl-6 text-gray-100">
          <li>✂️ 代码维护成本降低 <span className="font-bold text-green-400">40%</span></li>
          <li>⚡ 新功能开发效率提升 <span className="font-bold text-green-400">200%</span></li>
        </ul>
      </>
    ),
  },
  {
    title: '全栈价值输出与交付能力',
    subtitle: '全栈价值与交付能力',
    content: (
      <ul className="list-disc pl-6 text-gray-100">
        <li>前后端协同效率提升：联调效率提升 <span className="font-bold text-green-400">200%</span></li>
        <li>项目掌握与问题解决：快速理解架构，及时优化流程</li>
        <li>独立闭环交付：主导产品展示模块从开发到上线全链路开发，确保质量与节奏</li>
      </ul>
    ),
  },
  {
    title: '成果数据与关键指标',
    subtitle: '成果指标与项目成效',
    content: (
      <>
        <table className="w-full text-left border mt-2 text-gray-100 mb-6">
          <thead>
            <tr>
              <th className="border px-2 py-1">指标项</th>
              <th className="border px-2 py-1">提升结果</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-2 py-1">开发效率</td>
              <td className="border px-2 py-1 text-green-400 font-bold">提升至 200%</td>
            </tr>
            <tr>
              <td className="border px-2 py-1">代码复用率</td>
              <td className="border px-2 py-1">明显提升，减少重复代码</td>
            </tr>
            <tr>
              <td className="border px-2 py-1">问题响应效率</td>
              <td className="border px-2 py-1">从 50% 提升至 <span className="text-green-400 font-bold">100%</span></td>
            </tr>
          </tbody>
        </table>
      </>
    ),
  },
  {
    title: '方法论沉淀与团队贡献',
    subtitle: '知识沉淀与团队赋能',
    content: (
      <ul className="list-disc pl-6 text-gray-100">
        <li>🎤 技术分享：参与团队技术分享会，输出实际项目经验，提升团队知识共享</li>
        <li>📘 技术文档整理：详细记录项目架构、选型与常见问题解决方案</li>
        <li>📐 流程与规范建设：建立严谨的开发规范与上线流程，保障官网稳定性与协作效率</li>
      </ul>
    ),
  },
];

interface ProjectSummarySlidesProps {
  onClose: () => void;
}

export default function ProjectSummarySlides({  }: ProjectSummarySlidesProps) {
  const [page, setPage] = useState(0);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" style={{backdropFilter: 'blur(2px)'}}>
      <GlassyCard width={500} height={400}>
        <div className="w-full h-full flex flex-col items-center justify-center px-2 py-2">
          <div className="text-2xl font-bold text-blue-200 mb-1 text-center drop-shadow-lg">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-pink-400 bg-clip-text text-transparent drop-shadow-glow animate-float relative section-title">
              {slides[page].title}
              <span className="absolute left-0 top-0 w-full h-full pointer-events-none shine"></span>
            </span>
          </div>
          <div className="h-1 w-20 bg-gradient-to-r from-cyan-400 via-blue-400 to-pink-400 rounded-full mt-2 opacity-80 mx-auto"></div>
          <div className="text-base text-blue-100 mb-4 text-center drop-shadow">{slides[page].subtitle}</div>
          <div className="mb-6 text-gray-100 w-full drop-shadow">{slides[page].content}</div>
          <div className="flex justify-between items-center w-full mt-auto">
            <button
              className="px-4 py-1 rounded bg-blue-100/20 text-blue-200 font-semibold hover:bg-blue-200/30 transition border border-blue-200"
              onClick={() => setPage(p => Math.max(0, p - 1))}
              disabled={page === 0}
            >
              上一页
            </button>
            <span className="text-blue-100">{page + 1} / {slides.length}</span>
            <button
              className="px-4 py-1 rounded bg-blue-100/20 text-blue-200 font-semibold hover:bg-blue-200/30 transition border border-blue-200"
              onClick={() => setPage(p => Math.min(slides.length - 1, p + 1))}
              disabled={page === slides.length - 1}
            >
              下一页
            </button>
          </div>
        </div>
      </GlassyCard>
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
  );
}