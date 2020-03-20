//@@viewOn:imports
import * as UU5 from "uu5g04";
import "uu5g04-bricks";
import Config from "./config/config.js";
import Calls from "../calls";
import BoatInfo from "./boat-info";
//@@viewOff:imports

export const Boat = UU5.Common.VisualComponent.create({
  //@@viewOn:mixins
  mixins: [UU5.Common.BaseMixin, UU5.Common.RouteMixin],
  //@@viewOff:mixins

  //@@viewOn:statics
  statics: {
    tagName: Config.TAG + "Boat",
    classNames: {
      main: (props, state) => Config.Css.css`background: rgba(0, 0, 0, 0.15); padding: 8px; margin: 8px 0;`
    }
  },
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    boat: UU5.PropTypes.object
    // name: UU5.PropTypes.object,
    //  category: UU5.PropTypes.array,
    //  text: UU5.PropTypes.string,
    //  image: UU5.PropTypes.object
  },
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
  // _onLoad(newData) {
  //   return new Promise((resolve, reject) => {
  //     Calls.getBoatsByPierId({
  //       data: newData,
  //       done: dtoOut =>
  //         resolve({
  //           itemList: dtoOut.itemList,
  //           pageInfo: dtoOut.pageInfo
  //         }),
  //       fail: dtoOut => {
  //         // this._boatDetailForm.getForm().setReady();
  //         UU5.Environment.getPage()
  //           .getAlertBus()
  //           .setAlert({
  //             content: "Boat list failed!",
  //             colorSchema: "danger"
  //           });
  //         reject(dtoOut);
  //       }
  //     });
  //   });
  // },
  //@@viewOff:private

  //@@viewOn:render
  render() {
    console.log(this.props, "props in boat");
    let { code, boatType, insurance, id } = this.props.data;
    return (
      <UU5.Bricks.Div {...this.getMainPropsToPass()}>
        <UU5.Bricks.Card>
          <UU5.Bricks.Button
            content={"Move to Boat"}
            onClick={() => {
              UU5.Environment.setRoute({
                component: <BoatInfo data={this.props} />,
                url: { useCase: "boatInfo", parameters: { id } }
              });
            }}
          />
          {code && <UU5.Bricks.Text content={code} />}
          {boatType && <UU5.Bricks.Text content={boatType} />}
          {insurance && <UU5.Bricks.Text content={insurance} />}
        </UU5.Bricks.Card>
      </UU5.Bricks.Div>
    );
  }
  //@@viewOff:render
});

export default Boat;
