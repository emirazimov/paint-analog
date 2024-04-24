import { createReducer, on } from "@ngrx/store";
import { setIsFillColor, setSelectedShape } from "./toolbar.action";
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
      isFillColor: !state.isFillColor,
    };
  })
);

export function toolbarReducer(state: any, action: any) {
  return _toolbarReducer(state, action);
}
