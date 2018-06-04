var tweetArr = [];
var tweetIdx = 0;
var seerPk;
var tweetCount;
var party;
var server;
var survey_link;
var seerId = AMT_ID ? AMT_ID : Math.random().toString(36).substring(7);
var pause = 0;

function initialize() {
    window.addEventListener("message", receiveMessage, false);
    tweetCount = variables["tweet_count"];
    party = variables["party"];
    server = variables["server"];
    survey_link = variables["survey_link"];
    
    $.ajax({url: server + "/get_tweet_ids/",
      method: "GET",
      dataType: "jsonp",
      data: {"seer_uid": seerId, "party": party, count: tweetCount},
      json: tweetData
    });
}

function receiveMessage(event) {
  //alert(event.data);
  if(event.data == "closeQSIWindow") {
    $.ajax({url: server + "/set_tweet_seen/",
      method: "GET",
      dataType: "jsonp",
      data: {"seer_pk": seerPk,
             "thing_seen_pk": tweetArr[tweetIdx++].thing_seen_pk},
      json: loadQualSurvey
    });
  }
}

function tweetData(data) {
    seerPk = data.seer_pk;
    tweetArr = data.tweet_data;
    
    $("#tweet-count").html(tweetArr.length);
    $("#tweet-idx").html(tweetIdx + 1);
    $("#tweets-loading").hide();
    $("#instructions").show();
    
    loadQualSurvey();
}

function loadQualSurvey() {
    setTimeout(function() {
        pause = 3000;
        if(tweetIdx < tweetArr.length) {
            $("#qualFrame").hide();
            $("#tweet-idx").html(tweetIdx + 1);
            $("#tweet-link").html("<a href=https://twitter.com/statuses/" + tweetArr[tweetIdx].tweet_id + " target='_blank'>LINK</a>");
            $("#tweet-link").click(function() {
                $("#qualFrame").attr("src",
                                     survey_link +
                                     "&testId=" + seed,
                                     "&party=" + party,
                                     "&amtId=" + seerId);
                $("#qualFrame").attr("height", 800);
                $("#qualFrame").show();
            });
        }
        else {
            $("#qualFrame").hide();
            $("#all-done").html("Looks like you're all done!");
            payAMT();
        }
    }, pause);
}