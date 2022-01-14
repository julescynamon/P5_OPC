/**
 * Description
 * Fonction pour recuperer l'id de la commande et l'afficher
 * @returns {any}
 */

function displayOrderId(){

    const orderId = document.getElementById("orderId");
    orderId.innerText = localStorage.getItem("orderId");
    localStorage.clear();

}

displayOrderId();
