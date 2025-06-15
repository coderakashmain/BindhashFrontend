import { useState } from "react";
import axios from "axios";
import './CreateChatRoom.css'

export default function CreateChatRoom() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    isPublic: true,
    subroomId: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Replace with your endpoint and user ID
      await axios.post("/api/chat-room", {
        ...formData,
        created_by: 1,
      });
      alert("Chat room created!");
    } catch (err) {
      console.error(err);
      alert("Error creating room");
    }
  };

  return (
    <div className="create-chatroom-page">
      <form className="create-chatroom-form" onSubmit={handleSubmit}>
        <h1 className="create-chatroom-title">Create a Chat Room</h1>

        <label className="create-chatroom-label">Room Name</label>
        <input
          type="text"
          name="name"
          className="create-chatroom-input"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label className="create-chatroom-label">Description</label>
        <textarea
          name="description"
          className="create-chatroom-textarea"
          value={formData.description}
          onChange={handleChange}
        />

        <label className="create-chatroom-label">Subroom / Category</label>
        <select
          name="subroomId"
          className="create-chatroom-select"
          value={formData.subroomId}
          onChange={handleChange}
          required
        >
          <option value="">Select a category</option>
          <option value="1">Technology</option>
          <option value="2">Entertainment</option>
          <option value="3">Study</option>
          {/* Populate dynamically in production */}
        </select>

        <label className="create-chatroom-label-inline">
          <input
            type="checkbox"
            name="isPublic"
            checked={formData.isPublic}
            onChange={handleChange}
          />
          Public Room
        </label>

        <button className="create-chatroom-button" type="submit">
          Create Room
        </button>
      </form>
    </div>
  );
}
