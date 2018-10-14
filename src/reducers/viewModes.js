import { SET_VIEWMODE } from './../actions/viewMode';

export default function viewMode(state=null, action){
  switch(action.type){
    case SET_VIEWMODE:
      return action.viewMode
    default:
      return state;
  }
};
