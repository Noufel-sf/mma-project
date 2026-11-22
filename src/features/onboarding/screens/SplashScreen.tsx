import React, { useEffect, useState } from 'react';
import { View, SafeAreaView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/types';
import { Logo } from '@/components/ui/Logo';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { useAppSelector } from '@/store/hooks';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

export const SplashScreen: React.FC<Props> = ({ navigation }) => {
  const [progress, setProgress] = useState(0.1);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 1) {
          clearInterval(interval);
          return 1;
        }
        return prev + 0.3;
      });
    }, 400);

    const timer = setTimeout(() => {
      if (isAuthenticated) {
        navigation.replace('Main', { screen: 'Feed' });
      } else {
        navigation.replace('Welcome');
      }
    }, 1800);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [navigation, isAuthenticated]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 items-center justify-center px-6">
        <Logo size="lg" showSlogan showNumber />
        <View className="mt-8">
          <ProgressBar progress={progress} width={80} />
        </View>
      </View>
    </SafeAreaView>
  );
};
