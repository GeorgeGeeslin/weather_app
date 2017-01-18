$(document).ready(function() {
  icons = {
    thunderstorm: {
      url: "https://res.cloudinary.com/drkbswe4j/image/upload/v1477268655/sky_jpov6d.svg",
      author: "Eucalyp",
      authorUrl: "http://www.flaticon.com/authors/eucalyp"
    },
    drizzle: {
      url: "https://res.cloudinary.com/drkbswe4j/image/upload/v1477270259/sky_ini6lc.svg",
      author: "Iconnice",
      authorUrl: "http://www.flaticon.com/authors/iconnice"
    },
    rain: {
      url: "https://res.cloudinary.com/drkbswe4j/image/upload/v1477270259/sky-2_yfhmal.svg",
      author: "Eucalyp",
      authorUrl: "http://www.flaticon.com/authors/eucalyp"
    },
    snow: {
      url: "https://res.cloudinary.com/drkbswe4j/image/upload/v1477270259/nature_wrwlsi.svg",
      author: "Eucalyp",
      authorUrl: "http://www.flaticon.com/authors/eucalyp"
    },
    atmosphere: {
      url: "https://res.cloudinary.com/drkbswe4j/image/upload/v1477270259/river_zxtmak.svg",
      author: "Daniel Bruce",
      authorUrl: "http://www.flaticon.com/authors/daniel-bruce" 
    },
    clouds: {
      url: "https://res.cloudinary.com/drkbswe4j/image/upload/v1477270259/sky-1_zbuybe.svg",
      author: "Iconnice",
      authorUrl: "http://www.flaticon.com/authors/iconnice"
    },
    clear: {
      url: "https://res.cloudinary.com/drkbswe4j/image/upload/v1477268650/nature_uovxru.svg",
      author: "Iconnice",
      authorUrl: "http://www.flaticon.com/authors/iconnice"
    },
    extreme: {
      url: "https://res.cloudinary.com/drkbswe4j/image/upload/v1477270259/danger_kmkrrd.svg",
      author: "Chris Veigt",
      authorUrl: "http://www.flaticon.com/authors/chris-veigt"
    }
  };

  var city;
  var countryCode;
  var kelvin;
  var fahrenheit;
  var celsius;
  var weatherIcon;
  var weatherCode;
  var weatherDesc;
  var apiKey = 'cc41455fa3e095d32ea5321087f7f7b4';

   function getWeather(city, countryCode) {
    $.getJSON("http://api.openweathermap.org/data/2.5/weather?q="+city+","+countryCode+"&APPID="+apiKey,
      function(res){
        kelvin = res.main.temp;
        weatherIcon = res.weather[0].icon;
        weatherCode = res.weather[0].id.toString();
        weatherDesc = titleCase(res.weather[0].description);
        fahrenheit = Math.round(kelvin * 9/5 - 459.67);
        celsius = Math.round(kelvin - 273.15);
        document.getElementById("temp").innerHTML = fahrenheit;
        document.getElementById("tempToggle").innerHTML = "\u2109";
        document.getElementById("weatherDesc").innerHTML = weatherDesc;
        if (weatherCode.substring(0,1) === "2") {
          var iconUrl = icons.thunderstorm.url;
          var iconAuthor = icons.thunderstorm.author;
          var iconAuthorUrl = icons.thunderstorm.authorUrl;
        } else if (weatherCode.substring(0,1) === "3") {
          var iconUrl = icons.drizzle.url;
          var iconAuthor = icons.drizzle.author;
          var iconAuthorUrl = icons.drizzle.authorUrl;
        } else if (weatherCode.substring(0,1) === "5") {
          var iconUrl = icons.rain.url;
          var iconAuthor = icons.rain.author;
          var iconAuthorUrl = icons.rain.authorUrl;
        } else if (weatherCode.substring(0,1) === "6") {
          var iconUrl = icons.snow.url;
          var iconAuthor = icons.snow.author;
          var iconAuthorUrl = icons.snow.authorUrl;
        } else if (weatherCode.substring(0,1) === "7") {
          var iconUrl = icons.atmosphere.url;
          var iconAuthor = icons.atmosphere.author;
          var iconAuthorUrl = icons.atmosphere.authorUrl;
        } else if (weatherCode === "800") {
          var iconUrl = icons.clear.url;
          var iconAuthor = icons.clear.author;
          var iconAuthorUrl = icons.clear.authorUrl;
        } else if (weatherCode.substring(0,2) === "80") {
          var iconUrl = icons.clouds.url;
          var iconAuthor = icons.clouds.author;
          var iconAuthorUrl = icons.clouds.authorUrl;
        } else {
          var iconUrl = icons.extreme.url;
          var iconAuthor = icons.extreme.author;
          var iconAuthorUrl = icons.extreme.authorUrl;
        }
        document.getElementById("icon").innerHTML = "<img src="+iconUrl+" alt="+weatherDesc+">" 
        document.getElementById("icon-author").innerHTML = '<p>Icon made by <a href='+iconAuthorUrl+'>'+iconAuthor+'</a> from <a href="http://www.flaticon.com/">www.flaticon.com</a></p>';
    });
  }

  function titleCase(str) {
    return str.toLowerCase().split(' ').map(function(word) {
      return word.replace(word[0], word[0].toUpperCase());
    }).join(' ');
  }

  $.getJSON("http://ip-api.com/json", 
    function(res) {
      city = res.city;
      countryCode = res.countryCode;
      var region = res.region;
      getWeather(city,countryCode);
      if (region === undefined ) {
        document.getElementById("location").innerHTML = city+", "+countryCode; 
      } else {
        document.getElementById("location").innerHTML = city+", "+region+". "+countryCode;
      }
  });

  $("#tempToggle").click(function(){
    if ( $(this).hasClass("fahrenheit") ) {
      $(this).removeClass("fahrenheit");
      $(this).addClass("celsius")
      document.getElementById("temp").innerHTML = celsius;
      document.getElementById("tempToggle").innerHTML = "\u2103";    
    } else {
      $(this).removeClass("celsius");
      $(this).addClass("fahrenheit")
      document.getElementById("temp").innerHTML = fahrenheit;
      document.getElementById("tempToggle").innerHTML = "\u2109";
    }
  });
});