import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/types';
import { useAppSelector } from '@/store/hooks';
import { Button } from '@/components/ui/Button';
import {
  ArrowLeft,
  Trophy,
  Calendar,
  Users,
  ShieldCheck,
  CheckCircle,
} from 'lucide-react-native';

type Props = NativeStackScreenProps<RootStackParamList, 'ChallengeDetail'>;

export const ChallengeDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { challengeId } = route.params;
  const challenge = useAppSelector((state) =>
    state.challenges.challenges.find((c) => c.id === challengeId)
  );
  const [submitted, setSubmitted] = useState(false);

  if (!challenge) {
    return (
      <SafeAreaView edges={['top', 'bottom', 'left', 'right']} style={{ flex: 1, backgroundColor: '#FFFFFF' }} className="items-center justify-center p-6">
        <Text className="text-lg font-bold text-black mb-4">
          Challenge not found
        </Text>
        <Button title="Go Back" onPress={() => navigation.goBack()} />
      </SafeAreaView>
    );
  }

  const handleSubmit = () => {
    setSubmitted(true);
    Alert.alert(
      'Solution Submitted!',
      'Your innovative proposal has been securely registered with Point.43. The provider will review your submission.',
      [{ text: 'Great' }]
    );
  };

  return (
    <SafeAreaView edges={['top', 'bottom', 'left', 'right']} style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <View className="flex-row items-center justify-between px-6 py-4 border-b border-[#F3F4F6]">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="p-2 -ml-2 rounded-full"
        >
          <ArrowLeft size={22} color="#111827" />
        </TouchableOpacity>
        <Text className="text-base font-semibold text-[#111827]">
          Challenge Overview
        </Text>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView className="flex-1 px-6 py-5">
        <View className="flex-row items-center justify-between mb-3">
          <View className="bg-[rgba(126,93,246,0.12)] px-3 py-1 rounded-full">
            <Text className="text-[#7E5DF6] text-xs font-semibold">
              {challenge.category}
            </Text>
          </View>
          <View className="bg-[#10B981]/10 px-3 py-1 rounded-full flex-row items-center gap-1">
            <ShieldCheck size={14} color="#10B981" />
            <Text className="text-[#10B981] text-xs font-semibold">
              Verified Provider
            </Text>
          </View>
        </View>

        <Text className="text-2xl font-bold text-[#111827] mb-2 leading-8">
          {challenge.title}
        </Text>

        <Text className="text-xs text-[#6B7280] mb-5">
          Posted by <Text className="font-semibold text-black">{challenge.providerName}</Text>
        </Text>

        <View className="bg-[#7E5DF6]/5 border border-[#7E5DF6]/20 rounded-2xl p-4 flex-row justify-around items-center mb-6">
          <View className="items-center">
            <Trophy size={20} color="#7E5DF6" />
            <Text className="text-xs text-[#6B7280] mt-1">Prize Award</Text>
            <Text className="text-base font-bold text-black">{challenge.reward}</Text>
          </View>
          <View className="w-px h-8 bg-[#E5E7EB]" />
          <View className="items-center">
            <Calendar size={20} color="#7E5DF6" />
            <Text className="text-xs text-[#6B7280] mt-1">Timeline</Text>
            <Text className="text-base font-bold text-black">{challenge.daysLeft} Days</Text>
          </View>
          <View className="w-px h-8 bg-[#E5E7EB]" />
          <View className="items-center">
            <Users size={20} color="#7E5DF6" />
            <Text className="text-xs text-[#6B7280] mt-1">Innovators</Text>
            <Text className="text-base font-bold text-black">{challenge.participantsCount}</Text>
          </View>
        </View>

        <View className="mb-6">
          <Text className="text-lg font-bold text-black mb-2">Description</Text>
          <Text className="text-[15px] text-[#4B5563] leading-[24px]">
            {challenge.description}
          </Text>
        </View>

        <View className="mb-6">
          <Text className="text-lg font-bold text-black mb-3">Key Deliverables</Text>
          {[
            'Architecture & system blueprint design',
            'Functional prototype or working demo repository',
            'Technical documentation and deployment guide',
          ].map((item, idx) => (
            <View key={idx} className="flex-row items-center gap-2 mb-2.5">
              <CheckCircle size={16} color="#7E5DF6" />
              <Text className="text-sm text-[#4B5563] flex-1">{item}</Text>
            </View>
          ))}
        </View>

        <View className="mb-8">
          <Text className="text-lg font-bold text-black mb-3">Required Skills</Text>
          <View className="flex-row flex-wrap gap-2">
            {challenge.tags.map((tag, idx) => (
              <View key={idx} className="bg-[#F3F4F6] px-3 py-1.5 rounded-full">
                <Text className="text-xs font-medium text-[#4B5563]">#{tag}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <View className="p-5 border-t border-[#F3F4F6] bg-white">
        <Button
          title={submitted ? 'Solution Submitted ✓' : 'Submit Solution'}
          onPress={handleSubmit}
          disabled={submitted}
          variant="primary"
          fullWidth
          size="lg"
        />
      </View>
    </SafeAreaView>
  );
};
