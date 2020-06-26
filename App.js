
import React,{useState,useEffect, createContext, useReducer} from 'react';
import {  ToastAndroid, View,StatusBar } from 'react-native';
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
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'
//Navigators Imports
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {createDrawerNavigator} from '@react-navigation/drawer'
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
//Screens Imports
import HomeScreen from './screens/HomeScreen'
import CollectionScreen from './screens/Collection/CollectionScreen'
import CustomersScreen from './screens/Customer/CustomersScreen'
import CustomerDetailScreen from './screens/Customer/CustomerDetailScreen';
import AddCustomerScreen from './screens/Customer/AddCustomerScreen'
import CollectPaymentScreen from './screens/Collection/CollectPaymentScreen'
import CollectedCustomerScreen from './screens/Collection/CollectedCustomerScreen'
import PaymentDetailScreen from './screens/PaymentDetailScreen';
import PackageScreen from './screens/Customer/PackageScreen'
import ShowPanC from  './screens/Customer/ShowPandC'
import ChannelScreen from './screens/Customer/ChannelScreen'
import AuthScreen from './screens/AuthScreen';
import {AuthContext} from './screens/context'
import DrawerContent from './screens/Layout/DrawerContent'
import ChannelListScreen from './screens/Addons/ChannelList';
import PackageListScreen from './screens/Addons/PackageList';
import CollectionCustomerScreen from './screens/Collection/CollectionCustomerScreen';
import EditCustomerScreen from './screens/Customer/EditCustomerScreen';
import SendSmsScreen from './screens/Customer/SendSmsScreen'
//Create Navigators
const SideDrawer = createDrawerNavigator()
const HomeStack = createStackNavigator()
const CustomersStack = createStackNavigator()
const CustomerStack = createStackNavigator()
const CollectionStack = createStackNavigator()
const CollectPaymentStack = createStackNavigator()
const BottomTab = createMaterialBottomTabNavigator()
const TopTab = createMaterialTopTabNavigator()
const CollectedCustomerStack = createStackNavigator()
const  ChannelListStack = createStackNavigator()
const PackageListStack = createStackNavigator()




//Tab Navigations
const TopTabScreen = () =>(
  <TopTab.Navigator 
  
  
  tabBarOptions={{
    showIcon:true,
    
    labelStyle:{
      fontSize:18,
      color:'#fafafa'
    },
    activeTintColor:'#7F00FF',
    indicatorStyle:{
      backgroundColor:'#fafafa',
    },
    style:{
        backgroundColor:'#7F00FF'
    },
    
    
 
  }}>
    <TopTab.Screen name="Packages" component={PackageScreen} options={{tabBarIcon:() => <MCIcon name="cart" size={25} color="white" />}}/>
    <TopTab.Screen name="Channels" component={ChannelScreen} options={{tabBarIcon:() => <MCIcon name="monitor" size={25} color="white" />}}/>
  </TopTab.Navigator>
)



//Stack Screens
const HomeStackScreen = ({navigation}) =>(
  <HomeStack.Navigator initialRouteName="Home" 
  screenOptions={{
    headerTitleAlign:'center',
    headerStyle:{
      backgroundColor:'#7F00FF',
      
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
    
    <HomeStack.Screen name='Payment Customers' component={PaymentDetailScreen}/>
    <HomeStack.Screen name='Daily Collections' component={CollectedCustomerScreen}/>
    
  </HomeStack.Navigator>
)

const CustomersStackScreen = ({navigation}) =>(
  <CustomersStack.Navigator 
  
  screenOptions={{
    headerTintColor:'white',
    headerTitleAlign:'center',
    headerStyle:{
        backgroundColor:'#7F00FF',
        
    },
    headerTitleStyle:{
        color:"#fafafa",


    },
    // headerLeft:() =>(
    //   <Icon name="arrow-left" size={20} color="white" onPress={() => {
    //     navigation.navigate('AddCustomerScreen')
    //   }} 
    //   style={{paddingLeft:20}}/>
    // )
  }}
  >

    <CustomersStack.Screen name='Customers' component={CustomersScreen} options={{title:'Customer Detail',headerShown:false}}/>
    <CustomersStack.Screen name='SendSMS' component={SendSmsScreen} options={{title:'Send SMS'}}/>
    
    <CustomersStack.Screen name='CustomerDetailScreen' component={CustomerDetailScreen} options={{title:'Customer Detail',headerShown:false}}/>
    <CustomersStack.Screen name='AddCustomerScreen' component={AddCustomerScreen} options={{title:'Add Customer',headerShown:false}}/>
    <CustomersStack.Screen name='EditCustomerScreen' component={EditCustomerScreen} options={{headerShown:false}}/>


    <CustomersStack.Screen name='ShowPackageScreen' component={ShowPanC} options={{title:"Packages & Channels"}}/>
    <CustomerStack.Screen name="Add Packages" component={TopTabScreen} options={{
      title:"Packages & Channels",
      headerStyle:{
        backgroundColor:'#7F00FF',
        
    },}}/>
    
    
  </CustomersStack.Navigator>
)


const CollectionStackScreen = ({navigation}) =>(
  <CollectionStack.Navigator 
  screenOptions={{
    headerTitleAlign:'center',
    headerStyle:{
      backgroundColor:'#7F00FF'
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
    <CollectionStack.Screen name='CollectionCustomer' component={CollectionCustomerScreen}/>
  </CollectionStack.Navigator>
)

const CollectPaymentStackScreen = ({navigation}) =>(
  <CollectPaymentStack.Navigator 
  screenOptions={{
    headerTitleAlign:'center',
    headerStyle:{
        backgroundColor:'#7F00FF'
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


const CollectedCustomerStackScreen = ({navigation}) =>(
  <CollectedCustomerStack.Navigator 
  screenOptions={{
    headerTitleAlign:'center',
    headerStyle:{
      backgroundColor:'#7F00FF'
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

const PackageListStackScreen = ({navigation}) =>(
  <PackageListStack.Navigator
  screenOptions={{
    headerTitleAlign:'center',
    headerStyle:{
        backgroundColor:'#7F00FF'
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
  
  }}>
    <PackageListStack.Screen name="Packages" component={PackageListScreen}/>
  </PackageListStack.Navigator>
) 

const ChannelListStackScreen = ({navigation}) =>(
  <ChannelListStack.Navigator
  screenOptions={{
    headerTitleAlign:'center',
    headerStyle:{
        backgroundColor:'#7F00FF'
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
  
  }}>
    <ChannelListStack.Screen name="Channels" component={ ChannelListScreen}/>
  </ChannelListStack.Navigator>
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
          tabBarColor:'#7F00FF'
        }}
      />
      <BottomTab.Screen
        name="Search"
        component={CustomersStackScreen}
        options={{
          tabBarLabel: 'Customers',
          tabBarColor:'#7F00FF',
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
          tabBarColor:'#7F00FF',
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
          tabBarColor:'#7F00FF',
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
        <SideDrawer.Screen name="Daily Collections" component={CollectedCustomerStackScreen} />
        <SideDrawer.Screen name="Packages" component={PackageListStackScreen} />
        <SideDrawer.Screen name="Channels" component={ChannelListStackScreen} />
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