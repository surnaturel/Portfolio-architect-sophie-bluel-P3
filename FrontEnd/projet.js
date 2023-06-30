let monProjets = window.localStorage.getItem('monProjets');


if(monProjets === null){
    let reponse = await fetch('http://localhost:5678/api/works')
    monProjets = await reponse.json()
    let valeurProjets = JSON.stringify(monProjets);
    window.localStorage.setItem("monProjets", valeurProjets);

}else{
    monProjets = JSON.parse(monProjets)
}

function afficheProjets(monProjets){
    monProjets.forEach(projet => {
        let gallery  = document.querySelector('.gallery')
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

function filtreBar(){
   /* let tousBtn = document.getElementById('tous')
    let objetBtn = document.getElementById('objets')
    let appartementBtn = document.getElementById('appartement')
    let hotelRestaurantBtn = document.getElementById('hotelRestauration')*/
    let buttonBtns = document.querySelectorAll("#portfolio .filtreBar button")
    buttonBtns.forEach(bouton => {
        bouton.addEventListener('click', function(event) {
            let id = event.target.id
            console.log(monProjets)
        })
    });
    
    console.log(buttonBtns)

}

filtreBar()