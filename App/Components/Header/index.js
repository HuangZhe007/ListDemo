import React from 'react'
import { View, StatusBar, Text, ViewPropTypes } from 'react-native'
import PropTypes from 'prop-types'
import styles from './Style'
import { Colors, Px } from '../../Themes';

export default class Header extends React.Component {
    constructor(props) {
        super(props);

    }
    static propsTypes = {
        LeftComponent: PropTypes.element,       // 左边的组件
        RightComponent: PropTypes.element,      // 右边的组件
        titleComponent: PropTypes.element,      // 标题的组件，优先级高，设置此属性，title失效
        title: PropTypes.string,                // 标题
        headerStyle: ViewPropTypes.style,       // 头部样式
        titleStyle: PropTypes.object,           // 标题样式，当设置titleComponent属性以后，此样式失效
        titleColor: PropTypes.string,           // 标题颜色
        headerBgColor: PropTypes.string,        // 头部颜色
        showStatusBar: PropTypes.bool,          // 是否设置状态栏
    }
    static defaultProps = {
        showStatusBar: true                     // 状态栏默认设置
    }
    render() {
        const { LeftComponent, RightComponent, TitleComponent, title, headerStyle,
            titleStyle, headerBgColor, titleColor, showStatusBar } = this.props
        return <View style={[styles.statusBarStyle, !showStatusBar && { paddingTop: 0 }, { backgroundColor: headerBgColor || Colors.white }]}>
            {
                showStatusBar &&
                <StatusBar
                    translucent={true}
                    backgroundColor={'rgba(0,0,0,0)'}
                    barStyle={Colors.white === headerBgColor ? 'dark-content' : 'light-content'} />
            }
            <View style={[styles.headerStyle, { backgroundColor: headerBgColor }, headerStyle]}>
                <View style={styles.leftStyle}>
                    {LeftComponent ? <LeftComponent /> : <View />}
                </View>
                {TitleComponent ? <TitleComponent /> : <Text style={[styles.titleStyle, { color: titleColor }, titleStyle]}>{title}</Text>}
                <View style={styles.rightStyle}>
                    {RightComponent ? <RightComponent /> : <View />}
                </View>
            </View>
        </View>
    }
}