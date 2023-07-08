const shop = document.querySelector('.shop');
const cartcon = document.querySelector('.cartcon');
const cartmodal = document.querySelector('.cartmodal');
const closebtn = document.querySelector('.x');
const addedcart = document.querySelector('.addedcart');
const cartBtn = document.querySelector('.cart'); 
const cartpromodal = document.querySelector('.cartpromodal'); 
const count = document.querySelector('.count');

let arr = [];


let totalPrice = 0;

cartBtn.addEventListener('click',()=>{
  if (cartpromodal.style.right === "-190%") {
    cartpromodal.style.right = "0";
    count.innerHTML = arr.length;
  } else{
    cartpromodal.style.right = "-190%";
    
  }
})


filterPro();
displayPro();

function filterPro() {
   const category = document.getElementById('categories');
 
   category.addEventListener("change", () => {
     let selectedCategory = category.value;
     console.log(selectedCategory);

     if (selectedCategory === 'all') {
        displayPro();
     } else {
       let url = 'https://fakestoreapi.com/products/category/';
 
       fetch(url + selectedCategory)
         .then(response => {
           return response.json();
         })
         .then(data => {
           // Clear the existing products from the shop element
           shop.innerHTML = "";
      
           data.forEach(product => {
             shop.innerHTML += `
               <div class="cardcontainer">
                 <div class="cardimg">
                   <img src="${product.image}" alt="">
                 </div>
                 <div class="content">
                   <p class="title">${product.title}</p>
                   <p class="desc" style = "display: none;">${product.description}</p>
                   <div class="prices">
                     <p class="rpice">₱ ${product.price}</p>
                     <p class="sold">12 sold</p>
                   </div>
                 </div>
                 <div class = "proBtn">
                   <button class="addcart" style ="color: black;">Add to cart</button>
                   <button class="buynow">Buy now</button>
                   </div>
               </div>
             `;
             displayInfo();
             addTOcart()
           });
         });
      }
   });
}

function displayPro() {
   fetch('https://fakestoreapi.com/products')
        .then(response => {
           return response.json();
        })
        .then(data => {
          shop.innerHTML = "";
          data.forEach(product => {   
            shop.innerHTML += `
              <div class="cardcontainer">
                <div class="cardimg">
                  <img src="${product.image}" alt="">
                </div>
                <div class="content">
                <p class="title">${product.title}</p>
                <p class="desc" style = "display: none;">${product.description}</p>
                  <div class="prices">
                    <p class="rpice">₱ ${product.price}</p>
                    <p class="sold">${product.rating.count} sold</p>
                  </div>
                </div>
                <div class = "proBtn">
                <button class="addcart" style ="color: black;">Add to cart</button>
                <button class="buynow">Buy now</button>
                </div>
              </div>
            `;
         
            displayInfo();
           
            addTOcart()
          });
        });
        count.innerHTML = arr.length;
}

