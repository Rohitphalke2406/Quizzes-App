import React, { useState, useEffect } from 'react';
import { data } from '../Assets/data';

const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

const Quiz = () => {
  const [questions, setQuestions] = useState(shuffleArray([...data]));
  const [index, setIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [wrongQuestions, setWrongQuestions] = useState([]);

  useEffect(() => {
    if (selectedOption !== null) {
      const timer = setTimeout(() => {
        if (index < questions.length - 1) {
          setIndex(index + 1);
        } else {
          alert('Quiz completed!');
        }
        setSelectedOption(null);
        setIsCorrect(null);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [selectedOption]);

  const checkAns = (e, ans) => {
    setSelectedOption(ans);
    if (questions[index].ans === ans) {
      setIsCorrect(true);
      setScore(score + 1);
    } else {
      setIsCorrect(false);
      setWrongQuestions([...wrongQuestions, questions[index]]);
    }
  };

  const resetQuiz = () => {
    setQuestions(shuffleArray([...data]));
    setIndex(0);
    setSelectedOption(null);
    setIsCorrect(null);
    setScore(0);
    setWrongQuestions([]);
  };

  const getOptionClass = (optionNumber) => {
    if (selectedOption === optionNumber) {
      return isCorrect ? 'bg-green-500 text-white' : 'bg-red-500 text-white';
    }
    return '';
  };

  return (
    <div className='w-2/4 m-auto bg-gray-100 text-gray-700 flex flex-col gap-3 rounded-xl px-6 py-6'>
      <h1 className='text-4xl font-semibold p-2 text-gray-800 text-center'>Quiz App</h1>
      <hr className='h-0.5 border-none bg-gray-800' />

      <h2 className='text-2xl'>Q{index + 1}: {questions[index].question}</h2>
      <ul>
        <li onClick={(e) => { checkAns(e, 1); }} className={`flex items-center h-12 pl-4 border border-gray-400 rounded-lg mb-5 text-lg cursor-pointer ${getOptionClass(1)}`}>{questions[index].option1}</li>
        <li onClick={(e) => { checkAns(e, 2); }} className={`flex items-center h-12 pl-4 border border-gray-400 rounded-lg mb-5 text-lg cursor-pointer ${getOptionClass(2)}`}>{questions[index].option2}</li>
        <li onClick={(e) => { checkAns(e, 3); }} className={`flex items-center h-12 pl-4 border border-gray-400 rounded-lg mb-5 text-lg cursor-pointer ${getOptionClass(3)}`}>{questions[index].option3}</li>
        <li onClick={(e) => { checkAns(e, 4); }} className={`flex items-center h-12 pl-4 border border-gray-400 rounded-lg mb-5 text-lg cursor-pointer ${getOptionClass(4)}`}>{questions[index].option4}</li>
      </ul>
      <button onClick={resetQuiz} className='m-auto cursor-pointer border-black border bg-blue-500 text-white font-semibold px-10 py-2 rounded-3xl my-3 transition-all hover:bg-blue-300'>Reset</button>
      <div className='text-lg m-auto'>Score: {score}</div>
      <div className='text-lg m-auto'>{index + 1} of {questions.length} Questions</div>
      {index === questions.length - 1 && (
        <div className='mt-6'>
          <h2 className='text-xl font-semibold'>Review Incorrect Answers:</h2>
          {wrongQuestions.length > 0 ? (
            <ul>
              {wrongQuestions.map((q, i) => (
                <li key={i} className='mt-2'>
                  <strong>Q: {q.question}</strong><br />
                  Correct Answer: {q[`option${q.ans}`]}
                </li>
              ))}
            </ul>
          ) : (
            <p>All answers were correct!</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Quiz;
