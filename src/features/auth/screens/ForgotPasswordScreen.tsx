import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation/types';
import { TextField } from '../../../components/ui/TextField';
import { Button } from '../../../components/ui/Button';
import { PaginationDots } from '../../../components/ui/PaginationDots';
import { forgotPasswordSchema } from '../../../utils/validation';
import { Mail } from 'lucide-react-native';

type Props = NativeStackScreenProps<RootStackParamList, 'ForgotPassword'>;

export const ForgotPasswordScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);

  const handleVerifyEmail = () => {
    const result = forgotPasswordSchema.safeParse({ email });
    if (!result.success) {
      setError(result.error.issues[0]?.message);
      return;
    }

    setError(undefined);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigation.navigate('ResetPassword', { email });
    }, 600);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        className="px-6 py-6 justify-between"
        keyboardShouldPersistTaps="handled"
      >
        <View className="items-center">
          {/* Illustration from Figma */}
          <View className="w-56 h-56 items-center justify-center mb-2">
            <Image
              source={require('../../../assets/images/forgot-pwd-illustration.png')}
              className="w-full h-full"
              resizeMode="contain"
            />
          </View>

          {/* Heading */}
          <Text className="text-[28px] font-bold text-black text-center mb-1">
            Forgot Password
          </Text>
          <Text className="text-[15px] text-[#6B7280] text-center mb-6">
            Enter your email to reset your password.
          </Text>

          {/* Form */}
          <View className="w-full">
            <TextField
              placeholder="Email"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (error) setError(undefined);
              }}
              keyboardType="email-address"
              autoCapitalize="none"
              error={error}
              rightIcon={<Mail size={20} color="#9CA3AF" />}
            />
          </View>
        </View>

        {/* Footer Actions matching Figma: return & Verify Email */}
        <View className="items-center gap-5 mt-6 mb-2">
          <View className="flex-row items-center justify-center gap-4 w-full">
            <Button
              title="return"
              onPress={() => navigation.goBack()}
              variant="outline"
              style={{ width: 130 }}
            />
            <Button
              title="Verify Email"
              onPress={handleVerifyEmail}
              variant="primary"
              loading={loading}
              style={{ width: 140 }}
            />
          </View>

          <PaginationDots total={2} activeIndex={0} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
