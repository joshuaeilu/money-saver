import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface GoalCardProps {
  title: string;
  currentAmount: number;
  targetAmount: number;
  onOptionsPress: () => void;
}

const GoalCard: React.FC<GoalCardProps> = ({ title, currentAmount, targetAmount, onOptionsPress }) => {
  const progress = targetAmount > 0 ? (currentAmount / targetAmount) * 100 : 0;
  const progressClamped = Math.min(progress, 100); // Ensure progress doesn't exceed 100%

  return (
    <View className="bg-white rounded-xl p-4 mx-3 mb-3 shadow-sm border border-gray-100">
      {/* Header with title and options */}
      <View className="flex-row justify-between items-center mb-3">
        <Text className="text-xl font-manrope-semibold text-text_strong">{title}</Text>
        <TouchableOpacity onPress={onOptionsPress} className="p-1">
          <Feather name="more-vertical" size={20} color="#667039" />
        </TouchableOpacity>
      </View>

      {/* Progress Bar */}
      <View className="mb-3">
        <View className="bg-gray-200 rounded-full h-2 mb-2">
          <View 
            className="bg-brand rounded-full h-2" 
            style={{ width: `${progressClamped}%` }}
          />
        </View>
        <Text className="text-sm font-manrope-medium text-gray-600 text-center">
          {progress.toFixed(1)}% Complete
        </Text>
      </View>

      {/* Amount Info */}
      <View className="flex-row justify-between items-center">
        <View>
          <Text className="text-sm font-manrope-regular text-gray-600">Current</Text>
          <Text className="text-lg font-manrope-semibold text-text_strong">
            ${currentAmount.toFixed(2)}
          </Text>
        </View>
        <View className="items-end">
          <Text className="text-sm font-manrope-regular text-gray-600">Target</Text>
          <Text className="text-lg font-manrope-semibold text-brand">
            ${targetAmount.toFixed(2)}
          </Text>
        </View>
      </View>

      {/* Remaining Amount */}
      <View className="mt-3 pt-3 border-t border-gray-100">
        <Text className="text-sm font-manrope-regular text-gray-600 text-center">
          ${Math.max(targetAmount - currentAmount, 0).toFixed(2)} remaining to reach goal
        </Text>
      </View>
    </View>
  );
};

export default GoalCard;
