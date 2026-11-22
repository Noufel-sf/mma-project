import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation/types';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { logout } from '../../../store/slices/authSlice';
import { TextField } from '../../../components/ui/TextField';
import { Button } from '../../../components/ui/Button';
import {
  Building2,
  MapPin,
  Edit2,
  Share2,
  LogOut,
} from 'lucide-react-native';

type Props = NativeStackScreenProps<RootStackParamList, 'Main'>;

export const ProfileScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const [activeTab, setActiveTab] = useState<'personal' | 'professional' | 'settings'>('professional');

  const [title, setTitle] = useState(user?.professionalTitle || 'Senior Mobile Architect');
  const [location, setLocation] = useState(user?.location || 'Algiers, Algeria');
  const [fullName, setFullName] = useState(user?.fullName || 'Eugenia Babajanyan');

  const handleLogout = () => {
    Alert.alert('Log Out', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Log Out',
        style: 'destructive',
        onPress: () => {
          dispatch(logout());
          navigation.replace('Login');
        },
      },
    ]);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-6 py-6" showsVerticalScrollIndicator={false}>
        {/* Profile Top Section matching Figma */}
        <View className="flex-row items-center justify-between mb-4">
          {/* Avatar with purple ring */}
          <View className="w-24 h-24 rounded-full border-4 border-[#5D67BC] p-1 items-center justify-center overflow-hidden shadow-sm">
            <Image
              source={require('../../../assets/images/avatar.png')}
              className="w-full h-full rounded-full"
              resizeMode="cover"
            />
          </View>

          {/* Quick Action Icons: Edit & Share */}
          <View className="flex-row items-center gap-2">
            <TouchableOpacity
              activeOpacity={0.8}
              className="w-11 h-11 bg-white border border-[#E8EFF3] rounded-full items-center justify-center shadow-xs"
            >
              <Edit2 size={16} color="#1F2937" />
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              className="w-11 h-11 bg-white border border-[#E8EFF3] rounded-full items-center justify-center shadow-xs"
            >
              <Share2 size={16} color="#1F2937" />
            </TouchableOpacity>
          </View>
        </View>

        {/* User Info Block */}
        <View className="mb-6">
          <Text className="text-[22px] font-bold text-[#111827] mb-1">
            {fullName}
          </Text>

          <View className="flex-row items-center gap-2 flex-wrap mb-2">
            <View className="flex-row items-center gap-1">
              <Building2 size={15} color="#5A6270" />
              <Text className="text-[14px] text-[#5A6270]">{title}</Text>
            </View>

            <View className="w-1.5 h-1.5 rounded-full bg-[#5A6270]" />

            <View className="flex-row items-center gap-1">
              <MapPin size={15} color="#5A6270" />
              <Text className="text-[14px] text-[#5A6270]">{location}</Text>
            </View>
          </View>

          <Text className="text-[14px] text-[#9CA3AF]">
            Member since {user?.memberSince || '2026'}
          </Text>
        </View>

        {/* Tab Selector matching Figma */}
        <View className="flex-row items-center justify-between mb-6">
          <TouchableOpacity
            onPress={() => setActiveTab('personal')}
            className={`px-4 py-2 rounded-full ${
              activeTab === 'personal'
                ? 'bg-[#7E5DF6]'
                : 'bg-white border border-[#E8EFF3]'
            }`}
          >
            <Text
              className={`text-xs font-semibold ${
                activeTab === 'personal' ? 'text-white' : 'text-black'
              }`}
            >
              Personal Info
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setActiveTab('professional')}
            className={`px-4 py-2 rounded-full ${
              activeTab === 'professional'
                ? 'bg-[#7E5DF6]'
                : 'bg-white border border-[#E8EFF3]'
            }`}
          >
            <Text
              className={`text-xs font-semibold ${
                activeTab === 'professional' ? 'text-white' : 'text-black'
              }`}
            >
              Professional
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setActiveTab('settings')}
            className={`px-4 py-2 rounded-full ${
              activeTab === 'settings'
                ? 'bg-[#7E5DF6]'
                : 'bg-white border border-[#E8EFF3]'
            }`}
          >
            <Text
              className={`text-xs font-semibold ${
                activeTab === 'settings' ? 'text-white' : 'text-black'
              }`}
            >
              Settings
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tab Content Fields */}
        <View className="mb-8">
          <Text className="text-[18px] font-bold text-black mb-1">
            Professional Profile
          </Text>
          <Text className="text-[14px] text-[#6B7280] mb-4">
            Build your professional profile on Point.43
          </Text>

          <View className="gap-4">
            <TextField
              placeholder="Full Name"
              value={fullName}
              onChangeText={setFullName}
            />

            <TextField
              placeholder="Professional Title"
              value={title}
              onChangeText={setTitle}
            />

            <TextField
              placeholder="Location"
              value={location}
              onChangeText={setLocation}
            />
          </View>
        </View>

        {/* Logout Action */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleLogout}
          className="flex-row items-center justify-center p-4 rounded-[20px] bg-red-50 border border-red-200 mb-10"
        >
          <LogOut size={18} color="#EF4444" />
          <Text className="text-red-500 font-semibold ml-2">Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};
