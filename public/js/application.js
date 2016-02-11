$(document).ready(function() {

  // initialize tooltip for bootstrap button type="submit"
  $("[data-toggle='tooltip']").tooltip();

  // $(".list-group-item").on("mouseover", function() {
  //   $(this).css("background", "#F1F1F1");
  // });
  // $(".list-group-item").on("mouseout", function() {
  //   $(this).css("background", "#FFFFFF");
  // });

  // Attach a submit handler to the form
  $("form#add_url").on("submit", function(event){
    // Stop form from submitting normally
    event.preventDefault();
    // fetches value of form "action"
    var route = $(this).attr("action");
    // route = "/urls"

    // fetches value of input attribute "name" and parses into JSON format
    var data =  $(this).serialize();
    // data = "long_url=[url input]"

    // Send the data using post AJAX
    $.ajax({
        type: "POST",
        url: route,
        data: data,
        dataType: "json",
        success: function (data) {
          // console.log(data);
          var site_name = "nate.ly/"
          $(".list-group").prepend("<li class='list-group-item'><h3><a id='"
            + data.id + "' href='" + data.long_url + "' target='_blank' class='list-group-item-heading'>"
            + data.long_url + "</a></h3><span class='badge'>Clicks:&nbsp;"
            + data.click_count + "</span><span class='pull-right'><form id='delete_url' action='/delete/"
            + data.id + ">' method='post'><button type='submit' class='btn btn-xs btn-danger' "
            + "data-toggle='tooltip' data-placement='top' title='delete URL'><span class='glyphicon "
            + "glyphicon-trash'></button></form></span><h4><a href='"
            + data.short_url + "' target='_blank' class='list-group-item-text'>"
            + site_name+data.short_url + "</a></li>"
          );
        }, // success
        error: function (result) {
          console.log(result);
          $(".errors").html("<div class='alert alert-danger alert-dismissible' role='alert'> "
            + "<button type='button' class='close' data-dismiss='alert' aria-label='Close'> "
            + "<span aria-hidden='true'>&times;</span></button> "
            + "<span class='glyphicon glyphicon-exclamation-sign' aria-hidden='true'></span> "
            + "<span id='span_error' class='sr-only'>Error:</span>"
            + result.responseText
            + "</div>"
          );
        } // error
      }); // .ajax
  }); // .add_url.on("submit")

  // Attach a submit handler to the form
  $("form#delete_url").on("submit", function(event){
    event.preventDefault();

    // fetches value of form "action"
    var route = $(this).attr("action");
    // route = "/delete/[:id]"

    // Send the post using post AJAX
    $.ajax({
      context: this,
      type: "POST",
      url: route,
      success: function (data) {
        console.log(this);
        $(this).closest("li.list-group-item").remove();
      }, // success
      error: function (result) {
        console.log(result);
      } // error
    }); // .ajax
  }); // .delete_url.on("submit")
}); // document
