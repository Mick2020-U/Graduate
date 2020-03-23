//@@viewOn:imports
import * as UU5 from "uu5g04";
import "uu5g04-bricks";
import Plus4U5 from "uu_plus4u5g01";
import "uu_plus4u5g01-app";
import Config from "./config/config.js";
import Lsi from "../config/lsi.js";
import Tools from "./tools.js";
import LeftLink from "../bricks/left-link.js";
import Calls from "../calls";
import Pier from "../routes/pier";
import PierInfo from "./pier-info";
//@@viewOff:imports
//@viewOff:imports

//@viewOn:static
const goHome = () => {
  UU5.Environment.App.menuRef.update("home");
  UU5.Environment.setRoute("home");
};
const tabHome = () => Tools.openNewTab({ code: "home" });
//@viewOff:static

export const Left = UU5.Common.VisualComponent.create({
  //@@viewOn:mixins
  mixins: [UU5.Common.BaseMixin, UU5.Common.RouteMixin],
  //@@viewOff:mixins

  //@@viewOn:statics
  statics: {
    tagName: Config.TAG + "Left",
    classNames: {
      main: "",
      logo: () => Config.Css.css`border-bottom: 1px solid rgba(0, 0, 0, 0.12);`,
      menu: () => Config.Css.css`border-bottom: 1px solid rgba(0, 0, 0, 0.12);`
    },
    lsi: Lsi.leftLinks
  },
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    identity: UU5.PropTypes.shape()
  },
  //@@viewOff:propTypes

  //@@viewOn:getDefaultProps
  getDefaultProps() {
    return {
      identity: null
    };
  },
  //@@viewOff:getDefaultProps

  //@@viewOn:reactLifeCycle
  //@@viewOff:reactLifeCycle

  //@@viewOn:interface
  //@@viewOff:interface

  //@@viewOn:overriding
  //@@viewOff:overriding

  //@@viewOn:private
  _getItems() {
    return [{ code: "home", content: this.getLsiComponent("home") }];
  },
  //@@viewOff:private
  //@@viewOn:interface

  //@@viewOff:interface
  //@@viewOn:private
  _onItemClick(item, e) {
    Tools.setRoute(item);
  },
  //@@viewOff:private

  //@@viewOn:render
  render() {
    return (
      <UU5.Bricks.Div {...this.getMainPropsToPass()}>
        <UU5.Common.ListDataManager onLoad={Calls.pierList}>
          {({ viewState, errorState, errorData, data, handleLoad }) => {
            if (errorState) {
              // error
              return "Error";
            } else if (data) {
              // ready
              return (
                <UU5.Common.Fragment>
                  <UU5.Bricks.Div {...this.getMainPropsToPass()}>
                    <UU5.Bricks.Div className={this.getClassName("logo")}>
                      <UU5.Bricks.Link onClick={goHome} onWheelClick={tabHome} onCtrlClick={tabHome}>
                        <UU5.Bricks.Image name="Logo" responsive src="assets/logo.png" />
                      </UU5.Bricks.Link>
                    </UU5.Bricks.Div>

                    <Plus4U5.App.Menu
                      ref_={ref => (UU5.Environment.App.menuRef = ref)}
                      className={this.getClassName("menu")}
                      items={this._getItems()}
                      onClick={this._onItemClick}
                      onWheelClick={Tools.openNewTab}
                      onCtrlClick={Tools.openNewTab}
                    />
                    <LeftLink route="about">{this.getLsiComponent("about")}</LeftLink>
                    <LeftLink route="port">{this.getLsiComponent("port")}</LeftLink>
                    {data[0] &&<LeftLink key={data[0].id}>
                      <UU5.Bricks.Link
                        key={data[0].id}
                        content={data[0].code}
                        onClick={() => {
                          UU5.Environment.setRoute({
                            component: <PierInfo data={data[0]} />,
                            url: { useCase: "pierInfo", parameters: { id: data[0].id } }
                          });
                        }}
                      />
                    </LeftLink>}
                    {/*{data.map(item => (
                      <LeftLink key={item.id} >
                        <UU5.Bricks.Link
                          key={item.id}
                          content={item.code}
                          onClick={() => {
                            UU5.Environment.setRoute({
                              component: <PierInfo data={item} />,
                              url: { useCase: "pierInfo", parameters: { id: item.id } }
                            });
                          }}
                        />
                      </LeftLink>
                    ))}*/}
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

export default Left;
