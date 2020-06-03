
import * as React from 'react';
import {  Text, View } from 'react-native';
//Icons Imports
import Icon from 'react-native-vector-icons/FontAwesome'
import EIcon from 'react-native-vector-icons/Entypo'
import Ionicon from 'react-native-vector-icons/Ionicons'
//Navigators Imports
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {createDrawerNavigator} from '@react-navigation/drawer'
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs'

//Screens Imports
import HomeScreen from './screens/HomeScreen'
import SearchScreen from './screens/SearchScreen'
import CollectionScreen from './screens/CollectionScreen'
import CustomerScreen from './screens/CustomerScreen'
import SetupboxScreen from './screens/SetupboxScreen'
import CollectPaymentScreen from './screens/CollectPaymentScreen'
import CollectedCustomerScreen from './screens/CollectedCustomerScreen'
import PaymentDetailScreen from './screens/PaymentDetailScreen';

//Create Navigators
const SideDrawer = createDrawerNavigator()
const HomeStack = createStackNavigator()
const SearchStack = createStackNavigator()
const CustomerStack = createStackNavigator()
const CollectionStack = createStackNavigator()
const CollectPaymentStack = createStackNavigator()
const SetupboxStack = createStackNavigator()
const BottomTab = createMaterialBottomTabNavigator()
const CollectedCustomerStack = createStackNavigator()
const PaymentDetailStack = createStackNavigator()

//Stack Screens
const HomeStackScreen = ({navigation}) =>(
  <HomeStack.Navigator initialRouteName="Home" 
  screenOptions={{
    headerTitleAlign:'center',
    headerStyle:{
      backgroundColor:'#8e2de2',
      
    },
    headerTitleStyle:{
        color:'#fafafa',

 
    },
    headerLeft:() =>(
      <Ionicon name="ios-menu" size={30} color="white" onPress={() => {
        navigation.openDrawer()
      }} 
      style={{paddingLeft:20}}/>
    )
  }}>
    <HomeStack.Screen name='Home' component={HomeScreen} options={{title:"Dashboard"}}/>
    <HomeStack.Screen name='Setupbox' component={SetupboxScreen}/>
    <HomeStack.Screen name='Payment Customers' component={PaymentDetailScreen}/>
    <HomeStack.Screen name='Daily Collections' component={CollectedCustomerScreen}/>
    
  </HomeStack.Navigator>
)

const SearchStackScreen = ({navigation}) =>(
  <SearchStack.Navigator initialRouteName="Search"
  screenOptions={{
    headerTitleAlign:'center',
    headerStyle:{
        backgroundColor:'#4364F7',
        
    },
    headerTitleStyle:{
        color:"#fafafa",


    },
    headerLeft:() =>(
      <Ionicon name="ios-menu" size={30} color="white" onPress={() => {
        navigation.openDrawer()
      }} 
      style={{paddingLeft:20}}/>
    )
  }}
  >

    <SearchStack.Screen name='Search' component={SearchScreen}/>
    <SearchStack.Screen name='Home' component={HomeScreen}/>
    
  </SearchStack.Navigator>
)

const CustomerStackScreen = ({navigation}) =>(
  <CustomerStack.Navigator 
  screenOptions={{
    headerTitleAlign:'center',
    headerStyle:{
      backgroundColor:'#0072ff',
      
    },
    headerTitleStyle:{
        color:"#fafafa",


    },
    headerLeft:() =>(
      <Ionicon name="ios-menu" size={28} color="black" onPress={() => {
        navigation.openDrawer()
      }} 
      style={{paddingLeft:20}}/>
    )
  }}
  >

    <CustomerStack.Screen name='Customer' component={CustomerScreen}/>
    
  </CustomerStack.Navigator>
)

const CollectionStackScreen = ({navigation}) =>(
  <CollectionStack.Navigator 
  screenOptions={{
    headerTitleAlign:'center',
    headerStyle:{
      backgroundColor:'#00b09b'
    },
    headerTitleStyle:{
      color:'white'
    },
    headerLeft:() =>(
      <Ionicon name="ios-menu" size={28} color="white" onPress={() => {
        navigation.openDrawer()
      }} 
      style={{paddingLeft:20}}/>
    )
  }}
  >

    <CollectionStack.Screen name='Collection' component={CollectionScreen}/>
    
  </CollectionStack.Navigator>
)

