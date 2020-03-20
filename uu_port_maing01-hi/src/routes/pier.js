//@@viewOn:imports
import * as UU5 from "uu5g04";
import "uu5tilesg01";
import "uu5g04-bricks";
import Config from "../core/config/config.js";
import Calls from "../calls";
import PierInfo from "../core/pier-info";
import BoatInfo from "../core/boat-info";
import "./pier.css";
//@@viewOff:imports

export const Pier = UU5.Common.VisualComponent.create({
  //@@viewOn:mixins
  mixins: [UU5.Common.BaseMixin, UU5.Common.RouteMixin],
  //@@viewOff:mixins

  //@@viewOn:statics
  statics: {
    tagName: Config.TAG + "Pier",
    classNames: {
      main: (props, state) => Config.Css.css`background: rgba(0, 0, 0, 0.15); padding: 8px; margin: 8px 0;`
    }
    // lsi: Lsi
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
  _onLoad(newData) {
    return new Promise((resolve, reject) => {
      Calls.getBoatsByPierId({
        data: newData,
        done: dtoOut =>
          resolve({
            itemList: dtoOut.itemList,
            pageInfo: dtoOut.pageInfo
          }),
        fail: dtoOut => {
          // this._boatDetailForm.getForm().setReady();
          UU5.Environment.getPage()
            .getAlertBus()
            .setAlert({
              content: "Boat list failed!",
              colorSchema: "danger"
            });
          reject(dtoOut);
        }
      });
    });
  },
  //@@viewOff:private
  //@@viewOn:render
  render() {

    const { code, state, slots, typeOfBoats, id, empty } = this.props.item;
    return (
      <UU5.Bricks.Column className="wrapper" colWidth="m-6 l-4 xl-3">
        <UU5.Bricks.Section >
          <UU5.Bricks.Button
            content={"Move to pier"}
            onClick={() => {
              UU5.Environment.setRoute({
                component: <PierInfo data={this.props} />,
                url: { useCase: "pierInfo", parameters: { id } }
              });
            }}
          />
          {state && <UU5.Bricks.Text content={state} />}
          {slots && <UU5.Bricks.Text content={slots} />}
          {typeOfBoats && <UU5.Bricks.Text content={typeOfBoats} />}
          <UU5.Bricks.Text>available {empty && <UU5.Bricks.Text content={empty} />} </UU5.Bricks.Text>
        </UU5.Bricks.Section>
      </UU5.Bricks.Column>
    );
  }
  //@@viewOff:render
});

export default Pier;
