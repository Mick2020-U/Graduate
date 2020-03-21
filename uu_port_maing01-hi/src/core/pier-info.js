//@@viewOn:imports
import * as UU5 from "uu5g04";
import "uu5g04-bricks";
import Config from "./config/config.js";
import Calls from "../calls";
import Boat from "./boat";
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
    let res = await Calls.boatsById("5e73620c5ae50e7a722e0149");
    // console.log(res, "res");
  },*/
  //@@viewOff:reactLifeCycle

  //@@viewOn:interface
  async loadPier() {
    let query = this.props.params.id || this.props.data.item.id;
    return await Calls.pierInfo(query);
  },
  async loadBoats() {
    let query = this.props.params.id || this.props.data.item.id;
    let res = await Calls.boatsById(query);
    return res.boats.itemList;
  },
  //@@viewOff:interface

  //@@viewOn:overriding
  //@@viewOff:overriding

  //@@viewOn:private

  //@@viewOff:private

  //@@viewOn:render
  render() {
    return (
      <UU5.Bricks.Div {...this.getMainPropsToPass()}>
        <UU5.Common.DataManager onLoad={this.loadPier}>
          {({ viewState, errorState, errorData, data, handleUpdate }) => {
            if (data) {
              let { code, state, empty } = data.pier;
              return (
                <UU5.Bricks.Card>
                  {code && <UU5.Bricks.Text content={code}/>}
                  {state && <UU5.Bricks.Text content={state}/>}
                  <UU5.Bricks.Text>available {empty && <UU5.Bricks.Text content={empty} />} </UU5.Bricks.Text>
                </UU5.Bricks.Card>
              );
            } else {
              return <UU5.Bricks.Loading/>;
            }
          }}
        </UU5.Common.DataManager>

        <UU5.Common.ListDataManager
          onLoad={this.loadBoats}
          onReload={this.loadBoats}
          onCreate={Calls.create}
          onUpdate={Calls.update}
          onDelete={Calls.boatDelete}
        >
          {({
            viewState,
            errorState,
            errorData,
            data,
            handleLoad,
            handleReload,
            handleCreate,
            handleUpdate,
            handleDelete
          }) => {
            if (errorState) {
              // error
              return "Error";
            } else if (data) {
              // console.log(data, "look at data");
              // ready
              return (
                <UU5.Bricks.Div>
                  <UU5.Bricks.Button
                    disabled={!data}
                    onClick={() => {
                      handleLoad().then(
                        data => console.log("load success", data),
                        data => console.log("load fail", data)
                      );
                    }}
                  >
                    Load
                  </UU5.Bricks.Button>
                  <UU5.Bricks.Button
                    disabled={!data}
                    colorSchema="primary"
                    onClick={() => {
                      handleReload().then(
                        data => console.log("reload success", data),
                        data => console.log("reload fail", data)
                      );
                    }}
                  >
                    Reload
                  </UU5.Bricks.Button>
                  <UU5.Bricks.Button
                    colorSchema="success"
                    disabled={errorState || !data}
                    onClick={() => {
                      handleCreate({
                        id: UU5.Common.Tools.generateUUID(),
                        name: "Joke " + new Date().toLocaleString(),
                        text: "Lorem ipsum..."
                      }).then(data => console.log("create success", data), data => console.log("create fail", data));
                    }}
                  >
                    Create
                  </UU5.Bricks.Button>
                  <UU5.Bricks.Row display="flex">
                    {data.map(item => (
                      <UU5.Bricks.Column colWidth="m-6 l-4 xl-3" key={item.id}>
                        <Boat
                          data={item}
                          handleDelete={handleDelete}
                        />
                      </UU5.Bricks.Column>
                    ))}
                  </UU5.Bricks.Row>
                </UU5.Bricks.Div>
              );
            } else {
              // loading
              return <UU5.Bricks.Loading/>;
            }
          }}
        </UU5.Common.ListDataManager>
      </UU5.Bricks.Div>
    );
  }
  //@@viewOff:render
});

export default PierInfo;
