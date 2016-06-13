jQuery(document).ready(function($) {
   // get the data from json
   $.getJSON('data/articles.json', function(data) {
      // test data
      console.log(data.articles[0].name);
   });
   // populate the list with data using jQ
});

// sort and filter the list with filter.js
// use code for existing list created with jQ
