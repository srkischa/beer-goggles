import React from "react";
import { shallow, mount } from "enzyme";
import TableHeader from "./TableHeader";

describe("<TableHeader />", () => {
  it("renders without crashing", () => {
    shallow(<TableHeader />);
  });

  it("render give title", () => {
    const wrapper = shallow(<TableHeader title="SomeTitle" />);
    const text = wrapper.find("span").text();
    expect(text).toEqual("SomeTitle");
  });

  it("does not render sorting icons if is not sortable", () => {
    const wrapper = mount(<TableHeader title="SomeTitle" isSortable={false} />);
    expect(wrapper.find("svg")).toHaveLength(0);
  });

  it("render sorting icons if sortable", () => {
    const wrapper = mount(
      <TableHeader title="SomeTitle" isSortable={true} isSorted={false} />
    );
    expect(wrapper.find("svg.fa-sort")).toHaveLength(1);
  });

  it("render sorting icons UP if sortable and sortdirection is ASC", () => {
    const wrapper = mount(
      <TableHeader
        title="SomeTitle"
        isSortable={true}
        isSorted={true}
        sortDirection="ASC"
      />
    );
    expect(wrapper.find("svg.fa-sort-up")).toHaveLength(1);
  });

  it("render sorting icons DOWN if sortable and sortdirection is DESC", () => {
    const wrapper = mount(
      <TableHeader
        title="SomeTitle"
        isSortable={true}
        isSorted={true}
        sortDirection="DESC"
      />
    );
    expect(wrapper.find("svg.fa-sort-down")).toHaveLength(1);
  });
});
