import React, { useState, useEffect, useRef } from 'react';
import { 
  BookOpen, CheckSquare, Clock, MessageSquare, 
  ChevronRight, ChevronLeft, MinusCircle, PlusCircle,
  Home, Send, ArrowLeft, Megaphone, UserPlus, Mic, 
  Vote, Calculator, Award, HelpCircle, AlertTriangle, Scale,
  PlayCircle, CheckCircle, XCircle, Trophy, Target
} from 'lucide-react';
import { contentData } from './data/content';
import { motion, AnimatePresence } from 'framer-motion';

const getIcon = (iconName, props = { size: 32 }) => {
  switch (iconName) {
    case 'BookOpen': return <BookOpen {...props} />;
    case 'CheckSquare': return <CheckSquare {...props} />;
    case 'Clock': return <Clock {...props} />;
    case 'MessageSquare': return <MessageSquare {...props} />;
    case 'Megaphone': return <Megaphone {...props} />;
    case 'UserPlus': return <UserPlus {...props} />;
    case 'Mic': return <Mic {...props} />;
    case 'Vote': return <Vote {...props} />;
    case 'Calculator': return <Calculator {...props} />;
    case 'Award': return <Award {...props} />;
    case 'HelpCircle': return <HelpCircle {...props} />;
    case 'AlertTriangle': return <AlertTriangle {...props} />;
    case 'Scale': return <Scale {...props} />;
    default: return <BookOpen {...props} />;
  }
};

const useProfile = () => {
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('civicGuideProfile');
    if (saved) return JSON.parse(saved);
    return {
      knowledgeLevel: 'normal',
      exploredTopics: [],
      lastPosition: null,
      badges: [],
      quizScores: {}
    };
  });

  useEffect(() => {
    localStorage.setItem('civicGuideProfile', JSON.stringify(profile));
  }, [profile]);

  return [profile, setProfile];
};

