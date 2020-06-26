import React, { useContext,useEffect, useState } from 'react'
import {View,StyleSheet,Text,SafeAreaView} from 'react-native'
import { MainContext } from '../Context/MainContext';
import {FAB} from 'react-native-paper'
import ChannelFlatList from './ChannelFlatList';
import AsyncStorage from '@react-native-community/async-storage'



function ChannelListScreen({navigation}) {
    const mainContext = useContext(MainContext);
    const {getChannelsList,channellist,setChannels} = mainContext;


    const _retrieveChannels = async () => {
     
      try {
        const value = await AsyncStorage.getItem('channels');
        if (value !== null) {

          setChannels(JSON.parse(value))
        }else{
          getChannelsList()
        }
      } catch (error) {
        // Error retrieving data
      }
    };

    const _removeData = async () => {
      try {
        await AsyncStorage.removeItem('channels')
        console.log("deleted successfully")
        
      } catch (error) {
        
      }
    }
    useEffect(() =>{
        _retrieveChannels()
        // _removeData()
        
  },[])

    
    return (
      <SafeAreaView style={styles.container}>
        <View style={{height:'100%'}}>
        <View style={{marginTop:20,marginBottom:10}}>
        <Text style={{color:'white',fontSize:23,textAlign:'center'}}>Total Channels : {channellist.length} </Text>
        </View>
        <View style={styles.floatView}>
            <FAB
            style={styles.fab}
              large
              label="Add Channels"
              icon="monitor"
              onPress={() => console.log('Pressed')}
            />
        </View>


        <ChannelFlatList data={channellist} />

        </View>
        

      </SafeAreaView>
    );
}

export default ChannelListScreen


const styles = StyleSheet.create({
  floatView:{
    zIndex:1,
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  fab: {
    
    backgroundColor:'#8e2de2'
  },
  container: {
    flex: 1,
    backgroundColor:'#7F00FF'
  },
  item: {
      flexDirection:'row',
      justifyContent:'flex-start',
      alignItems:'center',
      backgroundColor: 'white',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
      backgroundColor: "white",
      shadowColor: "#000",
      shadowOffset: {
      width: 0,
      height: 6,
      },
      shadowOpacity: 0.37,
      shadowRadius: 7.49,
      elevation: 5,
      borderRadius: 20,
  },
  title: {
      fontSize: 22,
      paddingBottom:5,
      width:260
  },
  price:{
    fontSize:20,
    color:'red'
  }
  });