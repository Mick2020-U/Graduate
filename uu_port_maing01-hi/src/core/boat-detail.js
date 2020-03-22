//@@viewOn:imports
import * as UU5 from "uu5g04";
import "uu5g04-bricks";
import Config from "./config/config.js";
import Calls from "../calls";
import BoatInfo from "./boat-info";
//@@viewOff:imports

export const BoatDetail = UU5.Common.VisualComponent.create({
  //@@viewOn:mixins
  mixins: [UU5.Common.BaseMixin, UU5.Common.RouteMixin],
  //@@viewOff:mixins

  //@@viewOn:statics
  statics: {
    tagName: Config.TAG + "BoatDetail",
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
  // TODO on save func
  async _onSave(opt) {
    let pierAvailable = await Calls.pierDock(opt.values.pierId);
    if (!pierAvailable.pier.message) {
      let result = await Calls.boatCreate(opt.values);
      let id = result.boat.id;
      result &&
        UU5.Environment.setRoute({
          component: <BoatInfo data={result.boat} />,
          url: { useCase: "boatInfo", parameters: { id } }
        });
    } else {
      alert("No free Space");
    }
  },
  //@@viewOff:private

  //@@viewOn:render
  render() {
    return (
      <UU5.Bricks.Div {...this.getMainPropsToPass()}>
        <UU5.Common.DataManager
          ref_={dm => (this._dataManager = dm)}
          onLoad={Calls.loadAll}
          onReload={Calls.loadAll}
          onUpdate={Calls.update}
          data={{ code: "UU5.Bricks" }}
          pessimistic={this.state.pessimistic}
        >
          {({ viewState, errorState, errorData, data, handleLoad, handleReload, handleUpdate }) => {
            if (data) {
              let piers = data[0].value.data.itemList;
              let captains = data[1].value.data.itemList;
              return (
                <UU5.Forms.Form onSave={this._onSave}>
                  <UU5.Forms.Text name="code" label="Code" placeholder="Code" required />
                  <UU5.Forms.Select name="captainId" label="captainId" required={true}>
                    {captains &&
                      captains.map((item, index) => {
                        return <UU5.Forms.Select.Option content={item.name} key={item.id} value={item.id} />;
                      })}
                  </UU5.Forms.Select>
                  <UU5.Forms.Select name="pierId" label="PierId" required={true}>
                    {piers &&
                      piers.map((item, index) => {
                        return <UU5.Forms.Select.Option content={item.code} key={item.id} value={item.id} />;
                      })}
                  </UU5.Forms.Select>
                  <UU5.Forms.Select name="insurance" label="insurance" required={true}>
                    <UU5.Forms.Select.Option value="true" />
                    <UU5.Forms.Select.Option value="false" />
                  </UU5.Forms.Select>
                  <UU5.Forms.Select name="boatType" label="Type of Boat">
                    <UU5.Forms.Select.Option content="yacht" value="1" />
                    <UU5.Forms.Select.Option content="barga" value="2" />
                  </UU5.Forms.Select>
                  <UU5.Forms.Controls />
                </UU5.Forms.Form>
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

export default BoatDetail;
