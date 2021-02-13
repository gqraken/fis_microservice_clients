const app = require('../server.js');
const request = require('supertest');
const Client= require('../clients.js');
const token = "fdgdfgdfgdfglkñjewlklekjwrljlkjsadlfkniu023984093840293lkhjkldf";


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
                    "email":"prueba2@prueba.com",
                    "phone":"654366210"
                })
            ];

            dbFind = jest.spyOn(Client, "find");
            dbFind.mockImplementation((query, callback) => {
                callback(null, client);
            });
        });

        it("Should return all clients", () => {
            return request(app).get('/api/v1/clients').set('auth-token',token).then((response) => {
                expect(response.statusCode).toBe(200);
                expect(response.body).toBeArrayOfSize(1);
                expect(dbFind).toBeCalledWith({}, expect.any(Function));
            });
        });

        it("Should return a 401 response code if no token is sended: DENIED", () => {
            return request(app).get('/api/v1/clients/').then((response) => {
                expect(response.status).toBe(401);
            });
        });   
    });
    
    describe("DELETE /api/v1/users/{:username}",()=>{
        const testUsername = "guillermo";
        
        
        beforeAll(() => {
            dbdeleteOne = jest.spyOn(Client,"remove");

        });

        it("Should return a 200 response code if everything is OK", () => {
            dbdeleteOne.mockImplementation((testUsername, callback) => {
                callback(false);
            });
            return request(app).delete('/api/v1/clients/'+testUsername).set('auth-token',token).then((response) => {
                expect(response.status).toBe(200);
            });
        });    

        it("Should return a 500 response code if there is an error with database", () => {

            
            dbdeleteOne.mockImplementation((testUsername, callback) => {
                callback(true);
            });

            return request(app).delete('/api/v1/clients/'+testUsername).set('auth-token',token).then((response) => {
                expect(response.status).toBe(500);
            });
        }); 


        it("Should return a 404 response code if no username is sended", () => {
            const noUsername = "";
            
            return request(app).delete('/api/v1/clients/'+noUsername).set('auth-token',token).then((response) => {
                expect(response.status).toBe(404);
            });
        });   

        it("Should return a 401 response code if no token is sended: DENIED", () => {
            dbdeleteOne.mockImplementation((testUsername, callback) => {
                callback(false);
            });
            return request(app).delete('/api/v1/clients/'+testUsername).then((response) => {
                expect(response.status).toBe(401);
            });
        });   
        
    });

    describe("PUT /api/v1/users/{:username}",()=>{
        const testUsername = "guillermo";
        const client = [
            new Client     ( {"username": "guillermo",
                   "password":"clave",
                   "firstName":"Guillermo",
                   "lastName":"Rodríguez",
                   "address":"asdasdasd",
                   "email":"prueba2@prueba.com",
                   "phone":"654366210"
               })
           ];
        
        beforeAll(() => {
            dbUpdateOne = jest.spyOn(Client,"updateOne");

        });

        it("Should return a 200 response code if everything is OK", () => {
            dbUpdateOne.mockImplementation((testUsername,client, True, callback) => {
                callback(false);
            });
            return request(app).put('/api/v1/clients/'+testUsername).set('auth-token',token).then((response) => {
                expect(response.status).toBe(200);
            });
        });    

        it("Should return a 500 response code if there is an error with database", () => {

            
            dbUpdateOne.mockImplementation((testUsername,client, True, callback) => {
                callback(true);
            });

            return request(app).put('/api/v1/clients/'+testUsername).set('auth-token',token).then((response) => {
                expect(response.status).toBe(500);
            });
        }); 


        it("Should return a 404 response code if no username is sended", () => {
            const noUsername = "";
            
            return request(app).put('/api/v1/clients/'+noUsername).set('auth-token',token).then((response) => {
                expect(response.status).toBe(404);
            });
        });  
        
        it("Should return a 401 response code if no token is sended: DENIED", () => {
            dbUpdateOne.mockImplementation((testUsername,client, True, callback) => {
                callback(false);
            });
            return request(app).put('/api/v1/clients/'+testUsername).then((response) => {
                expect(response.status).toBe(401);
            });
        });
        
    });

    describe("POST /users/register", () => {
        let dbSave;

        beforeEach(() => {
            dbSave = jest.spyOn(Client,"create");
        });

        
        const testUser =  {
            "username": "guillermo22",
            "password":"clave123444546",
            "firstName":"Guillermo",
            "lastName":"Rodríguez",
            "address":"asdasdasd",
            "email":"prueba@prueba.com",
            "phone":"653366210"
        };

        it('Should add a new client if everything is fine', () => {
            dbSave.mockImplementation((c, callback) => {
                callback(false);
            });

            return request(app).post("/api/v1/register").send(testUser).then((response)=>{
                expect(response.statusCode).toBe(201);
            });
        });

        it('Should add a new client if everything is fine', () => {
            dbSave.mockImplementation((c, callback) => {
                callback(true);
            });

            return request(app).post("/api/v1/register").send(testUser).then((response)=>{
                expect(response.statusCode).toBe(500);
            });
        });

       
    });

    
});  
