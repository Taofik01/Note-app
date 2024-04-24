const btnEl = document.getElementById("btn");
const appEL = document.getElementById("app");

getNotes().forEach((note) => {
    const noteEl = createNoteEl(note.id, note.content);
    appEL.insertBefore(noteEl, btnEl);
})
function createNoteEl(id, content){
    const element = document.createElement("textarea")
    element.classList.add("note");
    element.placeholder = "Empty Note";
    element.value = content;

    element.addEventListener("dblclick", ()=>{
        const warning = confirm("Do you want to delete this Note?");
        if (warning) {
            deleteNote(id, element);
        }
    });
    element.addEventListener("input", () => {
        updateNote(id, element.value)
    });
    return element;
}
function deleteNote (id, element){
    const notes = getNotes().filter((note)=> note.id != id)
    saveNoteToLocal(notes)
    appEL.removeChild(element)
}
function updateNote(id, content) {
    const notes = getNotes() 
    const target = notes.filter((note) => note.id == id)[0];
    target.content = content;
    saveNoteToLocal(notes);

}


function addNewNote() {

    const notes = getNotes();
     const noteObj = {
        id: Math.floor(Math.random() * 100000),
        content: "",
    };
    const noteEl = createNoteEl(noteObj.id, noteObj.content);
    appEL.insertBefore(noteEl, btnEl);
    notes.push(noteObj); 


    saveNoteToLocal(notes);
}

function saveNoteToLocal (notes){
    localStorage.setItem("note-app", JSON.stringify(notes));
}

function getNotes() {
    return JSON.parse(localStorage.getItem("note-app") || "[]")
}
btnEl.addEventListener("click", addNewNote);