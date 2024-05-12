### Todo List Application(Full Stack App using MERN Stack)

The Task Management Application is a simple web application built using React.js(Vite) and redux-toolkit(using createAsyncThunk) for managing states. It allows users to create, read, update, and delete task items, as well as filter and sort them based on different criteria like priority, category, creation date etc.

### Features

1. View Tasks List
Display a list of taks fetched from an API.
Each task item includes information such as title, description, priority, category, creation date, and completion status.

2. Add Tasks Item
Users can add new task items by providing a title, description, priority level, and category.
Upon submission, the new todo item is added to the list and persisted in frontend and backend server both.

3. Edit Tasks Item
Users can edit existing task item by clicking on the edit icon next to each item.
They are redirected to a separate url where they can modify the title, description, priority, and category of the task item.
Upon submission, the changes are saved and reflected in the task list.

4. Delete Task Item
Users can delete task item by clicking on the delete icon next to each item.
A confirmation modal is displayed to ensure the user wants to proceed with the deletion.
Upon confirmation, the todo task is removed from the list and deleted from the backend server as well.

5. Sort Task List
Users can sort the tasks list based on priority or creation date.
Clicking on the "Sort by Priority" or "Sort by Creation Date" buttons reorders the task items accordingly.

6. Filter Task Lists
Users can filter the task list based on priority levels.
They can select a priority level from a dropdown menu to view only task items with that priority.

Usage
Clone the repository to your local machine.
Navigate to the project directory.
Frontend:-
Install dependencies using npm install.
And Start App:- npm run dev
Backend:-
install dependencies using npm install.
Start the development server using npm start.


### Technologies Used
### Frontend:-
React.js: A JavaScript library for building user interfaces.
React Router: A library for routing in React applications.
Tailwind CSS: A utility-first CSS framework for styling web applications.

### Technologies Used
### Backend:-
Express js: A node js framewrok for building restful APIs.
MondoDB:- A nosql database
Mongoose:- It is an object modeling tool for Node.js and MongoDB. It provides a straight-forward, schema-based solution to model your application data.

Credits
This project was created by (https://iamaamir.netlify.app/).
