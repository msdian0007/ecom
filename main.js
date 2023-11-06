const cardContainer = document.querySelector('.card_container')

var products = []
let card

//Products Render
function renderData(products) {
    if (products.length > 0) {
        card = products.map((product) => {
            return (
                `<div class="card" id="${product.id}">` +
                `<img src="${product.image}" alt="">` +
                `<h4 class='title'>${product.title}</h4>` +
                `<p class='price'>&#36;${product.price}</p>` +
                `<p class='category'>${product.category}</p>` +
                // `<p class='description'>${product.description}</p>` +
                `<button class='cart_button' onclick='addToCartFun(${product.id})'>ADD TO CART</button>` +
                `</div>`
            )
        })
        cardContainer.innerHTML = card.join('\n')
    } else {
        const cardContainerEle = document.querySelector('.card_container')
        cardContainerEle.innerHTML = 'No Product Found!'
    }
}

//Fetch Data (API)
fetch('https://fakestoreapi.com/products')
    .then((response) => response.json())
    .then((resp) => {
        products.push(...resp)
        renderData(resp)
    })

//Manage Cart-Items    
let cartItems = []
function addToCartFun(id) {
    const oldCartItems = JSON.parse(localStorage.getItem('cart'))
    const isItemsIn = oldCartItems?.some((pid) => pid === id)
    if (!isItemsIn) {
        cartItems.push(id)
        localStorage.setItem('cart', JSON.stringify(cartItems))
    }
    showCartLit()
}

//Render CartList
function showCartLit() {
    const cartItemEle = document.querySelector(".cart_items")
    let cartItems = JSON.parse(localStorage.getItem('cart'))
    if (cartItems?.length > 0) {
        const cartList = products.filter((product) => {
            return cartItems.some((id) => id === product.id)
        })
        const cartEle = cartList.map((item) => {
            return (
                `<div class="cart_card" id='${item.id}'>` +
                ` <img src="${item.image}" alt="">` +
                `<h5>${item.title}</h5>` +
                ` <p>&#36;${item.price}</p>` +
                ` </div>`
            )
        })
        cartItemEle.innerHTML = cartEle.join("\n")
    }
}

//Product-Search
const searchInputEle = document.querySelector('#search_input')
searchInputEle.addEventListener("input", (event) => {
    let keyWord = event.target.value
    const SearchedProduct = products.filter((pro) => {
        return Object.values(pro).join(' ').toLowerCase().includes(keyWord.toLowerCase())
    })
    if (SearchedProduct.length > 0) {
        renderData(SearchedProduct)
    } else {
        renderData([])
    }
})

function openCartView() {
    showCartLit()
    const cartItemEle = document.querySelector(".cart_items")
    classArray = cartItemEle.className
    if (classArray.includes("show_cart_items")) {
        cartItemEle.classList.remove("show_cart_items")
    } else {
        cartItemEle.classList.add("show_cart_items")
    }
}
