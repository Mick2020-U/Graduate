//@@viewOn:imports
import * as UU5 from "uu5g04";
import "uu5tilesg01";
import "uu5g04-bricks";
import Config from "../core/config/config.js";
import Calls from "../calls";
import Boat from "../core/boat";
//@@viewOff:imports

export const Pier = UU5.Common.VisualComponent.create({
  //@@viewOn:mixins
  mixins: [UU5.Common.BaseMixin, UU5.Common.RouteMixin],
  //@@viewOff:mixins

  //@@viewOn:statics
  statics: {
    tagName: Config.TAG + "Pier",
    classNames: {
      main: (props, state) => Config.Css.css`background: rgba(0, 0, 0, 0.15); padding: 8px; margin: 8px 0;`
    }
    // lsi: Lsi
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
  _getJokeList(jokeList) {
    return jokeList.map(joke => {
      return <Joke joke={joke} key={joke.id} />;
    });
  },
  _showAlert() {
    UU5.Environment.getPage()
      .getAlertBus()
      .setAlert({
        content: "yuyuyuy"
      });
  },
  _openContextMenu(button, e) {
    this._menu.open({
      event: e
    });
  },
  //@@viewOff:private
  _openCreateBoatRoute() {
    UU5.Environment.setRoute("boatDetail");
  },
  // _allowLeaving() {
  //   UU5.Environment.getRouter().allowPageLeave();
  // },
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
                  <UU5.Bricks.LanguageSelector displayedLanguages={["en", "cz"]} />
                  <UU5.Bricks.Button colorSchema="green" onClick={this._openCreateBoatRoute}>
                    <UU5.Bricks.Icon icon="mdi-plus" />
                    Create
                  </UU5.Bricks.Button>
                  {/*<UU5.Bricks.Header*/}
                  {/*  tooltip={this.getLsiValue("jokesListHeader")}*/}
                  {/*  content={this.getLsiComponent("jokesListHeader")}*/}
                  {/*  level={3}*/}
                  {/*  colorSchema="pink"*/}
                  {/*/>*/}
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

export default Pier;
