import { addGoal } from '@/utils/dataFunctions';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';

export default function AddGoal() {
  const router = useRouter();
  const [goalName, setGoalName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');

  const handleAddGoal = async () => {
    if (!goalName.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Goal Name Required',
        text2: 'Please enter a goal name',
        position: 'bottom'
      });
      return;
    }

    if (!targetAmount.trim() || isNaN(parseFloat(targetAmount)) || parseFloat(targetAmount) <= 0) {
      Toast.show({
        type: 'error',
        text1: 'Invalid Target Amount',
        text2: 'Please enter a valid target amount greater than 0',
        position: 'bottom'
      });
      return;
    }

    const result = await addGoal(goalName.trim(), parseFloat(targetAmount));

    if (result.success) {
      Toast.show({
        type: 'success',
        text1: 'Goal Created',
        text2: `${goalName} goal has been created successfully`,
        position: 'bottom'
      });
      router.back();
    } else {
      Toast.show({
        type: 'error',
        text1: 'Error Creating Goal',
        text2: result.message,
        position: 'bottom'
      });
    }
  };

  return (
    <View className="flex-1 bg-white p-4">
      {/* Header */}
      <View className="flex-row items-center justify-between mb-6 mt-4">
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="arrow-left" size={24} color="#667039" />
        </TouchableOpacity>
        <Text className="text-2xl font-manrope-bold text-text_strong">Add New Goal</Text>
        <View style={{ width: 24 }} /> {/* Spacer for centering */}
      </View>

      {/* Goal Name Input */}
      <View className="mb-6">
        <Text className="text-lg font-manrope-semibold text-text_strong mb-3">Goal Name</Text>
        <TextInput
          value={goalName}
          onChangeText={setGoalName}
          placeholder="e.g., Emergency Fund, Vacation, New Car"
          className="border border-gray-300 rounded-lg px-4 py-4 text-text_strong font-manrope-regular text-base"
          placeholderTextColor="#999"
        />
      </View>

      {/* Target Amount Input */}
      <View className="mb-8">
        <Text className="text-lg font-manrope-semibold text-text_strong mb-3">Target Amount</Text>
        <TextInput
          value={targetAmount}
          onChangeText={setTargetAmount}
          placeholder="0.00"
          keyboardType="numeric"
          className="border border-gray-300 rounded-lg px-4 py-4 text-text_strong font-manrope-regular text-base"
          placeholderTextColor="#999"
        />
      </View>

      {/* Info Card */}
      <View className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
        <View className="flex-row items-start">
          <Feather name="info" size={20} color="#3B82F6" />
          <View className="ml-3 flex-1">
            <Text className="font-manrope-semibold text-blue-800 mb-1">About Goals</Text>
            <Text className="font-manrope-regular text-blue-700 text-sm leading-5">
              Goals help you save for specific targets. You can manually add money to your goals 
              or allocate a portion of your budget to them.
            </Text>
          </View>
        </View>
      </View>

      {/* Create Goal Button */}
      <TouchableOpacity
        onPress={handleAddGoal}
        className="bg-brand rounded-lg py-4 px-6 flex-row items-center justify-center"
      >
        <Feather name="target" size={20} color="white" />
        <Text className="text-white font-manrope-semibold text-lg ml-2">Create Goal</Text>
      </TouchableOpacity>

      <Toast />
    </View>
  );
}
