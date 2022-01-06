let arrayProduct = JSON.parse(localStorage.getItem("product"));
console.table(arrayProduct);
const emptyCart = document.getElementById("cart__items");

    // si le panier est vide
    if (arrayProduct == null) {
            const createEmptyCart = `<p>Votre panier est vide</p>`;
            emptyCart.innerHTML = createEmptyCart;
    } else {

        // si le panir est plein
        let cardBasket = []

        for (i = 0; i < arrayProduct.length; i++) {
            cardBasket = cardBasket +`
            <ar article class="cart__item" data-id="${arrayProduct[i].idProduct}" data-color="${arrayProduct[i].colorProduct}">
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
            // om injecte notre panier dans le html
            emptyCart.innerHTML = cardBasket;
        }
        
        
    }
    
        // function pour modifier la quantite

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

                    location.reload();


                }) ) 

            }

        }
        
        modifQuantity();

        // Fonction pour supprimer un produit

        function deleteProduct () {
            
            let deleteP = document.querySelectorAll(".deleteItem");

            for (let k = 0; k < deleteP.length; k++) {
                
                deleteP[k].addEventListener("click", (e => {

                    e.preventDefault();

                    // recuperation de l'element a supprimer selon son id et sa couleur
                    let deleteId = arrayProduct[k].idProduct;
                    let deleteColor = arrayProduct[k].colorProduct;

                    arrayProduct = arrayProduct.filter(el => el.idProduct != deleteId || el.colorProduct != deleteColor);

                    localStorage.setItem( "product", JSON.stringify(arrayProduct));

                    alert("Votre produit a bien été supprimer du panier !")
                    location.reload();

                }))
                
            }

        }

        deleteProduct();

        // Fonction pour recuperer la quantite total et le prix total

        function totalItem (){

            // recuperation du total de quantity
            let elmentsQuantity = document.querySelector(".itemQuantity");
            let Lengthelments = elmentsQuantity.length;
            totalQuantity = 0;

            for (let l = 0; l < Lengthelments.length; ++l) {

                totalQuantity += elmentsQuantity[l].valueAsNumber;

            }

            let itemTotalQuantity = document.getElementById("totalQuantity");
            itemTotalQuantity.innerHTML = totalQuantity;
            

        }
totalItem();