import React ,{useEffect,useState,useContext} from 'react'
import {TextInput,View,StyleSheet,Image,Dimensions,KeyboardAvoidingView,TouchableWithoutFeedback, Keyboard} from 'react-native'
import { Provider,Text,Button,ActivityIndicator, Colors,Modal,Portal,Snackbar } from 'react-native-paper';
import * as Animatable from 'react-native-animatable'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import AsyncStorage from '@react-native-community/async-storage'
import {apiUrl} from '../Constants'
import {AuthContext} from './context'
export default function AuthScreen() {
    const authContext = useContext(AuthContext)
    const {setAuthToken} = authContext
    const [visible,setVisible] = useState(false)
    const _showModal = () => setVisible(true);
    const  _hideModal = () => setVisible(false);
    const [snack,setSnack] = useState({
        visible:false,
        color:'',
        message:''
    })
    const [authcred,setAuthCred] = useState({
        username:'',
        password:'',
    })
 

    const handleChangeText = (name,value)=>{
        setAuthCred({
            ...authcred,
            [name]:value
        })
    }
    
    async function getTokenandStore(){
        let response = await fetch(apiUrl+"api-token-auth/",{
            method:"POST",
            headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        
            },
            body:JSON.stringify({
                username:authcred.username,
                password:authcred.password,
            })
        })
        if(response.ok){
            let res = await response.json()
            try {
                await AsyncStorage.setItem('usertoken',res.token)
                console.log('Data successfully saved')
                setTimeout(() =>{
                    _hideModal()
                    setAuthToken(res.token)
                
                },3000)
                
               
              } catch (e) {
                console.log('Failed to save the data to the storage')
              }

        }else if(response.status == 400){
            setTimeout(() =>{
                _hideModal()
                setSnack({
                    visible:true,
                    message:"Invalid username or password !"
                })
            },2000)
           
            
        }
    }

    const LoginActivityModal = () => (

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
            <Text style={{paddingTop:5,fontSize:18,color:'purple'}}>Please wait logging in</Text>
          </Modal>

        </View>
          
        </Portal>

   )
   const SnackView = () => (
    <Snackbar
      visible={snack.visible}
      duration={2000}
      onDismiss={() => setSnack({visible:false})}
      style={{ backgroundColor:'red'}}
    >
      {snack.message}
    </Snackbar>
)
    return (
        <Provider>
        <KeyboardAwareScrollView 
        scrollEnabled={true}
        contentContainerStyle={{
            position:'absolute'
        }}
        >

            
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{flex:1,backgroundColor:'#8e2de2',
        height:"100%",}}>
            <View style={styles.header}>
                <Image source={require('../assets/ic_launcher.png')} style={styles.logo}/>
                <Text style={{
                    fontSize:29,
                    color:'#fafafa',
                    marginBottom:10
                }}>Welcome!</Text>
            </View>
            <Animatable.View 
            animation="fadeInUpBig"
            style={styles.container}>
            <View>  
            <TextInput
           
            label='Username'
            value={authcred.username}
            placeholder="username"
            onChangeText={txt => handleChangeText("username",txt)}
            style={{
                width:280,
                height:50,
                borderWidth:2,
                marginBottom:30,
                fontSize:20,
                color:'#8e2de2',
                paddingLeft:20,
                borderColor:'#8e2de2',
                borderRadius:10
                

            }}
            
            />
            <TextInput
            mode="outlined"
            color='#8e2de2'
            label='Password'
            value={authcred.password}
            placeholder="password"
            secureTextEntry={true}
            onChangeText={txt => handleChangeText("password",txt)}
            style={{
                width:280,
                height:50,
                marginBottom:30,
                borderWidth:2,
                fontSize:20,
                color:'#8e2de2',
                paddingLeft:20,
                borderColor:'#8e2de2',
                borderRadius:10

            }}
            
            />
            
            <Button 
            icon="login" 
            mode="contained" 
            style={{
                height:40
            }}
            onPress={() => {
                _showModal()
                getTokenandStore()
                
            
            }}
            color="#f80759"
            >
                
               Log In
            </Button>

            </View>
            
            

            </Animatable.View>
            

        </View>
        </TouchableWithoutFeedback>
        <SnackView/>
        <LoginActivityModal/>
        </KeyboardAwareScrollView>
        </Provider>

    )
}

const styles = StyleSheet.create({
    header:{
        flex:1,
        
        justifyContent:'center',
        alignItems:'center',
        paddingTop:20,
        paddingBottom:20,


    },
    logo:{
        width:150,
        height:140,

    },
    container:{
        flex:2,
        width:Dimensions.get('screen').width,
        height:Dimensions.get('screen').height-300,
        alignItems: "center",
        padding: 25,
        backgroundColor: "white",
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,
        borderRadius:20,
        paddingTop:60,

    },
    footer:{

    }
})