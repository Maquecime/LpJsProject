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
            fetchMock.get(`http://localhost:7890/api/change`, [{attribute_a: 'AAA', attribute_b: 'BBB', attribute_c: 333}]);
            const client = httpclient('localhost', 7890);
            client.getAll().then((changes) => {
                expect(changes).to.eql([{attribute_a: 'AAA', attribute_b: 'BBB', attribute_c: 333}]);
            })
        });
    });

    describe('Test Post', () => {
        it('test /', async () => {
            fetchMock.post(`http://localhost:7890/api/change`, {eeee: "tttt"});
            const client = httpclient('localhost', 7890);
            client.add().then((changes) => {
                const request = fetchMock.lastCall()[1];
                expect(request.method).equal('post');
            })
        });
    });

    describe('Test FindOne', ()=>{
        it('test /',async () =>{
            fetchMock.get('http://localhost:5080/api/rockets/1',[{id:'1', name:'fusee', country:'france', takeOffThrust:'5'},{id:'2', name:'fusee2', country:'france', takeOffThrust:'5'},{id:'3', name:'fusee3', country:'france', takeOffThrust:'5'}]);
            const client = httpclient('localhost', 5080);
            client.findOne('1').then((changes)=>{
                expect(changes).to.eql([{id:'1',name:'fusee',country:'france',takeOffThrust:'5'}]);
            })

        })
    })
});