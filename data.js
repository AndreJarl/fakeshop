
fetch('https://fakestoreapi.com/products')
     .then(response =>{
        return response.json();
     })
     .then(data=>{
         data.forEach(product => {
             console.log(product.category);
         });
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