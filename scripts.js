// Description: Ce fichier contient le code Javascript du site web.
// Auteur:THEO PIDOUX
// Definir les variables globales du script 
const mainEntryUrl = "http://localhost:8000/api/v1/titles/";
const movie_datas = [];
const movie_datas_html = [];
const movies_instances = [];
let movie_image_url = "";

// Création de la fenêtre modale
function createModal(movieId) {

	// Récupération des éléments HTML pour la fenêtre modale et son contenu
	const modal = document.getElementById("myModal");
	const span = document.querySelector(".close");
	const modalImgEl = document.querySelector(".modal__img");
	const modalContentEl = document.querySelector(".modal__contents");
  
	// Affichage de la fenêtre modale
	modal.style.display = "block";
  
	// Récupération des données JSON pour le film spécifié
	fetch(mainEntryUrl + movieId)
	  .then(res => res.ok && res.json())
	  .then(data => {
  
		// Ajout de l'image du film et des détails dans la fenêtre modale
		modalImgEl.innerHTML = `<p><img src="${data.image_url}"></p>`;
  
		const liTemplate = document.createElement("li");
		liTemplate.innerHTML = "<em></em>";
  
		const titleLi = liTemplate.cloneNode(true);
		titleLi.firstChild.textContent = "Titre : ";
		titleLi.appendChild(document.createTextNode(data.title));
		modalContentEl.appendChild(titleLi);
  
		const genresLi = liTemplate.cloneNode(true);
		genresLi.firstChild.textContent = "Genre(s) : ";
		genresLi.appendChild(document.createTextNode(data.genres));
		modalContentEl.appendChild(genresLi);
  
		const yearLi = liTemplate.cloneNode(true);
		yearLi.firstChild.textContent = "Date de sortie : ";
		yearLi.appendChild(document.createTextNode(data.published));
		modalContentEl.appendChild(yearLi);
  
		const imdbScoreLi = liTemplate.cloneNode(true);
		imdbScoreLi.firstChild.textContent = "Score IMBD : ";
		imdbScoreLi.appendChild(document.createTextNode(data.imdb_score));
		modalContentEl.appendChild(imdbScoreLi);
  
		const directorsLi = liTemplate.cloneNode(true);
		directorsLi.firstChild.textContent = "Réalisateur(s) : ";
		directorsLi.appendChild(document.createTextNode(data.directors));
		modalContentEl.appendChild(directorsLi);
  
		const actorsLi = liTemplate.cloneNode(true);
		actorsLi.firstChild.textContent = "Acteurs : ";
		actorsLi.appendChild(document.createTextNode(data.actors));
		modalContentEl.appendChild(actorsLi);
  
		const durationLi = liTemplate.cloneNode(true);
		durationLi.firstChild.textContent = "Durée : ";
		durationLi.appendChild(document.createTextNode(`${data.duration} minutes.`));
		modalContentEl.appendChild(durationLi);
  
		const countryLi = liTemplate.cloneNode(true);
		countryLi.firstChild.textContent = "Pays d'origine : ";
		countryLi.appendChild(document.createTextNode(data.country_li));
		modalContentEl.appendChild(countryLi);
  
		const boxOfficeResults = liTemplate.cloneNode(true);
		boxOfficeResults.firstChild.textContent = "Box-office : ";
		boxOfficeResults.appendChild(document.createTextNode(data.worldwide_gross_income));
		modalContentEl.appendChild(boxOfficeResults);
  
		const descriptionLi = liTemplate.cloneNode(true);
		descriptionLi.firstChild.textContent = "Résumé : ";
		descriptionLi.appendChild(document.createTextNode(data.description));
		modalContentEl.appendChild(descriptionLi);
  
		// Fonction pour fermer la fenêtre modale
		const closeModal = () => {
		  modal.style.display = "none";
		  modalImgEl.innerHTML = "";
		  modalContentEl.innerHTML = "";
		}
  
		// Ajout d'événements d'écouteur de clic pour fermer la fenêtre modale
		span.addEventListener("click", closeModal);
		window.addEventListener("click", event => {
		  if (event.target === modal) {
			closeModal();
		  }
		});
	  })
	  .catch(error => {
		console.error("Error:", error);
	  });
  }			
																					  


  


