const shop = document.querySelector('.shop');
const cartcon = document.querySelector('.cartcon');
const cartmodal = document.querySelector('.cartmodal');
const closebtn = document.querySelector('.x');


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
      <img src="${productImageSrc}" alt="" srcset="">
      </div>
      <div class="cartinfo">
           <div class="proname">
              <p>${productTitle}</p>
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
                  <p style="font-size: 20px; color: orangered;">${productPrice}</p>
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

    });
  });
}

// for tommorow

      // cart.push({
      //   productTitle,
      //   productPrice
      // })
      // console.log(cart);