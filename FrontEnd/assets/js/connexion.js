import { affichageModal } from 'index.js' ;


const form = document.getElementById("formulaire");
const errorMessage = document.getElementById("err");

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    
    const email = form.email.value;
    const motDePasse = form.motPasse.value;
    let data = {
        email: email,
        password: motDePasse
      }
      console.log(data)
    try {
        const response = await fetch('http://localhost:5678/api/users/login', {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            // La requête a réussi, rediriger vers la page de succès ou faire autre chose
            console.log(response.ok)
            console.log(response)
            const responseData = await response.json();
            const token = responseData.token;
            // Stocker le token dans le local storage
            if(token){
                window.localStorage.setItem("tokenLogin", token);
                console.log("Token récupéré :", token);
                affichageModal()
            }
            
            
            
        } else {
            // La requête a échoué, afficher un message d'erreur
            errorMessage.textContent = "Erreur dans l'identifiant ou le mot de passe";
        }
    } catch (error) {
        // Une erreur s'est produite lors de la requête, afficher un message d'erreur
        errorMessage.textContent = "Une erreur s'est produite, veuillez réessayer plus tard.";
    }
});