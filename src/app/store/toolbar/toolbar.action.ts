import { createAction, props } from "@ngrx/store";

export const setSelectedShape = createAction(
  "setSelectedShape",
  props<{ value: string }>()
);
export const setIsFillColor = createAction("setIsFillColor");
