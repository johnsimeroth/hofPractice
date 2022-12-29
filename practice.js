// This repo is optional extra practice to use the underscore functions.
// Here we'll be writing new functions, but these functions will use
// the underscore functions within them.

// If you would like to take a look at the inputs that are passed into these functions, please
// feel free to check out the data.js file.

/*
 *
 *  _.each
 *
 */

// use _.each to create a copy of the given array.
var moreFruits = function (fruits) {
  var results = [];

  _.each(fruits, function(fruit, index, collection) {
    results.push(fruit);
  });

  return results;
};

// use _.each to traverse the number array and determine
// which are multiples of five.
var multiplesOfFive = function (numbers) {
  var results = [];
  _.each(numbers, function(number, index, collection) {
    if (number % 5 === 0) {
      results.push(number);
    }
  });
  return results.length;
};

// use _.each to build an array containing only tweets belonging to a specified user.
var getUserTweets = function(tweets, user) {
  var userTweets = [];
  _.each(tweets, function(tweet, index, collection) {
    if (tweet.user === user) {
      userTweets.push(tweet);
    }
  });
  return userTweets;
};

/*
 *
 *  _.filter
 *
 */

// use _.filter to return the fruits array with only the desired fruit.
var onlyOneFruit = function (fruits, targetFruit) {
  return _.filter(fruits, function(fruit) {
    return fruit === targetFruit;
  });
};

// use _.filter to return the fruits array with only fruits
// starting with the letter 'P'.
var startsWith = function (fruits, letter) {
  return _.filter(fruits, function(fruit) {
    return fruit[0] === letter;
  });
};

// return a filtered array containing only cookie-type desserts.
var cookiesOnly = function (desserts) {
  return _.filter(desserts, function(desert) {
    return desert.type === 'cookie';
  });
};

// rebuild the getUserTweets function from above with _.filter instead
var filterUserTweets = function(tweets, user) {
  return _.filter(tweets, function(tweet) {
    return tweet.user === user;
  });
};

/*
 *
 *  _.map
 *
 */

// given an array of strings, use _.map to return a new array containing all
// strings converted to uppercase letters.
var upperCaseFruits = function (fruits) {
  return _.map(fruits, function (fruit) {
    return fruit.toUpperCase();
  });
};

// given an array of dessert objects, return a new array of objects
// that have a new "glutenFree" property, with a boolean value.
// TIP: Items that contain flour are not gluten-free.
var glutenFree = function (desserts) {
  _.map(desserts, function(dessert) {
    return dessert.glutenFree = (dessert.ingredients.indexOf('flour') === -1);
  });
  return desserts;
};

// given an array of tweet objects, return a new array of strings
// containing only the message properties.
var allUserMessages = function(tweets) {
  return _.map(tweets, function(tweet) {
    return tweet.message;
  });
};

// use _.map to return an array of items with their sale prices, with a new property
// containing the sale price. round any decimals to 2 places.
//
// having trouble with decimals? check out this article:
// http://adripofjavascript.com/blog/drips/avoiding-problems-with-decimal-math-in-javascript.html
//
/*

 example output:
  var salePrices = applyCoupon(groceries, 0.20);
  [
    {
      id: 1,
      product: 'Olive Oil',
      price: '$12.1',
      salePrice: '$9.68'
    }
  ];

*/
var applyCoupon = function (groceries, coupon) {
  _.map(groceries, function(groceryItem) {
    // var zeros = '00';
    // var price = groceryItem.price.slice(1);
    // var decimals = price.length - 1 - price.indexOf('.');
    // price += zeros.substring(0, 2 - decimals);
    // var priceInt = parseInt(price.replace('.', ''));
    // groceryItem.salePrice = Math.round((priceInt * (1 - coupon))).toString().split('');
    // groceryItem.salePrice.splice(-2, 0, '.');
    // groceryItem.salePrice = '$' + groceryItem.salePrice.join('');

    var price = groceryItem.price.slice(1);
    groceryItem.salePrice = '$' + ((Math.round(100 * (1 - coupon) * price)) / 100).toString();
  });
  return groceries;
};

/*
 *
 *  _.reduce
 *
 */

// return the total price of all products.
var sumTotal = function (products) {
  var prices = _.map(products, function(product) {
    return product.price.slice(1) * 100;
  });
  var total = _.reduce(prices, function(sum, price) {
    return sum + price;
  });
  return total / 100;
};

// return an object consisting of dessert types and how many of each.
// exampleOutput: { dessertType: 3, dessertType2: 1 }

// inputs: array of dessert objects, each with type properties
  // outputs: object - keys = desert types, values = count
  // constraints: the usual
  // edge cases: N/A

  // declare result object variable
  // loop through the array of objects
    // for each object, look at the type property. if type
    // property exists in the return object, increment value.
    // if not, add it with value 1.
  // return result

var dessertCategories = function (desserts) {
  var dessertCounter = function(countObject, dessert) {
    if (countObject[dessert.type] === undefined) {
      countObject[dessert.type] = 1;
    } else {
      countObject[dessert.type] += 1;
    }
    return countObject;
  };
  return _.reduce(desserts, dessertCounter, {});
};

// return an object with the proper count of all user messages
/*
 example output:
  var tweetCountPerUser = countMessagesPerUser(tweets);
  {
    "douglascalhoun": 5,
    "mracus": 6,
    "shawndrost": 5,
    "sharksforcheap": 3
  }
*/
var countMessagesPerUser = function(tweets) {
  var msgCounter = function(tweetCounter, tweet) {
    if (tweetCounter[tweet.user] === undefined) {
      tweetCounter[tweet.user] = 1;
    } else { tweetCounter[tweet.user]++; }
    return tweetCounter;
  };
  return _.reduce(tweets, msgCounter, {});
};

// given an array of movie data objects,return an array containing
// movies that came out between 1990 and 2000.
// TIP: use an array as your accumulator - don't push to an external array!
var ninetiesKid = function (movies) {
  var ninetiesMovies = function(movieList, movie) {
    if (movie.releaseYear >= 1990 && movie.releaseYear <= 2000) {
      movieList.push(movie.title);
    }
    return movieList;
  };
  return _.reduce(movies, ninetiesMovies, []);
};

// return an boolean stating if there exists a movie with a shorter
// runtime than your time limit.
// timeLimit is an integer representing a number of minutes.
var movieNight = function (movies, timeLimit) {
  var countShortMovies = function(movieCount, movie) {
    if (movie.runtime <= timeLimit) {
      movieCount++;
    }
    return movieCount;
  };
  return _.reduce(movies, countShortMovies, 0) > 0;
};
