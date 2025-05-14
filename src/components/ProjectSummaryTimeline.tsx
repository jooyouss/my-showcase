import { useState, useRef } from 'react';

const timeline = [
  {
    label: '技术深耕方向',
    icon: '🧠',
    content: (
      <>
        <div className="font-bold text-blue-200 mb-2">全面拓展技术栈能力</div>
        <div className="text-gray-100 mb-2 break-words">在原有前端技术基础上，系统攻克后端技术体系，推动跨栈能力融合，进一步提升整体开发效率与交付能力。</div>
        <div className="font-bold text-blue-200 mb-2">构建可持续技术壁垒</div>
        <div className="text-gray-100 mb-2 break-words">以AI技术为支撑，优先解决重复性任务，提高研发效率，逐步延伸至具备创新性的复杂场景，打造差异化竞争优势。</div>
        <div className="font-bold text-blue-200 mb-2">聚焦大模型与AI开发</div>
        <div className="text-gray-100 break-words">深入学习大模型相关的高级技巧与工程落地方法，掌握AI在实际业务中的应用开发路径，奠定AI工程化能力基础。</div>
      </>
    ),
  },
  {
    label: '1个月目标（短期冲刺）',
    icon: '🚀',
    content: (
      <>
        <div className="font-bold text-blue-200 mb-2">流程改进与团队协同</div>
        <div className="text-gray-100 mb-2 break-words">主导实施研发流程优化项目，引入敏捷开发模式，提升开发节奏与协作效率，赋能新人上手。</div>
        <div className="font-bold text-blue-200 mb-2">AI项目初步参与</div>
        <div className="text-gray-100 break-words">参与 Chatps AI 项目，完成模块级任务拆解与交付，掌握至少 1 个核心 AI 工具（如模型调试），并完成实际操作演练。</div>
      </>
    ),
  },
  {
    label: '3个月目标（中期能力构建）',
    icon: '🎯',
    content: (
      <>
        <div className="font-bold text-blue-200 mb-2">模块级独立交付能力</div>
        <div className="text-gray-100 mb-2 break-words">具备AI项目中模块级别的独立开发与上线能力，如完成 SEO 智能诊断子模块并实现稳定运行。</div>
        <div className="font-bold text-blue-200 mb-2">推动AI流程优化试点</div>
        <div className="text-gray-100 break-words">识别当前流程中至少 1 个效率瓶颈，提出完整的AI改造方案并推动试点落地，形成实际价值验证。</div>
      </>
    ),
  },
  {
    label: '6个月目标（长期能力闭环）',
    icon: '🏆',
    content: (
      <>
        <div className="font-bold text-blue-200 mb-2">全流程AI项目主导</div>
        <div className="text-gray-100 mb-2 break-words">主导至少 1 个AI项目的全流程管理，覆盖需求分析、方案制定、开发实现、部署上线与效果评估。</div>
        <div className="font-bold text-blue-200 mb-2">构建团队AI工具体系</div>
        <div className="text-gray-100 break-words">初步搭建面向官网的AI工具链体系，实现从问题识别到系统性解决的闭环，为跨部门融合与高效交付提供技术支持。</div>
      </>
    ),
  },
];

interface ProjectSummaryTimelineProps {
  onClose: () => void;
}

