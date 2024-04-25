export interface IInitialState {
  selectedShape: string | null;
  isFillColor: boolean;
  color: string | null;
  shapeList: String[];
  canvas: CanvasRenderingContext2D | null;
  restoreArray: ImageData[];
}

export const initialState: IInitialState = {
  selectedShape: null,
  isFillColor: false,
  color: null,
  shapeList: [],
  canvas: null,
  restoreArray: [],
};
