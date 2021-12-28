let canapData = [];

// Récupération des articles de l'API

const fetchCanap = async () => {
        await fetch("http://localhost:3000/api/products")
        .then((reponse) => reponse.json())
        .then((promise) => {
            canapData = promise;
            // console.log(canapData);
        })
        // mise en place d'une fonction en cas d'erreur d'affichage
        .catch((error) => {
            let seeItems = document.querySelector(".items");
            seeItems.innerHTML ="Impossible d'afficher nos produits, erreur requete API. Veuillez réessayer dans quelques instants <br>Si le problème persiste, contactez-nous.";
            seeItems.style.textAlign = "center";
            seeItems.style.padding = "30vh 0";
        });
};

// Répartition des données de l'API dans le DOM

const canapDisplay = async () => {

    await fetchCanap();
    
    // Insertion des données de l'API dans le DOM
    document.getElementById("items").innerHTML = canapData.map(
        (canap) =>
                `
                    <a href="./product.html?id=${canap._id}" class="link-Product">
                    <article>
                        <img src="${canap.imageUrl}" alt="${canap.altTxt}">
                        <h3 class="productName">${canap.name}</h3>
                        <p class="productDescription">${canap.description}</p>
                    </article>
                    </a>
                `
    ).join("");
};

// Affichage des donnees de l'API sur le navigateur

canapDisplay();
