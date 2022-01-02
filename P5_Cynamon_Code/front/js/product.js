let params = new URL(document.location).searchParams;
let id = params.get("id");

const button = document.getElementById("addToCart");

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

const displayProduct = async () => {
    await fetchProduct();
    // Mise en place de mon produit dans le DOM
    document.querySelector(".item__img").innerHTML = `
            <img src=${productData.imageUrl} alt="${productData.altTxt}">
            `;
    document.getElementById("title").innerHTML = `${productData.name}`;
    document.getElementById("price").innerHTML = `${productData.price}`;
    document.getElementById(
        "description"
    ).innerHTML = `${productData.description}`;

    // Implementation de la selection de couleur

    let select = document.getElementById("colors");

    productData.colors.forEach((color) => {
        let option = document.createElement("option");
        option.innerHTML = `${color}`;
        option.value = `${color}`;

        select.appendChild(option);
    });

    addBasket(productData);
};

displayProduct();

// Fonction ajout au panier et envoie dans le local storage

const addBasket = () => {
    button.addEventListener("click", () => {
    // recuperation de la couleur
    const idcolor = document.getElementById("colors");
    const colorChoice = idcolor.value;

    // recuperation de la quantité
    const idQuantity = document.getElementById("quantity");
    const quantityChoice = idQuantity.value;

    if (quantityChoice > 0 && quantityChoice <= 100) {
        // Création du produits qui sera mis dans le panier
        let choiceOfProduct = {
            idProduct: id,
            colorProduct: colorChoice,
            quantityProduct: Number(quantityChoice),
            nameProduct: productData.name,
            priceProduct: productData.price,
            descriptionProduct: productData.description,
            imgProduct: productData.imageUrl,
            altImgProduct: productData.altTxt,
        };

        // tableau du local storage
        let arrayProduct = JSON.parse(localStorage.getItem("product"));

        //fenêtre pop-up
        const popupConfirmation = () => {
            if (
            window.confirm(
                `Votre commande de ${quantityChoice} ${productData.name} ${colorChoice} est ajoutée au panier ! Pour consulter votre panier, cliquez sur OK`
            )
            ) {
            window.location.href = "cart.html";
            }
        };

        // importation dans le localStorage
        if (arrayProduct == null) {
            // si le panier est vide
            arrayProduct = [];
            arrayProduct.push(choiceOfProduct);
            localStorage.setItem("product", JSON.stringify(arrayProduct));
            popupConfirmation();
        } else if (arrayProduct) {
          // si le panier contient déjà 1 article
            const resultFind = arrayProduct.find(
                (e) => e.idProduct === id && e.productColor === colorChoice
            );

            if (resultFind) {
                let newQuantity =
                parseInt(choiceOfProduct.quantityProduct) +
                parseInt(resultFind.quantityProduct);
                resultFind.quantityProduct = newQuantity;
                localStorage.setItem("product", JSON.stringify(arrayProduct));
                popupConfirmation();
            } else {
                // si le produit clicker n'est pas dans le panier
                arrayProduct.push(choiceOfProduct);
                localStorage.setItem("product", JSON.stringify(arrayProduct));
                popupConfirmation();
            }
        }
        }
    });
};
