import { createReducer, on } from "@ngrx/store";
import {
  setCanvas,
  setColor,
  setIsFillColor,
  setRemoveItemFromShapeList,
  setRestoreArray,
  setSelectedShape,
  setShapeList,
} from "./toolbar.action";
import { initialState } from "./toolbar.state";

const _toolbarReducer = createReducer(
  initialState,
  on(setSelectedShape, (state, action) => {
    return {
      ...state,
      selectedShape: action.value,
    };
  }),
  on(setIsFillColor, (state, action) => {
    return {
      ...state,
      isFillColor: action.value,
    };
  }),
  on(setColor, (state, action) => {
    return {
      ...state,
      color: action.value,
    };
  }),
  on(setShapeList, (state, action) => {
    return {
      ...state,
      shapeList: [...state.shapeList, action.value],
    };
  }),
  on(setRemoveItemFromShapeList, (state, action) => {
    return {
      ...state,
      shapeList: [...state.shapeList.filter((item, i) => i !== action.value)],
    };
  }),
  on(setCanvas, (state, action) => {
    return {
      ...state,
      canvas: action.value,
    };
  }),
  on(setRestoreArray, (state, action) => {
    return {
      ...state,
      restoreArray: [...state.restoreArray, action.value],
    };
  })
);

export function toolbarReducer(state: any, action: any) {
  return _toolbarReducer(state, action);
}
