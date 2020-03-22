//@@viewOn:imports
import * as UU5 from "uu5g04";
import "uu5g04-bricks";
import Config from "./config/config.js";
import Calls from "../calls";
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
  //@@viewOn:private
  async _onLoad() {
    let query = this.props.params.id || this.props.params.url.parameters.id;
    let res = await Calls.boatInfo(query);
    return res.boat;
  },
  //@@viewOff:interface

  //@@viewOn:overriding
  //@@viewOff:overriding

  //@@viewOn:private
  //@@viewOff:private

  //@@viewOn:render
  render() {
    return (
      <UU5.Bricks.Div {...this.getMainPropsToPass()}>
        <UU5.Common.DataManager onLoad={this._onLoad}>
          {({ viewState, errorState, errorData, data, handleUpdate }) => {
            if (data) {
              let { code, insurance, boatType } = data;
              return (
                <UU5.Bricks.Card>
                  <UU5.Bricks.Text>Boat Code {<UU5.Bricks.Text content={code} />} </UU5.Bricks.Text>
                  <UU5.Bricks.Text>Boat Type {<UU5.Bricks.Text content={boatType} />} </UU5.Bricks.Text>
                  <UU5.Bricks.Text>Insurance {<UU5.Bricks.Text content={insurance} />} </UU5.Bricks.Text>
                  <Plus4U5.Bricks.Image
                    style={{ display: "block", margin: "auto", padding: "2%", width: "50%", background: "#f5f5f5" }}
                    src={
                      "https://static01.nyt.com/images/2020/03/07/business/07wealth-01/06wealth-01-mediumSquareAt3X.jpg"
                    }
                    alt={"No-img"}
                  />
                </UU5.Bricks.Card>
              );
            } else {
              return <UU5.Bricks.Loading />;
            }
          }}
        </UU5.Common.DataManager>
      </UU5.Bricks.Div>
    );
  }
  //@@viewOff:render
});

export default BoatInfo;
