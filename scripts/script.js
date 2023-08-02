
let noteSelect;

//Impresion de notas al iniciar pagina
document.addEventListener("DOMContentLoaded", function () {
  ObtenerNotes()
});

//Funcionalidad para modal "Agregar nota"
function crearNota(){
  const exampleModal = document.getElementById('modal-notes');
  if (exampleModal) {
    let contador = parseInt(localStorage.getItem("contador")) || 1;
    let inputTitle = document.getElementById('title-name').value;
    let inputContent = document.getElementById('content-text').value;
    if(inputTitle.length !== 0 && inputContent.length !== 0){
      let date = obtenerFechaActual();

      let noteOne = {
        id: contador,
        title: inputTitle,
        description: inputContent,
        dateNote: date,
        type: "note"
      };
    
      localStorage.setItem(noteOne.id, JSON.stringify(noteOne));
      localStorage.setItem("contador", contador + 1);
      console.log(noteOne.id);
      document.querySelector("#ImpresionNotas").innerHTML = "";
      ObtenerNotes();
    }
  }
}

//Funciones

//Obtener fecha, hora y minuto
function obtenerFechaActual() {
  const now = new Date();
  const date = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();
  const time = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
  return date + ' ' + time;
}

//Obtener notas
function ObtenerNotes() {
  const keys = Object.keys(localStorage);
  const maxWords = 200;
  const notes = [];
  for (let key of keys) {
    const note = JSON.parse(localStorage.getItem(key));
    if (note.type === "note") {
      notes.push(note);
    }
  }
    //Ordena de mayor a menor las ntoas dentro del arreglo notes[]
  notes.sort(function(a, b) {
    return b.id- a.id;
  });

  for (let note of notes){
    card = `
      <div class="col-md-3 tarjetas">
        <a href="#" data-bs-toggle="modal" data-bs-target="#modal-modify-notes" onclick="modalModificar(${note.id})" class="btn-note" style="text-decoration: none;">
          <div class="card">
            <h3 class="card-header titleNoteStyle">${note.title}</h3>
            <div class="card-body">
              <p class="fechaStyle">Modificado el ${note.dateNote}</p>
              <p class="descriptionNoteStyle">${note.description.substring(0, maxWords)}...</p>
            </div>
            <div class="card-footer">
              <a href="#" class="btn" id="btnBorrarNota" onclick="borrarNota(${note.id})"><i class="fas fa-solid fa-trash-can"></i></a>
            </div>
          </div>
        </a>
      </div>
    `;
    document.querySelector("#ImpresionNotas").innerHTML += card;
  }
}

//Modificar nota
function modalModificar(noteId) {
  const keys = Object.keys(localStorage);

  for (let key of keys) {
    const note = JSON.parse(localStorage.getItem(key));
    if (note.id === noteId) {
      noteSelect = note;
    }
  }

  const firstTitle = document.getElementById("title-name-mod");
  firstTitle.value = noteSelect.title;
  const firstDes = document.getElementById("content-text-mod");
  firstDes.value = noteSelect.description;

}

function modificarNota(){
  const secondTitle = document.getElementById("title-name-mod").value;
  const secondDes = document.getElementById("content-text-mod").value;

  let date = obtenerFechaActual();
  noteSelect.title = secondTitle;
  noteSelect.description = secondDes;
  noteSelect.dateNote = date;
    
  localStorage.setItem(noteSelect.id, JSON.stringify(noteSelect));

  document.querySelector("#ImpresionNotas").innerHTML = "";
  ObtenerNotes();
}

//Borrar nota
function borrarNota(idNota){
  console.log(idNota);

    const keys = Object.keys(localStorage);

    for (let key of keys) {
      const note = JSON.parse(localStorage.getItem(key));
      if (note.id === idNota) {
        noteSelect = note;
      }
    }

    localStorage.removeItem(noteSelect.id);
    document.querySelector("#ImpresionNotas").innerHTML = "";
    ObtenerNotes();
}

//Vaciar modal
function emptyModal() {
  let input = document.getElementById("title-name");
  if (input !== null) {
    input.value = "";
  }
  let textArea = document.getElementById("content-text");
  if (input !== null) {
    textArea.value = "";
  }
}