function addTOcart() {
  
  const addCartButtons = document.querySelectorAll('.addcart');
  addCartButtons.forEach(button => {
    button.addEventListener('click', () => {
      const productTitle = button.parentNode.parentNode.querySelector(".title").textContent;
      const productPrice = button.parentNode.parentNode.querySelector(".rpice").textContent;
      const productImageSrc = button.parentNode.parentNode.querySelector('.cardimg img').getAttribute('src');
      let productExists = false;

      const existingProducts = document.querySelectorAll('.productModal');
      existingProducts.forEach(product => {
        const existingTitle = product.querySelector('.proname p').textContent;
        if (existingTitle === productTitle) {
          const countElement = product.querySelector('.countnum');
          const currentCount = parseInt(countElement.textContent);
          countElement.textContent = currentCount + 1;

          const priceElement = product.querySelector('.price');
          const currentPrice = parseFloat(priceElement.textContent.replace(/[^0-9.-]+/g, ''));
          const updatedPrice = currentPrice + parseFloat(productPrice.replace(/[^0-9.-]+/g, ''));
          priceElement.textContent = `Price:₱ ${updatedPrice.toFixed(2)}`;

         
          productExists = true;


        }

       
      });

      if (!productExists) {
        addedcart.innerHTML += `
          <div class="productModal">
            <div class="proImg">
              <img style ="width: 50px;"  src="${productImageSrc}" alt="" srcset="">
            </div>
            <div class="proContent">
              <div class="proname">
                <p style= "font-size : 10px;"  >${productTitle}</p>
              </div>
              <div class="proquantity">
                <div class="counter">
                  <button class="incre">+</button>
                  <p class="countnum">1</p>
                  <button class="decre">-</button>
                </div>
                <div class="price" style= "font-size : 10px;">Price: ${productPrice}</div>   
              </div>
            </div>
          </div>
        `;
        arr.push({
          productTitle
       })
       console.log(arr);
       count .innerHTML = arr.length;
        
        const addquantity = document.querySelectorAll('.incre');
        addquantity.forEach(button =>{
              button.addEventListener('click',()=>{
              const countElement = button.parentNode.parentNode.querySelector('.countnum');
               const currentCount = parseInt(countElement.textContent);
               countElement.textContent = currentCount + 1;
     
               const priceElement = button.parentNode.parentNode.querySelector('.price');
               const currentPrice = parseFloat(priceElement.textContent.replace(/[^0-9.-]+/g, ''));
               const updatedPrice = currentPrice + parseFloat(productPrice.replace(/[^0-9.-]+/g, ''));
               priceElement.textContent = `Price:₱ ${updatedPrice.toFixed(2)}`;


              })
        });

        const minusquantity = document.querySelectorAll('.decre');
        minusquantity.forEach(button =>{
          
              button.addEventListener('click',()=>{
              const countElement = button.parentNode.parentNode.querySelector('.countnum');
               const currentCount = parseInt(countElement.textContent);
               countElement.textContent = currentCount - 1;
     
               const priceElement = button.parentNode.parentNode.querySelector('.price');
               const currentPrice = parseFloat(priceElement.textContent.replace(/[^0-9.-]+/g, ''));
               const updatedPrice = currentPrice - parseFloat(productPrice.replace(/[^0-9.-]+/g, ''));
               priceElement.textContent = `Price:₱ ${updatedPrice.toFixed(2)}`;

               const cartItem = button.closest('.productModal');

               if (currentCount < 2) {
                 cartItem.parentNode.removeChild(cartItem);
                 arr.splice(0, 1);
                 console.log(arr.length);
                 count.innerHTML = arr.length;
               }

              })
              
        })


      }
      Swal.fire({
        icon: 'success',
        title: 'Added to cart',
        showConfirmButton: false,
        timer: 1500
      });
    });
  });
  
}





function displayInfo() {
 
  const cardcontainer = document.querySelectorAll('.cardcontainer');

  cardcontainer.forEach(container => {
  
    container.addEventListener("click", () => {
      cartmodal.style.marginTop = "5em";
      // cartcon.style.marginLeft = "20em";
      // Get the details of the selected product
      const productTitle = container.querySelector(".title").textContent;
      const productPrice = container.querySelector(".rpice").textContent;
      const productImageSrc = container.querySelector('.cardimg img').getAttribute('src');
      const productCount = container.querySelector('.sold').textContent;
      const description = container.querySelector('.desc').textContent;
      let html= `
      <div class="cartimg">
      <div class="x">
      <img style="width: 30px;" src="images/close.png" alt="" srcset="">
       </div>
      <img class = "cardimg" src="${productImageSrc}" alt="" srcset="">
      </div>
      <div class="cartinfo">
           <div class="proname">
              <p class ="title">${productTitle}</p>
           </div>
           <div class ="desc">
           <p>${description}</p>
           </div>
           <div class="proratings">
                  <div class="ratings">
                     <div class="starcount">
                      <p style="font-size: 14px;">3.4</p>
                      <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><style>svg{fill:#ebc400}</style><path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg>
                     </div>
                        <p style="font-size: 14px;">${productCount}</p>
                        
                  </div>
           </div>
           <div class="cartprice">
                  <p  class = "rprice" style="font-size: 20px; color: orangered;">${productPrice}</p>
           </div>
           <div class="cartbtn">
                   <button class="addcart" style ="color: black;">Add to cart</button>
                   <button class="buynow">Buy now</button>
           </div>
           
      </div>
       
      `;
      
      cartcon.innerHTML = html;
      
           const x = document.querySelector('.x');
 
            x.addEventListener('click', ()=>{
                cartmodal.style.marginTop = "-105em";
            })
                    
            
            addtocart2();
    });
  });
  
}


