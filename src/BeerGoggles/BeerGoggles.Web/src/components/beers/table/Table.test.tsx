import React from "react";
import { shallow, mount } from "enzyme";
import Table from "./Table";

describe("<Table />", () => {
  it("renders without crashing", () => {
    shallow(<Table beers={[]} />);
  });

  it("render name column properly", () => {
    const beers = [
      { id: 1, name: "Pilsner", description: "Descr", isOrganic: "Y" }
    ];
    const wrapper = shallow(<Table beers={beers} />);
    const text = wrapper
      .find("tbody > tr > td")
      .at(0)
      .text();
    expect(text).toEqual("Pilsner");
  });

  it("render empty string if style is missing", () => {
    const beers = [{ id: 1, name: "Pilsner" }];
    const wrapper = shallow(<Table beers={beers} />);
    const text = wrapper
      .find("tbody > tr > td")
      .at(1)
      .text();
    expect(text).toEqual("");
  });

  it("render style.name when it is not missing", () => {
    const beers = [
      {
        id: 1,
        style: { name: "Pale Ale Style" }
      }
    ];
    const wrapper = shallow(<Table beers={beers} />);
    const text = wrapper
      .find("tbody > tr > td")
      .at(1)
      .text();
    expect(text).toEqual("Pale Ale Style");
  });

  it("render empty string if description is missing", () => {
    const beers = [
      {
        id: 1,
        name: "Pilsner"
      }
    ];
    const wrapper = shallow(<Table beers={beers} />);
    const text = wrapper
      .find("tbody > tr > td")
      .at(2)
      .text();
    expect(text).toEqual("");
  });

  it("render description if it is present", () => {
    const beers = [
      {
        id: 1,
        description: "Pilsner is the",
        isOrganic: "Y"
      }
    ];
    const wrapper = shallow(<Table beers={beers} />);
    const text = wrapper
      .find("tbody > tr > td")
      .at(2)
      .text();
    expect(text).toEqual("Pilsner is the");
  });

  it("render isOrganic Yes for Y value", () => {
    const beers = [
      {
        id: 1,
        isOrganic: "Y"
      }
    ];
    const wrapper = shallow(<Table beers={beers} />);
    const text = wrapper
      .find("tbody > tr > td")
      .at(3)
      .text();
    expect(text).toEqual("Yes");
  });

  it("render isOrganic No for N value", () => {
    const beers = [
      {
        id: 1,
        isOrganic: "N"
      }
    ];
    const wrapper = shallow(<Table beers={beers} />);
    const text = wrapper
      .find("tbody > tr > td")
      .at(3)
      .text();
    expect(text).toEqual("No");
  });
});
