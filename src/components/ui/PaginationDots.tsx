import React from 'react';
import { View } from 'react-native';

interface PaginationDotsProps {
  total?: number;
  activeIndex?: number;
}

export const PaginationDots: React.FC<PaginationDotsProps> = ({
  total = 2,
  activeIndex = 0,
}) => {
  return (
    <View className="flex-row items-center justify-center gap-2 h-2">
      {Array.from({ length: total }).map((_, idx) => {
        const isActive = idx === activeIndex;
        return (
          <View
            key={idx}
            className={`rounded-full ${
              isActive
                ? 'bg-[#7E5DF6] w-[28.8px] h-[9px]'
                : 'bg-[rgba(126,93,246,0.47)] w-[9px] h-[9px]'
            }`}
          />
        );
      })}
    </View>
  );
};
