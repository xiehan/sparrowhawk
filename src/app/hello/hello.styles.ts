import { StyleSheet } from 'react-native';


const helloStylesheet = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    button: {
        width: 100,
        textAlign: 'center',
        textAlignVertical: 'center',
        backgroundColor: '#32BAF5',
        padding: 10,
        margin: 20,
        color: 'white',
    },
    image: {
        height: 100,
        width: 100,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
    },
});
export default helloStylesheet;
