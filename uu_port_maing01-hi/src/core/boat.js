//@@viewOn:imports
import * as UU5 from "uu5g04";
import "uu5g04-bricks";
import Config from "./config/config.js";
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
    console.log(this.props, "===look at props");
    const { code, state, slots } = this.props;
    return (
      <UU5.Bricks.Card
        header={<UU5.Bricks.Text content={code} classname={"uu5-common-singleline-ellipsis"}/>}
        // footer={<UU5.Bricks.Button content="open Detail" onClick={this._openJokeDetail}/>}
        level={6}
        bgStyle="outline"
        className={"uu5-common-padding-s joke"}
      >
        {state && <UU5.Bricks.Text content={state} />}
        {slots && <UU5.Bricks.Text content={slots} />}

        {/*{this.props.joke.image &&*/}
        {/*<UU5.Bricks.Text content={this.props.joke.image}*/}
        {/*       tooltip={this.props.joke.image}*/}
        {/*      level={6} classname={"uu5-common-singleline-ellipsis"}/>*/}
      </UU5.Bricks.Card>)
  }
  //@@viewOff:render
});

export default Boat;
