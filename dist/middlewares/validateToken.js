"use strict";
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
exports.validateToken = void 0;
const serviceFactory_1 = __importDefault(require("../services/serviceFactory"));
const auth_service_1 = require("../services/auth.service");
const requestUtils_1 = require("../utils/requestUtils");
const validateToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    const token = authHeader.split(" ")[1];
    const authService = serviceFactory_1.default.getService(auth_service_1.AuthService);
    const userOperation = yield authService.getUser(token);
    if (!userOperation.isSuccess) {
        return res.status(401).json({ error: "Invalid token" });
    }
    else {
        (0, requestUtils_1.setReqContext)(req, { user: userOperation.result });
    }
    next();
});
exports.validateToken = validateToken;
//# sourceMappingURL=validateToken.js.map