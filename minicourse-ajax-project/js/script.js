
function loadData(event) {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    var streetStr = $("#street").val();
    var cityStr = $("#city").val();
    var address = streetStr + ',' + cityStr;

    $greeting.text('do yo want to live at ' + address +'?');

    var streetviewUrl = 'http://maps.googleapis.com/maps/api/streetview?size=600x300&location=' + address + '';
    $body.append('<img class="bgimg" src="'+streetviewUrl+ '">');
    
    var nytimesUrl = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + cityStr + '&sort=newest&api-key=4bb48b181e7c4c5fb42015bab572f878';
    $.getJSON(nytimesUrl, function(data){
        $nytHeaderElem.text('New York Times Articles About ' +cityStr);

        articles = data.response.docs;
        for(var i=0; i < articles.length; i++){
            var article = articles[i];
            $nytElem.append('<li class="article">' +'<a href="'+article.web_url+'">' + article.headline.main+'</a>'+ '<p>' + article.snippet + '</p>' +'</li>');
        };
    }).error(function(e){
        $nytHeaderElem.text('new york times article could not be dislayed');
    });
    
    var wikiUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' +cityStr+ '&format=json&callback=wikicallback';
    
    $.ajax({
        url: wikiUrl,
        dataType: "jsonp",
        success: function( response ){
            var articleList = response[1];

            for (var i=0;i< articleList.length; i++){
                articleStr = articleList[i];
                var url = 'http://en.wikipedia.org/wiki/' +articleStr;
                $wikiElem.append('<li><a href="' +url+ '">' + articleStr +'</a></li>');
            };
        }
    });

    return false;
    event.preventDefault();
};

$('#form-container').submit(loadData);


