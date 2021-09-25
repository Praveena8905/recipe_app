import { render, fireEvent } from "@testing-library/react";
import SignIn from "./SignIn";

import { createMemoryHistory } from "history";
import React from "react";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

describe("Login Page Tests", () => {
  let store = "";
  beforeEach(() => {
    const initialState = { output: 10 };
    const mockStore = configureStore();
    store = mockStore(initialState);
  });
  it("User Name input text verifying", () => {
    const { getByText, getByLabelText } = render(
      <Provider store={store}>
        <SignIn />
      </Provider>
    );
    const userName = getByLabelText("username");
    fireEvent.change(userName, { target: { value: "webapp" } });
    expect(userName.value).toBe("webapp");
    expect(getByText("User name")).toBeTruthy();
  });

  it("Password input text verifying", () => {
    const { getByText, getByLabelText } = render(
      <Provider store={store}>
        <SignIn />
      </Provider>
    );
    const password = getByLabelText("password");
    fireEvent.change(password, { target: { value: "password" } });
    expect(password.value).toBe("password");
    expect(getByText("Password")).toBeTruthy();
  });
});
