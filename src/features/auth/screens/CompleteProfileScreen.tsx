import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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
    <SafeAreaView edges={['top', 'bottom', 'left', 'right']} style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between' }}
        className="px-6 py-4"
        keyboardShouldPersistTaps="handled"
      >
        <View className="items-center">
          <View className="w-52 h-44 items-center justify-center my-2">
            <Image
              source={require('@/assets/images/complete-profile-illustration.png')}
              className="w-full h-full"
              resizeMode="contain"
            />
          </View>

          <Text className="text-[26px] font-bold text-black text-center mb-1">
            Complete Your Profile
          </Text>
          <Text className="text-[14px] text-[#6B7280] text-center mb-5 px-4 leading-[20px]">
            Tell us a little about yourself to personalize your experience.
          </Text>

          <View className="w-full gap-4">
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setPhotoAdded(!photoAdded)}
              className="w-full h-[60px] bg-white border border-[#E1E3E4] rounded-[24px] px-5 flex-row items-center justify-between"
              style={{ elevation: 1 }}
            >
              <Text className={`text-[15px] font-medium ${photoAdded ? 'text-[#1F2937]' : 'text-[#9CA3AF]'}`}>
                {photoAdded ? 'Profile Photo Selected ✓' : 'Profile Photo'}
              </Text>
              <View
                className="w-8 h-8 rounded-full items-center justify-center"
                style={{ backgroundColor: 'rgba(126, 93, 246, 0.1)' }}
              >
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
