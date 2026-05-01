import React, { useState, useEffect, useRef } from 'react';
import { BookOpen, CheckSquare, Clock, HelpCircle, Calculator, Megaphone, AlertTriangle, Scale, Send, RefreshCw } from 'lucide-react';
import { electionContent } from './data/content';
import { motion, AnimatePresence } from 'framer-motion';

const getIcon = (iconName) => {
  switch (iconName) {
    case 'BookOpen': return <BookOpen size={20} />;
    case 'CheckSquare': return <CheckSquare size={20} />;
    case 'Clock': return <Clock size={20} />;
    case 'HelpCircle': return <HelpCircle size={20} />;
    case 'Calculator': return <Calculator size={20} />;
    case 'Megaphone': return <Megaphone size={20} />;
    case 'AlertTriangle': return <AlertTriangle size={20} />;
    case 'Scale': return <Scale size={20} />;
    default: return <BookOpen size={20} />;
  }
};

function App() {
  const [history, setHistory] = useState([
    { type: 'bot', contentId: 'welcome', text: electionContent.welcome.content }
  ]);
  const [currentOptions, setCurrentOptions] = useState(electionContent.welcome.options);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, isTyping]);

  const handleOptionClick = (option) => {
    // Add user message
    setHistory(prev => [...prev, { type: 'user', text: option.label }]);
    
    // Simulate thinking/typing delay
    setIsTyping(true);
    setCurrentOptions([]);
    
    setTimeout(() => {
      const nextContent = electionContent[option.id] || electionContent.fallback;
      
      setHistory(prev => [...prev, { 
        type: 'bot', 
        contentId: option.id, 
        text: nextContent.content,
        isTimeline: nextContent.isTimeline,
        timelineData: nextContent.timelineData
      }]);
      
      setIsTyping(false);
      setCurrentOptions(nextContent.options || []);
    }, 800);
  };

  const handleTextSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userText = inputValue.trim().toLowerCase();
    setHistory(prev => [...prev, { type: 'user', text: inputValue }]);
    setInputValue('');
    setIsTyping(true);
    setCurrentOptions([]);

    setTimeout(() => {
      // Very basic keyword matching for demonstration
      let matchId = 'fallback';
      if (userText.includes('basic') || userText.includes('what is')) matchId = 'basics';
      else if (userText.includes('step') || userText.includes('how to vote')) matchId = 'voting_steps';
      else if (userText.includes('time') || userText.includes('when')) matchId = 'timeline';
      else if (userText.includes('count')) matchId = 'counting';
      else if (userText.includes('campaign')) matchId = 'campaigning';
      else if (userText.includes('not vote') || userText.includes('don\'t vote')) matchId = 'scenario_novote';
      else if (userText.includes('tie')) matchId = 'scenario_tie';

      const nextContent = electionContent[matchId];
      
      setHistory(prev => [...prev, { 
        type: 'bot', 
        contentId: matchId, 
        text: nextContent.content,
        isTimeline: nextContent.isTimeline,
        timelineData: nextContent.timelineData
      }]);
      
      setIsTyping(false);
      setCurrentOptions(nextContent.options || []);
    }, 1000);
  };

  const restart = () => {
    setHistory([{ type: 'bot', contentId: 'welcome', text: electionContent.welcome.content }]);
    setCurrentOptions(electionContent.welcome.options);
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>CivicGuide AI</h1>
        <p>Your interactive, unbiased guide to understanding elections.</p>
        <div style={{ marginTop: '1rem' }}>
          <button onClick={restart} className="btn btn-outline" style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}>
            <RefreshCw size={16} /> Start Over
          </button>
        </div>
      </header>

      <main className="main-content" style={{ overflowY: 'auto' }} ref={scrollRef}>
        <div className="scroll-container">
          <AnimatePresence>
            {history.map((msg, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`message ${msg.type}`}
              >
                <div className="avatar">
                  {msg.type === 'bot' ? 'CG' : 'U'}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
                  <div className="bubble">
                    <div style={{ whiteSpace: 'pre-wrap' }}>{msg.text}</div>
                  </div>
                  
                  {msg.isTimeline && msg.timelineData && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="timeline"
                    >
                      {msg.timelineData.map((item, i) => (
                        <div className="timeline-item" key={i}>
                          <div className="timeline-dot"></div>
                          <div className="timeline-content">
                            <h4>{item.step}</h4>
                            <p>{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}
                  
                  {msg.type === 'bot' && idx === history.length - 1 && !isTyping && electionContent[msg.contentId]?.followUp && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      style={{ marginTop: '0.5rem', fontStyle: 'italic', color: 'var(--text-muted)' }}
                    >
                      {electionContent[msg.contentId].followUp}
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="message bot"
            >
              <div className="avatar">CG</div>
              <div className="bubble" style={{ display: 'flex', gap: '4px', alignItems: 'center', height: '44px' }}>
                <motion.div 
                  animate={{ y: [0, -5, 0] }} 
                  transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
                  style={{ width: '8px', height: '8px', backgroundColor: 'var(--text-muted)', borderRadius: '50%' }}
                />
                <motion.div 
                  animate={{ y: [0, -5, 0] }} 
                  transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                  style={{ width: '8px', height: '8px', backgroundColor: 'var(--text-muted)', borderRadius: '50%' }}
                />
                <motion.div 
                  animate={{ y: [0, -5, 0] }} 
                  transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                  style={{ width: '8px', height: '8px', backgroundColor: 'var(--text-muted)', borderRadius: '50%' }}
                />
              </div>
            </motion.div>
          )}

          {!isTyping && currentOptions.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="options-container"
            >
              <div className="options-grid">
                {currentOptions.map((opt) => (
                  <button 
                    key={opt.id} 
                    className="option-card"
                    onClick={() => handleOptionClick(opt)}
                  >
                    <div className="icon">
                      {getIcon(opt.icon)}
                    </div>
                    <h3>{opt.label}</h3>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </main>

      <form className="action-bar" onSubmit={handleTextSubmit}>
        <input 
          type="text" 
          placeholder="Ask a question about elections..." 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          disabled={isTyping}
        />
        <button type="submit" disabled={!inputValue.trim() || isTyping}>
          <Send size={20} />
        </button>
      </form>
    </div>
  );
}

export default App;
