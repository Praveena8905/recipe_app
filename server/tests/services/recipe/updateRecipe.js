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
const signUpEndPoint = "/recipe/update";
let accessToken = "";

describe("Update Recipes", () => {
  describe("Update a recipe", () => {
    const requestBody = {};
    requestBody["userName"] = "chandu";
    requestBody["password"] = "test123";

    it("Login to update a recipe", (done) => {
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

    it("Should update recipe details", (done) => {
      let requestBody = {};
      requestBody["title"] = "chicken_test";
      requestBody["image"] = "test123";
      requestBody["ingredients"] = [{ name: "chicken", amount: 200 }];
      requestBody["instructions"] = [{ stepNo: 1, stepDesc: "Clean chicken" }];
      chai
        .request(appHost)
        .patch(signUpEndPoint)
        .set("x-access-token", accessToken)
        .send(requestBody)
        .end((err, res) => {
          if (err) {
            console.log(err);
            throw new Error("API Error");
          }
          expect(res.body["code"]).to.equal(
            respCodes.RECIPE_DETAILS_UPDATED.code
          );
          expect(res.body["message"]).to.equal(
            respCodes.RECIPE_DETAILS_UPDATED.message
          );
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

  describe("Recipe not exists ", () => {
    it("Should show recipe doesn't exists", (done) => {
      let requestBody = {};
      requestBody["title"] = "chicken_test123";
      requestBody["image"] = "test123";
      requestBody["ingredients"] = [{ name: "chicken", amount: 200 }];
      requestBody["instructions"] = [{ stepNo: 1, stepDesc: "Clean chicken" }];
      chai
        .request(appHost)
        .patch(signUpEndPoint)
        .set("x-access-token", accessToken)
        .send(requestBody)
        .end((err, res) => {
          if (err) {
            console.log(err);
            throw new Error("API Error");
          }
          expect(res.body["code"]).to.equal(respCodes.RECIPE_NOT_FOUND.code);
          expect(res.body["message"]).to.equal(
            respCodes.RECIPE_NOT_FOUND.message
          );
          done();
        });
    });
  });
});
