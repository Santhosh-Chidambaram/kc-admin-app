import React, { useContext,useEffect, useState, } from 'react'
import {View,Text,StyleSheet,SafeAreaView} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { MainContext } from '../Context/MainContext';
import {FAB} from 'react-native-paper'
import PackFlatList from './PackFlatList';






function PackageListScreen() {
    const mainContext = useContext(MainContext);
    
    const {getPackagesList,packagelist,setPackages} = mainContext;




    const _retrieveData = async () => {
      try {
        const value = await AsyncStorage.getItem('packages');
        if (value !== null) {
          // We have data!!
          
          setPackages(JSON.parse(value))
        }else{
          getPackagesList()
        }
      } catch (error) {
        // Error retrieving data
      }
    };

    const _removeData = async () => {
      try {
        await AsyncStorage.removeItem('packages')
        console.log("deleted successfully")
        
      } catch (error) {
        
      }
    }

    useEffect(() =>{
        _retrieveData()
       
    },[])

    return (
      <SafeAreaView style={styles.container}>
        
        <View style={{height:'100%'}}>
        <View style={{marginTop:20,marginBottom:10}}>
        <Text style={{color:'white',fontSize:23,textAlign:'center'}}>Total Packages :  {packagelist.length}</Text>
        </View>
          <View style={styles.floatView}>
              <FAB
              style={styles.fab}
                large
                label="Add Packages"
                icon="cart"
                onPress={() => console.log('Pressed')}
              />
          </View>

        <PackFlatList data={packagelist}/>

        </View>
       
            
      </SafeAreaView>
    );
}

export default PackageListScreen


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
      backgroundColor:'#7F00FF',
      height:'100%'
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
        fontSize: 20,
        paddingTop:18,
        paddingBottom:5,
        width:260
    },
    price:{
      fontSize:22,
      color:'red'
    }
  });
