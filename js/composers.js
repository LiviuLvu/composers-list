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
         item: '<li class="listItem row">' +
            '<img class="image" src="img/alexander-borodin.jpg" alt="Composer Image">' +
            // text for profile details
            '<div class="column">' +
            '<h5 class="name row"></h5>' +
            '<div class="row"><p class="born"></p><p class="spacer">-</p><p class="died"></p></div>' +
            '<p class="nationality row"></p>' +
            '<div class="row"><small><a href="" class="playLink">Audio Sample</a>' +
            '<audio class="audiosample"  id="audiosample" src="audio/mozart-eine-kleine-nachtmusik.mp3" type="audio/mpeg">Audio not supported, please update browser</audio>' +
            '</small>' +
            '<small class="column"><a href="" class="moreInfo">Short Introduction</a></small>' +
            '</div>' +
            '</div>' +
            // detailed profile description - hidden
            '<p class="profile hidden"></p></li>'
      };
      // initialize list
      var userList = new List('users', options, values);
      // call emptyListMsg function when list has been updated
      userList.on('updated', emptyListMsg);

      // filter by nationality
      // trigger this code when changing the select option
      $('.filterNationality').change(function(event) {
         // get the input value from select
         var values_nationality = $('.filterNationality option:selected').text();

         userList.filter(function(item) {
            if (item.values().nationality == values_nationality) {
               return true;
            } else if (values_nationality == 'Show All') {
               // clear filter if 'all' option is selected
               return true;
            }
            // not sure if this is needed, the code also works without it
            return false;
         });
      });
      // when clicked on Link, play() on next elem, wich is audio
      $('.playLink').on('click', function(event) {
         event.preventDefault();
         var audioTag = $(this).next()[0];
         if (audioTag.paused) {
            audioTag.play();
         } else {
            audioTag.pause();
         }
      });
      // show profile info
      $('.moreInfo').on('click', function(event) {
         event.preventDefault();
         // related profile tag to clicked link
         var clickedProfile = $(this).closest('li').children('p');
         // hide previously visible profile info
         $('.profile').not(clickedProfile).addClass('hidden');
         // toggle class on the desired profile
         clickedProfile.toggleClass('hidden');
      });
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
// pause playing audio elements if another is started
document.addEventListener('play', function(element) {
   var audios = document.getElementsByTagName('audio');
   for (var i = 0, len = audios.length; i < len; i++) {
      if (audios[i] != element.target) {
         audios[i].pause();
      }
   }
}, true);
