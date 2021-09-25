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

    let recipeDetails = await Recipe.findOne({ title: req.params.title });

    if (recipeDetails) {
      let respData = {};
      respData["title"] = recipeDetails.title;
      respData["userName"] = recipeDetails.user_name;
      respData["image"] = recipeDetails.image;
      respData["ingredients"] = recipeDetails.ingredients;
      respData["instructions"] = recipeDetails.instructions;
      return res.status(200).json({
        data: respData,
        code: commonResponseCodes.RECIPE_DETAILS_FOUND.code,
        message: commonResponseCodes.RECIPE_DETAILS_FOUND.message,
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
