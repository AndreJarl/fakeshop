
const shop = document.querySelector('.shop')
const seeMore = document.querySelector('.see');
let num = 4;
let displayProducts = [];

displayPro();

/// add the select filter 
function displayPro(){
fetch('https://fakestoreapi.com/products?limit=' + num)
     .then(response =>{
        return response.json();
     })
     .then(data=>{
        let newProducts = data.filter(product => !displayProducts.includes(product.id))
         newProducts.forEach(product => {
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

const see1 = document.querySelector('.see1');

     seeMore.addEventListener('click', ()=> {
        num += 4;
        displayPro();
        if(num === 20){
           seeMore.style.display = "none";
           see1.style.display = "block";
        }
     })


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