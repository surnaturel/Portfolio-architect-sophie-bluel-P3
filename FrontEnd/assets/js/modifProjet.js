let monProjets = window.localStorage.getItem('monProjets');
let mesBoutons = window.localStorage.getItem('mesBoutons')

if(monProjets === null){
    let reponse = await fetch('http://localhost:5678/api/works')
    monProjets = await reponse.json()
    let valeurProjets = JSON.stringify(monProjets);
    window.localStorage.setItem("monProjets", valeurProjets);

}else{
    monProjets = JSON.parse(monProjets)
}

function afficheProjets(monProjets){
    let gallery  = document.querySelector('.gallery')
    gallery.innerHTML = " "
    monProjets.forEach(projet => {

        let elementProjet = document.createElement('figure')
        let elementImage = document.createElement('img')
        elementImage.src = projet.imageUrl
        let elementTitre = document.createElement('p')
        elementTitre.innerText = projet.title

        gallery.appendChild(elementProjet)
        elementProjet.appendChild(elementImage)
        elementProjet.appendChild(elementTitre)

    });

}

afficheProjets(monProjets)


