import React, { useState, useEffect, useRef } from 'react';
import { 
  BookOpen, CheckSquare, Clock, MessageSquare, 
  ChevronRight, ChevronLeft, MinusCircle, PlusCircle,
  Home, Send, ArrowLeft
} from 'lucide-react';
import { contentData } from './data/content';
import { motion, AnimatePresence } from 'framer-motion';

const getIcon = (iconName, props = { size: 32 }) => {
  switch (iconName) {
    case 'BookOpen': return <BookOpen {...props} />;
    case 'CheckSquare': return <CheckSquare {...props} />;
    case 'Clock': return <Clock {...props} />;
    case 'MessageSquare': return <MessageSquare {...props} />;
    default: return <BookOpen {...props} />;
  }
};

function App() {
  const [activeTab, setActiveTab] = useState('home'); // 'home', 'flow', 'chat'
  const [activeFlowId, setActiveFlowId] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [explanationDepth, setExplanationDepth] = useState('normal'); // 'simplified', 'normal', 'expanded'
  
  // Chat state
  const [chatHistory, setChatHistory] = useState([
    { type: 'bot', text: contentData.chat.welcome }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (activeTab === 'chat' && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatHistory, isTyping, activeTab]);

  const startFlow = (flowId) => {
    setActiveFlowId(flowId);
    setCurrentStep(0);
    setExplanationDepth('normal');
    setActiveTab('flow');
  };

  const handleNextStep = () => {
    const flow = contentData.flows[activeFlowId];
    if (currentStep < flow.steps.length - 1) {
      setCurrentStep(prev => prev + 1);
      setExplanationDepth('normal');
    } else {
      // Finished flow
      setActiveTab('home');
      setActiveFlowId(null);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      setExplanationDepth('normal');
    }
  };

  const handleTextSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userText = inputValue.trim().toLowerCase();
    setChatHistory(prev => [...prev, { type: 'user', text: inputValue }]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      let botResponse = contentData.chat.fallback;
      
      // Basic keyword matching for scenario routing
      if (userText.includes('tie')) botResponse = contentData.chat.scenarios.tie;
      else if (userText.includes('not vote') || userText.includes("don't vote") || userText.includes("dont vote")) botResponse = contentData.chat.scenarios.novote;
      else if (userText.includes('count')) botResponse = contentData.chat.scenarios.count;
      else if (userText.includes('fraud') || userText.includes('safe') || userText.includes('secure')) botResponse = contentData.chat.scenarios.fraud;

      setChatHistory(prev => [...prev, { type: 'bot', text: botResponse }]);
      setIsTyping(false);
    }, 1000);
  };

  const renderHome = () => (
    <motion.div 
      key="home"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="home-grid"
    >
      {Object.values(contentData.flows).map(flow => (
        <div key={flow.id} className="home-card" onClick={() => startFlow(flow.id)}>
          <div className="home-card-icon">
            {getIcon(flow.icon)}
          </div>
          <h3>{flow.title}</h3>
          <p>{flow.description}</p>
        </div>
      ))}
      <div className="home-card" onClick={() => setActiveTab('chat')}>
        <div className="home-card-icon">
          <MessageSquare size={32} />
        </div>
        <h3>Ask a Question</h3>
        <p>Chat directly with CivicGuide AI for specific queries.</p>
      </div>
    </motion.div>
  );

  const renderFlow = () => {
    const flow = contentData.flows[activeFlowId];
    if (!flow) return null;

    const isTimeline = flow.isTimeline;
    
    if (isTimeline) {
      // Render timeline view
      return (
        <motion.div 
          key={`timeline-${activeFlowId}`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flow-container"
        >
          <div className="flow-header">
            <button className="back-btn" onClick={() => setActiveTab('home')} title="Back to menu">
              <ArrowLeft size={20} />
            </button>
            <h2 className="flow-title">{flow.title}</h2>
          </div>
          <div className="flow-card" style={{ padding: '2rem' }}>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '1.1rem' }}>{flow.description}</p>
            <div className="timeline">
              {flow.steps.map((item, i) => (
                <div className="timeline-item" key={i}>
                  <div className="timeline-dot"></div>
                  <div className="timeline-content-box">
                    <h4>{item.title}</h4>
                    <p>{item.content}</p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
               <button className="btn-nav" onClick={() => setActiveTab('home')}>
                 Finish & Return Home
               </button>
            </div>
          </div>
        </motion.div>
      );
    }

    // Render Step-by-Step Flow view
    const step = flow.steps[currentStep];
    const totalSteps = flow.steps.length;
    const progressPercentage = ((currentStep + 1) / totalSteps) * 100;

    let contentToDisplay = step.content;
    if (explanationDepth === 'simplified' && step.simplified) contentToDisplay = step.simplified;
    if (explanationDepth === 'expanded' && step.expanded) contentToDisplay = step.expanded;

    return (
      <motion.div 
        key={`flow-${activeFlowId}-${currentStep}`}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="flow-container"
      >
        <div className="flow-header">
          <button className="back-btn" onClick={() => setActiveTab('home')} title="Back to menu">
            <ArrowLeft size={20} />
          </button>
          <h2 className="flow-title">{flow.title}</h2>
        </div>
        
        <div className="progress-container">
          <div className="progress-text">Step {currentStep + 1} of {totalSteps}</div>
          <div className="progress-bar-bg">
            <div className="progress-bar-fill" style={{ width: `${progressPercentage}%` }}></div>
          </div>
        </div>

        <div className="flow-card">
          <h2>{step.title}</h2>
          
          {(step.simplified || step.expanded) && (
            <div className="depth-controls">
              {step.simplified && (
                <button 
                  className={`depth-btn ${explanationDepth === 'simplified' ? 'active' : ''}`}
                  onClick={() => setExplanationDepth('simplified')}
                >
                  <MinusCircle size={18} /> Simplify
                </button>
              )}
              <button 
                className={`depth-btn ${explanationDepth === 'normal' ? 'active' : ''}`}
                onClick={() => setExplanationDepth('normal')}
              >
                <BookOpen size={18} /> Normal
              </button>
              {step.expanded && (
                <button 
                  className={`depth-btn ${explanationDepth === 'expanded' ? 'active' : ''}`}
                  onClick={() => setExplanationDepth('expanded')}
                >
                  <PlusCircle size={18} /> Tell Me More
                </button>
              )}
            </div>
          )}

          <div className="flow-content">
            <motion.div
               key={explanationDepth}
               initial={{ opacity: 0, y: 5 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.2 }}
            >
              {contentToDisplay}
            </motion.div>
          </div>
          
          <div className="flow-navigation">
            <button 
              className="btn-nav" 
              onClick={handlePrevStep}
              disabled={currentStep === 0}
            >
              <ChevronLeft size={20} /> Previous
            </button>
            <button 
              className="btn-nav" 
              onClick={handleNextStep}
              style={currentStep === totalSteps - 1 ? { backgroundColor: 'var(--secondary)', color: 'white' } : {}}
            >
              {currentStep === totalSteps - 1 ? 'Finish Flow' : 'Next Step'} <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </motion.div>
    );
  };

  const renderChat = () => (
    <motion.div 
      key="chat"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flow-container"
      style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
    >
      <div className="flow-header">
        <button className="back-btn" onClick={() => setActiveTab('home')} title="Back to menu">
          <ArrowLeft size={20} />
        </button>
        <h2 className="flow-title">Ask CivicGuide AI</h2>
      </div>

      <div className="scroll-container" ref={scrollRef}>
        <AnimatePresence>
          {chatHistory.map((msg, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`message ${msg.type}`}
            >
              <div className="avatar">
                {msg.type === 'bot' ? 'CG' : 'U'}
              </div>
              <div className="bubble">
                <div style={{ whiteSpace: 'pre-wrap' }}>{msg.text}</div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isTyping && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="message bot">
            <div className="avatar">CG</div>
            <div className="bubble" style={{ display: 'flex', gap: '4px', alignItems: 'center', height: '44px' }}>
              <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} style={{ width: '8px', height: '8px', backgroundColor: 'var(--text-muted)', borderRadius: '50%' }} />
              <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} style={{ width: '8px', height: '8px', backgroundColor: 'var(--text-muted)', borderRadius: '50%' }} />
              <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} style={{ width: '8px', height: '8px', backgroundColor: 'var(--text-muted)', borderRadius: '50%' }} />
            </div>
          </motion.div>
        )}
      </div>

      <form className="action-bar" onSubmit={handleTextSubmit}>
        <input 
          type="text" 
          placeholder="Ask about ties, voting, counting, or security..." 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          disabled={isTyping}
        />
        <button type="submit" disabled={!inputValue.trim() || isTyping}>
          <Send size={20} />
        </button>
      </form>
    </motion.div>
  );

  return (
    <>
      <nav className="navbar">
        <div className="logo" onClick={() => setActiveTab('home')}>
          <BookOpen className="icon" size={24} /> CivicGuide AI
        </div>
        <div className="nav-links">
          <button className={`nav-link ${activeTab === 'home' ? 'active' : ''}`} onClick={() => setActiveTab('home')}>
            <Home size={18} /> Home
          </button>
          <button className={`nav-link ${activeTab === 'chat' ? 'active' : ''}`} onClick={() => setActiveTab('chat')}>
            <MessageSquare size={18} /> Ask AI
          </button>
        </div>
      </nav>

      <div className="app-container">
        {activeTab === 'home' && (
          <div className="header">
            <h1>Welcome to CivicGuide</h1>
            <p>Select a topic below to begin your guided learning journey.</p>
          </div>
        )}

        <main className="main-content">
          <AnimatePresence mode="wait">
            {activeTab === 'home' && renderHome()}
            {activeTab === 'flow' && renderFlow()}
            {activeTab === 'chat' && renderChat()}
          </AnimatePresence>
        </main>
      </div>
    </>
  );
}

export default App;
