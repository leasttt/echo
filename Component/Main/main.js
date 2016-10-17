/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  Platform,
  Navigator,
  View
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import Home from '../Home/home';
import Shop from '../Shop/shop';
import Mine from '../Mine/mine';
import More from '../More/more';
export default class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'home'  //默认选中主页
    }
  }

  render() {
    return (
      <TabNavigator>

        {this.renderTabBarIten('首页','icon_tabbar_homepage','icon_tabbar_homepage_selected','home','首页',Home)}

        {this.renderTabBarIten('商家','icon_tabbar_merchant_normal','icon_tabbar_merchant_selected','shop','商家',Shop)}


        {this.renderTabBarIten('我的','icon_tabbar_mine','icon_tabbar_mine_selected','mine','我的',Mine)}

        {this.renderTabBarIten('更多','icon_tabbar_misc','icon_tabbar_misc_selected','more','更多',More)}

        
      </TabNavigator>
    );
  }

  renderTabBarIten(title,icon_name,icon_name_selected,selectedTab,componentName,Component){
    return (
      <TabNavigator.Item

          title={title}
          renderIcon={() => <Image source={{ uri: icon_name }} style={styles.iconStyle} />}
          renderSelectedIcon={() => <Image source={{ uri: icon_name_selected }} style={styles.iconStyle} />}
          selected={this.state.selectedTab === selectedTab}
          onPress={() => this.setState({ selectedTab: selectedTab }) }
          selectedTitleStyle={styles.selectedTitleStyle}
          
          >

          <Navigator
            initialRoute={{ name: componentName, component: Component }}
            //配置场景
            configureScene=
            {
              (route) => {

                //这个是页面之间跳转时候的动画，具体有哪些？可以看这个目录下，
                //有源代码的: node_modules/react-native/Libraries/CustomComponents/Navigator/NavigatorSceneConfigs.js

                // return Navigator.SceneConfigs.PushFromRight;
                return ({
                  ...Navigator.SceneConfigs.PushFromRight,
                  // gestures: null,
                });
              }
            }
            renderScene={
              (route, navigator) => {
                let Component = route.component;
                return <Component {...route.params} navigator={navigator} />
              }
            } />

        </TabNavigator.Item>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  iconStyle: {
    width: Platform.OS === 'ios' ? 30 : 25,
    height: Platform.OS === 'ios' ? 30 : 25
  },
  selectedTitleStyle:{
    color:'red'
  }

});


