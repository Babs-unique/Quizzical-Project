import clsx from "clsx";
function Quiz (props){
    return(
        <>
        <section className='quiz-questions'>
                {props.filter.length > 0 && (
                    props.filter.map((q,questionIndex)=>{
                    return(
                    <div
                        key={questionIndex}
                    >
                        <p
                        >{q.question}</p>
                        {q.answers.map((ans , index)=>{
                        const isSelected = props.isAnswer[questionIndex] === ans;
                        const isCorrect = ans === q.correctAnswer
                        const isWrong = isSelected && ans !== q.correctAnswer
                        const optionColor = clsx(
                            "option",
                            isSelected && !props.showResult && 'selected',
                            isCorrect && props.showResult && 'correct',
                            isWrong && props.showResult && 'wrong'
                        )
                       /*  console.log(optionColor) */
                        return(
                            <>
                        <button 
                        key={index}
                        className={optionColor}
                        onClick={()=>props.handleAnswer(questionIndex,ans)}
                        >{ans}</button>
                    {props.isAnswer[questionIndex] === q.correctAnswer ?  props.showResult && isCorrect && <span>✔</span> : props.showResult && isWrong && <span>❌</span>} {/* {props.showResult  ? props.showResult && isWrong && <span>❌</span>:
                        props.showResult && isCorrect && <span>✔</span>} */}
                        </>
                    )})}
                    </div>
                    )})
                    
                )}
                <div className="checking">
                <button onClick={props.checkAnswer}>Check Answers </button>
                <p>YOU GOT {props.score} OUT OF {props.filter.length}</p>
                </div>
                </section>
        </>
    )
}
export default Quiz;