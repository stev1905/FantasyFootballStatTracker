var Player = {
    team:'',
    name:'',
    fantasypts:''
}

var Defense = {
    opponent:'',
    team:'',
    fantasypts:''
}

function sortPlayers(playerOne, playerTwo){ 
    return parseFloat(playerTwo.fantasypts) - parseFloat(playerOne.fantasypts); 
}

function getPlayer(playerData) {
    var player = Object.create(Player);
    player.team = playerData.Team;
    player.name = playerData.Name;
    player.fantasypts = playerData.FantasyPoints;

    return player;
} 
function getDefense(DEFData) {
    var defense = Object.create(Defense);
    defense.opponent = DEFData.Opponent;
    defense.team = DEFData.Team;
    defense.fantasypts = DEFData.FantasyPoints;

    return defense;
}   
function showDefResults(playerData){
    var html = "";
        $.each(playerData, function(index,value){
        html += '<tr class="playerRow">' + '<td>' +value.opponent+'</td>'+'<td>' +value.team+'</td>'+'<td>' +value.fantasypts+'</td>'+'<tr>';
  });
  return html;
}

function showResults(playerData){
    var html = "";
        $.each(playerData, function(index,value){
        html += '<tr class="playerRow">' + '<td>' +value.team+'</td>'+'<td>' +value.name+'</td>'+'<td>' +value.fantasypts+'</td>'+'<tr>';
  });
  return html;
}

var getDEFInfo = function(week){
    var request2 = { 
            week: week
        };

        $.ajax({
            url: "https://api.fantasydata.net/v3/nfl/stats/JSON/FantasyDefenseByGame/2016REG/"+week+"?",
            beforeSend: function(xhrObj){
                // Request headers
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","5cacd7f5aa284675bc5d8a38147a7019");
            },
            data: request2,
            type: "GET",
            // Request body
        })
        .done(function (data) {
            var DEF = [];
            var DEFData = data;
            $.each(DEFData, function(index,value){
                DEF.push(getDefense(value)); 
                console.log(value);
        });
            DEF.sort(sortPlayers);
            var TopDEF = DEF.slice(0, 5);
            var BottomDEF = DEF.slice(20, 25);
            $('#DEFtable').append(showDefResults(TopDEF));
            $('#CDEFtable').append(showDefResults(BottomDEF));

    });
}

var getPlayerInfo = function(week) {
        var request2 = { 
            week: week
        };
        $.ajax({
            url: "https://api.fantasydata.net/v3/nfl/stats/JSON/PlayerGameStatsByWeek/2016REG/"+week+"?",
            //url2: "https://api.fantasydata.net/v3/nfl/stats/JSON/FantasyDefenseByGame/2016REG/"+week+"?",
            beforeSend: function(xhrObj){
                // Request headers
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","5cacd7f5aa284675bc5d8a38147a7019");
            },
            data: request2,
            type: "GET",
            // Request body
        })
        .done(function (data) {
            var QB = [];
            var RB = [];
            var WR = [];
            var TE = [];
            var K = [];
            var playerData = data;

        $.each(playerData, function(index,value){
            if((value.FantasyPosition==="QB")&&(value.FantasyPoints>1)){
                QB.push(getPlayer(value)); 
            } 
            if((value.FantasyPosition==="RB")&&(value.FantasyPoints>1)){
                RB.push(getPlayer(value));
            }   
            if((value.FantasyPosition==="WR")&&(value.FantasyPoints>1)){
                WR.push(getPlayer(value));
            } 
            if((value.FantasyPosition==="TE")&&(value.FantasyPoints>1)){
                TE.push(getPlayer(value));
            }  
            if((value.FantasyPosition==="K")&&(value.FantasyPoints>1)){
                K.push(getPlayer(value));

            }    
    });
            QB.sort(sortPlayers);
            var TopQB = QB.slice(0, 5);
            var BottomQB = QB.slice(20, 25);
            $('#QBtable').append(showResults(TopQB));
            $('#CQBtable').append(showResults(BottomQB));

            RB.sort(sortPlayers);
            var TopRB = RB.slice(0, 5);
            var BottomRB = RB.slice(20, 25);
            $('#RBtable').append(showResults(TopRB));
            $('#CRBtable').append(showResults(BottomRB));

            WR.sort(sortPlayers);
            var TopWR = WR.slice(0, 5);
            var BottomWR = WR.slice(20, 25);
            $('#WRtable').append(showResults(TopWR));
            $('#CWRtable').append(showResults(BottomWR));

            TE.sort(sortPlayers);
            var TopTE = TE.slice(0, 5);
            var BottomTE = TE.slice(20, 25);
            $('#TEtable').append(showResults(TopTE));
            $('#CTEtable').append(showResults(BottomTE));

            K.sort(sortPlayers);
            var TopK = K.slice(0, 5);
            var BottomK = K.slice(20, 25);
            $('#Ktable').append(showResults(TopK));
            $('#CKtable').append(showResults(BottomK));

        }); 
    
    }

$(document).ready( function() {
    getPlayerInfo(1);
    getDEFInfo(1);
    $('.button').click( function(e){
        e.preventDefault();
        //alert('this button works');
        $('.playerRow').remove('');
        // get the value of the tags the user submitted
        var week = $('#week').val()
        getPlayerInfo(week);
        getDEFInfo(week);
    });
});





