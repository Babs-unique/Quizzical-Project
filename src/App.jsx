import { useState, useEffect} from 'react'
import Quiz from './component/quiz'
import Form from './component/form'
import './App.css'
/* import questions from '../index' */

function App() {
  const[form , setForm] = useState({
    category : "",
    difficulty : "",
    questionType : ""
  })
  const [question , setQuestion] = useState([])
  const [filter, setFilter] = useState([])
  const [isAnswer , setIsAnswer] = useState([])
  const[started , setStarted] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [score,setScore] = useState(0)
/*  const [api,setApi] = useState()
  console.log(api) 
  console.log(question)*/
  


/* useEffect(()=>{
  fetch('https://opentdb.com/api.php?amount=10')
  .then(response => {
    if (!response.ok) {
      throw new Error("Unable to fetch data:404");
    }
    return response.json()
  })
  .then(data => setApi(data))
  .catch(error=>{
    console.error('Error fetching data:',error)
  })
},[form]) */
  useEffect(()=>{
      const filtered = question.filter(quest =>{
      const matchCategory = form.category === "Any category" || quest.category === form.category;
      const matchDifficulty = form.difficulty === 'Any difficulty' || quest.difficulty === form.difficulty;
      const matchType = form.questionType === 'Any type' || quest.type === form.questionType;
      return matchCategory && matchDifficulty && matchType;
})
    let shuffled = filtered.sort(()=>Math.random() - 0.5)
    let sliced = shuffled.slice(0,5)
    setFilter(sliced)
  }, [form,question])
/*  console.log(question)
  console.log(form) 
  console.log(filter)
  console.log(started)
console.log(isAnswer) 
  console.log(score)
 */
  function checkAnswer(){
    const answerCompare = filter.map((fill,index)=>{
          const correct = fill.correctAnswer === isAnswer[index];
          return correct
    })
    setShowResult(true)
  let count = 0
    filter.map((quest,index)=>{
    if(quest.correctAnswer === isAnswer[index]){
      count++
      return setScore(count);
    }
  })
  console.log(`You got ${score} out of ${filter.length}`)
  console.log(answerCompare)
}
/* function scoreBoard(){
  let count = 0
    filter.map((quest,index)=>{
    if(quest.correctAnswer === isAnswer[index]){
      count++
      return setScore(count);
    }
  })
  console.log(`You got ${score} out of ${filter.length}`)
} */

function startQuiz(){
  setStarted(prevStart => !prevStart)
  const {category,difficulty,questionType} = form;
  let url =` https://opentdb.com/api.php?amount=10`
  if(category && category !== "Any category"){
    url += `&category=${category}`;
  }
  if(difficulty && difficulty !== "Any difficulty"){
    url += `&difficulty=${difficulty}`;
  }
  if(questionType && questionType !== "Any type"){
    url += `&type=${questionType}`;
  }
  fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error("Unable to fetch data:404");
    }
    return response.json()
  })
  .then(data => {
    setFilter(data)
    /* let answers = [...data.incorrect_answers,data.correct_answers]
        setQuestion(data.results, answers) */
    let formattedQuestions = data.results.map((q,index)=>{
      let answers = [...q.incorrect_answers,q.correct_answer];
      answers = answers.sort(()=> Math.random()-0.5);
      return{
        key:index,
        ...q,
        correctAnswer:q.correct_answer,
        answers:answers,
      }
    })
    setQuestion(formattedQuestions)
  })
  .catch(error=>{
    console.error('Error fetching data:',error)
  })
}

const handleAnswer = (questionIndex , answer) =>{
  setIsAnswer(prev =>{
    const update = [...prev]
    update[questionIndex] = answer;
    return update;
  })
}

  const handleClick = (formData) =>{
    const category = formData.get('category')
    const difficulty = formData.get("difficulty")
    const questionType  = formData.get("question type")
    setForm({category,difficulty,questionType})
    /* console.log([category,difficulty,questionType]) */
  }
 /*  console.log(form) */
  return (
    <main>
        {!started && <Form
        handleClick={handleClick}
        startQuiz ={startQuiz}
        />} 
      {started && (<Quiz
      isAnswer={isAnswer}
      filter={filter}
      handleAnswer={handleAnswer}
      checkAnswer={checkAnswer}
      showResult ={showResult}
      score ={score}
     /*  scoreBoard = {scoreBoard} */
      />)}
    </main>
  
  )
}
export default App;
