import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/types';
import { Button } from '@/components/ui/Button';
import { PaginationDots } from '@/components/ui/PaginationDots';
import { ShieldCheck } from 'lucide-react-native';

type Props = NativeStackScreenProps<RootStackParamList, 'OtpVerification'>;

export const OtpVerificationScreen: React.FC<Props> = ({ route, navigation }) => {
  const { email } = route.params;
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef<any[]>([]);

  const handleChangeText = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text.slice(-1);
    setCode(newCode);

    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const fullCode = code.join('');
    if (fullCode.length < 6) {
      Alert.alert('Incomplete Code', 'Please enter the full 6-digit verification code.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('ResetPassword', { email });
    }, 600);
  };

  const handleResend = () => {
    Alert.alert('Code Sent', `A new verification code has been sent to ${email}`);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        className="px-6 py-8 justify-between"
        keyboardShouldPersistTaps="handled"
      >
        <View className="items-center">
          {/* Top Badge Icon */}
          <View className="w-24 h-24 rounded-full bg-[#7E5DF6]/10 items-center justify-center my-6">
            <ShieldCheck size={48} color="#7E5DF6" />
          </View>

          {/* Heading */}
          <Text className="text-[28px] font-bold text-black text-center mb-2">
            Email Verification
          </Text>
          <Text className="text-[15px] text-[#6B7280] text-center mb-8 px-2 leading-[22px]">
            We've sent a verification code to{' '}
            <Text className="font-semibold text-black">{email || 'your email'}</Text>.
            Enter the code below to verify your account.
          </Text>

          {/* 6-Digit OTP Inputs */}
          <View className="flex-row items-center justify-center gap-2 mb-8">
            {code.map((digit, idx) => {
              const isFocused = idx === code.findIndex((c) => c === '') || (idx === 5 && digit !== '');
              return (
                <View
                  key={idx}
                  className={`w-12 h-14 rounded-2xl items-center justify-center border ${
                    digit
                      ? 'bg-white border-[#7E5DF6] shadow-sm'
                      : isFocused
                      ? 'bg-white border-[#7E5DF6]'
                      : 'bg-[#F2F4F8] border-[#D8DCE6]'
                  }`}
                >
                  <TextInput
                    ref={(el) => {
                      inputRefs.current[idx] = el;
                    }}
                    value={digit}
                    onChangeText={(text) => handleChangeText(text, idx)}
                    onKeyPress={(e) => handleKeyPress(e, idx)}
                    keyboardType="number-pad"
                    maxLength={1}
                    className="w-full h-full text-center text-xl font-bold text-[#141518]"
                    selectTextOnFocus
                  />
                </View>
              );
            })}
          </View>
        </View>

        {/* Footer Actions */}
        <View className="items-center gap-4 mb-2">
          <View className="flex-row items-center justify-center gap-4 w-full">
            <Button
              title="return"
              onPress={() => navigation.goBack()}
              variant="outline"
              style={{ width: 130 }}
            />
            <Button
              title="Verify Email"
              onPress={handleVerify}
              variant="primary"
              loading={loading}
              style={{ width: 140 }}
            />
          </View>

          {/* Resend Code Link */}
          <View className="flex-row items-center justify-center mt-2">
            <Text className="text-[14px] text-[#9CA3AF]">
              Didn't receive the code?{' '}
            </Text>
            <TouchableOpacity onPress={handleResend}>
              <Text className="text-[14px] font-semibold text-[#7E5DF6]">
                Resend Code
              </Text>
            </TouchableOpacity>
          </View>

          <View className="my-2">
            <PaginationDots total={3} activeIndex={1} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
