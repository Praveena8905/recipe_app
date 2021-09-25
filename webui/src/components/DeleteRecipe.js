import React, { useState } from "react";
import { useSelector } from "react-redux";
import { deleteRecipeService } from "../services/RecipeServices";
import { getCommonHeaders } from "../utils/common";

function DeleteRecipe() {
  const [recipeTitle, setRecipeTitle] = useState("");
  const signInState = useSelector((state) => state.login);
  const [errMessage, setErrMessage] = useState("");
  async function deleteRecipe() {
    const headers = getCommonHeaders();
    headers["x-access-token"] = signInState.accessToken;
    if (!recipeTitle) {
      setErrMessage("Recipe Title Should not be empty.");
      return;
    }

    const respData = await deleteRecipeService(recipeTitle, headers);

    setErrMessage(respData.message);
  }
  return (
    <div className="p-3">
      <div className="flex justify">
        <label htmlFor="recipeID" className="">
          Recipe Title
        </label>
        <div className="w-7/12">
          <input
            type="text"
            className=" border-2 border-gray-200 w-full h-7 px-2 text-xl font-light"
            onChange={(e) => {
              if (e.target.value.length > 5 && e.target.value.length < 33) {
                // setRecipeName(e.target.value);
                setErrMessage("");
              } else {
                setErrMessage(
                  "Recipe title should between 6 and 32 letters only."
                );
              }
              setRecipeTitle(e.target.value);
            }}
          />
          <label htmlFor="" className="text-red-500 text-smz">
            {errMessage}
          </label>
        </div>
      </div>
      <div className="flex justify-center mt-5">
        <button
          className="bg-red-500 text-white px-10 py-2 rounded"
          onClick={() => {
            deleteRecipe();
          }}
        >
          Delete Recipe
        </button>
      </div>
    </div>
  );
}

export default DeleteRecipe;
