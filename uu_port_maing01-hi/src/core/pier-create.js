//@@viewOn:imports
import * as UU5 from "uu5g04";
import "uu5g04-bricks";
import Config from "./config/config.js";
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
  //@@viewOff:private

  //@@viewOn:render
  render() {
    return (
      <UU5.Bricks.Div {...this.getMainPropsToPass()}>
        <UU5.Forms.Form
          onSave={opt => alert(`opt.values:\n${JSON.stringify(opt.values, null, 2)}`)}
          header={<UU5.Bricks.Box content="Registration form" colorSchema="green" className="font-size-m" />}
          footer={<UU5.Bricks.Box content="Unicorn 2018" colorSchema="grey" className="font-size-xs" />}
        >
          <UU5.Forms.Text name="name" label="Name" placeholder="John" required />
          <UU5.Forms.TextArea name="description" label="Description" placeholder="Some text..." />
          <UU5.Forms.TextIcon name="role" label="Role" placeholder="UU-BT:1000-1" icon="mdi-magnify" />
          <UU5.Forms.Number name="age" label="Age" value={18} />
          <UU5.Forms.Checkboxes
            name="sex"
            label="Sex"
            value={[{ label: "Man", name: "man" }, { label: "Woman", name: "woman" }]}
          />
          <UU5.Forms.Checkboxes
            name="hobby"
            label="Hobby"
            value={[
              { label: "Football", name: "football" },
              { label: "Hockey", name: "hockey" },
              { label: "Squash", name: "squash" },
              { label: "Ping-pong", name: "ping-pong" },
              { label: "Tenis", name: "tenis" }
            ]}
          />
          <UU5.Forms.Select name="country" label="Country">
            <UU5.Forms.Select.Option value="Czech Republic" />
            <UU5.Forms.Select.Option value="Germany" />
            <UU5.Forms.Select.Option value="Poland" />
            <UU5.Forms.Select.Option value="Slovakia" />
          </UU5.Forms.Select>
          <UU5.Forms.File name="attachment" label="Attachment" />

          <UU5.Forms.Controls />
        </UU5.Forms.Form>
      </UU5.Bricks.Div>
    );
  }
  //@@viewOff:render
});

export default PierCreate;
