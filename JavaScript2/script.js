// Fonction pour afficher le CV
function afficherCV(profile){
  const divCV = document.createElement('div');
  divCV.id = 'cv';
  
  const h1 = document.createElement('h1');
  h1.id = 'title';
  h1.textContent = profile.nom;
  
  const h2 = document.createElement('h2');
  h2.id = 'subtitle';
  h2.textContent = profile.poste;
  
  const divProfile = document.createElement('div');
  divProfile.id = 'profile';
  divProfile.textContent = 'Email : ' + profile.email;
  
  const divInfos = document.createElement('div');
  divInfos.id = 'infos';
  divInfos.textContent = 'Adresse : ' + profile.adresse;
  
  const divSummary = document.createElement('div');
  divSummary.id = 'summary';
  divSummary.textContent = profile.summary;
  
  const Skills = document.createElement('ul');
  Skills.id = 'skills';
  
  profile.competences.forEach(function(competence){
    const li = document.createElement('li');
    li.textContent = competence;
    Skills.appendChild(li);
  });
  
  divCV.appendChild(h1);
  divCV.appendChild(h2);
  divCV.appendChild(divProfile);
  divCV.appendChild(divInfos);
  divCV.appendChild(divSummary);
  divCV.appendChild(Skills);
  
  document.body.appendChild(divCV);
  // Appel du chargement du profil GitHub après affichage du CV
  chargerProfilGitHub('Matti-ORT');
}

// Fonction pour afficher la section Profil GitHub
function afficherProfilGitHub(data) {
  const cv = document.getElementById('cv');
  if (!cv) return;
  const divGithub = document.createElement('div');
  divGithub.id = 'github';
  divGithub.innerHTML = `
    <h3>Profil GitHub</h3>
    <p><strong>Login :</strong> ${data.login}</p>
    <p><strong>Nom complet :</strong> ${data.name ? data.name : 'Non renseigné'}</p>
    <p><strong>Bio :</strong> ${data.bio ? data.bio : 'Non renseignée'}</p>
    <p><strong>Dépôts publics :</strong> ${data.public_repos}</p>
    <p><a href="${data.html_url}" target="_blank">Voir le profil GitHub</a></p>
  `;
  cv.appendChild(divGithub);
}

// Fonction pour charger le profil GitHub via l'API
function chargerProfilGitHub(username) {
  fetch(`https://api.github.com/users/${username}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Erreur de chargement');
      }
      return response.json();
    })
    .then(data => {
      afficherProfilGitHub(data);
    })
    .catch(error => {
      const cv = document.getElementById('cv');
      if (cv) {
        const divGithub = document.createElement('div');
        divGithub.id = 'github';
        divGithub.textContent = 'Impossible de charger les données GitHub.';
        cv.appendChild(divGithub);
      }
      console.error(error);
    });
}

//Avec JSON
function ChargerCV(){
  fetch('Profile.json') 
    .then(function(response){
      if (!response.ok) {
        throw new Error('Erreur de chargement du fichier');
      }
      return response.json();
    })
    .then(function(data){
      console.log('Données chargées :', data);
      afficherCV(data);
    })
    .catch(function(error){
      console.error('Erreur :', error);
      document.body.innerHTML = 'erreur';
    });
}

// Responsive JS: adapt font size based on window width
function adaptFontSize() {
  const cv = document.getElementById('cv');
  if (!cv) return;
  if (window.innerWidth < 600) {
    cv.style.fontSize = '1em';
  } else {
    cv.style.fontSize = '1.15em';
  }
}
window.addEventListener('resize', adaptFontSize);
window.addEventListener('DOMContentLoaded', adaptFontSize);

ChargerCV();
