import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { TextInput, Button } from "react-native-paper";

import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "./RegisterScreen";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#515151",
    justifyContent: "center"
  },

  container1: {
    padding: 30,
    backgroundColor: "#000000",
    justifyContent: "center",
  },

  tinyLogo: {
    width: 150,
    height: 150,
  },

  // ...otros estilos aquí...

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#FFFFFF",

  },
  paragraph: {
    fontSize: 16,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 2,
    borderColor: "#0b5394",
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#00FF38",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  text2: {
    color: "white",
    fontSize: 18,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (isLoggedIn) {
    return (
      <View style={styles.container1}>
        <Text style={styles.title}>Bienvenido!</Text>
        <Button
          style={styles.button}
          onPress={() => setIsLoggedIn(false)}
        >
          Cerrar sesión
        </Button>
      </View>
    );
  }
  
  const handleLogin = async () => {
    setLoading(true);
    if (!email || !password) {
      alert("Por favor ingrese todos los datos");
      setLoading(false);
      return;
    }
    try {
      const result = await signInWithEmailAndPassword(email, password);
      setLoading(false);
      setIsLoggedIn(true);
    } catch (err) {
      alert("Correo o Contraseña Incorrecta");
      console.log(err);
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    setLoading(true);
    if (!email || !password || !name) {
      alert("Por favor ingrese todos los datos");
      setLoading(false);
      return;
    }
    try {
      const result = await createUserWithEmailAndPassword(email, password);
      setLoading(false);

      // Actualiza el nombre del usuario
      await updateUserName(name);

      // Navega a la siguiente pantalla
      setIsLoggedIn(true);
    } catch (err) {
      alert("Correo o Contraseña Incorrecta");
      console.log(err);
      setLoading(false);
    }
  };


  return (
    <KeyboardAvoidingView behavior="position">
      <View style={styles.container1}>
        <View style={[styles.container2, { justifyContent: "flex-start" }]}>
          <Text style={styles.title}>Iniciar Sesión</Text>
          <TextInput
            style={styles.input}
            placeholder="Correo electrónico"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />
          <Button
            style={[
              styles.button,
              {
                backgroundColor: "#0000ff",
                height: 40,
                width: "100%",
                borderRadius: 5,
                alignItems: "center",
                justifyContent: "center",
              },
            ]}
            onPress={handleLogin}
          >
            <Text style={[styles.buttonText, { color: "#ffffff", fontSize: 18, fontWeight: "bold" }]}>
              Iniciar Sesión
            </Text>
          </Button>
          <Text style={[styles.text, { color: "#FFFFFF", fontSize: 16, fontWeight: "normal" }]}>

            ¿No tienes una cuenta? <Text style={[styles.paragraph, { color: "#FFFFFF", fontSize: 18, fontWeight: "bold" }]} onPress={handleRegister}>Crea una aquí</Text>
          </Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}