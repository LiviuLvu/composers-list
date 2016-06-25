$(document).ready(function() {
   // populate empty list in the html
   var showData = $('#show-data');

   $.getJSON('data/composers.json', function(data) {
      // Using list.js below

      var values = data;
      // Define value names
      var options = {
         valueNames: ['name', 'born', 'died', 'nationality', 'profile', { name: 'image', attr: 'src' }, { name: 'audiosample', attr: 'src' }],
         plugins: [ListFuzzySearch()],
         item: '<li><h5 class="name"></h5><span class="born">' +
            '</span> - <span class="died"></span>' +
            '<p class="nationality"></p> <img class="image" src="img/alexander-borodin.jpg" alt="Composer Image">' +
            '<audio controls class="audiosample" src="audio/mozart-eine-kleine-nachtmusik.mp3" type="audio/mpeg">' +
            'Audio not supported, please update browser</audio>' +
            '<p class="profile"></p></li>'
      };
      // initialize list
      var userList = new List('users', options, values);
      // call emptyListMsg function when list has been updated
      userList.on('updated', emptyListMsg);

   });
   // waiting message when data is loading slow
   showData.text('Loading the JSON file.');
});
// show error message if the search yelds no result
function emptyListMsg() {
   if ($('ul.list').is(':empty')) {
      $('ul.list').append('<p id="emptySearch">Sorry, no results found.</p>');
   } else {
      $('#emptySearch').remove();
   }
}
