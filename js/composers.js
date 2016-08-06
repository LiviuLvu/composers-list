$(document).ready(function() {
    // populate empty list in the html
    var showData = $('#show-data');

    $.getJSON('data/composers.json', function(data) {
        // Using list.js below.
        var values = data;
        // Define value names
        var options = {
            valueNames: ['name', 'born', 'died', 'nationality', 'introduction', { name: 'image', attr: 'src' }, { name: 'audiosample', attr: 'src' }],
            plugins: [ListFuzzySearch()],
            item: '<li class="listItem">' +
                '<img class="image" src="img/alexander-borodin.jpg" alt="Composer Image">' +
                // text for introduction details
                '<div>' +
                '<h6 class="name "></h6>' +
                '<div><p class="born"></p><p class="dash-spacer">-</p><p class="died"></p></div>' +
                '<p class="nationality "></p>' +
                '<div><small><a href="" class="playLink">Audio Sample</a>' +
                '<audio class="audiosample"  id="audiosample" src="audio/mozart-eine-kleine-nachtmusik.mp3" type="audio/mpeg">Audio not supported, please update browser</audio>' +
                '</small>' +
                '<small><a href="" class="showIntro">Short Introduction</a></small>' +
                '</div>' +
                '</div>' +
                // detailed introduction description - hidden
                '<div class="hidden introduction-backgroundCover">' +
                '<div class="introduction-container">' +
                '<h4 class="introduction-name">Name of Composer</h4>' +
                '<p class="introduction"></p><a href="" class="closePopup">Close</a></div>' +
                '</div>' +
                '</li>'
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
        // show introduction info
        $('.showIntro').on('click', function(event) {
            event.preventDefault();
            // related introduction tag to clicked link
            var clickedintroduction = $(this).closest('li').children('div.introduction-backgroundCover');
            // hide previously visible introduction info
            // $('div.introduction-backgroundCover').not(clickedintroduction).addClass('hidden');
            // toggle class on the desired introduction
            $('body').addClass('noScroll');
            clickedintroduction.toggleClass('hidden');

        });
        // hide introduction info
        $('.closePopup').on('click', function(event) {
            event.preventDefault();
            var openedModal = $(this).closest('div.introduction-backgroundCover');
            openedModal.toggleClass('hidden');
            $('body').removeClass('noScroll');
        });
        // close when clicking on transparent gray area
        $('.introduction-backgroundCover').on('click', function(event) {
            $(this).toggleClass('hidden');
            $('body').removeClass('noScroll');
        });
        $(".introduction-container").click(function(e) {
            e.stopPropagation();
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