const CollectPaymentStackScreen = ({navigation}) =>(
  <CollectPaymentStack.Navigator 
  screenOptions={{
    headerTitleAlign:'center',
    headerStyle:{
        backgroundColor:'#FC466B'
    },
    headerTitleStyle:{
      color:'white',
   
    },
    headerLeft:() =>(
      <Ionicon name="ios-menu" size={28} color="white" onPress={() => {
        navigation.openDrawer()
      }} 
      style={{paddingLeft:20}}/>
    )
  }}
  >

    <CollectPaymentStack.Screen name='Collect Payment' component={CollectPaymentScreen}/>
    
    
  </CollectPaymentStack.Navigator>
)

const SetupboxStackScreen = ({navigation}) =>(
  <SetupboxStack.Navigator 
  screenOptions={{
    headerTitleAlign:'center',
    headerLeft:() =>(
      <Ionicon name="ios-menu" size={28} color="black" onPress={() => {
        navigation.openDrawer()
      }} 
      style={{paddingLeft:20}}/>
    )
  }}
  >

    <SetupboxStack.Screen name='Setupbox' component={SetupboxScreen}/>
    
  </SetupboxStack.Navigator>
)

const CollectedCustomerStackScreen = ({navigation}) =>(
  <CollectedCustomerStack.Navigator 
  screenOptions={{
    headerTitleAlign:'center',
    headerStyle:{
      backgroundColor:'#00b09b'
    },
    headerTitleStyle:{
      color:'white'
    },
    headerLeft:() =>(
      <Ionicon name="ios-menu" size={28} color="white" onPress={() => {
        navigation.openDrawer()
      }} 
      style={{paddingLeft:20}}/>
    )
  }}
  >

    <CollectedCustomerStack.Screen name='Todays Collection' component={CollectedCustomerScreen} />
    
  </CollectedCustomerStack.Navigator>
)

const PaymentDetailStackScreen = ({navigation}) =>(
  <PaymentDetailStack.Navigator
  screenOptions={{
    headerTitleAlign:'center',
    headerLeft:() =>(
      <Ionicon name="ios-menu" size={28} color="black" onPress={() => {
        navigation.openDrawer()
      }} 
      style={{paddingLeft:20}}/>
    )
  }}>
    <PaymentDetailStack.Screen name="Payment Detail" component={PaymentDetailScreen}/>
  </PaymentDetailStack.Navigator>
) 
const BottomTabScreen = () =>(
  <BottomTab.Navigator
  initialRouteName="Home"
  shifting={true}
  activeColor="#fafafa"
  
  style={{ backgroundColor: 'red', }}>

    <BottomTab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <EIcon name="home" color={color} size={28}/>
          ),
          tabBarColor:'#8e2de2'
        }}
      />
      <BottomTab.Screen
        name="Search"
        component={SearchStackScreen}
        options={{
          tabBarLabel: 'Search',
          tabBarColor:'#4364F7',
          tabBarIcon: ({ color }) => (
            <Icon name="search" size={28} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Collection"
        component={CollectPaymentStackScreen}
        options={{
          tabBarLabel: 'Collect Amount',
          tabBarColor:'#FC466B',
          tabBarIcon: ({ color }) => (
            <Icon name="rupee" size={28} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Customer"
        component={CollectionStackScreen}
        options={{
          tabBarLabel: 'Collections',
          tabBarColor:'#00b09b',
          tabBarIcon: ({ color }) => (
            <Icon name="list-ul" size={24} color={color} />
          ),
        }}
      />
      
  </BottomTab.Navigator>
)

//Navigation Container
export default function App(){
  return(
    <NavigationContainer>
      <SideDrawer.Navigator>
        <SideDrawer.Screen name="Home" component={BottomTabScreen}/>
        <SideDrawer.Screen name="Collect Payment" component={CollectPaymentStackScreen}/>
        <SideDrawer.Screen name="Setupbox" component={SetupboxStackScreen}/>
        <SideDrawer.Screen name="Daily Collections" component={CollectedCustomerStackScreen} />

      </SideDrawer.Navigator>

    </NavigationContainer>
  )
}