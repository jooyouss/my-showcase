import { useState } from 'react';

const reflections = [
  {
    q: '我的优势是什么？',
    a: '具备扎实的技术基础，能够高效完成研发任务，已在日常开发、SEO优化等业务场景中取得实质成果。对新技术保持学习意愿，具备AI转型的基础条件。',
    icon: '🟢',
  },
  {
    q: '目前的短板有哪些？',
    a: '当前AI应用实践仍以任务执行为主，缺乏系统性思维与场景化落地能力。主动性有待加强，需进一步从被动响应向主动发现问题与推动改进转变。',
    icon: '🟠',
  },
  {
    q: '下一步如何提升？',
    a: '建立以AI驱动业务创新的意识，提升"问题识别—方案设计—落地验证"的闭环能力。深化AI工具链使用与开发，增强AI项目的独立承担与跨职能协同能力。强化结果导向和产品思维，以技术手段实质性提升团队效率和业务价值。',
    icon: '🔵',
  },
];

const aiSummary = (
  <div className="w-full flex flex-col items-center gap-6">
    <div className="flex items-center gap-3 mb-2">
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-3xl shadow-lg border-2 border-white/30">🤖</div>
      <div className="text-2xl font-bold text-blue-200 drop-shadow-lg">AI助手总结</div>
    </div>
    <div className="bg-white/10 rounded-xl px-6 py-6 text-gray-100 text-lg leading-relaxed shadow-sm backdrop-blur-sm w-full">
      作为一名技术研发者，你已经具备扎实的技术基础，并在实际业务中取得了显著成果。你对新技术始终保持学习热情，具备AI转型的良好基础。<br /><br />
      当然，成长的路上也有挑战：当前AI应用实践还以任务执行为主，系统性思维和场景化落地能力有待提升。主动性也需要进一步加强，从被动响应转向主动发现和推动改进。<br /><br />
      未来，建议你持续建立以AI驱动业务创新的意识，提升"问题识别—方案设计—落地验证"的闭环能力，深化AI工具链的使用与开发，强化结果导向和产品思维，让技术为团队和业务创造更大价值。<br /><br />
      <span className="text-cyan-300 font-bold">继续加油，AI助手会一直陪伴你成长！</span>
    </div>
  </div>
);

export default function ProjectSummaryReflection({ onClose, onNext }: { onClose?: () => void; onNext?: () => void }) {
  const [tab, setTab] = useState<'qa' | 'ai'>('qa');

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" style={{backdropFilter: 'blur(2px)'}}>
      <div className="relative w-full max-w-2xl h-[540px] bg-white/10 rounded-2xl shadow-2xl flex flex-col items-center justify-start px-0 py-0 overflow-hidden">
        <div className="flex flex-col items-center mt-6 mb-2">
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-pink-400 bg-clip-text text-transparent drop-shadow-glow animate-float relative section-title">
            反思与总结
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
        {/* Tab切换栏 */}
        <div className="w-full border-b border-white/20 bg-white/10 rounded-t-2xl px-8 pt-4 pb-1 flex gap-4 justify-center shadow-lg">
          <button
            className={`px-7 py-2 font-bold transition-colors duration-200 rounded-lg border-b-2
              ${tab === 'qa' ? 'bg-cyan-400 text-white border-cyan-400' : 'bg-white/10 text-blue-200 hover:bg-cyan-200/20 border-transparent'}`}
            onClick={() => setTab('qa')}
          >总结与反思</button>
          <button
            className={`px-7 py-2 font-bold transition-colors duration-200 rounded-lg border-b-2
              ${tab === 'ai' ? 'bg-cyan-400 text-white border-cyan-400' : 'bg-white/10 text-blue-200 hover:bg-cyan-200/20 border-transparent'}`}
            onClick={() => setTab('ai')}
          >AI助手总结</button>
        </div>
        {/* 内容区 */}
        <div className="w-full flex-1 flex flex-col px-8 py-6 overflow-y-auto">
          {tab === 'qa' ? (
            <div className="w-full flex flex-col gap-8">
              {/* <div className="text-2xl font-bold text-blue-200 mb-2 text-center drop-shadow-lg">反思与总结</div> */}
              {reflections.map((item, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  {/* AI助手头像/气泡icon */}
                  <div className="flex flex-col items-center pt-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-2xl shadow-lg border-2 border-white/30">{item.icon}</div>
                  </div>
                  <div className="flex-1 flex flex-col gap-2">
                    <div className="text-blue-200 font-semibold text-lg flex items-center">
                      <span className="mr-2">Q:</span>{item.q}
                    </div>
                    <div className="bg-white/10 rounded-xl px-4 py-3 text-gray-100 text-base leading-relaxed shadow-sm backdrop-blur-sm">
                      <span className="text-cyan-300 font-bold mr-2">A:</span>{item.a}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            aiSummary
          )}
        </div>
        {/* 操作按钮 */}
        <div className="flex gap-4 mt-2 justify-center pb-4">
          {onClose && (
            <button
              className="px-4 py-1 rounded bg-blue-100/20 text-blue-200 font-semibold hover:bg-blue-200/30 transition border border-blue-200"
              onClick={onClose}
            >
              返回
            </button>
          )}
          {onNext && (
            <button
              className="px-4 py-1 rounded bg-cyan-400 text-white font-semibold hover:bg-cyan-500 transition border border-cyan-300"
              onClick={onNext}
            >
              下一步
            </button>
          )}
        </div>
      </div>
    </div>
  );
} 