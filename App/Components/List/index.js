import React, { Component } from 'react'
import {
    View,
    Text,
    Dimensions,
    FlatList,
    TouchableOpacity,
    ViewPropTypes,
} from 'react-native'
import styles from './Styles'
import PropTypes from 'prop-types'
let screenH = Dimensions.get('window').height;
import UpPullLoading from './UpPullLoading'
import { LargeList } from "react-native-largelist-v3";
export default class List extends Component {
    static propTypes = {
        UpPullRefresh: PropTypes.func,              //是否展示下拉刷新，下拉刷新的回调
        showHeader: PropTypes.bool,                 //是否展示头部组件
        renderHeader: PropTypes.func,               //头部组件
        renderSection: PropTypes.func,              //分組頭组建
        renderItem: PropTypes.func,                 //分組每一項组件
        ItemBoxStyle: ViewPropTypes.style,          //导航容器样式
        showHeaderBoxStyle: ViewPropTypes.style,    //导航第一个容器额外样式
        showHeaderStyle: PropTypes.object,          //导航第一个Text的额外样式
        flatBoxStyle: ViewPropTypes.style,          //導航List的样式
        letterStyle: PropTypes.object,              //導航每一個Text的样式
        indexArray: PropTypes.array,                //导航數組，有则展示右侧导航
        dataArray: PropTypes.array.isRequired,      //数据源数组
        HeaderHeight: PropTypes.number,             //头部高度
        Section_Height: PropTypes.number.isRequired,//分組組頭的高度
        Index_Height: PropTypes.number.isRequired,  //分組每一項的高度
    }
    componentWillUnmount() {
        this.timer && clearTimeout(this.timer)
    }
    static defaultProps = {
        showHeader: false                           //默认不展示头部
    };
    constructor(props) {
        super(props)
    }
    getOfset = (key) => {
        const { dataArray, Index_Height, Section_Height, HeaderHeight, showHeader } = this.props
        let [hKey, itemkey, sectionKey, hot_height] = [key, 0, 0, 0]
        if (showHeader) {
            if (key > 0) hKey = key - 1
            hot_height = key ? HeaderHeight : 0
        }
        for (i = 0; i < hKey; i++) {
            for (index = 0, len = dataArray[i].items.length; index < len; index++) {
                itemkey++
            }
            sectionKey++
        }
        return (itemkey * Index_Height + sectionKey * Section_Height) + hot_height
    }
    _onSectionselect = (value, key) => {
        const ofset = this.getOfset(key)
        if (this._LargeList) {
            this._LargeList.scrollTo({
                x: 0, y: ofset
            });
        }
    };
    _renderFooter = () => {
        return (
            <View style={{ height: 10 }} />
        )
    }
    _FlatItem = ({ item, index }) => {
        const { ItemBoxStyle, letterStyle, showHeaderBoxStyle, showHeaderStyle } = this.props
        const hot = index == 0
        return (
            <TouchableOpacity style={[styles.TextBox, ItemBoxStyle, hot && showHeaderBoxStyle]}
                onPressIn={({ nativeEvent: e }) => this._onSectionselect(e, index)}>
                <Text style={[styles.indexText, letterStyle, hot && showHeaderStyle,]}>
                    {item}
                </Text>
            </TouchableOpacity>
        )
    }
    endUpPullRefresh = _ => {
        this.timer = setTimeout(() => {
            if (this._LargeList)
                this._LargeList.endRefresh();
        }, 1000);
    }
    render() {
        const { indexArray, dataArray, Section_Height, Index_Height, showHeader, renderItem,
            UpPullRefresh, renderSection, renderHeader } = this.props
        const top_offset = indexArray ? (screenH - indexArray.length * 15) / 3 : 0
        return (
            <View style={styles.Box}>
                <LargeList
                    renderIndexPath={renderItem}
                    refreshHeader={UpPullLoading}
                    data={dataArray ? dataArray : []}
                    renderFooter={this._renderFooter}
                    ref={ref => (this._LargeList = ref)}
                    renderHeader={showHeader ? renderHeader : () => null}
                    onRefresh={UpPullRefresh ? UpPullRefresh : () => null}
                    renderSection={renderSection ? renderSection : () => null}
                    heightForSection={Section_Height ? () => Section_Height : () => 0}
                    heightForIndexPath={Index_Height ? () => Index_Height : () => 50}
                />
                {
                    indexArray &&
                    <View style={[styles.flatBox, {
                        top: top_offset
                    }, this.props.flatBoxStyle]}>
                        <FlatList
                            data={indexArray}
                            renderItem={this._FlatItem}
                            keyExtractor={(item, index) => index.toString()}       //不重复的key
                            initialNumToRender={indexArray ? indexArray.length : 10}
                        />
                    </View>
                }
            </View >
        )
    }
}
