//@@viewOn:imports
import * as UU5 from "uu5g04";
import "uu5g04-bricks";
import Config from "./config/config.js";
import Boat from "./boat";
import Calls from "../calls";
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
  //@@viewOff:interface

  //@@viewOn:overriding
  //@@viewOff:overriding

  //@@viewOn:private
  _onLoad(newData) {
    return new Promise((resolve, reject) => {
      Calls.getBoatsByPierId({
        data: newData,
        done: dtoOut =>
          resolve({
            itemList: dtoOut.itemList,
            pageInfo: dtoOut.pageInfo
          }),
        fail: dtoOut => {
          // this._boatDetailForm.getForm().setReady();
          UU5.Environment.getPage()
            .getAlertBus()
            .setAlert({
              content: "Boat list failed!",
              colorSchema: "danger"
            });
          reject(dtoOut);
        }
      });
    });
  },
  //@@viewOff:private

  //@@viewOn:render
  render() {
    console.log(this.props);
    const { code, state, slots } = this.props.data;
    return (
      <UU5.Bricks.Div {...this.getMainPropsToPass()}>
        <UU5.Common.ListDataManager onLoad={this._onLoad}>
          {({ viewState, errorState, errorData, data, handleCreate, handleLoad }) => {
            if (errorState) {
              // error
              return <UU5.Bricks.Error errorData={errorData} />;
            } else if (data) {
              // ready
              return (
                <UU5.Common.Fragment>

                  <UU5.Bricks.Card
                    header={<UU5.Bricks.Text content={code} classname={"uu5-common-singleline-ellipsis"} />}
                    level={6}
                    bgStyle="outline"
                    className={"uu5-common-padding-s joke"}
                  >
                    {state && <UU5.Bricks.Text content={state} />}
                    {slots && <UU5.Bricks.Text content={slots} />}
                  </UU5.Bricks.Card>
                  <UU5.Bricks.Div>
                    <UU5.Bricks.Row display="flex">
                      <UU5.Tiles.List
                        tile={<Boat />}
                        // tile={<Joke joke={{ ...data.item }} key={data.item.id}/>}
                        handleLoad={handleLoad}
                        data={data}
                        tileHeight={300}
                        tileMinWidth={220}
                        tileMaxWidth={400}
                        tileSpacing={8}
                        tileElevationHover={1}
                        tileBorder
                        tileStyle={{ borderRadius: 4 }}
                        rowSpacing={8}
                        tileJustify="space-between"
                        scrollElement={window}
                      />
                    </UU5.Bricks.Row>
                  </UU5.Bricks.Div>
                </UU5.Common.Fragment>
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
