angular.module('itunes').service('itunesService', function($http, $q){
  //This service is what will do the 'heavy lifting' and get our data from the iTunes API.
  //Also note that we're using a 'service' and not a 'factory' so all your methods you want to call in your controller need to be on 'this'.

  //Write a method that accepts an artist's name as the parameter, then makes a 'JSONP' http request to a url that looks like this
  //https://itunes.apple.com/search?term=' + artist + '&callback=JSON_CALLBACK'
  //Note that in the above line, artist is the parameter being passed in.
  //You can return the http request or you can make your own promise in order to manipulate the data before you resolve it.
  var deferred = $q.defer();
  this.getArtistData = function(name, limit){
    var urly = 'https://itunes.apple.com/search?term=' + name + '&limit=' + limit + '&callback=JSON_CALLBACK';
    urly = urly.split(' ').join('+');
    console.log(urly);
    $http({
      method: 'JSONP',
      url: urly
    }).then(
      function(response){
        var filtered = [];
        var results = response.data.results
        for(var i = 0; i < results.length; i++){
          filtered.push(
            {
              AlbumArt: results[i].artworkUrl100,
              Artist: results[i].artistName,
              Collection: results[i].collectionName,
              CollectionPrice: results[i].collectionPrice,
              Play: results[i].previewUrl,
              Type: results[i].kind
            }
          )
        }
        deferred.resolve(filtered);
      }
    )
    return deferred.promise
  }
});
