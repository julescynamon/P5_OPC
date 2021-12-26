let canapData = [];

// Récupération des articles de l'API

const fetchCanap = async () => {
    await fetch("http://localhost:3000/api/products")
        .then((reponse) => reponse.json())
        .then((promise) => {
        canapData = promise;
        // console.log(canapData);
        });
};

// Répartition des données de l'API dans le DOM

const canapDisplay = async () => {

    await fetchCanap();

    // Insertion des données de l'API dans le DOM
    document.getElementById("items").innerHTML = canapData.map(
        (canap) =>
        `
                    <a href="./product.html?id=${canap._id}">
                    <article>
                        <img src="${canap.imageUrl}" alt="${canap.altTxt}">
                        <h3 class="productName">${canap.name}</h3>
                        <p class="productDescription">${canap.description}</p>
                    </article>
                    </a>
                `
    );
};
// Affichage des donnees de l'API sur le navigateur

canapDisplay();