function App() {
  const [profile, setProfile] = useProfile();
  
  const [activeTab, setActiveTab] = useState('home'); // 'home', 'flow', 'chat', 'quiz'
  const [activeFlowId, setActiveFlowId] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [explanationDepth, setExplanationDepth] = useState(profile.knowledgeLevel); 
  const [activeScenarioId, setActiveScenarioId] = useState(null);
  
  // Quiz state
  const [quizState, setQuizState] = useState({
    activeQuizId: null,
    currentQuestionIdx: 0,
    selectedOption: null,
    hasAnswered: false,
    score: 0,
    showResults: false
  });

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

  const updateProfileKnowledge = (depth) => {
    setExplanationDepth(depth);
    setProfile(prev => ({ ...prev, knowledgeLevel: depth }));
  };

  const startFlow = (flowId, resumeStep = 0, scenarioId = null) => {
    setActiveFlowId(flowId);
    setCurrentStep(resumeStep);
    setExplanationDepth(profile.knowledgeLevel);
    setActiveScenarioId(scenarioId);
    setActiveTab('flow');
    
    setProfile(prev => ({
      ...prev,
      lastPosition: { flowId, step: resumeStep, scenarioId }
    }));
  };

  const startQuiz = (quizId) => {
    setQuizState({
      activeQuizId: quizId,
      currentQuestionIdx: 0,
      selectedOption: null,
      hasAnswered: false,
      score: 0,
      showResults: false
    });
    setActiveTab('quiz');
  };

  const checkAndAwardBadges = (scores, explored) => {
    const newBadges = [...(profile.badges || [])];
    
    // Check Civic Scholar (Basics)
    if (!newBadges.includes('civic_scholar') && scores['basics'] === 3 && explored.includes('basics')) {
      newBadges.push('civic_scholar');
    }
    // Check Voting Expert
    if (!newBadges.includes('voting_expert') && scores['voting'] === 3 && explored.includes('voting')) {
      newBadges.push('voting_expert');
    }
    // Check Timeline Master
    if (!newBadges.includes('timeline_master') && scores['timeline'] === 3 && explored.includes('timeline')) {
      newBadges.push('timeline_master');
    }
    // Check Scenario Solver
    if (!newBadges.includes('scenario_solver') && scores['scenarios'] === 3) {
      newBadges.push('scenario_solver');
    }

    return newBadges;
  };

  const handleNextStep = () => {
    const flow = contentData.flows[activeFlowId];
    let maxSteps = 0;
    
    if (flow.type === 'flow') maxSteps = flow.steps.length;
    else if (flow.type === 'timeline') maxSteps = flow.stages.length;
    else if (flow.type === 'scenarios' && activeScenarioId) {
       const scenario = flow.cases.find(c => c.id === activeScenarioId);
       maxSteps = scenario.steps.length;
    }

    if (currentStep < maxSteps - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      setExplanationDepth(profile.knowledgeLevel);
      setProfile(prev => ({
        ...prev,
        lastPosition: { flowId: activeFlowId, step: nextStep, scenarioId: activeScenarioId }
      }));
    } else {
      // Finished Flow!
      setProfile(prev => {
        const newExplored = [...prev.exploredTopics];
        if (!newExplored.includes(activeFlowId)) newExplored.push(activeFlowId);
        if (activeScenarioId && !newExplored.includes(`scenario_${activeScenarioId}`)) {
          newExplored.push(`scenario_${activeScenarioId}`);
        }
        return { ...prev, exploredTopics: newExplored, lastPosition: null };
      });

      if (flow.quizId) {
        startQuiz(flow.quizId);
      } else if (flow.type === 'scenarios' && activeScenarioId) {
        setActiveScenarioId(null);
        setCurrentStep(0);
      } else {
        setActiveTab('home');
        setActiveFlowId(null);
      }
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      setExplanationDepth(profile.knowledgeLevel);
      setProfile(prev => ({
        ...prev,
        lastPosition: { flowId: activeFlowId, step: prevStep, scenarioId: activeScenarioId }
      }));
    }
  };

  const goHome = () => {
    setActiveTab('home');
  };

  const handleQuizAnswer = (optionIdx) => {
    if (quizState.hasAnswered) return;

    const quiz = contentData.quizzes[quizState.activeQuizId];
    const question = quiz[quizState.currentQuestionIdx];
    const isCorrect = optionIdx === question.correctAnswer;

    setQuizState(prev => ({
      ...prev,
      selectedOption: optionIdx,
      hasAnswered: true,
      score: isCorrect ? prev.score + 1 : prev.score
    }));
  };

  const handleNextQuizQuestion = () => {
    const quiz = contentData.quizzes[quizState.activeQuizId];
    if (quizState.currentQuestionIdx < quiz.length - 1) {
      setQuizState(prev => ({
        ...prev,
        currentQuestionIdx: prev.currentQuestionIdx + 1,
        selectedOption: null,
        hasAnswered: false
      }));
    } else {
      // Finish Quiz
      setQuizState(prev => ({ ...prev, showResults: true }));
      
      setProfile(prev => {
        const newScores = { ...prev.quizScores, [quizState.activeQuizId]: quizState.score };
        const newBadges = checkAndAwardBadges(newScores, prev.exploredTopics);
        return { ...prev, quizScores: newScores, badges: newBadges };
      });
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
      if (userText.includes('tie')) botResponse = contentData.chat.scenarios.tie;
      else if (userText.includes('not vote') || userText.includes("don't vote") || userText.includes("dont vote")) botResponse = contentData.chat.scenarios.novote;
      else if (userText.includes('count')) botResponse = contentData.chat.scenarios.count;
      else if (userText.includes('fraud') || userText.includes('safe') || userText.includes('secure')) botResponse = contentData.chat.scenarios.fraud;

      setChatHistory(prev => [...prev, { type: 'bot', text: botResponse }]);
      setIsTyping(false);
    }, 1000);
  };

  const getRecommendedFlow = () => {
    if (profile.exploredTopics.includes('basics') && !profile.exploredTopics.includes('voting')) return 'voting';
    if (profile.exploredTopics.includes('voting') && !profile.exploredTopics.includes('timeline')) return 'timeline';
    if (profile.exploredTopics.includes('timeline') && !profile.exploredTopics.includes('scenarios')) return 'scenarios';
    if (profile.exploredTopics.length === 0) return 'basics';
    return null;
  };

  const renderHome = () => {
    const recommendedFlowId = getRecommendedFlow();
    const badges = profile.badges || [];

    return (
      <motion.div 
        key="home"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
      >
        {profile.lastPosition && (
          <div className="resume-banner">
            <div className="resume-content">
              <h3>Pick up where you left off</h3>
              <p>Continue your journey in {contentData.flows[profile.lastPosition.flowId].title}</p>
            </div>
            <button 
              className="resume-btn"
              onClick={() => startFlow(profile.lastPosition.flowId, profile.lastPosition.step, profile.lastPosition.scenarioId)}
            >
              <PlayCircle size={20} /> Resume
            </button>
          </div>
        )}

        {badges.length > 0 && (
          <>
            <h2 className="section-title">Your Achievements</h2>
            <div className="badges-container">
              <div className={`badge-item ${badges.includes('civic_scholar') ? 'earned' : ''}`}>
                <BookOpen size={16} className="badge-icon" /> Civic Scholar
              </div>
              <div className={`badge-item ${badges.includes('voting_expert') ? 'earned' : ''}`}>
                <CheckSquare size={16} className="badge-icon" /> Voting Expert
              </div>
              <div className={`badge-item ${badges.includes('timeline_master') ? 'earned' : ''}`}>
                <Clock size={16} className="badge-icon" /> Timeline Master
              </div>
              <div className={`badge-item ${badges.includes('scenario_solver') ? 'earned' : ''}`}>
                <Target size={16} className="badge-icon" /> Scenario Solver
              </div>
            </div>
          </>
        )}

        {recommendedFlowId && (
          <h2 className="section-title">Recommended for You</h2>
        )}
        <div className="home-grid">
          {Object.values(contentData.flows).map(flow => {
            const isRecommended = flow.id === recommendedFlowId;
            const isCompleted = profile.exploredTopics.includes(flow.id);
            return (
              <div 
                key={flow.id} 
                className={`home-card ${isRecommended ? 'recommended' : ''} ${isCompleted ? 'completed' : ''}`} 
                onClick={() => startFlow(flow.id)}
              >
                <div className="home-card-icon">
                  {getIcon(flow.icon)}
                </div>
                <h3>{flow.title}</h3>
                <p>{flow.description}</p>
              </div>
            );
          })}
          <div className="home-card" onClick={() => setActiveTab('chat')}>
            <div className="home-card-icon">
              <MessageSquare size={32} />
            </div>
            <h3>Ask a Question</h3>
            <p>Chat directly with CivicGuide AI for specific queries.</p>
          </div>
        </div>
      </motion.div>
    );
  };

  const renderQuiz = () => {
    const quiz = contentData.quizzes[quizState.activeQuizId];
    const flowTitle = contentData.flows[quizState.activeQuizId]?.title || "Topic";

    if (quizState.showResults) {
      const accuracy = Math.round((quizState.score / quiz.length) * 100);
      let feedbackMsg = "Great job! Want to try a harder challenge next?";
      if (accuracy < 60) feedbackMsg = "Good effort! Consider revisiting this topic to strengthen your knowledge.";
      
      return (
        <motion.div key="quiz-results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flow-container">
          <div className="flow-header">
            <h2 className="flow-title">Quiz Results: {flowTitle}</h2>
          </div>
          <div className="flow-card quiz-results">
            <Trophy size={64} color="var(--warning)" style={{ marginBottom: '1rem' }} />
            <h2>Assessment Complete!</h2>
            
            <div className="score-circle">
              {quizState.score}
              <span>out of {quiz.length}</span>
            </div>
            
            <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Accuracy: {accuracy}%</p>
            <p style={{ color: 'var(--text-muted)', marginBottom: '3rem' }}>{feedbackMsg}</p>
            
            <div className="flow-navigation" style={{ justifyContent: 'center', gap: '1rem' }}>
               <button className="btn-nav" onClick={() => startQuiz(quizState.activeQuizId)}>
                 Retry Quiz
               </button>
               <button className="btn-nav action" onClick={goHome}>
                 Return Home
               </button>
            </div>
          </div>
        </motion.div>
      );
    }

    const question = quiz[quizState.currentQuestionIdx];

    return (
      <motion.div key={`quiz-${quizState.currentQuestionIdx}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flow-container">
        <div className="flow-header">
          <button className="back-btn" onClick={goHome} title="Exit Quiz"><ArrowLeft size={20} /></button>
          <h2 className="flow-title">{flowTitle} Knowledge Check</h2>
        </div>

        <div className="progress-container">
          <div className="progress-text">Question {quizState.currentQuestionIdx + 1} of {quiz.length}</div>
          <div className="progress-bar-bg">
            <div className="progress-bar-fill" style={{ width: `${((quizState.currentQuestionIdx + 1) / quiz.length) * 100}%` }}></div>
          </div>
        </div>

        <div className="flow-card">
          <h2 style={{ color: 'var(--text)' }}>{question.question}</h2>
          
          <div className="quiz-options">
            {question.options.map((opt, idx) => {
              let className = "quiz-option";
              if (quizState.hasAnswered) {
                if (idx === question.correctAnswer) className += " correct";
                else if (idx === quizState.selectedOption) className += " incorrect";
              } else if (idx === quizState.selectedOption) {
                className += " selected";
              }

              return (
                <button 
                  key={idx} 
                  className={className}
                  onClick={() => handleQuizAnswer(idx)}
                  disabled={quizState.hasAnswered}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {quizState.hasAnswered && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }} 
              className={`quiz-feedback ${quizState.selectedOption === question.correctAnswer ? 'success' : 'error'}`}
            >
              <div className="quiz-feedback-icon">
                {quizState.selectedOption === question.correctAnswer ? <CheckCircle size={24} /> : <XCircle size={24} />}
              </div>
              <div>
                <h4 style={{ marginBottom: '0.25rem', color: 'inherit' }}>
                  {quizState.selectedOption === question.correctAnswer ? "Correct!" : "Incorrect"}
                </h4>
                <p style={{ margin: 0 }}>{question.explanation}</p>
              </div>
            </motion.div>
          )}

          <div className="flow-navigation" style={{ marginTop: '3rem' }}>
            <div></div> {/* spacer */}
            <button 
              className="btn-nav action" 
              onClick={handleNextQuizQuestion}
              disabled={!quizState.hasAnswered}
            >
              {quizState.currentQuestionIdx === quiz.length - 1 ? 'See Results' : 'Next Question'} <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </motion.div>
    );
  };

  const renderFlow = () => {
    const flow = contentData.flows[activeFlowId];
    if (!flow) return null;

    // --- TIMELINE VIEW ---
    if (flow.type === 'timeline') {
      const activeStage = flow.stages[currentStep];
      const progressWidth = (currentStep / (flow.stages.length - 1)) * 100;

      return (
        <motion.div 
          key={`timeline-${activeFlowId}`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flow-container"
        >
          <div className="flow-header">
            <button className="back-btn" onClick={goHome} title="Back to menu">
              <ArrowLeft size={20} />
            </button>
            <h2 className="flow-title">{flow.title}</h2>
          </div>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>{flow.description}</p>

          <div className="h-timeline-container">
            <div className="h-timeline-line"></div>
            <div className="h-timeline-progress" style={{ width: `${progressWidth}%` }}></div>
            
            {flow.stages.map((stage, idx) => (
              <div 
                key={idx} 
                className={`h-timeline-node ${idx === currentStep ? 'active' : ''} ${idx < currentStep ? 'completed' : ''}`}
                onClick={() => {
                  setCurrentStep(idx);
                  setProfile(prev => ({...prev, lastPosition: { flowId: activeFlowId, step: idx, scenarioId: null }}));
                }}
              >
                <div className="h-timeline-dot"></div>
                <div className="h-timeline-label">{stage.shortDesc}</div>
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="timeline-detail-card"
            >
              <div className="timeline-detail-icon">
                {getIcon(activeStage.icon, { size: 32 })}
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--secondary)' }}>
                  Stage {currentStep + 1}: {activeStage.title}
                </h3>
                <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: 'var(--text)' }}>
                  {activeStage.content}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flow-navigation" style={{ marginTop: '3rem' }}>
            <button className="btn-nav" onClick={handlePrevStep} disabled={currentStep === 0}>
              <ChevronLeft size={20} /> Previous Stage
            </button>
            <div style={{display: 'flex', gap: '1rem'}}>
              {currentStep === flow.stages.length - 1 && flow.suggestedScenario && (
                <button className="btn-nav" style={{backgroundColor: 'var(--surface)', border: '1px solid var(--secondary)', color: 'var(--secondary)'}} onClick={() => startFlow('scenarios', 0, flow.suggestedScenario)}>
                   Try Scenario
                </button>
              )}
              <button 
                className={`btn-nav ${currentStep === flow.stages.length - 1 ? 'action' : ''}`} 
                onClick={handleNextStep}
              >
                {currentStep === flow.stages.length - 1 ? (flow.quizId ? 'Take Quiz' : 'Finish') : 'Next Stage'} <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </motion.div>
      );
    }

    // --- SCENARIO VIEW ---
    if (flow.type === 'scenarios') {
      if (!activeScenarioId) {
        // Find a recommended scenario based on explored topics
        const recScenario = flow.cases.find(c => !profile.exploredTopics.includes(`scenario_${c.id}`))?.id;

        return (
          <motion.div key="scenario-list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flow-container">
            <div className="flow-header">
              <button className="back-btn" onClick={goHome} title="Back to menu"><ArrowLeft size={20} /></button>
              <h2 className="flow-title">{flow.title}</h2>
            </div>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>{flow.description}</p>
            
            <div className="scenario-grid">
              {flow.cases.map(sc => (
                <div 
                  key={sc.id} 
                  className={`scenario-card ${recScenario === sc.id ? 'recommended' : ''}`} 
                  onClick={() => startFlow('scenarios', 0, sc.id)}
                >
                  <div className="scenario-icon">{getIcon(sc.icon, { size: 28 })}</div>
                  <h3 style={{ margin: 0, fontSize: '1.2rem' }}>{sc.question}</h3>
                  <ChevronRight style={{ marginLeft: 'auto', color: 'var(--text-muted)' }} />
                </div>
              ))}
            </div>
            
            {/* If all scenarios explored, offer the quiz */}
            {profile.exploredTopics.filter(t => t.startsWith('scenario_')).length >= 2 && (
              <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                 <button className="btn-nav action" style={{ margin: '0 auto' }} onClick={() => startQuiz('scenarios')}>
                   Test Your Scenario Knowledge
                 </button>
              </div>
            )}
          </motion.div>
        );
      }

      // Show specific scenario steps
      const scenario = flow.cases.find(c => c.id === activeScenarioId);
      const step = scenario.steps[currentStep];
      const totalSteps = scenario.steps.length;

      return (
        <motion.div key={`scenario-${activeScenarioId}-${currentStep}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flow-container">
          <div className="flow-header">
            <button className="back-btn" onClick={() => { setActiveScenarioId(null); setCurrentStep(0); setProfile(prev => ({...prev, lastPosition: { flowId: 'scenarios', step: 0, scenarioId: null }})); }} title="Back to scenarios">
              <ArrowLeft size={20} />
            </button>
            <h2 className="flow-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {getIcon(scenario.icon, { size: 24, color: 'var(--secondary)' })} {scenario.question}
            </h2>
          </div>
          
          <div className="progress-container">
            <div className="progress-text">Outcome Step {currentStep + 1} of {totalSteps}</div>
            <div className="progress-bar-bg">
              <div className="progress-bar-fill" style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}></div>
            </div>
          </div>

          <div className="flow-card">
            <div className="scenario-step">
              <div className="scenario-step-number">{currentStep + 1}</div>
              <div>
                <h2 style={{ marginBottom: '1rem', color: 'var(--primary)', marginTop: '0.2rem' }}>{step.title}</h2>
                <div className="flow-content">{step.content}</div>
              </div>
            </div>
            
            <div className="flow-navigation">
              <button className="btn-nav" onClick={handlePrevStep} disabled={currentStep === 0}>
                <ChevronLeft size={20} /> Previous
              </button>
              <button 
                className={`btn-nav ${currentStep === totalSteps - 1 ? 'action' : ''}`} 
                onClick={handleNextStep}
              >
                {currentStep === totalSteps - 1 ? 'Finish Scenario' : 'What Happens Next?'} <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </motion.div>
      );
    }

    // --- STANDARD STEP-BY-STEP FLOW VIEW ---
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
          <button className="back-btn" onClick={goHome} title="Back to menu">
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
                  onClick={() => updateProfileKnowledge('simplified')}
                  title="Make it simpler (App will remember your preference)"
                >
                  <MinusCircle size={18} /> Simplify
                </button>
              )}
              <button 
                className={`depth-btn ${explanationDepth === 'normal' ? 'active' : ''}`}
                onClick={() => updateProfileKnowledge('normal')}
              >
                <BookOpen size={18} /> Normal
              </button>
              {step.expanded && (
                <button 
                  className={`depth-btn ${explanationDepth === 'expanded' ? 'active' : ''}`}
                  onClick={() => updateProfileKnowledge('expanded')}
                  title="Show more detail (App will remember your preference)"
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
            <div style={{display: 'flex', gap: '1rem'}}>
               {currentStep === totalSteps - 1 && flow.suggestedNext && (
                 <button className="btn-nav" style={{backgroundColor: 'var(--surface)', border: '1px solid var(--secondary)', color: 'var(--secondary)'}} onClick={() => startFlow(flow.suggestedNext)}>
                    Skip to Next Topic
                 </button>
               )}
               <button 
                 className={`btn-nav ${currentStep === totalSteps - 1 ? 'action' : ''}`} 
                 onClick={handleNextStep}
               >
                 {currentStep === totalSteps - 1 ? (flow.quizId ? 'Take Quiz' : 'Finish') : 'Next Step'} <ChevronRight size={20} />
               </button>
            </div>
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
        <button className="back-btn" onClick={goHome} title="Back to menu">
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
        <div className="logo" onClick={goHome}>
          <BookOpen className="icon" size={24} /> CivicGuide AI
        </div>
        <div className="nav-links">
          <button className={`nav-link ${activeTab === 'home' ? 'active' : ''}`} onClick={goHome}>
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
            {activeTab === 'quiz' && renderQuiz()}
            {activeTab === 'chat' && renderChat()}
          </AnimatePresence>
        </main>
      </div>
    </>
  );
}

export default App;
