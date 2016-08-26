import { StyleSheet } from 'react-native';


const mainStylesheet = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
    },
    textContainer: {
        flex: 3,
    },
    welcome: {
        fontSize: 24,
        textAlign: 'center',
        margin: 16,
        flex: 2,
    },
    instructions: {
        fontSize: 14,
        textAlign: 'center',
        color: '#333333',
        marginBottom: 8,
        flex: 1,
    },
    bold: {
        fontWeight: 'bold',
    },
});
export default mainStylesheet;
