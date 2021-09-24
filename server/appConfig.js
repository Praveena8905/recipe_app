// ------------------------------------------------
// * Application: Vegan recipes app
// * Author: chanduthedev@gmail.com
// ------------------------------------------------

module.exports = {
  configuration: {
    appServer: { host: "http://localhost", port: 7788 },
    testServer: { host: "http://chrecipeserver.herokuapp.com" },

    mongoDB: {
      host: "mongodb://localhost",
      port: 27017,
      dbName: "recipe_app",
    },
    api: {
      user: {
        register: "/user/register",
        login: "/user/login",
        updateDetails: "/user/update",
        deteleUser: "/user/",
      },
      recipe: {
        register: "/recipe/create",
        read: "/recipe/view",
        update: "/recipe/update",
        detele: "/recipe/",
      },
    },
  },
};
