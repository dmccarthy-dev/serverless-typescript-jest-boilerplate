"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mySubFun = (param) => {
    return param + '-' + param;
};
exports.handler = async (event, context) => {
    console.log("Another Invoke");
    const subFunParam = (event.queryStringParameters && event.queryStringParameters.name) ? event.queryStringParameters.name : "default";
    const body = { a: 123, mySubFun: exports.mySubFun(subFunParam) };
    return {
        statusCode: 200,
        body: JSON.stringify(body)
    };
};
//# sourceMappingURL=hello.js.map