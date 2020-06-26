import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {View,FlatList} from 'react-native'
import ChannelListRow from './listrow/ChannelListRow'

export default class ChannelFlatList extends PureComponent {
    static propTypes = {
        prop: PropTypes.object
    }

    render() {
        return (
            <View>
                {
                    this.props.data != null
                    ?
                    <FlatList
                    data={this.props.data}
                    renderItem={({item}) => <ChannelListRow item={item} /> }
                    keyExtractor={item => item.id.toString()}
                    // Performance settings

                    removeClippedSubviews={true} // Unmount components when outside of window 
                    initialNumToRender={5} // Reduce initial render amount
                    maxToRenderPerBatch={1} // Reduce number in each render batch
                    maxToRenderPerBatch={100} // Increase time between renders
                    windowSize={7} // Reduce the window size

                />
                :
                null
                }
            </View>
        )
    }
}

