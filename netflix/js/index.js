import service from "./services.js"; // henter hele filen
import { singleProductTmpl, productListTmpl, favoriteListTmpl } from "./templates.js"; // henter hver enkelt funktion



const app = {}

app.init = async () => {





        /* PRODUCTS */

        
        const pageProduct = document.querySelector('.page-product');
        const productListContainer = document.querySelector('.product-list-container');
        const products = await service.getProducts();
        
        

        
        if(productListContainer) {

            products.forEach((product) => {
                productListContainer.insertAdjacentHTML('beforeend', productListTmpl(product));
            });
        }


        if(pageProduct){

            let search = location.search; // Finder det data der er efter ? i URL'en
            let productID = new URLSearchParams(search).get('id'); // henter id'et fra URL'en (get henter data fra URL'en)

            const productContainer = document.querySelector('.product-container');
            const foundProduct = products.find((product) => product.id == productID); // Loop'er igennem products-array'et, og finder dét object, der har samme id, som id'et i URL'en

            productContainer.insertAdjacentHTML('beforeend', singleProductTmpl(foundProduct));
            
        }




        /* SEARCH */

        
        const renderResult = (result) => {
            productListContainer.innerHTML = '';
            
            result.forEach(product => {
                productListContainer.insertAdjacentHTML('beforeend', productListTmpl(product));
            })
            

        }

        const searchInput = (e) => {
            const searchTerm = e.target.value;
            const category = document.querySelector('#category').value;
            
                const result = products.filter(product => product[category].includes(searchTerm));
    
                renderResult(result);

            

        }

        const input = document.querySelector('#search');
        input.addEventListener('input', searchInput);


        


        /* FAVORITES */
    
        const favoriteProducts = [];
    
        // Udskriver liste over favoritte
        const renderFavoriteList = () => {
            
            const favoriteListContainer = document.querySelector('.favorite-list-container');
    
            if(favoriteListContainer) {
                if(favoriteProducts != ''){

                    favoriteListContainer.innerHTML = '';
    
                    favoriteProducts.forEach((product) => {
                        favoriteListContainer.insertAdjacentHTML('beforeend', favoriteListTmpl(product));
                    });

                    removeFromFavorites()

                } else {
                    favoriteListContainer.innerHTML = ''; // Tilføjes, hvis det sidste produkt der slettes stadig vises i browseren - kan skyldes bl.a. synkronisering af asynkron kode
                    favoriteListContainer.insertAdjacentHTML('beforeend', 'No favorites selected')
                }
    
            }
        }



        function addToFavorites(event) {

            const productId = event.target.getAttribute('data-product-id'); // Hent produkt-id fra data-attribut
            const productToAdd = products.find((product) => product.id == productId); // Find produktet med det id
            
            if (productToAdd && !favoriteProducts.includes(productToAdd)) {
                favoriteProducts.push(productToAdd)
                renderFavoriteList();
                console.log(favoriteProducts);
            }
        }

        const favBtn = document.querySelectorAll('.favorite');
        favBtn.forEach(btn => {
            btn.addEventListener('click', addToFavorites);
        });



        const removeFromFavorites = () => {
            const removeBtn = document.querySelectorAll('.favorite-delete');
            removeBtn.forEach(btn => {
                btn.addEventListener('click', (e) => {

                    const productId = e.target.getAttribute('data-product-id');
                    const productToRemove = products.find((product) => product.id == productId);
            
                    const index = favoriteProducts.indexOf(productToRemove);
            
                    if(index != -1){ // Hvis produktet eksiserer i array'et
                        favoriteProducts.splice(index, 1);
                        renderFavoriteList();
                        console.log(favoriteProducts);
                    }
                    
                });
            })
        
        }

        // KURV

        let cart = document.querySelector("#favorite-cart");
        let tomDiv = document.querySelector(".tom-div");


        cart.addEventListener("click", () => {
            tomDiv.classList.toggle("hidden");
        });


        let genre = document.querySelector("#genre");
        let tomDiv2 = document.querySelector(".tom-div2");

        genre.addEventListener("click", () => {
            tomDiv2.classList.toggle("hidden");
        });


        // MOVIE SLIDER //


        $(document).ready(function() {
var $imagesCarousel = $('.carouselOfImages').flickity({
  contain: true,
  autoPlay: true,
  wrapAround: true,
  friction: 0.3
});
function resizeCells() {
  var flkty = $imagesCarousel.data('flickity');
  var $current = flkty.selectedIndex
  var $length = flkty.cells.length
  if ($length <='5') {
    $imagesCarousel.flickity('destroy');
  }
  $('.carouselOfImages .carouselImage').removeClass("nextToSelected");
  $('.carouselOfImages .carouselImage').eq($current-1).addClass("nextToSelected");
  if ($current+1 == $length) {
    var $endCell = "0"
  } else {
    var $endCell = $current+1
  }
   $('.carouselOfImages .carouselImage').eq($endCell).addClass("nextToSelected");
  };
resizeCells();

$imagesCarousel.on('scroll.flickity', function() {
    resizeCells();
  });
  
  
  
  
  
$(".carouselImage img").click(function() { 
  var $this = $(this);
  var imageID = $this.attr('data-tab');
  var imageSrc = $this.attr('src');
  
  $('.' + imageID).removeClass('hide');
  $('.' + imageID + ' .product-detail-image img').attr('src', imageSrc);
});

$('.product-detail-close,.product-detail').on('click', function() {
  $('.product-detail').addClass('hide');
});

  $('.modal-video').on('hidden.bs.modal', function (e) {
    $('.modal-video iframe').attr('src', $('.modal-video iframe').attr('src'));
  });

autoPlayYouTubeModal();

  function autoPlayYouTubeModal() {
      var trigger = $("body").find('[data-the-video]');
      trigger.click(function () {
          var theModal = $(this).data("target"),
              videoSRC = $(this).attr("data-the-video"),
              videoSRCauto = videoSRC + "&autoplay=1";
          $(theModal + ' iframe').attr('src', videoSRCauto);
          $(theModal + ' button.close').click(function () {
              $(theModal + ' iframe').attr('src', videoSRC);
          });
          $('.modal-video').click(function () {
              $(theModal + ' iframe').attr('src', videoSRC);
          });
      });
  }

$(window).on('load resize', function(){
  var $window = $(window);
  $('.modal-fill-vert .modal-body > *').height(function(){
      return $window.height()-60;
    });
  }); 
});












    }











app.init()