import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../components/utils/api";
import Input from "../../components/common/MUI-themed/Input";
import TextArea from "../../components/common/MUI-themed/TextArea";

const NewTask = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [errorMsg, setErrorMsg] = useState("");
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [title, setTitle] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [dob, setDob] = useState("");

  const updateTask = async () => {
    setLoadingUpdate(true);
    try {
      const { data } = await api.put(`/api/tasks/${id}`, {
        task: {
          title,
          contact,
          email,
          description,
          dob        
        },
      });
      console.log(data);
      navigate("/");
    } catch (e) {
      console.log(e);
      setErrorMsg(e.response.data.msg);
    }
    setLoadingUpdate(false);
  };

  const [loading, setLoading] = useState(true);
  const getTask = async () => {
    try {
      const { data } = await api.get(`api/task/${id}`);
      setTitle(data.title);
      setContact(data.contact);
      setEmail(data.email);
      setDescription(data.description);
      setDob(data.dob.split("T")[0]);
      setLoading(false);
    } catch (e) {
      alert("Error fetching task");
      navigate("/");
      setLoading(false);
    }
  };

  useEffect(() => {
    getTask();
  }, []);

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-8">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <h1 className="mb-6 text-2xl font-semibold text-gray-800 text-center">Update Task</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateTask();
          }}
          className="space-y-6"
        >
          <Input
            className="w-full"
            label="Title"
            type="text"
            val={title}
            setVal={setTitle}
            required
          />
          <Input
            className="w-full"
            label="Contact"
            type="number"
            val={contact}
            setVal={setContact}
            required
          />
          <TextArea
            className="w-full"
            label="Description"
            rows={3}
            val={description}
            setVal={setDescription}
            required
          />
          <Input
            className="w-full"
            label="Email"
            type="email"
            val={email}
            setVal={setEmail}
            required
          />
          <Input
            className="w-full"
            label="Deadline"
            type="date"
            val={dob}
            setVal={setDob}
            required
          />
          <div className="mt-8">
            {errorMsg && (
              <div className="text-red-500 text-center text-sm mb-4">
                {errorMsg}
              </div>
            )}
            <button
              className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              type="submit"
              disabled={loadingUpdate}
            >
              {loadingUpdate ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewTask;
