// ------------------------------------------------
// * Application: Vegan recipes app
// * Author: chanduthedev@gmail.com
// ------------------------------------------------

"use strict";

const chai = require("chai");
const chaiHttp = require("chai-http");
const respCodes = require("../../../responses/commonRespCodes");
const appConfig = require("../../../appConfig").configuration;
const expect = chai.expect;

chai.use(chaiHttp);

const appHost = appConfig.testServer.host;
const signUpEndPoint = "/recipe/create";

const recipeImage =
  "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";
let accessToken = "";

describe("Creating Recipes", () => {
  describe("Create a recipe", () => {
    const requestBody = {};
    requestBody["userName"] = "chandu";
    requestBody["password"] = "test123";

    it("Login to create a recipe", (done) => {
      chai
        .request(appHost)
        .post("/user/login")
        .send(requestBody)
        .end((err, res) => {
          if (err) {
            console.log(err);
            throw new Error("API Error");
          }
          expect(res.body["code"]).to.equal(respCodes.LOGIN_SUCCESS.code);
          expect(res.body["message"]).to.equal(respCodes.LOGIN_SUCCESS.message);
          expect(res.body).to.have.property("data");

          const resBodyData = res.body.data;
          expect(resBodyData).to.have.property("userName");
          expect(resBodyData.userName).to.equal("chandu");
          expect(resBodyData).to.have.property("accessToken");
          accessToken = resBodyData.accessToken;
          done();
        });
    });

    it("Should create a recipe", (done) => {
      const requestBody = {};
      requestBody["userName"] = "chandu";
      requestBody["email"] = "chanduthedev@gmail.com";
      requestBody["title"] = "chicken_test";
      requestBody["image"] = recipeImage;
      requestBody["ingredients"] = [{ name: "chicken", amount: 200 }];
      requestBody["instructions"] = [{ stepNo: 1, stepDesc: "Clean chicken" }];

      chai
        .request(appHost)
        .post(signUpEndPoint)
        .set("x-access-token", accessToken)
        .send(requestBody)
        .end((err, res) => {
          if (err) {
            console.log(err);
            throw new Error("API Error");
          }
          expect(res.body["code"]).to.equal(respCodes.RECIPE_ADDED.code);
          expect(res.body["message"]).to.equal(respCodes.RECIPE_ADDED.message);
          expect(res.body).to.have.property("data");

          const resBodyData = res.body.data;
          expect(resBodyData).to.have.property("title");
          expect(resBodyData).to.have.property("image");
          expect(resBodyData).to.have.property("ingredients");
          expect(resBodyData).to.have.property("instructions");
          done();
        });
    });
  });
  describe("Recipe already exists", () => {
    const requestBody = {};
    requestBody["userName"] = "chandu";
    requestBody["email"] = "chanduthedev@gmail.com";
    requestBody["title"] = "chandu";
    requestBody["image"] = recipeImage;
    requestBody["ingredients"] = [{ name: "chicken", amount: 200 }];
    requestBody["instructions"] = [{ stepNo: 1, stepDesc: "Clean chicken" }];
    it("Should show recipe already exists error message", (done) => {
      chai
        .request(appHost)
        .post(signUpEndPoint)
        .set("x-access-token", accessToken)
        .send(requestBody)
        .end((err, res) => {
          if (err) {
            console.log(err);
            throw new Error("API Error");
          }
          expect(res.body["code"]).to.equal(
            respCodes.RECIPE_ALREADY_EXISTS.code
          );
          expect(res.body["message"]).to.equal(
            respCodes.RECIPE_ALREADY_EXISTS.message
          );
          done();
        });
    });
  });
});
