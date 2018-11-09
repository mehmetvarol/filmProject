const form = document.querySelector("#film-form");
const titleElement = document.querySelector("#title");
const directorElement = document.querySelector("#director");
const urlElement = document.querySelector("#url");
const cardBody = document.querySelectorAll(".card-body")[1];
const clear = document.querySelector("#clear-films");


// Tüm eventleri yükleme
eventListeners();

function eventListeners() {
  form.addEventListener("submit", (addFilm) => {
    const title = titleElement.value;
    const director = directorElement.value;
    const url = urlElement.value;

    if (title === "" || director === "" || url === "") {
      // Hata Mesajı
      UI.displayMessages("Tüm alanları doldurun...", "danger");
    } else {
      // Yeni Film
      const newFilm = new Film(title, director, url);

      UI.addFilmToUI(newFilm); //Arayüze Film ekleme
      Storage.addFilmToStorage(newFilm); // Storage'a film ekleme
      UI.displayMessages("Filmler başarıyla eklendi...", "success");
    }
    UI.clearInputs(titleElement, urlElement, directorElement);


    addFilm.preventDefault();
  });
  document.addEventListener("DOMContentLoaded", addFilm => {
    let films = Storage.getFilmsFromStorage();
    UI.loadAllFilms(films);
  });

  cardBody.addEventListener("click", deleteFilm => {
    if (deleteFilm.target.id === "delete-film") {
      UI.deleteFilmFromUI(deleteFilm.target);
      Storage.deleteFilmFromStorage(deleteFilm.target.parentElement.previousElementSibling.previousElementSibling.textContent);
      UI.displayMessages("Silme işlemi başarılı", "success");
    }
  });

  clear.addEventListener("click", clearAllFilms => {
    if (confirm("Emin misiniz? ")) {
      UI.clearAllFilmsFromUI();
      Storage.clearAllFilmsFromStorage();
    }
  });

}
