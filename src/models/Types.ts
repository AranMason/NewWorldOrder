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

export interface SuperMarketStore {
  id: string;
  name: string;
  storeId: string;
  address: string;
  latitude: number;
  longitude: number;
  openingHours: string;
  url: string;
  regionName: string;
  regionCode: string;
  holidays: any[];
}

export interface TimeSlot {
  id: string;
  slot: string;
  available: number;
  price: number;
}

export interface SuperMarketOpenings {
  date: string;
  timeSlots: TimeSlot[];
}
