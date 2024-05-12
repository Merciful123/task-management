import { Link, useParams } from "react-router-dom";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodosByIdAsync, selectTodoById } from "../features/todoSlice";
import { useEffect } from "react";

const SingleTask = () => {
  const selected = useSelector(selectTodoById);
  const dispatch = useDispatch();
  const params = useParams();
  const id = params?.id;
  console.log(id);
  useEffect(() => {
    dispatch(fetchTodosByIdAsync(id));
  }, [id]);
  console.log(selected);
  return (
    <div className="p-4  flex  flex-col w-[95%] lg:w-[50%] align-items-center mx-auto min-h-screen lg:mt-8 shadow-2xl rounded-lg">
      <div className="flex  justify-between">
        <h1 className="text-2xl font-semibold text-gray-800 ">
          {selected?.title}
        </h1>
        <Link to="/" className="px-2 py-1">
          <button>Back</button>
        </Link>
      </div>

      <p className="mt-2 text-lg whitespace-pre-line leading-normal text-gray-600 lg:mt-12">
        {selected?.description}
      </p>
      <div className="flex justify-between mt-4">
        <p className="text-sm text-gray-500 mt-2">
          Date:{" "}
          {selected?.createdAt
            ? format(new Date(selected?.createdAt), "yyyy-MM-dd HH:mm")
            : ""}
        </p>
        <p
          className={`mt-2 text-sm ${
            selected?.completed
              ? "bg-green-300"
              : "bg-red-200 px-1 py-1 rounded-md"
          }`}
        >
          Status: {selected?.completed ? "Completed" : "Incomplete"}
        </p>
      </div>
      <div className="flex justify-between mt-2">
        <p className="text-sm text-gray-500 mt-2 bg-yellow-300 px-1 py-1 rounded-md">
          Priority: {selected?.priority}
        </p>
        <p className="text-sm text-gray-500 mt-2 bg-blue-200 px-1 py-1 rounded-md">
          Category: {selected?.category ? selected?.category : "NA"}
        </p>
      </div>
    </div>
    //   </div>
    // </div>
  );
};

export default SingleTask;
