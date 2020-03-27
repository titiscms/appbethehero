import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: Constants.statusBarHeight + 20,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  headerText: {
    fontSize: 15,
    color: '#737380',
  },

  headerTextBold: {
    fontWeight: 'bold',
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 48,
    color: '#13131a',
  },

  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#737380',
  },

  incidentsList: {
    marginTop: 32,
  },

  incident: {
    padding: 24,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: '#ffffff',
    paddingBottom: 0,
  },

  incidentDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  incidentProperty: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#737380',
  },

  incidentValue: {
    marginTop: 8,
    marginBottom: 24,
    fontSize: 15,
    color: '#737380',
  },

  detailsButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  detailsButtonText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#e02041',
  },

  boxButton: {
    marginBottom: 16,
    marginTop: 1,
    padding: 24,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    backgroundColor: '#ffffff',
  }
});