export default function ProjectSummaryTimeline({  }: ProjectSummaryTimelineProps) {
  const [current, setCurrent] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // 滚动到当前节点
  const scrollToNode = (idx: number) => {
    const node = document.getElementById(`timeline-node-${idx}`);
    if (node && containerRef.current) {
      node.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handlePrev = () => {
    if (current > 0) {
      setCurrent(c => {
        const next = c - 1;
        setTimeout(() => scrollToNode(next), 0);
        return next;
      });
    }
  };
  const handleNext = () => {
    if (current < timeline.length - 1) {
      setCurrent(c => {
        const next = c + 1;
        setTimeout(() => scrollToNode(next), 0);
        return next;
      });
    }
  };

  // 当前展示的节点索引
  const displayCurrent = hovered !== null ? hovered : current;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" style={{backdropFilter: 'blur(2px)'}}>
      <div className="relative w-full max-w-2xl h-[540px] bg-white/10 rounded-2xl shadow-2xl flex flex-col items-center justify-center px-4 py-8 overflow-hidden">
        <div className="flex flex-col items-center mb-4">
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-pink-400 bg-clip-text text-transparent drop-shadow-glow animate-float relative section-title">
            成长目标时间轴
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
        {/* 时间轴主线 */}
        <div className="absolute left-12 top-8 bottom-8 w-1 bg-gradient-to-b from-cyan-400 via-indigo-400 to-pink-400 opacity-60 z-0" />
        <div ref={containerRef} className="relative z-10 flex flex-col gap-8 mt-2 mb-8 pr-8 overflow-y-auto h-full">
          {timeline.map((item, idx) => (
            <div key={idx} id={`timeline-node-${idx}`} className="flex items-start gap-6 min-h-[90px]">
              {/* 节点icon，支持点击跳转 */}
              <div
                className="relative flex flex-col items-center cursor-pointer group"
                onClick={() => { setCurrent(idx); setTimeout(() => scrollToNode(idx), 0); }}
                onMouseEnter={() => setHovered(idx)}
                onMouseLeave={() => setHovered(null)}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg border-4 transition-all duration-300
                  ${idx === displayCurrent ? 'bg-cyan-400 border-white scale-110 ring-4 ring-cyan-300' : idx < displayCurrent ? 'bg-cyan-200 border-cyan-100 opacity-80' : 'bg-gray-700 border-gray-400 opacity-60'}
                  group-hover:scale-110 group-hover:ring-2 group-hover:ring-cyan-200`}>{item.icon}</div>
                {/* 竖线延伸 */}
                {idx < timeline.length - 1 && (
                  <div className={`w-1 flex-1 mx-auto transition-all duration-300
                    ${idx < displayCurrent ? 'bg-cyan-300' : 'bg-gray-500/30'}`}
                    style={{ minHeight: 40 }} />
                )}
              </div>
              {/* 展示所有已解锁节点内容，纵向排列且不重合 */}
              {idx <= displayCurrent && (
                <div
                  className={`flex-1 p-4 rounded-xl backdrop-blur shadow-lg border transition-all duration-300 overflow-x-auto cursor-pointer
                    ${idx === displayCurrent ? 'ring-2 ring-cyan-300 bg-cyan-400/10 border-white/10' : 'bg-white/5 border-white/5 opacity-80'}
                  `}
                  style={{ minHeight: 120 }}
                  onClick={() => { setCurrent(idx); setTimeout(() => scrollToNode(idx), 0); }}
                  onMouseEnter={() => setHovered(idx)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <div className="font-bold text-lg text-blue-200 mb-1 break-words">{item.label}</div>
                  <div className="text-gray-100 text-base leading-relaxed break-words">{item.content}</div>
                </div>
              )}
            </div>
          ))}
        </div>
        {/* 操作按钮固定在右侧中部 */}
        <div className="fixed right-[8vw] top-1/2 -translate-y-1/2 flex flex-col gap-4 z-50">
          <button
            className="px-4 py-2 rounded bg-blue-100/20 text-blue-200 font-semibold hover:bg-blue-200/30 transition border border-blue-200 disabled:opacity-40"
            onClick={handlePrev}
            disabled={current === 0}
          >
            上一步
          </button>
          <span className="text-blue-100 font-mono text-center">{current + 1} / {timeline.length}</span>
          <button
            className="px-4 py-2 rounded bg-blue-100/20 text-blue-200 font-semibold hover:bg-blue-200/30 transition border border-blue-200 disabled:opacity-40"
            onClick={handleNext}
            disabled={current === timeline.length - 1}
          >
            下一步
          </button>
        </div>
      </div>
    </div>
  );
} 