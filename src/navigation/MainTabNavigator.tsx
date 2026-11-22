import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from './types';
import { ChallengesFeedScreen } from '../features/challenges/screens/ChallengesFeedScreen';
import { ProfileScreen } from '../features/profile/screens/ProfileScreen';
import {
  Home,
  FolderKanban,
  Calendar,
  FileText,
  User,
} from 'lucide-react-native';

const Tab = createBottomTabNavigator<MainTabParamList>();

const PlaceholderScreen: React.FC<{ title: string }> = ({ title }) => (
  <SafeAreaView className="flex-1 bg-white items-center justify-center p-6">
    <Text className="text-xl font-bold text-black mb-2">{title}</Text>
    <Text className="text-sm text-[#6B7280] text-center">
      Feature screen synchronized with Point.43
    </Text>
  </SafeAreaView>
);

export const MainTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#7E5DF6',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: '#F3F4F6',
          borderTopWidth: 1,
          height: 64,
          paddingBottom: 10,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen
        name="Feed"
        component={ChallengesFeedScreen as any}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Challenges"
        component={ChallengesFeedScreen as any}
        options={{
          tabBarLabel: 'Challenges',
          tabBarIcon: ({ color, size }) => (
            <FolderKanban size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Calendar"
        children={() => <PlaceholderScreen title="Hackathons & Deadlines" />}
        options={{
          tabBarLabel: 'Calendar',
          tabBarIcon: ({ color, size }) => <Calendar size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Documents"
        children={() => <PlaceholderScreen title="Resources & Specs" />}
        options={{
          tabBarLabel: 'Docs',
          tabBarIcon: ({ color, size }) => <FileText size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen as any}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};
