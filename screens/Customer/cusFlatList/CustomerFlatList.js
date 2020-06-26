import React, { PureComponent,Component } from 'react'
import PropTypes from 'prop-types'
import {View,FlatList,RefreshControl} from 'react-native'
import CustomerRow from '../listrows/CustomerRow'

export default class PackFlatList extends PureComponent {
    static propTypes = {
        prop: PropTypes.object
    }

 
    render() {
        return (
            <View>
                <FlatList
                shouldItemUpdate={(props,nextProps)=>
                    { 
                      return props.item!==nextProps.item
                        
                     }  }
                data={this.props.data}
                renderItem={({item}) => <CustomerRow item={item} navigation={this.props.navigation} /> }
                keyExtractor={item => (item.id).toString()}
                refreshControl={
                    <RefreshControl refreshing={this.props.refreshing} 
                    onRefresh={this.props.onRefresh} />
                  }
                ListFooterComponent={() => <View style={{marginBottom:200}}></View>}

                removeClippedSubviews={true} // Unmount components when outside of window 
                initialNumToRender={4} // Reduce initial render amount
                maxToRenderPerBatch={1} // Reduce number in each render batch
                maxToRenderPerBatch={100} // Increase time between renders
                windowSize={8} // Reduce the window size

                />
            </View>
        )
    }
}

