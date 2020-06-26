import React,{useContext,useState} from 'react'
import {View,Text,StyleSheet} from 'react-native'
import { ScrollView, FlatList } from 'react-native-gesture-handler';
import {AuthContext} from '../context'
import {List,Divider} from 'react-native-paper'
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'


const CustomerItem = ({item,index}) =>{
    const [expanded,setExpanded] = useState(false)
    return(
        <View  style={styles.cuslist}>
        <List.Section  title={item.customer_name} titleStyle={{color:'#8e2de2',fontSize:20,}}>
                <List.Accordion
                title={item.street}
                left={props => <MCIcon {...props} name="home-city" size={22} />}
                expanded={expanded}
                onPress={() => setExpanded(!expanded)}
                titleStyle={{fontSize:16,paddingLeft:10,color:'black'}}
                >
                <List.Item
                    title="CUSTOMER ID"
                    description={item.id}
                    titleStyle={styles.keyText}
                    descriptionStyle={styles.keyValue}
                />


                <List.Item
                    title="PAID AMOUNT"
                    description={"RS."+item.paid_amount}
                    titleStyle={styles.keyText}
                    descriptionStyle={styles.keyValue}
                />
                 <List.Item
                    title="PAYMENT STATUS"
                    description={item.payment_status.toUpperCase()}
                    titleStyle={styles.keyText}
                    descriptionStyle={styles.keyValue}
                />
              
                </List.Accordion>
               
            </List.Section>
       
        
        
        <Text style={{
            position:'absolute',
            right:15,
            top:20,
            fontSize:18,
            color:'black',
            fontWeight:'bold',
            }}>{index+1}</Text>

            <Divider style={{borderWidth:0.2}}/>
    </View>
    
    )
}
export default function CollectionCustomerScreen({route,navigation}) {
    const { coll_cus } = route.params;
    const [expanded, setExpanded] = useState(false);

    return (
  
        <View style={styles.container}>
            <FlatList
            data={coll_cus}
            renderItem={({item,index}) => <CustomerItem item={item} index={index} expanded={expanded} setExpanded={setExpanded}/> }
            keyExtractor={(item) => item.id.toString()}
            />
            
        </View>

    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#fff',
        height:'100%'
    },

    cuslist:{
 
    },
    cusHead:{
        fontSize:18,
        color:'black',
        fontWeight:'bold',
        padding:3,

    },
    keyText:{
        fontSize:19,
        color:'#8e2de2'
    },
    keyValue:{
        fontSize:17,
        color:'black',
    },
    cusText:{
        fontSize:17,
        color:'purple',
        padding:3,

    },
    cusAmt:{
        fontSize:17,
        color:'red',
        padding:3,
       
    }
})