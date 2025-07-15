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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollectionsService = void 0;
const supabaseDb_1 = require("../utils/supabaseDb");
const models_1 = require("../models");
class CollectionsService {
    constructor() {
        this.db = (0, supabaseDb_1.getSupabaseClient)();
        this.collectionsTable = 'collections';
        this.collectionSetsTable = 'collectionSets';
    }
    getCollections(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield this.db
                .from(this.collectionsTable)
                .select()
                .eq('userId', userId);
            return (0, models_1.fromDbResult)(data, error);
        });
    }
    getCollection(collectionId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield this.db
                .from(this.collectionsTable)
                .select()
                .eq('userId', userId).eq('id', collectionId);
            return (0, models_1.fromDbResult)(data[0], error);
        });
    }
    getCollectionSets(collectionId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield this.db
                .from(this.collectionSetsTable)
                .select()
                .eq('userId', userId).eq('collectionId', collectionId);
            return (0, models_1.fromDbResult)(data, error);
        });
    }
    saveCollectionSet(collectionSet) {
        return __awaiter(this, void 0, void 0, function* () {
            const { error, data } = yield this.db
                .from(this.collectionSetsTable)
                .upsert(collectionSet);
            const newCollectionSet = data;
            return (0, models_1.fromDbResult)(newCollectionSet.id, error);
        });
    }
    removeCollectionSet(userId, collectionId, collectionSetId) {
        return __awaiter(this, void 0, void 0, function* () {
            const { error } = yield this.db
                .from(this.collectionSetsTable)
                .delete()
                .eq('userId', userId)
                .eq('collectionId', collectionId)
                .eq('id', collectionSetId);
            return (0, models_1.fromDbResult)(true, error);
        });
    }
    saveCollection(collection) {
        return __awaiter(this, void 0, void 0, function* () {
            const { error, data } = yield this.db
                .from(this.collectionsTable)
                .upsert(collection);
            const newCollection = data;
            return (0, models_1.fromDbResult)(newCollection.id, error);
        });
    }
    removeCollection(userId, collectionId) {
        return __awaiter(this, void 0, void 0, function* () {
            const { error } = yield this.db
                .from(this.collectionsTable)
                .delete()
                .eq('userId', userId)
                .eq('id', collectionId);
            return (0, models_1.fromDbResult)(true, error);
        });
    }
}
exports.CollectionsService = CollectionsService;
//# sourceMappingURL=collections.service.js.map