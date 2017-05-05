var app = angular.module('zoMap',[]);
app.controller('zoMapController',['$scope','apiAdapter','$http',zoMapController]);

function zoMapController($scope,apiAdapter){
  if(navigator.geolocation) {
    getPosition(function(position){
      lat = position.coords.latitude;
      lng =  position.coords.longitude;
      apiAdapter.getRestaurants(lat,lng).then(function(data){
        console.log(data);
      });
    });
  } 
  else {
    console.log("something wrong");
  }
}



function getPosition(cb){
  navigator.geolocation.getCurrentPosition(function(position) {
    return cb(position);
  });
}

// little later we ll make saprate file of this as adapter.js
app.service('apiAdapter',['apiService','$http',apiAdapter]);

function apiAdapter(apiService){
  var zomatoURL = 'https://developers.zomato.com/api/v2.1/locations';
  var query = 'Bangalore';
  Headers = {
    'user-key': 'b8977c4c52df5e872ef2189844a8f0c2',
    'Accept': 'application/json'
  }
  return {
    getRestaurants : function(get_lat,get_lng){
      var serviceURL= zomatoURL+'?query='+query+'&lat='+get_lat+'&lon='+get_lng+'&count=5';
      console.log(serviceURL);
      requestURL = {
        method: 'GET',
        url: serviceURL,
        headers: Headers
      }
      return apiService.getData(requestURL);
    }
  } 
}   

// little later we ll make saprate file of this as service.js
app.service('apiService',['$http',apiService]);

function apiService() {
  return {
    getData : function(get_requestURL){
      console.log(get_requestURL);
       data= $http(get_requestURL);
       console.log(data);

    }
  }
}