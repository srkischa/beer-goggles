import React from "react";
import * as axios from "axios";
import { shallow, mount } from "enzyme";
import FilterForm from "./FilterForm";

jest.mock("axios");

//todo mock and rename and more tests!

describe("<FilterForm />", () => {
  const clickEvent = Object.assign(jest.fn(), { preventDefault: () => {} });

  it("renders without crashing", () => {
    shallow(<FilterForm />);
  });

  it("if there is no data select should have only one option", () => {
    axios.get.mockImplementation(() =>
      Promise.resolve({ status: 200, data: [] })
    );

    const wrapper = shallow(<FilterForm />);
    const options = wrapper.find("select > option");
    expect(options).toHaveLength(1);
  });

  it("submit button should propagate onChange to parent component", () => {
    const mockOnChangeFn = jest.fn();
    const wrapper = shallow(<FilterForm onChange={mockOnChangeFn} />);
    const submitButton = wrapper.find("button.btn.btn-primary").at(0);
    submitButton.simulate("click", clickEvent);
    expect(mockOnChangeFn.mock.calls.length).toEqual(1);
  });

  it("submit button should propagate onChange with name surrounded with asterisks", () => {
    const mockOnChangeFn = jest.fn();
    const wrapper = shallow(<FilterForm onChange={mockOnChangeFn} />);
    const nameInput = wrapper.find("#name").at(0);
    nameInput.simulate("change", { target: { value: "Beer" } });
    const submitButton = wrapper.find("button.btn.btn-primary").at(0);
    submitButton.simulate("click", clickEvent);
    expect(mockOnChangeFn.mock.calls.length).toEqual(1);
    expect(mockOnChangeFn.mock.calls[0][0].name).toEqual("*Beer*");
  });
});
