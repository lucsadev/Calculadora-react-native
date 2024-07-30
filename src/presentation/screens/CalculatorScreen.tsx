/* eslint-disable react/react-in-jsx-scope */
import {Text, View} from 'react-native';
import {colors, styles} from '../../config/theme/app-theme';
import {Button} from '../components';
import {useCalculator} from '../hooks/useCalculator';

export const CalculatorScreen = () => {
  const {
    addOperation,
    buildNumber,
    calculateResult,
    clean,
    deleteDigit,
    divideOperation,
    formula,
    multiplyOperation,
    prevNumber,
    subtractOperation,
    toggleSign,
  } = useCalculator();

  const {
    calculatorContainer,
    displayContainer,
    mainResult,
    subResult,
    buttonRow,
  } = styles;
  const {lightGray, orange} = colors;

  return (
    <View style={calculatorContainer}>
      <View style={displayContainer}>
        <Text adjustsFontSizeToFit numberOfLines={1} style={mainResult}>
          {formula}
        </Text>
        {prevNumber === formula ? null : (
          <Text adjustsFontSizeToFit numberOfLines={1} style={subResult}>
            {prevNumber === '0' ? '' : prevNumber}
          </Text>
        )}
      </View>
      <View style={buttonRow}>
        <Button onPress={clean} label={'C'} color={lightGray} blackText />
        <Button
          onPress={toggleSign}
          label={'+/-'}
          color={lightGray}
          blackText
        />
        <Button
          onPress={deleteDigit}
          label={'del'}
          color={lightGray}
          blackText
        />
        <Button onPress={divideOperation} label={'÷'} color={orange} />
        <Button onPress={() => buildNumber('7')} label={'7'} />
        <Button onPress={() => buildNumber('8')} label={'8'} />
        <Button onPress={() => buildNumber('9')} label={'9'} />
        <Button onPress={multiplyOperation} label={'X'} color={orange} />
        <Button onPress={() => buildNumber('4')} label={'4'} />
        <Button onPress={() => buildNumber('5')} label={'5'} />
        <Button onPress={() => buildNumber('6')} label={'6'} />
        <Button onPress={subtractOperation} label={'-'} color={orange} />
        <Button onPress={() => buildNumber('1')} label={'1'} />
        <Button onPress={() => buildNumber('2')} label={'2'} />
        <Button onPress={() => buildNumber('3')} label={'3'} />
        <Button onPress={addOperation} label={'+'} color={orange} />
        <Button onPress={() => buildNumber('0')} label={'0'} large />
        <Button onPress={() => buildNumber('.')} label={'.'} />
        <Button onPress={calculateResult} label={'='} color={orange} />
      </View>
    </View>
  );
};
