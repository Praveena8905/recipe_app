const chai = require("chai");
const expect = chai.expect;
const validations = require("../../utils/validations");
const commonErrorCodes = require("../../responses/commonErrorCodes");

describe("Utils test cases", function () {
  describe("validate password encrypt and decrypt ", function () {
    it("should return success when passed input and ecrypted are same", async function () {
      const encryptPassword = await validations.hashPassword("username");
      const result = await validations.validatePassword(
        "username",
        encryptPassword
      );
      expect(result).to.equal(true);
    });
    it("should return error when passed input and ecrypted are different", async function () {
      const encryptPassword = await validations.hashPassword("username");
      const result = await validations.validatePassword(
        "username1",
        encryptPassword
      );
      expect(result).to.equal(false);
    });
  });

  describe("validate username", function () {
    it("should return success when passed username", function () {
      const result = validations.validateUserName("username");
      expect(result).to.be.an("object");
      expect(result).to.have.property("status");
      expect(result).to.have.property("code");
      expect(result).to.have.property("message");
      expect(result.status).to.equal(commonErrorCodes.SUCCESS.status);
      expect(result.code).to.equal(commonErrorCodes.SUCCESS.code);
      expect(result.message).to.equal(commonErrorCodes.SUCCESS.message);
    });
    it("should return missing username", function () {
      const result = validations.validateUserName();
      expect(result).to.be.an("object");
      expect(result).to.have.property("status");
      expect(result).to.have.property("code");
      expect(result).to.have.property("message");
      expect(result.status).to.equal(commonErrorCodes.MISSING_USERNAME.status);
      expect(result.code).to.equal(commonErrorCodes.MISSING_USERNAME.code);
      expect(result.message).to.equal(
        commonErrorCodes.MISSING_USERNAME.message
      );
    });

    it("should return lenght error when username lenght is < 6", function () {
      const result = validations.validateUserName("user");
      expect(result).to.be.an("object");
      expect(result).to.have.property("status");
      expect(result).to.have.property("code");
      expect(result).to.have.property("message");
      expect(result.status).to.equal(
        commonErrorCodes.INVALID_USERNAME_LENGTH.status
      );
      expect(result.code).to.equal(
        commonErrorCodes.INVALID_USERNAME_LENGTH.code
      );
      expect(result.message).to.equal(
        commonErrorCodes.INVALID_USERNAME_LENGTH.message
      );
    });
    it("should return lenght error when username lenght is > 32", function () {
      const result = validations.validateUserName(
        "1234123412341234123412341234123412341234"
      );
      expect(result).to.be.an("object");
      expect(result).to.have.property("status");
      expect(result).to.have.property("code");
      expect(result).to.have.property("message");
      expect(result.status).to.equal(
        commonErrorCodes.INVALID_USERNAME_LENGTH.status
      );
      expect(result.code).to.equal(
        commonErrorCodes.INVALID_USERNAME_LENGTH.code
      );
      expect(result.message).to.equal(
        commonErrorCodes.INVALID_USERNAME_LENGTH.message
      );
    });

    it("should return invalid username when passed numeric", function () {
      const result = validations.validateUserName(20);
      expect(result).to.be.an("object");
      expect(result).to.have.property("status");
      expect(result).to.have.property("code");
      expect(result).to.have.property("message");
      expect(result.status).to.equal(commonErrorCodes.INVALID_USERNAME.status);
      expect(result.code).to.equal(commonErrorCodes.INVALID_USERNAME.code);
      expect(result.message).to.equal(
        commonErrorCodes.INVALID_USERNAME.message
      );
    });
    it("should return invalid username when passed JSON", function () {
      const result = validations.validateUserName({ test: "test" });
      expect(result).to.be.an("object");
      expect(result).to.have.property("status");
      expect(result).to.have.property("code");
      expect(result).to.have.property("message");
      expect(result.status).to.equal(commonErrorCodes.INVALID_USERNAME.status);
      expect(result.code).to.equal(commonErrorCodes.INVALID_USERNAME.code);
      expect(result.message).to.equal(
        commonErrorCodes.INVALID_USERNAME.message
      );
    });
    it("should return invalid username when passed array", function () {
      const result = validations.validateUserName([1, 2]);
      expect(result).to.be.an("object");
      expect(result).to.have.property("status");
      expect(result).to.have.property("code");
      expect(result).to.have.property("message");
      expect(result.status).to.equal(commonErrorCodes.INVALID_USERNAME.status);
      expect(result.code).to.equal(commonErrorCodes.INVALID_USERNAME.code);
      expect(result.message).to.equal(
        commonErrorCodes.INVALID_USERNAME.message
      );
    });
  });

  describe("validate password format", function () {
    it("should return success when passed valid password", function () {
      const result = validations.validatePasswordFormat("password");
      expect(result).to.be.an("object");
      expect(result).to.have.property("status");
      expect(result).to.have.property("code");
      expect(result).to.have.property("message");
      expect(result.status).to.equal(commonErrorCodes.SUCCESS.status);
      expect(result.code).to.equal(commonErrorCodes.SUCCESS.code);
      expect(result.message).to.equal(commonErrorCodes.SUCCESS.message);
    });
    it("should return missing password", function () {
      const result = validations.validatePasswordFormat();
      expect(result).to.be.an("object");
      expect(result).to.have.property("status");
      expect(result).to.have.property("code");
      expect(result).to.have.property("message");
      expect(result.status).to.equal(commonErrorCodes.MISSING_PASSWORD.status);
      expect(result.code).to.equal(commonErrorCodes.MISSING_PASSWORD.code);
      expect(result.message).to.equal(
        commonErrorCodes.MISSING_PASSWORD.message
      );
    });
    it("should return lenght error when password lenght is < 6", function () {
      const result = validations.validatePasswordFormat("1234");
      expect(result).to.be.an("object");
      expect(result).to.have.property("status");
      expect(result).to.have.property("code");
      expect(result).to.have.property("message");
      expect(result.status).to.equal(
        commonErrorCodes.INVALID_PASSWORD_LENGTH.status
      );
      expect(result.code).to.equal(
        commonErrorCodes.INVALID_PASSWORD_LENGTH.code
      );
      expect(result.message).to.equal(
        commonErrorCodes.INVALID_PASSWORD_LENGTH.message
      );
    });
    it("should return lenght error when password lenght is > 32", function () {
      const result = validations.validatePasswordFormat(
        "1234123412341234123412341234123412341234"
      );
      expect(result).to.be.an("object");
      expect(result).to.have.property("status");
      expect(result).to.have.property("code");
      expect(result).to.have.property("message");
      expect(result.status).to.equal(
        commonErrorCodes.INVALID_PASSWORD_LENGTH.status
      );
      expect(result.code).to.equal(
        commonErrorCodes.INVALID_PASSWORD_LENGTH.code
      );
      expect(result.message).to.equal(
        commonErrorCodes.INVALID_PASSWORD_LENGTH.message
      );
    });
    it("should return invalid password format when passed JSON", function () {
      const result = validations.validatePasswordFormat({ test: "test" });
      expect(result).to.be.an("object");
      expect(result).to.have.property("status");
      expect(result).to.have.property("code");
      expect(result).to.have.property("message");
      expect(result.status).to.equal(
        commonErrorCodes.INVALID_PASSWORD_FORMAT.status
      );
      expect(result.code).to.equal(
        commonErrorCodes.INVALID_PASSWORD_FORMAT.code
      );
      expect(result.message).to.equal(
        commonErrorCodes.INVALID_PASSWORD_FORMAT.message
      );
    });
    it("should return invalid password format when passed array", function () {
      const result = validations.validatePasswordFormat([1, 2]);
      expect(result).to.be.an("object");
      expect(result).to.have.property("status");
      expect(result).to.have.property("code");
      expect(result).to.have.property("message");
      expect(result.status).to.equal(
        commonErrorCodes.INVALID_PASSWORD_FORMAT.status
      );
      expect(result.code).to.equal(
        commonErrorCodes.INVALID_PASSWORD_FORMAT.code
      );
      expect(result.message).to.equal(
        commonErrorCodes.INVALID_PASSWORD_FORMAT.message
      );
    });
  });
  describe("validate email", function () {
    it("should return success when passed email", function () {
      const result = validations.validateEmail("chanduthedev@gmail.com");
      expect(result).to.be.an("object");
      expect(result).to.have.property("status");
      expect(result).to.have.property("code");
      expect(result).to.have.property("message");
      expect(result.status).to.equal(commonErrorCodes.SUCCESS.status);
      expect(result.code).to.equal(commonErrorCodes.SUCCESS.code);
      expect(result.message).to.equal(commonErrorCodes.SUCCESS.message);
    });
    it("should return missing email", function () {
      const result = validations.validateEmail();
      expect(result).to.be.an("object");
      expect(result).to.have.property("status");
      expect(result).to.have.property("code");
      expect(result).to.have.property("message");
      expect(result.status).to.equal(commonErrorCodes.MISSING_EMAIL.status);
      expect(result.code).to.equal(commonErrorCodes.MISSING_EMAIL.code);
      expect(result.message).to.equal(commonErrorCodes.MISSING_EMAIL.message);
    });
    it("should return invalid email when passed numeric", function () {
      const result = validations.validateEmail(20);
      expect(result).to.be.an("object");
      expect(result).to.have.property("status");
      expect(result).to.have.property("code");
      expect(result).to.have.property("message");
      expect(result.status).to.equal(commonErrorCodes.INVALID_EMAIL.status);
      expect(result.code).to.equal(commonErrorCodes.INVALID_EMAIL.code);
      expect(result.message).to.equal(commonErrorCodes.INVALID_EMAIL.message);
    });
    it("should return invalid email when passed JSON", function () {
      const result = validations.validateEmail({ test: "test" });
      expect(result).to.be.an("object");
      expect(result).to.have.property("status");
      expect(result).to.have.property("code");
      expect(result).to.have.property("message");
      expect(result.status).to.equal(commonErrorCodes.INVALID_EMAIL.status);
      expect(result.code).to.equal(commonErrorCodes.INVALID_EMAIL.code);
      expect(result.message).to.equal(commonErrorCodes.INVALID_EMAIL.message);
    });
    it("should return invalid email when passed array", function () {
      const result = validations.validateEmail([1, 2]);
      expect(result).to.be.an("object");
      expect(result).to.have.property("status");
      expect(result).to.have.property("code");
      expect(result).to.have.property("message");
      expect(result.status).to.equal(commonErrorCodes.INVALID_EMAIL.status);
      expect(result.code).to.equal(commonErrorCodes.INVALID_EMAIL.code);
      expect(result.message).to.equal(commonErrorCodes.INVALID_EMAIL.message);
    });
  });

  describe("validate title", function () {
    it("should return success when passed title", function () {
      const result = validations.validateTitle("title1");
      expect(result).to.be.an("object");
      expect(result).to.have.property("status");
      expect(result).to.have.property("code");
      expect(result).to.have.property("message");
      expect(result.status).to.equal(commonErrorCodes.SUCCESS.status);
      expect(result.code).to.equal(commonErrorCodes.SUCCESS.code);
      expect(result.message).to.equal(commonErrorCodes.SUCCESS.message);
    });
    it("should return missing title", function () {
      const result = validations.validateTitle();
      expect(result).to.be.an("object");
      expect(result).to.have.property("status");
      expect(result).to.have.property("code");
      expect(result).to.have.property("message");
      expect(result.status).to.equal(commonErrorCodes.MISSING_TITLE.status);
      expect(result.code).to.equal(commonErrorCodes.MISSING_TITLE.code);
      expect(result.message).to.equal(commonErrorCodes.MISSING_TITLE.message);
    });
    it("should return invalid title when passed numeric", function () {
      const result = validations.validateTitle(20);
      expect(result).to.be.an("object");
      expect(result).to.have.property("status");
      expect(result).to.have.property("code");
      expect(result).to.have.property("message");
      expect(result.status).to.equal(commonErrorCodes.INVALID_TITLE.status);
      expect(result.code).to.equal(commonErrorCodes.INVALID_TITLE.code);
      expect(result.message).to.equal(commonErrorCodes.INVALID_TITLE.message);
    });
    it("should return invalid title when passed JSON", function () {
      const result = validations.validateTitle({ test: "test" });
      expect(result).to.be.an("object");
      expect(result).to.have.property("status");
      expect(result).to.have.property("code");
      expect(result).to.have.property("message");
      expect(result.status).to.equal(commonErrorCodes.INVALID_TITLE.status);
      expect(result.code).to.equal(commonErrorCodes.INVALID_TITLE.code);
      expect(result.message).to.equal(commonErrorCodes.INVALID_TITLE.message);
    });
    it("should return invalid title when passed array", function () {
      const result = validations.validateTitle([1, 2]);
      expect(result).to.be.an("object");
      expect(result).to.have.property("status");
      expect(result).to.have.property("code");
      expect(result).to.have.property("message");
      expect(result.status).to.equal(commonErrorCodes.INVALID_TITLE.status);
      expect(result.code).to.equal(commonErrorCodes.INVALID_TITLE.code);
      expect(result.message).to.equal(commonErrorCodes.INVALID_TITLE.message);
    });

    it("should return lenght error when title lenght is < 6", function () {
      const result = validations.validateTitle("test");
      expect(result).to.be.an("object");
      expect(result).to.have.property("status");
      expect(result).to.have.property("code");
      expect(result).to.have.property("message");
      expect(result.status).to.equal(
        commonErrorCodes.INVALID_RECIPE_TITLE_LENGTH.status
      );
      expect(result.code).to.equal(
        commonErrorCodes.INVALID_RECIPE_TITLE_LENGTH.code
      );
      expect(result.message).to.equal(
        commonErrorCodes.INVALID_RECIPE_TITLE_LENGTH.message
      );
    });
    it("should return lenght error when title lenght is > 32", function () {
      const result = validations.validateTitle(
        "testtesttesttesttesttesttesttesttesttest"
      );
      expect(result).to.be.an("object");
      expect(result).to.have.property("status");
      expect(result).to.have.property("code");
      expect(result).to.have.property("message");
      expect(result.status).to.equal(
        commonErrorCodes.INVALID_RECIPE_TITLE_LENGTH.status
      );
      expect(result.code).to.equal(
        commonErrorCodes.INVALID_RECIPE_TITLE_LENGTH.code
      );
      expect(result.message).to.equal(
        commonErrorCodes.INVALID_RECIPE_TITLE_LENGTH.message
      );
    });
  });

  describe("validate image", function () {
    // it("should return success when passed valid image base64 string",  function () {
    //   const result =  validations.validateImage(testImage);
    //   expect(result).to.be.an("object");
    //   expect(result).to.have.property("status");
    //   expect(result).to.have.property("code");
    //   expect(result).to.have.property("message");
    //   expect(result.status).to.equal(commonErrorCodes.SUCCESS.status);
    //   expect(result.code).to.equal(commonErrorCodes.SUCCESS.code);
    //   expect(result.message).to.equal(commonErrorCodes.SUCCESS.message);
    // });
    it("should return missing image", function () {
      const result = validations.validateImage();
      expect(result).to.be.an("object");
      expect(result).to.have.property("status");
      expect(result).to.have.property("code");
      expect(result).to.have.property("message");
      expect(result.status).to.equal(commonErrorCodes.MISSING_IMAGE.status);
      expect(result.code).to.equal(commonErrorCodes.MISSING_IMAGE.code);
      expect(result.message).to.equal(commonErrorCodes.MISSING_IMAGE.message);
    });
    it("should return invalid image when passed numeric", function () {
      const result = validations.validateImage(20);
      expect(result).to.be.an("object");
      expect(result).to.have.property("status");
      expect(result).to.have.property("code");
      expect(result).to.have.property("message");
      expect(result.status).to.equal(commonErrorCodes.INVALID_IMAGE.status);
      expect(result.code).to.equal(commonErrorCodes.INVALID_IMAGE.code);
      expect(result.message).to.equal(commonErrorCodes.INVALID_IMAGE.message);
    });
    // it("should return invalid image when passed JSON",  function () {
    //   const result =  validations.validateImage({ test: "test" });
    //   expect(result).to.be.an("object");
    //   expect(result).to.have.property("status");
    //   expect(result).to.have.property("code");
    //   expect(result).to.have.property("message");
    //   expect(result.status).to.equal(commonErrorCodes.INVALID_IMAGE.status);
    //   expect(result.code).to.equal(commonErrorCodes.INVALID_IMAGE.code);
    //   expect(result.message).to.equal(commonErrorCodes.INVALID_IMAGE.message);
    // });
    it("should return invalid image when passed array", function () {
      const result = validations.validateImage([1, 2]);
      expect(result).to.be.an("object");
      expect(result).to.have.property("status");
      expect(result).to.have.property("code");
      expect(result).to.have.property("message");
      expect(result.status).to.equal(commonErrorCodes.INVALID_IMAGE.status);
      expect(result.code).to.equal(commonErrorCodes.INVALID_IMAGE.code);
      expect(result.message).to.equal(commonErrorCodes.INVALID_IMAGE.message);
    });
  });

  describe("validate Ingredients", function () {
    it("should return success when passed valid ingredients", function () {
      const result = validations.validateIngredients([
        { name: "title", amount: 123 },
      ]);
      expect(result).to.be.an("object");
      expect(result).to.have.property("status");
      expect(result).to.have.property("code");
      expect(result).to.have.property("message");
      expect(result.status).to.equal(commonErrorCodes.SUCCESS.status);
      expect(result.code).to.equal(commonErrorCodes.SUCCESS.code);
      expect(result.message).to.equal(commonErrorCodes.SUCCESS.message);
    });
    it("should return missing ingredients", function () {
      const result = validations.validateIngredients();
      expect(result).to.be.an("object");
      expect(result).to.have.property("status");
      expect(result).to.have.property("code");
      expect(result).to.have.property("message");
      expect(result.status).to.equal(
        commonErrorCodes.MISSING_INGREDIENTS.status
      );
      expect(result.code).to.equal(commonErrorCodes.MISSING_INGREDIENTS.code);
      expect(result.message).to.equal(
        commonErrorCodes.MISSING_INGREDIENTS.message
      );
    });
    it("should return invalid ingredients when passed without name", function () {
      const result = validations.validateIngredients([{ amount: 123 }]);
      expect(result).to.be.an("object");
      expect(result).to.have.property("status");
      expect(result).to.have.property("code");
      expect(result).to.have.property("message");
      expect(result.status).to.equal(
        commonErrorCodes.INVALID_INGREDIENTS.status
      );
      expect(result.code).to.equal(commonErrorCodes.INVALID_INGREDIENTS.code);
      expect(result.message).to.equal(
        commonErrorCodes.INVALID_INGREDIENTS.message
      );
    });

    it("should return invalid ingredients when passed string", function () {
      const result = validations.validateIngredients("test");
      expect(result).to.be.an("object");
      expect(result).to.have.property("status");
      expect(result).to.have.property("code");
      expect(result).to.have.property("message");
      expect(result.status).to.equal(
        commonErrorCodes.INVALID_INGREDIENTS.status
      );
      expect(result.code).to.equal(commonErrorCodes.INVALID_INGREDIENTS.code);
      expect(result.message).to.equal(
        commonErrorCodes.INVALID_INGREDIENTS.message
      );
    });
    it("should return invalid ingredients when passed numeric", function () {
      const result = validations.validateIngredients(20);
      expect(result).to.be.an("object");
      expect(result).to.have.property("status");
      expect(result).to.have.property("code");
      expect(result).to.have.property("message");
      expect(result.status).to.equal(
        commonErrorCodes.INVALID_INGREDIENTS.status
      );
      expect(result.code).to.equal(commonErrorCodes.INVALID_INGREDIENTS.code);
      expect(result.message).to.equal(
        commonErrorCodes.INVALID_INGREDIENTS.message
      );
    });
    it("should return invalid ingredients when passed JSON", function () {
      const result = validations.validateIngredients({ test: "test" });
      expect(result).to.be.an("object");
      expect(result).to.have.property("status");
      expect(result).to.have.property("code");
      expect(result).to.have.property("message");
      expect(result.status).to.equal(
        commonErrorCodes.INVALID_INGREDIENTS.status
      );
      expect(result.code).to.equal(commonErrorCodes.INVALID_INGREDIENTS.code);
      expect(result.message).to.equal(
        commonErrorCodes.INVALID_INGREDIENTS.message
      );
    });
    it("should return missing ingredients when passed empty array", function () {
      const result = validations.validateIngredients([]);
      expect(result).to.be.an("object");
      expect(result).to.have.property("status");
      expect(result).to.have.property("code");
      expect(result).to.have.property("message");
      expect(result.status).to.equal(
        commonErrorCodes.MISSING_INGREDIENTS.status
      );
      expect(result.code).to.equal(commonErrorCodes.MISSING_INGREDIENTS.code);
      expect(result.message).to.equal(
        commonErrorCodes.MISSING_INGREDIENTS.message
      );
    });
  });

  describe("validate instructions", function () {
    it("should return success when passed valid instructions", function () {
      const result = validations.validateInstructions([
        { stepNo: 123, stepDesc: "123" },
      ]);
      expect(result).to.be.an("object");
      expect(result).to.have.property("status");
      expect(result).to.have.property("code");
      expect(result).to.have.property("message");
      expect(result.status).to.equal(commonErrorCodes.SUCCESS.status);
      expect(result.code).to.equal(commonErrorCodes.SUCCESS.code);
      expect(result.message).to.equal(commonErrorCodes.SUCCESS.message);
    });
    it("should return missing instructions", function () {
      const result = validations.validateInstructions();
      expect(result).to.be.an("object");
      expect(result).to.have.property("status");
      expect(result).to.have.property("code");
      expect(result).to.have.property("message");
      expect(result.status).to.equal(
        commonErrorCodes.MISSING_INSTRUCTIONS.status
      );
      expect(result.code).to.equal(commonErrorCodes.MISSING_INSTRUCTIONS.code);
      expect(result.message).to.equal(
        commonErrorCodes.MISSING_INSTRUCTIONS.message
      );
    });
    it("should return invalid instructions when passed invalid data", function () {
      const result = validations.validateInstructions([
        { step: 123, stepDesc: "123" },
      ]);
      expect(result).to.be.an("object");
      expect(result).to.have.property("status");
      expect(result).to.have.property("code");
      expect(result).to.have.property("message");
      expect(result.status).to.equal(
        commonErrorCodes.INVALID_INSTRUCTIONS.status
      );
      expect(result.code).to.equal(commonErrorCodes.INVALID_INSTRUCTIONS.code);
      expect(result.message).to.equal(
        commonErrorCodes.INVALID_INSTRUCTIONS.message
      );
    });
    it("should return invalid instructions when passed string", function () {
      const result = validations.validateInstructions("test");
      expect(result).to.be.an("object");
      expect(result).to.have.property("status");
      expect(result).to.have.property("code");
      expect(result).to.have.property("message");
      expect(result.status).to.equal(
        commonErrorCodes.INVALID_INSTRUCTIONS.status
      );
      expect(result.code).to.equal(commonErrorCodes.INVALID_INSTRUCTIONS.code);
      expect(result.message).to.equal(
        commonErrorCodes.INVALID_INSTRUCTIONS.message
      );
    });
    it("should return invalid instructions when passed numeric", function () {
      const result = validations.validateInstructions(20);
      expect(result).to.be.an("object");
      expect(result).to.have.property("status");
      expect(result).to.have.property("code");
      expect(result).to.have.property("message");
      expect(result.status).to.equal(
        commonErrorCodes.INVALID_INSTRUCTIONS.status
      );
      expect(result.code).to.equal(commonErrorCodes.INVALID_INSTRUCTIONS.code);
      expect(result.message).to.equal(
        commonErrorCodes.INVALID_INSTRUCTIONS.message
      );
    });
    it("should return invalid instructions when passed JSON", function () {
      const result = validations.validateInstructions({ test: "test" });
      expect(result).to.be.an("object");
      expect(result).to.have.property("status");
      expect(result).to.have.property("code");
      expect(result).to.have.property("message");
      expect(result.status).to.equal(
        commonErrorCodes.INVALID_INSTRUCTIONS.status
      );
      expect(result.code).to.equal(commonErrorCodes.INVALID_INSTRUCTIONS.code);
      expect(result.message).to.equal(
        commonErrorCodes.INVALID_INSTRUCTIONS.message
      );
    });
    it("should return missing instructions when passed empty array", function () {
      const result = validations.validateInstructions([]);
      expect(result).to.be.an("object");
      expect(result).to.have.property("status");
      expect(result).to.have.property("code");
      expect(result).to.have.property("message");
      expect(result.status).to.equal(
        commonErrorCodes.MISSING_INSTRUCTIONS.status
      );
      expect(result.code).to.equal(commonErrorCodes.MISSING_INSTRUCTIONS.code);
      expect(result.message).to.equal(
        commonErrorCodes.MISSING_INSTRUCTIONS.message
      );
    });
  });
});
