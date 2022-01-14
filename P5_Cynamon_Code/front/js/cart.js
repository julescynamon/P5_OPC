let arrayProduct = JSON.parse(localStorage.getItem("product"));
console.table(arrayProduct);
const emptyCart = document.getElementById("cart__items");
const orderButton = document.getElementById("order");
const form = document.querySelector(".cart__order__form");


/**
 * Description
 * creation du panier
 * @returns {Array.<String>}
*/    
    function createBasket() {
      // si le panier est vide
        if (arrayProduct == null) {
            const createEmptyCart = `<p>Votre panier est vide</p>`;
            emptyCart.innerHTML = createEmptyCart;
        } else {
            // si le panir est plein
            let cardBasket = "";

            for (i = 0; i < arrayProduct.length; i++) {
            cardBasket += `
                    <article class="cart__item" data-id="${arrayProduct[i].idProduct}" data-color="${arrayProduct[i].colorProduct}">
                            <div class="cart__item__img">
                            <img src="${arrayProduct[i].imgProduct}" alt="${arrayProduct[i].altImgProduct}">
                            </div>
                            <div class="cart__item__content">
                            <div class="cart__item__content__description">
                                <h2>${arrayProduct[i].nameProduct}</h2>
                                <p>${arrayProduct[i].colorProduct}</p>
                                <p>${arrayProduct[i].priceProduct} €</p>
                            </div>
                            <div class="cart__item__content__settings">
                                <div class="cart__item__content__settings__quantity">
                                <p>Qté : </p>
                                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${arrayProduct[i].quantityProduct}">
                                </div>
                                <div class="cart__item__content__settings__delete">
                                <p class="deleteItem">Supprimer</p>
                                </div>
                            </div>
                            </div>
                        </article>
                    `;
            }

            // om injecte notre panier dans le html
            emptyCart.innerHTML = cardBasket;
        }
    }
    
    createBasket();

        

/**
 * Description
 * function pour modifier la quantite
 * @returns {HTMLElements}
 */        
    function modifQuantity () {

            let modif = document.querySelectorAll( ".itemQuantity" );

            for (let j = 0; j < modif.length; j++) {
                
                modif[j].addEventListener("change", (el => {
                    el.preventDefault();

                    // recuperation de l'élément á changer par rapport á son id et sa couleur
                    let quantityModif = arrayProduct[j].quantityProduct;
                    let valueQuantityModif = modif[j].valueAsNumber;

                    const result = arrayProduct.find(element => element.valueQuantityModif !== quantityModif);

                    result.quantityProduct = valueQuantityModif;
                    arrayProduct[j].quantityProduct = result.quantityProduct;

                    localStorage.setItem("product", JSON.stringify(arrayProduct));

                    
                    totalItem();

                }) ) 

            }

        }
        
        modifQuantity(); 

/**
 * Description
 * Fonction pour supprimer un produit
 * @returns {any}
 */         
        function deleteProduct () {
            
            let deleteP = document.querySelectorAll(".deleteItem");

            for (let k = 0; k < deleteP.length; k++) {
                
                deleteP[k].addEventListener("click", (e => {
                    e.preventDefault();

                    // recuperation de l'element a supprimer selon son id et sa couleur
                    let deleteId = arrayProduct[k].idProduct;
                    let deleteColor = arrayProduct[k].colorProduct;

                    arrayProduct = arrayProduct.filter(
                        (el) =>
                        el.idProduct != deleteId || el.colorProduct != deleteColor
                    );

                    localStorage.setItem("product", JSON.stringify(arrayProduct));

                    alert("Votre produit a bien été supprimer du panier !");

                    location.reload();

                }))
                
            }

        }

        deleteProduct();
        

/**
 * Description
 * Fonction pour recuperer la quantite total et le prix total
 * @returns {any}
 */         
        function totalItem (){

            // recuperation du total de quantity
            let elmentsQuantity = document.getElementsByClassName("itemQuantity");
            let Lengthelments = elmentsQuantity.length;
            totalQuantity = 0;

            for (let l = 0; l < Lengthelments; ++l) {

                totalQuantity += elmentsQuantity[l].valueAsNumber;

            }

            let itemTotalQuantity = document.getElementById("totalQuantity");
            itemTotalQuantity.innerHTML = totalQuantity;
            
            // recuperation du prix total
            totalPrice = 0

            for (let m = 0; m < Lengthelments; m++) {

                totalPrice += ( elmentsQuantity[m].valueAsNumber * arrayProduct[m].priceProduct  );

            }

            let totalPriceProduct = document.getElementById("totalPrice");
            totalPriceProduct.innerHTML = totalPrice;

        }

        totalItem();


        //-------------------- Mise en place du formulaire -----------------------

        orderButton.addEventListener("click", (e) => submitForm(e));

        

