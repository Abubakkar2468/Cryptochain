const Block = require('./block');
const { cryptoHash } = require('../util');

class Blockchain {
    
    constructor( ) {
        this.chain = [Block.genesis()];
    }

    addBlock({ data }) {
        const newBlock = Block.mineBlock({
            lastBlock: this.chain[this.chain.length - 1],
            data
        });

        this.chain.push(newBlock);
    }

    replaceChain(chain) {
        if (chain.length <= this.chain.length) {
            console.error("The incoming chain must be longer");
            return;
        }

        if (!Blockchain.isValidChain(chain)) {
            console.error("The incoming chain must be valid");
            return;
        }

        console.log("replacing the chain with", chain);
        this.chain = chain;
    }

    static isValidChain(chain) {

        if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())){
            return false;
        }

        for (let i = 1; i < chain.length; i++) {
            const { timestamp, lastHash, data, hash, nonce, difficulty} = chain[i];

            const actualLastHash = chain[i - 1].hash;
            const lastDifficulty = chain[i - 1].difficulty;

            if (lastHash !== actualLastHash) return false;

            const validateHash = cryptoHash(timestamp, lastHash, data, nonce, difficulty);
            
            if (validateHash !== hash) return false;

            if (Math.abs(lastDifficulty - difficulty) > 1) return false;
        }

        return true;
    }

}


module.exports = Blockchain;