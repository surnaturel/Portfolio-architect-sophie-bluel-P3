//import { afficheBoutonsModif } from "./index.js";
document.addEventListener("DOMContentLoaded", async function() {
    const isConnected = window.localStorage.getItem("isConnected");
    let monProjets = window.localStorage.getItem('monProjets');
    let mesBoutons = window.localStorage.getItem('mesBoutons');
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
    if (isConnected == "true") {
        //afficheBoutonsModif();
        // Faites d'autres actions nécessaires pour l'utilisateur connecté
        afficheBoutonsModif1()
        afficheBoutonsModif2()
        afficheProjets(monProjets)
        let acceuil  = document.querySelector('.acceuil')
        acceuil.addEventListener('click', function(){
            localStorage.removeItem("isConnected");
        }) 
        
    }
    // Reste du code pour index.html...
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
    
    function afficheBoutonsModif1(){
        let filtreBarSupri = document.querySelector('.filtreBar');
        filtreBarSupri.style.display = 'none';

        var btnModif1 = document.createElement('div')
        btnModif1.classList.add("modif")
        var btnIcnone = document.createElement('i')
        btnIcnone.classList.add("fa-regular", "fa-pen-to-square");
        var btnLien = document.createElement('a')
        btnLien.innerText = 'Modifier'
    
        const sectionIntroduction = document.getElementById('introduction');
        const figureElement = sectionIntroduction.querySelector('figure');
            
        figureElement.appendChild(btnModif1)
        btnModif1.appendChild(btnIcnone)
        btnModif1.appendChild(btnLien)
    }

    function afficheBoutonsModif2(){
        let filtreBarSupri = document.querySelector('.filtreBar');
        filtreBarSupri.style.display = 'none';

        var btnModif = document.createElement('div')
        btnModif.classList.add("modif")
        var btnIcnone = document.createElement('i')
        btnIcnone.classList.add("fa-regular", "fa-pen-to-square");
        var btnLien = document.createElement('a')
        btnLien.innerText = 'Modifier'
        //btnIcnone.classList.add("modifGalery")
        btnLien.classList.add("modifGalery")
        
        const sectionportfolio = document.getElementById('portfolio');
        const aticleElement = sectionportfolio.querySelector('article');

        aticleElement.appendChild(btnModif)
        btnModif.appendChild(btnIcnone)
        btnModif.appendChild(btnLien)
    }

    function affichageModal(){
        let modifGalery = document.querySelector('.modifGalery');
        modifGalery.addEventListener('click', function(event) {
            event.preventDefault()
            let galeryModal = document.getElementById('galery-modal')
            //let modale = document.getElementById('modale')
            //console.log(modale)    
            modale.style.display = 'flex'
            galeryModal.innerHTML = " "
            monProjets.forEach(projet => {
                let elementModal = document.createElement('figure')
                elementModal.classList.add('elementModal');
                let modalImage = document.createElement('img')
                modalImage.src = projet.imageUrl
                modalImage.classList.add('modalImage');
                let modifTitre = document.createElement('a')
                modifTitre.innerText = 'editer'
                let iconImg = document.createElement('i');
                iconImg.classList.add('fa-regular', 'fa-trash-can', 'iconImg');
                
                
                galeryModal.appendChild(elementModal)
                elementModal.appendChild(modalImage)
                elementModal.appendChild(modifTitre)

                elementModal.appendChild(iconImg);
    
            });
            suprimer_photo()
        })
        fermerModal() 
        
    }
    affichageModal()

    function fermerModal(){
        let fermerModal = document.getElementById('fermerModal')
        fermerModal.addEventListener('click', function(){
            modale.style.display = 'none'
        })
    }

    function suprimer_photo(){
        let iconesSupprimer = document.querySelectorAll('.iconImg');
        console.log(iconesSupprimer)
        iconesSupprimer.forEach((icone) => {
            console.log(icone)
            icone.addEventListener('click', function(event) {
                let bouton = event.target;
                console.log(bouton);
                const figureParent = bouton.closest('figure');
                if (figureParent) {
                    //figureParent.remove();
                    console.log(figureParent)
                }
            });
        });
    }
    
    
/*
async function suprimer_photo() {
    let iconesSupprimer = document.querySelectorAll('.iconImg');

    iconesSupprimer.forEach((icone) => {
        icone.addEventListener('click', async function(event) {
            let bouton = event.target;
            const figureParent = bouton.closest('figure');

            if (figureParent) {
                const projectId = figureParent.dataset.projectId; // Ajoutez une data attribute pour stocker l'ID du projet
                try {
                    const response = await fetch(`http://localhost:5678/api/works/${projectId}`, {
                        method: 'DELETE',
                    });

                    if (response.ok) {
                        // Suppression côté serveur réussie
                        figureParent.remove();
                        // Vous pouvez également mettre à jour votre liste de projets en actualisant monProjets
                    } else {
                        console.error('Échec de la suppression côté serveur');
                    }
                } catch (error) {
                    console.error('Une erreur s\'est produite lors de la suppression :', error);
                }
            }
        });
    });
}

suprimer_photo();
*/
});
