import UU5 from "uu5g04";
import UuPort from "uu_port_maing01-hi";

const { shallow } = UU5.Test.Tools;

describe(`UuPort.Core.PierInfo`, () => {
  it(`default props`, () => {
    const wrapper = shallow(<UuPort.Core.PierInfo />);
    expect(wrapper).toMatchSnapshot();
  });
});
