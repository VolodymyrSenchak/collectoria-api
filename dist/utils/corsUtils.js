"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCorsOptions = void 0;
const allowedOrigins = [
    "http://localhost:5173",
    "https://collectoria-app.vercel.app/"
];
const getCorsOptions = () => ({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true); // Allow the request
        }
        else {
            callback(new Error("Not allowed by CORS")); // Block the request
        }
    },
});
exports.getCorsOptions = getCorsOptions;
//# sourceMappingURL=corsUtils.js.map