import React, { useState } from 'react'
import {View,StyleSheet,BackHandler,Image} from 'react-native';
import {Drawer,Text} from 'react-native-paper'
import {DrawerContentScrollView,DrawerItem} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import FIcon from 'react-native-vector-icons/FontAwesome'
import Logo from '../../assets/ic_launcher.png'

export default function DrawerContent(props){
    const [active,setActive] = useState('first')
    return(
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
                <View>
                    <View style={styles.header}>
                    <Image source={Logo} style={{height:140,width:140}} />
                    </View>
                    
                    
                    
                    <View>
                    <Drawer.Section>
                    <Drawer.Item 
                    active={active == 'first'}
                    icon={() => <Icon name="home" size={35} color="#8e2de2"/>}
                    label="Home"
                    
                    onPress={() => {
                        props.navigation.navigate('Home')
                        setActive('first')}
                }
                    
                    />
                    
                    <Drawer.Item 
                    active={active == '3'}
                    icon={() => <FIcon name="rupee" size={30} color="#8e2de2" style={{paddingRight:15}}/>}
                    label="Daily Collections"
                    onPress={() => {props.navigation.navigate('Daily Collections')
                    setActive('3')
                }}
                    />
                   <DrawerItem
                   active={active == '4'} 
                    icon={() => <Icon name="cart" size={30} color="#8e2de2"/>}
                    label="Packages"
                    onPress={() => {props.navigation.navigate('Packages')
                    setActive('4')
                }}
                    
                    /> 
                    <DrawerItem 
                    active={active == '5'}
                    icon={() => <Icon name="monitor" size={30} color="#8e2de2"/>}
                    label="Channels"
                    onPress={() => {props.navigation.navigate('Channels')
                    setActive('5')
                }}
                    
                    /> 
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
        backgroundColor:'#7F00FF',
        flex:1,
        flexDirection:'row',
        height:150,
        justifyContent:'center',
        alignItems:'center',
       



    },
    headerText:{
        paddingLeft:10,
        fontSize:16,
        color:'#fafafa',


    },
    drawerItem:{
        color:'black',
        fontSize:20,
        

    },
 
    bottomDrawerSection:{
        borderTopWidth:1,
        borderTopColor:'rgb(226, 226, 226)',
        
    }
})