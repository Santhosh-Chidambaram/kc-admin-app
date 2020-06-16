import React, {useState, useEffect, useContext, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  Modal,
  KeyboardAvoidingView,
  Dimensions,
  ToastAndroid,
  ScrollView,
  RefreshControl
} from 'react-native';
import {apiUrl} from '../Constants';
import * as Animatable from 'react-native-animatable';
import { RadioButton } from 'react-native-paper';
//Icon Imports
import {
    List,
    Portal,
    Provider,ActivityIndicator,Colors} from 'react-native-paper'
import Icon from 'react-native-vector-icons/FontAwesome5';
import Aicon from 'react-native-vector-icons/MaterialIcons';
import AntIcon from 'react-native-vector-icons/Entypo';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import { AuthContext } from './context';



function wait(timeout) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}


const SetupboxItem = ({item,modalVisible,setModalVisible,setDelid,setOnEdit,setState}) => {
  const [expanded,setExpanded] = useState(false)
  return (
    <View style={styles.stbItem}>
      <View
        style={{
          flexDirection: 'row',
          position: 'absolute',
          top: 5,
          right: 5,
          zIndex: 1,
          paddingBottom:10
        }}>
        <TouchableOpacity style={{paddingRight: 8}} 
        onPress={() =>{
            setState({
                id:item.id,
                boxno: item.boxno,
                base_package: item.base_price.toString(),
                base_price: item.base_price.toString(),
                additional_price: item.additional_price.toString(),
                end_date: item.end_date,
                box_status: item.box_status,

            })
            setOnEdit(true)
 
            }}>
          <Icon
            name="edit"
            color="black"
            size={22}
            style={{
              backgroundColor: 'white',
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity style={{paddingRight: 5}} 
        onPress={() => {
            setModalVisible(!modalVisible)
            setDelid(item.id)
            }}>
          <Aicon
            name="delete"
            color="red"
            size={25}
            style={{backgroundColor: 'white'}}
          />
        </TouchableOpacity>
      </View>
      <List.Section  title="STB">
                <List.Accordion
                title={item.boxno} 
                titleStyle={{fontSize:18,}}
                left={props => <MCIcon {...props} name="set-top-box" size={35} />}
                expanded={expanded}
                onPress={() => setExpanded(!expanded)}
                titleStyle={{fontSize:18,paddingLeft:10}}
                
                >
                <List.Item
                    title="STB ID"
                    description={item.id}
                    titleStyle={styles.stbsub}
                    descriptionStyle={styles.stbText}
                />

        
                <List.Item
                    title="BASE PRICE"
                    description={item.base_price}
                    titleStyle={styles.stbsub}
                    descriptionStyle={styles.stbText}
                />

                <List.Item
                    title="ADDITIONAL PRICE"
                    description={"RS."+item.additional_price}
                    titleStyle={styles.stbsub}
                    descriptionStyle={styles.stbText}
                />
                <List.Item
                    title="TOTAL PRICE"
                    description={"RS."+item.total_price}
                    titleStyle={styles.stbsub}
                    descriptionStyle={styles.stbText}
                />
                <List.Item
                    title="BOX STATUS"
                    description={item.box_status.toUpperCase()}
                    titleStyle={styles.stbsub}
                    descriptionStyle={styles.stbText}
                />
                
                </List.Accordion>
               
            </List.Section>
      
    </View>
  );
};
export default function SetupboxScreen() {
    var date = moment().add(4,'M').utcOffset("+05:30").format("YYYY-MM-DD");
    const authContext = useContext(AuthContext)
    const {token} = authContext;
    //States
  const [stbs, setStbs] = useState([]);
  const [stbno, setStbno] = useState('');
  const [serverData, setserverData] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [delmodalVisible, setDelModalVisible] = useState(false);
  const [delid,setDelid] = useState('')
  const [onaddStb,setOnAddStb] = useState(false)
  const [todelete,setToDelete] = useState(false)
  const [onedit,setOnEdit] = useState(false)
  const [checked,setChecked] = useState('')
  const [state, setState] = useState({
    id:'',
    boxno: '',
    base_package: '180',
    base_price: '180',
    additional_price: '0',
    end_date: date,
    box_status: 'active',
    
  });

    //Refresh control
    const [refreshing, setRefreshing] = React.useState(false);
    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      getstbList()
  
      wait(3000).then(() => setRefreshing(false));
    }, [refreshing]);
  
  
//Toast
const showToast = res => {
  ToastAndroid.showWithGravityAndOffset(
    res,
    ToastAndroid.LONG,
    ToastAndroid.BOTTOM,
    25,
    200,
  );
};

  
  //Get STBS
  async function getstbList() {
      try {
        let response = await fetch(apiUrl + 'api/stbs',
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
              Authorization: "Token " + token,
          },

        });
        if (response.ok) {
          let res = await response.json();
          setserverData(res);
        }else{
            let res = await response.json();
            showToast(res)
        }
          
      } catch (error) {
          showToast(error.messages)
          
      }
   
  }

  //Add Stb
  async function postStb(){
      try {
        let response = await fetch(apiUrl + 'api/stbs',
            {    method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                  Authorization: "Token " + token,
                },
                body:JSON.stringify({
                   boxno:state.boxno.toUpperCase(),
                   base_package:state.base_package,
                   base_price:state.base_price,
                   additional_price:state.additional_price,
                   box_status:state.box_status,
                   end_date:state.end_date
                })
            },);
        if (response.ok) {
            setModalVisible(false)
            setOnAddStb(true)
            showToast("STB added successfully")
            setState({
                boxno: '',
                base_package: '180',
                base_price: '180',
                additional_price: '0',
                end_date: date,
                box_status: 'active',
            })
          
        }else if(response.status == 400 ){
            setModalVisible(!modalVisible)
            showToast("Something went wrong")
            setState({
                boxno: '',
                base_package: '180',
                base_price: '180',
                additional_price: '0',
                end_date: date,
                box_status: 'active',
            })
        }else{
            setModalVisible(!modalVisible)
            setState({
                boxno: '',
                base_package: '180',
                base_price: '180',
                additional_price: '0',
                end_date: date,
                box_status: 'active',
            })
            showToast("Something went wrong! Please try again later")
        }
          
      } catch (error) {
          showToast(error.messages)
          
      }
  }
  //Update Stb
  async function updateStb(){
    try {
      let response = await fetch(apiUrl + 'api/stbs/'+state.id,
          {    method: "PUT",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Token " + token,
              },
              body:JSON.stringify({
                 boxno:state.boxno.toUpperCase(),
                 base_package:state.base_package,
                 base_price:state.base_price,
                 additional_price:state.additional_price,
                 box_status:state.box_status,
                 end_date:state.end_date
              })
          },);
      if (response.ok) {
          setModalVisible(false)
          setOnAddStb(true)
          showToast("STB Updated successfully")
          setOnEdit(false)
          editfilter()
        
      }else if(response.status == 400 ){
          setModalVisible(!modalVisible)
          showToast("Something went wrong")
          setOnEdit(false)
          setState({
              boxno: '',
              base_package: '180',
              base_price: '180',
              additional_price: '0',
              end_date: date,
              box_status: 'active',
          })
      }else{
          setModalVisible(!modalVisible)
          setOnEdit(false)
          setState({
              boxno: '',
              base_package: '180',
              base_price: '180',
              additional_price: '0',
              end_date: date,
              box_status: 'active',
          })
          showToast("Something went wrong! Please try again later")
      }
        
    } catch (error) {
        showToast(error.messages)
        
    }
}
  //Delete STB
  async function deleteStb(){
    try {
        let response = await fetch(apiUrl + 'api/stbs/'+delid,
            {    method: "DELETE",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                  Authorization: "Token " + token,
                },
            },);
        if(response.ok){
            deletefilter()
            showToast("STB deleted successfully")
        }else{
          showToast("FAILED : STB assigned to a customer")
        }
    }catch(error){
        showToast(error.messages)
    }

  }

  
  //FilterBysearch Function
  const searchFilterFunction = (query='') => {
    if(query == ''){
      if (serverData != '') {
        var resData = serverData.filter(function(obj) {
          return (obj.boxno.includes(stbno.toUpperCase()) ||
          obj.boxno.includes(stbno.toLowerCase()) ||
          obj.id == stbno || '' 
          );
        });
      } else {
        showToast('No Record from the server');
      }

    }else{
      if (serverData != null) {
        var resData = serverData.filter(function(obj) {
          return (obj.box_status.includes(query.toUpperCase()) ||
          obj.box_status.includes(query.toLowerCase()) 

          );
        });
      } else {
        showToast('No Record from the server');
      }

    }
    

    if (resData != '') {
      setStbs(resData);
    } else {
      showToast('No Records Found');
    }
  };

  //Delete Filter
  const deletefilter = () =>{
    if (serverData != null) {
      var resData = serverData.filter(function(obj) {
        return obj.id != delid;
      });

    setserverData(resData);
    var result = stbs.filter(function(obj) {
        return obj.id != delid;
      });

    setStbs(result);

    }else {
      showToast('No Records Found');
    }
    


  }
  //Edit Filter 
  const editfilter = () =>{
    if (serverData != null) {
      var resData = serverData.filter(function(obj) {
        return obj.id == state.id
      });
      setState({
        id:'',
        boxno: '',
        base_package: '180',
        base_price: '180',
        additional_price: '0',
        end_date: date,
        box_status: 'active',
    })
    
    
    setStbs(resData)

    }else {
      showToast('No Records Found');
    }
    

  }



  useEffect(() => {
    getstbList();

    
  }, []);
  useEffect(() =>{
      if(onaddStb){
          setTimeout(() =>{
            getstbList();
          },2000)
        
      }
      if(todelete){
          deleteStb()
          

      }
      if(onedit){
          setModalVisible(true)
      }else{
        setModalVisible(false)
      }
      setToDelete(false)
      setOnAddStb(false)
      
    
    
  },[onaddStb,todelete,onedit])

  const handleTextChange = (name,value) =>{
      setState({
        ...state,
          [name]:value,
          
      })

  }
  const [fadeText,setFadeText] = useState('')

  const floatRef = useRef()
  return (
    
      <View style={styles.container}>
       
          <TouchableOpacity
            style={styles.floatView}
            onPress={() => {
              setFadeText("ADD STB")
              
              setTimeout(() =>{
                setFadeText('')
                setModalVisible(true)
                
              },1000)
              
            }}
           >
              <Animatable.View  ref={floatRef} 
              style={styles.floatText}>
                  <AntIcon name="plus" color="white" size={40} />
                   { fadeText != '' 
                  
                  ?
                  <Text style={{color:'white'}}>{fadeText}  </Text>
                   
                   : null } 
                   
            </Animatable.View>
          </TouchableOpacity>
        

        <View style={styles.header}>
          <View style={styles.filter}>
            
          
          <Text style={styles.radio}>
            Active
          </Text>
          <RadioButton
          color="purple"
          value="first"
          status={checked === 'active' ? 'checked' : 'unchecked'}
          onPress={() => {
            setChecked('active') 
            searchFilterFunction('active')
          
          }}
          
          />
          <Text style={styles.radio}>
            Deactive
          </Text>
        <RadioButton
          color="red"
          value="second"
          status={checked === 'deactive' ? 'checked' : 'unchecked'}
          onPress={() => { 
            setChecked('deactive')
            searchFilterFunction('deactive') 
          
          }}
        />
          </View>
          <View style={styles.search}>
              <TextInput
                style={{
                  height: 45,
                  width: 230,
                  borderColor: '#F0057E',
                  borderWidth: 2,
                  borderRadius: 20,
                  padding: 10,
                  marginTop: 6,
                  fontSize: 18,
                  
                }}
                placeholder="Enter STB No."
                name="stb"
                onChangeText={txt => setStbno(txt)}
                value={stbno}
              />
              <TouchableOpacity style={{position: 'absolute', right: 120, top: 15}} 
              onPress={() => {
                  setStbs('')
                  setStbno('')
                  }}>
                <Aicon name="clear" size={27} color="black" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  searchFilterFunction();
                }}
                style={{
                  backgroundColor: '#f64f59',
                  width: 100,
                  height: 40,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 20,
                  marginLeft:10,
                  marginTop:8,               }}>
                <Icon name="search" size={22} color="white" />
                <Text style={{fontSize: 20, color: 'white'}}>Search</Text>
              </TouchableOpacity>
          </View>
          
          
        </View>
         {
           stbs != ''?
           <FlatList
          data={stbs}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => 
          <SetupboxItem item={item} setDelid={setDelid} setOnEdit={setOnEdit} setState={setState}
            modalVisible={delmodalVisible} setModalVisible={setDelModalVisible}
          
          />}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          />
           :
           null
         }         
        

    {/* Add Setupbox Modal */}
        {modalVisible ? (
        <KeyboardAvoidingView
        behavior="padding"
        enabled
        >
          <ScrollView nestedScrollEnabled={true}>
          <View style={styles.centeredView}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              
              >
              
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    {onedit
                    ?
                    <Text
                    style={{
                      color: '#8e2de2',
                      position: 'absolute',
                      top: 10,
                      fontSize: 21,
                    }}>
                    EDIT SETUPBOX
                  </Text>
                    : 
                    <Text
                    style={{
                      color: '#8e2de2',
                      position: 'absolute',
                      top: 10,
                      fontSize: 21,
                    }}>
                    ADD SETUPBOX
                  </Text>      }
                  
                  <View
                    style={{
                      zIndex: 1,
                      position: 'absolute',
                      top: 10,
                      right: 10,
                    }}>
                    {onedit
                    ?
                        <TouchableOpacity
                        onPress={() => {
                            setModalVisible(!modalVisible)
                            setOnEdit(false)
                            setState({
                              id:'',
                              boxno: '',
                              base_package: '180',
                              base_price: '180',
                              additional_price: '0',
                              end_date: date,
                              box_status: 'active',
                            })
                            
                        }}>
                        <Aicon name="close" size={29} color="red" />
                    </TouchableOpacity>
                    :
                    <TouchableOpacity
                        onPress={() => setModalVisible(!modalVisible)}>
                        <Aicon name="close" size={29} color="red" />
                        </TouchableOpacity>
                    }
                    
                  </View>

                  <View style={{marginTop: 15}}>
                    <Text style={styles.label}>STB NO:</Text>
                    <TextInput
                      style={{
                        height: 40,
                        width: 250,
                        borderColor: '#F0057E',
                        borderWidth: 2,
                        borderRadius: 20,
                        padding: 10,
                        marginTop: 6,
                        fontSize: 18,
                        paddingLeft: 20,
                        marginBottom: 10,
                      }}
                      placeholder="STB NUMBER"
                      name="setupbox"
                      onChangeText={txt => handleTextChange("boxno",txt)}
                      value={state.boxno}
                    />
                    <Text style={styles.label}>BASE PACKAGE:</Text>
                    <TextInput
                      style={{
                        height: 40,
                        width: 250,
                        borderColor: '#F0057E',
                        borderWidth: 2,
                        borderRadius: 20,
                        padding: 10,
                        marginTop: 6,
                        fontSize: 18,
                        paddingLeft: 20,
                        marginBottom: 10,
                      }}
                      placeholder="BASE PACKAGE"
                      name="stb"
                      onChangeText={txt => handleTextChange("base_package",txt)}
                      value={state.base_package}
                    />
                    <Text style={styles.label}>END DATE:</Text>
                    <TextInput
                      style={{
                        height: 40,
                        width: 250,
                        borderColor: '#F0057E',
                        borderWidth: 2,
                        borderRadius: 20,
                        padding: 10,
                        marginTop: 6,
                        fontSize: 18,
                        paddingLeft: 20,
                        marginBottom: 10,
                      }}
                      placeholder="END DATE(YYY-MM-DD)"
                      name="stb"
                      onChangeText={txt => handleTextChange("end_date",txt)}
                      value={state.end_date}
                    />
                    <Text style={styles.label}>BASE PRICE:</Text>
                    <TextInput
                    keyboardType={"numeric"}
                      style={{
                        height: 40,
                        width: 250,
                        borderColor: '#F0057E',
                        borderWidth: 2,
                        borderRadius: 20,
                        padding: 10,
                        marginTop: 6,
                        fontSize: 18,
                        paddingLeft: 20,
                        marginBottom: 10,
                      }}
                      placeholder="BASE PRICE"
                      name="stb"
                      onChangeText={txt => handleTextChange("base_price",txt)}
                      value={state.base_price}
                    />
                    <Text style={styles.label}>ADDITIONAL PRICE</Text>
                    <TextInput
                      keyboardType={"numeric"}
                      style={{
                        height: 40,
                        width: 250,
                        borderColor: '#F0057E',
                        borderWidth: 2,
                        borderRadius: 20,
                        padding: 10,
                        marginTop: 6,
                        fontSize: 18,
                        paddingLeft: 20,
                        marginBottom: 20,
                      }}
                      placeholder="ADDITIONAL PRICE"
                      name="stb"
                      onChangeText={txt => handleTextChange("additional_price",txt)}
                      value={state.additional_price}
                    />
                    <Text style={styles.label}>BOX STATUS</Text>
                    <TextInput
                      style={{
                        height: 45,
                        width: 250,
                        borderColor: '#F0057E',
                        borderWidth: 2,
                        borderRadius: 20,
                        padding: 10,
                        marginTop: 6,
                        fontSize: 18,
                        paddingLeft: 20,
                        marginBottom: 20,
                      }}
                      placeholder="BOX STATUS"
                      name="stb"
                      onChangeText={txt => handleTextChange("box_status",txt)}
                      value={state.box_status}
                    />
                    {onedit
                    ?
                    <TouchableOpacity
                    onPress={() => {
                        if(state.boxno != '' ){
                            
                            updateStb()
                            
                            
                        }else{
                            setModalVisible(!modalVisible)
                            showToast('Please Fill All Details')
                        }
                        
                    }}
                      style={{
                        backgroundColor: '#f80759',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 40,
                        borderRadius: 20,
                      }}>
                      <Text style={{color: 'white', fontSize: 20}}>UPDATE</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity
                    onPress={() => {
                      if(state.boxno != ''){
                        postStb()
                        
                      }else{
                        setModalVisible(!modalVisible)
                        showToast('Please Fill All Details')
                      }
                        
                        
                    }}
                      style={{
                        backgroundColor: '#f80759',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 40,
                        borderRadius: 20,
                      }}>
                      <Text style={{color: 'white', fontSize: 20}}>ADD</Text>
                    </TouchableOpacity>
                    
                    }
                  </View>
                </View>
              </View>
            </Modal>
          </View>
          </ScrollView>
          </KeyboardAvoidingView>
        ) : null}

        {/* End of setupbox modal */}
        {
            delmodalVisible ?
            <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={delmodalVisible}
                >
                    <View style={styles.centeredView}>
                    <View style={styles.delmodalView}>
                        <Text style={styles.modalText}>Are You Sure you want to delete the stb ? </Text>
                        <View style={{display:'flex',flexDirection:'row'}}>
                        
                        
                        <TouchableOpacity style={styles.openButton}
                        onPress={() => {
                            setToDelete(true)
                            setDelModalVisible(!delmodalVisible)
                        }}
                        >
                            <Text style={styles.textStyle}>Yes</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                        style={styles.closebutton}
                        onPress={() => setDelModalVisible(!delmodalVisible)}
                        >
                            <Text style={styles.textStyle}>No</Text>
                        </TouchableOpacity>
                        </View>
                    </View>
                    </View>
                </Modal>

                    <Text style={styles.textStyle}>Show Modal</Text>

                </View>
                :
                null
        }
      </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: "100%",
  },
  radio:{
    fontSize:20,
    fontWeight:'bold',
  },
  floatView: {
    zIndex: 1,
    position: 'absolute',
    bottom: 30,
    right: 12,
    backgroundColor:'white',
    borderRadius:50,
    height:40,
  },
  floatText:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#8e2de2',
    borderRadius:50,
    padding:10,

  },
  label: {
    fontSize: 18,
  },
  header: {
    flexDirection:'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 3,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 6,
    borderRadius: 20,

    
  },
  filter:{
    flexDirection:'row',
    alignItems:'flex-start',
    paddingBottom:1,

  },
  search:{
    
    flexDirection:'row',
    paddingBottom:10
  },
  headText: {
    color: 'white',
    textAlign: 'center',
  },
  add: {
    backgroundColor: '#f64f59',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    width: 100,
    height: 30,
  },
  stbItem: {
    paddingLeft:10,
    width:'95%',
    marginTop: 8,
    marginLeft:10,
    backgroundColor: 'white',
    borderTopWidth: 2,
    borderColor: '#F0057E',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
    borderRadius: 20,
    marginBottom: 5,

  },
  stbText: {
    color: '#8e2de2',
    fontSize: 19,
    fontWeight: 'bold',
  },
  stbsub: {
    //color: '#FF0099',
    fontSize: 18,
   
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    

  },
  modalView: {
    position:'absolute',
    top:55,
    zIndex:1,
    width: '95%',
    height: Dimensions.get('screen').height-135,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 10,
  },
  delmodalView: {

    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: '#f80759',
    borderRadius: 8,
    padding: 10,
    marginRight:25,
    elevation: 2,
  },
  closebutton:{
    backgroundColor: '#3F5EFB',
    borderRadius: 8,
    padding: 10,
    elevation: 2,

  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize:18
  },
});
