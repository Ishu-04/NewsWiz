import React, { useEffect, useState } from "react";
import axios from "axios";
import { ArticleCard } from "../components/ArticleCard";
import { toast } from "react-toastify";
import "./SavedNotes.css";
import { useNavigate } from "react-router-dom";

const SavedNotes = () => {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const token = localStorage.getItem("authToken");

    if (token) {
      try {
        const res = await axios.get("http://localhost:5002/get-notes", {
          headers: { Authorization: token },
        });
        setNotes(res.data.notes || []);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch notes");
        setNotes([]);
      }
    } else {
      const tempNotes = JSON.parse(localStorage.getItem("savedNotes")) || [];
      setNotes(tempNotes);
    }
  };

  const deleteNote = async (id, index) => {
    const token = localStorage.getItem("authToken");

    if (token) {
      try {
        await axios.delete(`http://localhost:5002/delete-note/${id}`, {
          headers: { Authorization: token },
        });
        toast.success("Note deleted");
        fetchNotes();
      } catch (err) {
        console.error(err);
        toast.error("Failed to delete note");
      }
    } else {
      let tempNotes = JSON.parse(localStorage.getItem("savedNotes")) || [];
      tempNotes.splice(index, 1);
      localStorage.setItem("savedNotes", JSON.stringify(tempNotes));
      setNotes(tempNotes);
      toast.success("Note deleted");
    }
  };

  return (
    <div className="saved-notes-page">
      <button className="btn-back-home" onClick={() => navigate("/")}>
        ← Back to Home
      </button>

      <h3>📝 Saved Notes</h3>
      {notes.length === 0 && <p>No notes found.</p>}

      <div className="notes-grid">
        {notes.map((item, index) => (
          <div className="note-card-wrapper" key={index}>
            <ArticleCard article={item.article} summary={item.note} />
            <button
              className="btn-delete"
              onClick={() => deleteNote(item._id, index)}
            >
              ❌ Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedNotes;
