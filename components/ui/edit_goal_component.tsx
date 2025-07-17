import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface EditGoalModalProps {
  visible: boolean;
  onClose: () => void;
  goal: {
    id: string;
    name: string;
    target_amount: string;
    current_amount: string;
    withdraw: string;
  };
  onChangeField: (field: string, value: string) => void;
  onSave: () => void;
  onDelete: () => void;
}

const EditGoalModal: React.FC<EditGoalModalProps> = ({
  visible,
  onClose,
  goal,
  onChangeField,
  onSave,
  onDelete
}) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="bg-white rounded-xl p-6 mx-4 w-11/12 max-w-md">
          {/* Header */}
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-2xl font-manrope-bold text-text_strong">Edit Goal</Text>
            <TouchableOpacity onPress={onClose}>
              <Feather name="x" size={24} color="#667039" />
            </TouchableOpacity>
          </View>

          {/* Goal Name Input */}
          <View className="mb-4">
            <Text className="text-sm font-manrope-medium text-gray-600 mb-2">Goal Name</Text>
            <TextInput
              value={goal.name}
              onChangeText={(value) => onChangeField('name', value)}
              className="border border-gray-300 rounded-lg px-3 py-3 text-text_strong font-manrope-regular"
              placeholder="Enter goal name"
            />
          </View>

          {/* Target Amount Input */}
          <View className="mb-4">
            <Text className="text-sm font-manrope-medium text-gray-600 mb-2">Target Amount</Text>
            <TextInput
              value={goal.target_amount}
              onChangeText={(value) => onChangeField('target_amount', value)}
              className="border border-gray-300 rounded-lg px-3 py-3 text-text_strong font-manrope-regular"
              placeholder="Enter target amount"
              keyboardType="numeric"
            />
          </View>

          {/* Current Amount Display */}
          <View className="mb-4">
            <Text className="text-sm font-manrope-medium text-gray-600 mb-2">Current Amount</Text>
            <View className="border border-gray-300 rounded-lg px-3 py-3 bg-gray-50">
              <Text className="text-text_strong font-manrope-regular">${goal.current_amount}</Text>
            </View>
          </View>

          {/* Withdraw Amount Input */}
          <View className="mb-6">
            <Text className="text-sm font-manrope-medium text-gray-600 mb-2">Withdraw Amount</Text>
            <TextInput
              value={goal.withdraw}
              onChangeText={(value) => onChangeField('withdraw', value)}
              className="border border-gray-300 rounded-lg px-3 py-3 text-text_strong font-manrope-regular"
              placeholder="Enter amount to withdraw"
              keyboardType="numeric"
            />
          </View>

          {/* Action Buttons */}
          <View className="flex-row justify-between space-x-3">
            {/* Delete Button */}
            <TouchableOpacity
              onPress={onDelete}
              className="flex-1 bg-red-500 rounded-lg py-3 mr-2"
            >
              <Text className="text-white text-center font-manrope-semibold">Delete</Text>
            </TouchableOpacity>

            {/* Save Button */}
            <TouchableOpacity
              onPress={onSave}
              className="flex-1 bg-brand rounded-lg py-3 ml-2"
            >
              <Text className="text-white text-center font-manrope-semibold">Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default EditGoalModal;
