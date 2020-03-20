//@@viewOn:imports
import * as UU5 from "uu5g04";
import "uu5g04-bricks";
import Config from "./config/config.js";
import Calls from "../calls";
import Pier from "../routes/pier";
//@@viewOff:imports

export const PierInfo = UU5.Common.VisualComponent.create({
  //@@viewOn:mixins
  mixins: [UU5.Common.BaseMixin, UU5.Common.RouteMixin],
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
  /*  getInitialState() {
    return {
      pierInfo: {},
      boats: [],
      currentBoat: {}
    };
  },*/
  /*  async componentDidMount() {
    let res = await Calls.pierInfo(this.props.params.id || this.props.data.item.id);
    console.log(res, "res");
  },*/
  //@@viewOff:reactLifeCycle

  //@@viewOn:interface
  async loadPier() {
    let query = this.props.params.id || this.props.data.item.id;
    return await Calls.pierInfo(query);
  },
  async loadBoats() {
    let query = this.props.params.id || this.props.data.item.id;
    return await Calls.getBoatsByPierId(query);
  },
  //@@viewOff:interface

  //@@viewOn:overriding
  //@@viewOff:overriding

  //@@viewOn:private

  //@@viewOff:private

  //@@viewOn:render
  render() {
    // console.log(this.props.params.id, "pier-info");
    // console.log(this.handleLoad(this.props.params.id));

    // const { code, state, slots } = this.props.data;
    // const loadObject = () => {
    //   let res =  Calls.pierInfo(this.props.data.item.id);
    //   return res;
    // };
    return (
      <UU5.Bricks.Div {...this.getMainPropsToPass()}>
        <UU5.Common.DataManager onLoad={this.loadPier}>
          {({ viewState, errorState, errorData, data, handleUpdate }) => {
            if (data) {
              console.log(data, "look at data");
              let { code, state, slots } = data.pier;
              return (
                <UU5.Bricks.Card>
                  {code && <UU5.Bricks.Text content={code} />}
                  {state && <UU5.Bricks.Text content={state} />}
                  {/*{slots && <UU5.Bricks.Text content={slots} />}*/}
                </UU5.Bricks.Card>
              );
            } else {
              return <UU5.Bricks.Loading />;
            }
          }}
        </UU5.Common.DataManager>
        <UU5.Bricks.Row display="flex">
          {data.map(item => (
            <Pier item={item} key={item.id}/>
          ))}
        </UU5.Bricks.Row>
      </UU5.Bricks.Div>
    );
  }
  //@@viewOff:render
});

export default PierInfo;
