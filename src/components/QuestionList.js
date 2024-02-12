import React, {useEffect}from "react";

function QuestionList({questions,setQuestions}) {
  //fetiching data from the server
  useEffect(()=>{
    fetch(" http://localhost:4000/questions")
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data);
      setQuestions(data);
    });
  },[])
  const deleteQuestion = async (id) => {
    try {
      await fetch(` http://localhost:4000/questions/${id}`, {
        method: "DELETE",
      });
      // Optionally, you can update the state to remove the deleted question
      //setQuestions(updatedQuestions);
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{/* display QuestionItem components here after fetching */}
      {questions.map((question) => (
          <li key={question.id}>
            <p>{question.prompt}</p>
            <ul>
              {question.answers.map((answer,index)=>(
                <li key={index}>
                  <p style={index === question.correctIndex ? {color: "green"} : {color: "red"}}>{answer}</p>
                </li>
              ))}
            </ul>
            
            <button onClick={() => deleteQuestion(question.id)}>Delete Question</button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
