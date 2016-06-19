chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

  if (request.data.url.includes("youtube.com/watch")){

    hideComments();

    appendSubtitleForm(request.data.url.substr(30));

    showNewComments(request.data.url.substr(30));

  }

});

function hideComments() {
  var el = $("#watch-discussion");
  if (el && el.css("display") == 'none'){
    el.css({"display": "block"});
  }
  else {
    el.css({"display": "none"})
  }
}

// function changeVideoStyle(){
//   $("#movie_player").css({"opacity": 0.3})
//   $(".captions-text").css({"color": "yellow"})
// }

// function addSubtitlesField(){
//   $("#movie_player").append("<div><p>Hi</p></div>")
// }

function appendSubtitleForm(url){

  $("#watch-header").append("<form id='captionform'></form>");
  
  var $form = $("#captionform");

  $form.append("<h4>Write your comment below (be nice)</h4>");

  $form.append("<textarea id='captioninput' form='captionform' cols='40' rows='5' type='text' name='subtitles'></textarea>");
  
  var $caption = $("#captioninput");

  $form.append("<input type='submit' value='Submit'>");

  $caption.css({"width": "100%"});
  $caption.css({"height": "100%"});
  $caption.css({"padding": "12px 20px"});
  $caption.css({"margin": "8px 0"});
  $caption.css({"border": "1px solid #ccc"});
  $caption.css({"box-sizing": "border-box"});
  $caption.css({"padding": "20px 10px"});
  $caption.css({"line-height": "20px"});

  $form.submit(function(event){

    $.ajax({
      method: "POST",
      url: "https://localhost:1337/api/",
      data: { url: url, content: $(this).context[0].value }
    })
    .done(function( msg ) {});
    return false;
  });
}

//The function below uses a jsonp request to handle cross domain ajax.

function showNewComments (url){
  $("#watch-header").append("<div id='newcomments'>Comments</div>");

  var text = '';
  
  $.ajax({
      url: 'https://localhost:1337/api/' + url,
      jsonp: false,
      success: function(res){
        console.log(res);
          var text = '';
          var len = res.length;
          for(var i=0;i<len;i++){
              var comment = res[i];
              text += '<h4>' + comment.createdAt + '</h4><h3 class="newcomment">' + comment.content + '</h3><br>';
          }
          $("#newcomments").append(text);
      }
  });

  $(".newcomment").css()
}

