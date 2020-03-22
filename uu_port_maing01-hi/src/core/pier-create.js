//@@viewOn:imports
import * as UU5 from "uu5g04";
import "uu5g04-bricks";
import Config from "./config/config.js";
import Calls from "../calls";
import BoatInfo from "./boat-info";
import Port from "../routes/port";
//@@viewOff:imports

export const PierCreate = UU5.Common.VisualComponent.create({
  //@@viewOn:mixins
  mixins: [UU5.Common.BaseMixin, UU5.Common.RouteMixin],
  //@@viewOff:mixins

  //@@viewOn:statics
  statics: {
    tagName: Config.TAG + "PierCreate",
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
  async _onSave(opt) {
    let pier = {
      code: opt.values.code,
      slots: +opt.values.slots,
      state: opt.values.state
    };
    let result = await Calls.pierCreate(pier);
    result &&
      UU5.Environment.setRoute({
        component: <Port />,
        url: { useCase: "port", parameters: {} }
      });
  },
  //@@viewOff:private

  //@@viewOn:render
  render() {
    return (
      <UU5.Bricks.Div {...this.getMainPropsToPass()}>
        <UU5.Common.DataManager
          ref_={dm => (this._dataManager = dm)}
          onLoad={Calls.load}
          onReload={Calls.reload}
          onUpdate={Calls.update}
          data={{ code: "UU5.Bricks" }}
          pessimistic={this.state.pessimistic}
        >
          {({ viewState, errorState, errorData, data, handleLoad, handleReload, handleUpdate }) => (
            <UU5.Forms.Form onSave={this._onSave}>
              <UU5.Forms.Text name="code" label="Name" placeholder="Code" required />
              <UU5.Forms.Select name="state" label="State">
                <UU5.Forms.Select.Option value="active" />
                <UU5.Forms.Select.Option value="passive" />
                <UU5.Forms.Select.Option value="problem" />
              </UU5.Forms.Select>
              <UU5.Forms.Select name="slots" label="Slots">
                <UU5.Forms.Select.Option value="1" />
                <UU5.Forms.Select.Option value="2" />
              </UU5.Forms.Select>
              <UU5.Forms.Controls />
            </UU5.Forms.Form>
          )}
        </UU5.Common.DataManager>
      </UU5.Bricks.Div>
    );
  }
  //@@viewOff:render
});

export default PierCreate;
