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
exports.BrickLinkClientService = void 0;
const authUtils_1 = require("../utils/authUtils");
const models_1 = require("../models");
class BrickLinkClientService {
    constructor(settings) {
        this.settings = settings;
    }
    getSetByCode(setCode) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.executeRequest('GET', `/items/set/${setCode}`);
        });
    }
    getSetPricesByCode(setCode) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.executeRequest('GET', `/items/set/${setCode}/price`);
        });
    }
    executeRequest(method, relativeUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `${this.settings.apiUrl}${relativeUrl}`;
            const response = yield fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': (0, authUtils_1.generateOAuthHeader)(method, url, this.settings.consumerKey, this.settings.consumerSecret, this.settings.token, this.settings.tokenSecret),
                }
            });
            if (response.status === 200) {
                const { data } = yield response.json();
                return (0, models_1.success)(data);
            }
            else if (response.status === 404) {
                return (0, models_1.success)(null);
            }
            else {
                const { meta } = yield response.json();
                return (0, models_1.failure)(meta.message);
            }
        });
    }
}
exports.BrickLinkClientService = BrickLinkClientService;
//# sourceMappingURL=brickLinkClient.service.js.map