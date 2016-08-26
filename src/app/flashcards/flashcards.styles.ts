import { StyleSheet } from 'react-native';
// import theme from '../ui/material.helper';


const flashCardsStylesheet = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        padding: 16,
        backgroundColor: 'rgba(0, 0, 0, 0.56)',
    },
    loading: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
});
export default flashCardsStylesheet;
