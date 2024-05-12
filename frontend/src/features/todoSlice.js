import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createTodo,
  fetchTodoById,
  updateTodo,
  fetchAllTodo,
  deleteTodo,
} from "./todoAPI";

const initialState = {
  todos: [],
  status: "",
  selectedTodo: null,
  // {
  //   title: "",
  //   description: "",
  //   priority: "medium",
  //   category: "",
  //   completed: false,
  //   createdAt:"",
  // } ?? null,
};

export const fetchAllTodosAsync = createAsyncThunk(
  "todo/fetchAllTodos",
  async () => {
    // console.log("callin");
    const response = await fetchAllTodo();
    // console.log("response", response);
    return response;
  }
);

export const fetchTodosByIdAsync = createAsyncThunk(
  "todo/fetchTodoById",
  async (id) => {
    const response = await fetchTodoById(id);
    return response;
  }
);

export const createTodoAsync = createAsyncThunk(
  "todo/createTodo",
  async (todo) => {
    const response = await createTodo(todo);
    console.log(response);

    return response;
  }
);

export const updateTodoAsync = createAsyncThunk(
  "todo/updateTodo",
  async ({ todo, id }) => {
    const response = await updateTodo(todo, id);
    console.log(response);
    return response;
  }
);

export const deleteTodoAsync = createAsyncThunk(
  "todo/deleteTodo",
  async (id) => {
    const response = await deleteTodo(id);
    return response;
  }
);

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    // UpdateTodo: (state, action) => {
    //   const index = state.todos.findIndex(
    //     (todo) => todo?._id === action.payload._id);
    //       state.todos[index] = action.payload
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTodosAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllTodosAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.todos = action.payload;
        // console.log(state.todos);
      })
      .addCase(fetchAllTodosAsync.rejected, (state) => {
        state.status = "rejected";
      })
      .addCase(fetchTodosByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTodosByIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.selectedTodo = action?.payload;
      })
      .addCase(fetchTodosByIdAsync.rejected, (state) => {
        state.status = "rejected";
      })
      .addCase(createTodoAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createTodoAsync.fulfilled, (state, action) => {
        console.log(action);
        state.status = "idle";
        state.todos = action.payload;
      })
      .addCase(createTodoAsync.rejected, (state) => {
        state.status = "rejected";
      })
      .addCase(updateTodoAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateTodoAsync.fulfilled, (state, action) => {
        // state.status = "updated";

        // console.log(action);
        // console.log(state.todos); // Correctly accessing the todos array
        // const updatedTodoId = action?.payload?._id;

        // console.log(updatedTodoId);
        // // Access the todo object from the payload
        // const index = state.todos.findIndex(
        //   (todo) => todo?._id === action?.payload?._id
        // );
        // console.log(state?.todos[index]);
        // state.todos[index] = action.payload;
        // state.selectedTodo = action.payload;
        state.status = "idle";
        const updatedTodoId = action?.payload?._id;
        console.log(action?.payload)
        // Find index of the todo to be updated
        const index = state.todos.findIndex(
          (todo) => todo?._id === updatedTodoId
        );

        if (index !== -1) {
          // Create a new array with the updated todo
          state.todos = [
            ...state.todos.slice(0, index),
            action.payload, // updated todo
            ...state.todos.slice(index + 1),
          ];

          state.selectedTodo = action.payload;
        }
      })
      .addCase(updateTodoAsync.rejected, (state) => {
        state.status = "rejected";
      })
      .addCase(deleteTodoAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteTodoAsync.fulfilled, (state, action) => {
        state.status = "idle";
        // Remove the deleted todo from the todos array
        state.todos = state.todos.filter(
          (todo) => todo.id !== action.payload.id
        );
      })
      .addCase(deleteTodoAsync.rejected, (state) => {
        state.status = "rejected";
      });
  },
});

// export const { SelectedTodo, getAllTodoData } = todoSlice.actions;

export const selecAllTodo = (state) => state?.todos;

export const selectTodoById = (state) => state?.selectedTodo;

export const selectedTodoListState = (state) => state?.status;

export default todoSlice.reducer;
