import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../components/utils/api";
import Input from "../../components/common/MUI-themed/Input";
import TextArea from "../../components/common/MUI-themed/TextArea";

const NewTask = () => {
  const navigate = useNavigate();

  const [errorMsg, setErrorMsg] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [contact, setContact] = useState("");
  const [loading, setLoading] = useState(false);

  const addTask = async () => {
    setLoading(true);
    setErrorMsg(""); // Clear previous error message
    try {
      const { data } = await api.post("/api/tasks", {
        title,
        contact,
        description,
        email,
        dob,
      });
      console.log(data);
      navigate("/");
    } catch (e) {
      console.log(e);
      if (e.response && e.response.data && e.response.data.msg) {
        setErrorMsg(e.response.data.msg);
      } else {
        setErrorMsg("An error occurred. Please try again later.");
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-8">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <h1 className="mb-6 text-2xl text-gray-800 font-semibold text-center">
          Add New User
        </h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addTask();
          }}
          className="space-y-6"
        >
          <Input
            label="Name"
            type="text"
            val={title}
            setVal={setTitle}
            required
          />
          <Input
            label="Contact"
            type="number"
            val={contact}
            setVal={setContact}
            required
          />
          <TextArea
            label="Description"
            rows={3}
            val={description}
            setVal={setDescription}
            required
          />
          <Input
            label="Email"
            type="email"
            val={email}
            setVal={setEmail}
            required
          />
          <Input
            label="DOB"
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
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewTask;
