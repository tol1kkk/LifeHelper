import { useState } from "react";
import "./NotesPage.css";

const initialNotes = [
  {
    id: 1,
    title: "Project Ideas",
    text: "Some ideas for future projects...",
    date: "22 May",
    type: "purple",
  },
  {
    id: 2,
    title: "Shopping List",
    text: "Milk\nEggs\nBread\nChicken",
    date: "22 May",
    type: "orange",
  },
  {
    id: 3,
    title: "Workout Plan",
    text: "Day 1 - Legs\nDay 2 - Chest\nDay 3 - Back",
    date: "21 May",
    type: "blue",
  },
  {
    id: 4,
    title: "Motivation",
    text: "Discipline is doing what needs to be done, even when you don't want to.",
    date: "20 May",
    type: "green",
  },
  {
    id: 5,
    title: "Book Notes",
    text: "Atomic Habits: Focus on 1% better every day.",
    date: "18 May",
    type: "yellow",
  },
  {
    id: 6,
    title: "Ideas Tracker",
    text: "LifeHelper\nFood App\nTravel App",
    date: "18 May",
    type: "pink",
  },
];

export default function NotesPage() {
  const [notes, setNotes] = useState(initialNotes);
  const [searchText, setSearchText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [newNote, setNewNote] = useState({
    title: "",
    text: "",
    type: "purple",
  });

  const filteredNotes = notes.filter((note) => {
    return (
      note.title.toLowerCase().includes(searchText.toLowerCase()) ||
      note.text.toLowerCase().includes(searchText.toLowerCase())
    );
  });

  function addNewNote() {
    if (newNote.title.trim() === "" || newNote.text.trim() === "") {
      return;
    }

    const noteToAdd = {
      id: Date.now(),
      title: newNote.title,
      text: newNote.text,
      date: "Today",
      type: newNote.type,
    };

    setNotes([noteToAdd, ...notes]);

    setNewNote({
      title: "",
      text: "",
      type: "purple",
    });

    setIsModalOpen(false);
  }

  return (
    <main className="notesPage">
      <header className="notesHeader">
        <div className="notesLogo">
          <span>✓</span>
          <p className="notesLogoText">LifeHelper</p>
        </div>

        <button className="notesMenu">•••</button>
      </header>

      <section className="notesTop">
        <div>
          <h1 className="notesTitle">My Notes</h1>
          <p className="notesSubtitle">Save ideas, lists and important thoughts</p>
        </div>

        <button
          className="addNoteButton"
          onClick={() => setIsModalOpen(true)}
        >
          + New Note
        </button>
      </section>

      <section className="notesSearchBox">
        <input
          className="notesSearchInput"
          type="text"
          placeholder="Search notes..."
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
        />

        <span className="searchIcon">⌕</span>
      </section>

      <section className="notesGrid">
        {filteredNotes.length === 0 ? (
          <div className="emptyNotes">
            <h3 className="emptyNotesTitle">No notes found</h3>
            <p className="emptyNotesText">Try another search or create a note.</p>
          </div>
        ) : (
          filteredNotes.map((note) => (
            <article
              key={note.id}
              className={`noteCard ${note.type}Note`}
            >
              <h3 className="noteTitle">{note.title}</h3>

              <p className="noteText">
                {note.text}
              </p>

              <span className="noteDate">{note.date}</span>
            </article>
          ))
        )}
      </section>

      {isModalOpen && (
        <div className="noteModalOverlay">
          <div className="noteModal">
            <div className="noteModalHeader">
              <div>
                <h2 className="noteModalTitle">Create New Note</h2>
                <p className="noteModalSubtitle">
                  Add a short note, idea or list
                </p>
              </div>

              <button
                className="noteModalClose"
                onClick={() => setIsModalOpen(false)}
              >
                ×
              </button>
            </div>

            <div className="noteModalForm">
              <div className="noteField">
                <label className="noteLabel">Note title</label>
                <input
                  className="noteInput"
                  type="text"
                  placeholder="Example: Project Ideas"
                  value={newNote.title}
                  onChange={(event) =>
                    setNewNote({ ...newNote, title: event.target.value })
                  }
                />
              </div>

              <div className="noteField">
                <label className="noteLabel">Note text</label>
                <textarea
                  className="noteTextarea"
                  placeholder="Write your note here..."
                  value={newNote.text}
                  onChange={(event) =>
                    setNewNote({ ...newNote, text: event.target.value })
                  }
                />
              </div>

              <div className="noteField">
                <label className="noteLabel">Note color</label>

                <div className="noteColorOptions">
                  {["purple", "orange", "blue", "green", "yellow", "pink"].map(
                    (color) => (
                      <button
                        key={color}
                        type="button"
                        className={
                          newNote.type === color
                            ? `noteColorOption ${color}Color activeNoteColor`
                            : `noteColorOption ${color}Color`
                        }
                        onClick={() => setNewNote({ ...newNote, type: color })}
                      ></button>
                    ),
                  )}
                </div>
              </div>

              <div className="noteModalActions">
                <button
                  className="noteCancelButton"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>

                <button className="noteAddButton" onClick={addNewNote}>
                  Add Note
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}