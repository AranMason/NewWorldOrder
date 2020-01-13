import ACTION from '../actions';
import { TodoTypes } from '../actions/todo';

interface State {
  todo: string[];
}

const initialState: State = {
  todo: ['hi'] as string[],
};

export default function todoReducer(state: State = initialState, action: TodoTypes): State {
  switch (action.type) {
    case ACTION.TODO.ADD:
      return {
        ...state,
      };
    default:
      return state;
  }
}
