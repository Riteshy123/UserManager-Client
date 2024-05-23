import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../components/utils/api";
import dateFormatter from "../../components/utils/dateFormatter";

const Task = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTask = async () => {
    try {
      const { data } = await api.get(`api/task/${id}`);
      setTask(data);
      setLoading(false);
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTask();
  }, [id]);

  const handleDelete = async () => {
    try {
      const confirm = window.confirm("Are you sure you want to delete this task?");
      if (!confirm) return;
      await api.delete(`api/tasks/${id}`);
      navigate("/");
    } catch (e) {
      setError(e.message);
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;

  return (
    <div className="p-8 bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="card task-main bg-white rounded-lg shadow-lg p-6 w-full max-w-3xl">
        <div className="card-body flex flex-col md:flex-row justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold mb-4">Name: {task.title}</h1>
            <p className="mb-2"><span className="font-semibold">Contact:</span> {task.contact}</p>
            <p className="mb-2"><span className="font-semibold">Email:</span> {task.email}</p>
            <p className="mb-2"><span className="font-semibold">Description:</span> {task.description}</p>
            <p className="mb-2"><span className="font-semibold">DOB:</span> {dateFormatter(task.dob)}</p>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0">
            <button
              className="btn btn-primary bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
              onClick={() => navigate(`/tasks/${id}/edit`)}
            >
              Edit
            </button>
            <button
              className="btn btn-danger bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Task;
