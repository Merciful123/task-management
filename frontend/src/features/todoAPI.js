// import axios from "axios";

// export const fetchTodoById = async (id) => {
//     console.log(id)
//     try {
//       const response = await axios.get(
//         `https://new-todo-0gxb.onrender.com/api/get-todo/${id}`
//       );
//       return response?.data;
//     } catch (error) {
//         console.log(error)
//     }
  
// }


// export const createTodo = async (todo) => {
//     try {
//      const response = await axios.post(
//        "https://new-todo-0gxb.onrender.com/api/create-todo",
//         todo
//         );
//     console.log(response);
        
//      return response?.data;
//     } catch (error) {
//         console.log(error)
//     }
   
// }

// export const updateTodo = async (todo) => {
//     try {
//      const response = axios.put(
//        "https://new-todo-0gxb.onrender.com/api/update-todo",
//        { todo }
//      );
//      return response;
//     } catch (error) {
//         console.log(error)
//     }
   
// }




export const fetchAllTodo = async () => {
  try {
    const response = await fetch(
      `https://new-todo-0gxb.onrender.com/api/getall-todo`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchTodoById = async (id) => {
  try {
    const response = await fetch(
      `https://new-todo-0gxb.onrender.com/api/get-todo/${id}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const createTodo = async (todo) => {
    console.log(todo)
  try {
    const response = await fetch(
      "https://new-todo-0gxb.onrender.com/api/create-todo",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
      }
    );
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateTodo = async (todo, id) => {
    try {
    const response = await fetch(
      `https://new-todo-0gxb.onrender.com/api/update-todo/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
          body: JSON.stringify(todo)
      }
        );
        const data = await response.json();
        console.log(data)
    return data;
  } catch (error) {
    console.log(error);
  }
};



export const deleteTodo = async (id) => {
  try {
    const response = await fetch(
      `https://new-todo-0gxb.onrender.com/api/delete-todo/${id}`,
      {
        method: "DELETE",
      }
    );
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

