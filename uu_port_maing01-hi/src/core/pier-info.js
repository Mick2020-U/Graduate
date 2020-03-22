//@@viewOn:imports
import * as UU5 from "uu5g04";
import "uu5g04-bricks";
import Config from "./config/config.js";
import Calls from "../calls";
import Boat from "./boat";
import "./pier-info.css";
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
  getInitialState() {
    return {
      boats: []
    };
  },
  async componentDidMount() {
    let query = this.props.params.id || this.props.data.item.id || this.props.params.url.parameters.id;
    let response = await Calls.boatsById(query);
    this.setState({ boats: response.boats.itemList });
  },
  //@@viewOff:reactLifeCycle

  //@@viewOn:interface
  async loadPier() {
    let query = this.props.params.id || this.props.data.item.id || this.props.params.url.parameters.id;
    //@@viewOff:imports
    return await Calls.pierInfo(query);
  },
  async loadBoats() {
    let query = this.props.params.id || this.props.data.item.id || this.props.params.url.parameters.id;
    let res = await Calls.boatsById(query);
    this.setState(() => {
      return {
        boats: res.boats.itemList
      };
    });
    return res.boats.itemList;
  },

  async sortByInsurance() {
    let state = [...this.state.boats];
    let filtered = state.sort((a, b) => (a.insurance > b.insurance ? 1 : -1));
    this.setState(() => {
      return {
        boats: filtered
      };
    });
  },
  async sortByClass() {
    let state = [...this.state.boats];
    let filtered = state.sort((a, b) => (a.boatType > b.boatType ? 1 : -1));
    this.setState(() => {
      return {
        boats: filtered
      };
    });
  },
  async sortByCode() {
    let state = [...this.state.boats];
    let filtered = state.sort((a, b) => (a.code > b.code ? 1 : -1));
    this.setState(() => {
      return {
        boats: filtered
      };
    });
  },
  //@@viewOff:interface

  //@@viewOn:overriding
  //@@viewOff:overriding

  //@@viewOn:private
  async _handleDelete(opt) {
    await Calls.pierUndock(opt.data.pierId);
    await Calls.boatDelete(opt.data);
  },
  //@@viewOff:private

  //@@viewOn:render
  render() {
    return (
      <UU5.Bricks.Resize className="port-container" {...this.getMainPropsToPass()}>
        <UU5.Common.DataManager onLoad={this.loadPier}>
          {({ data }) => {
            if (data) {
              let { code, slots, availableSlots } = data.pier;
              const busy = slots - availableSlots;
              return (
                <UU5.Bricks.Card className="pier-entity">
                  <UU5.Bricks.Text className="pier-text">Pier # {<UU5.Bricks.Text content={code} />} </UU5.Bricks.Text>
                  <UU5.Bricks.Text className="pier-text">
                    Pier Capacity {<UU5.Bricks.Text content={slots} />}{" "}
                  </UU5.Bricks.Text>
                  <UU5.Bricks.Text className="pier-text">
                    Busy {<UU5.Bricks.Text content={busy} />} Slots{" "}
                  </UU5.Bricks.Text>
                  <UU5.Bricks.Text className="pier-text">
                    Available {availableSlots && <UU5.Bricks.Text content={availableSlots} />} Slots
                  </UU5.Bricks.Text>
                </UU5.Bricks.Card>
              );
            } else {
              return <UU5.Bricks.Loading />;
            }
          }}
        </UU5.Common.DataManager>

        <UU5.Common.ListDataManager
          onLoad={this.loadBoats}
          onReload={this.loadBoats}
          onCreate={Calls.create}
          onUpdate={Calls.update}
          onDelete={this._handleDelete}
        >
          {({ viewState, errorState, errorData, data, handleLoad, handleReload, handleDelete }) => {
            if (errorState) {
              // error
              return "Error";
            } else if (data) {
              // ready
              return (
                <UU5.Bricks.Div className="sort-container">
                  <UU5.Bricks.Button
                    disabled={!data}
                    colorSchema="primary"
                    onClick={() => {
                      this.sortByInsurance().then(
                        data => console.log("reload success", data),
                        data => console.log("reload fail", data)
                      );
                    }}
                  >
                    Sort By insurance yes-no
                  </UU5.Bricks.Button>
                  <UU5.Bricks.Button
                    disabled={!data}
                    colorSchema="danger"
                    onClick={() => {
                      this.sortByClass().then(
                        data => console.log("reload success", data),
                        data => console.log("reload fail", data)
                      );
                    }}
                  >
                    Filter by Class
                  </UU5.Bricks.Button>
                  <UU5.Bricks.Button
                    disabled={!data}
                    colorSchema="warning"
                    onClick={() => {
                      this.sortByCode().then(
                        data => console.log("reload success", data),
                        data => console.log("reload fail", data)
                      );
                    }}
                  >
                    Sort by Code
                  </UU5.Bricks.Button>
                  <UU5.Bricks.Card className="list">
                    <UU5.Bricks.Text className="list-text">List of assigned Boats</UU5.Bricks.Text>
                  </UU5.Bricks.Card >
                  <UU5.Bricks.Row className="pier-row" >
                    {this.state.boats.map(item => (
                      <UU5.Bricks.Column colWidth="m-12 l-8 xl-6" key={item.id}>
                        <Boat data={item} handleDelete={handleDelete} handleReload={handleReload} />
                      </UU5.Bricks.Column>
                    ))}
                  </UU5.Bricks.Row>
                </UU5.Bricks.Div>
              );
            } else {
              // loading
              return <UU5.Bricks.Loading />;
            }
          }}
        </UU5.Common.ListDataManager>
      </UU5.Bricks.Resize>
    );
  }
  //@@viewOff:render
});

export default PierInfo;