// Création de la fenêtre "meilleur film"
function showPreviewBestMovie(url) {

	// Récupération des données JSON à partir de l'URL spécifiée
	const bestMovieImg = document.getElementById("bestMovie__image");
	const bestMovieContents = document.getElementById("bestMovie__contents");
	const btnOpenModal = document.querySelector(".btn__openModal");
	
	fetch(url)
	  .then(res => res.ok && res.json())
	  .then(data => {
		
		// Ajout de l'image, du titre et de la description du meilleur film
		bestMovieImg.innerHTML = "<p><img src='" + data.image_url + "'></p>";
		bestMovieImg.setAttribute("data-id", data.id);
  
		const bestMovieTitle = document.createElement("h1");
		bestMovieTitle.innerText = data.title;
		bestMovieContents.appendChild(bestMovieTitle);
  
		const bestMovieDescription = document.createElement("p");
		bestMovieDescription.innerText = data.description;
		bestMovieContents.appendChild(bestMovieDescription);
  
		// Définition d'une fonction pour ouvrir le modal avec l'identifiant de données du meilleur film
		function openBestMovieModal() {
		  createModal(bestMovieImg.dataset.id);
		}
  
		// Ajout d'un événement de clic au bouton pour ouvrir le modal
		btnOpenModal.removeEventListener("click", openBestMovieModal);
		btnOpenModal.addEventListener("click", openBestMovieModal);
	  })
	  .catch(error => {
		console.error("Error:", error);
	  });
  };
  
  
  

// Création d'une image preview pour le caroussel.
function showPreview(endUrl, indice, containerId) {

	// Récupération des données JSON à partir de l'URL spécifiée
	fetch(mainEntryUrl + endUrl)
	  .then(function(res) {
		if (res.ok) {
			return res.json();
		}
	  })
	  .then(function(data) {   
		
		// Création d'un élément li pour l'image et ajout de l'image et de l'identifiant de données
		let caroussel__container = document.getElementsByClassName(containerId)[0];
		let movie_image_element = document.createElement("li");
		
		movie_image_element.innerHTML = "<p><img src='" +  data.results[indice].image_url + "'></p>";
		movie_image_element.setAttribute("data-id", data.results[indice].id);
		movie_image_element.setAttribute("class", "imgPreview");
		caroussel__container.appendChild(movie_image_element);
		
		// Ajout d'un événement de clic pour ouvrir un modal avec l'identifiant de données
		movie_image_element.addEventListener("click", function() {
		  createModal(movie_image_element.dataset.id)
		})
	  })
	  .then(() => {
		// Ajout d'un attribut de données et de styles d'affichage pour les nœuds enfants du conteneur
		let carrousel = document.getElementsByClassName(containerId)[0].childNodes;
		carrousel.forEach(function (currentValue, currentIndex) {
		  currentValue.setAttribute("data-carousselPlace", currentIndex)
  
		  if (currentIndex < 4) {
			currentValue.style.display = "block"
		  } else {
			currentValue.style.display = "none"
		  }
		})
	  })
	  .catch(function(err) {
		console.log(err);
	  });
  }
  

// Création des sections de caroussel
function createCarousselSection(endUrl1, endUrl2, containerId) {

	// Création des sections d'images pour endUrl1
	for (let movie = 0; movie < 5; movie++) {
	  showPreview(endUrl1, movie, containerId);
	}
  
	// Création des sections d'images pour endUrl2
	for (let movie = 0; movie < 2; movie++) {
	  showPreview(endUrl2, movie, containerId);
	}
}

// Sélection des flèches gauche et droite
const arrows_right = document.querySelectorAll('.arrow__right');
const arrows_left = document.querySelectorAll('.arrow__left');

