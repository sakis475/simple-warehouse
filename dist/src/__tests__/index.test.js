"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const reset_dbs_1 = require("../../scripts/reset_dbs");
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../app");
const postgres_connect_1 = require("../model/postgres-connect");
const API_VERSION = process.env.API_VERSION;
let signInJwtToken = '';
describe('Launches API', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, reset_dbs_1.resetDatabase)();
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, postgres_connect_1.disconnect)();
    }));
    describe('Test POST /register', () => {
        const registerData = {
            name: 'thanasis',
            password: '123',
            registerToken: process.env.REGISTER_AUTH_TOKEN
        };
        const registerDataWrongRegisterToken = {
            name: 'thanasis2',
            password: '123',
            registerToken: 'wrong register token'
        };
        test('It should respond with 201 and return a token', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.app)
                .post(`/${API_VERSION}/register`)
                .expect('Content-Type', /json/)
                .send(registerData)
                .expect(201)
                .expect((res) => {
                const token = res.body['token'];
                expect(token).toBeDefined();
                signInJwtToken = token;
            });
        }));
        test('It should respond with 405, Username Already Exists', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.app)
                .post(`/${API_VERSION}/register`)
                .send(registerData)
                .expect('Content-Type', /json/)
                .expect(405);
        }));
        test('It should respond with 401, Wrong Register Token', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.app)
                .post(`/${API_VERSION}/register`)
                .send(registerDataWrongRegisterToken)
                .expect('Content-Type', /json/)
                .expect(401);
        }));
    });
    describe('Test POST /login', () => {
        const loginData = {
            name: 'thanasis',
            password: '123'
        };
        const loginDataWrongName = {
            name: 'wrongThanos',
            password: '123'
        };
        const loginDataWrongPassword = {
            name: 'thanasis',
            password: '321'
        };
        test('It should respond with 200 and return a token', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.app)
                .post(`/${API_VERSION}/login`)
                .send(loginData)
                .expect('Content-Type', /json/)
                .expect(200)
                .expect((res) => {
                const token = res.body['token'];
                expect(token).toBeDefined();
                signInJwtToken = token;
            });
        }));
        test('It should respond with 405, User Doesnt Exists', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.app)
                .post(`/${API_VERSION}/login`)
                .send(loginDataWrongName)
                .expect('Content-Type', /json/)
                .expect(405);
        }));
        test('It should respond with 401, Password is wrong', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.app)
                .post(`/${API_VERSION}/login`)
                .send(loginDataWrongPassword)
                .expect('Content-Type', /json/)
                .expect(401);
        }));
    });
    describe('Test GET /order', () => {
        test('It should respond with 200', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.app)
                .get(`/${API_VERSION}/order`)
                .set('Authorization', `Bearer ${signInJwtToken}`)
                .expect('Content-Type', /json/)
                .expect(200);
        }));
        test('It should respond with 200, ?scanned=true', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.app)
                .get(`/${API_VERSION}/order?scanned=true`)
                .set('Authorization', `Bearer ${signInJwtToken}`)
                .expect('Content-Type', /json/)
                .expect(200);
        }));
        test('It should respond with 200, ?scanned=false', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.app)
                .get(`/${API_VERSION}/order?scanned=false`)
                .set('Authorization', `Bearer ${signInJwtToken}`)
                .expect('Content-Type', /json/)
                .expect(200);
        }));
        test('It should respond with 200, ?driver=Moe', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.app)
                .get(`/${API_VERSION}/order?driver=Moe`)
                .set('Authorization', `Bearer ${signInJwtToken}`)
                .expect('Content-Type', /json/)
                .expect(200);
        }));
        test('It should respond with 200, ?driver=Moe&scanned=true', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.app)
                .get(`/${API_VERSION}/order?driver=Moe&scanned=true`)
                .set('Authorization', `Bearer ${signInJwtToken}`)
                .expect('Content-Type', /json/)
                .expect(200);
        }));
        test('It should respond with 200, ?driver=Moe&scanned=false', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.app)
                .get(`/${API_VERSION}/order?driver=Moe&scanned=false`)
                .set('Authorization', `Bearer ${signInJwtToken}`)
                .expect('Content-Type', /json/)
                .expect(200);
        }));
        test('It should respond with 401, Wrong JWT token', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.app)
                .get(`/${API_VERSION}/order`)
                .set('Authorization', `Bearer WrongToken`)
                .expect('Content-Type', /json/)
                .expect(401);
        }));
    });
    describe('Test PUT /scan?voucher', () => {
        test('It should respond with 200', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.app)
                .put(`/${API_VERSION}/scan`)
                .set('Authorization', `Bearer ${signInJwtToken}`)
                .send({ voucher: 'A1A' })
                .expect(200);
        }));
        test('It should respond with 404, Wrong Body Input', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.app)
                .put(`/${API_VERSION}/scan`)
                .set('Authorization', `Bearer ${signInJwtToken}`)
                .send({})
                .expect(404);
        }));
        test('It should respond with 401, Wrong JWT token', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.app)
                .put(`/${API_VERSION}/scan`)
                .set('Authorization', `Bearer wrongwrong`)
                .send({ voucher: 'A1A' })
                .expect(401);
        }));
    });
    describe('Test GET /drivers', () => {
        test('It should respond with 200', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.app)
                .get(`/${API_VERSION}/drivers`)
                .set('Authorization', `Bearer ${signInJwtToken}`)
                .expect(200);
        }));
        test('It should respond with 401, Wrong JWT token', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.app)
                .get(`/${API_VERSION}/drivers`)
                .set('Authorization', `Bearer wrongToken..`)
                .expect(401);
        }));
    });
    describe('Test POST /drivers', () => {
        test('It should respond with 201', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.app)
                .post(`/${API_VERSION}/drivers`)
                .send({ name: 'Joe', cluster: 'D' })
                .set('Authorization', `Bearer ${signInJwtToken}`)
                .expect(201);
        }));
        test('It should respond with 401, Wrong JWT token', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.app)
                .post(`/${API_VERSION}/drivers`)
                .send({ name: 'Joe', cluster: 'D' })
                .set('Authorization', `Bearer wrongToken..`)
                .expect(401);
        }));
    });
    describe('Test PUT /drivers', () => {
        test('It should respond with 201', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.app)
                .put(`/${API_VERSION}/drivers`)
                .send({ name: 'Moe', newName: 'Keith', cluster: 'A' })
                .set('Authorization', `Bearer ${signInJwtToken}`)
                .expect(201);
        }));
        test('It should respond with 401, Wrong JWT token', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.app)
                .get(`/${API_VERSION}/drivers`)
                .send({ name: 'Moe', newName: 'Mic', cluster: 'A' })
                .set('Authorization', `Bearer wrongToken..`)
                .expect(401);
        }));
    });
    describe('Test DELETE /drivers', () => {
        test('It should respond with 200', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.app)
                .delete(`/${API_VERSION}/drivers?name=Curly`)
                .set('Authorization', `Bearer ${signInJwtToken}`)
                .expect(200);
        }));
        test('It should respond with 401, Wrong JWT token', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.app)
                .delete(`/${API_VERSION}/drivers?name=Joe`)
                .set('Authorization', `Bearer wrongToken..`)
                .expect(401);
        }));
    });
    describe('Test GET /clusters', () => {
        test('It should respond with 200', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.app)
                .get(`/${API_VERSION}/clusters`)
                .set('Authorization', `Bearer ${signInJwtToken}`)
                .expect(200);
        }));
        test('It should respond with 401, Wrong JWT token', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.app)
                .get(`/${API_VERSION}/clusters`)
                .set('Authorization', `Bearer wrongToken..`)
                .expect(401);
        }));
    });
    describe('Test POST /clusters', () => {
        test('It should respond with 201', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.app)
                .post(`/${API_VERSION}/clusters`)
                .send({ name: 'E', postcode: '20' })
                .set('Authorization', `Bearer ${signInJwtToken}`)
                .expect(201);
        }));
        test('It should respond with 401, Wrong JWT token', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.app)
                .post(`/${API_VERSION}/clusters`)
                .send({ name: 'F', postcode: '21' })
                .set('Authorization', `Bearer wrongToken..`)
                .expect(401);
        }));
    });
    describe('Test PUT /clusters', () => {
        test('It should respond with 201', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.app)
                .put(`/${API_VERSION}/clusters`)
                .send({ name: 'B', newName: 'R', postcode: '11' })
                .set('Authorization', `Bearer ${signInJwtToken}`)
                .expect(201);
        }));
        test('It should respond with 401, Wrong JWT token', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.app)
                .put(`/${API_VERSION}/clusters`)
                .send({ name: 'R', newName: 'E', postcode: '11' })
                .set('Authorization', `Bearer wrongToken..`)
                .expect(401);
        }));
    });
    describe('Test DELETE /clusters', () => {
        test('It should respond with 200', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.app)
                .delete(`/${API_VERSION}/clusters?name=B`)
                .set('Authorization', `Bearer ${signInJwtToken}`)
                .expect(200);
        }));
        test('It should respond with 401, Wrong JWT token', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.app)
                .delete(`/${API_VERSION}/clusters?name=B`)
                .set('Authorization', `Bearer wrongToken..`)
                .expect(401);
        }));
    });
    describe('Test GET /reset-database', () => {
        test('It should respond with 200', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.app)
                .get(`/${API_VERSION}/reset-database`)
                .set('Authorization', `Bearer ${signInJwtToken}`)
                .expect(200);
        }));
        test('It should respond with 401, Wrong JWT token', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.app)
                .get(`/${API_VERSION}/reset-database`)
                .set('Authorization', `Bearer wrongToken..`)
                .expect(401);
        }));
    });
});
