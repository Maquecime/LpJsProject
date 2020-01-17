const chai = require('chai');
const fetchMock = require('fetch-mock');
const fetch = require("node-fetch");
global.fetch = fetch;

const chaiFetch = require('chai-fetch');
chai.use(chaiFetch);

const httpclient = require('../client')

const { expect } = chai;

describe('Test API', () => {

    afterEach(fetchMock.resetBehavior)

    describe('Test Get', () => {
        it('test /', async () => {
            fetchMock.get(`http://localhost:7890/api/rockets`, [{id:'1', name:'fusee', country:'france', takeOffThrust:'5'}, {id:'2', name:'magrossefusee', country:'france', takeOffThrust:'69'}]);
            const client = httpclient('localhost', 7890);
            client.findAll().then((changes) => {
                expect(changes).to.eql([{id:'1', name:'fusee', country:'france', takeOffThrust:'5'}, {id:'2', name:'magrossefusee', country:'france', takeOffThrust:'69'}]);
            })
        });
    });

    describe('Test Post', () => {
        var myObject = {id:'5', name:'matresgrossefusee', country:'france', takeOffThrust:'51'};
        it('test /', async () => {
            fetchMock.post(`http://localhost:7890/api/rockets`, 201);
            const client = httpclient('localhost', 7890);
            client.add(myObject).then((changes) => {
                const request = fetchMock.lastCall()[1];
                expect(request.body).equal(myObject);
            })
        });
    });

    describe('Test FindOne', () => {
        it('test /', async () =>{
            fetchMock.get('http://localhost:7890/api/rockets/1',{id:'1', name:'fusee', country:'france', takeOffThrust:'5'});
            const client = httpclient('localhost', 7890);
            client.findOne('1').then((rocket)=>{
                expect(rocket).to.eql({id:'1',name:'fusee',country:'france', takeOffThrust:'5'});
            })
        });
    });
});