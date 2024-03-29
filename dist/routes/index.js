"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const user_route_1 = __importDefault(require("../app/modules/user/user.route"));
const auth_route_1 = __importDefault(require("../app/modules/auth/auth.route"));
const cow_route_1 = __importDefault(require("../app/modules/cow/cow.route"));
const order_route_1 = __importDefault(require("../app/modules/order/order.route"));
const router = express_1.default.Router();
exports.router = router;
const moduleRoutes = [
    {
        path: "/users",
        route: user_route_1.default,
    },
    {
        path: "/auth",
        route: auth_route_1.default,
    },
    {
        path: "/cows",
        route: cow_route_1.default,
    },
    {
        path: "/orders",
        route: order_route_1.default,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
