const cryptoHash = require('./crypto-hash');

describe("cryptoHash()", () => {

    it("Generates a SHA-256 hashed Output", () => {
        expect(cryptoHash("foo")).toEqual('b2213295d564916f89a6a42455567c87c3f480fcd7a1c15e220f17d7169a790b');
    });

    it("produces the same hash with the same input argumnets in any order", () => {
        expect(cryptoHash('one', 'two', 'three')).toEqual(cryptoHash('three', 'one', 'two'));
    });

    it("produce a unique hash when the propertien on an input has changed", () => { 
        const foo = {};
        const originalSignature = cryptoHash(foo);
        foo['a'] = 'a';

        expect(cryptoHash(foo)).not.toEqual(originalSignature);
    });
});