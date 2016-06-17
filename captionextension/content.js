var xhr = new XMLHttpRequest();

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

  if (request.data.url.includes("youtube.com/watch")){

    showHide();

    changeVideoStyle();

    addSubtitlesField(request.data.url);

    appendSubtitleForm(request.data.url);

  }

});

function showHide() {  
  var el = $("#watch-discussion");
  if (el && el.css("display") == 'none'){
    el.css({"display": "block"});
  }  
  else {
    el.css({"display": "none"})
  }
}

function changeVideoStyle(){
  $("#movie_player").css({"opacity": 0.3})
}

function addSubtitlesField(url){
  $("#movie_player").append("<div><p>" + url + "</p></div>")
}

function appendSubtitleForm(url){
  console.log("xxxxxxxxxxxxxxxxxxxxx")
  $("#watch-header").append("<form id='captionform'></form>");
  
  var $form = $("#captionform");

  $form.append("<h4>Write your captions below</h4>");

  // $form.append("<input id='captioninput' type='text' name='subtitles'>");

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
  $caption.css({"line-height": "28px"});

  $form.submit(function(event){
    $.ajax({
      method: "POST",
      url: "https://localhost:1337/api/",
      data: { url: url, content: $(this).serialize() }
    })
    .done(function( msg ) {
      alert( "Data Saved: " + msg );
    });
    return false;
  });
}