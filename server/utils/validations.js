// ------------------------------------------------
// * Application: Vegan recipes app
// * Author: chanduthedev@gmail.com
// ------------------------------------------------

const validator = require("email-validator");
const bcrypt = require("bcrypt");
const commonErrorCodes = require("../responses/commonErrorCodes");
const User = require("../models/user");
const path = require("path");
const jwt = require("jsonwebtoken");

require("dotenv").config({
  path: path.join(__dirname, ".env"),
});

async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}
exports.hashPassword = hashPassword;

async function validatePassword(plainPassword, hashedPassword) {
  return await bcrypt.compare(plainPassword, hashedPassword);
}
exports.validatePassword = validatePassword;

function validateUserName(userName) {
  if (typeof userName === "undefined") {
    return {
      status: commonErrorCodes.MISSING_USERNAME.status,
      code: commonErrorCodes.MISSING_USERNAME.code,
      message: commonErrorCodes.MISSING_USERNAME.message,
    };
  }
  if (!userName) {
    return {
      status: commonErrorCodes.INVALID_USERNAME.status,
      code: commonErrorCodes.INVALID_USERNAME.code,
      message: commonErrorCodes.INVALID_USERNAME.message,
    };
  }
  if (userName && (userName.length === 0 || typeof userName !== "string")) {
    return {
      status: commonErrorCodes.INVALID_USERNAME.status,
      code: commonErrorCodes.INVALID_USERNAME.code,
      message: commonErrorCodes.INVALID_USERNAME.message,
    };
  }
  if (userName && (userName.length < 6 || userName.length > 32)) {
    return {
      status: commonErrorCodes.INVALID_USERNAME_LENGTH.status,
      code: commonErrorCodes.INVALID_USERNAME_LENGTH.code,
      message: commonErrorCodes.INVALID_USERNAME_LENGTH.message,
    };
  }

  return commonErrorCodes.SUCCESS;
}
exports.validateUserName = validateUserName;

function validateEmail(email) {
  if (typeof email === "undefined") {
    return {
      status: commonErrorCodes.MISSING_EMAIL.status,
      code: commonErrorCodes.MISSING_EMAIL.code,
      message: commonErrorCodes.MISSING_EMAIL.message,
    };
  }
  if (!email) {
    return {
      status: commonErrorCodes.INVALID_EMAIL.status,
      code: commonErrorCodes.INVALID_EMAIL.code,
      message: commonErrorCodes.INVALID_EMAIL.message,
    };
  }
  if (email && (email.length === 0 || typeof email !== "string")) {
    return {
      status: commonErrorCodes.INVALID_EMAIL.status,
      code: commonErrorCodes.INVALID_EMAIL.code,
      message: commonErrorCodes.INVALID_EMAIL.message,
    };
  }
  if (!validator.validate(email)) {
    return {
      status: commonErrorCodes.INVALID_EMAIL.status,
      code: commonErrorCodes.INVALID_EMAIL.code,
      message: commonErrorCodes.INVALID_EMAIL.message,
    };
  }

  return commonErrorCodes.SUCCESS;
}
exports.validateEmail = validateEmail;

function validatePasswordFormat(password) {
  if (typeof password === "undefined") {
    return {
      status: commonErrorCodes.MISSING_PASSWORD.status,
      code: commonErrorCodes.MISSING_PASSWORD.code,
      message: commonErrorCodes.MISSING_PASSWORD.message,
    };
  }
  if (!password) {
    return {
      status: commonErrorCodes.INVALID_PASSWORD_FORMAT.status,
      code: commonErrorCodes.INVALID_PASSWORD_FORMAT.code,
      message: commonErrorCodes.INVALID_PASSWORD_FORMAT.message,
    };
  }
  if (password && (password.length === 0 || typeof password !== "string")) {
    return {
      status: commonErrorCodes.INVALID_PASSWORD_FORMAT.status,
      code: commonErrorCodes.INVALID_PASSWORD_FORMAT.code,
      message: commonErrorCodes.INVALID_PASSWORD_FORMAT.message,
    };
  }

  if (password && (password.length < 6 || password.length > 32)) {
    return {
      status: commonErrorCodes.INVALID_PASSWORD_LENGTH.status,
      code: commonErrorCodes.INVALID_PASSWORD_LENGTH.code,
      message: commonErrorCodes.INVALID_PASSWORD_LENGTH.message,
    };
  }

  return commonErrorCodes.SUCCESS;
}
exports.validatePasswordFormat = validatePasswordFormat;

