//@@viewOn:imports
import * as UU5 from "uu5g04";
import "uu5g04-bricks";
import Config from "./config/config.js";
import BoatInfo from "./boat-info";
import BoatEdit from "./boat-edit";
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
  //@@viewOff:private

  //@@viewOn:render
  render() {
    let { code, boatType, insurance, id } = this.props.data;
    return (
      <UU5.Bricks.Card>
        <UU5.Bricks.Button
          content={"Click"}
          onClick={() => {
            UU5.Environment.setRoute({
              component: <BoatInfo data={this.props} />,
              url: { useCase: "boatInfo", parameters: { id } }
            });
          }}
        />
        <UU5.Bricks.Button
          style={{
            position: "absolute",
            background: "#f08080",
            right: "1%",
            bottom: "1%"
          }}
          content="&times;"
          onClick={() => {
            this.props.handleDelete({ ...this.props }).then(res => {
              this.props.handleReload();
            });
          }}
        >
          Delete
        </UU5.Bricks.Button>
        <UU5.Bricks.Text>Boat Code {<UU5.Bricks.Text content={code} />} </UU5.Bricks.Text>
        <UU5.Bricks.Text>Boat Type {<UU5.Bricks.Text content={boatType} />} </UU5.Bricks.Text>
        <UU5.Bricks.Text>Insurance {<UU5.Bricks.Text content={insurance} />} </UU5.Bricks.Text>
        <UU5.Bricks.Div className="placeholder"> </UU5.Bricks.Div>
        <UU5.Bricks.Button
          content={"Edit Boat"}
          onClick={() => {
            UU5.Environment.setRoute({
              component: <BoatEdit data={this.props} />,
              url: { useCase: "boatEdit", parameters: { id } }
            });
          }}
          style={{
            position: "absolute",
            background: "wheat",
            right: "1%",
            top: "1%"
          }}
        />
      </UU5.Bricks.Card>
    );
  }
  //@@viewOff:render
});

export default Boat;
