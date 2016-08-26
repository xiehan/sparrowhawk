import { StyleSheet } from 'react-native';


const settingsStylesheet = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        padding: 16,
        paddingTop: 32,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    rowContainer: {
        flex: 0,
        flexDirection: 'column',
        paddingTop: 16,
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'nowrap',
        textAlign: 'left',
        textAlignVertical: 'center',
        paddingVertical: 4,
    },
    rowText: {
        textAlign: 'left',
        textAlignVertical: 'center',
    },
    cardCount: {
        fontWeight: 'bold',
        fontSize: 18,
        lineHeight: 28,
    },
});
export default settingsStylesheet;
