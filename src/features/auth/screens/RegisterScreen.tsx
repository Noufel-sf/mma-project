import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/types';
import { TextField } from '@/components/ui/TextField';
import { Button } from '@/components/ui/Button';
import { PaginationDots } from '@/components/ui/PaginationDots';
import { registerSchema } from '@/utils/validation';
import { useAppDispatch } from '@/store/hooks';
import { loginSuccess } from '@/store/slices/authSlice';
import { User as UserIcon, Mail, Lock } from 'lucide-react-native';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

export const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleRegister = () => {
    const result = registerSchema.safeParse({
      fullName,
      email,
      password,
      confirmPassword,
    });

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        const fieldName = err.path[0] as string;
        fieldErrors[fieldName] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      dispatch(
        loginSuccess({
          id: 'user-new',
          fullName,
          email,
          role: 'seeker',
          professionalTitle: 'Solution Seeker',
          location: 'Algeria',
          memberSince: '2026',
        })
      );
      navigation.navigate('CompleteProfile');
    }, 800);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        className="px-6 py-4 justify-between"
        keyboardShouldPersistTaps="handled"
      >
        <View className="items-center">
          <View className="w-52 h-44 items-center justify-center my-2">
            <Image
              source={require('@/assets/images/register-illustration.png')}
              className="w-full h-full"
              resizeMode="contain"
            />
          </View>

          <Text className="text-[26px] font-bold text-black text-center mb-1">
            Create Your Account
          </Text>
          <Text className="text-[14px] text-[#6B7280] text-center mb-5 px-4">
            Join our community and start exploring new opportunities.
          </Text>

          <View className="w-full gap-3.5">
            <TextField
              placeholder="Full Name"
              value={fullName}
              onChangeText={(text) => {
                setFullName(text);
                if (errors.fullName) {
                  setErrors((prev) => {
                    const copy = { ...prev };
                    delete copy.fullName;
                    return copy;
                  });
                }
              }}
              error={errors.fullName}
              rightIcon={<UserIcon size={20} color="#9CA3AF" />}
            />

            <TextField
              placeholder="Email Address"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (errors.email) {
                  setErrors((prev) => {
                    const copy = { ...prev };
                    delete copy.email;
                    return copy;
                  });
                }
              }}
              keyboardType="email-address"
              autoCapitalize="none"
              error={errors.email}
              rightIcon={<Mail size={20} color="#9CA3AF" />}
            />

            <TextField
              placeholder="Password"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                if (errors.password) {
                  setErrors((prev) => {
                    const copy = { ...prev };
                    delete copy.password;
                    return copy;
                  });
                }
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
                if (errors.confirmPassword) {
                  setErrors((prev) => {
                    const copy = { ...prev };
                    delete copy.confirmPassword;
                    return copy;
                  });
                }
              }}
              secureTextEntry
              error={errors.confirmPassword}
              rightIcon={<Lock size={20} color="#9CA3AF" />}
            />
          </View>
        </View>

        <View className="items-center gap-4 mt-6 mb-2">
          <View className="flex-row items-center justify-center gap-4 w-full">
            <Button
              title="return"
              onPress={() => navigation.goBack()}
              variant="outline"
              style={{ width: 130 }}
            />
            <Button
              title="next"
              onPress={handleRegister}
              variant="primary"
              loading={loading}
              style={{ width: 130 }}
            />
          </View>

          <View className="flex-row items-center justify-center">
            <Text className="text-[14px] text-[#9CA3AF]">
              Already have an account?{' '}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text className="text-[14px] font-semibold text-[#7E5DF6]">
                Log In
              </Text>
            </TouchableOpacity>
          </View>

          <View className="my-1">
            <PaginationDots total={7} activeIndex={0} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
