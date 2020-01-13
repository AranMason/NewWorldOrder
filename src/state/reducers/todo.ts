import ACTION from '../actions';
import { TodoState, TodoTypes } from '../../models/Types';

const initialState: TodoState = {
  todo: [] as string[],
};

export default function todoReducer(state: TodoState = initialState, action: TodoTypes): TodoState {
  switch (action.type) {
    case ACTION.TODO.ADD:
      return {
        ...state,
      };
    default:
      return state;
  }
}
