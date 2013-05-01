$(document).ready(function(){
	
	var key = 'dc2498ad3e413bde8dc546a8013c3736';

	$('#search-form').submit(function(e){
		//by default, submitting a form reloads the page. "e" represents the
		//event, and it is automatically passed into the event handler function.
		//preventDefault() keeps the default browser behavior from happening.
		e.preventDefault();
		// change the value below to whatever happens to be in the search box
		var text = $('#keywords').val();

		//prevent the user from searching unless there is text in the text box
		if(text.length > 0) {

		//if there is text in the box, go ahead and search. I've filled out most
		//of this for you, but you will need to insert the api key and search text
		//(as the value for the "tags" parameter) in the url. Check the Flickr API
		//docs for the photos.search method to see which parameters you need to add to
		//the URL to accomplish this
		console.log('get json');
		
		$.getJSON('http://api.flickr.com/services/rest/?method=flickr.photos.search&api_key='+ key + '&tags=' + text + '&format=json&per_page=50&content_type=1&jsoncallback=?', successCallback);
		
		} else {
			//create an alert box that lets the user know he/she needs to enter text
			$('.directions').append('<p class="alert">Enter some text before you hit submit!</p>');
		}
	});

	function successCallback(data) {
		//log the variable "data" to the console to see what the object looks like
		
		//now loop through the photos and add markup to the DOM. Read the
		//directions.txt doc included in the project for guidance. Grab the "q"
		//version of each photo.
		// for (i = 0; i < obj.length; i++) {
		// 	var url = 'http://farm' + obj[i].farm + '.staticflickr.com/' + obj[i].server + '/' + obj[i].id + '_' + obj[i].secret + '_q.jpg';
		// 	$('#tiles').append('<img src="' + url + '">');
		// }
		var photos = data.photos.photo;

		//initialize the html string so we can build on it in the loop
		var markup = '';

		//assemble your markup 
		for(i=0; i < photos.length; i++) {
			//construct the photo url
			img = '<img src="http://farm' + photos[i].farm + '.staticflickr.com/' + photos[i].server + '/' + photos[i].id + '_' + photos[i].secret + '_q.jpg">';
			//log it to the console and try to visit
			console.log(img);
			//it in the browser to make sure it works
			
			//add a div with a class of "tile" and your new image tag to the markup string
			markup += '<div class="tile">' + img + '</div>'; 
			
		}

		//replace any existing markup in #tiles with the new markup we just created
		$('#tiles').html(markup);
		
	}

});