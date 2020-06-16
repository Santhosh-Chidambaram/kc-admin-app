import React from 'react';
import {View, Text, StyleSheet,ScrollView,Linking,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import FIcon from 'react-native-vector-icons/FontAwesome'
import MIcon from 'react-native-vector-icons/MaterialIcons'
import { Appbar,Searchbar,Colors,DefaultTheme,Menu,Button,Divider } from 'react-native-paper';
import moment from 'moment'
function CustomerDetailScreen({route, navigation}) {
  const {item} = route.params;
  const paid = '#00b09b';
  const unpaid = '#F11712';
  var sp = item.name.indexOf(' ') || item.name.indexOf('.');
  var pay_date = moment(new Date(item.payment_date)).format('DD/MM/YYYY')
  var start_date = moment(new Date(item.stb.start_date)).format('DD/MM/YYYY')
  var end_date = moment(new Date(item.stb.end_date)).format('DD/MM/YYYY')
  const dialCall = (num) => {
    
    var phoneNumber = `tel:${num}`;
    Linking.openURL(phoneNumber);
  };
  return (
      <ScrollView >
         <Appbar.Header>
            <Appbar.BackAction 
            onPress={() => navigation.pop()} size={25} />
            <Appbar.Content title={item.name}  style={{paddingLeft:55}}  />
           
             
        </Appbar.Header>
    <View style={styles.container}>
    <View style={{justifyContent:'center',alignItems:'center'}}>
    <View style={{
           justifyContent:'center',
           alignItems:'center',
           backgroundColor:item.payment_status =='paid'?paid:unpaid,
           height:60,
           width:60,
           borderRadius:50,
           marginTop:10,
           marginBottom:20,
           
           }}>
           <Text style={{color:'white',fontSize:22,}}>{item.name.charAt(0)}{sp > 1?item.name.charAt(sp+1):null}</Text>
         </View>
         
    </View>
      <Divider/>  
      <View style={{marginTop:15}}>
      <View style={styles.item}>
      <FIcon name="id-badge" color="black" size={30} style={{paddingRight:30}}/>
      <Text style={styles.key}>

        Customer Id : {"       "}<Text style={styles.cusText}>{item.id}</Text>
      </Text>
      </View>

      <View style={styles.item}>
      <FIcon name="user" color="black" size={30} style={{paddingRight:30}}/>
      <Text style={styles.key}>
        Customer Name : {" "}<Text style={styles.cusText}>{`${item.name}`}</Text>
      </Text>

      </View>

      <View style={styles.item}>
      <Icon name="set-top-box" color="black" size={35} style={{paddingRight:20}}/>
      <Text style={styles.key}>
        STB No : {"              "}<Text style={styles.cusText}>{item.setupbox}</Text>
      </Text>

      </View>

      <View style={styles.item}>
      <Icon name="cellphone" color="black" size={30} style={{paddingRight:26}}/>
      <Text style={styles.key}>
        Phone: {"            "}<Text style={styles.cusText}>{item.phone != null ?item.phone:'N/A'}</Text>
      </Text>
      <TouchableOpacity style={{zIndex:1,position:'absolute',right:0}} 
      onPress={() =>{if(item.phone != null ) dialCall(item.phone)}}>
      <Icon name="phone-outgoing" color="black" size={30}  />
      </TouchableOpacity>
           
      </View>

      <View style={styles.item}>
      <Icon name="home-city-outline" color="black" size={30} style={{paddingRight:25}}/>
      <Text style={styles.key}>
        Street : <Text style={styles.cusText}>{item.street}</Text>
      </Text>

      </View>
      
      <View style={styles.item}>
      <FIcon name="money" color="black" size={30} style={{paddingRight:25}}/>
      <Text style={styles.key}>
       Base Price :{'          '}
        <Text style={styles.cusText}><FIcon name="rupee" color="black" size={20} />{item.stb.base_price}/-</Text>
      </Text>
      </View>

     

      <View style={styles.item}>
      <FIcon name="shopping-cart" color="black" size={30} style={{paddingRight:28}}/>
      <Text style={styles.key}>
       Packages :{'            '}
        <Text style={styles.cusText}><FIcon name="rupee" color="black" size={20} />0/-</Text>
      </Text>
      </View>

      <View style={styles.item}>
      <FIcon name="tv" color="black" size={30} style={{paddingRight:22}}/>
      <Text style={styles.key}>
       Channels :{'             '}
        <Text style={styles.cusText}><FIcon name="rupee" color="black" size={20} />0/-</Text>
      </Text>
      </View>
    
      <View style={styles.item}>
      <MIcon name="add-shopping-cart" color="black" size={30} style={{paddingRight:28}}/>
      <Text style={styles.key}>
       Addon Price :{'        '}
        <Text style={styles.cusText}><FIcon name="rupee" color="black" size={20} />{item.stb.add_price}/-</Text>
      </Text>
      </View>


      <View style={styles.item}>
      <FIcon name="dollar" color="black" size={30} style={{paddingRight:39}}/>
      <Text 
      
      style={{

        fontSize:20,
        color:'#8e2de2',
        letterSpacing:1, 
      }}>
       Total Amount(+GST) :
        <Text style={styles.cusText}><FIcon name="rupee" color="black" size={20} />{item.payment_amount}/-</Text>
      </Text>

      </View>
      <View style={styles.item}>
      <Icon name="calendar-check" color="black" size={30} style={{paddingRight:26}}/>
      <Text style={styles.key}>
       Start Date :{'           '}
        <Text style={styles.cusText}>{start_date}</Text>
      </Text>

      </View>
      <View style={styles.item}>
      <Icon name="calendar-remove" color="black" size={30} style={{paddingRight:26}}/>
      <Text style={styles.key}>
       End Date :{'             '}
        <Text style={styles.cusText}>{end_date}</Text>
      </Text>

      </View>
      <View style={styles.item}>
      <Icon name="calendar-check" color="black" size={30} style={{paddingRight:26}}/>
      <Text style={styles.key}>
       Payment Date:{'      '}
        <Text style={{color:Colors.deepOrangeA200}}>{pay_date}</Text>
      </Text>

      </View>
     

      <View style={styles.item}>
      <MIcon name="payment" color="black" size={30} style={{paddingRight:25}}/>
      <Text style={styles.key}>
        Status :{'                  '}
        <Text
          style={{
            color: item.payment_status === 'paid' ? paid : unpaid,
            fontSize: 20,
          }}>
          {item.payment_status == 'paid' ? 'Paid' : 'Not Paid'}
        </Text>
      </Text>

      </View>
      <View style={styles.item}>
      <Icon name="set-top-box" color="black" size={30} style={{paddingRight:25}}/>
      <Text style={styles.key}>
        Box Status :{'           '}
        <Text
          style={{
            color: item.stb.box_status === 'active' ? '#FF0080' : 'black',
            fontSize: 20,
          }}>
          {item.stb.box_status == 'active' ? 'Activated' : 'Deactivated'}
        </Text>
      </Text>

      </View>
     <Button  
     mode="contained" 
     icon="cart"
     style={{
         borderRadius:20,
         height:45,
         alignItems:'center',
         justifyContent:'center',
         marginBottom:15,
         marginTop:20,
         
         }}>
         Show Channels & Packs
     </Button>
     <Button 
     mode="contained" 
     icon="file"
    
     style={{borderRadius:20,height:45,alignItems:'center',justifyContent:'center',marginBottom:15}}>
         Show Reports
     </Button>
     <Button 
     mode="contained" 
     icon="delete"
     
     style={{borderRadius:20,height:45,alignItems:'center',justifyContent:'center',marginBottom:15,backgroundColor:'red'}}>
         Delete
     </Button>
    </View>
    </View>
    </ScrollView>
  );
}

export default CustomerDetailScreen;
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '100%',
    padding:10,
  },
  key:{
  
      fontSize:20,
      color:'#8e2de2',
      letterSpacing:1,
      width:300,
      
  },
  cusText:{
    color:'black',
    
    
  },
  item:{
      
      flexDirection:'row',
      alignItems:'center',
      marginBottom:15,
  }
});
