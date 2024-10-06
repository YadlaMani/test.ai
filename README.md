# test.ai - Personalized Test & Feedback Platform

Welcome to **test.ai**, your go-to platform for personalized knowledge testing, gamified learning, and real-time performance insights. With **test.ai**, you're not just taking a test—you’re embarking on a dynamic learning journey that grows with you. Whether you’re brushing up on topics for school, prepping for a certification, or just curious to challenge your knowledge, **test.ai** has it all!

## 🚀 Key Features

### 1. **User Authentication**
- Simple and secure login/registration to track individual progress. Access your test history, save preferences, and resume anytime!

### 2. **Customizable Quizzes** 🛠️
- **Choose your topic**: From programming to history, customize your quiz content.
- **Number of questions**: Want a quick test? Set 5 questions. Want a challenge? Go for 50!
- **Difficulty levels**: Test yourself on Easy, Medium, or Hard questions.
- **Question types**: Select from MCQs, Fill-in-the-Blanks, True/False, and more.
- **Time limits**: Set time constraints or go at your own pace.
- **New**: Now supports **Image-based Questions** and **Drag-and-Drop** answers for interactive learning!

### 3. **Real-Time Assessments**
- Immediate scoring after quiz completion, with detailed breakdowns by topic and difficulty.

### 4. **Collaborative Test-Taking** 🤝 (New!)
- Study in groups! Host or join a collaborative quiz with friends or classmates and challenge each other to level up together.

### 5. **Personalized Feedback & Recommendations**
- Beyond the score: After each test, get personalized feedback with actionable insights on how to improve. Our smart recommendation engine will guide you toward relevant resources, quizzes, and study materials.

### 6. **Progress Tracking** 📈
- Track your performance over time! Get detailed analytics to visualize your growth and set milestones. Whether you're studying for an exam or improving specific skills, see how far you’ve come.

### 7. **Gamification & Badges** 🏆 (New!)
- **Earn Badges**: Complete quizzes, reach milestones, or get top scores to unlock badges!
- **Activity Monitoring**: Monitor your activity and unlock achievements based on your consistency, speed, and performance.
- **Leaderboard**: Compete with other learners globally and see how you rank across different subjects!

### 8. **Diverse Test Formats** 📝 (New!)
- In addition to traditional quizzes, try **Timed Challenges**, **Scenario-Based Quizzes**, and **Simulation Tests** for more in-depth assessments.
  
### 9. **Custom Learning Paths** (New!)
- We know every learner is unique! Create your custom learning path and tailor quizzes to meet your goals. Our AI-powered platform adapts to your needs and suggests personalized study plans.

---

## 🛠️ Tech Stack

- **Framework**: Next.js for seamless SSR and client-side transitions.
- **Backend API**: Gemini API for quiz data and real-time results.
- **Database**: MongoDB for robust, scalable data management.
- **Styling**: Tailwind CSS for a modern, responsive, and clean UI.
- **State Management**: Redux/Context API for smooth handling of global state.

---

## 🚀 Getting Started

### Prerequisites
Ensure you have the following to run **test.ai** locally:
- **Node.js v16 or higher**
- **npm** or **yarn** package manager
- **MongoDB** instance (local or cloud-based)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/YadlaMani/test.ai
   cd test.ai
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables by creating a `.env.local` file and adding:

   ```env
   GEMINI_API_KEY=your-gemini-api-key
   MONGODB_URI=your-mongodb-uri
   JWT_SECRET=your-secret-key
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the app in action!

---

## 🧪 Testing

We take testing seriously! Our platform is equipped with unit tests and end-to-end tests using **Jest** and **Cypress** to ensure a bug-free experience.

To run the tests, simply execute:

```bash
npm run test
```

---

## 📦 Deployment

Deploy **test.ai** effortlessly on platforms like Vercel by following these steps:

1. Push your repository to GitHub.
2. Sign up or log in to **Vercel**, and connect your repository.
3. Configure your environment variables directly within Vercel’s dashboard.
4. Deploy with just one click!

---

## 🎮 Gamified Learning

### How to Level Up 🚀
With the new gamification features, you can turn studying into a fun competition! Here's how to make the most of it:
- **Earn Points** for every quiz you take, based on accuracy, speed, and consistency.
- **Climb the Leaderboard** by challenging your friends or fellow students in collaborative quizzes.
- **Unlock Badges** for hitting study streaks, perfect scores, and more!

Stay motivated by visualizing your progress and competing against others in the **global leaderboard**!

---

## 💡 Feedback & Contributions

At **test.ai**, we are always innovating. Found a bug? Got a cool idea for a new feature? Want to contribute to the platform’s growth? Here's how you can help:

1. **Fork** the repository.
2. **Create a branch** for your feature or fix: `git checkout -b feature/YourFeature`.
3. Make your changes and commit: `git commit -m 'Add new feature'`.
4. **Push** to your branch: `git push origin feature/YourFeature`.
5. Open a **pull request**, and let’s make **test.ai** even better together!

---

Thank you for being a part of **test.ai**—where learning meets fun, progress is tracked, and growth never stops. Let's level up your knowledge today! 🌟
