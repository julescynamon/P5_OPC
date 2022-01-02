const cart = [];

retrieveItemsFromLocalStorage();

function retrieveItemsFromLocalStorage() {

    const numberOfItems = localStorage.lenght;

    for (let i = 0; i < numberOfItems.length; i++) {

        const items = localStorage.getItem(localStorage.key[i]);
        const itemsObject = JSON.parse(items);
        cart.push(itemsObject);

    }

}