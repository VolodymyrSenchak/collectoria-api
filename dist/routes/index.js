"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useRoutes = useRoutes;
const home_routes_1 = require("./home.routes");
const auth_routes_1 = require("./auth.routes");
const collections_routes_1 = require("./collections.routes");
const setsIntegration_routes_1 = require("./setsIntegration.routes");
function useRoutes(app) {
    app.use("/api", (0, home_routes_1.useHomeRoutes)());
    app.use("/api/auth", (0, auth_routes_1.useAuthRoutes)());
    app.use("/api/collections", (0, collections_routes_1.useCollectionsRoutes)());
    app.use("/api/setsIntegration", (0, setsIntegration_routes_1.useSetsIntegrationRoutes)());
}
//# sourceMappingURL=index.js.map