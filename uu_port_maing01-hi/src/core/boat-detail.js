//@@viewOn:imports
import * as UU5 from "uu5g04";
import "uu5g04-bricks";
import Config from "./config/config.js";
import Calls from "../calls";
import PierInfo from "./pier-info";
import Port from "../routes/port";
//@@viewOff:imports

export const BoatDetail = UU5.Common.VisualComponent.create({
  //@@viewOn:mixins
  mixins: [UU5.Common.BaseMixin, UU5.Common.RouteMixin],
  //@@viewOff:mixins

  //@@viewOn:statics
  statics: {
    tagName: Config.TAG + "BoatDetail",
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
  // TODO on save func
  async _onSave(opt) {
    opt.option = "createBoat";
    let pierAvailable = await Calls.pierUpdate(opt.values.pierId);
    if (!pierAvailable.pier.message) {
      let boat = await Calls.boatCreate(opt.values);
      boat &&
        UU5.Environment.setRoute({
          component: <Port />,
          url: { useCase: "port", parameters: {} }
        });
    } else {
      alert("No free Space");
    }
    // await Calls.boatCreate(opt.values);
    // this.reload();
    /*UU5.Environment.setRoute({
        component: <Port />,
        url: { useCase: "port", parameters: {} }
      });*/
  },
  //@@viewOff:private

  //@@viewOn:render
  render() {
    return (
      <UU5.Common.DataManager
        ref_={dm => (this._dataManager = dm)}
        onLoad={Calls.loadAll}
        onReload={Calls.loadAll}
        // onUpdate={Calls.update}
        data={{ code: "UU5.Bricks" }}
        pessimistic={this.state.pessimistic}
      >
        {({ viewState, errorState, errorData, data, handleUpdate }) => {
          if (data) {
            let piers = data[0].value.data.itemList;
            let captains = data[1].value.data.itemList;
            let boats = data[2].value.data.itemList;
            // console.log(data, "look at data");
            console.log(piers, "look at data");
            console.log(captains, "look at data");
            return (
              <UU5.Bricks.Section {...this.getMainPropsToPass()}>
                <UU5.Forms.ContextModal ref_={modal => (this._modal = modal)} />
                <UU5.Bricks.Div className={this.getClassName("container")}>
                  <UU5.Common.Fragment>
                    <UU5.Bricks.Div className="uu5-common-right"></UU5.Bricks.Div>
                    <UU5.Forms.Form
                      ref_={form => (this._form = form)}
                      labelColWidth="xs-12 s-12 m-3 l-2 xl-2"
                      inputColWidth="xs-12 s-12 m-8 l-9 xl-9"
                      spacing={8}
                      onSave={this._onSave}
                      onLoad={Calls.pierList}
                      // onCancel={onCancel}
                      // values={initValue}
                    >
                      <UU5.Forms.Text name={"code"} required={true} placeholder="code" size="m" />
                      <UU5.Forms.Select required={true} label="PierId" name="pierId">
                        {piers &&
                          piers.map((item, index) => {
                            return <UU5.Forms.Select.Option content={item.code} key={item.id} value={item.id} />;
                          })}
                      </UU5.Forms.Select>
                      <UU5.Forms.Select required={true} label="CaptainId" name="captainId">
                        {captains &&
                          captains.map((item, index) => {
                            return <UU5.Forms.Select.Option content={item.name} key={item.id} value={item.id} />;
                          })}
                      </UU5.Forms.Select>
                      <UU5.Forms.Select name="insurance" label="insurance" required={true}>
                        <UU5.Forms.Select.Option value="true" />
                        <UU5.Forms.Select.Option value="false" />
                      </UU5.Forms.Select>
                      <UU5.Forms.Select name="category" label="Boat category">
                        <UU5.Forms.Select.Option content="1" value="yacht" />
                        <UU5.Forms.Select.Option content="2" value="barga" />
                        <UU5.Forms.Select.Option content="3" value="tanker" />
                      </UU5.Forms.Select>
                      <UU5.Forms.Controls />
                    </UU5.Forms.Form>
                  </UU5.Common.Fragment>
                </UU5.Bricks.Div>
              </UU5.Bricks.Section>
            );
          } else {
            return <UU5.Bricks.Loading />;
          }
        }}
      </UU5.Common.DataManager>
    );
  }
  //@@viewOff:render
});

export default BoatDetail;
