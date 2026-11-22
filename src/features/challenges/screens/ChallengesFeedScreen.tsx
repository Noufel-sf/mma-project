import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/types';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  setSelectedCategory,
  setSearchQuery,
  Challenge,
} from '@/store/slices/challengesSlice';
import { Search, Trophy, Clock, Users, ArrowRight } from 'lucide-react-native';

type Props = NativeStackScreenProps<RootStackParamList, 'Main'>;

const categories = ['All', 'AI & IoT', 'Healthcare', 'Education'];

export const ChallengesFeedScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { challenges, selectedCategory, searchQuery } = useAppSelector(
    (state) => state.challenges
  );
  const selectedRole = useAppSelector((state) => state.auth.selectedRole);

  const filtered = challenges.filter((c) => {
    const matchesCat =
      selectedCategory === 'All' || c.category === selectedCategory;
    const matchesSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const renderChallengeCard = ({ item }: { item: Challenge }) => (
    <TouchableOpacity
      activeOpacity={0.88}
      onPress={() =>
        navigation.navigate('ChallengeDetail', { challengeId: item.id })
      }
      className="bg-white rounded-[24px] p-5 mb-4 border border-[#E8EFF3]"
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 3,
      }}
    >
      <View className="flex-row items-center justify-between mb-3">
        <View className="bg-[rgba(126,93,246,0.12)] px-3 py-1 rounded-full">
          <Text className="text-[#7E5DF6] text-xs font-semibold">
            {item.category}
          </Text>
        </View>

        <View className="flex-row items-center gap-1">
          <Trophy size={16} color="#7E5DF6" />
          <Text className="text-[16px] font-bold text-black">{item.reward}</Text>
        </View>
      </View>

      <Text className="text-[18px] font-bold text-[#111827] mb-2 leading-6">
        {item.title}
      </Text>

      <Text
        numberOfLines={2}
        className="text-[14px] text-[#6B7280] mb-4 leading-5"
      >
        {item.description}
      </Text>

      <View className="flex-row flex-wrap gap-1.5 mb-4">
        {item.tags.map((tag, idx) => (
          <View
            key={idx}
            className="bg-[#F3F4F6] px-2.5 py-0.5 rounded-full"
          >
            <Text className="text-[11px] font-medium text-[#4B5563]">
              #{tag}
            </Text>
          </View>
        ))}
      </View>

      <View className="flex-row items-center justify-between pt-3 border-t border-[#F3F4F6]">
        <View className="flex-row items-center gap-4">
          <View className="flex-row items-center gap-1">
            <Users size={14} color="#9CA3AF" />
            <Text className="text-xs text-[#6B7280]">
              {item.participantsCount} participants
            </Text>
          </View>

          <View className="flex-row items-center gap-1">
            <Clock size={14} color="#9CA3AF" />
            <Text className="text-xs text-[#6B7280]">
              {item.daysLeft}d left
            </Text>
          </View>
        </View>

        <ArrowRight size={18} color="#7E5DF6" />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-[#F9FAFB]">
      <View className="px-6 pt-4 pb-2 bg-white border-b border-[#F3F4F6]">
        <View className="flex-row items-center justify-between mb-3">
          <View>
            <Text className="text-xs font-semibold text-[#7E5DF6] uppercase tracking-wider">
              {selectedRole === 'provider' ? 'Challenge Provider' : 'Solution Seeker'}
            </Text>
            <Text className="text-2xl font-bold text-[#111827]">
              Explore Challenges
            </Text>
          </View>
        </View>

        <View className="h-12 bg-[#F3F4F6] rounded-2xl px-4 flex-row items-center mb-3">
          <Search size={18} color="#9CA3AF" />
          <TextInput
            placeholder="Search challenges, keywords..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={(text) => dispatch(setSearchQuery(text))}
            className="flex-1 ml-2.5 text-sm text-[#111827]"
          />
        </View>

        <View className="flex-row gap-2 pb-2">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <TouchableOpacity
                key={cat}
                activeOpacity={0.8}
                onPress={() => dispatch(setSelectedCategory(cat))}
                className={`px-4 py-1.5 rounded-full ${
                  isSelected ? 'bg-[#7E5DF6]' : 'bg-[#F3F4F6]'
                }`}
              >
                <Text
                  className={`text-xs font-semibold ${
                    isSelected ? 'text-white' : 'text-[#6B7280]'
                  }`}
                >
                  {cat}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={renderChallengeCard}
        contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View className="items-center justify-center py-16">
            <Text className="text-base font-medium text-[#6B7280]">
              No challenges found
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};
