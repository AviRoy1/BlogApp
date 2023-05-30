"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getErrorMessage = void 0;
function getErrorMessage(errObj) {
    var _a, _b;
    if (!errObj)
        return "Something went wrong!";
    if (!errObj.details) {
        return errObj;
    }
    const errorMessage = (_a = errObj === null || errObj === void 0 ? void 0 : errObj.details[0]) === null || _a === void 0 ? void 0 : _a.message;
    const fieldFromError = (_b = errObj === null || errObj === void 0 ? void 0 : errObj.details[0]) === null || _b === void 0 ? void 0 : _b.context.key;
    if (typeof fieldFromError === "string") {
        const field = fieldFromError.charAt(0).toUpperCase() + fieldFromError.slice(1);
        if (errorMessage.includes("is not allowed to be empty")) {
            return `${field} cannot be left blank.`;
        }
        if (errorMessage.includes("is required")) {
            return `${field} is a required field.`;
        }
        if (errorMessage.includes("must be a number")) {
            return `${field} must be a number.`;
        }
        if (errorMessage.includes("must be a boolean")) {
            return `${field} must be a boolean`;
        }
        if (errorMessage.includes("must be one of")) {
            let error = errorMessage.split("[");
            error = error[1];
            error = error.replace("]", "");
            return `${field} must be one of following values - ${error}.`;
        }
        if (errorMessage.includes("length must be less than or equal to 50 characters long")) {
            return `${field} must be less than 50 characters long.`;
        }
        if (errorMessage.includes("^[a-zA-Z0-9()\\-,\\/&.\\s]*$/")) {
            return `${field} should not contain any special character other than ()-,/&.`;
        }
        if (errorMessage.includes("/^[a-zA-Z0-9()-,\\/&.\\s]*$/")) {
            return `${field} should not contain any special character other than ()-,/&.`;
        }
    }
    return errorMessage;
}
exports.getErrorMessage = getErrorMessage;
//# sourceMappingURL=joi.util.js.map