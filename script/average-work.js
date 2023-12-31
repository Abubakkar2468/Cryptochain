const Blockchain = require('../blockchain');

const blockchain = new Blockchain();

blockchain.addBlock({ data: 'initial'});

let prevTimestamp, nextTimstamp, timeDiff, average, nextBlock;

const times = [];


for (let i = 0; i < 10000; i++) {

    prevTimestamp = blockchain.chain[blockchain.chain.length - 1].timestamp;

    blockchain.addBlock({ data: `block ${i}`});
    nextBlock = blockchain.chain[blockchain.chain.length - 1];
    nextTimstamp = nextBlock.timestamp;

    timeDiff = nextTimstamp - prevTimestamp;

    times.push(timeDiff);

    average = times.reduce((total, num) => (total + num)) / times.length;

    console.log(`Time to mine a block: ${timeDiff}ms. Difficulty: ${nextBlock.difficulty}. Average Time: ${average}ms`);
}