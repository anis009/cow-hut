import { ErrorRequestHandler, NextFunction, Request } from "express";
import config from "../../config";
import { IGenericErrorMessage } from "../../interfaces/error";
import { handleValidationError } from "../../errors/handleValidationError";
import handleCastError from "../../errors/handleCastError";
import { ZodError } from "zod";
import { handleZodError } from "../../errors/handleZodError";

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
	config.node_env === "production"
		? console.error("global-error-handler🚀~", error)
		: // eslint-disable-next-line no-console
		  console.error("global-error-handler🚀~", error);
	let statusCode = 500;
	let message = "Something went wrong";
	let errorMessages: IGenericErrorMessage[] = [];

	if (error?.name === "ValidationError") {
		const simplifiedError = handleValidationError(error);
		statusCode = simplifiedError.statusCode;
		message = simplifiedError.message;
		errorMessages = simplifiedError.errorMessages;
	} else if (error?.name === "CastError") {
		const simplifiedError = handleCastError(error);
		statusCode = simplifiedError.statusCode;
		message = simplifiedError.message;
		errorMessages = simplifiedError.errorMessages;
	} else if (error instanceof ZodError) {
		const simplifiedError = handleZodError(error);
		statusCode = simplifiedError.statusCode;
		message = simplifiedError.message;
		errorMessages = simplifiedError.errorMessages;
	} else if (error instanceof Error) {
		message = error?.message;
		errorMessages = error?.message
			? [
					{
						path: "",
						message: error?.message,
					},
			  ]
			: [];
	}

	res.status(statusCode).json({
		success: false,
		message,
		errorMessages: errorMessages,
		stack: config.node_env === "development" ? error.stack : "",
	});
};

export default globalErrorHandler;
