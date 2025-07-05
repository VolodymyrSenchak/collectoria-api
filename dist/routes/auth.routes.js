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
exports.useAuthRoutes = void 0;
const express_1 = require("express");
const serviceFactory_1 = __importDefault(require("../services/serviceFactory"));
const auth_service_1 = require("../services/auth.service");
const requestUtils_1 = require("../utils/requestUtils");
const validateToken_1 = require("../middlewares/validateToken");
const useAuthRoutes = () => {
    const router = (0, express_1.Router)();
    const authSrv = () => serviceFactory_1.default.getService(auth_service_1.AuthService);
    router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield authSrv().login(req.body);
        (0, requestUtils_1.setResResult)(res, result, null, 401);
    }));
    router.post("/refreshToken", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { refreshToken } = req.body;
        const result = yield authSrv().refreshToken(refreshToken);
        (0, requestUtils_1.setResResult)(res, result, null, 401);
    }));
    router.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield authSrv().register(req.body);
        (0, requestUtils_1.setResResult)(res, result);
    }));
    router.get("/userDetails", validateToken_1.validateToken, (req, res) => {
        const user = (0, requestUtils_1.getReqContext)(req).user;
        res.status(200).json(user);
    });
    router.post("/resetPassword", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield authSrv().resetPassword(req.body);
        (0, requestUtils_1.setResResult)(res, result);
    }));
    router.get("/changePassword", validateToken_1.validateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield authSrv().changePassword(req.body);
        (0, requestUtils_1.setResResult)(res, result);
    }));
    return router;
};
exports.useAuthRoutes = useAuthRoutes;
//# sourceMappingURL=auth.routes.js.map