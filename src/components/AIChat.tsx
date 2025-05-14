import { useState, useRef } from 'react';

type Message = { role: 'user' | 'ai'; content: string };

export default function AIChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // 替换为你的OpenAI/百度API Key和接口
  const OPENAI_API_KEY = 'sk-xxx'; // 建议用.env管理
  const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

  async function sendMessage() {
    if (!input.trim()) return;
    const newMessages: Message[] = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    // 调用OpenAI API
    try {
      const res = await fetch(OPENAI_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: newMessages.map(m => ({
            role: m.role === 'user' ? 'user' : 'assistant',
            content: m.content,
          })),
        }),
      });
      const data = await res.json();
      const aiReply = data.choices?.[0]?.message?.content || 'AI未能给出答复';
      setMessages([...newMessages, { role: 'ai', content: aiReply }]);
    } catch (e) {
      setMessages([...newMessages, { role: 'ai', content: 'AI接口调用失败，请检查网络或API Key。' }]);
    }
    setLoading(false);
    setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
  }

  async function generateImage() {
    if (!input.trim()) return;
    setLoading(true);
    try {
      const res = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          prompt: input,
          n: 1,
          size: "512x512"
        }),
      });
      const data = await res.json();
      const imgUrl = data.data?.[0]?.url;
      setMessages([...messages, { role: 'user', content: input }, { role: 'ai', content: `<img src="${imgUrl}" alt="AI生成图片" />` }]);
    } catch (e) {
      setMessages([...messages, { role: 'ai', content: '图片生成失败' }]);
    }
    setLoading(false);
  }

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100">
      <div className="w-full max-w-xl bg-white/90 rounded-2xl shadow-2xl p-6 flex flex-col h-[70vh]">
        <div className="text-2xl font-bold text-blue-700 mb-4">AI互动问答</div>
        <div className="flex-1 overflow-y-auto mb-4 space-y-3">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`p-3 rounded-xl max-w-[80%] ${
                msg.role === 'user'
                  ? 'bg-blue-100 self-end text-right'
                  : 'bg-purple-100 self-start text-left'
              }`}
            >
              <span className="font-semibold">{msg.role === 'user' ? '你：' : 'AI：'}</span>
              {msg.content}
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
        <div className="flex gap-2">
          <input
            className="flex-1 rounded-lg border px-3 py-2"
            placeholder="请输入你的问题或需求…"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            disabled={loading}
          />
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
            onClick={sendMessage}
            disabled={loading}
          >
            {loading ? 'AI思考中…' : '发送'}
          </button>
          <button
            className="px-4 py-2 bg-pink-500 text-white rounded-lg shadow hover:bg-pink-600 transition"
            onClick={generateImage}
            disabled={loading}
          >
            生成图片
          </button>
        </div>
      </div>
    </div>
  );
}
