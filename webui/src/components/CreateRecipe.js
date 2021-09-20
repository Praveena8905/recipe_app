import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getRecipeTitle,
  getIngradient,
  getInstruction,
  getRecipeImage,
} from "../actions";
import ImageUploading from "react-images-uploading";
import { createRecipeService } from "../services/RecipeServices";
import { getCommonHeaders } from "../utils/common";

function CreateRecipe() {
  const dispatch = useDispatch();
  // const recipeData = useSelector((state) => state.recipe);
  const singInData = useSelector((state) => state.login);
  const [recipeTitle, setRecipeTitle] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [ingradientName, setIngradientName] = useState("");
  const [ingradientAmount, setIngradientAmount] = useState("");
  const [stepNum, setStepNum] = useState(1);
  const [stepDesc, setStepDesc] = useState("");
  const [instructions, setInstructions] = useState([]);
  const [recipeImage, setRecipeImage] = useState("");
  const [images, setImages] = useState([]);
  const [responseCode, setResponseCode] = useState(0);
  const [errMessage, setErrMessage] = useState("");
  const [titleErrMsg, setTitleErrMsg] = useState("");

  const maxNumber = 1;
  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    if (imageList.length && imageList[0].data_url) {
      setRecipeImage(imageList[0].data_url);
    }
    console.log(addUpdateIndex);
    setImages(imageList);
  };

  async function createRecipeRequest() {
    let headers = getCommonHeaders();
    headers["x-access-token"] = singInData.accessToken;

    const body = {};
    body["userName"] = singInData.userName;
    body["title"] = recipeTitle;
    body["ingredients"] = ingredients;
    body["instructions"] = instructions;
    body["image"] = recipeImage;
    const respData = await createRecipeService(body, headers);
    setResponseCode(respData.code);
    setErrMessage(respData.message);
  }

  return (
    <div className="p-3">
      <div className="flex justify p-2">
        <label htmlFor="recipeName" className="text-blue-900 font-sans text-xl">
          Recipe Name :
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
      </div>

      <div className=" p-3">
        <label
          htmlFor="ingredients"
          className="text-blue-900 font-sans text-xl"
        >
          Ingredients :
        </label>
        {ingredients.map((inradient, id) => (
          <lo key={id}>
            <br></br>
            {id + 1}.{inradient.name} - {inradient.amount}
          </lo>
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
            type="text"
            className=" border-2 border-gray-200 w-3/12 h-7 px-2 text-xl font-light ml-2"
            onChange={(e) => {
              setIngradientAmount(e.target.value);
            }}
          />
          <button
            className="bg-green-500 text-white px-3 py-1 rounded"
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
            Add Ingradient
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
        {instructions.map((instruction, id) => (
          <lo key={id}>
            <br></br>
            Step {instruction.stepNo}. {instruction.stepDesc}
          </lo>
        ))}
        <div className="flex justify-between mt-2">
          <label
            htmlFor="stepNo"
            className="text-blue-900 font-sans text-xl w-28"
          >
            Step No.
          </label>
          <input
            type="text"
            className=" border-2 border-gray-200 w-3/12 h-7 px-2 text-xl font-light ml-2"
          />
          <label
            htmlFor="description"
            className="text-blue-900 font-sans text-xl w-28 "
          >
            Description
          </label>
          <input
            type="text"
            className=" border-2 border-gray-200 w-3/12 h-7 px-2 text-xl font-light ml-2"
            onChange={(e) => {
              setStepDesc(e.target.value);
            }}
          />
          <button
            className="bg-green-500 text-white px-3 py-1 rounded"
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
                    Recipe Image:
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
          className="bg-green-600 text-white px-10 py-1 rounded"
          onClick={() => {
            createRecipeRequest();
          }}
        >
          Create Recipe app
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

export default CreateRecipe;
