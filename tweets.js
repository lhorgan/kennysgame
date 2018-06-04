function initialize() {
    $.ajax({url: "http://localhost:5000/get_tweet_ids/",
      method: "GET",
      dataType: "jsonp",
      data: {"seer_uid": "me", "party": "democrat"},
      json: tweetData
    });
}

function tweetData(data) {
    console.log("HELLO");
    console.log(data);
    var $tbody = $("#tweet-table-body");
    for(var i = 0; i < data.tweet_data.length; i++) {
        console.log("making some stuff......");
        $tbody.append("<tr><td>" + data.tweet_data[i].tweet_id + "</td><td>Qualtrics Link</td></tr>")
    }
}