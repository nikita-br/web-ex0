var candidate = require('./module');
var express   = require('express'),
    url       = require('url'),
    app       = express(),
    port      = process.env.PORT || 8080;

app.listen(port);
var candidates = [new candidate("BIBI"),new candidate("LIBERMAN"),new candidate("LAPID")];

candidate.resetAll(); //reset all votes before Elections
//loop that creates 20 votes
var votes = [];
for (let i = 0; i < 20; i++) {
    if(i<10){
        votes.push(candidates[0].vote());
    }
    if(i>=10 && i<15){
        votes.push(candidates[1].vote());
    }
    if(i>=15)
        votes.push(candidates[2].vote());
}
console.log("number of all votes:" + candidate.getAll());
//server
app.get('/',(req,res) => {
    var candidateJson = [];
    var votesJson = [];//creates Json array for candidates
    for (let i = 0; i < candidates.length; i++) {
        candidateJson.push({name: candidates[i].name, votes: candidates[i].votes});
    }
    //creates Json array for votes
    for (let i = 0; i < votes.length; i++) {
        votesJson.push({vote:votes[i]});
    }
    app.set('json spaces', 4);
    res.status(200).json({votesLog:votes,numberOfCandidaes:candidates.length,allVotesCounter:candidate.getAll(),canditates:candidateJson});
});