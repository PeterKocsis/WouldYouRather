import { RECEIVE_USERS, ADD_ANSWER, ADD_QUESTION_TO_USER } from './../actions/users';

export default function users(state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...action.users
      }
    case ADD_ANSWER:
      return {
        ...state,
        [action.userId]: {
          ...state[action.userId],
          answers: {
            ...state[action.userId].answers,
            [action.quiestionId]: action.answer
          }
        }
      }
    case ADD_QUESTION_TO_USER:
      return {
        ...state,
        [action.userId]: {
          ...state[action.userId],
          questions: state[action.userId].questions.concat([action.quiestionId]),
        }
      }
    default:
      return state;
  }
}
