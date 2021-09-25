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
    const inputTitle = req.body.title;
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
      let recipeDetailsToUpdate = {};
      const inputImage = req.body.image;
      if (inputImage) {
        recipeDetailsToUpdate.image = inputImage;
        // const result = validations.validateImage(inputImage);
        // if (result["status"] !== commonErrCodes.SUCCESS.status) {
        //   return res.status(result["status"]).json({
        //     code: result["code"],
        //     message: result["message"],
        //   });
        // }
      }

      const inputIngradients = req.body.ingredients;
      if (inputIngradients) {
        const result = validations.validateIngredients(inputIngradients);
        if (result["status"] !== commonErrCodes.SUCCESS.status) {
          return res.status(result["status"]).json({
            code: result["code"],
            message: result["message"],
          });
        }
        // Appending new ingradients to existing ingradients
        recipeDetailsToUpdate.ingredients = [
          ...recipeDetails.ingredients,
          ...inputIngradients,
        ];
      }

      const inputInstructions = req.body.instructions;
      if (inputInstructions) {
        const result = validations.validateInstructions(inputInstructions);
        if (result["status"] !== commonErrCodes.SUCCESS.status) {
          return res.status(result["status"]).json({
            code: result["code"],
            message: result["message"],
          });
        }
        // Appending new instructions to existing instructions
        recipeDetailsToUpdate.instructions = [
          ...recipeDetails.instructions,
          ...inputInstructions,
        ];
      }
      recipeDetailsToUpdate.updated_timestamp = new Date().toISOString();

      const updatedRecipeDetails = await Recipe.findOneAndUpdate(
        { title: inputTitle },
        recipeDetailsToUpdate,
        { new: true }
      );

      let respData = {};
      respData["title"] = updatedRecipeDetails.title;
      respData["image"] = updatedRecipeDetails.image;
      respData["ingredients"] = updatedRecipeDetails.ingredients;
      respData["instructions"] = updatedRecipeDetails.instructions;
      return res.status(200).json({
        data: respData,
        code: commonResponseCodes.RECIPE_DETAILS_UPDATED.code,
        message: commonResponseCodes.RECIPE_DETAILS_UPDATED.message,
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
