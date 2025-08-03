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
exports.useSetsIntegrationRoutes = void 0;
const express_1 = require("express");
const serviceFactory_1 = __importDefault(require("../services/serviceFactory"));
const validateToken_1 = require("../middlewares/validateToken");
const requestUtils_1 = require("../utils/requestUtils");
const setsIntegration_service_1 = require("../services/setsIntegration.service");
const useSetsIntegrationRoutes = () => {
    const router = (0, express_1.Router)();
    const setsIntegrationService = () => serviceFactory_1.default.getService(setsIntegration_service_1.SetsIntegrationService);
    router.get("/setDetails/:id", validateToken_1.validateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield setsIntegrationService().getSetByCode(req.params.id);
        (0, requestUtils_1.setResResult)(res, result);
    }));
    router.get("/setDetails/:id/price", validateToken_1.validateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield setsIntegrationService().getSetPricesByCode(req.params.id);
        (0, requestUtils_1.setResResult)(res, result);
    }));
    router.get("/categories", validateToken_1.validateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield setsIntegrationService().getCategories();
        (0, requestUtils_1.setResResult)(res, result);
    }));
    return router;
};
exports.useSetsIntegrationRoutes = useSetsIntegrationRoutes;
//# sourceMappingURL=setsIntegration.routes.js.map