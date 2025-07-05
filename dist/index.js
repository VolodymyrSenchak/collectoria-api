"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./routes");
const envVariables_1 = require("./utils/envVariables");
const corsUtils_1 = require("./utils/corsUtils");
const app = (0, express_1.default)();
app.use((0, cors_1.default)((0, corsUtils_1.getCorsOptions)()));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
(0, routes_1.useRoutes)(app);
app
    .listen(envVariables_1.ENV_VARIABLES.port, "localhost", function () {
    console.log(`Server is running on port ${envVariables_1.ENV_VARIABLES.port}.`);
})
    .on("error", (err) => {
    if (err.code === "EADDRINUSE") {
        console.log("Error: address already in use");
    }
    else {
        console.log(err);
    }
});
//# sourceMappingURL=index.js.map