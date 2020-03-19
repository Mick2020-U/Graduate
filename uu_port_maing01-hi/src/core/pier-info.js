//@@viewOn:imports
import * as UU5 from "uu5g04";
import "uu5g04-bricks";
import Config from "./config/config.js";
import Boat from "./boat";
//@@viewOff:imports

export const PierInfo = UU5.Common.VisualComponent.create({
  //@@viewOn:mixins
  mixins: [UU5.Common.BaseMixin],
  //@@viewOff:mixins

  //@@viewOn:statics
  statics: {
    tagName: Config.TAG + "PierInfo",
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
  _getBoatList(jokeList) {
    return jokeList.map(boat => {
      return <Boat boat={boat} key={boat.pierId}/>;
    });
  },
  //@@viewOff:private

  //@@viewOn:render
  render() {
    console.log(this.props, "===look at props");
    const { code, state, slots, boatCodes } = this.props;
    return (
      <UU5.Bricks.Card
        header={<UU5.Bricks.Text content={code} classname={"uu5-common-singleline-ellipsis"}/>}
        // footer={<UU5.Bricks.Button content="open Detail" onClick={this._openJokeDetail}/>}
        level={6}
        bgStyle="outline"
        className={"uu5-common-padding-s joke"}>
        {state && <UU5.Bricks.Text content={state} />}
        {slots && <UU5.Bricks.Text content={slots} />}

        {this._getBoatList(boatCodes)}
        {/*{this.props.joke.image &&*/}
        {/*<UU5.Bricks.Text content={this.props.joke.image}*/}
        {/*       tooltip={this.props.joke.image}*/}
        {/*      level={6} classname={"uu5-common-singleline-ellipsis"}/>*/}
      </UU5.Bricks.Card>)
  }
  //@@viewOff:render
});

export default PierInfo;
