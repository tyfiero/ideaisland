import { useEffect, useRef, useState } from "react";
import {
  query,
  where,
  collection,
  doc,
  addDoc,
  serverTimestamp,
  updateDoc,
  deleteDoc,
  onSnapshot,
  limit,
  orderBy,
} from "firebase/firestore";
import { firestore } from "../firebase-init";

import useStore from "../StateManagement";

function FirebaseExample() {
  const todoRef = useRef();
  const priorityRef = useRef();

  const user = useStore((state) => state.user);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      if (!firestore) return;
      await addDoc(collection(firestore, "todos"), {
        owner: user.uid,
        todo: todoRef.current.value,
        createdAt: serverTimestamp(),
        priority: priorityRef.current.value,
        status: "open",
      });
      todoRef.current.value = "";
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = async (currentDoc, change) => {
    try {
      if (!firestore) return;
      const todoRef = doc(firestore, "todos", currentDoc);

      await updateDoc(todoRef, {
        status: change,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (currentDoc) => {
    try {
      if (!firestore) return;
      const todoRef = doc(firestore, "todos", currentDoc);
      await deleteDoc(todoRef);
    } catch (error) {
      console.log(error);
    }
  };

  // Only create and execute the query when there is a logged in user

  const [todos, setTodos] = useState(undefined);
  useEffect(() => {
    // This useEffect is used to get the todos for the user
    try {
      if (!firestore) return;
      // Only execute the query if we have an user
      const queryTodos = user
        ? query(
            collection(firestore, "todos"),
            where("owner", "==", user.uid),
            orderBy("createdAt", "desc"),
            limit(100)
          )
        : null;
      if (!queryTodos) return;
      const unsubscribe = onSnapshot(queryTodos, (querySnapshot) => {
        setTodos(querySnapshot);
      });
      return () => unsubscribe();
    } catch (error) {
      console.log(error);
    }
  }, [user]);
  return (
    <div className="bg-lightning-200 p-3 rounded-xl">
      <div className="my-2">
        <h3 className="p-2 text-lg font-medium leading-6 text-gray-900">
          Example
        </h3>
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-2">
              <p className="mt-1 text-sm text-gray-600">
                Directly upload data from the client to your profile. Secured by
                the security rules in the file &quot;firestore.rules&quot;
              </p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form onSubmit={handleAdd}>
              <div className="shadow overflow-hidden rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="toDo"
                        className="block text-sm font-medium text-gray-700"
                      >
                        To do item
                      </label>
                      <input
                        ref={todoRef}
                        type="text"
                        name="toDo"
                        id="toDo"
                        required
                        className="mt-1 focus:ring-lightning-500 focus:border-lightning-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="priority"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Priority
                      </label>
                      <select
                        id="priority"
                        name="priority"
                        ref={priorityRef}
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-lightning-500 focus:border-lightning-500 sm:text-sm"
                      >
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-2 bg-gray-50 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-lightning-600 hover:bg-lightning-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lightning-500"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="md:grid md:grid-cols-3 md:gap-6 mt-4">
          <div className="md:col-span-1">
            <div className="px-2">
              <p className="mt-1 text-sm text-gray-600">
                Retrieve the added data via a real-time listener
              </p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <div className="flex flex-col">
              <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="shadow overflow-hidden border-b border-gray-200 rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200 table-fixed">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-2/3"
                          >
                            {"To do's"}
                          </th>

                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6"
                          >
                            Priority
                          </th>

                          <th scope="col" className="relative px-6 py-3 w-1/6">
                            <span className="sr-only">Delete</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {todos &&
                          todos.docs.map((toDoItem) => {
                            const todoData = toDoItem.data();
                            return (
                              <tr key={toDoItem.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <div className="flex-shrink-0 h-10 w-10 items-center flex">
                                      <input
                                        type="checkbox"
                                        onChange={() => {
                                          handleChange(
                                            toDoItem.id,
                                            todoData.status === "open"
                                              ? "done"
                                              : "open"
                                          );
                                        }}
                                        checked={todoData.status === "done"}
                                        className="focus:ring-lightning-500 h-4 w-4 text-lightning-600 border-gray-300 rounded"
                                      />
                                    </div>
                                    <div>
                                      <div className="text-sm font-medium text-gray-900">
                                        {todoData.todo}
                                      </div>
                                    </div>
                                  </div>
                                </td>

                                <td className="px-6 py-4 whitespace-nowrap">
                                  {
                                    {
                                      Low: (
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                          Low
                                        </span>
                                      ),
                                      Medium: (
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                          Medium
                                        </span>
                                      ),
                                      High: (
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                          High
                                        </span>
                                      ),
                                    }[todoData.priority]
                                  }
                                </td>

                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                  <button
                                    onClick={() => handleDelete(toDoItem.id)}
                                    className="text-lightning-600 hover:text-lightning-900 focus:outline-none"
                                  >
                                    Remove
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FirebaseExample;
