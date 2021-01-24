const app = require('../server.js');
const request = require('supertest');
const Client= require('../clients.js');

describe("Hello world tests", () => {


    it("Should do an stupid test", () => {
        const a = 5;
        const b = 3;
        const sum = a + b;

        expect(sum).toBe(8);
    });

});


describe("Clients API", () => {
    describe("GET /", () => {
        it("Should return an HTML document", () => {
            return request(app).get("/").then((response) => {
                expect(response.status).toBe(200);
                expect(response.type).toEqual(expect.stringContaining("html"));
                expect(response.text).toEqual(expect.stringContaining("h1"));
            });
        });
    });

    describe("GET /clients", () => {

        beforeAll(() => {
            const client = [
             new Client     ( {"username": "guillermo",
                    "password":"clave",
                    "firstName":"Guillermo",
                    "lastName":"Rodríguez",
                    "address":"asdasdasd",
                    "email":"prueba@prueba.com",
                    "phone":"654366210"
                })
            ];

            dbFind = jest.spyOn(Client, "find");
            dbFind.mockImplementation((query, callback) => {
                callback(null, client);
            });
        });

        it("Should return all clients", () => {
            return request(app).get('/api/v1/clients').then((response) => {
                expect(response.statusCode).toBe(200);
                expect(response.body).toBeArrayOfSize(1);
                expect(dbFind).toBeCalledWith({}, expect.any(Function));
            });
        });
    });
    describe('POST /register', () => {
        const client =  {"username": "guillermo22",
        "password":"clave123444546",
        "firstName":"Guillermo",
        "lastName":"Rodríguez",
        "address":"asdasdasd",
        "email":"prueba@prueba.com",
        "phone":"654366210"
    };
        let dbInsert;

        beforeEach(() => {
            dbInsert = jest.spyOn(Client, "create");
        });

        it('Should add a new client if everything is fine', () => {
            dbInsert.mockImplementation((c, callback) => {
                callback(false);
            });

            return request(app).post('/api/v1/clients').send(client).then((response) => {
                expect(response.statusCode).toBe(201);
                expect(dbInsert).toBeCalledWith(client, expect.any(Function));
            });
        });

        it('Should return 500 if there is a problem with the DB', () => {
            dbInsert.mockImplementation((c, callback) => {
                callback(true);
            });

            return request(app).post('/api/v1/clients').send(client).then((response) => {
                expect(response.statusCode).toBe(500);
            });
        });
    });
});  