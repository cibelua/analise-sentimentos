import React, { useState } from "react";
import { View, Text, TextInput, Button, FlatList, Image } from "react-native";
import { styles } from "./styles";

const App = () => {
  const [message, setMessage] = useState("");
  const [history, setHistory] = useState([]);
  const [currentResponse, setCurrentResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    if (message) {
      const body = { texto: message };
      setLoading(true);

      const response = await fetch("http://localhost:4000/question", {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const text = await response.json();

      setLoading(false);
      setCurrentResponse(text?.resposta);
      setHistory((prevHistory) => [...prevHistory, message]);
      setMessage("");
    }
  };

  const handleClearHistory = () => {
    setHistory("");
    setCurrentResponse("");
  };

  const handleHistory = async (historyText) => {
    setLoading(true);
    setMessage(historyText);
    const body = { texto: historyText };

    const response = await fetch("http://localhost:4000/question", {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const text = await response.json();
    setLoading(false);
    setCurrentResponse(text?.resposta);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}> Seja bem - vindo(a)!</Text>
      <Text style={styles.header}> Digite seu sentimento atual! </Text>
      <Image
        style={{
          height: 200,
          width: 200,
          marginLeft: "auto",
          marginRight: -20,
        }}
        source={require("../src/img/robo.png")}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={message}
          onChangeText={(text) => setMessage(text)}
          placeholder="Digite uma mensagem"
          placeholderTextColor="#9E9DA0"
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Enviar"
          onPress={handleSendMessage}
          color="#2A8359"
          disabled={loading}
        />
        <Button title="Limpar" onPress={handleClearHistory} color="#8B0000" />
      </View>
      {currentResponse && (
        <Text style={styles.response}>
          Resposta: {loading ? "carregando..." : currentResponse}
        </Text>
      )}
      {!!history.length && <Text style={styles.title}>Histórico:</Text>}
      <FlatList
        data={history}
        renderItem={({ item }) => (
          <Text onPress={() => handleHistory(item)} style={styles.historyItem}>
            {" "}
            - {item}{" "}
          </Text>
        )}
        keyExtractor={(item, index) => index.toString()}
      />{" "}
    </View>
  );
};

export default App;
