import { RECEIVE_QUESTIONS, SET_ANSWER, ADD_QUESTION } from './../actions/questions'

export default function questions(state = {}, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...action.questions
      }
    case SET_ANSWER:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          [action.option]: {
            ...state[action.id][action.option],
            votes: state[action.id][action.option].votes.concat([action.authedUser])
          }
        }
      }
    case ADD_QUESTION:
      return {
        ...state,
        [action.question.id]: action.question,
      }
    default:
      return state
  }
}