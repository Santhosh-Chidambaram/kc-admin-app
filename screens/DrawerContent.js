import React, { useState } from 'react'
import {View,StyleSheet,BackHandler} from 'react-native';
import {Drawer,Text} from 'react-native-paper'
import {DrawerContentScrollView,DrawerItem} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import FIcon from 'react-native-vector-icons/FontAwesome'
import FAcon from 'react-native-vector-icons/FontAwesome5'


export default function DrawerContent(props){
    const [active,setActive] = useState('first')
    return(
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
                <View>
                    <View style={styles.header}>
                        <FAcon name="satellite-dish" color="white" size={25}/>
                        <Text style={styles.headerText}>Kumars Cable</Text>
                    </View>
                    
                    
                    
                    <View>
                    <Drawer.Section>
                    <Drawer.Item 
                    active={active == 'first'}
                    icon={() => <Icon name="home" size={35} color="purple"/>}
                    label="Home"
                    onPress={() => {
                        props.navigation.navigate('Home')
                        setActive('first')}
                }
                    />
                    <Drawer.Item
                    active={active == '2'} 
                    icon={() => <Icon name="set-top-box" size={35} color="purple"/>}
                    label="Setupbox"
                    onPress={() => {props.navigation.navigate('Setupbox')
                                     setActive('2')               }}
                    />
                    <Drawer.Item 
                    active={active == '3'}
                    icon={() => <FIcon name="rupee" size={35} color="purple"/>}
                    label="Daily Collections"
                    onPress={() => {props.navigation.navigate('Daily Collections')
                    setActive('3')
                }}
                    />
                    {/* <Drawer.Item 
                    active={active == '4'}
                    icon={() => <FIcon name="files-o" size={35} color="purple"/>}
                    label="Payment Reports"
                    onPress={() => {
                        setActive('4')
                        props.navigation.navigate('Payment Report')

                    }}
                    />
                    <DrawerItem 
                    icon={() => <Icon name="package" size={35} color="purple"/>}
                    label="Packages"
                    
                    /> */}
                </Drawer.Section>

                    </View>
                   
                </View>
                
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem
                icon={() => <Icon name='exit-to-app' color='red' size={28}/>}
                label='Exit App'
                onPress={() => BackHandler.exitApp()}
                />
            </Drawer.Section>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        color:'blue'
    },
    header:{
        backgroundColor:'#8e2de2',
        flex:1,
        flexDirection:'row',
        height:50,
        justifyContent:'flex-start',
        alignItems:'center',
        paddingLeft:25,



    },
    headerText:{
        paddingLeft:10,
        fontSize:18,
        color:'#fafafa',


    },
    drawerItem:{
        color:'black',
        fontSize:14,

    },
 
    bottomDrawerSection:{
        borderTopWidth:1,
        borderTopColor:'rgb(226, 226, 226)',
        
    }
})