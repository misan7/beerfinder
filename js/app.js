// Beginning of the script with ajax and jquery

// All $('#something') are IDs from the HTML
$('#search-beer').on('click', function(event) {
    event.preventDefault() // This button prevents the page refresh
    var nameBeer = $('#beer-name').val() // This is what is written in the input
    var urlSearchBeer = 'https://quiet-inlet-67115.herokuapp.com/api/search/all?q=' + nameBeer // The url from the API
        // Here begins the AJAX call. I give to Ajax the URL of the API and "succes" with a function that takes "data" as object
    $.ajax({
        url: urlSearchBeer,
        success: function(data) {
            var beerFound = data // Semantic var
            var optionsHtmlBeer = '<option disabled selected>Select your Beer</option>' // Here I'll save all the 'options' for the 'select' and I create an option disabled
            beerFound.forEach(function(beerData) {
                optionsHtmlBeer += '<option value="' + beerData.id + '">' + beerData.name + '</option>'
            })
            $('#beer-selection').html(optionsHtmlBeer) // I give to 'select' all the beer 'options' with the searched name
                // The next two sentences are for hide and show menus
            $('#beer-selector-container').removeClass("hidden")
            $('#beer-info-container').addClass("hidden")
            $('.titleBrand').removeClass("hidden")

        }
    })
})

$('#beer-selection').on('change', function(event) {
    var idBeer = $(this).val()
    var urlBeerInfo = 'https://quiet-inlet-67115.herokuapp.com/api/beer/' + idBeer
    $.ajax({
        url: urlBeerInfo,
        success: function(data) {
            $('#beer-info-container').removeClass('hidden')
                // If there is no info available show message
            if (!data.description) {
                $('#description-beer').html("There is no info Available")
            } else { $('#description-beer').html(data.description) } // Beer's Description
            // If there is no photo available show message
            if (!data.labels) {
                $('#img-beer').attr('src', 'http://resources3.news.com.au/images/2009/04/11/1225697/056087-no-beer.jpg')
            } else { $('#img-beer').attr('src', data.labels.medium) } // Image of the beer}

            $('#name-beer').html(data.name) // Beer's Name
        }
    })
})
