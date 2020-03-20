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
      main: (props, state) => Config.Css.css``
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
  //@@viewOff:private

  //@@viewOn:render
  render() {
    return (
      <UU5.Bricks.Div {...this.getMainPropsToPass()}>
        <UU5.Common.ListDataManager onLoad={Calls.pierList} onDelete={Calls.deletePier}>
          {({ viewState, errorState, errorData, data, handleCreate, handleLoad, handleDelete }) => {
            if (errorState) {
              // error
              return <UU5.Bricks.Error errorData={errorData} />;
            } else if (data) {
              // console.log(data);
              // ready
              return (
                <UU5.Bricks.Resize>
                  <UU5.Bricks.LanguageSelector displayedLanguages={["en", "cz"]} />
                  <UU5.Bricks.Row display="flex">
                    {data.map(item => (
                      <UU5.Common.Fragment key={UU5.Common.Tools.generateUUID(8)}>
                        <UU5.Bricks.Column
                          style={{
                            position: "relative"
                          }}
                        >
                          <UU5.Bricks.Button
                            style={{
                              position: "absolute",
                              background: "#f08080",
                              right: "67%",
                              top: "2%"
                            }}
                            content="&times;"
                            onClick={() => {
                              handleDelete(item.id).then(res => {
                                console.log(res, "delete");
                              });
                            }}
                          >
                            Delete
                          </UU5.Bricks.Button>
                          <Pier item={item} key={item.id} />
                        </UU5.Bricks.Column>
                      </UU5.Common.Fragment>
                    ))}
                  </UU5.Bricks.Row>
                </UU5.Bricks.Resize>
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

export default Port;