/**
 * Description
 * fonction pour envoyer le formulaire dans le local storage au click du boutton
 * @param {HTMLElement} e
 * @returns {response}
 */         
        function submitForm(e) {
            
            e.preventDefault();

            if (arrayProduct === null) {
                alert("Veuillez choisir un produit à commander s'il vous plait !");
                return;
            }
            
            if (invalidInput()) {
                alert ("veuillez remplir tous les champs")
                return;
            };

            if (checkName("firstName", "firstNameErrorMsg", "votre prenom n'est pas valide")) {
                return;
            }

            if (checkName("lastName", "lastNameErrorMsg", "Votre nom n'est pas valide")){
                return;
            }

            if (checkAdressCity( "address", "addressErrorMsg", "Votre adresse doit être valide")) {
                return;
            }
            if ( checkAdressCity( "city", "cityErrorMsg", "Votre ville doit être valide")) {
                return;
            }
            if (checkEmail()) {
                return;
            }

            const body = requestTheBody();

            fetch("http://localhost:3000/api/products/order", {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                    "Content-Type": "application/JSON"
                }
                })
                .then((response) => response.json())
                .then((data) => {
                    
                    localStorage.setItem("orderId", data.orderId);
                    document.location.href = "confirmation.html";

                })
                .catch((error) => {
                    alert("Probleme avec fetch" + error.message);
                })
        }

        

/**
 * Description
 * Fonction pour creer le tableau d'infos clients a envoyer dans le localStorage
 * @returns {Array.<String|Object>}
 */         
        function requestTheBody() {

            //Récupération des coordonnées du formulaire client
            let Name = document.getElementById("firstName");
            let LastName = document.getElementById("lastName");
            let Adress = document.getElementById("address");
            let City = document.getElementById("city");
            let Mail = document.getElementById("email");

            //Construction d'un array depuis le local storage
            let totalIdProducts = [];

            for (let n = 0; n < arrayProduct.length; n++) {
                totalIdProducts.push(arrayProduct[n].idProduct);
            }

            const body = {
                contact: {
                    firstName: Name.value,
                    lastName: LastName.value,
                    address: Adress.value,
                    city: City.value,
                    email: Mail.value,
                },
                products: totalIdProducts,
            };

            return body;
        }
        

    /**
     * Description
     * Fonction  au cas ou l'utilisateur ne rentre pas tous les champs de saisie
     * @returns {sring}
     */         
    function invalidInput() {
            
            const input = Array.from(form.querySelectorAll("input"));

        return input.find ((input) => {
            return input.value == ""
        })
    }
        

    /**
     * Description
     * Fonction qui vas controler à l'aide des regex si l'entree du prenom et du nom est bonne
     * @param {string} inputSelector
     * @param {string} errorSelector
     * @param {string} message
     * @returns {string}
     */         
        function checkName(inputSelector, errorSelector, message) {
            
            const inputValue = document.getElementById(inputSelector).value;
            const regexName = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;
            // j'ai chercher ce regex 
            if (regexName.test(inputValue) === false) {
                document.getElementById(errorSelector).innerHTML = message;
                return true;
            } 
            return false;
        }

    /**
     * Description
     * Fonction qui vas controler à l'aide des regex si l'entree de l'adresse et de la ville est bonne
     * @param {string} inputSelectorAdress
     * @param {string} errorAdressSelector
     * @param {string} adressCityMessage
     * @returns {string}
     */         
        function checkAdressCity(inputSelectorAdress, errorAdressSelector, adressCityMessage) {
            const addressOfLife = document.getElementById(inputSelectorAdress).value;
            const regexAddressOfLife = /^[a-zA-Z0-9\s,.'-]{3,}$/; 

            if (regexAddressOfLife.test(addressOfLife) === false) {
                document.getElementById(errorAdressSelector).innerHTML = adressCityMessage;
                return true;
            }
            return false;
        }
        
/**
 * Description
 * Fonction qui vas controler à l'aide des regex si l'entree de l'email est bonne
 * @returns {string}        
 */ 
        function checkEmail() {
            const email = document.getElementById("email").value;
            const regexEmail = /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/;
            
            if (regexEmail.test(email) === false) {
                document.getElementById("emailErrorMsg").innerHTML = 
                "Votre email doit être valide";
                return true;
            }
            return false;
        }