$(document).ready(function() {
   // populate empty list in the html
   var showData = $('#show-data');

   $.getJSON('data/composers.json', function(data) {
      // Using list.js below

      var values = data;
      // Define value names
      var options = {
         valueNames: ['name', 'born', 'died', 'nationality', 'profile'],
         plugins: [ListFuzzySearch()],
         item: '<li><h5 class="name"></h5><span class="born"></span> - <span class="died"></span> <p class="nationality"></p> <span class="profile"></span></li>'
      };
      // Init list
      var userList = new List('users', options, values);

   });
   // waiting message when data is loading slow
   showData.text('Loading the JSON file.');
});
