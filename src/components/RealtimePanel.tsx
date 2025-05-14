import { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, onValue } from 'firebase/database';

// 替换为你的 firebaseConfig
const firebaseConfig = {
    apiKey: "AIzaSyDPIHu9qzE5vOSYLGPpw4QN0moToyvHTxc",
    authDomain: "joyous-1.firebaseapp.com",
    databaseURL: "https://joyous-1-default-rtdb.firebaseio.com",
    projectId: "joyous-1",
    storageBucket: "joyous-1.firebasestorage.app",
    messagingSenderId: "628710824153",
    appId: "1:628710824153:web:ac252627e986e8c362c6c8",
    measurementId: "G-QQJW14JN8P"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

type Comment = { text: string; time: number };

export default function RealtimePanel() {
  const [input, setInput] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);

  // 监听评论
  useEffect(() => {
    const commentsRef = ref(db, 'comments');
    onValue(commentsRef, (snapshot) => {
      const val = snapshot.val() || {};
      const arr = Object.values(val) as Comment[];
      // 按时间排序
      arr.sort((a, b) => a.time - b.time);
      setComments(arr);
    });
  }, []);

  // 发送评论
  function sendComment() {
    if (!input.trim()) return;
    const commentsRef = ref(db, 'comments');
    push(commentsRef, { text: input, time: Date.now() });
    setInput('');
  }

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-blue-100">
      <div className="w-full max-w-xl bg-white/90 rounded-2xl shadow-2xl p-6 flex flex-col h-[70vh]">
        <div className="text-2xl font-bold text-green-700 mb-4">实时互动评论区</div>
        <div className="flex-1 overflow-y-auto mb-4 space-y-3">
          {comments.map((c, i) => (
            <div key={i} className="p-3 rounded-xl bg-blue-50 shadow text-gray-800">
              {c.text}
              <span className="ml-2 text-xs text-gray-400">{new Date(c.time).toLocaleTimeString()}</span>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            className="flex-1 rounded-lg border px-3 py-2"
            placeholder="说点什么…"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendComment()}
          />
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
            onClick={sendComment}
          >
            发送
          </button>
        </div>
      </div>
    </div>
  );
}
