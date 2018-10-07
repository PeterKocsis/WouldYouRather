import {RECEIVE_QUESTIONS, SET_ANSWER} from './../actions/questions'

export default function questions(state={}, action){
  switch(action.type){
    case RECEIVE_QUESTIONS:
      return {
        ...action.questions
      }
    case SET_ANSWER:
      return {
        ...state,
        [action.id] : {
          ...state[action.id],
          [action.option]:{
            text : state[action.id][action.option].text,
            vote : state[action.id][action.option].vote.push(action.authedUser)
          }
        }
      }
    default:
      return state
  }
}