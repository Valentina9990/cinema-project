"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.camelizeColums = camelizeColums;
const pg_promise_1 = __importDefault(require("pg-promise"));
function camelizeColums(data) {
    const tmp = data[0];
    for (const prop in tmp) {
        const camel = pg_promise_1.default.utils.camelize(prop);
        if (!(camel in tmp)) {
            for (let i = 0; i < data.length; i++) {
                const d = data[i];
                d[camel] = d[prop];
                delete d[prop];
            }
        }
    }
}
