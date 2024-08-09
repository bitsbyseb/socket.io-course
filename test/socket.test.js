const {createServer} = require('http');
const {Server} = require('socket.io');
const Client = require("socket.io-client");

let io,serverSocket,clientSocket;
describe("test socket.io",() => {
    beforeAll(done => {
        const server = createServer();
        io = new Server(server);
        server.listen(3000,() => {
            console.log("listening on http://localhost:3000");
            clientSocket = new Client('http://localhost:3000');
            io.on("connection", socket => {
                serverSocket = socket;
            });

            clientSocket.on("connect",done);
        });
    });

    test("connection test",done => {
        serverSocket.emit("greeting","Privet");

        clientSocket.on("greeting",greet => {
            try {
                expect(greet).toBe("Privet");
                done();
            } catch (error) {
                done(error);
            }
        }); 
    });

    test("emitters callbacks (acknowledgments)",done => {
        serverSocket.on("bark",callback => {
            callback("woof!");
        });

        clientSocket.emit("bark",(sound) => {
            try {
                expect(sound).toBe("woof!");
                done();
            } catch (error) {
                done(error);
            }
        });
    });

    afterAll(() => {
        io.close();
        clientSocket.close();
    });
});
