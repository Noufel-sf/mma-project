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
import { Button } from '@/components/ui/Button';
import { PaginationDots } from '@/components/ui/PaginationDots';

type Props = NativeStackScreenProps<RootStackParamList, 'ProfessionalBackground'>;

const skillOptions = [
  'Artificial Intelligence',
  'Mobile Development',
  'Cloud Architecture',
  'IoT & Robotics',
  'UI/UX Design',
  'Data Science',
  'Cybersecurity',
  'Blockchain',
];

export const ProfessionalBackgroundScreen: React.FC<Props> = ({ navigation }) => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([
    'Artificial Intelligence',
    'Mobile Development',
  ]);

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  return (
    <SafeAreaView edges={['top', 'bottom', 'left', 'right']} style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between' }}
        className="px-6 py-4"
      >
        <View className="items-center">
          <View className="w-56 h-48 items-center justify-center my-2">
            <Image
              source={require('@/assets/images/background-info-illustration.png')}
              className="w-full h-full"
              resizeMode="contain"
            />
          </View>

          <Text className="text-[24px] font-bold text-black text-center mb-2">
            Your Professional Background
          </Text>
          <Text className="text-[14px] text-[#6B7280] text-center mb-5 px-2 leading-[22px]">
            Build your professional profile by selecting your skills and areas of interest to help us personalize your challenges.
          </Text>

          <View className="w-full flex-row flex-wrap gap-2.5 justify-center mb-4">
            {skillOptions.map((skill) => {
              const isSelected = selectedSkills.includes(skill);
              return (
                <TouchableOpacity
                  key={skill}
                  activeOpacity={0.8}
                  onPress={() => toggleSkill(skill)}
                  className={`px-4 py-2.5 rounded-full border ${
                    isSelected
                      ? 'bg-[#7E5DF6] border-[#7E5DF6]'
                      : 'bg-white border-[#E8EFF3]'
                  }`}
                >
                  <Text
                    className={`text-xs font-semibold ${
                      isSelected ? 'text-white' : 'text-[#4B5563]'
                    }`}
                  >
                    {skill}
                  </Text>
                </TouchableOpacity>
              );
            })}
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
              title="finish"
              onPress={() => navigation.replace('Main', { screen: 'Feed' })}
              variant="primary"
              style={{ width: 130 }}
            />
          </View>

          <View className="my-1">
            <PaginationDots total={7} activeIndex={3} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
