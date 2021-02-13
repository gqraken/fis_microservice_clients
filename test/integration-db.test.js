const Client = require('../clients');
const mongoose = require('mongoose');
const dbConnect = require('../db');

describe('Contacts DB connection', () => {
    beforeAll(async () => {
        await dbConnect();
    })

    beforeEach((done) => {
        Client.deleteMany({}, (err) => {
            done();
        });
    });

    it('writes a contact in the DB', (done) => {
        const client = new Client({username: "guillermo",
        password:"clave1234",
        firstName:"Guillermo",
        lastName:"Rodríguez",
        address:"asdasdasd",
        email:"prueba@prueba.com",
        phone:"654366210"
    });
        client.save((err, client) => {
            expect(err).toBeNull();
            Client.find({}, (err, clients) => {
                expect(clients).toBeArrayOfSize(1);
                done();
            });
        });
    });

    afterAll((done) => {
        mongoose.connection.db.dropDatabase(() => {
            mongoose.connection.close(done);
        });
    });

})
