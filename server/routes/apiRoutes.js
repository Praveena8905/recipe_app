// ------------------------------------------------
// * Application: Vegan recipes app
// * Author: chanduthedev@gmail.com
// ------------------------------------------------

const validations = require("./../utils/validations");
("use strict");

function apiRoutes(app) {
  app
    .route("/user/register")
    .post(require("../services/user/userRegister").process);

  app
    .route("/user/login")
    .post(require("../services/user/userLogin").processRequest);

  app.route("/user/:id").delete(require("../services/user/userDelete").process);

  // Recipe API's
  app
    .route("/recipe/create")
    .post(
      validations.validateToken,
      validations.allowIfLoggedin,
      require("../services/recipe/createRecipe").process
    );

  app
    .route("/recipe/:title")
    .get(
      validations.validateToken,
      validations.allowIfLoggedin,
      require("../services/recipe/viewRecipe").process
    )
    .delete(
      validations.validateToken,
      validations.allowIfLoggedin,
      require("../services/recipe/deleteRecipe").process
    );
  app
    .route("/recipe/update")
    .patch(
      validations.validateToken,
      validations.allowIfLoggedin,
      require("../services/recipe/updateRecipe").process
    );
}
module.exports = apiRoutes;
