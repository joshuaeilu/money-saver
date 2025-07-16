import EditPlanModal from '@/components/ui/edit_plan_component';
import PlanCard from '@/components/ui/PlanCard';
import TabHeaderComponent from '@/components/ui/tab_header_component';
import { useColorScheme } from '@/hooks/useColorScheme';
import { AuthContext } from '@/utils/authContext';
import { addToTotalAmount, fetchPlans, updatePlanAmounts } from '@/utils/dataFunctions';
import { Feather } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { Redirect, useRouter } from 'expo-router'; // Import router for navigation
import { useContext, useEffect, useState } from 'react';
import { Image, Keyboard, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message'; // Import Toast for notifications
import { Float } from 'react-native/Libraries/Types/CodegenTypes';
import { deletePlan, updatePlan } from '@/utils/dataFunctions';





export default function Layout() {
  const authContext = useContext(AuthContext);
  const [amount, setAmount] = useState('');
  const [activeTab, setActiveTab] = useState<'plans' | 'goals'>('plans');
  const router = useRouter(); // Use router for navigation
  const [plans, setPlans] = useState<any[]>([]); // State to hold plans
  const [showEdit, setShowEdit] = useState(false);
  const [editingPlan, setEditingPlan] = useState({id: '', name: '', percentage: '', amount: '', withdraw: ''});
  const currentPercentage = plans.reduce((acc, plan) => acc + plan.percentage, 0);
  const currentTotalAmount = plans.reduce((acc, plan) => acc + plan.amount, 0);

  useEffect(() => {
    const fetchData = async () => {
      const planData = await fetchPlans();
      if (planData) {
        setPlans(planData);
      }
    };
    fetchData();
  }, [plans]);

  if (!authContext.isLoggedIn) {
    return <Redirect href="/login" />;
  }


  function calculatePlanAmounts(totalAmountToAdd: Float) {
    return plans.map(plan => ({
      id: plan.id,
      newAmount: Number((plan.amount + ((plan.percentage / currentPercentage) * totalAmountToAdd)).toFixed(2))
    }))

  }



  async function handleInputAmount() {
    Keyboard.dismiss(); // Dismiss the keyboard when the button is pressed

    const planAmounts = calculatePlanAmounts(parseFloat(amount));

    const updateResult = await updatePlanAmounts(planAmounts);
    if (updateResult && updateResult.errorMessage) {
      Toast.show({
        type: 'error',
        text1: 'Error updating plan amounts',
        text2: updateResult.errorMessage,
        position: 'bottom'
      });
      return;
    }

    const { success, message } = await addToTotalAmount(parseFloat(amount));
    if (success) {
      Toast.show({
        type: 'success',
        text1: 'Successfully added your amount',
        text2: message,
        position: 'bottom'
      });
    } else {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: message,
        position: 'bottom'
      });
    }

    setAmount(''); // Clear the input field after submission
  }


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
            keyboardType='numeric'
            className={`flex-1 rounded-lg px-3 py-3 text-text_strong text-lg font-manrope-medium border border-[#e0e0d1] ${plans.length === 0 ? 'bg-gray-200 text-gray-400' : 'bg-white'}`}
            placeholderTextColor="#888"
            editable={plans.length !== 0}
          />
          <TouchableOpacity
            className={`rounded-lg ml-3 p-3 items-center justify-center ${plans.length === 0 ? 'bg-gray-300' : 'bg-brand'}`}
            onPress={handleInputAmount}
            disabled={plans.length === 0}
          >
            <Feather name='send' size={24} color={plans.length === 0 ? '#aaa' : 'white'} />
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
      <ScrollView key={activeTab} className="flex-1 ">
        {(activeTab === 'plans' && plans.length > 0) ? plans.map((plan) => (
          <PlanCard
            key={plan.id}
            title={plan.name}
            amount={plan.amount}
            percent={plan.percentage}
            onOptionsPress={() => {
              setEditingPlan(plan);
              setShowEdit(true);
            }}


          />
        )) : (
          <View className="flex-1 items-center justify-center mt-10 px-6">
            <Feather name="alert-circle" size={60} color="#667039" />
            <Text
              className="text-center text-4xl text-text_strong font-manrope-bold mt-2 mb-2"
              style={{ lineHeight: 44 }} // Adjust as needed
            >
              Savings?
            </Text>
            <Text className="text-center text-xl text-text_strong font-manrope-regular leading-snug">
              You currently don’t have a savings plan, create one before adding an amount to your budget.
            </Text>
          </View>
        )}
      </ScrollView>




      <View className='flex-row items-center justify-between px-4 py-4 bg-white border-gray-200'>
        <Text className='text-2xl font-manrope-semibold text-text_strong'>Total: ${currentTotalAmount.toString()}</Text>
        <TouchableOpacity
          className='flex-row bg-brand rounded-lg px-4 py-2'
          onPress={() => router.push({ pathname: '/add_plan', params: { currentPercentage: currentPercentage } })}
        >
          <Feather name='plus' size={24} color="white" />
          <Text className='text-white text-xl font-manrope-semibold'>Add Plan</Text>
        </TouchableOpacity>
      </View>
      <Toast />


      {/* Edit Plan Modal */}
      <EditPlanModal
        visible={showEdit}
        onClose={() => setShowEdit(false)}
        plan={editingPlan}
        onChangeField={(field: string, value: string) => setEditingPlan({ ...editingPlan, [field]: value })}
        onSave={async () => {
          // your save logic here
         await updatePlan(editingPlan);
          setShowEdit(false);
        }}
        onDelete={async () => {
          const {success, message} = await deletePlan(editingPlan.id);

          if (success) {
            // Optionally show a success message
            Toast.show({
              type: 'success',
              text1: `${editingPlan.name} Plan Deleted Successfully`,
              text2: message,
              position: 'bottom'
            });
          } else {
            // Optionally show an error message
            Toast.show({
              type: 'error',
              text1: 'Error Deleting Plan',
              text2: message,
              position: 'bottom'
            });
          }
          setShowEdit(false);
        }}
      />

    </View>
  );
}

//}
