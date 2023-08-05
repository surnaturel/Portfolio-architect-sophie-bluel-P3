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


function affichageModal(){
    let modifGalery = document.getElementById('modifGalery')
    modifGalery.addEventListener('click', function(event) {
    event.preventDefault()
    console.log(monProjets)
    let modal = document.getElementById('galery-modal')
    let modale = document.getElementById('modale')
    let body = document.getElementsByName('body')
    modale.style.display = 'flex'
    modal.innerHTML = " "
    monProjets.forEach(projet => {

        let elementModal = document.createElement('figure')
        let modalImage = document.createElement('img')
        modalImage.src = projet.imageUrl
        let modifTitre = document.createElement('a')
        modifTitre.innerText = 'editer'

        modal.appendChild(elementModal)
        elementModal.appendChild(modalImage)
        elementModal.appendChild(modifTitre)

    });
})
}