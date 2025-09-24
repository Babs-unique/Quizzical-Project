function Form(props){
    return(
        <>
            <section className='quiz-type'>
            <div>
            <h1>Quizzical</h1>
            <p>Answer the question and test your knowledge</p>
            </div>
            <form  onSubmit={(e) => {
            e.preventDefault();
            props.handleClick(new FormData(e.target));
            props.startQuiz()
        }}>
            <div>
            <label htmlFor="category">Category:</label>
            <select name="category" id="category">
                <option value="Any category">Any Category</option>
                <option value="General Knowledge">General Knowledge</option>
                <option value="Science and Nature">Science and Nature</option>
                <option value="Entertainment: Film">Entertainment</option>
                <option value="Geography">Geography</option>
            </select>
            </div>
            <div>
            <label htmlFor="difficulty">Difficulty:</label>
            <select name="difficulty" id="difficulty">
                <option value="Any difficulty">Any difficulty</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
            </select>
            </div>
            <div>
            <label htmlFor="type">Type of questions:</label>
            <select name="question type" id="type">
                <option value="Any type">Any type</option>
                <option value="boolean">True/False</option>
                <option value="multiple">Multiple Choice</option>
            </select>
            </div>
            <button>Start Quiz</button>
            </form>
    </section>
        </>

    )
}
export default Form;