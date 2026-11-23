import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/types';
import { TextField } from '@/components/ui/TextField';
import { Button } from '@/components/ui/Button';
import { PaginationDots } from '@/components/ui/PaginationDots';
import { loginSchema } from '@/utils/validation';
import { useAppDispatch } from '@/store/hooks';
import { loginSuccess } from '@/store/slices/authSlice';
import { Mail, Lock } from 'lucide-react-native';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
      const fieldErrors: { email?: string; password?: string } = {};
      result.error.issues.forEach((err) => {
        if (err.path[0] === 'email') fieldErrors.email = err.message;
        if (err.path[0] === 'password') fieldErrors.password = err.message;
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
          id: 'user-1',
          fullName: 'Eugenia Babajanyan',
          email,
          role: 'seeker',
          professionalTitle: 'Full-Stack Developer',
          location: 'Algiers, Algeria',
          memberSince: '2026',
        })
      );
      navigation.replace('Main', { screen: 'Feed' });
    }, 800);
  };

  return (
    <SafeAreaView edges={['top', 'bottom', 'left', 'right']} style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between' }}
        className="px-6 py-4"
        keyboardShouldPersistTaps="handled"
      >
        <View className="items-center">
          <View className="w-56 h-48 items-center justify-center my-2">
            <Image
              source={require('@/assets/images/login-illustration.png')}
              className="w-full h-full"
              resizeMode="contain"
            />
          </View>

          <Text className="text-[28px] font-bold text-black text-center mb-6">
            Welcome Back!
          </Text>

          <View className="w-full gap-4 mb-3">
            <TextField
              placeholder="Email"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
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
                if (errors.password)
                  setErrors((prev) => ({ ...prev, password: undefined }));
              }}
              secureTextEntry
              error={errors.password}
              rightIcon={<Lock size={20} color="#9CA3AF" />}
            />
          </View>

          <View className="w-full flex-row items-center justify-end my-2">
            <TouchableOpacity
              onPress={() => setRememberMe(!rememberMe)}
              className="flex-row items-center mr-1"
            >
              <Text className="text-[13px] text-[#9CA3AF]">Remember Me / </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('ForgotPassword')}
            >
              <Text className="text-[13px] font-semibold text-[#7E5DF6]">
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="items-center gap-4 mt-6">
          <Button
            title="Log In"
            onPress={handleLogin}
            loading={loading}
            fullWidth
            size="lg"
          />

          <View className="flex-row items-center justify-center">
            <Text className="text-[14px] text-[#9CA3AF]">
              Don't have an account?{' '}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text className="text-[14px] font-semibold text-[#7E5DF6]">
                Create Account
              </Text>
            </TouchableOpacity>
          </View>

          <View className="my-2">
            <PaginationDots total={2} activeIndex={1} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
