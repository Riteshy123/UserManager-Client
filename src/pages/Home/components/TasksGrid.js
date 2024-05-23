import { useState } from "react";
import { Link } from "react-router-dom";
import dateFormatter from "../../../components/utils/dateFormatter";

const TaskGrid = ({ tasks, loading }) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter the tasks based on the search query
  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="my-5">
      {/* Search Bar */}
      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Search User"
          className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm p-2 mr-4"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <span className="text-gray-600">Results: {filteredTasks.length}</span>
      </div>
      
      {/* Task Cards */}
      <div className="flex flex-wrap items-stretch gap-4">
        {loading ? (
          <div className="my-5 text-gray-600">Loading...</div>
        ) : filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <Link
              className="task card bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out transform hover:-translate-y-1 p-4 flex flex-col justify-between"
              to={`/tasks/${task._id}`}
              key={task._id}
            >
              <div className="card-body">
                <h3 className="card-title mb-2 font-semibold text-lg">Name: {task.title}</h3>
                <h3 className="card-title mb-2 font-semibold text-lg">Contact: {task.contact}</h3>
                <h3 className="card-title mb-2 font-semibold text-lg">Email: {task.email}</h3>
                <h3 className="card-title mb-2 font-semibold text-lg">DOB: {dateFormatter(task.dob)}</h3>
                <p className="card-text text-gray-700">Description: {task.description}</p>
              </div>
            </Link>
          ))
        ) : (
          <div className="my-5 text-gray-600">
            No User found.
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskGrid;
