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
const signUpEndPoint = "/user/login";

describe("Login users", () => {
  describe("Login a user", () => {
    const requestBody = {};
    requestBody["userName"] = "chandu";
    requestBody["password"] = "test123";

    it("Should login", (done) => {
      chai
        .request(appHost)
        .post(signUpEndPoint)
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
          done();
        });
    });
  });
  describe("Login invalid credentials", () => {
    const requestBody = {};
    requestBody["userName"] = "chandu";
    requestBody["password"] = "123456";

    it("Login should fail", (done) => {
      chai
        .request(appHost)
        .post(signUpEndPoint)
        .send(requestBody)
        .end((err, res) => {
          if (err) {
            console.log(err);
            throw new Error("API Error");
          }
          expect(res.body["code"]).to.equal(respCodes.INVALID_CREDENTIALS.code);
          expect(res.body["message"]).to.equal(
            respCodes.INVALID_CREDENTIALS.message
          );
          done();
        });
    });
  });
  describe("Login User id not exists ", () => {
    const requestBody = {};
    requestBody["userName"] = "chandu1";
    requestBody["password"] = "123456";

    it("Should show user doesn't exists", (done) => {
      chai
        .request(appHost)
        .post(signUpEndPoint)
        .send(requestBody)
        .end((err, res) => {
          if (err) {
            console.log(err);
            throw new Error("API Error");
          }
          expect(res.body["code"]).to.equal(respCodes.USER_DOESNOT_EXISTS.code);
          expect(res.body["message"]).to.equal(
            respCodes.USER_DOESNOT_EXISTS.message
          );
          done();
        });
    });
  });
});
