var events = require('events');

//candidate class
class Candidate extends events.EventEmitter{
    constructor(name) {
        super();
        this.votes = 0;
        this.on("voted",voted);
        this.on("voted",votesCounter);
        this.on("resetVotes1", () =>{
            updateVotes(this.votes);
            });
        this.name = name;
    }
    vote(){
        this.votes++;
        this.emit('voted');
        return `voted for ${this.name}`;
    }
    resetVotes(){
        this.emit('resetVotes1');
        this.votes = 0;
    }
    printVoted(){
        console.log(`voted for ${this.name}`);
    }
}

function voted(){
    console.log(`voted for ${this.name}`);
}

function votesCounter() {
    // Check  if votesCounter was initialized
    if ( typeof votesCounter.counter == 'undefined' ) {
        votesCounter.counter = 0;
    }
    ++votesCounter.counter;
}
//return all votes for all the canditates
var getAll = () => votesCounter.counter;

//delets votes for chosen candites
var updateVotes = (votes) => votesCounter.counter -= votes;

//set all votes to 0 for all canditates
var resetAll = () => votesCounter.counter = 0;

module.exports = Candidate;
module.exports.getAll = getAll;
module.exports.resetAll = resetAll;
