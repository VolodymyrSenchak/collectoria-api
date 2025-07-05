"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setReqContext = setReqContext;
exports.getReqContext = getReqContext;
exports.getUserId = getUserId;
exports.setResResult = setResResult;
function setReqContext(req, contextParts) {
    req.context = Object.assign(Object.assign({}, req.context), contextParts);
}
function getReqContext(req) {
    return req.context;
}
function getUserId(req) {
    var _a;
    return (_a = getReqContext(req).user) === null || _a === void 0 ? void 0 : _a.id;
}
function setResResult(res, result, mapper, fixedErrorStatus) {
    const status = result.isSuccess
        ? 200
        : fixedErrorStatus ? fixedErrorStatus : getStatusCode(result.errorStatus);
    const json = result.isSuccess
        ? mapper ? mapper(result.result) : result.result
        : result.error;
    res.status(status).json(json);
    return res;
}
function getStatusCode(errorStatus) {
    switch (errorStatus) {
        case "unauthorized": return 401;
        case "forbidden": return 403;
        case "not-found": return 404;
        case "bad-request": return 400;
        default: return 500;
    }
}
//# sourceMappingURL=requestUtils.js.map