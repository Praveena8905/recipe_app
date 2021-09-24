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
const signUpEndPoint = "/user/register";

describe("Creating users", () => {
  describe("Create a user", () => {
    const requestBody = {};
    requestBody["userName"] = "chandu";
    requestBody["password"] = "test123";
    requestBody["email"] = "chanduthedev@gmail.com";

    it("Should create user", (done) => {
      chai
        .request(appHost)
        .post(signUpEndPoint)
        .send(requestBody)
        .end((err, res) => {
          if (err) {
            console.log(err);
            throw new Error("API Error");
          }
          expect(res.body["code"]).to.equal(respCodes.USER_CREATED.code);
          expect(res.body["message"]).to.equal(respCodes.USER_CREATED.message);
          expect(res.body).to.have.property("data");

          const resBodyData = res.body.data;
          expect(resBodyData).to.have.property("userName");
          expect(resBodyData.userName).to.equal("chandu");
          done();
        });
    });
  });
  describe("User already exists", () => {
    const requestBody = {};
    requestBody["userName"] = "chandu";
    requestBody["password"] = "test123";
    requestBody["email"] = "chanduthedev@gmail.com";

    it("Should show user already exists error message", (done) => {
      chai
        .request(appHost)
        .post(signUpEndPoint)
        .send(requestBody)
        .end((err, res) => {
          if (err) {
            console.log(err);
            throw new Error("API Error");
          }
          expect(res.body["code"]).to.equal(respCodes.USER_ALREADY_EXISTS.code);
          expect(res.body["message"]).to.equal(
            respCodes.USER_ALREADY_EXISTS.message
          );
          done();
        });
    });
  });
});
