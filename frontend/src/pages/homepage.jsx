import { Link } from 'react-router-dom';
import TodoList from '../components/todoList';

const HomePage = () => {
  return (
    <div className="flex  flex-col justify-center items-center h-screen">
      <div className="flex justify-between items-center bg-purple-800 w-[95%] h-[70px] max-sm:w-[95%] px-2">
        <div className=" px-2 py-2 text-white ">
          <Link to="/" className='text-white hover:style-none'>Task Manage App</Link>
        </div>
        <Link to="/add-todo">
          <div className=" px-2 py-2 text-white  cursor-pointer hover:bg-black rounded-md ">
            Add Tasks
          </div>
        </Link>
      </div>
      <div className="h-[93%]">
        <TodoList />
      </div>
    </div>
  );
}

export default HomePage