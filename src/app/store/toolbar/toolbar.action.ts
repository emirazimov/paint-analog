import { createAction, props } from "@ngrx/store";

export const setSelectedShape = createAction(
  "setSelectedShape",
  props<{ value: string }>()
);
export const setIsFillColor = createAction(
  "setIsFillColor",
  props<{ value: boolean }>()
);
export const setColor = createAction("setColor", props<{ value: string }>());

export const setShapeList = createAction(
  "setShapeList",
  props<{ value: string }>()
);

export const setCanvas = createAction(
  "setCanvas",
  props<{ value: CanvasRenderingContext2D }>()
);
export const setRestoreArray = createAction(
  "setRestoreArray",
  props<{ value: any }>()
);
