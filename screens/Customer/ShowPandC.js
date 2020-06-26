import React from 'react'
import {View,Text,ScrollView,SafeAreaView } from 'react-native'
import ShowPackList from './cusFlatList/ShowPackList'
import ShowChannelList from './cusFlatList/ShowChannelList'
import {Title} from 'react-native-paper'
function ShowPandC({route,navigation}) {
    const {packages} = route.params;
    const {channels} = route.params;
    const pack = [...packages,...channels]
    return (
        <SafeAreaView style={{flex:1,backgroundColor:'#7F00FF'}}>
        <View >
            <View style={{marginTop:20}}>
                <Text style={{textAlign:'center',fontSize:22,color:'white'}}>Total :{pack.length} </Text>
                {packages != '' || channels != '' ?
                <ShowPackList data={pack}/>
                :
                <Title style={{textAlign:'center',color:'white',marginTop:40}}>No Packages</Title>}
                
            </View>
            
        </View>
        </SafeAreaView>
    )
}

export default ShowPandC
