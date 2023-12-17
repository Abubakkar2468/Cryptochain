const cryptoHash = require('./crypto-hash');

describe("cryptoHash()", () => {

    it("Generates a SHA-256 hashed Output", () => {
        expect(cryptoHash("foo")).toEqual('2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae');
    });

    it("produces the same hash with the same input argumnets in any order", () => {
        expect(cryptoHash('one', 'two', 'three')).toEqual(cryptoHash('three', 'one', 'two'));
    });
});