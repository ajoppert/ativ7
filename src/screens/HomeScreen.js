import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet, Alert } from 'react-native'
import axios from 'axios';

const HomeScreen = ({ route, navigation }) => {
    
    const [products, setProducts] = useState([])

    useEffect(() => {
        axios.get('http://10.0.2.2:3000/products').then((res) => {
            setProducts(res.data);
        }).catch((err) => 
            Alert.alert('Erro ao recuperar produtos: ' + err.message))
    }, [route.params?.data]);

    const addProduct = () => {
        navigation.navigate('AddProduct')
    }

    const deleteProduct = (id) => {
        axios.delete('http://10.0.2.2:3000/products/' + id
        ).then((res) => {
            Alert.alert('Excluído com sucesso!')
            navigation.navigate('Home', {res})
        })
        .catch((err) => Alert.alert('Erro ao salvar: ' + err.message))
    }
    
    return (
        <View style={{ backgroundColor: '#dfe6ec', flex: 1, paddingHorizontal: 20, paddingVertical: 30 }}>
            <View style={styles.headerContainer}>
                <Text style={styles.title}>Lista de Produtos</Text>
                <TouchableOpacity onPress={addProduct} style={styles.addButton}>
                    <Text style={styles.buttonAddText}>+</Text>
                </TouchableOpacity>
            </View>        
            <FlatList
                keyExtractor={(item, index) => item.id.toString()}
                data={products}
                renderItem={({ item }) =>
                    <TouchableOpacity key={item.id} style={{ backgroundColor: '#FFF', marginBottom: 32, padding: 12, borderRadius: 10 }}
                        onPress={() => navigation.navigate('EditProduct', { product: item })}>
                        <Image
                            style={{ width: '100%', height: 250, resizeMode: 'contain', marginBottom: 12 }}
                            source={{ uri: item.image ? item.image : null }}
                        />
                        <Text style={{ fontSize: 14, fontWeight: '600', color: '#797979' }}>{item.title}</Text>
                        <Text style={{ fontSize: 12, fontWeight: '300', marginTop: 8, color: '#797979' }}>{item.category.toUpperCase()}</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
                            <Text style={{ fontSize: 16, fontWeight: '600', color: '#71acf5' }}>{'$ ' + item.price.toString()}</Text>
                        </View>

                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>

                            <TouchableOpacity onPress={() =>navigation.navigate('EditProduct', { product: item })} style={{ padding: 8, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#71acf5', marginTop: 12, borderRadius: 10, width: '50%' }}>
                                <Text style={{ fontSize: 14, fontWeight: '600', color: '#71acf5' }}>Editar</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => deleteProduct(item.id)} style={{ padding: 8, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#71acf5', marginTop: 12, borderRadius: 10, width: '50%' }}>
                                <Text style={{ fontSize: 14, fontWeight: '600', color: '#71acf5' }}>Excluir</Text>
                            </TouchableOpacity>                                                    

                        </View>   

                    </TouchableOpacity>
                }
                
            />

        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 10,
      borderRadius: 10,
      backgroundColor: '#71acf5'
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'white',
    },
    addButton: {
      backgroundColor: '#71acf5', 
      borderColor: 'white',
      borderWidth: 2,
      padding: 10,
      borderRadius: 5,
    },
    buttonAddText: {
      color: 'white',
      fontSize: 20,
      fontWeight: 'bold',
    }, 
  });

  
export default HomeScreen;