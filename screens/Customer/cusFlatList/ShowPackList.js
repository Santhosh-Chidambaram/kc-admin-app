import React, { PureComponent } from 'react'
import {View,Text,FlatList} from 'react-native'
import CustomerPackRow from '../listrows/CustomerPackRow'
import PropTypes from 'prop-types'

export default class ShowPackList extends PureComponent {
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
                renderItem={({item}) => <CustomerPackRow item={item} />}
                keyExtractor={item => item.id.toString()}
                ListFooterComponent={() => <View style={{marginBottom:80}}></View>}
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