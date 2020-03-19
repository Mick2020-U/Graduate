import UU5 from "uu5g04";
import UuPort from "uu_port_maing01-hi";

const { shallow } = UU5.Test.Tools;

describe(`UuPort.Routes.Pier`, () => {
  it(`default props`, () => {
    const wrapper = shallow(<UuPort.Routes.Pier />);
    expect(wrapper).toMatchSnapshot();
  });
});
