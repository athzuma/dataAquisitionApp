import React, {useState, useEffect, useRef} from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Modal, Image } from 'react-native';
import { Camera } from 'expo-camera';
import {FontAwesome} from '@expo/vector-icons';

export default function App() {
  const [type, setType] = useState(Camera.Constants.Type.back); //state para definir câmera traseira ou frontal
  const [hasPermission, setHasPermission] = useState(null); //state para permitir uso da câmera
  const camRef = useRef (null); //referenciando a camera 
  const [capturedPhoto, setCapturedPhoto] = useState(null); //state para controlar captura de imagem
  const [open, setOpen] = useState(false); //state para controlar o modal de exibição
  
  
  useEffect(() => {// useEffect = 1ª vez que é executado o app
    (async () =>{
      const {status} = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);
  
  if(hasPermission === null){
    return <View/>;
  } 
  if(hasPermission === false){
    return <Text>Acesso negado!</Text>
  } 

  async function takePicture(){
    if(camRef){
      const data = await camRef.current.takePictureAsync();
      setCapturedPhoto(data.uri); //guardando a foto tirada
      setOpen(true);
      console.log(data);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Camera style={styles.camera} type={type} ref={camRef} >
        <View style={styles.switchButtonView}>
          <TouchableOpacity  style={styles.switchButton} //botão para trocar a câmera
          onPress={()=>{
            setType(
              type === Camera.Constants.Type.back ?  Camera.Constants.Type.front :  Camera.Constants.Type.back
            );
          }}
          >
            <Text style={{ fontSize:20, marginBottom:13, color:'#fff'}}>Trocar</Text>
          </TouchableOpacity>
        </View>
      </Camera>    
      
      <TouchableOpacity style={styles.takePictureButton} onPress={ takePicture}>  
          <FontAwesome name="camera" size={23} color='white' />
      </TouchableOpacity>

      { capturedPhoto &&
        <Modal
        animationType="slide"
        transparent={false}
        visible={open}
        >
          
          <View style={styles.modal}>
                      
            <TouchableOpacity style={{margin:10}} onPress={() => setOpen(false)}>
              <FontAwesome name="window-close" size={50} color="red" />
            </TouchableOpacity>
            
            <Image  
              style={styles.image}
              source={{uri:capturedPhoto}}
            />

          </View>
        </Modal>
      }

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  switchButtonView:{
    flex:1,
    backgroundColor:'transparent',
    flexDirection: 'row',
  },
  switchButton:{
   position:'absolute',
   bottom:20,
   left:20,
  },
  takePictureButton:{
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor:'#121212',
    margin:20,
    borderRadius:10,
    height:50,
  },
  modal:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    margin:20,
  },
  image:{
    width:'100%',
    height:'300',
    borderRadius:20,
  },
});
