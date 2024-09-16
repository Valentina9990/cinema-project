"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.optionsPG = void 0;
const camelCase_1 = require("./camelCase");
exports.optionsPG = {
    receive(e) {
        (0, camelCase_1.camelizeColums)(e.data);
    },
};
