import React, {useState, useContext,useMemo, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Linking,
  TouchableOpacity,
  Dimensions,
  ToastAndroid
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FIcon from 'react-native-vector-icons/FontAwesome';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import FAIcon from 'react-native-vector-icons/FontAwesome5';
import OIcon from 'react-native-vector-icons/Octicons';
import {apiUrl} from '../../Constants'

import {
  Appbar,
  Searchbar,
  Colors,
  DefaultTheme,
  Menu,
  Button,
  Divider,
  FAB,
} from 'react-native-paper';
import moment from 'moment';
import { MainContext } from '../Context/MainContext';
import { AuthContext } from '../context';

function CustomerDetailScreen({route, navigation}) {
  const [hideedit, setHideEdit] = useState(false);
  const {item} = route.params;
  const paid = '#00b09b';
  const unpaid = '#F11712';
  var sp = item.name.indexOf(' ') || item.name.indexOf('.');
  const authContext = useContext(AuthContext)
  const { token } = authContext;
  const mainContext = useContext(MainContext)
  const {isDeleted,setIsDeleted,setIsEdited,isEdited,customerDetails,resetCustomerDetails} = mainContext

  let pack = 0
  let chan = 0

  var pay_date =
    item.payment_date != null
      ? moment(new Date(customerDetails != null ? customerDetails.payment_date:item.payment_date)).format('DD/MM/YYYY')
      : 'N/A';
  var start_date =
    item.start_date != null
      ? moment(new Date(customerDetails != null ? customerDetails.start_date:item.start_date)).format('DD/MM/YYYY')
      : 'N/A';
  var end_date =
    item.end_date != null
      ? moment(new Date(customerDetails != null ? customerDetails.start_date:item.end_date)).format('DD/MM/YYYY')
      : 'N/A';
  const dialCall = num => {
    var phoneNumber = `tel:${num}`;
    Linking.openURL(phoneNumber);
  };


  function isCloseToBottom({layoutMeasurement, contentOffset, contentSize}) {
    return (
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 50
    );
  }

  function isCloseToTop({layoutMeasurement, contentOffset, contentSize}) {
    return contentOffset.y == 0;
  }

  const showToast = (res) =>{
    ToastAndroid.showWithGravityAndOffset(
      res,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50
    );
  }

    //Delete customer Request
    async function deleteCustomerDetails(delid) {
      try {
        let response = await fetch( apiUrl+ 'api/customers/' + delid, {
          method: 'DELETE',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Token ' + token,
          },
        });
  
        if(response.status == 204) {
            navigation.pop()
            showToast("Customer Deleted Successfully")
            setIsDeleted(true,delid)
            
        } else if (response.status == 400) {
          showToast("Customer Not Deleted ")
  
        }
      } catch (error) {
        showToast(error.message);
      }
    }

  useEffect(() =>{
      resetCustomerDetails()
  },[])





  return (
    <View style={{flex: 1}}>
      <View style={styles.float}>
        <FAB
          style={styles.fab}
          large
          label={hideedit == false ? 'Edit Customer' : null}
          icon={() => <FAIcon name="user-edit" size={20} color="white" />}
          onPress={() => navigation.navigate("EditCustomerScreen",{cusDetail:item})}
        />
      </View>
      <ScrollView
        onScroll={({nativeEvent}) => {
          if (isCloseToTop(nativeEvent)) {
            setHideEdit(false);
          }
          if (isCloseToBottom(nativeEvent)) {
            setHideEdit(true);
          }
        }}>
        <Appbar.Header>
          <Appbar.BackAction onPress={() =>{ 
            navigation.pop()
            setTimeout(() =>{
              resetCustomerDetails()
            },2000)
            
            }} size={25} />
          <Appbar.Content title={customerDetails != null ? customerDetails.name:item.name} style={{paddingLeft: 55}} />
        </Appbar.Header>

        <View style={styles.container}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: item.payment_status == 'paid' ? paid : unpaid,
                height: 60,
                width: 60,
                borderRadius: 50,
                marginTop: 10,
                marginBottom: 20,
              }}>
              <Text style={{color: 'white', fontSize: 22}}>
                {item.name.charAt(0)}
                {sp > 1 ? customerDetails != null ? customerDetails.name.charAt(sp + 1):item.name.charAt(sp + 1) : null}
              </Text>
            </View>
          </View>
          <Divider />

          <View style={{marginTop: 15, width: Dimensions.get('screen').width}}>
            <View style={styles.item}>
              <View style={{width: 50}}>
                <FIcon
                  name="id-badge"
                  color="black"
                  size={30}
                  style={{paddingRight: 30}}
                />
              </View>
              <View style={{width: 150}}>
                <Text style={styles.key}>Customer Id : {'       '}</Text>
              </View>
              <View style={{width: 180}}>
                <Text style={styles.cusText}>{item.id}</Text>
              </View>
            </View>
            <View style={styles.item}>
              <View style={{width: 53}}>
                <FIcon
                  name="user"
                  color="black"
                  size={30}
                  style={{paddingRight: 30}}
                />
              </View>
              <View style={{width: 150}}>
                <Text style={styles.key}>Customer     : Name           </Text>
              </View>
              <View style={{width: 180}}>
                <Text style={styles.cusText}>{customerDetails != null ? customerDetails.name:item.name}</Text>
              </View>
            </View>
            <View style={styles.item}>
              <View style={{width: 53}}>
                <Icon
                  name="set-top-box"
                  color="black"
                  size={35}
                  style={{paddingRight: 20}}
                />
              </View>
              <View style={{width: 150}}>
                <Text style={styles.key}>STB No        :</Text>
              </View>
              <View style={{width: 180}}>
                <Text style={styles.cusText}>{customerDetails != null ? customerDetails.stbno:item.stbno}</Text>
              </View>
            </View>
            <View style={styles.item}>
              <View style={{width: 53}}>
                <Icon
                  name="cellphone"
                  color="black"
                  size={30}
                  style={{paddingRight: 26}}
                />
              </View>
              <View style={{width: 150}}>
                <Text style={styles.key}>Phone          : </Text>
              </View>
              <View style={{width: 180}}>
                <Text style={styles.cusText}>
                  {customerDetails != null ? customerDetails.phone: item.phone != null ? item.phone : 'N/A'}
                </Text>

                <TouchableOpacity
                  style={{zIndex: 1, position: 'absolute', right: 15, top: 0}}
                  onPress={() => {
                    if (item.phone != null) dialCall(item.phone);
                  }}>
                  <Icon name="phone-outgoing" color="#7F00FF" size={28} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.item}>
              <View style={{width: 55}}>
                <Icon
                  name="home-city-outline"
                  color="black"
                  size={30}
                  style={{paddingRight: 25}}
                />
              </View>
              <View style={{width: 150}}>
                <Text style={styles.key}>Street          :</Text>
              </View>
              <View style={{width: 180}}>
                <Text style={styles.cusText}>{customerDetails != null ? customerDetails.street:item.street}</Text>
              </View>
            </View>

            <View style={styles.item}>
              <View style={{width: 56}}>
                <FIcon
                  name="money"
                  color="black"
                  size={30}
                  style={{paddingRight: 25}}
                />
              </View>
              <View style={{width: 150}}>
                <Text style={styles.key}>Base Price   :</Text>
              </View>
              <View style={{width: 180}}>
                <Text style={styles.cusText}>
                {"  "}<FIcon name="rupee" color="black" size={20} />
                  {customerDetails != null ? customerDetails.base_price:item.base_price}/-
                </Text>
              </View>
            </View>
            <View style={styles.item}>
              <View style={{width: 58}}>
                <FIcon
                  name="shopping-cart"
                  color="black"
                  size={30}
                  style={{paddingRight: 28}}
                />
              </View>
              <View style={{width: 150}}>
                <Text style={styles.key}>Packages    :</Text>
              </View>
              <View style={{width: 180}}>
                <Text style={styles.cusText}>
                {"  "}<FIcon name="rupee" color="black" size={20} />
                  {
                     customerDetails != null?
                     customerDetails.packages.forEach(p =>{
                       pack+=p.price
                     })
                     :
                    item.packages.forEach(p =>{
                      pack+=p.price
                    })
                    
                  }
                  {pack}/-
                </Text>
              </View>
            </View>

            <View style={styles.item}>
              <View style={{width: 55}}>
                <FIcon
                  name="tv"
                  color="black"
                  size={30}
                  style={{paddingRight: 22}}
                />
              </View>
              <View style={{width: 150}}>
                <Text style={styles.key}>Channels     :</Text>
              </View>
              <View style={{width: 180}}>
                <Text style={styles.cusText}>
                {"  "}<FIcon name="rupee" color="black" size={20} />
                {
                  customerDetails != null?
                  customerDetails.channels.forEach(c =>{
                    chan+=c.price
                  })
                  :
                    item.channels.forEach(c =>{
                      chan+=c.price
                    })
                    
                  }
                  {chan}/-
                </Text>
              </View>
            </View>

            <View style={styles.item}>
              <View style={{width: 53}}>
              <MIcon
                name="add-shopping-cart"
                color="black"
                size={30}
                style={{paddingRight: 28}}
              />
              </View>
              <View style={{width: 150}}>
              <Text style={styles.key}>
                Additional    : Price 
                
              </Text>
              </View>
              <View style={{width: 180}}>
              <Text style={styles.cusText}>
              {"  "}<FIcon name="rupee" color="black" size={20} />
                  {customerDetails != null ? customerDetails.additional_price:item.additional_price}/-
                </Text>
              </View>
            </View>
            <View style={styles.item}>
              <View style={{width: 55}}>
              <FIcon
                name="dollar"
                color="black"
                size={30}
                style={{paddingRight: 32}}
              />
              </View>
              <View style={{width: 150}}>
              <Text
                style={{
                  fontSize: 20,
                  color: '#E100FF',
                  letterSpacing: 1,
                }}>
                Total Amount : (+GST) 
                
              </Text>
              </View>
              <View style={{width: 180}}>
              <Text style={{fontSize: 20,color:'red'}}>
                  {"  "}<FIcon name="rupee" color="red" size={20} />
                  {customerDetails != null ? customerDetails.payment_amount:item.payment_amount}/-
                </Text>
              </View>
            </View>      

            <View style={styles.item}>
              <View style={{width: 53}}>
              <Icon
                name="calendar-check"
                color="black"
                size={30}
                style={{paddingRight: 26}}
              />
              </View>
              <View style={{width: 150}}>
              <Text style={styles.key}>
                Start Date      :
                
              </Text>
              </View>
              <View style={{width: 180}}>
              <Text style={styles.cusText}>{"  "}{start_date}</Text>
              </View>
            </View>       
            <View style={styles.item}>
              <View style={{width: 53}}>
              <Icon
                name="calendar-remove"
                color="black"
                size={30}
                style={{paddingRight: 26}}
              />
              </View>
              <View style={{width: 150}}>
              <Text style={styles.key}>
                End Date        :
                
              </Text>
              </View>
              <View style={{width: 180}}>
               <Text style={styles.cusText}>{"  "}{end_date}</Text>
              </View>
            </View>       

             <View style={styles.item}>
              <View style={{width: 53}}>
              <Icon
                name="calendar-check"
                color="black"
                size={30}
                style={{paddingRight: 26}}
              />
              </View>
              <View style={{width: 150}}>
              <Text style={styles.key}>
                Last Payment : Date{'      '}
               
              </Text>
              </View>
              <View style={{width: 180}}>
                <Text style={{color: Colors.greenA700, fontSize: 20,
                 letterSpacing: 1,}}>
                   {"  "}{pay_date}</Text>
              </View>
            </View>   




            <View style={styles.item}>
              <View style={{width: 53}}>
              <FAIcon
                name="money-check"
                color="black"
                size={20}
                style={{paddingRight: 25}}
              />
              </View>
              <View style={{width: 150}}>
              <Text style={styles.key}>
                Status            :
                
              </Text>
              </View>
              <View style={{width: 180}}>
              <Text
                  style={{
                    color: (customerDetails != null ? customerDetails.payment_status:item.payment_status) === 'paid' ? paid : unpaid,
                    fontSize: 20,
                  }}>
                  {"    "}{(customerDetails != null ? customerDetails.payment_status:item.payment_status) == 'paid' ? 'Paid' : 'Not Paid'}
                </Text>
              </View>
            </View>   

           <View style={styles.item}>
              <View style={{width: 53}}>
              <FAIcon
                name="check-square"
                color="black"
                size={28}
                style={{paddingRight: 25}}
              />
              </View>
              <View style={{width: 150}}>
              <Text style={styles.key}>
                Box Status     :{'           '}
                
              </Text>
              </View>
              <View style={{width: 180}}>
              <Text
                  style={{
                    color:( customerDetails != null ? customerDetails.box_status:item.box_status) === 'active' ? '#7F00FF' :'red' ,
                    fontSize: 20,
                  }}>
                  {"    "}{(customerDetails != null ? customerDetails.box_status:item.box_status) == 'active' ? 'Activated' : 'Deactivated'}
                </Text>
              </View>
            </View>   

            <Button
              mode="contained"
              icon="cart"
              onPress={() =>
                navigation.push('ShowPackageScreen',{
                  packages:customerDetails != null ? customerDetails.packages:item.packages,
                  channels:customerDetails != null ? customerDetails.channels:item.channels
                })
              }
              //channels:item.channels!= ''?item.channels:"No Channels",})}
              style={{
                borderRadius: 20,
                height: 45,
                width:370,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 15,
                marginTop: 20,
              }}>
              Show Channels & Packs
            </Button>
            <Button
              mode="contained"
              icon={() => <OIcon name="checklist" color="white" size={30} />}
              style={{
                borderRadius: 20,
                height: 45,
                width:370,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 15,
              }}>
              Show Reports
            </Button>
            <Button
              mode="contained"
              icon="delete"
              onPress={() =>{
                deleteCustomerDetails(item.id)
 

              }}
              style={{
                borderRadius: 20,
                height: 45,
                width:370,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 15,
                backgroundColor: 'red',
              }}>
              Delete
            </Button>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default CustomerDetailScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '100%',
    padding: 10,
  },
  key: {
    fontSize: 20,
    color: '#E100FF',
    
  },
  cusText: {
    color: 'black',
    fontSize: 20,
    
  },
  item: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    marginBottom: 15,
  },
  float: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 200,
    margin: 16,
    right: 0,
    bottom: 0,
  },
  fab: {
    backgroundColor: '#8e2de2',
  },
});
