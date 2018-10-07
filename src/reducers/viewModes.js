import { SET_VIEWMODE } from './../actions/viewMode';

export default function viewMode(state={}, action){
  switch(action.type){
    case SET_VIEWMODE:
      return{
        viewMode : action.viewMode
      }
    default:
      return state;
  }
};
