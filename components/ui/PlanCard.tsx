
import { Feather } from '@expo/vector-icons';
import  React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface PlanCardProps {
  title: string;
  amount: number;
  percent: number;
  onOptionsPress?: () => void;
}

const PlanCard: React.FC<PlanCardProps> = ({ title, amount, percent, onOptionsPress }) => {
  return (
    <View className="bg-white rounded-2xl shadow-md p-4 mb-4 mx-4  justify-between ">
      {/* Top Section */}
      <View className="flex-row items-start justify-between mb-6">
        <Text className="text-2xl font-manrope-semibold text-text_strong mb-2">{title}</Text>
        <TouchableOpacity onPress={onOptionsPress}>
          <Feather name="more-vertical" size={22} color="#89964E" />
        </TouchableOpacity>
      </View>
      {/* Bottom Section */}
      <View className="flex-row items-end justify-between">
        <Text className="text-3xl font-bold text-brand">${amount}</Text>
        <View className="bg-[#D1E86C] px-4 py-[4px] rounded-full border border-[#89964E]">
          <Text className="text-sm font-manrope-semibold text-base">{percent}%</Text>
        </View>
      </View>
    </View>
  );
};

export default PlanCard;
