//@@viewOn:imports
import * as UU5 from "uu5g04";
import "uu5g04-bricks";
import Config from "./config/config.js";
//@@viewOff:imports

export const BoatInfo = UU5.Common.VisualComponent.create({
  //@@viewOn:mixins
  mixins: [UU5.Common.BaseMixin, UU5.Common.RouteMixin],
  //@@viewOff:mixins

  //@@viewOn:statics
  statics: {
    tagName: Config.TAG + "BoatInfo",
    classNames: {
      main: (props, state) => Config.Css.css`background: rgba(0, 0, 0, 0.15); padding: 8px; margin: 8px 0;`
    }
  },
  //@@viewOff:statics

  //@@viewOn:propTypes
  //@@viewOff:propTypes

  //@@viewOn:getDefaultProps
  //@@viewOff:getDefaultProps

  //@@viewOn:reactLifeCycle
  //@@viewOff:reactLifeCycle

  //@@viewOn:interface
  //@@viewOff:interface

  //@@viewOn:overriding
  //@@viewOff:overriding

  //@@viewOn:private
  //@@viewOff:private

  //@@viewOn:render
  render() {
    console.log(this.props, "props at boat");
    const {code, boatType, src} = this.props.data;
    return (
      <UU5.Bricks.Div {...this.getMainPropsToPass()}>

        <UU5.Bricks.Card
          // header={<UU5.Bricks.Text content={code} classname={"uu5-common-singleline-ellipsis"}/>}
          level={6}
          bgStyle="outline"
          className={"uu5-common-padding-s joke"}
        >
          {code && <UU5.Bricks.Text content={code} />}
          {boatType && <UU5.Bricks.Text content={boatType} />}
          {/*{slots && <UU5.Bricks.Text content={slots} />}*/}
          <Plus4U5.Bricks.Image
            style={{ display: "block", margin: "auto", width: "50%", background: "#f5f5f5" }}
            src={src}
            alt={"No-img"}
          />
        </UU5.Bricks.Card>
      </UU5.Bricks.Div>
    );
  }
  //@@viewOff:render
});

export default BoatInfo;
