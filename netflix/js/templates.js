export const productListTmpl = (product) => `
<p class="movie-title"><b>${product.title}</b></p>
<div class="produkterne">
<img src="${product.image}">
<button class="favorite" data-product-id="${product.id}">Add to favorites</button></div>
<div class="tekst2"><a href="product.html?id=${product.id}"></a></div>
<br>
`;


export const singleProductTmpl = (product) => `
<p class="movie-title"><b>${product.title}</b></p>
<img src="${product.image}">
<p>${product.description}</p>
<div><a href="index.html">Gå tilbage</a></div>
<br>
`;


export const favoriteListTmpl = (product) => `
<p class="movie-title"><b>${product.title}</b></p>
<img class="fav-image" src="${product.image}">
<button class="favorite-delete" data-product-id="${product.id}">Remove from favorites</button>
<div><a href="product.html?id=${product.id}"></a></div>
<br>
`;