// Define the API endpoint
const link = 'https://notes-keeper-pi.vercel.app/notes';
const reloaddata = () => {
    document.querySelector("#addButton").innerHTML = "Add";
  
    fetch(link, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const noteList = document.querySelector(".note-list");
        data.forEach((note) => {
          const existingNote = noteList.querySelector(`[ data-id = '${note._id}' ]`);
          if (!existingNote) {
            noteList.innerHTML += `
            <div class="note" data-id="${note._id}">
              <div class="icon">
                <button type="submit" data-id="${note._id}" onclick="deleteNote(this.getAttribute('data-id'))"><i class="fa-regular fa-trash-can fa-lg"></i></button>
                <button type="submit" data-id="${note._id}" onclick="editNote(this.getAttribute('data-id'))"><i class="fa-solid fa-pencil fa-lg"></i></button> 
              </div>
              <div class="note-content">
                <h1>${note.title}</h1>
                <p>${note.content}</p>
              </div>
            </div>`;
          } else {
            existingNote.innerHTML = `
            <div class="icon">
              <button type="submit" data-id="${note._id}" onclick="deleteNote(this.getAttribute('data-id'))"><i class="fa-regular fa-trash-can fa-lg"></i></button>
              <button type="submit" data-id="${note._id}" onclick="editNote(this.getAttribute('data-id'))"><i class="fa-solid fa-pencil fa-lg"></i></button> 
            </div>
            <div class="note-content">
              <h1>${note.title}</h1>
              <p>${note.content}</p>
            </div>`;
          }
        });
      })
      .catch((error) => console.error(error));
  };
  
  reloaddata();

// Use the fetch() method to retrieve data from the API
fetch(link)
  .then(response => response.json())
  .then(data => {
    // Process the data returned from the API
    console.log(data);
  })
  .catch(error => console.error(error));



  // Define the API endpoint


const getValue = () => {
const title = document.querySelector('#title').value;
const content = document.querySelector('#content').value;
  const userData = {
    title: title,
    content:content
  
  };

  fetch(link, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      reloaddata();
    })
    .catch(error => console.error(error));
};

