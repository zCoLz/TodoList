import { createSlice } from "@reduxjs/toolkit";

export interface TodoApp {
    id: number;
    name: string;
}
interface TodoAppState{
    todos: TodoApp[];
}
const initialState: TodoAppState = {
    todos: [],
  };
export const TodoAppSlice = createSlice({
    name: "Todo",
    initialState,
    reducers:{ 
        addTodo: (state,action) =>{
            state.todos = action.payload
        }
    }
})
export const {addTodo} = TodoAppSlice.actions
export default TodoAppSlice.actions