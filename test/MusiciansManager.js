const MusiciansManager = artifacts.require('./MusiciansManager');

contract('MusiciansManager', accounts => {
    it('should add a musician', async function() {
        const contract = await MusiciansManager.deployed();
        const result = await contract.addMusician('0x6b70cc20186ad615de2636e35c7d046097ae8d05', 'John', {from: accounts[0]});
        assert.equal(result.logs[0].args._artistName, "John", "Not equal to John");
    })

    it('should not add a musician if it already exists', async function() {
        const Contract = await MusiciansManager.deployed();
        let err = null;
        try {
            await Contract.addMusician('0x6b70cc20186ad615de2636e35c7d046097ae8d05', 'John2', {from: accounts[0]});
        }
        catch(error) {
            err = error;
        }
        assert.ok(err instanceof Error);
    })

    it('should add a track', async function() {
        const contract = await MusiciansManager.deployed();
        const result = await contract.addTrack('0x6b70cc20186ad615de2636e35c7d046097ae8d05', 'trackTitle', 345, {from: accounts[0]});
        assert.equal(result.logs[0].args._title, "trackTitle", "Not equal to trackTitle");
    })

    it('should not add a track to an unknoow artist', async function() {
        const contract = await MusiciansManager.deployed();
        let err = null;
        try {
            await Contract.addTrack('0xc929ecc88038d69c1bd75267bcfc00acb8ab0aa8', 'trackkkk', 346, {from: accounts[0]});
        }
        catch(error) {
            err = error;
        }
        assert.ok(err instanceof Error);
    })

    it('should get the track of an artist', async function() {
        const contract = await MusiciansManager.deployed();
        const result = await contract.getTracks('0x6b70cc20186ad615de2636e35c7d046097ae8d05', {from: accounts[0]});
        assert.ok(Array.isArray(result.logs[0].args._tracks))
    })
})