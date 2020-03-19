//@@viewOn:imports
import * as UU5 from "uu5g04";
import "uu5g04-bricks";
import "uu5tilesg01";
import Config from "./config/config.js";
import Calls from "../calls";
import Pier from "./pier";
//@@viewOff:imports

export const Port = UU5.Common.VisualComponent.create({
  //@@viewOn:mixins
  mixins: [UU5.Common.BaseMixin, UU5.Common.RouteMixin, UU5.Common.LsiMixin, UU5.Common.ContentMixin],
  //@@viewOff:mixins

  //@@viewOn:statics
  statics: {
    tagName: Config.TAG + "Port",
    classNames: {
      main: (props, state) => Config.Css.css`width: 100%, background: rgba(0, 0, 0, 0.15); padding: 8px; margin: 8px 0;`
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
  /*  _getPierList(pierList) {
    return pierList.map(pier => {
      return <Pier pier={pier} key={pier.id} />;
    });
  },*/
  _onLoad(newData) {
    return new Promise((resolve, reject) => {
      Calls.pierList({
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
              content: "Pier list failed!",
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
                <UU5.Bricks.Resize>
                  <UU5.Common.Fragment>
                    <UU5.Bricks.LanguageSelector displayedLanguages={["en", "cz"]} />
                    {/*<UU5.Bricks.Button colorSchema="green" onClick={this._openCreateBoatRoute}>
                    <UU5.Bricks.Icon icon="mdi-plus" />
                    Create
                  </UU5.Bricks.Button>*/}
                    {/*<UU5.Bricks.Header*/}
                    {/*  tooltip={this.getLsiValue("jokesListHeader")}*/}
                    {/*  content={this.getLsiComponent("jokesListHeader")}*/}
                    {/*  level={3}*/}
                    {/*  colorSchema="pink"*/}
                    {/*/>*/}
                    <UU5.Bricks.Div>
                      <UU5.Bricks.Row>
                        <UU5.Tiles.List
                          tile={<Pier />}
                          // tile={<Joke joke={{ ...data.item }} key={data.item.id}/>}
                          handleLoad={handleLoad}
                          data={data}
                          tileHeight={400}
                          tileMinWidth={1000}
                          tileMaxWidth={2400}
                          tileSpacing={8}
                          tileElevationHover={1}
                          tileBorder
                          tileStyle={{ borderRadius: 4 }}
                          rowSpacing={1}
                          tileJustify="space-around"
                          scrollElement={window}
                          key={UU5.Common.Tools.generateUUID(8)}
                        />
                      </UU5.Bricks.Row>
                    </UU5.Bricks.Div>
                  </UU5.Common.Fragment>
                </UU5.Bricks.Resize>)
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

export default Port;
