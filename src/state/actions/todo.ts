import * as Types from '../../models/Types';

export const ADD = 'ADD_TODO';
export function AddTodo(data: Types.AddTodo): Types.ActionAddTodo {
  return {
    type: ADD,
    payload: data,
  };
}

export const DELETE = 'DELETE_TODO';
export function DeleteTodo(data: Types.DeleteTodo): Types.ActionDeleteTodo {
  return {
    type: DELETE,
    payload: data,
  };
}

export type TodoTypes = Types.ActionAddTodo | Types.ActionDeleteTodo;
