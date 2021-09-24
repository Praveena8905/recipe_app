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
let accessToken = "";

describe("Delete Recipes", () => {
  describe("Delete a recipe", () => {
    const requestBody = {};
    requestBody["userName"] = "chandu";
    requestBody["password"] = "test123";

    it("Login to delete a recipe", (done) => {
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
    it("Should delete a recipe", (done) => {
      chai
        .request(appHost)
        .delete(`/recipe/chicken_test`)
        .set("x-access-token", accessToken)
        .end((err, res) => {
          if (err) {
            console.log(err);
            throw new Error("API Error");
          }
          expect(res.body["code"]).to.equal(respCodes.RECIPE_DELETED.code);
          expect(res.body["message"]).to.equal(
            respCodes.RECIPE_DELETED.message
          );
          done();
        });
    });
  });
  describe("Delete a recipe which doesn't exists", () => {
    it("Should show recipe not exists error message", (done) => {
      chai
        .request(appHost)
        .delete(`/recipe/chicken_test1`)
        .set("x-access-token", accessToken)
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
