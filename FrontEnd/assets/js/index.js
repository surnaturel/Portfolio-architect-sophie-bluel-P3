//import { afficheBoutonsModif } from "./index.js";
document.addEventListener("DOMContentLoaded", async function() {
    const isConnected = window.localStorage.getItem("isConnected");
    const token = window.localStorage.getItem("tokenLogin")
    let monProjets = window.localStorage.getItem('monProjets');
    let mesBoutons = window.localStorage.getItem('mesBoutons');
    let file = null;
    let newMonProjets = []; 
    if(monProjets === null){
        let reponse = await fetch('http://localhost:5678/api/works')
        monProjets = await reponse.json()
        let valeurProjets = JSON.stringify(monProjets);
        window.localStorage.setItem("monProjets", valeurProjets);
        //console.log(monProjets.length)

    }else{
        monProjets = JSON.parse(monProjets)
        //console.log(monProjets.length)
    }

    if(mesBoutons === null){
        let reponseBtn = await fetch('http://localhost:5678/api/categories')
        mesBoutons = await reponseBtn.json()
        let valeurButons = JSON.stringify(mesBoutons);
        window.localStorage.setItem("mesBoutons", valeurButons);

    }else{
        mesBoutons = JSON.parse(mesBoutons)
    }

    //console.log(mesBoutons)
    if (isConnected == "true") {
        //afficheBoutonsModif();
        // Faites d'autres actions nécessaires pour l'utilisateur connecté
        afficheBoutonsModif1()
        afficheBoutonsModif2()
        afficheProjets(monProjets)
        categoieOption(mesBoutons)
        photoAjouter()
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

        console.log('le nombre apres la supression ' + monProjets.length)

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
                elementModal.setAttribute('data-project-id', projet.id);
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
        iconDeleteModal()
        iconDeleteModalAjoutPhoto()
        //fermerModal3()
        
    }
    affichageModal()

    function iconDeleteModal(){
        let iconDeleteModal = document.querySelector('.iconDeleteModal')
        iconDeleteModal.addEventListener('click', function(){
            modale.style.display = 'none'
        })
    }

    async function suprimer_photo() {
        let iconesSupprimer = document.querySelectorAll('.iconImg');

        iconesSupprimer.forEach((icone) => {
            icone.addEventListener('click', async function(event) {
                let bouton = event.target;
                const figureParent = bouton.closest('figure');

                if (figureParent) {
                    const configDelete = confirm("Êtes-vous sûr de vouloir supprimer cette photo ?"); // Demande une confirmation
                    if(configDelete){
                        const projectId = figureParent.dataset.projectId; // Ajoutez une data attribute pour stocker l'ID du projet
                        try {
                            const response = await fetch(`http://localhost:5678/api/works/${projectId}`, {
                                method: 'DELETE',
                                headers: {
                                    'Authorization': `Bearer ${token}`
                                }
                            });

                            if (response.ok) {
                                console.log(token)
                                // Suppression côté serveur réussie
                                figureParent.remove();
                                // Vous pouvez également mettre à jour votre liste de projets en actualisant monProjets
                                const modifResponse = await fetch('http://localhost:5678/api/works');
                                monProjets = await modifResponse.json();
                                let modifProjets = JSON.stringify(monProjets);
                                window.localStorage.setItem("monProjets", modifProjets);
                                afficheProjets(monProjets);
                            } else {
                                console.error('Échec de la suppression côté serveur');
                            }
                        } catch (error) {
                            console.error('Une erreur s\'est produite lors de la suppression :', error);
                        }
                    }
                }
            });
        });
    }
    function photoAjouter(){
        let photoAjouter = document.querySelector('#photoAjouter')
        photoAjouter.addEventListener('click', function(){
            let modalWrapper = document.querySelector('.modal-wrapper')
            let modalAjoutPhoto = document.querySelector('.modalAjoutPhoto')
            modalWrapper.style.display = 'none'
            modalAjoutPhoto.style.display = 'flex'
        })
    }
    //suprimer_photo();
    function categoieOption(mesBoutons){
        let btnOption = document.getElementById("categorie")
        mesBoutons.forEach(optionCat => {
            let optionc = document.createElement('option')
            //console.log(optionCat)
            optionc.value = optionCat.name
            optionc.innerText = optionCat.name
            //console.log(optionCat.name)
            optionc.setAttribute('data-project-id', optionCat.id)

            btnOption.appendChild(optionc)
        })
    }
    function iconDeleteModalAjoutPhoto(){
        let iconDeleteModalAjoutPhoto = document.querySelector('.iconDeleteModalAjoutPhoto')
        iconDeleteModalAjoutPhoto.addEventListener('click', function(){
            modale.style.display = 'none'
            let modalWrapper = document.querySelector('.modal-wrapper')
            let modalAjoutPhoto = document.querySelector('.modalAjoutPhoto')
            modalWrapper.style.display = 'flex'
            modalAjoutPhoto.style.display = 'none'
        })
    }
    function fermerModal3(){
        let fermerModal3 = document.querySelector('.modal')
        fermerModal3.addEventListener('click', function(){
            modale.style.display = 'none'
        })
    }
    function newPhoto() {
        // Sélectionnez le bouton "Ajouter Photo"
        const ajouterPhotoBtn = document.getElementById('ajouterPhotoBtn');
        // Sélectionnez l'élément qui contiendra la nouvelle image
        const newImageContainer = document.querySelector('.newImage');
        // Sélectionnez l'élément input de type "file"
        const inputImage = document.getElementById('inputImage');
        // selectionez l'element figure 'figureNew'
        const figureNew = document.querySelector('.figureNew')

        // Ajoutez un gestionnaire d'événements au bouton "Ajouter Photo"
        ajouterPhotoBtn.addEventListener('click', () => {
            // Déclenchez un clic sur l'élément input de type "file"
            inputImage.click();
        });

        // Ajoutez un gestionnaire d'événements au changement de l'input de type "file"
        inputImage.addEventListener('change', () => {
            file = inputImage.files[0];
            
            if (file) {
                if (file.size < 40000000 && (file.type === 'image/jpeg' || file.type === 'image/png')) {
                    // Cacher les éléments inutiles et afficher la nouvelle image
                    ajouterPhotoBtn.style.display = 'none';
                    figureNew.style.display = 'none';
                    document.querySelector('.caracteristiquePhoto').style.display = 'none';
                    newImageContainer.style.display = 'block';
                    
                    // Créer un élément img pour afficher la nouvelle image
                    const newImage = document.createElement('img');
                    newImage.src = URL.createObjectURL(file);
                    newImageContainer.appendChild(newImage);

                    
                }
                updateSubmitButtonState();
            }
        });
    }

    // Appeler la fonction pour activer la gestion de l'ajout de photo
    newPhoto();

    function updateSubmitButtonState() {
        const titreInput = document.getElementById('titre');
        const categorieSelect = document.getElementById('categorie');
        const validerButton = document.querySelector('.btnValidation');
        const newImageContainer = document.querySelector('.newImage');
        console.log('updateSubmitButtonState() appelée')
        // Vérifiez si les champs titre et categorie sont remplis
        const titreValide = titreInput.value.trim() !== '';
        const categorieValide = categorieSelect.value.trim() !== '';
    
        // Vérifiez si une image a été ajoutée
        const imageAjoutee = newImageContainer.querySelector('img') !== null;
    
        // Activez ou désactivez le bouton Valider en fonction de l'état des champs et de la présence de l'image
        validerButton.disabled = !(titreValide && categorieValide && imageAjoutee);
        console.log('Titre :', titreInput.value);
        console.log('Categorie :', categorieSelect.value);
        console.log('Bouton Valider désactivé :', validerButton.disabled);
        if (titreValide && categorieValide && imageAjoutee) {
            validerButton.style.backgroundColor = 'blue';
        } else {
            // Sinon, définissez la couleur de fond sur sa valeur par défaut
            validerButton.style.backgroundColor = '#A7A7A7'; // Vous pouvez utiliser une autre couleur par défaut si vous le souhaitez
        }
    }
    
    function sendPhoto(){
        const form = document.getElementById('photoImage');
        document.getElementById('titre').addEventListener('input', updateSubmitButtonState);
        document.getElementById('categorie').addEventListener('change', updateSubmitButtonState);
        updateSubmitButtonState()
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Récupérez le token d'autorisation depuis le local storage
            const token = window.localStorage.getItem("tokenLogin");
            const titreInput = document.getElementById('titre');
            const categorieSelect = document.getElementById('categorie');
            console.log(categorieSelect)
            const laReponse = document.querySelector('.reponse');

            const formData = new FormData();
            formData.append('titre', titreInput.value);
            formData.append('categorie', categorieSelect.value);
            formData.append('image', file);
           
            try {
                const response = await fetch('http://localhost:5678/api/works', {
                    method: "POST",
                    body: formData,
                    headers: {
                    // Ajoutez l'en-tête d'autorisation avec le token
                    "Authorization": `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    // Réponse réussie du serveur, vous pouvez gérer la réponse ici.
                    const newResponse = await fetch('http://localhost:5678/api/works');
                    const newMonProjets = await newResponse.json();
                    const valeurProjets = JSON.stringify(newMonProjets);
                    window.localStorage.setItem("monProjets", valeurProjets);
                    console.log(newMonProjets.length);
                    console.log("Données envoyées avec succès.");
                    // Affichez une réponse à l'utilisateur
                    laReponse.textContent = "Données envoyées avec succès.";
                    inputImage.value = '';
                    /*console.log('Fichier sélectionné :', file.name);
                    console.log('Taille du fichier :', file.size, 'octets');
                    console.log('Type de fichier :', file.type);*/
                    
                    
                } else {
                    console.error("Erreur lors de l'envoi de données au serveur.");
                    // Affichez une erreur à l'utilisateur
                    document.querySelector(".reponse").textContent = "Erreur lors de l'envoi des données.";
                }
            } catch (error) {
              console.error("Erreur lors de l'envoi de données au serveur : ", error);
              // Affichez une erreur à l'utilisateur
              document.querySelector(".reponse").textContent = "Erreur lors de l'envoi des données.";
            }
        });
    }
    sendPhoto()
});