function validateTitle(title) {
  if (typeof title === "undefined") {
    return {
      status: commonErrorCodes.MISSING_TITLE.status,
      code: commonErrorCodes.MISSING_TITLE.code,
      message: commonErrorCodes.MISSING_TITLE.message,
    };
  }
  if (!title) {
    return {
      status: commonErrorCodes.INVALID_TITLE.status,
      code: commonErrorCodes.INVALID_TITLE.code,
      message: commonErrorCodes.INVALID_TITLE.message,
    };
  }
  if (title && (title.length === 0 || typeof title !== "string")) {
    return {
      status: commonErrorCodes.INVALID_TITLE.status,
      code: commonErrorCodes.INVALID_TITLE.code,
      message: commonErrorCodes.INVALID_TITLE.message,
    };
  }
  if (title && (title.length < 6 || title.length > 32)) {
    return {
      status: commonErrorCodes.INVALID_RECIPE_TITLE_LENGTH.status,
      code: commonErrorCodes.INVALID_RECIPE_TITLE_LENGTH.code,
      message: commonErrorCodes.INVALID_RECIPE_TITLE_LENGTH.message,
    };
  }
  return commonErrorCodes.SUCCESS;
}
exports.validateTitle = validateTitle;

function validateImage(imageData) {
  if (typeof imageData === "undefined") {
    return {
      status: commonErrorCodes.MISSING_IMAGE.status,
      code: commonErrorCodes.MISSING_IMAGE.code,
      message: commonErrorCodes.MISSING_IMAGE.message,
    };
  }
  if (!imageData) {
    return {
      status: commonErrorCodes.INVALID_IMAGE.status,
      code: commonErrorCodes.INVALID_IMAGE.code,
      message: commonErrorCodes.INVALID_IMAGE.message,
    };
  }

  let validObject =
    imageData &&
    Object.keys(imageData).length > 0 &&
    !Array.isArray(imageData) &&
    typeof imageData !== "string" &&
    typeof imageData !== "number";

  if (!validObject) {
    return {
      status: commonErrorCodes.INVALID_IMAGE.status,
      code: commonErrorCodes.INVALID_IMAGE.code,
      message: commonErrorCodes.INVALID_IMAGE.message,
    };
  }

  return commonErrorCodes.SUCCESS;
}
exports.validateImage = validateImage;

function validateIngredients(ingradients) {
  if (typeof ingradients === "undefined") {
    return {
      status: commonErrorCodes.MISSING_INGREDIENTS.status,
      code: commonErrorCodes.MISSING_INGREDIENTS.code,
      message: commonErrorCodes.MISSING_INGREDIENTS.message,
    };
  }
  if (!ingradients) {
    return {
      status: commonErrorCodes.INVALID_INGREDIENTS.status,
      code: commonErrorCodes.INVALID_INGREDIENTS.code,
      message: commonErrorCodes.INVALID_INGREDIENTS.message,
    };
  }
  if (ingradients && !Array.isArray(ingradients)) {
    return {
      status: commonErrorCodes.INVALID_INGREDIENTS.status,
      code: commonErrorCodes.INVALID_INGREDIENTS.code,
      message: commonErrorCodes.INVALID_INGREDIENTS.message,
    };
  }
  if (!ingradients.length) {
    return {
      status: commonErrorCodes.MISSING_INGREDIENTS.status,
      code: commonErrorCodes.MISSING_INGREDIENTS.code,
      message: commonErrorCodes.MISSING_INGREDIENTS.message,
    };
  }

  let hasKey = true;
  for (const ingradient of ingradients) {
    hasKey = true;
    if (
      !ingradient.hasOwnProperty("name") ||
      !ingradient.hasOwnProperty("amount")
    ) {
      hasKey = false;
      break;
    }
  }
  if (!hasKey) {
    return {
      status: commonErrorCodes.INVALID_INGREDIENTS.status,
      code: commonErrorCodes.INVALID_INGREDIENTS.code,
      message: commonErrorCodes.INVALID_INGREDIENTS.message,
    };
  }

  return commonErrorCodes.SUCCESS;
}
exports.validateIngredients = validateIngredients;

