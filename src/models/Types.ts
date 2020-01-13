export interface ReduxAction<t> {
  type: string;
  payload: t;
}

/**
 * Redux
 */

/**
 * Todo State
 */
export interface TodoState {
  todo: string[];
}

export interface AddTodo {
  title: string;
}

export type ActionAddTodo = ReduxAction<AddTodo>;

export interface DeleteTodo {
  title: string;
}

export type ActionDeleteTodo = ReduxAction<DeleteTodo>;
export type TodoTypes = ActionAddTodo | ActionDeleteTodo;
