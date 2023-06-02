import { StyleSheet } from "react-native";

 export const styles = StyleSheet.create({
    container: {
        backgroundColor: '#666075',
        padding: 16,
        display: 'flex',
        justifyContent: 'center'
    },
    header: {
        color: '#FFFFFF',
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    buttonContainer: {
        rowGap: 10
    },
    textInput: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
        marginRight: 8,
    },
    historyItem: {
        color: '#FFFFFF',
        fontSize: 18,
        marginBottom: 8,
    },
    response: {
        color: '#fff',
        fontSize: 18,
        marginBottom: 15,
        whiteSpace: 'inherit',
        marginTop: 15,
    },
    title: {
        fontSize: 22,
        margin: '10px 0',
        color: '#fff',
    },
});
