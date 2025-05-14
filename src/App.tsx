import { useState } from 'react'
import './App.css'
import Home3D from './components/Home3D'
import Profile3D from './components/Profile3D'
import Projects3DSpace from './components/Projects3DSpace'
// import AIChat from './components/AIChat'
// import Timeline3D from './components/Timeline3D'
import Fireworks3D from './components/Fireworks3D'
import ProjectSummarySlides from './components/ProjectSummarySlides'
import ProjectSummaryTimeline from './components/ProjectSummaryTimeline'
import ProjectSummaryReflection from './components/ProjectSummaryReflection'

function App() {
  const [page, setPage] = useState<'home' | 'profile' | 'projects' | 'ai'  | 'timeline' | 'fireworks' | 'main' | 'summary' | 'timelineSummary' | 'reflection'>('home')

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-x-hidden">
      {/* 全局渐变和氛围色背景层 */}
      <div
        className="pointer-events-none select-none fixed inset-0 z-0"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse at 60% 40%, #232526 0%, #181c24 100%),' +
            'linear-gradient(120deg, rgba(56,189,248,0.10) 0%, rgba(129,140,248,0.13) 60%, rgba(244,114,182,0.13) 100%)',
          backgroundBlendMode: 'lighten, normal',
        }}
      >
        <div className="bg-blur-spot" style={{width:'520px',height:'520px',top:'8vh',left:'6vw',background:'radial-gradient(circle,#38bdf8 0%,#818cf8 100%)', position:'absolute'}}></div>
        <div className="bg-blur-spot2" style={{width:'400px',height:'400px',bottom:'6vh',right:'8vw',background:'radial-gradient(circle,#f472b6 0%,#818cf8 100%)', position:'absolute'}}></div>
      </div>
      {/* 内容区 */}
      <div className="w-full flex-1 flex flex-col items-center justify-center">
        {page === 'home' && <Home3D onEnter={() => setPage('profile')} />}
        {page === 'profile' && <Profile3D />}
        {page === 'projects' && <Projects3DSpace />}
        {page === 'summary' && <ProjectSummarySlides onClose={() => setPage('projects')} />}
        {page === 'timelineSummary' && <ProjectSummaryTimeline onClose={() => setPage('ai')} />}
        {page === 'reflection' && <ProjectSummaryReflection onClose={() => setPage('timelineSummary')} onNext={() => setPage('fireworks')} />}
        {page === 'fireworks' && <Fireworks3D onRestart={() => setPage('home')} />}
      </div>
      {/* 左上角返回首页，所有非首页页面都显示 */}
      {page !== 'home' && (
        <button
          className="fixed top-4 left-4 z-50 px-4 py-2 bg-indigo-400 text-white rounded-full shadow-lg hover:scale-110 hover:shadow-2xl transition-all duration-300"
          onClick={() => setPage('home')}
        >
          返回首页
        </button>
      )}
      {/* 右上角“上一步+下一步”按钮，flex 水平排列，避免重叠 */}
      {(page === 'summary' || page === 'timelineSummary' || page === 'reflection' || page === 'fireworks' || page === 'projects' || page === 'profile') && (
        <div className="fixed top-4 right-4 z-50 flex gap-3">
          {/* 上一步按钮 */}
          {page === 'profile' && (
            <button
              className="px-4 py-2 bg-blue-400 text-white rounded-full shadow-lg hover:scale-110 hover:shadow-2xl transition-all duration-300"
              onClick={() => setPage('home')}
            >
              上一步
            </button>
          )}
          {page === 'projects' && (
            <button
              className="px-4 py-2 bg-blue-400 text-white rounded-full shadow-lg hover:scale-110 hover:shadow-2xl transition-all duration-300"
              onClick={() => setPage('profile')}
            >
              上一步
            </button>
          )}
          {page === 'summary' && (
            <button
              className="px-4 py-2 bg-blue-400 text-white rounded-full shadow-lg hover:scale-110 hover:shadow-2xl transition-all duration-300"
              onClick={() => setPage('projects')}
            >
              上一步
            </button>
          )}
          {page === 'timelineSummary' && (
            <button
              className="px-4 py-2 bg-blue-400 text-white rounded-full shadow-lg hover:scale-110 hover:shadow-2xl transition-all duration-300"
              onClick={() => setPage('summary')}
            >
              上一步
            </button>
          )}
          {page === 'reflection' && (
            <button
              className="px-4 py-2 bg-blue-400 text-white rounded-full shadow-lg hover:scale-110 hover:shadow-2xl transition-all duration-300"
              onClick={() => setPage('timelineSummary')}
            >
              上一步
            </button>
          )}
          {page === 'fireworks' && (
            <button
              className="px-4 py-2 bg-blue-400 text-white rounded-full shadow-lg hover:scale-110 hover:shadow-2xl transition-all duration-300"
              onClick={() => setPage('reflection')}
            >
              上一步
            </button>
          )}

          {/* 下一步按钮 */}
          {page === 'profile' && (
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-full shadow-lg hover:scale-110 hover:shadow-2xl transition-all duration-300"
              onClick={() => setPage('projects')}
            >
              下一步：项目成果
            </button>
          )}
          {page === 'projects' && (
            <button
              className="px-4 py-2 bg-cyan-400 text-white rounded-full shadow-lg hover:scale-110 hover:shadow-2xl transition-all duration-300"
              onClick={() => setPage('summary')}
            >
              下一步：项目成果总结
            </button>
          )}
          {page === 'summary' && (
            <button
              className="px-4 py-2 bg-blue-400 text-white rounded-full shadow-lg hover:scale-110 hover:shadow-2xl transition-all duration-300"
              onClick={() => setPage('timelineSummary')}
            >
              下一步：成长目标时间轴
            </button>
          )}
          {page === 'timelineSummary' && (
            <button
              className="px-4 py-2 bg-blue-400 text-white rounded-full shadow-lg hover:scale-110 hover:shadow-2xl transition-all duration-300"
              onClick={() => setPage('reflection')}
            >
              下一步：反思与总结
            </button>
          )}
          {page === 'reflection' && (
            <button
              className="px-4 py-2 bg-pink-400 text-white rounded-full shadow-lg hover:scale-110 hover:shadow-2xl transition-all duration-300"
              onClick={() => setPage('fireworks')}
            >
              下一步：谢谢
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default App 