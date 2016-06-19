$(document).ready(function() {
   $('#get-data').click(function() {
      var showData = $('#show-data');

      $.getJSON('data/composers.json', function(data) {
         // how does map work?
         var items = data.map(function(data) {
            return data.name + ' - ' + data.born;
         });
         // removes dom elements and text content inside selected element
         showData.empty();
         // if list is not empty
         if (items.length) {
            var content = '<li>' + items.join('</li><li>') + '</li>';
            var list = $('<ul />').html(content);
            // insert data inside selected element
            showData.append(list);
         }
      });

      showData.text('Loading the JSON file.');
   });
});
