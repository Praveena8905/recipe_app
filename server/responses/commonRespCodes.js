// ------------------------------------------------
// * Application: Vegan recipes app
// * Author: chanduthedev@gmail.com
// ------------------------------------------------

"use strict";
module.exports = {
  SUCCESS: {
    code: 200,
    message: "Success",
  },
  USER_CREATED: {
    code: 20001,
    message: "User Created successfully",
  },
  USER_DELETED: {
    code: 20002,
    message: "User deleted successfully",
  },
  LOGIN_SUCCESS: {
    code: 20003,
    message: "Login Success.",
  },
  USER_ALREADY_EXISTS: {
    code: 40001,
    message: "User already exists with this username or email",
  },
  INVALID_CREDENTIALS: {
    code: 40002,
    message: "Invalid username or password",
  },
  USER_DOESNOT_EXISTS: {
    code: 40003,
    message: "User doesn't exists",
  },
  USER_CREATION_ERROR: {
    code: 40004,
    message: "Error while creating user.",
  },
  USER_CREATION_EXCEPTION: {
    code: 40005,
    message: "Exception while creating user",
  },
  RECIPE_ADDED: {
    code: 60001,
    message: "New recipe added successfully to the DB.",
  },
  RECIPE_DELETED: {
    code: 60002,
    message: "Recipe deleted successfully from the DB.",
  },
  RECIPE_DETAILS_UPDATED: {
    code: 60003,
    message: "Recipe details updated successfully.",
  },
  RECIPE_NOT_FOUND: {
    code: 60004,
    message: "Recipe details not found in the DB",
  },
  RECIPE_ALREADY_EXISTS: {
    code: 60005,
    message: "Recipe already exists.",
  },
  RECIPE_CREATION_ERROR: {
    code: 60006,
    message: "Error while adding recipe details",
  },
  RECIPE_CREATION_EXCEPTION: {
    code: 60007,
    message: "Exception while adding recipe details",
  },
  RECIPE_DETAILS_FOUND: {
    code: 60008,
    message: "Recipe details found in the DB",
  },
  UNAUTHORIZED_RECIPE_OPERATION: {
    code: 60005,
    message: "You are not allowed to update this recipe details.",
  },
  UNKNOWN_ERROR: {
    code: 99999,
    message: "Unknown exception",
  },
};