function validateInstructions(instructions) {
  if (typeof instructions === "undefined") {
    return {
      status: commonErrorCodes.MISSING_INSTRUCTIONS.status,
      code: commonErrorCodes.MISSING_INSTRUCTIONS.code,
      message: commonErrorCodes.MISSING_INSTRUCTIONS.message,
    };
  }
  if (!instructions) {
    return {
      status: commonErrorCodes.INVALID_INSTRUCTIONS.status,
      code: commonErrorCodes.INVALID_INSTRUCTIONS.code,
      message: commonErrorCodes.INVALID_INSTRUCTIONS.message,
    };
  }
  if (instructions && !Array.isArray(instructions)) {
    return {
      status: commonErrorCodes.INVALID_INSTRUCTIONS.status,
      code: commonErrorCodes.INVALID_INSTRUCTIONS.code,
      message: commonErrorCodes.INVALID_INSTRUCTIONS.message,
    };
  }

  if (!instructions.length) {
    return {
      status: commonErrorCodes.MISSING_INSTRUCTIONS.status,
      code: commonErrorCodes.MISSING_INSTRUCTIONS.code,
      message: commonErrorCodes.MISSING_INSTRUCTIONS.message,
    };
  }
  let hasKey = true;
  for (const instruction of instructions) {
    hasKey = true;
    if (
      !instruction.hasOwnProperty("stepNo") ||
      !instruction.hasOwnProperty("stepDesc")
    ) {
      hasKey = false;
      break;
    }
  }
  if (!hasKey) {
    return {
      status: commonErrorCodes.INVALID_INSTRUCTIONS.status,
      code: commonErrorCodes.INVALID_INSTRUCTIONS.code,
      message: commonErrorCodes.INVALID_INSTRUCTIONS.message,
    };
  }
  return commonErrorCodes.SUCCESS;
}
exports.validateInstructions = validateInstructions;

function validateCreateRecipeRequestBody(requestBody) {
  try {
    if (Object.keys(requestBody).length === 0) {
      return {
        status: commonErrorCodes.BAD_REQUEST.status,
        code: commonErrorCodes.BAD_REQUEST.code,
        message: commonErrorCodes.BAD_REQUEST.message,
      };
    }
    const checkUserName = validateUserName(requestBody.userName);
    if (checkUserName["status"] !== commonErrorCodes.SUCCESS.status) {
      return checkUserName;
    }

    const checkTitle = validateTitle(requestBody.title);
    if (checkTitle["status"] !== commonErrorCodes.SUCCESS.status) {
      return checkTitle;
    }
    // const checkImage = validateImage(requestBody.image);
    // if (checkImage["status"] !== commonErrorCodes.SUCCESS.status) {
    //   return checkImage;
    // }

    const checkIngradients = validateIngredients(requestBody.ingredients);
    if (checkIngradients["status"] !== commonErrorCodes.SUCCESS.status) {
      return checkIngradients;
    }
    const checkInstructions = validateInstructions(requestBody.instructions);
    if (checkInstructions["status"] !== commonErrorCodes.SUCCESS.status) {
      return checkInstructions;
    }
    return commonErrorCodes.SUCCESS;
  } catch (e) {
    console.log(e);
    return {
      status: commonErrorCodes.BAD_REQUEST.status,
      code: commonErrorCodes.BAD_REQUEST.code,
      message: commonErrorCodes.BAD_REQUEST.message,
    };
  }
}
exports.validateCreateRecipeRequestBody = validateCreateRecipeRequestBody;

