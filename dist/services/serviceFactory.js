"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_service_1 = require("./auth.service");
const collections_service_1 = require("./collections.service");
class ServiceFactory {
    constructor() {
        this.container = new Map();
        this.container.set(auth_service_1.AuthService, () => new auth_service_1.AuthService());
        this.container.set(collections_service_1.CollectionsService, () => new collections_service_1.CollectionsService());
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