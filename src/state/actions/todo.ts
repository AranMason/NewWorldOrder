import { ReduxActionType } from '../../models/redux';

export const ADD = 'ADD_TODO';
export interface AddTodoType {
  title: string;
}
export function AddTodo(data: AddTodoType): ReduxActionType<AddTodoType> {
  return {
    type: ADD,
    payload: data,
  };
}

export const DELETE = 'DELETE_TODO';
export interface DeleteTodoType {
  title: string;
}
export function DeleteTodo(data: DeleteTodoType): ReduxActionType<DeleteTodoType> {
  return {
    type: DELETE,
    payload: data,
  };
}

export type TodoTypes = ReduxActionType<AddTodoType | DeleteTodoType>;
