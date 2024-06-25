const button = document.querySelector(".btn");
const inputData = document.getElementById("inpdt");
const mainNote = document.querySelector(".note-list");

button.addEventListener("click", addNote);

const getNoteList = () => {
    return JSON.parse(localStorage.getItem("NoteList")) || [];
};

let localNoteList = getNoteList();

const addNoteDynamicElement = (currElem) => {
    const divElement = document.createElement("div");
    divElement.classList.add("todo-div");
    divElement.innerHTML = `
        <li class="todo-item">${currElem}</li> 
        <button class="deleteBtn">Delete</button>
    `;
    mainNote.append(divElement);

    // Add event listener for the delete button within this note
    divElement.querySelector(".deleteBtn").addEventListener("click", () => {
        divElement.remove();
        deleteNoteFromLocalStorage(currElem);
    });
};

function addNote(e) {
    e.preventDefault();
    const inputValue = inputData.value.trim();

    if (inputValue !== "") {
        localNoteList.push(inputValue);
        localNoteList = [...new Set(localNoteList)]; // Remove duplicates
        localStorage.setItem("NoteList", JSON.stringify(localNoteList));

        addNoteDynamicElement(inputValue);

        inputData.value = '';
    } else {
        alert("Note is empty. Please enter a note.");
    }
}

const deleteNoteFromLocalStorage = (note) => {
    localNoteList = localNoteList.filter(item => item !== note);
    localStorage.setItem("NoteList", JSON.stringify(localNoteList));
};

const showNoteList = () => {
    localNoteList.forEach(element => {
        addNoteDynamicElement(element);
    });
};

// Initially show notes from local storage when the page loads
showNoteList();
