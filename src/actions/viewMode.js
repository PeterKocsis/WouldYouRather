export const SET_VIEWMODE='SET_VIEWMODE';

export function setViewMode(viewMode){
  return{
    type: SET_VIEWMODE,
    viewMode
  }
}
