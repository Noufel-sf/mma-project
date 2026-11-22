import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';

interface RoleCardProps {
  title: string;
  description: string;
  selected: boolean;
  onSelect: () => void;
}

export const RoleCard: React.FC<RoleCardProps> = ({
  title,
  description,
  selected,
  onSelect,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onSelect}
      className={`w-full p-5 rounded-[20px] bg-white border-2 flex-row items-center justify-between mb-4 ${
        selected ? 'border-[#7E5DF6]' : 'border-[#9CA3AF]'
      }`}
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: selected ? 0.08 : 0.03,
        shadowRadius: 6,
        elevation: 2,
      }}
    >
      <View className="flex-1 pr-4">
        <Text className="text-[18px] font-bold text-black mb-1.5">{title}</Text>
        <Text className="text-[14px] text-[#6B7280] leading-[20px]">
          {description}
        </Text>
      </View>

      {/* Radio Circle */}
      <View
        className={`w-4 h-4 rounded-full border-2 items-center justify-center ${
          selected ? 'border-[#7E5DF6]' : 'border-[#9CA3AF]'
        }`}
      >
        {selected && (
          <View className="w-2 h-2 rounded-full bg-[#7E5DF6]" />
        )}
      </View>
    </TouchableOpacity>
  );
};
