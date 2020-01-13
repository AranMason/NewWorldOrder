export interface ReduxActionType<t> {
  type: string;
  payload: t;
}
