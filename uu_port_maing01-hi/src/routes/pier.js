//@@viewOn:imports
import * as UU5 from "uu5g04";
import "uu5tilesg01";
import "uu5g04-bricks";
import Config from "../core/config/config.js";
import PierInfo from "../core/pier-info";
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
  //@@viewOff:private
  //@@viewOn:render
  render() {
    const { code, state, typeOfBoats, id, slots, availableSlots } = this.props.item;
    const busy = slots - availableSlots;
    return (
      <UU5.Bricks.Column className="wrapper" colWidth="m-6 l-4 xl-3">
        <UU5.Bricks.Section className="pier-section"
        >
          <UU5.Bricks.Button
            content={"Move to pier"}
            onClick={() => {
              UU5.Environment.setRoute({
                component: <PierInfo data={this.props} />,
                url: { useCase: "pierInfo", parameters: { id } }
              });
            }}
          />
          <UU5.Bricks.Button
            style={{
              position: "absolute",
              background: "#f08080",
              right: "1%",
              top: "1%"
            }}
            content="&times;"
            onClick={() => {
              this.props.handleDelete(id).then(res => {
                console.log(res, "delete");
              });
            }}
          >
            Delete
          </UU5.Bricks.Button>
          {state && <UU5.Bricks.Text content={state} />}
          {code && <UU5.Bricks.Text content={code} />}
          {slots && <UU5.Bricks.Text content={slots} />}
          {typeOfBoats && <UU5.Bricks.Text content={typeOfBoats} />}
          <UU5.Bricks.Text>available {availableSlots && <UU5.Bricks.Text content={availableSlots} />} </UU5.Bricks.Text>
          <UU5.Bricks.Text>busy {busy && <UU5.Bricks.Text content={busy} />} </UU5.Bricks.Text>
        </UU5.Bricks.Section>
      </UU5.Bricks.Column>
    );
  }
  //@@viewOff:render
});

export default Pier;
