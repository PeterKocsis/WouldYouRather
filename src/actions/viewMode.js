export const SET_VIEWMODE='SET_VIEWMODE';

function setViewMode(viewMode){
  return{
    type: SET_VIEWMODE,
    viewMode
  }
}

export function handleSetViewMode(viewMode){
  return (dispatch)=>dispatch(setViewMode(viewMode));
}