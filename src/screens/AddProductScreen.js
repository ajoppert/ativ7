import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native'
import axios from 'axios';

const AddProductScreen = ({ navigation }) => {

    const [title, setTitle]              = useState('')
    const [price, setPrice]               = useState('')
    const [image, setImage]              = useState('')
    const [category, setCategory]        = useState('')
    const [description, setDescription]  = useState('')    

    useEffect(() => {
        
    }, []);


    const saveProduct = () => { 
        if (title.trim() === "") {
            Alert.alert('Preencha o título!')
        } else { 
            axios.patch('http://10.0.2.2:3000/products', {
                title: title, 
                price: price, 
                category: category,
                description: description, 
                image: image
            }).then((res) => {
                Alert.alert('Criado com sucesso!')
                navigation.navigate('Home', {res})
            })
            .catch((err) => Alert.alert('Erro ao salvar: ' + err.message))
        }
    }

    const showHome = () => {
        navigation.navigate('Home')
    }    

    return (
        <View style={{ backgroundColor: '#dfe6ec', flex: 1, paddingHorizontal: 20, paddingVertical: 30 }}>
            <View style={styles.headerContainer}>
                <Text style={styles.title}>Inclusão de produto</Text>
                <TouchableOpacity style={styles.addButton}>
                    <Text style={styles.buttonAddText}>+</Text>
                </TouchableOpacity>
            </View>  
            {
                <View style={{ flex: 1 }}>
                    <View style={{ flex: 1, backgroundColor: '#FFF', marginVertical: 8, borderRadius: 10, padding: 30 }}>
                        <TextInput 
                            value={title}
                            onChangeText={(txt) => setTitle(txt)}
                            placeholder='Título'
                            style={{fontSize: 16, marginTop: 10, borderWidth: 1, width: '100%', borderColor: '#71acf5', borderRadius: 10}} />
                        <TextInput 
                            value={price}
                            onChangeText={(txt) => setPrice(txt)}
                            placeholder='Preço'
                            style={{fontSize: 16, marginTop: 10, borderWidth: 1, width: '100%', borderColor: '#71acf5', borderRadius: 10}} />   
                        <TextInput 
                            value={image}
                            onChangeText={(txt) => setImage(txt)}
                            placeholder='URL da imagem'
                            style={{fontSize: 16, marginTop: 10, borderWidth: 1, width: '100%', borderColor: '#71acf5', borderRadius: 10}} />
                        <TextInput 
                            value={category}
                            onChangeText={(txt) => setCategory(txt)}
                            placeholder='Categoria'
                            style={{fontSize: 16, marginTop: 10, borderWidth: 1, width: '100%', borderColor: '#71acf5', borderRadius: 10}} />                                                
                        <TextInput 
                            value={description}
                            onChangeText={(txt) => setDescription(txt)}
                            placeholder='Descrição'
                            style={{fontSize: 16, marginTop: 10, borderWidth: 1, width: '100%', borderColor: '#71acf5', borderRadius: 10}} />                  

                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>

                            <TouchableOpacity onPress={saveProduct} style={{ padding: 8, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#71acf5', marginTop: 12, borderRadius: 10, width: '50%' }}>
                                <Text style={{ fontSize: 14, fontWeight: '600', color: '#71acf5' }}>Salvar</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={showHome} style={{ padding: 8, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#71acf5', marginTop: 12, borderRadius: 10, width: '50%' }}>
                                <Text style={{ fontSize: 14, fontWeight: '600', color: '#71acf5' }}>Voltar</Text>
                            </TouchableOpacity>                                                

                        </View>    

                    </View>
                  
 
                </View>

                
            }

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
      borderColor: '#71acf5',
      borderWidth: 2,
      padding: 10,
      borderRadius: 5,
    },
    buttonAddText: {
      color: '#71acf5',
      fontSize: 20,
      fontWeight: 'bold',
    }, 
  });


export default AddProductScreen;