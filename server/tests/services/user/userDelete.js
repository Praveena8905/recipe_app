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
const signUpEndPoint = "/user/";

describe("Delete users", () => {
  describe("Delete a user", () => {
    it("Should delete user", (done) => {
      chai
        .request(appHost)
        .delete(`/user/chandu`)
        .end((err, res) => {
          if (err) {
            console.log(err);
            throw new Error("API Error");
          }
          expect(res.body["code"]).to.equal(respCodes.USER_DELETED.code);
          expect(res.body["message"]).to.equal(respCodes.USER_DELETED.message);
          done();
        });
    });
  });
  describe("Delete a user which doesn't exists", () => {
    it("Should show user not exists error message", (done) => {
      chai
        .request(appHost)
        .delete(`/user/chandu1`)
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
