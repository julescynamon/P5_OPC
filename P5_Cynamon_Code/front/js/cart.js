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
    

