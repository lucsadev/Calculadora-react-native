import React from 'react';
import {View} from 'react-native';
import {CalculatorScreen} from './presentation/screens';
import {styles} from './config/theme/app-theme';

export const App = () => {
  return (
    <View style={styles.background}>
      <CalculatorScreen />
    </View>
  );
};
