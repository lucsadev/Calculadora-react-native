import {StyleSheet} from 'react-native';

export const colors = {
  darkGray: '#2D2D2D',
  lightGray: '#9B9B9B',
  orange: '#FF9427',
  textPrimary: '#FFF',
  textSecondary: '#666666',
  background: '#000',
};

export const styles = StyleSheet.create({
  background: {
    backgroundColor: colors.background,
    flex: 1,
  },

  // Calculator Screen
  calculatorContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-end',
  },
  displayContainer: {paddingHorizontal: 30, paddingBottom: 20},
  mainResult: {
    color: colors.textPrimary,
    fontSize: 70,
    fontWeight: '400',
    textAlign: 'right',
    marginBottom: 10,
  },
  subResult: {
    color: colors.textSecondary,
    fontSize: 40,
    fontWeight: '300',
    textAlign: 'right',
  },

  // Calculator Buttons
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    rowGap: 15,
    columnGap: 15,
  },
  button: {
    height: 80,
    width: 80,
    justifyContent: 'center',
    backgroundColor: colors.darkGray,
    borderRadius: 100,
  },
  buttonText: {
    color: colors.textPrimary,
    fontSize: 30,
    fontWeight: '500',
    textAlign: 'center',
    padding: 10,
  },
});
