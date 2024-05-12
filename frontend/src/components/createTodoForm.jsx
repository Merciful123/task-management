import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createTodoAsync,
  fetchTodosByIdAsync,
  selectTodoById,
  selectedTodoListState,
  updateTodoAsync,
} from "../features/todoSlice";

const CreateTodo = () => {
  const selected = useSelector(selectTodoById);

  const [todo, setTodo] = useState({
    title: selected?.title || "",
    description: selected?.description || "",
    priority: selected?.priority || "medium",
    category: selected?.category || "",
    completed: selected?.completed || false,
  });

  const status = useSelector(selectedTodoListState);
  useEffect(() => {
    // Populate the form with selected todo data when available
    if (params?.id && selected) {
      setTodo({
        title: selected.title,
        description: selected.description,
        priority: selected.priority,
        category: selected.category,
        completed: selected.completed,
      });
    } else {
      // Reset the form when no todo is selected
      setTodo({
        title: "",
        description: "",
        priority: "medium",
        category: "",
        completed: false,
      });
    }
  }, [selected]);

  // Rest of your component code...
  const [alert, setAlert] = useState(null); // Alert state
  const [formErrors, setFormErrors] = useState({}); // Form validation errors

  const params = useParams();

  const dispatch = useDispatch();

  const fetchTodoById = () => {
    const id = params?.id;
    if (id) {
      try {
        dispatch(fetchTodosByIdAsync(id));
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    fetchTodoById();
  }, [params?.id]);

  // handling form data
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTodo({
      ...todo,
      [name]: value,
    });
  };

  const navigate = useNavigate();

  //  update and create tasks handler

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = params?.id;
    try {
      const isValid = validateForm();
      if (!isValid) return;
      if (params?.id) {
        dispatch(updateTodoAsync({ todo, id }));
        if (status === "idle") {
          setAlert("Task Updated Successfully!");
          setTimeout(() => {
            setAlert(null);
          }, 5000);
        }
         setTimeout(() => {
          navigate("/");
         }, 2000);
        
      } else {
        dispatch(createTodoAsync(todo));
        if (status === "idle") {
          setAlert("Task created Successfully!");
          setTimeout(() => {
            setAlert(null);
          }, 5000);
          // fetch
        }
        setTodo({
          title: "",
          description: "",
          priority: "medium",
          category: "",
          completed: false,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!todo?.title?.trim()) {
      errors.title = "Title is required";
      isValid = false;
    }

    if (!todo?.description?.trim()) {
      errors.description = "Description is required";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };
  return (
    <div className=" flex flex-col w-screen   justify-center">
      {alert && (
        <div
          className="bg-green-100 border w-1/2 max-sm:w-[95%] flex justify-center items-center mx-auto mb-2 border-green-400 text-green-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Success!</strong>
          <span className="block sm:inline"> {alert}</span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
            <svg
              onClick={() => setAlert(null)}
              className="fill-current h-6 w-6 text-green-500 cursor-pointer"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <title>Close</title>
              <path d="M14.348 14.849a1 1 0 0 1-1.414 1.414l-3.535-3.536-3.536 3.536a1 1 0 1 1-1.414-1.414l3.536-3.535-3.536-3.536a1 1 0 1 1 1.414-1.414l3.536 3.536 3.535-3.536a1 1 0 0 1 1.414 1.414l-3.536 3.536 3.536 3.535z" />
            </svg>
          </span>
        </div>
      )}
      <div className="flex w-[50%] max-sm:w-[95%] justify-between px-2 mx-auto">
        <h1 className="text-2xl font-semibold mb-4">Create New Task</h1>
        <Link to="/">
          <div className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer border-2">
            Back
          </div>
        </Link>
      </div>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 w-[50%] max-sm:w-[95%] flex flex-col mx-auto px-2"
      >
        <div>
          <label htmlFor="title" className="block mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={todo?.title}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-md p-2 border-2"
            required
          />
          {formErrors.title && (
            <p className="text-red-500 text-xs mt-1">{formErrors.title}</p>
          )}
        </div>
        <div>
          <label htmlFor="description" className="block mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={todo?.description}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-md p-2 border-2"
            rows="3"
            required
          ></textarea>
          {formErrors.description && (
            <p className="text-red-500 text-xs mt-1">
              {formErrors.description}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="priority" className="block mb-1">
            Priority
          </label>
          <select
            id="priority"
            name="priority"
            value={todo?.priority}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-md p-2 border-2"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div>
          <label htmlFor="category" className="block mb-1">
            Category
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={todo?.category}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-md p-2 border-2"
          />
        </div>
        <div className="flex justify-start items-center gap-2">
          <label htmlFor="completed" className="mb-1">
            Completed
          </label>
          <input
            type="checkbox"
            id="completed"
            name="completed"
            checked={todo?.completed}
            onChange={(e) => setTodo({ ...todo, completed: e.target.checked })}
            className="rounded-md border-gray-300 p-2 border-2"
          />
        </div>
        <div>
          <input
            onClick={handleSubmit}
            type="submit"
            value={params?.id ? "Edit Task" : "Create Taks"}
            className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer border-2"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateTodo;

import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export const Modal = () => {
  const [open, setOpen] = useState(true);

  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <ExclamationTriangleIcon
                        className="h-6 w-6 text-red-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        Deactivate account
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Are you sure you want to deactivate your account? All
                          of your data will be permanently removed. This action
                          cannot be undone.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                    onClick={() => setOpen(false)}
                  >
                    Deactivate
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
