const addButton = document.querySelector('.add-button');
const productListArea = document.querySelector('.product-list-area');
const totalQuantityElement = document.querySelector('.total-quantity');
const totalPriceElement = document.querySelector('.total-price');


let totalQuantity = 0
let totalPrice = 0
let products = JSON.parse(localStorage.getItem("products")) || []

addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        addProduct()
    }
})

addButton.addEventListener('click', addProduct)


function addProduct() {
    const nameInput = document.querySelector('.product-name')
    const priceInput = document.querySelector('.product-price')
    console.log(products);


    const productName = nameInput.value.trim();
    const productPrice = parseFloat(priceInput.value.trim());

    if (productName === '' || !/^[0-9]+$/.test(priceInput.value) ) {
        alert('Zəhmət olmasa, məhsulun adını və qiymətini duzgun daxil edin.');
        return;
    }

    const product = {
        name: productName,
        price: productPrice
    }


    products.push(product)
    renderProductList();
    totalElements();
    savedProducts();

    nameInput.value = '';
    priceInput.value = '';


}


productListArea.addEventListener("click", (e) => {
    if (e.target.tagName.toUpperCase() === "BUTTON") {
        const index = Array.from(document.querySelectorAll('.delete-button')).indexOf(e.target);
        products.splice(index, 1);
        renderProductList();
        totalElements();
        savedProducts();
    }
});

function totalElements() {
    const totalQuantity = products.length;
    const totalPrice = products.reduce((sum, product) => sum + product.price, 0);

    totalQuantityElement.textContent = totalQuantity;
    totalPriceElement.textContent = `${totalPrice} AZN`;

}




function savedProducts() {
    localStorage.setItem("products", JSON.stringify(products))
}

function renderProductList() {
    productListArea.innerHTML = "",
        products.forEach((product) => {
            productListArea.innerHTML += `
     <div class="inputs">
            <input type="text" value="${product.name} (${product.price}AZN)" placeholder="Product" ">
            <button class="delete-button" >Sil</button>
        </div>
    `
        })

    totalElements()
}

renderProductList()
totalElements()





