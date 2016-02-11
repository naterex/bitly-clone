$(document).ready(function() {
  // initialize tooltip for bootstrap button type="submit"
  initialize();

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
          var site_name = "nate.ly/";
          $(".list-group").prepend("<li class='row list-group-item'><h3><a id='"
            + data.id + "' href='" + data.long_url + "' target='_blank' class='list-group-item-heading'>"
            + data.long_url + "</a></h3><span class='badge'>Clicks:&nbsp;"
            + data.click_count + "</span><span class='pull-right'><form id='delete_url' action='/delete/"
            + data.id + "' method='post'><button type='submit' class='btn btn-xs btn-danger' "
            + "data-toggle='tooltip' data-placement='top' title='delete URL'><span class='glyphicon "
            + "glyphicon-trash'></button></form></span><h4><a href='"
            + data.short_url + "' target='_blank' class='list-group-item-text'>"
            + site_name+data.short_url + "</a></li>").hide().slideDown("slow");
          refresh_dom_elements();
          // debugger
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



  function initialize(){
    refresh_dom_elements();
  };

  function refresh_dom_elements() {
    $("[data-toggle='tooltip']", 'body').tooltip();
    form_binding();
  };

  function form_binding() {
    // Attach a submit handler to the form
    $("form#delete_url", "body").on("submit", function(event){
      event.preventDefault();
      // fetches value of form "action"
      var route = $(this).attr("action");
      // route = "/delete/[:id]"
      var $form = $(this);

      // show SweetAlert prompt
      swal({
        title: "Delete this URL?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete it!",
        closeOnConfirm: true
      }, function(isConfirm){
          if (isConfirm){
            // debugger

            // Send the post using post AJAX
            $.ajax({
              context: $form,
              type: "POST",
              url: route,
              success: function (data) {
                // debugger
                console.log($form);
                $form.closest("li.list-group-item").fadeOut("slow");
              }, // success
              error: function (result) {
                console.log(result);
              } // error
            }); // .ajax
          } // isConfirm
      }); // swal
    }); // .delete_url.on("submit")
  };

}); // document
