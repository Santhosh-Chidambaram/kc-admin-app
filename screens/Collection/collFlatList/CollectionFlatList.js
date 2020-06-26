import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {View,FlatList,StyleSheet} from 'react-native'
import CollectionRow from '../collrow/CollectionRow'

export default class CollectionFlatList extends PureComponent {
    static propTypes = {
        prop: PropTypes.object
    }
    RenderFooter = () =>{
        return(
          <View style={styles.footer}>
                  
            </View>
        )
      }

    render() {
        return (
            <View>
                <FlatList
                data={this.props.data}
                initialNumToRender={20}
                renderItem={({item}) => <CollectionRow  item={item} navigation={this.props.navigation} />} 
                keyExtractor={item => (item.id).toString()}
                ListFooterComponent={this.RenderFooter}
                removeClippedSubviews={true} // Unmount components when outside of window 
                initialNumToRender={2} // Reduce initial render amount
                maxToRenderPerBatch={1} // Reduce number in each render batch
                maxToRenderPerBatch={100} // Increase time between renders
                windowSize={7} // Reduce the window size
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({

    footer: {
        marginTop:5,
        marginBottom:125,
    },
  
  });
  