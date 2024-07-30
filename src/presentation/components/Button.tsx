/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {Pressable, Text} from 'react-native';
import {colors, styles} from '../../config/theme/app-theme';

type Props = {
  label: string;
  color?: string;
  large?: boolean;
  blackText?: boolean;
  onPress: () => void;
};

export const Button = ({
  blackText,
  label,
  large,
  color = colors.darkGray,
  onPress,
}: Props) => {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        styles.button,
        {
          backgroundColor: color,
          width: large ? 175 : 80,
          opacity: pressed ? 0.8 : 1,
        },
      ]}>
      <Text style={[styles.buttonText, {color: blackText ? 'black' : 'white'}]}>
        {label}
      </Text>
    </Pressable>
  );
};
