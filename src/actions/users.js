import { _getUsers } from "../utils/_DATA";

export const RECEIVE_USERS = 'RECEIVE_USERS';
export const ADD_ANSWER = 'ADD_ANSWER';
export const ADD_QUESTION_TO_USER = 'ADD_QUESTION_TO_USER';

function receiveUsers(users){
  return{
    type: RECEIVE_USERS,
    users
  }
}

export function handleReceiveUsers(){
  return (dispatch)=>{
    return _getUsers()
      .then((users)=>{
        dispatch(receiveUsers(users))
      })
  }
}

export function handleAddAnswer(userId, quiestionId, answer){
  return {
    type: ADD_ANSWER,
    userId,
    quiestionId,
    answer,
  }
}

export function handleAddQuestionToUser(userId, questionId) {
  return {
    type: ADD_QUESTION_TO_USER,
    userId,
    questionId,
  }
}

