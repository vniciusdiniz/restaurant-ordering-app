import { menuArray } from "./data.js"

const menuEl = document.querySelector("#menu")
const orderDetailsEl = document.querySelector("#order-details")
const itemsListEl = document.querySelector("#items-list")
const totalPriceEl = document.querySelector("#total-price")
const paymentEl = document.querySelector("#payment")

let listOrderItems = []

const menuHtml = menuArray.map(function(item){

        const containerE = document.createElement("div")
        containerE.className = "container"
        const itemIconE = document.createElement("div")
        itemIconE.className = "item-icon"
        itemIconE.textContent = `${item.emoji}`
        containerE.append(itemIconE)

        const itemDetailsE = document.createElement("div")
        itemDetailsE.className = "item-details"

        const itemNameE = document.createElement("h4")
        itemNameE.className = "item-name"
        itemNameE.textContent = `${item.name}`
        itemDetailsE.append(itemNameE)

        const itemIngredientsE = document.createElement("p")
        itemIngredientsE.className = "item-ingredients"
        itemIngredientsE.textContent = `${item.ingredients}`
        itemDetailsE.append(itemIngredientsE)

        const itemPriceE = document.createElement("p")
        itemPriceE.className = "item-price"
        itemPriceE.textContent = `$${item.price}`
        itemDetailsE.append(itemPriceE)

        containerE.append(itemDetailsE)

        const addItemE = document.createElement("button")
        addItemE.className = "add-item"
        addItemE.id = `add-${item.id}`
        addItemE.textContent = "+"
        containerE.append(addItemE)

        return containerE.outerHTML
    }).join('')

menuEl.innerHTML = menuHtml


document.addEventListener('click', (e) =>{

    if (e.target.id == "place-order"){
        paymentEl.style.display = 'inline'
    } else if (e.target.id == "card-details-btn"){
        orderDetailsEl.innerHTML = `<div class="thanks"> Thanks your order is on its way!
                                    </div>`
        paymentEl.style.display = 'none'
    } else{
        for (let item of menuArray){

            if ( e.target.id == `add-${item.id}`){
                orderDetailsEl.style.display = "flex"
                updateOrderDetails(item, true)
            }
            else if (e.target.id == `remove-${item.id}`){
                updateOrderDetails(item, false)
            }
        }
    }
})


function updateOrderDetails(item, addItem){

    if (addItem){
        listOrderItems.push(item)
    } else {//remove
        listOrderItems = arrayRemove(item)
        if (!listOrderItems.length){
            orderDetailsEl.style.display = "none"
        }
    }
    
    renderOrder()
}

// Using filter method eto create a remove method 
function arrayRemove(itemVal) {
    const idx = listOrderItems.indexOf(itemVal)


	return listOrderItems.filter(function (elem, i) { 
		return i !== idx; 
	});
}


//renderOrder
function renderOrder(){
    let total = 0;
    itemsListEl.innerHTML = ""
    listOrderItems.forEach( (item) => {
        itemsListEl.innerHTML +=  
            `<div class="item-order"
                <span id="item-name">${item.name}</span>
                <span class="item-remove" id="remove-${item.id}">remove</span>
                <span class="item-price" id="item-price">$${item.price}</span>
            </div>`
        total += item.price;
    })

    totalPriceEl.innerHTML = `<div class="total-price">Total price: 
                                $${total} 
                            </div>`
}