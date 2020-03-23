//@@viewOn:imports
import * as UU5 from "uu5g04";
import "uu5g04-bricks";
import Config from "./config/config.js";
import Calls from "../calls";
import "./boat-info.css";
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
    let pierInfo = await Calls.pierInfo(res.boat.pierId);
    return { ...res.boat, pier: pierInfo.pier.code };
  },
  //@@viewOff:interface

  //@@viewOn:overriding
  //@@viewOff:overriding

  //@@viewOn:private
  //@@viewOff:private

  //@@viewOn:render
  render() {
    return (
      <UU5.Bricks.Resize {...this.getMainPropsToPass()}>
        <UU5.Common.DataManager onLoad={this._onLoad}>
          {({ viewState, errorState, errorData, data, handleUpdate }) => {
            if (data) {
              let { code, insurance, boatType, pier, dockingTime } = data;
              let time = dockingTime.map(item => item.substring(0, 10));
              return (
                <UU5.Bricks.Card className="boat-card">
                  <UU5.Bricks.Section className="boat-section">
                    <UU5.Bricks.Text className="boat-info-text">
                      Boat Code {<UU5.Bricks.Text content={code} />}
                    </UU5.Bricks.Text>
                    <UU5.Bricks.Text className="boat-info-text">
                      Boat Type {<UU5.Bricks.Text content={boatType} />}
                    </UU5.Bricks.Text>
                    <UU5.Bricks.Text className="boat-info-text">
                      Insurance {<UU5.Bricks.Text content={insurance} />}
                    </UU5.Bricks.Text>
                    <UU5.Bricks.Text className="boat-info-text">
                      Docked at Pier: {<UU5.Bricks.Text content={pier} />}
                    </UU5.Bricks.Text>
                    <UU5.Bricks.Text className="boat-info-text"> Docked From {time[0]} </UU5.Bricks.Text>
                    <UU5.Bricks.Text className="boat-info-text"> To  {time[1]} </UU5.Bricks.Text>
                  </UU5.Bricks.Section>
                  <Plus4U5.Bricks.Image
                    className="boat-img"
                    src={"https://cdn3.iconfinder.com/data/icons/vacation-4/32/vacation_34-512.png"}
                    alt={"No-img"}
                  />
                </UU5.Bricks.Card>
              );
            } else {
              return <UU5.Bricks.Loading />;
            }
          }}
        </UU5.Common.DataManager>
      </UU5.Bricks.Resize>
    );
  }
  //@@viewOff:render
});

export default BoatInfo;
