import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation/types';
import { Button } from '../../../components/ui/Button';
import { PaginationDots } from '../../../components/ui/PaginationDots';
import Svg, { Path } from 'react-native-svg';

type Props = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

export const WelcomeScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        className="px-6 py-8 justify-between"
      >
        <View className="items-center justify-center flex-1 my-6">
          {/* Main Hero Graphic: Figma Union + .43 */}
          <View className="items-center justify-center relative my-4">
            <Svg
              width={260}
              height={336}
              viewBox="0 0 349.443 452.091"
              fill="none"
            >
              <Path
                d="M174.721 0C271.224 0 349.443 78.22 349.443 174.721C349.443 271.225 271.224 349.443 174.721 349.443C169.146 349.443 163.633 349.169 158.192 348.658C165.205 349.431 169.362 349.443 169.362 349.443C169.362 349.443 138.785 349.445 122.405 369.102C106.18 388.572 104.855 401.608 104.832 401.854C104.83 401.831 104.808 401.707 104.784 401.489C103.826 429.596 80.7593 452.089 52.4203 452.091C24.7974 452.091 2.16856 430.721 0.153137 403.614C0.113853 403.893 0.0957031 404.045 0.0957031 404.045L0.0957031 402.743C0.037013 401.727 0 400.701 0 399.671C3.78252e-05 398.636 0.0365345 397.609 0.0957031 396.589L0.0957031 180.231C0.0390422 178.402 0 176.562 0 174.721C0.00209129 78.223 78.223 0.00209121 174.721 0Z"
                fill="#7E5DF6"
              />
            </Svg>

            {/* .43 Large Overlay */}
            <View className="absolute bottom-6 right-6">
              <Text className="text-[72px] font-bold text-black">
                <Text className="text-[#7E5DF6]">.</Text>43
              </Text>
            </View>
          </View>

          {/* Heading */}
          <Text className="text-[32px] font-bold text-[#1F2937] text-center mt-6 mb-3">
            Welcome to Point.43
          </Text>

          {/* Subtitle */}
          <Text className="text-[16px] text-[#6B7280] text-center leading-[24px] px-2">
            Discover challenges, share innovative ideas, and collaborate with
            others to create meaningful solutions.
          </Text>
        </View>

        {/* Footer Actions */}
        <View className="items-center gap-5 mt-4">
          <Button
            title="متابعة"
            onPress={() => navigation.navigate('AccountType')}
            variant="primary"
            size="lg"
            style={{ width: 180 }}
          />

          <PaginationDots total={2} activeIndex={0} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
