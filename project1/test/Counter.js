const { ethers } = require('hardhat');
const { expect } = require('chai');

describe('Counter', function () {
    let Counter;
    let counter;
    let owner;

    before(async function () {
        [owner] = await ethers.getSigners();

        const CounterFactory = await ethers.getContractFactory('Counter');
        Counter = await CounterFactory.deploy('MyCounter', 0);
        await Counter.deployed();

        counter = Counter;
    });

    it('should initialize with the correct name and count', async function () {
        expect(await counter.name()).to.equal('MyCounter');
        expect(await counter.count()).to.equal(0);
    });

    it('should increment and decrement the count', async function () {
        await counter.increment();
        expect(await counter.count()).to.equal(1);

        await counter.decrement();
        expect(await counter.count()).to.equal(0);
    });

    it('should update the name', async function () {
        await counter.setName('NewCounterName');
        expect(await counter.name()).to.equal('NewCounterName');
    });
});
