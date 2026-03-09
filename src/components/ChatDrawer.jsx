import { useState, useRef, useEffect } from 'react'
import { X, Send, Sparkles } from 'lucide-react'

export default function ChatDrawer({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your Tripamoja travel assistant. I can help you plan your perfect Kenyan adventure. What would you like to do?",
      sender: 'bot',
      time: new Date(),
    }
  ])
  const [input, setInput] = useState('')
  const messagesEndRef = useRef(null)

  const aiOptions = [
    { icon: '🗺️', label: 'Plan Trip', action: 'plan' },
    { icon: '💎', label: 'Hidden Gems', action: 'gems' },
    { icon: '💰', label: 'Budget Planner', action: 'budget' },
    { icon: '🌍', label: 'Cultural Tips', action: 'culture' },
    { icon: '🦁', label: 'Wildlife Calendar', action: 'wildlife' },
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = (text) => {
    if (!text.trim()) return

    const userMessage = {
      id: Date.now(),
      text,
      sender: 'user',
      time: new Date(),
    }

    setMessages([...messages, userMessage])
    setInput('')

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: `Great! I can help you with ${text}. Let me find the best options for you based on your preferences.`,
        sender: 'bot',
        time: new Date(),
      }
      setMessages(prev => [...prev, botResponse])
    }, 500)
  }

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div className={`fixed inset-y-0 right-0 w-full md:w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-secondary to-secondary/80">
          <div className="flex items-center gap-2">
            <Sparkles size={24} className="text-white" />
            <h2 className="text-xl font-bold text-white">Travel Assistant</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X size={24} className="text-white" />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto h-[calc(100vh-300px)] p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs px-4 py-3 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-secondary text-white rounded-br-none'
                    : 'bg-gray-100 text-gray-800 rounded-bl-none'
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <span className="text-xs opacity-70 mt-1 block">
                  {message.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Options (if no input) */}
        {messages.length <= 1 && (
          <div className="p-4 border-t bg-gray-50">
            <p className="text-sm font-semibold text-gray-700 mb-3">How can I help?</p>
            <div className="grid grid-cols-2 gap-2">
              {aiOptions.map((option) => (
                <button
                  key={option.action}
                  onClick={() => handleSendMessage(option.label)}
                  className="p-3 text-left bg-white border border-gray-200 rounded-lg hover:border-secondary hover:bg-secondary/5 transition-all text-sm font-medium text-gray-700"
                >
                  <div className="text-lg mb-1">{option.icon}</div>
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="p-4 border-t bg-white">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Ask me anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(input)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
            />
            <button
              onClick={() => handleSendMessage(input)}
              className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-colors"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
