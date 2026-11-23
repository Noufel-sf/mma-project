import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Calendar as CalendarIcon,
  Clock,
  Trophy,
  ChevronRight,
  Sparkles,
} from 'lucide-react-native';

interface EventItem {
  id: string;
  title: string;
  category: string;
  date: string;
  time: string;
  type: 'deadline' | 'hackathon' | 'review';
  daysRemaining: number;
  reward?: string;
}

const mockEvents: EventItem[] = [
  {
    id: 'ev-1',
    title: 'AI Smart Waste Management – Final Submission',
    category: 'AI & IoT',
    date: 'Dec 05, 2026',
    time: '23:59 UTC',
    type: 'deadline',
    daysRemaining: 12,
    reward: '$5,000',
  },
  {
    id: 'ev-2',
    title: 'Point.43 Virtual Hackathon – Opening Ceremony',
    category: 'Innovation',
    date: 'Dec 08, 2026',
    time: '14:00 UTC',
    type: 'hackathon',
    daysRemaining: 15,
  },
  {
    id: 'ev-3',
    title: 'Telemedicine Mobile App – Review Stage 1',
    category: 'Healthcare',
    date: 'Dec 11, 2026',
    time: '18:00 UTC',
    type: 'review',
    daysRemaining: 18,
    reward: '$3,500',
  },
  {
    id: 'ev-4',
    title: 'EdVenture Gamification Demo Day',
    category: 'Education',
    date: 'Dec 15, 2026',
    time: '16:30 UTC',
    type: 'deadline',
    daysRemaining: 22,
    reward: '$2,000',
  },
];

const daysOfWeek = [
  { day: 'Mon', date: '23' },
  { day: 'Tue', date: '24', active: true },
  { day: 'Wed', date: '25' },
  { day: 'Thu', date: '26' },
  { day: 'Fri', date: '27' },
  { day: 'Sat', date: '28' },
  { day: 'Sun', date: '29' },
];

export const CalendarScreen: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState('24');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'deadline' | 'hackathon'>('all');

  const filteredEvents = mockEvents.filter((ev) => {
    if (selectedFilter === 'all') return true;
    return ev.type === selectedFilter;
  });

  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={{ flex: 1, backgroundColor: '#F9FAFB' }}>
      {/* Top Header */}
      <View className="px-6 pt-3 pb-3 bg-white border-b border-[#F3F4F6]">
        <View className="flex-row items-center justify-between mb-4">
          <View>
            <Text className="text-xs font-semibold text-[#7E5DF6] uppercase tracking-wider">
              Schedule & Deadlines
            </Text>
            <Text className="text-2xl font-bold text-[#111827]">
              Event Calendar
            </Text>
          </View>
          <View className="w-10 h-10 rounded-full bg-[#7E5DF6]/10 items-center justify-center">
            <CalendarIcon size={20} color="#7E5DF6" />
          </View>
        </View>

        {/* Horizontal Week Strip */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="flex-row gap-2.5 pb-2"
        >
          {daysOfWeek.map((item) => {
            const isSelected = selectedDay === item.date;
            return (
              <TouchableOpacity
                key={item.date}
                activeOpacity={0.8}
                onPress={() => setSelectedDay(item.date)}
                className={`w-13 py-3 px-3 rounded-2xl items-center justify-center border ${
                  isSelected
                    ? 'bg-[#7E5DF6] border-[#7E5DF6]'
                    : 'bg-[#F3F4F6] border-transparent'
                }`}
              >
                <Text
                  className={`text-xs font-medium mb-1 ${
                    isSelected ? 'text-white/80' : 'text-[#6B7280]'
                  }`}
                >
                  {item.day}
                </Text>
                <Text
                  className={`text-base font-bold ${
                    isSelected ? 'text-white' : 'text-[#111827]'
                  }`}
                >
                  {item.date}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <ScrollView className="flex-1 px-6 py-5" showsVerticalScrollIndicator={false}>
        {/* Filter Pills */}
        <View className="flex-row gap-2 mb-5">
          {(['all', 'deadline', 'hackathon'] as const).map((filter) => {
            const isSelected = selectedFilter === filter;
            const label =
              filter === 'all'
                ? 'All Events'
                : filter === 'deadline'
                ? 'Deadlines'
                : 'Hackathons';
            return (
              <TouchableOpacity
                key={filter}
                activeOpacity={0.8}
                onPress={() => setSelectedFilter(filter)}
                className={`px-4 py-1.5 rounded-full ${
                  isSelected
                    ? 'bg-[#7E5DF6]'
                    : 'bg-white border border-[#E8EFF3]'
                }`}
              >
                <Text
                  className={`text-xs font-semibold ${
                    isSelected ? 'text-white' : 'text-[#4B5563]'
                  }`}
                >
                  {label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Section Heading */}
        <Text className="text-base font-bold text-[#111827] mb-3">
          Upcoming Schedule
        </Text>

        {/* Event List */}
        {filteredEvents.map((event) => (
          <TouchableOpacity
            key={event.id}
            activeOpacity={0.85}
            className="bg-white rounded-[20px] p-4 mb-3.5 border border-[#E8EFF3] shadow-xs"
          >
            <View className="flex-row items-center justify-between mb-2">
              <View className="bg-[rgba(126,93,246,0.1)] px-2.5 py-0.5 rounded-full">
                <Text className="text-[#7E5DF6] text-[11px] font-semibold">
                  {event.category}
                </Text>
              </View>

              <View className="flex-row items-center gap-1">
                <Clock size={13} color="#9CA3AF" />
                <Text className="text-xs font-medium text-[#6B7280]">
                  {event.daysRemaining} days left
                </Text>
              </View>
            </View>

            <Text className="text-[16px] font-bold text-[#111827] mb-2 leading-5">
              {event.title}
            </Text>

            <View className="flex-row items-center justify-between pt-2 border-t border-[#F3F4F6]">
              <Text className="text-xs text-[#6B7280]">
                {event.date} • {event.time}
              </Text>

              {event.reward && (
                <View className="flex-row items-center gap-1">
                  <Trophy size={13} color="#7E5DF6" />
                  <Text className="text-xs font-bold text-black">
                    {event.reward}
                  </Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        ))}

        {/* Highlight Banner */}
        <View className="bg-gradient-to-r from-[#7E5DF6] to-[#5D67BC] rounded-[24px] p-5 my-4 bg-[#7E5DF6]">
          <View className="flex-row items-center gap-2 mb-1.5">
            <Sparkles size={18} color="#FFFFFF" />
            <Text className="text-white font-bold text-base">
              Synchronize with Calendar
            </Text>
          </View>
          <Text className="text-white/80 text-xs leading-4 mb-3">
            Export all Point.43 milestone dates and challenge deadlines to your Google or Apple Calendar.
          </Text>
          <TouchableOpacity
            activeOpacity={0.8}
            className="bg-white/20 self-start px-3.5 py-1.5 rounded-full"
          >
            <Text className="text-white text-xs font-semibold">
              Export iCal / .ics →
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
