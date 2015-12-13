var Events = require('event-pubsub');
var readline = require('readline');

var event = new Events;
var simon = [];
var simonStored = [];

var rl = readline.createInterface(
    {
        input: process.stdin,
        output: process.stdout
    }
);

function add(){
    simonStored.unshift(Math.round((Math.random() * 100) % 3));
    simon = simonStored.slice();

    console.log('stored array :',simonStored);

    event.trigger(
        'ask'
    );
}

function askHandler(){
    rl.question('whats next?', answerHandler);
}

function answerHandler(answer){
    if (Number(answer) == simon[0]){
        event.trigger(
            'correct'
        );
    }else{
        event.trigger(
            'wrong'
        );
    }
}

function correctHandler(){
    simon.shift();
    if(simon.length === 0){
        add();
        return;
    }

    event.trigger(
        'ask'
    );
}

function wrongHandler(){
    console.log('wrong');
    simonStored = [];
    simon = [];
    add();
}

event.on(
    'ask',
    askHandler
);

event.on(
    'correct',
    correctHandler
);

event.on(
    'wrong',
    wrongHandler
);

add();
