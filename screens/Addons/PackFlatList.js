import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {View,FlatList} from 'react-native'
import PackListRow from './listrow/PackListRow'

export default class PackFlatList extends PureComponent {
    static propTypes = {
        prop: PropTypes.object
    }

    render() {
        return (
            <View>
                <FlatList
                data={this.props.data}
                renderItem={({item}) => <PackListRow item={item} /> }
                keyExtractor={item => (item.id).toString()}
                removeClippedSubviews={true} // Unmount components when outside of window 
                initialNumToRender={5} // Reduce initial render amount
                maxToRenderPerBatch={1} // Reduce number in each render batch
                maxToRenderPerBatch={100} // Increase time between renders
                windowSize={7} // Reduce the window size
                />
            </View>
        )
    }
}

