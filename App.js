
import React,{useState,useEffect, createContext, useReducer} from 'react';
import {  ToastAndroid, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Modal,
  Portal,
   Text,
  Provider,ActivityIndicator,Colors,configureFonts, DefaultTheme } from 'react-native-paper';
import MainState from './screens/Context/MainState'
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
import CollectionScreen from './screens/CollectionScreen'
import CustomersScreen from './screens/CustomersScreen'
import CustomerDetailScreen from './screens/CustomerDetailScreen';
import AddCustomerScreen from './screens/AddCustomerScreen'
import SetupboxScreen from './screens/SetupboxScreen'
import CollectPaymentScreen from './screens/CollectPaymentScreen'
import CollectedCustomerScreen from './screens/CollectedCustomerScreen'
import PaymentDetailScreen from './screens/PaymentDetailScreen';
import AuthScreen from './screens/AuthScreen';
import {AuthContext} from './screens/context'
import DrawerContent from './screens/DrawerContent'

//Create Navigators
const SideDrawer = createDrawerNavigator()
const HomeStack = createStackNavigator()
const CustomersStack = createStackNavigator()
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

const CustomersStackScreen = ({navigation}) =>(
  <CustomersStack.Navigator initialRouteName="Search"
  screenOptions={{
    headerTitleAlign:'center',
    headerStyle:{
        backgroundColor:'#4364F7',
        
    },
    headerTitleStyle:{
        color:"#fafafa",


    },
    // headerLeft:() =>(
    //   <Ionicon name="ios-menu" size={30} color="white" onPress={() => {
    //     navigation.openDrawer()
    //   }} 
    //   style={{paddingLeft:20}}/>
    // )
  }}
  >

    <CustomersStack.Screen name='Customers' component={CustomersScreen} options={{title:'Customer Detail',headerShown:false}}/>
    <CustomersStack.Screen name='CustomerDetailScreen' component={CustomerDetailScreen} options={{title:'Customer Detail',headerShown:false}}/>
    <CustomersStack.Screen name='AddCustomerScreen' component={AddCustomerScreen} options={{title:'Add Customer',headerShown:false}}/>
    
  </CustomersStack.Navigator>
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
            <EIcon name="home" color={color} size={26}/>
          ),
          tabBarColor:'#8e2de2'
        }}
      />
      <BottomTab.Screen
        name="Search"
        component={CustomersStackScreen}
        options={{
          tabBarLabel: 'Customers',
          tabBarColor:DefaultTheme.colors.primary,
          tabBarIcon: ({ color }) => (
            <Icon name="user" size={28} color={color} />
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

//App Context 
const fontConfig = {
  default: {
    regular: {
      fontFamily: 'sans-serif',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'sans-serif-medium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'sans-serif-light',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'sans-serif-thin',
      fontWeight: 'normal',
    },
  },
};

const theme = {
  ...DefaultTheme,
  fonts: configureFonts(fontConfig),
};






//Navigation Container
export default function App(){


  //states
  const [authtoken,setAuthToken] = React.useState("")
  const [visible,setVisible] = useState(false)
  const [unpaid,setUnpaid] = useState(false)
  const _showModal = () => setVisible(true);
  const  _hideModal = () => setVisible(false);
  
  async function  retrieveToken() {
  try {
    let token = await AsyncStorage.getItem("usertoken");

    if(token){
      setTimeout(() =>{
        _showModal()
      },1000)
      
      setTimeout(() =>{
        setAuthToken(token)
        _hideModal()
      },3000)
      
    }
    
  } catch (error) {
    console.log("Something went wrong", error);
  }
}

  
const AutoLoginModal = () => (

  <Portal>
    <View style={{
     flex:1,
     alignItems:'center',
     justifyContent:'center',
     
     
 }}>
    <Modal visible={visible} onDismiss={_hideModal}
    contentContainerStyle={{
      backgroundColor:'white',
      justifyContent:'center',
      alignItems:'center',
      height:100,
      width:300,
      borderRadius:20,
      marginLeft:'13%'
    }}
    >  
      <ActivityIndicator animating={true} color={Colors.red800} size={40} />
      <Text style={{paddingTop:5,fontSize:18,color:'purple'}}>Please wait user auto logging in</Text>
    </Modal>

    </View>
    
  </Portal>

)

    useEffect(() =>{
      retrieveToken()
    },[])

  return(
    <AuthContext.Provider
    value={{
      setAuthToken:setAuthToken,
      token:authtoken
    }}
    >
    <MainState>
    
    <NavigationContainer>
    <Provider theme={theme}>
       {
        authtoken ?
 
        <SideDrawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
        
        <SideDrawer.Screen name="Home" component={BottomTabScreen}/>
        <SideDrawer.Screen name="Collect Payment" component={CollectPaymentStackScreen}/>
        <SideDrawer.Screen name="Setupbox" component={SetupboxStackScreen}/>
        <SideDrawer.Screen name="Daily Collections" component={CollectedCustomerStackScreen} />
       

      </SideDrawer.Navigator>
      
      :
      <>
       
      <AuthScreen />
      {
        visible?
        <AutoLoginModal/>
        :null
      }
  
      
      </>
      

      }
    </Provider>
    </NavigationContainer>
    
    </MainState>
    </AuthContext.Provider>
  )
}