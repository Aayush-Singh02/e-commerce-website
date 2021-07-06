let carts=document.querySelectorAll('.add-cart');
let products=[
    {
        name:'Red Printed Tshirt',
        tag:'product-1',
        price:30,
        inCart:0
    },
    {
        name:'Black Shoes',
        tag:'product-2',
        price:20,
        inCart:0
    },
    {
        name:'Black Lowers',
        tag:'product-3',
        price:10,
        inCart:0
    },
    {
        name:'Blue Tshirt',
        tag:'product-4',
        price:12,
        inCart:0
    },
    {
        name:'White Shoes',
        tag:'product-5',
        price:12,
        inCart:0
    },
    {
        name:'Black Printed Tshirt',
        tag:'product-6',
        price:12,
        inCart:0
    },
    {
        name:'Socks',
        tag:'product-7',
        price:12,
        inCart:0
    },
    {
        name:'Stylish Watch',
        tag:'product-8',
        price:12,
        inCart:0
    },
    {
        name:'Watch',
        tag:'product-9',
        price:12,
        inCart:0
    },
    {
        name:'X-Shoes',
        tag:'product-10',
        price:12,
        inCart:0
    },
    {
        name:'Casual Shoes',
        tag:'product-11',
        price:12,
        inCart:0
    },
    {
        name:'Casual Lowers',
        tag:'product-12',
        price:12,
        inCart:0
    }
];
for(let i=0;i<carts.length;i++)
{
    carts[i].addEventListener('click',function(){
       cartNumbers(products[i]);
       totalCost(products[i]);
    })
}


function cartNumbers(product){
let productNumbers=localStorage.getItem('cartNumbers');
productNumbers=parseInt(productNumbers);
if(productNumbers)
{
    localStorage.setItem('cartNumbers',productNumbers+1);
   
}
else{
    localStorage.setItem('cartNumbers',1);
  
}
setItems(product);
}
function setItems(product){
    let cartItems=localStorage.getItem('productsInCart');
    cartItems=JSON.parse(cartItems);
    if(cartItems!=null)
    {
        if(cartItems[product.tag]==undefined)
        {
            cartItems={
                ...cartItems,
                [product.tag]:product
            }
            cartItems[product.tag].inCart=1;
        }
        else
        cartItems[product.tag].inCart+=1
    }
    else{
        product.inCart=1;
        cartItems={
            [product.tag]:product
        }
    }
    localStorage.setItem('productsInCart',JSON.stringify(cartItems));
}
function totalCost(product){
    let cartCost=localStorage.getItem('totalCost');
    if(cartCost!=null){
        cartCost=parseInt(cartCost);
        localStorage.setItem('totalCost',cartCost+product.price);
    }
    else{
        localStorage.setItem('totalCost',product.price);
    }
}
function displayCart(){
let cartItems=localStorage.getItem('productsInCart');
cartItems=JSON.parse(cartItems);
let productContainer=document.querySelector(".products");
let cartCost=localStorage.getItem('totalCost');
if(cartItems && productContainer)
{
    productContainer.innerHTML='';
    Object.values(cartItems).map(item => {
        productContainer.innerHTML+=`
      <div class="product">
       <ion-icon name="close-circle"onclick="
       let price = ${item.price};
       let inCart = ${item.inCart};
        let tag = '${item.tag}';
        deleteItem(tag, inCart, price);"></ion-icon>
      <img src="./images/${item.tag}.jpg">
       <span class="t">${item.name}</span> 
        <div class="price">$${item.price},00</div>
          <div class="quantity">
          <ion-icon name="arrow-back-circle-outline"onclick="
      removeOne('${item.tag}', ${item.inCart}, ${item.price});"></ion-icon>
        <span>${item.inCart}</span>
          <ion-icon name="arrow-forward-circle-outline"onclick="
        addOne('${item.tag}', ${item.inCart}, ${item.price});"></ion-icon>
       </div>
 <div class="total">
 $${item.inCart*item.price},00
 </div>  
 </div>
     
        `
    });

  productContainer.innerHTML+=`
  <div class="basketTotalContainer">
    <h4 class="basketTotalTitle">Basket Total
     </h4>
   <h4 class="basketTotal">$${cartCost},00</h4>
 </div>`
}
else{
    productContainer.innerHTML='';
}
}

function button() {
    let productContainer=document.querySelector(".products");
    if(productContainer)
    {
    let btn = document.querySelector(".orderButton");
        btn.addEventListener('click', () => {
            if (localStorage.getItem('productsInCart') != null){
                btn.innerHTML = `
                <a href="/userdata" class="orderLink">Confirm Order</a>
                `  }
            else{
                alert('Your cart is empty.');
            }
        });
}
}
function deleteItem(itemTag, itemInCart, itemPrice){
    let container = localStorage.getItem('productsInCart');
    container = JSON.parse(container);
    // updates cart numbers
    let productNumbers = localStorage.getItem('cartNumbers')
    productNumbers = parseInt(productNumbers);
    localStorage.setItem('cartNumbers', productNumbers - itemInCart);
   
    // updates the total cost
    let cartCost = localStorage.getItem('totalCost');
    cartCost = parseInt(cartCost);
    localStorage.setItem('totalCost', cartCost - parseInt(itemInCart) * parseInt(itemPrice));
    delete container[itemTag];
    localStorage.setItem('productsInCart', JSON.stringify(container));
    location.reload();

}
function removeOne(itemTag,itemInCart,itemPrice){
    let container = localStorage.getItem('productsInCart');
     container = JSON.parse(container);
     let productNumbers = localStorage.getItem('cartNumbers')
     productNumbers = parseInt(productNumbers);
     localStorage.setItem('cartNumbers', productNumbers - 1);
   
     let cartCost = localStorage.getItem('totalCost');
     cartCost = parseInt(cartCost);
     localStorage.setItem('totalCost', cartCost - parseInt(itemPrice));
     if (container[itemTag].inCart > 1){
        container[itemTag].inCart -= 1;
        localStorage.setItem('productsInCart', JSON.stringify(container));
        location.reload();
    }else if (container[itemTag].inCart == 1){
        delete container[itemTag];
        localStorage.setItem('productsInCart', JSON.stringify(container));
        location.reload();
    };
    location.reload();
}
function addOne(itemTag, itemInCart, itemPrice){
     let container = localStorage.getItem('productsInCart');
     container = JSON.parse(container);
     if (container[itemTag].inCart > 0 && container[itemTag].inCart < 5){
        // updates cart numbers
            let productNumbers = localStorage.getItem('cartNumbers')
            productNumbers = parseInt(productNumbers);
            localStorage.setItem('cartNumbers', productNumbers + 1);
           
            let cartCost = localStorage.getItem('totalCost');
            cartCost = parseInt(cartCost);
            localStorage.setItem('totalCost', cartCost + parseInt(itemPrice));
            container[itemTag].inCart += 1;
            localStorage.setItem('productsInCart', JSON.stringify(container));
            location.reload();
        }else if (container[itemTag].inCart >= 5){
            alert('Sorry, you cannot buy more than 5.');
        }
        
        location.reload();
}

button();
displayCart();