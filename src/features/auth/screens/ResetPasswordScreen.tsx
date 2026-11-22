import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/types';
import { TextField } from '@/components/ui/TextField';
import { Button } from '@/components/ui/Button';
import { PaginationDots } from '@/components/ui/PaginationDots';
import { resetPasswordSchema } from '@/utils/validation';
import { Lock } from 'lucide-react-native';

type Props = NativeStackScreenProps<RootStackParamList, 'ResetPassword'>;

export const ResetPasswordScreen: React.FC<Props> = ({ navigation }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{ password?: string; confirmPassword?: string }>({});
  const [loading, setLoading] = useState(false);

  const handleResetPassword = () => {
    const result = resetPasswordSchema.safeParse({ password, confirmPassword });
    if (!result.success) {
      const fieldErrors: { password?: string; confirmPassword?: string } = {};
      result.error.issues.forEach((err) => {
        if (err.path[0] === 'password') fieldErrors.password = err.message;
        if (err.path[0] === 'confirmPassword') fieldErrors.confirmPassword = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigation.replace('Login');
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
          <View className="w-56 h-56 items-center justify-center mb-2">
            <Image
              source={require('@/assets/images/reset-pwd-illustration.png')}
              className="w-full h-full"
              resizeMode="contain"
            />
          </View>

          <Text className="text-[28px] font-bold text-black text-center mb-1">
            Reset Password
          </Text>
          <Text className="text-[15px] text-[#6B7280] text-center mb-6">
            Create a new password.
          </Text>

          <View className="w-full gap-4">
            <TextField
              placeholder="New Password"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                if (errors.password)
                  setErrors((prev) => ({ ...prev, password: undefined }));
              }}
              secureTextEntry
              error={errors.password}
              rightIcon={<Lock size={20} color="#9CA3AF" />}
            />

            <TextField
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={(text) => {
                setConfirmPassword(text);
                if (errors.confirmPassword)
                  setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
              }}
              secureTextEntry
              error={errors.confirmPassword}
              rightIcon={<Lock size={20} color="#9CA3AF" />}
            />
          </View>
        </View>

        <View className="items-center gap-5 mt-6 mb-2">
          <Button
            title="Create a new password."
            onPress={handleResetPassword}
            variant="primary"
            loading={loading}
            fullWidth
            size="lg"
          />

          <PaginationDots total={2} activeIndex={1} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
