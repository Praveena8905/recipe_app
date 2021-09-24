// ------------------------------------------------
// * Application: Vegan recipes app
// * Author: chanduthedev@gmail.com
// ------------------------------------------------

"use strict";
module.exports = {
  SUCCESS: {
    status: 200,
    code: 200,
    message: "Success.",
  },
  BAD_REQUEST: {
    status: 400,
    code: 40000,
    message: "Bad request, request can't be empty",
  },
  MISSING_USERNAME: {
    status: 400,
    code: 40001,
    message: "Username is required.",
  },
  INVALID_USERNAME: {
    status: 400,
    code: 40002,
    message: "Username is invalid.",
  },
  MISSING_EMAIL: {
    status: 400,
    code: 40003,
    message: "Email id is required.",
  },
  INVALID_EMAIL: {
    status: 400,
    code: 40004,
    message: "Email id is invalid.",
  },
  MISSING_TITLE: {
    status: 400,
    code: 40005,
    message: "Recipe title is required.",
  },
  INVALID_TITLE: {
    status: 400,
    code: 40006,
    message: "Recipe title is invalid.",
  },
  MISSING_INGREDIENTS: {
    status: 400,
    code: 40007,
    message: "Recipe ingredient is required.",
  },
  INVALID_INGREDIENTS: {
    status: 400,
    code: 40008,
    message: "Recipe ingredient is invalid.",
  },
  MISSING_INSTRUCTIONS: {
    status: 400,
    code: 40009,
    message: "Recipe instructions is required.",
  },
  INVALID_INSTRUCTIONS: {
    status: 400,
    code: 40010,
    message: "Recipe instructions is invalid.",
  },
  MISSING_IMAGE: {
    status: 400,
    code: 40009,
    message: "Recipe image is required.",
  },
  INVALID_IMAGE: {
    status: 400,
    code: 40010,
    message: "Recipe image is invalid.",
  },
  MISSING_PASSWORD: {
    status: 400,
    code: 40011,
    message: "Password is required.",
  },
  INVALID_PASSWORD_FORMAT: {
    status: 400,
    code: 40012,
    message: "Password formtat is invalid.",
  },
  INVALID_USERNAME_LENGTH: {
    status: 400,
    code: 40013,
    message: "Username length should be betwen 6 and 32 letters.",
  },
  INVALID_PASSWORD_LENGTH: {
    status: 400,
    code: 40014,
    message: "Password length should be betwen 6 and 32 letters.",
  },
  TOKEN_EXPIRED: {
    status: 400,
    code: 40015,
    message: "Access token expired",
  },
  TOKEN_MISMATCH: {
    status: 400,
    code: 40016,
    message: "Access token mismatch",
  },
  TOKEN_VERIFY_EXCEPTION: {
    status: 400,
    code: 40017,
    message: "Exception while verifying access token",
  },
  USER_NEEDS_LOGIN: {
    status: 400,
    code: 40018,
    message: "User needs to login.",
  },
  INVALID_RECIPE_TITLE_LENGTH: {
    status: 400,
    code: 40019,
    message: "Password length should be betwen 6 and 32 letters.",
  },
};
