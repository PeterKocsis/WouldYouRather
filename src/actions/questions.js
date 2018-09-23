import { _getQuestions, _saveQuestion, _saveQuestionAnswer } from "../utils/_DATA";

export const ADD_QUESTION='ADD_QUESTION';
export const RECEIVE_QUESTIONS='RECEIVE_QUESTIONS';
export const SET_ANSWER='SET_ANSWER';

function addQuestion(question){
  return{
    type: ADD_QUESTION,
    question
  }
}

export function handleSaveQuestion(question){
  return(dispatch)=>{
    return _saveQuestion(question)
      .then((formattedQuestion)=>{
        dispatch(addQuestion(formattedQuestion))
      })
  }
}



function receiveQuestions(questions){
  return{
    type:RECEIVE_QUESTIONS,
    questions
  }
}

export function handleReceiveQuestions(){
  return(dispatch)=>{
    return _getQuestions()
      .then((questions)=>{
        dispatch(receiveQuestions(questions))
      });
  }
}

function setAnswer(id, authedUser, option){
  return{
    type: SET_ANSWER,
    id,
    authedUser,
    option
  }
}

export function handleSetAnswer(id, authedUser, option){
  return (dispatch)=>{
    return _saveQuestionAnswer(authedUser, id, option)
      .then(()=>{
        dispatch(setAnswer(id, authedUser, option));
      })
  }
}
