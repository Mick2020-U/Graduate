//@@viewOn:imports
import * as UU5 from "uu5g04";
import "uu5g04-bricks";
import Config from "./config/config.js";
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
  //@@viewOff:private

  //@@viewOn:render
  render() {
    const { onSave, onCancel, initValue } = this.props;
    return (
      <UU5.Bricks.Div {...this.getMainPropsToPass()}>
        <UU5.Common.Fragment>
          <UU5.Bricks.Div className="uu5-common-right"></UU5.Bricks.Div>
          <UU5.Forms.Form
            ref_={form => (this._form = form)}
            labelColWidth="xs-12 s-12 m-3 l-2 xl-2"
            inputColWidth="xs-12 s-12 m-8 l-9 xl-9"
            spacing={8}
            onSave={onSave}
            onCancel={onCancel}
            values={initValue}
          >
            <UU5.Forms.Text name={"name"} required={true} placeholder="name" size="s" />
            <UU5.Forms.TextArea name={"text"} placeholder="text" spacing={16} size="s" />
            <UU5.Forms.Controls />
          </UU5.Forms.Form>
        </UU5.Common.Fragment>
      </UU5.Bricks.Div>
    );
  }
  //@@viewOff:render
});

export default BoatDetail;
