
# tset.ai - Personalized Test & Feedback Platform

Welcome to KnowledgeHub, a customizable online platform where users can test their knowledge on any subject they choose. Users can easily create a personalized quiz, select topics, set the number of questions, define difficulty levels, and choose the type of test they wish to take, such as MCQs or fill-in-the-blank questions. Upon completing the test, they will receive detailed feedback to help them identify areas for improvement and guide their learning journey.

## Features

- **User Authentication**: Secure login and registration system to track users' progress.
- **Customizable Quizzes**: Users can select their quiz parameters:
  - Topic of their choice
  - Number of questions
  - Difficulty levels: Easy, Medium, Hard
  - Question types: MCQs, Fill in the Blanks, True/False
  - Time limits for the quiz
- **Real-Time Assessments**: Immediate scoring based on users' test results.
- **Personalized Feedback**: Tailored feedback is provided, helping users improve in specific areas.
- **Progress Tracking**: Users can track their performance over time.

## Tech Stack

- **Framework**: Next.js
- **Backend API**: Gemini API
- **Styling**: Tailwind CSS for a sleek and responsive UI
- **Database**: MongoDB for user data and quiz records
- **State Management**: Redux/Context API for state handling

## Getting Started

### Prerequisites

To run this project locally, ensure you have the following:

- Node.js v16 or higher
- npm or yarn package manager
- MongoDB instance (local or cloud)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/knowledgehub.git
   cd knowledgehub
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Set up your environment variables. Create a `.env.local` file in the root directory and configure the following:
   ```env
   NEXT_PUBLIC_API_KEY=your-gemini-api-key
   MONGODB_URI=your-mongodb-uri
   NEXTAUTH_SECRET=your-secret-key
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

## API Documentation

This application integrates the Gemini API to fetch quiz data based on the user's chosen topic. For detailed API usage, refer to the official [Gemini API Documentation](https://gemini-api-docs.example.com).

## Running Tests

We are using Jest and Cypress for unit and end-to-end tests. You can run the tests with:

```bash
npm run test
```

## Deployment

To deploy this project on platforms like Vercel, follow these steps:

1. Push your repository to GitHub.
2. Create a Vercel account and connect it to your GitHub repository.
3. Configure the environment variables in the Vercel dashboard.
4. Click deploy!

## Feedback & Contribution

We are constantly working to improve KnowledgeHub. Feel free to open an issue or submit a pull request if you'd like to contribute or report bugs.

Steps to Contribute:

1. Fork this repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Make your changes and commit (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.
