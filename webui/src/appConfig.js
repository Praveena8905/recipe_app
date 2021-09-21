// ------------------------------------------------
// * Application: Vegan recipes app
// * Author: chanduthedev@gmail.com
// ------------------------------------------------

module.exports = {
  configuration: {
    appServer: { host: "https://chrecipeserver.herokuapp.com" },
    api: {
      user: {
        register: "/user/register",
        login: "/user/login",
        updateDetails: "/user/update",
        deteleUser: "/user/",
      },
      recipe: {
        create: "/recipe/create",
        view: "/recipe/",
        update: "/recipe/update",
        delete: "/recipe/",
      },
    },
  },
};
