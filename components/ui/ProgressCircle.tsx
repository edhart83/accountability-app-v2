// Temporarily disabled due to React DOM styling issues
import React from 'react';
import { View, StyleSheet } from 'react-native';

interface ProgressCircleProps {
  size: number;
  progress: number;
  strokeWidth: number;
  progressColor: string;
  backgroundColor?: string;
}

const ProgressCircle: React.FC<ProgressCircleProps> = ({
  size,
  progress,
  progressColor,
  backgroundColor = '#E5E7EB',
}) => {
  // Temporary placeholder component
  return (
    <View style={[
      styles.container,
      {
        width: size,
        height: size,
        backgroundColor,
        borderRadius: size / 2,
      }
    ]}>
      <View style={[
        styles.progress,
        {
          backgroundColor: progressColor,
          width: `${Math.min(Math.max(progress * 100, 0), 100)}%`,
        }
      ]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    justifyContent: 'center',
  },
  progress: {
    height: '100%',
  },
});

export default ProgressCircle;