function validateCreateUserRequestBody(requestBody) {
  try {
    if (Object.keys(requestBody).length === 0) {
      return {
        status: commonErrorCodes.BAD_REQUEST.status,
        code: commonErrorCodes.BAD_REQUEST.code,
        message: commonErrorCodes.BAD_REQUEST.message,
      };
    }
    const checkUserName = validateUserName(requestBody.userName);
    if (checkUserName["status"] !== commonErrorCodes.SUCCESS.status) {
      return checkUserName;
    }
    const checkPasswordFormat = validatePasswordFormat(requestBody.password);
    if (checkPasswordFormat["status"] !== commonErrorCodes.SUCCESS.status) {
      return checkPasswordFormat;
    }

    const checkEmail = validateEmail(requestBody.email);
    if (checkEmail["status"] !== commonErrorCodes.SUCCESS.status) {
      return checkEmail;
    }

    return commonErrorCodes.SUCCESS;
  } catch (e) {
    console.log(e);
    return {
      status: commonErrorCodes.BAD_REQUEST.status,
      code: commonErrorCodes.BAD_REQUEST.code,
      message: commonErrorCodes.BAD_REQUEST.message,
    };
  }
}
exports.validateCreateUserRequestBody = validateCreateUserRequestBody;

function validateLoginUserRequestBody(requestBody) {
  try {
    if (Object.keys(requestBody).length === 0) {
      return {
        status: commonErrorCodes.BAD_REQUEST.status,
        code: commonErrorCodes.BAD_REQUEST.code,
        message: commonErrorCodes.BAD_REQUEST.message,
      };
    }
    const checkUserName = validateUserName(requestBody.userName);
    if (checkUserName["status"] !== commonErrorCodes.SUCCESS.status) {
      return checkUserName;
    }
    const checkPasswordFormat = validatePasswordFormat(requestBody.password);
    if (checkPasswordFormat["status"] !== commonErrorCodes.SUCCESS.status) {
      return checkPasswordFormat;
    }

    return commonErrorCodes.SUCCESS;
  } catch (e) {
    console.log(e);
    return {
      status: commonErrorCodes.BAD_REQUEST.status,
      code: commonErrorCodes.BAD_REQUEST.code,
      message: commonErrorCodes.BAD_REQUEST.message,
    };
  }
}
exports.validateLoginUserRequestBody = validateLoginUserRequestBody;

async function allowIfLoggedin(req, res, next) {
  try {
    const userDetails = res.locals.loggedInUser;
    if (!userDetails)
      return res.status(401).json({
        message: commonErrorCodes.USER_NEEDS_LOGIN.message,
        code: commonErrorCodes.USER_NEEDS_LOGIN.code,
      });
    req.userDetails = userDetails;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
}
exports.allowIfLoggedin = allowIfLoggedin;

async function validateToken(req, res, next) {
  try {
    if (req.headers["x-access-token"]) {
      try {
        const accessToken = req.headers["x-access-token"];
        const { userName, exp } = await jwt.verify(
          accessToken,
          process.env.JWT_SECRET
        );
        // If token has expired
        if (exp < Date.now().valueOf() / 1000) {
          return res.status(401).json({
            error: commonErrorCodes.TOKEN_EXPIRED.message,
            code: commonErrorCodes.TOKEN_EXPIRED.code,
          });
        }

        const userDetails = await User.findOne({
          user_name: userName,
        });
        res.locals.loggedInUser = {
          userName: userDetails.user_name,
          email: userDetails.email,
        };
        next();
      } catch (error) {
        console.log(error);
        return res.status(400).json({
          message: commonErrorCodes.TOKEN_VERIFY_EXCEPTION.message,
          code: commonErrorCodes.TOKEN_VERIFY_EXCEPTION.code,
        });
        // next(error);
      }
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
}

exports.validateToken = validateToken;
