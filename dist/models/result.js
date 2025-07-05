"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.success = success;
exports.failure = failure;
exports.fromDbResult = fromDbResult;
function success(result) {
    return {
        result,
        isSuccess: true,
    };
}
function failure(error, errorStatus = "internal-server-error") {
    return {
        error,
        errorStatus,
        isSuccess: false,
    };
}
function fromDbResult(result, error) {
    return error ? failure(error, 'db-error') : success(result);
}
//# sourceMappingURL=result.js.map