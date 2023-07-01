
const shop = document.querySelector('.shop')
const seeMore = document.querySelector('.see');
let num = 4;
let displayProducts = [];


// displayPro();

filterPro();
// initPro();
displayPro();


  


function filterPro() {
   const category = document.getElementById('categories');
 
   category.addEventListener("change", () => {
     let selectedCategory = category.value;
     console.log(selectedCategory);

       if(selectedCategory === 'all'){
          initPro();
       }else{
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
                 <div class="prices">
                   <p class="rpice">₱ ${product.price}</p>
                   <p class="sold">12 sold</p>
                 </div>
               </div>
             </div>
           `;
          
         });
       });
      }
   });
 }
 
    
function displayPro(){
   fetch('https://fakestoreapi.com/products')
        .then(response =>{
           return response.json();
        })
        .then(data=>{
       
          shop.innerHTML = "";
            data.forEach(product => {
                shop.innerHTML += `
                <div class="cardcontainer">
                <div class="cardimg">
                                <img src="${product.image}" alt="">
                </div>
                <div class="content">
                                <p class="title">${product.title}</p>
                             <div class="prices">
                <p class="rpice">₱ ${product.price}</p>
                <p class="sold">12 sold</p>
                             </div>
                </div>
                </div>
                `;
                displayProducts.push(product.id);
            });
        });
        
   
   }
   

   function initPro(){
      fetch('https://fakestoreapi.com/products')
           .then(response =>{
              return response.json();
           })
           .then(data=>{
            
             shop.innerHTML = "";
               data.forEach(product => {
                   shop.innerHTML += `
                   <div class="cardcontainer">
                   <div class="cardimg">
                                   <img src="${product.image}" alt="">
                   </div>
                   <div class="content">
                                   <p class="title">${product.title}</p>
                                <div class="prices">
                   <p class="rpice">₱ ${product.price}</p>
                   <p class="sold">12 sold</p>
                                </div>
                   </div>
                   </div>
                   `;
                   displayProducts.push(product.id);
               });
           });
           
      
      }
      

      // [
      //   {
      //       id:1,
      //       title:'...',
      //       price:'...',
      //       category:'...',
      //       description:'...',
      //       image:'...'
      //   },
      //   /