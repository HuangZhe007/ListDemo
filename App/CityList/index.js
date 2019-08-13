import React, { Component, Fragment } from 'react'
import {
	View,
	Text,
	Image,
	FlatList, TouchableOpacity,
} from 'react-native'
import { Colors, Styles, Px } from '../Themes'
import List from '../Components/List'
import styles from './Styles'
import cityIndex from './Config/cityIndex'
import hotCities from './Config/hotCities'
import alphabeticalIndex from './Config/alphabeticalIndex'
import location from './Images/location.png'
import close from './Images/Close.png'
import Header from '../Components/Header';
import PropTypes from 'prop-types'
const Section_Height = Px(87)
const Index_Height = Px(80)
const HotHeight = Px(402)
export default class CityList extends Component {
	static propTypes = {
		ChoosingCity: PropTypes.func,
		closeModal: PropTypes.func,
	}
	constructor(props) {
		super(props)
	}
	_renderSection = (index) => {
		const contact = cityIndex[index];
		return (
			<View style={styles.SectionBox}>
				<Text style={styles.SectionText}>{contact.sortLetters}</Text>
			</View>
		)
	}
	_renderItem = ({ section: section, row: row }) => {
		const item = cityIndex[section].items[row];
		return (
			<TouchableOpacity style={styles.ItemBox}
			// onPress={() => this.props.ChoosingCity(item.name)}
			>
				<Text style={styles.ItemTetx}>{item.name}</Text>
				<View style={styles.border} />
			</TouchableOpacity>
		)
	}
	_flatItem = ({ item, index }) => {
		return (
			<TouchableOpacity style={styles.flatItemBox}
			// onPress={() => this.props.ChoosingCity(item.name)}
			>
				<Text style={styles.ItemTetx} >{item.name}</Text>
			</TouchableOpacity>
		)
	}
	LocatingCity = _ => {
		return (
			<View>
				<View style={styles.SectionBox}>
					<Text style={styles.SectionText}>当前定位城市</Text>
				</View>
				<View style={[styles.flatItemBox, styles.LocatingBox]}>
					<Image style={styles.ImageStyles} source={location} />
					<Text style={[styles.ItemTetx, { color: Colors.white }]} >北京市</Text>
				</View>
			</View>
		)
	}
	_renderHeader = _ => {
		return (
			<View>
				{this.LocatingCity()}
				<View style={styles.SectionBox}>
					<Text style={styles.SectionText}>{hotCities.sortLetters}</Text>
				</View>
				<View style={styles.FlatBox}>
					<FlatList
						numColumns={3}
						data={hotCities.items}
						renderItem={this._flatItem}
						keyExtractor={(item, index) => `item${index}`}
					/>
				</View>
			</View>

		)
	}
	_LeftComponent = _ => {
		return (
			<TouchableOpacity
			// onPress={this.props.closeModal}
			>
				<Image source={close} style={Styles.closeStyle} />
			</TouchableOpacity>
		)
	}
	_UpPullRefresh = _ => {
		this._list.endUpPullRefresh()
	}
	render() {
		return (
			<Fragment>
				<Header
					title={'选择城市'}
					headerBgColor={Colors.Subject}
					titleColor={Colors.white}
					LeftComponent={this._LeftComponent} >
				</Header>
				<View style={styles.Box}>
					<List
						showHeader={true}
						dataArray={cityIndex}
						HeaderHeight={HotHeight}
						Index_Height={Index_Height}
						renderItem={this._renderItem}
						indexArray={alphabeticalIndex}
						ref={ref => (this._list = ref)}
						Section_Height={Section_Height}
						renderHeader={this._renderHeader}
						UpPullRefresh={this._UpPullRefresh}
						renderSection={this._renderSection}
						showHeaderStyle={styles.showHeaderStyle}
						showHeaderBoxStyle={styles.showHeaderBoxStyle}
					/>
				</View>
			</Fragment>
		)
	}
}
