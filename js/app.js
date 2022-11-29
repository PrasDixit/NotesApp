const addNote = document.querySelector("#addNote");
const main = document.querySelector("#main");

addNote.addEventListener("click", () => {
  addNotes();
});

const saveNotes = () => {
  const notes = document.querySelectorAll(".note textarea");
  console.log(notes);
  const data = [];

  notes.forEach((note) => {
    data.push(note.value.trim());
  });

  if (data.length) {
    localStorage.setItem("notes", JSON.stringify(data));
  } else {
    localStorage.removeItem("notes");
  }
};

const addNotes = (text = "") => {
  const note = document.createElement("div");
  note.classList.add("note");
  note.innerHTML = `
     <div class="tool">
          <i class="save fas fa-save"></i>
          <i class="trash fas fa-trash"></i>
     </div>
     <textarea>
     ${text}
     </textarea>

  `;
  note.querySelector(".trash").addEventListener("click", () => {
    note.remove();
    saveNotes();
  });

  note.querySelector(".save").addEventListener("click", saveNotes);

  main.appendChild(note);
  saveNotes();
};

(function () {
  const lsNotes = JSON.parse(localStorage.getItem("notes"));
  if (lsNotes === null) {
    addNotes();
  } else {
    lsNotes.forEach((lsNote) => {
      addNotes(lsNote);
    });
  }
})();
