import PlanCard from '@/components/ui/PlanCard';
import TabHeaderComponent from '@/components/ui/tab_header_component';
import { useColorScheme } from '@/hooks/useColorScheme';
import { AuthContext } from '@/utils/authContext';
import { Feather } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useContext, useState } from 'react';
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
export default function Layout() {
  const colorScheme = useColorScheme();
  const authContext = useContext(AuthContext);
  const [amount, setAmount] = useState('');
  const [activeTab, setActiveTab] = useState<'plans' | 'goals'>('plans'); 

  const testPlanArray = [
    {
      id: '1', 
      name: 'Savings',
      amount: 100,
      percentage: 50
    }, 
    // Add more test plans as needed
    {
      id: '2',
      name: 'Goals',
      amount: 200,
      percentage: 75
    }, 
    {
      id: '3',
      name: 'Transport',
      amount: 300,
      percentage: 30
    },
    {
      id: '4',
      name: 'Groceries',
      amount: 150,
      percentage: 60
    },
    {
      id: '5',
      name: 'Entertainment',
      amount: 80,
      percentage: 40
    }
  ]

  // Calculate total amount for plans
  const totalAmount = testPlanArray.reduce((sum, plan) => sum + plan.amount, 0);

  return (
    <View className="flex-1 bg-white ">
      {/* Background Glass Layer */}
      <BlurView
        intensity={90}
        tint="light"
        className="h-1/5 rounded-b-2xl shadow-lg"
        style={{ backgroundColor: '#D1E86C' }}
      />
      {/* Foreground Card Layer */}
      <View className="absolute top-0 right-0 left-0 bottom-0 p-3 ">
        <View className="flex-row items-center justify-between my-3 ">
          <View className="flex-row items-end">
            <Image source={require('@/assets/images/primary_logo.png')} style={{ height: 40, width: 48 }} />
            <Text className="text-3xl font-manrope-semibold tracking-wide  text-brand">Money Saver</Text>
          </View>
          <TouchableOpacity className="p-1.5">
            <Feather name='log-out' size={24} color="#89964E" onPress={() => authContext.logout()} />
          </TouchableOpacity>
        </View>


        <View className="flex-row  items-center mt-3">
          <TextInput
            placeholder="Input amount to budget"
            value={amount}
            onChangeText={setAmount}
            underlineColorAndroid={"transparent"} 
            className="flex-1 bg-white rounded-lg px-3 py-3 text-text_strong text-lg font-manrope-medium border border-[#e0e0d1] "
            placeholderTextColor="#888"
          />
          <TouchableOpacity className="bg-[#89964E] rounded-lg ml-3 p-3 items-center justify-center">
            <Feather name='send' size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      



      {/* Main Content Area */}
      <View className="flex-row bg-white rounded-full  border border-brand mt-md mb-sm p-[4px] self-center" style={{ backgroundColor: 'rgba(217, 232, 108, 0.2)' }}>
        {/* Plans Tab */}
        <TabHeaderComponent tabName='Plans' activeTab={activeTab} setActiveTab={setActiveTab} />
        <TabHeaderComponent tabName='Goals' activeTab={activeTab} setActiveTab={setActiveTab} />
      </View>

      {/* Conditional Rendering Based on Active Tab */}
      <ScrollView key={activeTab} className="flex-1 mb-3xl">
      {activeTab === 'plans' && testPlanArray.map((plan) => (
          <PlanCard
            key={plan.id} 
            title={plan.name}
            amount={plan.amount}
            percent={plan.percentage}
            onOptionsPress={() => console.log('Options pressed for', plan.name)}
          />
        ))}
        </ScrollView>

      {/* Total and Add Plan Button at the Bottom */}
      <View className="absolute left-0 right-0 bottom-0 px-4 py-4 bg-white flex-row items-center justify-between z-50">
        <Text className="text-3xl font-bold text-text_strong">
          Total: <Text className="text-brand">${totalAmount}</Text>
        </Text>
        <TouchableOpacity
          className="flex-row items-center bg-brand px-4 py-2 rounded-lg ml-2"
          onPress={() => {/* handle add plan */}}
          activeOpacity={0.8}
        >
          <Feather name="plus" size={20} color="white" />
          <Text className="text-white font-semibold text-lg ml-2">Add Plan</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

//}
