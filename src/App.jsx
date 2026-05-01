import React, { useState, useEffect, useRef, Suspense } from 'react';
import { 
  BookOpen, CheckSquare, Clock, MessageSquare, 
  ChevronRight, ChevronLeft, MinusCircle, PlusCircle,
  Home, Send, ArrowLeft, Megaphone, UserPlus, Mic, 
  Vote, Calculator, Award, HelpCircle, AlertTriangle, Scale,
  PlayCircle, CheckCircle, XCircle, Trophy, Target, Globe, Loader, Calendar, RefreshCcw
} from 'lucide-react';
import { contentData } from './data/content';
import { fetchUpcomingElections } from './data/api';
import { motion, AnimatePresence } from 'framer-motion';
import { useProfile } from './hooks/useProfile';
import { checkAndAwardBadges, getRecommendedFlow } from './utils/helpers';

const Landing = React.lazy(() => import('./components/Landing'));

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

function App() {
  const [profile, setProfile] = useProfile();
  const lang = profile.language || 'en';
  const t = contentData[lang] || contentData['en'];
  
  const [activeTab, setActiveTab] = useState('home'); // 'home', 'flow', 'chat', 'quiz'
  const [activeFlowId, setActiveFlowId] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [explanationDepth, setExplanationDepth] = useState(profile.knowledgeLevel); 
  const [activeScenarioId, setActiveScenarioId] = useState(null);
  
  // Real-time Data State
  const [elections, setElections] = useState(null);
  const [electionsLoading, setElectionsLoading] = useState(true);
  const [electionsError, setElectionsError] = useState(false);

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
    { type: 'bot', text: t.chat.welcome }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (profile.hasStarted) {
      loadElections();
    }
  }, [lang, profile.hasStarted]);

  useEffect(() => {
    if (chatHistory.length === 1 && chatHistory[0].type === 'bot') {
       setChatHistory([{ type: 'bot', text: t.chat.welcome }]);
    }
  }, [lang]);

  useEffect(() => {
    if (activeTab === 'chat' && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatHistory, isTyping, activeTab]);

  const loadElections = async () => {
    setElectionsLoading(true);
    setElectionsError(false);
    try {
      const data = await fetchUpcomingElections(lang);
      setElections(data);
    } catch (err) {
      setElectionsError(true);
    } finally {
      setElectionsLoading(false);
    }
  };

  const handleStart = () => {
    setProfile(prev => ({ ...prev, hasStarted: true }));
  };

  const toggleLanguage = () => {
    setProfile(prev => ({ ...prev, language: prev.language === 'en' ? 'hi' : 'en' }));
  };

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

  const handleNextStep = () => {
    const flow = t.flows[activeFlowId];
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

    const quiz = t.quizzes[quizState.activeQuizId];
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
    const quiz = t.quizzes[quizState.activeQuizId];
    if (quizState.currentQuestionIdx < quiz.length - 1) {
      setQuizState(prev => ({
        ...prev,
        currentQuestionIdx: prev.currentQuestionIdx + 1,
        selectedOption: null,
        hasAnswered: false
      }));
    } else {
      setQuizState(prev => ({ ...prev, showResults: true }));
      setProfile(prev => {
        const newScores = { ...prev.quizScores, [quizState.activeQuizId]: quizState.score };
        const newBadges = checkAndAwardBadges(newScores, prev.exploredTopics, prev.badges);
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
      let botResponse = t.chat.fallback;
      if (userText.includes('tie') || userText.includes('टाई')) botResponse = t.chat.scenarios.tie;
      else if (userText.includes('not vote') || userText.includes('वोट नहीं') || userText.includes("dont vote")) botResponse = t.chat.scenarios.novote;
      else if (userText.includes('count') || userText.includes('गिनती')) botResponse = t.chat.scenarios.count;
      else if (userText.includes('fraud') || userText.includes('safe') || userText.includes('धोखाधड़ी')) botResponse = t.chat.scenarios.fraud;

      setChatHistory(prev => [...prev, { type: 'bot', text: botResponse }]);
      setIsTyping(false);
    }, 1000);
  };

  if (!profile.hasStarted) {
    return (
      <Suspense fallback={<div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh'}}><Loader className="spinner" size={48} color="var(--primary)"/></div>}>
        <Landing onStart={handleStart} />
      </Suspense>
    );
  }

  const renderHome = () => {
    const recommendedFlowId = getRecommendedFlow(profile.exploredTopics);
    const badges = profile.badges || [];

    return (
      <motion.div 
        key="home"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        role="main"
        aria-label={t.ui.home}
      >
        {profile.lastPosition && (
          <div className="resume-banner" role="region" aria-label="Resume learning">
            <div className="resume-content">
              <h3>{t.ui.resumeBannerTitle}</h3>
              <p>{t.ui.resumeBannerDesc} {t.flows[profile.lastPosition.flowId].title}</p>
            </div>
            <button 
              className="resume-btn"
              onClick={() => startFlow(profile.lastPosition.flowId, profile.lastPosition.step, profile.lastPosition.scenarioId)}
              aria-label={`Resume ${t.flows[profile.lastPosition.flowId].title}`}
            >
              <PlayCircle size={20} aria-hidden="true" /> {t.ui.resumeBtn}
            </button>
          </div>
        )}

        <h2 className="section-title">{t.ui.upcomingElections}</h2>
        <div className="elections-widget" role="region" aria-live="polite">
          {electionsLoading && <div className="widget-status"><Loader className="spinner" size={24} /> {t.ui.loading}</div>}
          {electionsError && (
             <div className="widget-status error">
               <AlertTriangle size={24} /> {t.ui.errorLoading} 
               <button className="text-btn" onClick={loadElections}><RefreshCcw size={16}/> {t.ui.retry}</button>
             </div>
          )}
          {elections && !electionsLoading && !electionsError && (
            <div className="elections-list">
              {elections.map(election => (
                <div key={election.id} className="election-item">
                  <div className="election-date">
                    <Calendar size={20} className="icon-cal" />
                    <span>{new Date(election.date).toLocaleDateString(lang === 'hi' ? 'hi-IN' : 'en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                  <div className="election-details">
                    <h4>{election.title}</h4>
                    <span className="election-tag">{election.type}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {badges.length > 0 && (
          <>
            <h2 className="section-title">{t.ui.achievements}</h2>
            <div className="badges-container" role="list">
              <div className={`badge-item ${badges.includes('civic_scholar') ? 'earned' : ''}`} role="listitem">
                <BookOpen size={16} className="badge-icon" aria-hidden="true" /> {lang === 'hi' ? "नागरिक विद्वान" : "Civic Scholar"}
              </div>
              <div className={`badge-item ${badges.includes('voting_expert') ? 'earned' : ''}`} role="listitem">
                <CheckSquare size={16} className="badge-icon" aria-hidden="true" /> {lang === 'hi' ? "मतदान विशेषज्ञ" : "Voting Expert"}
              </div>
              <div className={`badge-item ${badges.includes('timeline_master') ? 'earned' : ''}`} role="listitem">
                <Clock size={16} className="badge-icon" aria-hidden="true" /> {lang === 'hi' ? "समयरेखा मास्टर" : "Timeline Master"}
              </div>
              <div className={`badge-item ${badges.includes('scenario_solver') ? 'earned' : ''}`} role="listitem">
                <Target size={16} className="badge-icon" aria-hidden="true" /> {lang === 'hi' ? "परिदृश्य समाधानकर्ता" : "Scenario Solver"}
              </div>
            </div>
          </>
        )}

        {recommendedFlowId && (
          <h2 className="section-title">{t.ui.recommended}</h2>
        )}
        <div className="home-grid">
          {Object.values(t.flows).map(flow => {
            const isRecommended = flow.id === recommendedFlowId;
            const isCompleted = profile.exploredTopics.includes(flow.id);
            return (
              <button 
                key={flow.id} 
                className={`home-card ${isRecommended ? 'recommended' : ''} ${isCompleted ? 'completed' : ''}`} 
                onClick={() => startFlow(flow.id)}
                aria-label={`Start ${flow.title}${isCompleted ? ' (Completed)' : ''}${isRecommended ? ' (Recommended)' : ''}`}
                data-recommended={isRecommended ? t.ui.recommended : undefined}
                data-completed={isCompleted ? t.ui.completed : undefined}
              >
                <div className="home-card-icon" aria-hidden="true">
                  {getIcon(flow.icon)}
                </div>
                <h3>{flow.title}</h3>
                <p>{flow.description}</p>
              </button>
            );
          })}
          <button className="home-card" onClick={() => setActiveTab('chat')} aria-label={t.ui.askQuestionTitle}>
            <div className="home-card-icon" aria-hidden="true">
              <MessageSquare size={32} />
            </div>
            <h3>{t.ui.askQuestionTitle}</h3>
            <p>{t.ui.askQuestionDesc}</p>
          </button>
        </div>
      </motion.div>
    );
  };

  const renderQuiz = () => {
    const quiz = t.quizzes[quizState.activeQuizId];
    const flowTitle = t.flows[quizState.activeQuizId]?.title || "Topic";

    if (quizState.showResults) {
      const accuracy = Math.round((quizState.score / quiz.length) * 100);
      let feedbackMsg = lang === 'en' ? "Great job! Want to try a harder challenge next?" : "बहुत बढ़िया! क्या आप आगे कोई कठिन चुनौती आजमाना चाहते हैं?";
      if (accuracy < 60) feedbackMsg = lang === 'en' ? "Good effort! Consider revisiting this topic to strengthen your knowledge." : "अच्छा प्रयास! अपने ज्ञान को मजबूत करने के लिए इस विषय पर दोबारा विचार करें।";
      
      return (
        <motion.div key="quiz-results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flow-container" role="main">
          <div className="flow-header">
            <h2 className="flow-title">{t.ui.quizResults}: {flowTitle}</h2>
          </div>
          <div className="flow-card quiz-results">
            <Trophy size={64} color="var(--warning)" style={{ marginBottom: '1rem' }} aria-hidden="true" />
            <h2>{t.ui.assessmentComplete}</h2>
            
            <div className="score-circle" aria-label={`Score: ${quizState.score} ${t.ui.outOf} ${quiz.length}`}>
              {quizState.score}
              <span>{t.ui.outOf} {quiz.length}</span>
            </div>
            
            <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>{t.ui.accuracy}: {accuracy}%</p>
            <p style={{ color: 'var(--text-muted)', marginBottom: '3rem' }}>{feedbackMsg}</p>
            
            <div className="flow-navigation" style={{ justifyContent: 'center', gap: '1rem' }}>
               <button className="btn-nav" onClick={() => startQuiz(quizState.activeQuizId)}>
                 {t.ui.retryQuiz}
               </button>
               <button className="btn-nav action" onClick={goHome}>
                 {t.ui.returnHome}
               </button>
            </div>
          </div>
        </motion.div>
      );
    }

    const question = quiz[quizState.currentQuestionIdx];

    return (
      <motion.div key={`quiz-${quizState.currentQuestionIdx}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flow-container" role="main">
        <div className="flow-header">
          <button className="back-btn" onClick={goHome} aria-label="Exit Quiz"><ArrowLeft size={20} /></button>
          <h2 className="flow-title">{flowTitle} Knowledge Check</h2>
        </div>

        <div className="progress-container" role="progressbar" aria-valuenow={quizState.currentQuestionIdx + 1} aria-valuemin="1" aria-valuemax={quiz.length}>
          <div className="progress-text">Question {quizState.currentQuestionIdx + 1} {t.ui.outOf} {quiz.length}</div>
          <div className="progress-bar-bg">
            <div className="progress-bar-fill" style={{ width: `${((quizState.currentQuestionIdx + 1) / quiz.length) * 100}%` }}></div>
          </div>
        </div>

        <div className="flow-card">
          <h2 style={{ color: 'var(--text)' }}>{question.question}</h2>
          
          <div className="quiz-options" role="radiogroup">
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
                  role="radio"
                  aria-checked={quizState.selectedOption === idx}
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
              role="alert"
            >
              <div className="quiz-feedback-icon" aria-hidden="true">
                {quizState.selectedOption === question.correctAnswer ? <CheckCircle size={24} /> : <XCircle size={24} />}
              </div>
              <div>
                <h4 style={{ marginBottom: '0.25rem', color: 'inherit' }}>
                  {quizState.selectedOption === question.correctAnswer ? t.ui.correct : t.ui.incorrect}
                </h4>
                <p style={{ margin: 0 }}>{question.explanation}</p>
              </div>
            </motion.div>
          )}

          <div className="flow-navigation" style={{ marginTop: '3rem' }}>
            <div></div>
            <button 
              className="btn-nav action" 
              onClick={handleNextQuizQuestion}
              disabled={!quizState.hasAnswered}
            >
              {quizState.currentQuestionIdx === quiz.length - 1 ? t.ui.seeResults : t.ui.nextQuestion} <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </motion.div>
    );
  };

  const renderFlow = () => {
    const flow = t.flows[activeFlowId];
    if (!flow) return null;

    if (flow.type === 'timeline') {
      const activeStage = flow.stages[currentStep];
      const progressWidth = (currentStep / (flow.stages.length - 1)) * 100;

      return (
        <motion.div 
          key={`timeline-${activeFlowId}`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flow-container"
          role="main"
        >
          <div className="flow-header">
            <button className="back-btn" onClick={goHome} aria-label="Back to menu">
              <ArrowLeft size={20} />
            </button>
            <h2 className="flow-title">{flow.title}</h2>
          </div>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>{flow.description}</p>

          <div className="h-timeline-container" role="progressbar" aria-valuenow={currentStep + 1} aria-valuemin="1" aria-valuemax={flow.stages.length}>
            <div className="h-timeline-line"></div>
            <div className="h-timeline-progress" style={{ width: `${progressWidth}%` }}></div>
            
            {flow.stages.map((stage, idx) => (
              <button 
                key={idx} 
                className={`h-timeline-node ${idx === currentStep ? 'active' : ''} ${idx < currentStep ? 'completed' : ''}`}
                onClick={() => {
                  setCurrentStep(idx);
                  setProfile(prev => ({...prev, lastPosition: { flowId: activeFlowId, step: idx, scenarioId: null }}));
                }}
                aria-label={`Go to stage ${idx + 1}: ${stage.title}`}
                aria-current={idx === currentStep ? 'step' : undefined}
              >
                <div className="h-timeline-dot"></div>
                <div className="h-timeline-label">{stage.shortDesc}</div>
              </button>
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
              role="region"
              aria-live="polite"
            >
              <div className="timeline-detail-icon" aria-hidden="true">
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
              <ChevronLeft size={20} /> {t.ui.previousStage}
            </button>
            <div style={{display: 'flex', gap: '1rem'}}>
              {currentStep === flow.stages.length - 1 && flow.suggestedScenario && (
                <button className="btn-nav" style={{backgroundColor: 'var(--surface)', border: '1px solid var(--secondary)', color: 'var(--secondary)'}} onClick={() => startFlow('scenarios', 0, flow.suggestedScenario)}>
                   {t.ui.tryScenario}
                </button>
              )}
              <button 
                className={`btn-nav ${currentStep === flow.stages.length - 1 ? 'action' : ''}`} 
                onClick={handleNextStep}
              >
                {currentStep === flow.stages.length - 1 ? (flow.quizId ? t.ui.takeQuiz : t.ui.finish) : t.ui.nextStage} <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </motion.div>
      );
    }

    if (flow.type === 'scenarios') {
      if (!activeScenarioId) {
        const recScenario = flow.cases.find(c => !profile.exploredTopics.includes(`scenario_${c.id}`))?.id;

        return (
          <motion.div key="scenario-list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flow-container" role="main">
            <div className="flow-header">
              <button className="back-btn" onClick={goHome} aria-label="Back to menu"><ArrowLeft size={20} /></button>
              <h2 className="flow-title">{flow.title}</h2>
            </div>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>{flow.description}</p>
            
            <div className="scenario-grid">
              {flow.cases.map(sc => (
                <button 
                  key={sc.id} 
                  className={`scenario-card ${recScenario === sc.id ? 'recommended' : ''}`} 
                  onClick={() => startFlow('scenarios', 0, sc.id)}
                  aria-label={`Start Scenario: ${sc.question}`}
                  data-recommended={recScenario === sc.id ? t.ui.recommended : undefined}
                >
                  <div className="scenario-icon" aria-hidden="true">{getIcon(sc.icon, { size: 28 })}</div>
                  <h3 style={{ margin: 0, fontSize: '1.2rem', textAlign: 'left' }}>{sc.question}</h3>
                  <ChevronRight style={{ marginLeft: 'auto', color: 'var(--text-muted)' }} aria-hidden="true" />
                </button>
              ))}
            </div>
            
            {profile.exploredTopics.filter(topic => topic.startsWith('scenario_')).length >= 2 && (
              <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                 <button className="btn-nav action" style={{ margin: '0 auto' }} onClick={() => startQuiz('scenarios')}>
                   {t.ui.testScenarioKnowledge}
                 </button>
              </div>
            )}
          </motion.div>
        );
      }

      const scenario = flow.cases.find(c => c.id === activeScenarioId);
      const step = scenario.steps[currentStep];
      const totalSteps = scenario.steps.length;

      return (
        <motion.div key={`scenario-${activeScenarioId}-${currentStep}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flow-container" role="main">
          <div className="flow-header">
            <button className="back-btn" onClick={() => { setActiveScenarioId(null); setCurrentStep(0); setProfile(prev => ({...prev, lastPosition: { flowId: 'scenarios', step: 0, scenarioId: null }})); }} aria-label="Back to scenarios">
              <ArrowLeft size={20} />
            </button>
            <h2 className="flow-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {getIcon(scenario.icon, { size: 24, color: 'var(--secondary)' })} {scenario.question}
            </h2>
          </div>
          
          <div className="progress-container" role="progressbar" aria-valuenow={currentStep + 1} aria-valuemin="1" aria-valuemax={totalSteps}>
            <div className="progress-text">Step {currentStep + 1} {t.ui.outOf} {totalSteps}</div>
            <div className="progress-bar-bg">
              <div className="progress-bar-fill" style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}></div>
            </div>
          </div>

          <div className="flow-card">
            <div className="scenario-step">
              <div className="scenario-step-number" aria-hidden="true">{currentStep + 1}</div>
              <div>
                <h2 style={{ marginBottom: '1rem', color: 'var(--primary)', marginTop: '0.2rem' }}>{step.title}</h2>
                <div className="flow-content">{step.content}</div>
              </div>
            </div>
            
            <div className="flow-navigation">
              <button className="btn-nav" onClick={handlePrevStep} disabled={currentStep === 0}>
                <ChevronLeft size={20} /> {t.ui.previous}
              </button>
              <button 
                className={`btn-nav ${currentStep === totalSteps - 1 ? 'action' : ''}`} 
                onClick={handleNextStep}
              >
                {currentStep === totalSteps - 1 ? t.ui.finishScenario : t.ui.whatHappensNext} <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </motion.div>
      );
    }

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
        role="main"
      >
        <div className="flow-header">
          <button className="back-btn" onClick={goHome} aria-label="Back to menu">
            <ArrowLeft size={20} />
          </button>
          <h2 className="flow-title">{flow.title}</h2>
        </div>
        
        <div className="progress-container" role="progressbar" aria-valuenow={currentStep + 1} aria-valuemin="1" aria-valuemax={totalSteps}>
          <div className="progress-text">Step {currentStep + 1} {t.ui.outOf} {totalSteps}</div>
          <div className="progress-bar-bg">
            <div className="progress-bar-fill" style={{ width: `${progressPercentage}%` }}></div>
          </div>
        </div>

        <div className="flow-card">
          <h2>{step.title}</h2>
          
          {(step.simplified || step.expanded) && (
            <div className="depth-controls" role="group" aria-label="Adjust explanation complexity">
              {step.simplified && (
                <button 
                  className={`depth-btn ${explanationDepth === 'simplified' ? 'active' : ''}`}
                  onClick={() => updateProfileKnowledge('simplified')}
                  title="Make it simpler"
                  aria-pressed={explanationDepth === 'simplified'}
                >
                  <MinusCircle size={18} aria-hidden="true" /> {t.ui.simplify}
                </button>
              )}
              <button 
                className={`depth-btn ${explanationDepth === 'normal' ? 'active' : ''}`}
                onClick={() => updateProfileKnowledge('normal')}
                aria-pressed={explanationDepth === 'normal'}
              >
                <BookOpen size={18} aria-hidden="true" /> {t.ui.normal}
              </button>
              {step.expanded && (
                <button 
                  className={`depth-btn ${explanationDepth === 'expanded' ? 'active' : ''}`}
                  onClick={() => updateProfileKnowledge('expanded')}
                  title="Show more detail"
                  aria-pressed={explanationDepth === 'expanded'}
                >
                  <PlusCircle size={18} aria-hidden="true" /> {t.ui.tellMeMore}
                </button>
              )}
            </div>
          )}

          <div className="flow-content" aria-live="polite">
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
              <ChevronLeft size={20} /> {t.ui.previous}
            </button>
            <div style={{display: 'flex', gap: '1rem'}}>
               {currentStep === totalSteps - 1 && flow.suggestedNext && (
                 <button className="btn-nav" style={{backgroundColor: 'var(--surface)', border: '1px solid var(--secondary)', color: 'var(--secondary)'}} onClick={() => startFlow(flow.suggestedNext)}>
                    {t.ui.skipToNext}
                 </button>
               )}
               <button 
                 className={`btn-nav ${currentStep === totalSteps - 1 ? 'action' : ''}`} 
                 onClick={handleNextStep}
               >
                 {currentStep === totalSteps - 1 ? (flow.quizId ? t.ui.takeQuiz : t.ui.finish) : t.ui.nextStep} <ChevronRight size={20} />
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
      role="main"
    >
      <div className="flow-header">
        <button className="back-btn" onClick={goHome} aria-label="Back to menu">
          <ArrowLeft size={20} />
        </button>
        <h2 className="flow-title">CivicGuide AI</h2>
      </div>

      <div className="scroll-container" ref={scrollRef} aria-live="polite">
        <AnimatePresence>
          {chatHistory.map((msg, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`message ${msg.type}`}
            >
              <div className="avatar" aria-hidden="true">
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
            <div className="avatar" aria-hidden="true">CG</div>
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
          placeholder="..." 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          disabled={isTyping}
          aria-label="Chat input"
        />
        <button type="submit" disabled={!inputValue.trim() || isTyping} aria-label="Send message">
          <Send size={20} />
        </button>
      </form>
    </motion.div>
  );

  return (
    <>
      <nav className="navbar" role="navigation">
        <button className="logo" onClick={goHome} aria-label="Go to home">
          <BookOpen className="icon" size={24} aria-hidden="true" /> CivicGuide AI
        </button>
        <div className="nav-links">
          <button 
             className="nav-link" 
             onClick={toggleLanguage}
             aria-label="Toggle language"
             title="Switch Language"
          >
            <Globe size={18} /> {lang.toUpperCase()}
          </button>
          <button className={`nav-link ${activeTab === 'home' ? 'active' : ''}`} onClick={goHome}>
            <Home size={18} /> <span className="hide-mobile">{t.ui.home}</span>
          </button>
          <button className={`nav-link ${activeTab === 'chat' ? 'active' : ''}`} onClick={() => setActiveTab('chat')}>
            <MessageSquare size={18} /> <span className="hide-mobile">{t.ui.askAI}</span>
          </button>
        </div>
      </nav>

      <div className="app-container">
        {activeTab === 'home' && (
          <header className="header">
            <h1>{t.ui.welcomeTitle}</h1>
            <p>{t.ui.welcomeDesc}</p>
          </header>
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
