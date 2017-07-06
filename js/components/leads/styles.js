
const React = require('react-native');
import { PixelRatio } from 'react-native';

const { StyleSheet } = React;
export default {
  container: {
    backgroundColor: '#FBFAFA',
  },
  avatarContainer: {
    borderColor: '#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    borderRadius: 75,
    width: 150,
    height: 150
  }
};
