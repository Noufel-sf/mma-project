import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/types';
import { TextField } from '@/components/ui/TextField';
import { Button } from '@/components/ui/Button';
import { PaginationDots } from '@/components/ui/PaginationDots';
import { Camera, Globe, Briefcase } from 'lucide-react-native';

type Props = NativeStackScreenProps<RootStackParamList, 'CompleteProfile'>;

export const CompleteProfileScreen: React.FC<Props> = ({ navigation }) => {
  const [country, setCountry] = useState('Algeria');
  const [headline, setHeadline] = useState('');
  const [photoAdded, setPhotoAdded] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        className="px-6 py-4 justify-between"
        keyboardShouldPersistTaps="handled"
      >
        <View className="items-center">
          {/* Hero Illustration from Figma */}
          <View className="w-52 h-44 items-center justify-center my-2">
            <Image
              source={require('@/assets/images/complete-profile-illustration.png')}
              className="w-full h-full"
              resizeMode="contain"
            />
          </View>

          {/* Heading */}
          <Text className="text-[26px] font-bold text-black text-center mb-1">
            Complete Your Profile
          </Text>
          <Text className="text-[14px] text-[#6B7280] text-center mb-5 px-4 leading-[20px]">
            Tell us a little about yourself to personalize your experience.
          </Text>

          {/* Form Fields */}
          <View className="w-full gap-4">
            {/* Photo Profile Button / Field */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setPhotoAdded(!photoAdded)}
              className="w-full h-[60px] bg-white border border-[#E1E3E4] rounded-[24px] px-5 flex-row items-center justify-between shadow-xs"
            >
              <Text className={`text-[15px] font-medium ${photoAdded ? 'text-[#1F2937]' : 'text-[#9CA3AF]'}`}>
                {photoAdded ? 'Profile Photo Selected ✓' : 'Profile Photo'}
              </Text>
              <View className="w-8 h-8 rounded-full bg-[#7E5DF6]/10 items-center justify-center">
                <Camera size={18} color="#7E5DF6" />
              </View>
            </TouchableOpacity>

            <TextField
              placeholder="Country"
              value={country}
              onChangeText={setCountry}
              rightIcon={<Globe size={20} color="#9CA3AF" />}
            />

            <TextField
              placeholder="Headline / Field of Study"
              value={headline}
              onChangeText={setHeadline}
              rightIcon={<Briefcase size={20} color="#9CA3AF" />}
            />
          </View>
        </View>

        {/* Footer Actions */}
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
              onPress={() => navigation.navigate('ProfessionalBackground')}
              variant="primary"
              style={{ width: 130 }}
            />
          </View>

          <View className="my-1">
            <PaginationDots total={7} activeIndex={1} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
