import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  disabled = false,
  style,
  textStyle,
}) => {
  const isPrimary = variant === 'primary';

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled || loading}
      className={`items-center justify-center rounded-[24px] ${
        isPrimary
          ? 'bg-[#7E5DF6]'
          : 'bg-white border-[1.5px] border-[#E8EFF3]'
      } ${
        size === 'sm'
          ? 'px-4 py-2 min-h-[42px]'
          : size === 'lg'
          ? 'px-12 py-[18px] min-h-[58px]'
          : 'px-8 py-[16px] min-h-[54px]'
      } ${fullWidth ? 'w-full' : ''} ${disabled ? 'opacity-50' : ''}`}
      style={style}
    >
      {loading ? (
        <ActivityIndicator color={isPrimary ? '#FFFFFF' : '#7E5DF6'} />
      ) : (
        <Text
          className={`font-semibold text-center ${
            isPrimary ? 'text-white' : 'text-[#1F2937]'
          } ${size === 'sm' ? 'text-sm' : 'text-[17px]'}`}
          style={textStyle}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};
