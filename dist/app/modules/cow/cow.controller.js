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
exports.CowController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = require("../../../shared/sendResponse");
const cow_service_1 = require("./cow.service");
const http_status_1 = __importDefault(require("http-status"));
const cow_constant_1 = require("./cow.constant");
const pagination_1 = require("../../../constant/pagination");
const pick_1 = __importDefault(require("../../../shared/pick"));
const createCow = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const cow = req.body;
    const result = yield cow_service_1.CowService.createCow(cow);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: "Cow created successfully",
        data: result,
    });
    // next();
}));
const getAllCows = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, cow_constant_1.CowFilterableFields);
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.paginationFields);
    const result = yield cow_service_1.CowService.getAllCows(filters, paginationOptions);
    (0, sendResponse_1.sendResponseWithPagination)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        meta: result.meta,
        message: "Cows retrieved successfully",
        data: result.data,
    });
}));
const getSingleCow = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield cow_service_1.CowService.getSingleCow(id);
    if (result) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: "Cow retrieved successfully",
            data: result,
        });
    }
    else {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_1.default.NOT_FOUND,
            success: false,
            message: "Cow not found",
            data: null,
        });
    }
}));
const deleteCow = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield cow_service_1.CowService.deleteCow(id);
    if (result) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: "Cow deleted successfully",
            data: result,
        });
    }
    else {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_1.default.NOT_FOUND,
            success: false,
            message: "Cow not found",
            data: null,
        });
    }
}));
const updateCow = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updatedCow = req.body;
    const result = yield cow_service_1.CowService.updateCow(id, updatedCow);
    if (result) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: "Cow updated successfully",
            data: result,
        });
    }
    else {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_1.default.NOT_FOUND,
            success: false,
            message: "Cow not found",
            data: null,
        });
    }
}));
exports.CowController = {
    createCow,
    getSingleCow,
    deleteCow,
    updateCow,
    getAllCows,
};