// Ajout des événements d'écouteur de clic pour chaque flèche
for (let i = 0; i < arrows_right.length; i++) {

	// Événement d'écouteur de clic pour la flèche droite
	arrows_right[i].addEventListener('click', function() {
	  turn_right(this);
	});
  
	// Événement d'écouteur de clic pour la flèche gauche
	arrows_left[i].addEventListener('click', function() {
	  turn_left(this);
	});
}



// Fonction pour faire tourner le carrousel vers la droite
function turn_right(arrow_right) {
	// Récupération du parent de la flèche cliquée et du div contenant les images du carrousel
	const divParent = arrow_right.parentElement;
	const divCarrousel = divParent.querySelector('div');
	// Récupération de toutes les images du carrousel
	const figures = divParent.querySelectorAll('.imgPreview');
  
	// Pour chaque image, on met à jour son attribut "data-carousselplace" en lui ajoutant 6 modulo 7
	for (let i = 0; i < figures.length; i++) {
	  figures[i].dataset.carousselplace = (parseInt(figures[i].dataset.carousselplace) + 6) % 7;
	}
  
	// On actualise l'affichage du carrousel
	refreshCarrousel(divCarrousel);
}


// Fonction pour faire tourner le carrousel vers la gauche
function turn_left(arrow_left) {
	// Récupération du parent de la flèche cliquée et du div contenant les images du carrousel
	const divParent = arrow_left.parentElement;
	const divCarrousel = divParent.querySelector('div');
	// Récupération de toutes les images du carrousel
	const figures = divParent.querySelectorAll('.imgPreview');
  
	// Pour chaque image, on met à jour son attribut "data-carousselplace" en lui ajoutant 1 modulo 7
	for (let i = 0; i < figures.length; i++) {
	  figures[i].dataset.carousselplace = (parseInt(figures[i].dataset.carousselplace) + 1) % 7;
	}
  
	// On actualise l'affichage du carrousel
	refreshCarrousel(divCarrousel);
}


  

  function refreshCarrousel(carrousel) {
	// Récupérer tous les éléments avec la classe CSS "imgPreview"
	const figures = carrousel.querySelectorAll('.imgPreview');
  
	// Parcourir chaque élément et mettre à jour leur affichage
	for (let i = 0; i < figures.length; i++) {
	  // Récupérer la position de l'élément dans le carrousel
	  const carousselplace = parseInt(figures[i].dataset.carousselplace);
  
	  // Afficher l'image si elle doit être visible
	  if (carousselplace < 4) {
		figures[i].style.display = 'block';
	  } 
	  // Masquer l'image si elle ne doit pas être visible
	  else {
		figures[i].style.display = 'none';
	  }
	}
}

  

  async function main() {
	try {
	  // Récupération des films triés par score IMBD décroissant
	  const res = await fetch(mainEntryUrl + '?sort_by=-imdb_score');
  
	  if (res.ok) {
		// Récupération des données au format JSON
		const data = await res.json();
		// Récupération de l'URL du meilleur film
		const bestMovieUrl = data.results[0].url;
		// Affichage d'une prévisualisation du meilleur film
		showPreviewBestMovie(bestMovieUrl);
	  }
	} catch (error) {
	  console.error(error);
	}
  
	// Création des sections de carrousel pour chaque genre
	// 1er caroussel (meilleur films)
	createCarousselSection('?sort_by=-imdb_score&page_size=7', '?sort_by=-imdb_score&page=2', 'images__BM');
  
	// 2d caroussel (meilleur films d'action)
	createCarousselSection('?genre_contains=action&sort_by=-imdb_score', '?genre_contains=action&sort_by=-imdb_score&page=2', 'images__AM');
  
	// 3eme caroussel (meilleur films thriller)
	createCarousselSection('?genre_contains=thriller&sort_by=-imdb_score', '?genre_contains=thriller&sort_by=-imdb_score&page=2', 'images__T');
  
	// 4eme caroussel (meilleur films d'horreur)
	createCarousselSection('?genre_contains=horror&sort_by=-imdb_score', '?genre_contains=horro&sort_by=-imdb_score&page=2', 'images__H');
}

// Appel de la fonction principale
main();
