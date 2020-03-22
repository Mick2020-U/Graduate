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

  //@@viewOff:reactLifeCycle

  //@@viewOn:interface
  async loadPier() {
    let query = this.props.params.id || this.props.data.item.id || this.props.params.url.parameters.id;
    console.log(query);
    return await Calls.pierInfo(query);
  },
  async loadBoats() {
    let query = this.props.params.id || this.props.data.item.id || this.props.params.url.parameters.id;
    let res = await Calls.boatsById(query);
    return res.boats.itemList;
  },

  async sortBoats() {
    let query = this.props.params.id || this.props.data.item.id || this.props.params.url.parameters.id;
    let res = await Calls.boatsById(query);
    return res.boats.itemList.sort((a, b) => (a.insurance > b.insurance ? 1 : -1));
  },
  //@@viewOff:interface

  //@@viewOn:overriding
  //@@viewOff:overriding

  //@@viewOn:private
  async _handleDelete(opt) {
    console.log(opt.data);
    await Calls.pierUndock(opt.data.pierId);
    // await Calls.boatDelete(opt.data);
  },
  //@@viewOff:private

  //@@viewOn:render
  render() {
    return (
      <UU5.Bricks.Div {...this.getMainPropsToPass()}>
        <UU5.Common.DataManager onLoad={this.loadPier}>
          {({ data }) => {
            if (data) {
              let { code, slots, availableSlots } = data.pier;
              const busy = slots - availableSlots;
              return (
                <UU5.Bricks.Card>
                  <UU5.Bricks.Text>Pier # {<UU5.Bricks.Text content={code} />} </UU5.Bricks.Text>
                  <UU5.Bricks.Text>Pier Capacity {<UU5.Bricks.Text content={slots} />} </UU5.Bricks.Text>
                  <UU5.Bricks.Text>Busy {<UU5.Bricks.Text content={busy} />} Slots </UU5.Bricks.Text>
                  <UU5.Bricks.Text>
                    available {availableSlots && <UU5.Bricks.Text content={availableSlots} />} Slots
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
          onReload={this.sortBoats}
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
                <UU5.Bricks.Div>
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
                    Sort By insurance yes-no
                  </UU5.Bricks.Button>
                  <UU5.Bricks.Button
                    disabled={!data}
                    colorSchema="danger"
                    onClick={() => {
                      handleReload().then(
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
                      handleReload().then(
                        data => console.log("reload success", data),
                        data => console.log("reload fail", data)
                      );
                    }}
                  >
                    Sort by Boats
                  </UU5.Bricks.Button>
                  <UU5.Bricks.Card>
                    <UU5.Bricks.Text>List of assigned Boats</UU5.Bricks.Text>
                  </UU5.Bricks.Card>
                  <UU5.Bricks.Row display="flex">
                    {data.map(item => (
                      <UU5.Bricks.Column colWidth="m-6 l-4 xl-3" key={item.id}>
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
      </UU5.Bricks.Div>
    );
  }
  //@@viewOff:render
});

export default PierInfo;
