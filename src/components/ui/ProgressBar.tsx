import React from 'react';
import { View } from 'react-native';

interface ProgressBarProps {
  progress?: number; // 0 to 1
  width?: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress = 0.5,
  width = 80,
}) => {
  return (
    <View
      className="bg-[#E5E2E1] h-[6px] rounded-full overflow-hidden"
      style={{ width }}
    >
      <View
        className="bg-[#7E5DF6] h-full rounded-full"
        style={{ width: `${Math.min(Math.max(progress, 0), 1) * 100}%` }}
      />
    </View>
  );
};
