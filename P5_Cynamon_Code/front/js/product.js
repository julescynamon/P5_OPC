let params = new URL(document.location).searchParams;
let id = params.get("id");

let productData = [];

const fetchProduct = async () => {
    await fetch(`http://localhost:3000/api/products/${id}`)
        .then((reponse) => reponse.json())
        .then((promise) => {
            productData = promise;
        })
      // mise en place d'une fonction en cas d'erreur d'affichage
        .catch((error) => {
            let seeItems = document.querySelector(".item");
            seeItems.innerHTML =
            "Impossible d'afficher nos produits, erreur requete API. Veuillez réessayer dans quelques instants <br>Si le problème persiste, contactez-nous.";
            seeItems.style.textAlign = "center";
            seeItems.style.padding = "30vh 0";
        });
};

const displayProduct = async() => {
    await fetchProduct();
    // Mise en place de mon produit dans le DOM
    document.querySelector(".item__img").innerHTML = `
    <img src=${productData.imageUrl} alt="${productData.altTxt}">
    `;
    document.getElementById("title").innerHTML = `${productData.name}`;
    document.getElementById("price").innerHTML = `${productData.price}`;
    document.getElementById("description").innerHTML = `${productData.description}`;

    // Implementation de la selection de couleur

        let colorSelect = document.getElementById("colors");
        for (let i = 0; i < productData.colors.length; i++) {
        let option = document.createElement("option");
        option.innerText = productData.colors[i];
        colorSelect.appendChild(option);
        }

} 

displayProduct();