// ------------------------------------------------
// * Application: Vegan recipes app
// * Author: chanduthedev@gmail.com
// ------------------------------------------------

"use strict";

const Recipe = require("../../models/recipe");
const commonResponseCodes = require("../../responses/commonRespCodes");
const commonErrCodes = require("../../responses/commonErrorCodes");
const validations = require("../../utils/validations");

async function process(req, res) {
  try {
    const inputTitle = req.params.title;
    const result = validations.validateTitle(inputTitle);
    if (result["status"] !== commonErrCodes.SUCCESS.status) {
      return res.status(result["status"]).json({
        code: result["code"],
        message: result["message"],
      });
    }
    let recipeDetails = await Recipe.findOne({ title: inputTitle });
    if (recipeDetails) {
      if (req.userDetails.userName !== recipeDetails.user_name) {
        return res.status(401).json({
          code: commonResponseCodes.UNAUTHORIZED_RECIPE_OPERATION.code,
          message: commonResponseCodes.UNAUTHORIZED_RECIPE_OPERATION.message,
        });
      }
    } else {
      return res.status(404).json({
        code: commonResponseCodes.RECIPE_NOT_FOUND.code,
        message: commonResponseCodes.RECIPE_NOT_FOUND.message,
      });
    }

    const recipe = await Recipe.findOneAndDelete({ title: req.params.title });
    if (recipe) {
      return res.status(200).json({
        code: commonResponseCodes.RECIPE_DELETED.code,
        message: commonResponseCodes.RECIPE_DELETED.message,
      });
    } else {
      return res.status(404).json({
        code: commonResponseCodes.RECIPE_NOT_FOUND.code,
        message: commonResponseCodes.RECIPE_NOT_FOUND.message,
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
exports.process = process;
