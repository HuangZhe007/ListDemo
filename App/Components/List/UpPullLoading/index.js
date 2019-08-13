import React from "react";
import {
  Animated,
  View,
  StyleSheet,
  Text
} from "react-native";
import arrow from './arrow.png'
import { Colors } from "../../../Themes";
import Spinner from "react-native-spinkit";
import { RefreshHeader } from "react-native-spring-scrollview/RefreshHeader";
export default class UpPullLoading extends RefreshHeader {
  static height = 80;

  static style = "stickyContent";

  render() {
    return (
      <View style={styles.container}>
        {this._renderIcon()}
        {this._renderText()}
      </View>
    );
  }
  _renderText = _ => {
    const s = this.state.status;
    if (s === 'refreshing') {
      return (
        <View />
      )
    } else {
      return (
        <View style={styles.rContainer}>
          <Text style={styles.text}>
            {this.getTitle()}
          </Text>
        </View>
      )
    }
  }
  _renderIcon = _ => {
    const s = this.state.status;
    if (s === "refreshing") {
      return <Spinner size={36} type="9CubeGrid" color={Colors.Subject} style={{ alignSelf: 'center' }} />
    }
    const { maxHeight, offset } = this.props;
    return (
      <Animated.Image
        source={arrow}
        style={{
          tintColor: Colors.Subject,
          transform: [
            {
              rotate: offset.interpolate({
                inputRange: [-maxHeight - 1 - 10, -maxHeight - 10, -50, -49],
                outputRange: ["180deg", "180deg", "0deg", "0deg"]
              })
            }
          ]
        }}
      />
    );
  }

  getTitle() {
    const s = this.state.status;
    switch (s) {
      case "pulling":
        return "下拉刷新"
      case "waiting":
        return "下拉刷新"
      case "pullingEnough":
        return "松开刷新"
      case "refreshing":
        return "请稍等..."
      case "pullingCancel":
        return "放弃刷新"
      case "rebound":
        return "刷新完成"
      default:
        break;
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  },
  rContainer: {
    marginLeft: 10
  },
  text: {
    marginVertical: 5,
    fontSize: 15,
    color: Colors.Subject,
  }
});