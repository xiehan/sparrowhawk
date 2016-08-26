import { StyleSheet } from 'react-native';


const settingsStylesheet = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        padding: 16,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'nowrap',
        textAlign: 'left',
        textAlignVertical: 'center',
        paddingVertical: 8,
    },
    rowText: {
        textAlign: 'left',
        textAlignVertical: 'center',
    },
});
export default settingsStylesheet;
