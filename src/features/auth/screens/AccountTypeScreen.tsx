import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation/types';
import { RoleCard } from '../../../components/ui/RoleCard';
import { Button } from '../../../components/ui/Button';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setSelectedRole } from '../../../store/slices/authSlice';

type Props = NativeStackScreenProps<RootStackParamList, 'AccountType'>;

export const AccountTypeScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const selectedRole = useAppSelector((state) => state.auth.selectedRole);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        className="px-6 py-6 justify-between"
      >
        <View className="items-center">
          {/* Header Illustration from Figma */}
          <View className="w-56 h-56 items-center justify-center mb-4">
            <Image
              source={require('../../../assets/images/account-type-illustration.png')}
              className="w-full h-full"
              resizeMode="contain"
            />
          </View>

          {/* Heading */}
          <Text className="text-[26px] font-bold text-black text-center mb-1">
            Choose Your Account Type
          </Text>
          <Text className="text-[15px] text-[#6B7280] text-center mb-6">
            How would you like to use Point 43?
          </Text>

          {/* Role Cards */}
          <RoleCard
            title="Solution Seeker"
            description="I want to explore challenges, collaborate with others, and submit innovative solutions."
            selected={selectedRole === 'seeker'}
            onSelect={() => dispatch(setSelectedRole('seeker'))}
          />

          <RoleCard
            title="Challenge Provider"
            description="I represent a company, organization, or individual looking to share challenges and find innovative solutions."
            selected={selectedRole === 'provider'}
            onSelect={() => dispatch(setSelectedRole('provider'))}
          />
        </View>

        {/* Action Buttons matching Figma: return & next */}
        <View className="flex-row items-center justify-center gap-4 mt-6 mb-2">
          <Button
            title="return"
            onPress={() => navigation.goBack()}
            variant="outline"
            style={{ width: 130 }}
          />
          <Button
            title="next"
            onPress={() => navigation.navigate('Login')}
            variant="primary"
            style={{ width: 130 }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
