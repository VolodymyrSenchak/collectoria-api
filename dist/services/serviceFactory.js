"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_service_1 = require("./auth.service");
const collections_service_1 = require("./collections.service");
const brickLinkClient_service_1 = require("./brickLinkClient.service");
const envVariables_1 = require("../utils/envVariables");
const setsIntegration_service_1 = require("./setsIntegration.service");
class ServiceFactory {
    constructor() {
        this.container = new Map();
        this.container.set(auth_service_1.AuthService, () => new auth_service_1.AuthService());
        this.container.set(collections_service_1.CollectionsService, () => new collections_service_1.CollectionsService());
        this.container.set(brickLinkClient_service_1.BrickLinkClientService, () => new brickLinkClient_service_1.BrickLinkClientService(envVariables_1.ENV_VARIABLES.brickLink));
        this.container.set(setsIntegration_service_1.SetsIntegrationService, () => new setsIntegration_service_1.SetsIntegrationService(this.getService(brickLinkClient_service_1.BrickLinkClientService)));
    }
    getService(service) {
        const serviceFactory = this.container.get(service);
        if (!serviceFactory) {
            throw new Error(`Service ${service.name} is not registered in the container.`);
        }
        return serviceFactory();
    }
}
exports.default = new ServiceFactory();
//# sourceMappingURL=serviceFactory.js.map