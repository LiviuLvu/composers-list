jQuery(document).ready(function($) {
   // get the data from json
   console.log("executing ajax...");
   $.getJSON('data/articles.json', function(data) {
      // test data
      console.log("first name: " + data.articles[0].name);
      console.log("second name: " + data.articles[1].name);
   });
   // populate the list with data using jQ
});



var userList = [];

function User(name, age){
  this.name = name;
  this.age = parseInt(age);
}

$(document).ready(() => {
    init();
    addUser('George', 23);
    addUser('Adriana', 13);
    addUser('Mihai', 19);
});

function compareNumbers(a, b) {
  return a - b;
}

function init() {
    $('form').on('submit', e => e.preventDefault());

    $('#new-user').on('submit', e => newUser());
    $('#count-users').on('click', e => countUsers());
    $('#sort-by-age').on('click', e => sortUsers());
    $('#level-up').on('click', e => levelUpUsers());
}

function sortUsers(){
  console.log("sort");
  var sorted = userList.sort(function(user1, user2){
    return user1.age - user2.age;
  });
  console.log(sorted);
}

function levelUpUsers(){
  console.log("level-up");
  var usersLevelUp = userList.map(function(user){
    user.age += 1;
    return user;
  });
  console.log(usersLevelUp);
}


function countUsers(){
  var minAge = parseInt($('#min-age').val());
  var filtered = userList.filter(function(user){
    return user.age >= minAge;
  });
  console.log(filtered.length);
}


function newUser() {
    var name = $('#name').val(),
        age  = $('#age').val();

    if (!name || !age) {
        return alert('Both Name & Age are required');
    }

    $('#age').val('');
    $('#name').val('').focus();

    addUser(name, age);
}

function addUser(name, age) {

    // create a user object & store it
    var user = new User(name, age);
    userList.push(user);

    var content = '<strong>'+user.name+'</strong> ('+user.age+')';

    $('<li class="list-group-item"></li>')
        .html(content)
        .appendTo( $('ol') );
}
