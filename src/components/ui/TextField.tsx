import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  TextInputProps,
} from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';

interface TextFieldProps extends TextInputProps {
  label?: string;
  error?: string;
  rightIcon?: React.ReactNode;
  containerClassName?: string;
}

export const TextField: React.FC<TextFieldProps> = ({
  label,
  error,
  rightIcon,
  secureTextEntry,
  containerClassName = '',
  ...props
}) => {
  const [isSecure, setIsSecure] = useState(secureTextEntry);

  return (
    <View className={`w-full ${containerClassName}`}>
      <View
        className={`w-full h-[60px] bg-white border rounded-[24px] px-5 flex-row items-center justify-between ${
          error ? 'border-red-400' : 'border-[#E1E3E4]'
        }`}
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.04,
          shadowRadius: 8,
          elevation: 2,
        }}
      >
        <TextInput
          className="flex-1 text-[15px] text-[#1F2937] font-medium pr-2 py-0"
          placeholderTextColor="#9CA3AF"
          secureTextEntry={isSecure}
          {...props}
        />

        {secureTextEntry ? (
          <TouchableOpacity
            onPress={() => setIsSecure(!isSecure)}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            {isSecure ? (
              <EyeOff size={20} color="#9CA3AF" />
            ) : (
              <Eye size={20} color="#7E5DF6" />
            )}
          </TouchableOpacity>
        ) : (
          rightIcon && <View className="ml-2">{rightIcon}</View>
        )}
      </View>

      {error ? (
        <Text className="text-red-500 text-xs mt-1.5 ml-4 font-medium">
          {error}
        </Text>
      ) : null}
    </View>
  );
};