function addtocart2() {
  // const addCartButtons = document.querySelectorAll('.addcart');
  const cartcon = document.querySelectorAll('.cartcon');

  cartcon.forEach(container =>{
       const addCartButtons = container.querySelectorAll('.addcart');

       addCartButtons.forEach(button => {
        button.addEventListener('click', () => {
          const productTitle = button.parentNode.parentNode.querySelector(".title").textContent;
          const productPrice = button.parentNode.parentNode.querySelector(".rprice").textContent;
          const productImageSrc = container.parentNode.parentNode.querySelector('.cardimg').getAttribute('src');
          
          const priceText = button.parentNode.parentNode.querySelector(".rprice").textContent;
          const numericPart = priceText.replace(/[^0-9.]/g, '');
          const finalprice = parseFloat(numericPart);

          totalPrice += finalprice;
          console.log(finalprice);
          document.querySelector('.totalPrice').textContent = `Total Amount: ${totalPrice.toFixed(2)}`;

          let productExists = false;
    
          const existingProducts = document.querySelectorAll('.productModal');
          existingProducts.forEach(product => {

            

            const existingTitle = product.querySelector('.proname p').textContent;
            if (existingTitle === productTitle) {
              const countElement = product.querySelector('.countnum');
              const currentCount = parseInt(countElement.textContent);
              countElement.textContent = currentCount + 1;
    
              const priceElement = product.querySelector('.price');
              const currentPrice = parseFloat(priceElement.textContent.replace(/[^0-9.-]+/g, ''));
              const updatedPrice = currentPrice + parseFloat(productPrice.replace(/[^0-9.-]+/g, ''));
              priceElement.textContent = `Price:₱ ${updatedPrice.toFixed(2)}`;
             

             
             
              productExists = true;
                  
    
            }


          });
    
          if (!productExists) {
            addedcart.innerHTML += `
              <div class="productModal">
                <div class="proImg">
                <img style ="width: 50px;" class = "cardimg" src="${productImageSrc}" alt="" srcset="">
                </div>
                <div class="proContent">
                  <div class="proname">
                    <p>${productTitle}</p>
                  </div>
                  <div class="proquantity">
                    <div class="counter">
                      <button class="incre">+</button>
                      <p class="countnum">1</p>
                      <button onclick = "getprice(this)" data-price ="${productPrice}"  class="decre">-</button>
                    </div>
                    <div  class="price">Price: ${productPrice}</div>   
                  </div>
                </div>
              </div>
            `;
          
        
              arr.push({
                 productTitle
              })
              console.log(arr);
              count .innerHTML = arr.length;
              

            const addquantity = document.querySelectorAll('.incre');
            addquantity.forEach(button =>{
                  button.addEventListener('click',()=>{
                  const countElement = button.parentNode.parentNode.querySelector('.countnum');
                   const currentCount = parseInt(countElement.textContent);
                   countElement.textContent = currentCount + 1;
         
                   const priceElement = button.parentNode.parentNode.querySelector('.price');
                   const currentPrice = parseFloat(priceElement.textContent.replace(/[^0-9.-]+/g, ''));
                   const updatedPrice = currentPrice + parseFloat(productPrice.replace(/[^0-9.-]+/g, ''));
                   priceElement.textContent = `Price:₱ ${updatedPrice.toFixed(2)}`;

              
                     
                   totalPrice += finalprice;
                   console.log(finalprice);
                   document.querySelector('.totalPrice').textContent = `Total Amount: ${totalPrice.toFixed(2)}`;


                  })
            })

            const minusquantity = document.querySelectorAll('.decre');
            minusquantity.forEach(button =>{
              
                  button.addEventListener('click',()=>{
                  const countElement = button.parentNode.parentNode.querySelector('.countnum');
                   const currentCount = parseInt(countElement.textContent);
                   countElement.textContent = currentCount - 1;
         
                   const priceElement = button.parentNode.parentNode.querySelector('.price');
                   const currentPrice = parseFloat(priceElement.textContent.replace(/[^0-9.-]+/g, ''));
                   const updatedPrice = currentPrice - parseFloat(productPrice.replace(/[^0-9.-]+/g, ''));
                   priceElement.textContent = `Price:₱ ${updatedPrice.toFixed(2)}`;
                  
                  let rpi = getprice(button)
                  console.log(rpi);
                   totalPrice -= rpi;
                  
                   document.querySelector('.totalPrice').textContent = `Total Amount: ${totalPrice.toFixed(2)}`;
                   
               
                    
                   let cartItem = button.closest('.productModal');
                   if (currentCount < 2) {
                     cartItem.parentNode.removeChild(cartItem);
                     arr.splice(0, 1);
                    
                     count.innerHTML = arr.length;
                   }
                  })
    
            })
          }
          Swal.fire({
            icon: 'success',
            title: 'Added to cart',
            showConfirmButton: false,
            timer: 1500
          });
        
        });
      });

  })

 
  count.innerHTML = arr.length;
}

  // problems
  // the total amount
  //
  function getprice(price) {
    
    const productPriceAttr = price.getAttribute('data-price');
    
    const numericString = productPriceAttr.replace(/[^\d.]/g, "");
    const priceValue = parseFloat(numericString);
    // Convert productPriceAttr to a numeric value
    // const priceValue = Number(productPriceAttr);
    
   return priceValue;
  }
  