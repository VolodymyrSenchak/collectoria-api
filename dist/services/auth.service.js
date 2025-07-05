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
exports.AuthService = void 0;
const supabaseDb_1 = require("../utils/supabaseDb");
const models_1 = require("../models");
class AuthService {
    constructor() {
        this.db = (0, supabaseDb_1.getSupabaseClient)();
    }
    register(command) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield this.db.auth.signUp({
                email: command.email,
                password: command.password,
            });
            return error ? (0, models_1.failure)(error) : (0, models_1.success)(data);
        });
    }
    login(command) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield this.db.auth.signInWithPassword({
                email: command.email,
                password: command.password,
            });
            return error ? (0, models_1.failure)(error) : (0, models_1.success)(data);
        });
    }
    refreshToken(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield this.db.auth.refreshSession({
                refresh_token: refreshToken
            });
            return error ? (0, models_1.failure)(error) : (0, models_1.success)(data);
        });
    }
    getUser(jwt) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield this.db.auth.getUser(jwt);
            return error ? (0, models_1.failure)(error) : (0, models_1.success)(data.user);
        });
    }
    resetPassword(command) {
        return __awaiter(this, void 0, void 0, function* () {
            const { error, data } = yield this.db.auth.resetPasswordForEmail(command.email, { redirectTo: command.redirectTo });
            return error ? (0, models_1.failure)(error) : (0, models_1.success)(data);
        });
    }
    changePassword(command) {
        return __awaiter(this, void 0, void 0, function* () {
            const { error, data } = yield this.db.auth.updateUser({
                password: command.password
            });
            return error ? (0, models_1.failure)(error) : (0, models_1.success)(data);
        });
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map