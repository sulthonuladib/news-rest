// import "reflect-metadata";
// import { createConnection } from "typeorm";
// import * as express from "express";
// import * as bodyParser from "body-parser";
// import { Request, Response } from "express";
// import { Routes } from "./routes";

// import {api} from "./api";
// const appInfo = require("../package.json");

// const app = express();
// app.use(bodyParser.json());

// app.get('/', (req: Request, res: Response) => {
//     res.send(appInfo)
// });

// app.use('/api', api)

// createConnection()
//     .then(async connection => {
//         console.log('CONNECTED TO DATABASE');

//         app.listen(3000);
//         console.log("Express server has started on port 3000. Open http://localhost:3000/");
//     })
//     .catch(error => console.log(error));

// // register express routes from defined application routes

// // createConnection().then(async connection => {
// //     const app = express();
// //     app.use(bodyParser.json());

// //     Routes.forEach(route => {
// //         (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
// //             const result = (new (route.controller as any))[route.action](req, res, next);
// //             if (result instanceof Promise) {
// //                 result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);

// //             } else if (result !== null && result !== undefined) {
// //                 res.json(result);
// //             }
// //         });
// //     });
    
// //     app.listen(3000);

// //     console.log("Express server has started on port 3000. Open http://localhost:3000");


// // }).catch(error => console.log(error));
import {Server} from './Server'
const app = new Server();
app.start();