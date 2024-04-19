function renderNotes() {
  const noteList = document.getElementById("noteList");
  noteList.innerHTML = "";

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const note = JSON.parse(localStorage.getItem(key));
    const noteItem = document.createElement("div");
    noteItem.classList.add("note-item");
    noteItem.innerHTML = `
            <h3>${note.title}</h3>
            <p>${note.content}</p>
            <button onclick="editNote('${key}')">Düzenle</button>
            <button onclick="deleteNote('${key}')">Sil</button>
        `;
    noteList.appendChild(noteItem);
  }
}

function addNote() {
  const titleInput = document.getElementById("noteTitle");
  const contentInput = document.getElementById("noteContent");
  const title = titleInput.value.trim();
  const content = contentInput.value.trim();

  if (title === "" || content === "") {
    alert("Lütfen not başlığı ve içeriğini giriniz.");
    return;
  }

  const timestamp = new Date().getTime();
  const note = {
    title: title,
    content: content,
  };

  localStorage.setItem(timestamp, JSON.stringify(note));
  titleInput.value = "";
  contentInput.value = "";
  renderNotes();
}

function editNote(key) {
  const note = JSON.parse(localStorage.getItem(key));
  const titleInput = document.getElementById("noteTitle");
  const contentInput = document.getElementById("noteContent");
  titleInput.value = note.title;
  contentInput.value = note.content;
  localStorage.removeItem(key);
  renderNotes();
}

function deleteNote(key) {
  localStorage.removeItem(key);
  renderNotes();
}

window.onload = function () {
  renderNotes();

  const noteForm = document.getElementById("noteForm");
  noteForm.addEventListener("submit", function (event) {
    event.preventDefault();
    addNote();
  });
};
