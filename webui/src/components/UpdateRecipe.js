import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ImageUploading from "react-images-uploading";
import {
  updateRecipeService,
  viewRecipeService,
} from "../services/RecipeServices";
import { getCommonHeaders } from "../utils/common";

function UpdateRecipe() {
  const recipeData = useSelector((state) => state.recipe);
  const singInData = useSelector((state) => state.login);
  const [recipeTitle, setRecipeTitle] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [existingIngredients, setExistingIngredients] = useState([]);
  const [ingradientName, setIngradientName] = useState("");
  const [ingradientAmount, setIngradientAmount] = useState("");
  const [stepNum, setStepNum] = useState(0);
  const [stepDesc, setStepDesc] = useState("");
  const [instructions, setInstructions] = useState([]);
  const [existingInstructions, setExistingInstructions] = useState([]);
  const [recipeImage, setRecipeImage] = useState("");
  const [images, setImages] = useState([]);
  const [errMessage, setErrMessage] = useState("");
  const [titleErrMsg, setTitleErrMsg] = useState("");
  const maxNumber = 1;
  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    if (imageList.length && imageList[0].data_url) {
      console.log("Image loaded");
      setRecipeImage(imageList[0].data_url);
      // dispatch(getRecipeImage(imageList[0].data_url));
    }
    console.log(addUpdateIndex);
    setImages(imageList);
  };

  async function updateRecipeRequest() {
    const headers = getCommonHeaders();
    headers["x-access-token"] = singInData.accessToken;

    const body = {};
    body["userName"] = singInData.userName;
    body["title"] = recipeTitle;
    body["ingredients"] = ingredients;
    body["instructions"] = instructions;
    body["image"] = recipeImage;

    console.log("body:%s", JSON.stringify(body));
    const respData = await updateRecipeService(body, headers);
    setErrMessage(respData.message);
  }

  async function getRecipeRequest() {
    const headers = getCommonHeaders();
    headers["x-access-token"] = singInData.accessToken;

    if (!recipeTitle) {
      setErrMessage("Recipe Title Should not be empty.");
      return;
    }
    const respData = await viewRecipeService(recipeTitle, headers);
    setErrMessage(respData.message);

    if (respData.data) {
      setRecipeTitle(respData.data.title);
      setExistingIngredients(respData.data.ingredients);
      setExistingInstructions(respData.data.instructions);
      setRecipeImage(respData.data.image);
      setStepNum(respData.data.instructions.length + 1);
    } else {
      setRecipeTitle("");
      setIngredients([]);
      setInstructions([]);
      setRecipeImage("");
    }
  }

  return (
    <div className="p-3">
      <div className="flex justify-between p-3">
        <label htmlFor="recipeName" className="text-blue-900 font-sans text-xl">
          Recipe Title :
        </label>
        <div className="w-7/12">
          <input
            type="text"
            className=" border-2 border-gray-200 w-full h-7 px-2 text-xl font-light"
            onChange={(e) => {
              if (e.target.value.length > 5) {
                // setRecipeName(e.target.value);
                setTitleErrMsg("");
              } else {
                setTitleErrMsg("Recipe title should be atleast 5 letters.");
              }
              setRecipeTitle(e.target.value);
            }}
          />
          <label htmlFor="" className="text-red-500 text-smz">
            {titleErrMsg}
          </label>
        </div>
        <button
          className="bg-purple-500 text-white px-10 py-1 rounded"
          onClick={() => {
            // alert("Hello");
            console.log(recipeData);
            // console.log("signInState");
            getRecipeRequest();
          }}
        >
          Get Recipe Details
        </button>
      </div>
      <div className=" p-3">
        <label
          htmlFor="ingredients"
          className="text-blue-900 font-sans text-xl"
        >
          Ingredients :
        </label>
        {existingIngredients.map((inradient, id) => (
          <li key={id}>
            {inradient.name} - {inradient.amount}grams
          </li>
        ))}
        {ingredients.map((inradient, id) => (
          <li key={id}>
            <br></br>
            {inradient.name} - {inradient.amount}grams
          </li>
        ))}
        <div className="flex justify-between mt-2">
          <label
            htmlFor="ingredientName"
            className="text-blue-900 font-sans text-xl  w-28"
          >
            Name
          </label>
          <input
            type="text"
            className=" border-2 border-gray-200 w-3/12 h-7 px-2 text-xl font-light ml-2"
            onChange={(e) => {
              setIngradientName(e.target.value);
            }}
          />
          <label
            htmlFor="ingredientQuantity"
            className="text-blue-900 font-sans text-xl w-28"
          >
            Quantity
          </label>
          <input
            type="number"
            step="any"
            inputMode="decimal"
            placeholder="Only numeric values"
            pattern="\d*"
            className=" border-2 border-gray-200 w-3/12 h-7 px-2 text-xl font-light ml-2"
            onChange={(e) => {
              setIngradientAmount(e.target.value);
            }}
          />
          <button
            className="bg-purple-500 text-white px-3 py-1 rounded"
            onClick={() => {
              // console.log("Ingredient on click");
              if (ingradientName && ingradientName) {
                var ingradientObj = {
                  name: ingradientName,
                  amount: ingradientAmount,
                };
                // dispatch(getIngradient(ingradientObj));
                const existingArray = [...ingredients, ingradientObj];
                setIngredients(existingArray);
                setIngradientName("");
                setIngradientAmount("");
              }
            }}
          >
            Add Ingredient
          </button>
        </div>
      </div>
      <div className=" p-3">
        <label
          htmlFor="instructions"
          className="text-blue-900 font-sans text-xl w-28"
        >
          Instructions :
        </label>
        {existingInstructions.map((instruction, id) => (
          <lo key={id}>
            <br></br>
            Step {instruction.stepNo}. {instruction.stepDesc}
          </lo>
        ))}
        {instructions.map((instruction, id) => (
          <lo key={id}>
            <br></br>
            Step {instruction.stepNo}. {instruction.stepDesc}
          </lo>
        ))}

        <div className="flex mt-2">
          <input
            type="text"
            placeholder="Add instruction"
            className=" border-2 justify border-gray-200 w-3/12 h-7 px-2 text-xl font-light ml-2"
            onChange={(e) => {
              setStepDesc(e.target.value);
            }}
          />
          <button
            className="bg-purple-500 text-white px-3 py-1 rounded"
            onClick={() => {
              if (stepDesc) {
                var instructionObj = {
                  stepNo: stepNum,
                  stepDesc: stepDesc,
                };
                const existingArray = [...instructions, instructionObj];
                setInstructions(existingArray);
                setStepNum(stepNum + parseInt(1));
                setStepDesc("");
              }
            }}
          >
            Add Instruction
          </button>
        </div>
      </div>
      <div className="p-3">
        <div className="mt-2">
          <ImageUploading
            multiple
            value={images}
            onChange={onChange}
            maxNumber={maxNumber}
            dataURLKey="data_url"
          >
            {({
              imageList,
              onImageUpload,
              onImageRemoveAll,
              onImageUpdate,
              onImageRemove,
              isDragging,
              dragProps,
            }) => (
              // write your building UI
              <div className="upload__image-wrapper">
                <div className="mt-2">
                  <label
                    htmlFor="plsUploadImg"
                    className="text-blue-900 font-sans text-xl"
                  >
                    Recipe image:
                  </label>
                  <button
                    className="bg-green-600 text-white px-3 py-1 rounded ml-3"
                    onClick={onImageUpload}
                    {...dragProps}
                  >
                    Upload Image
                  </button>
                </div>
                &nbsp;
                {imageList.map((image, index) => (
                  <div
                    key={index}
                    className="flex items-center  justify-center"
                  >
                    <img
                      src={image.data_url}
                      alt=""
                      width="350"
                      className="px-5"
                    />
                    <button
                      className="bg-green-600 h-10 px-3 border-2 text-white"
                      onClick={() => onImageUpdate(index)}
                    >
                      Update
                    </button>
                    <button
                      className="bg-red-600 h-10 px-3 border-2 text-white"
                      onClick={() => onImageRemove(index)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </ImageUploading>
        </div>
      </div>
      <div className="mt-5 flex justify-center ">
        <button
          className="bg-purple-500 text-white px-10 py-1 rounded"
          onClick={() => {
            // alert("Hello");
            console.log(recipeData);
            // console.log("signInState");
            updateRecipeRequest();
          }}
        >
          Update Recipe Details
        </button>
      </div>
      <div className="mt-5 flex justify-center ">
        <label htmlFor="errMessage" className="text-red-500 font-sans text-xl">
          {errMessage}
        </label>
      </div>
    </div>
  );
}

export default UpdateRecipe;
