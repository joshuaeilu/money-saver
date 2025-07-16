

import { addPlan } from '@/utils/dataFunctions';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router'; // Import useRouter for navigation
import { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import {AddPlanWarning} from '@/components/ui/add_plan_warning';
import { useLocalSearchParams } from 'expo-router';

export default function AddPlan() {
  const [name, setName] = useState('');
  const [percentage, setPercentage] = useState('');
  const router = useRouter(); // Use router for navigation
  // get the current plan percentage from the useRouterParameters
  const { currentPercentage } = useLocalSearchParams();


  async function handleSavePlan() {
    if (!name.trim() || !percentage.trim()) {
      alert('Please fill in both fields.');
      return;
    }
    if (Number(currentPercentage) + Number(percentage) > 100) {
      alert('Total percentage cannot exceed 100%.');
      return;
    }
    const { success, message } = await addPlan(name, parseFloat(percentage));
    if (success) {
      router.dismiss();
    } else {
      alert('Error saving plan: ' + message);
    }
    setName('');
    setPercentage('');
  }



  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="px-4 py-6 rounded-b-3xl shadow-lg flex-row items-center" style={{ backgroundColor: 'rgba(227, 231, 210, 0.2)' }}>
        <TouchableOpacity onPress={() => router.back()} className="mr-2">
          <Feather name="arrow-left" size={24} color="#8A9A4A" />
        </TouchableOpacity>
        <Text className="text-xl font-manrope-bold text-[#8A9A4A]">Add Plan</Text>
      </View>

      {/* Form */}
      <View className="px-6 mt-6">
        <Text className="text-base font-manrope-medium text-text_strong mb-2">Name</Text>
        <TextInput
          className="bg-white border border-[#E0E0D1] rounded-lg px-4 py-2 mb-6 text-base font-manrope-regular text-text_strong"
          placeholder="Value"
          value={name}
          onChangeText={setName}
          placeholderTextColor="#B0B0B0"
        />
        <Text className="text-base font-manrope-medium text-text_strong mb-2">Percentage</Text>
        <TextInput
          className="bg-white border border-[#E0E0D1] rounded-lg px-4 py-2 mb-6 text-base font-manrope-regular text-text_strong"
          placeholder="Value"
          value={percentage}
          onChangeText={setPercentage}
          keyboardType="numeric"
          placeholderTextColor="#B0B0B0"
        />
      </View>
      {/* Warning Component */}
      <AddPlanWarning currentPercentage={Number(currentPercentage)} />

      {/* Save Button */}
      <View className="absolute left-0 right-0 bottom-8 px-6">
        <TouchableOpacity className="bg-[#8A9A4A] rounded-lg py-3 items-center" onPress={() => {handleSavePlan()}}>
          <Text className="text-white text-base font-manrope-medium">Save Plan</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}