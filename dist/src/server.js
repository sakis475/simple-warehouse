"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
// import { connect } from './model/postgres-connect';
// connect(process.env.POSTGRES!);
const PORT = process.env.SERVER_PORT || 3013;
const server = app_1.app.listen(PORT, () => {
    console.log(`Application started on port ${PORT}!`);
});
