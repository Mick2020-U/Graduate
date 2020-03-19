//@@viewOn:imports
import * as UU5 from "uu5g04";
import "uu5g04-bricks";
import Config from "./config/config.js";
import BoatInfo from "./boat-info";
//@@viewOff:imports

export const Boat = UU5.Common.VisualComponent.create({
  //@@viewOn:mixins
  mixins: [UU5.Common.BaseMixin],
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
    console.log(this.props, "props in boat");
    const { code, boatType, pierId } = this.props.boat;
    return (
      <UU5.Bricks.Card
        // header={<UU5.Bricks.Text content={code} classname={"uu5-common-singleline-ellipsis"}/>}
        // footer={<UU5.Bricks.Button content="open Detail" onClick={this._openJokeDetail}/>}
        level={6}
        bgStyle="outline"
        className={"uu5-common-padding-s joke"}
      >
        {code && <UU5.Bricks.Text content={code} />}
        {boatType && <UU5.Bricks.Text content={boatType} />}
        {/*<UU5.Bricks.Button
          content={"click"}
          onClick={() => {
            UU5.Environment.setRoute({
              component: <BoatInfo data={this.props}/>,
              url: { useCase: "", parameters: { id: this.props.data.id } }
            });
          }}
          style={{
            position: "absolute",
            right: "80%",
            top: "2%"
          }}
        />*/}
        {/*{this.props.joke.image &&*/}
        {/*<UU5.Bricks.Text content={this.props.joke.image}*/}
        {/*       tooltip={this.props.joke.image}*/}
        {/*      level={6} classname={"uu5-common-singleline-ellipsis"}/>*/}
      </UU5.Bricks.Card>)
  }
  //@@viewOff:render
});

export default Boat;
