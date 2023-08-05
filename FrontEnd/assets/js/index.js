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


if(mesBoutons === null){
    let reponseBtn = await fetch('http://localhost:5678/api/categories')
    mesBoutons = await reponseBtn.json()
    let valeurButons = JSON.stringify(mesBoutons);
    window.localStorage.setItem("mesBoutons", valeurButons);

}else{
    mesBoutons = JSON.parse(mesBoutons)
}

console.log(mesBoutons)

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
function afficheBoutons(mesBoutons){
    let boutonFiltre = document.querySelector('.filtreBar')
    mesBoutons.forEach(btnFiltre  => {
        let btn = document.createElement('button')
        btn.id = btnFiltre.name
        btn.innerText = btnFiltre.name
        btn.type = 'submit'
        btn.style.cursor = 'pointer'
        boutonFiltre.appendChild(btn)
    })

}
afficheBoutons(mesBoutons)

function filtreBar(){
    let buttonBtns = document.querySelectorAll("#portfolio .filtreBar button")
    buttonBtns.forEach(bouton => {
        bouton.addEventListener('click', function(event) {
            let id = event.target.id
            if(id === 'Tous'){
                afficheProjets(monProjets)
                console.log(monProjets)
            }else{
                let listeProjet = monProjets.filter(listeP  => listeP.category.name === id)
                afficheProjets(listeProjet)
                console.log(listeProjet)
                console.log(id)
            }
        })
    });
    
}

filtreBar()



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