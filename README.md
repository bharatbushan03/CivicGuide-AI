# CivicGuide AI 🏛️

**CivicGuide AI** is an interactive, intelligent platform that simplifies the election process through guided learning, visual timelines, and personalized experiences. It bridges the gap between complex democratic processes and everyday citizens, ensuring that learning about elections is accessible, engaging, and rewarding.

---

## 🌟 Key Features

* **Interactive Learning Flows**: Break down complex civic topics (like the Voting Process) into easy-to-digest, step-by-step guides.
* **Timeline Visualization**: Explore the election cycle from announcement to declaration using an interactive, horizontal timeline.
* **Scenario Simulation**: "What if I don't vote?" "What happens in a tie?" Safely explore real-world electoral outcomes through guided scenarios.
* **Smart Personalization Engine**: The app remembers where you left off, suggests the best next topic, and adapts explanation depth (Simplified vs. Expanded) based on your interactions.
* **Gamification & Quizzes**: Test your knowledge after every module. Earn achievements and badges like *Civic Scholar* and *Voting Expert* for perfect accuracy.
* **Localization & Accessibility**: Fully supports multiple languages (English & Hindi) with screen-reader friendly semantic HTML, ARIA labels, and high-contrast focus rings.
* **Real-Time Data Simulation**: A dynamic widget that pulls "Upcoming Elections" to keep the user informed about relevant, real-world events.

---

## 🏗️ Architecture Overview

CivicGuide AI is a modern React application optimized for performance and scalability.

* **Data-Driven UI**: All learning content, quizzes, and scenarios are decoupled from the UI components and housed in a centralized `content.js` file, making it incredibly easy to update or add new languages.
* **State Management**: Built heavily around custom hooks (`useProfile`) that leverage `localStorage` to create a lightweight, session-based personalized experience without requiring a backend database.
* **Component Structure**: Highly modular structure with lazy-loaded components (`React.lazy` and `Suspense`) to ensure near-instant initial load times.
* **Animations**: Utilizes `framer-motion` for buttery-smooth page transitions and micro-interactions, providing a premium feel.

---

## 🖥️ Screens & UI Experience

1. **Landing Page**: A clean, animated intro screen with a clear Call-To-Action ("Start Learning") that introduces the user to the app's purpose.
2. **Personalized Dashboard**: The home screen dynamically adapts. It shows your earned badges, highlights "Recommended" topics, and displays a "Resume" banner if you left a module midway.
3. **Flow / Timeline / Scenario Viewer**: An immersive reading experience. Includes a progress bar, dynamic icons, and "Depth Controls" (Simplify / Normal / Tell Me More) so users control how they learn.
4. **Quiz & Assessment View**: Immediate visual feedback on answers, ending with an animated score circle and personalized encouragement based on performance.
5. **CivicGuide AI Chat**: An embedded chat interface for asking specific, neutral questions about the electoral process.

---

## 🚀 How to Run Locally

This project is built using Vite and React.

```bash
# 1. Clone the repository
git clone https://github.com/bharatbushan03/VoteWise-Assistant.git
cd VoteWise-Assistant

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Visit `http://localhost:5173` to experience CivicGuide AI.

---

## 🔮 Future Improvements

While CivicGuide AI is a polished, production-ready product, future roadmap items include:
* **Cloud Syncing**: Optional user authentication to sync progress and badges across multiple devices.
* **Live API Integration**: Replacing the simulated "Upcoming Elections" widget with a live API (e.g., Google Civic Information API).
* **Text-to-Speech**: Integrating native browser speech synthesis to read explanations aloud for visually impaired users.
* **Expanded Scenarios**: Adding more complex, local-level scenarios based on user region.
