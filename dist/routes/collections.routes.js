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
exports.useCollectionsRoutes = void 0;
const express_1 = require("express");
const serviceFactory_1 = __importDefault(require("../services/serviceFactory"));
const validateToken_1 = require("../middlewares/validateToken");
const requestUtils_1 = require("../utils/requestUtils");
const collections_service_1 = require("../services/collections.service");
const useCollectionsRoutes = () => {
    const router = (0, express_1.Router)();
    const collectionsService = () => serviceFactory_1.default.getService(collections_service_1.CollectionsService);
    router.get("/", validateToken_1.validateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield collectionsService().getCollections((0, requestUtils_1.getUserId)(req));
        (0, requestUtils_1.setResResult)(res, result);
    }));
    router.get("/:id", validateToken_1.validateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield collectionsService().getCollection(req.params.id, (0, requestUtils_1.getUserId)(req));
        (0, requestUtils_1.setResResult)(res, result);
    }));
    router.post("/", validateToken_1.validateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield collectionsService().saveCollection(Object.assign(Object.assign({}, req.body), { userId: (0, requestUtils_1.getUserId)(req) }));
        (0, requestUtils_1.setResResult)(res, result);
    }));
    router.delete("/:id", validateToken_1.validateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const id = req.params.id;
        const result = yield collectionsService().removeCollection((0, requestUtils_1.getUserId)(req), id);
        (0, requestUtils_1.setResResult)(res, result);
    }));
    router.get("/:id/sets", validateToken_1.validateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield collectionsService().getCollectionSets(req.params.id, (0, requestUtils_1.getUserId)(req));
        (0, requestUtils_1.setResResult)(res, result);
    }));
    router.post("/:id/sets", validateToken_1.validateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield collectionsService().saveCollectionSet(Object.assign(Object.assign({}, req.body), { userId: (0, requestUtils_1.getUserId)(req) }));
        (0, requestUtils_1.setResResult)(res, result);
    }));
    router.delete("/:id/sets/:collectionSetId", validateToken_1.validateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield collectionsService().removeCollectionSet((0, requestUtils_1.getUserId)(req), req.params.id, req.params.collectionSetId);
        (0, requestUtils_1.setResResult)(res, result);
    }));
    return router;
};
exports.useCollectionsRoutes = useCollectionsRoutes;
//# sourceMappingURL=collections.routes.js.map