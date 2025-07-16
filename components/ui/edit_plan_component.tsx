import React from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';

type EditPlanModalProps = {
  visible: boolean;
  onClose: () => void;
  onSave: () => void;
  onDelete: () => void;
  plan: {
    id: string;
    name: string;
    percentage: string;
    withdraw: string;
  };
  onChangeField: (field: string, value: string) => void;
};

export default function EditPlanModal({
  visible,
  onClose,
  onSave,
  onDelete,
  plan,
  onChangeField,
}: EditPlanModalProps) {
  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          {/* Delete Icon */}
          <TouchableOpacity style={styles.deleteIcon} onPress={onDelete} accessibilityLabel="Delete plan">
            <Feather name="trash-2" size={22} color="#D33B3B" />
          </TouchableOpacity>

          {/* Header */}
          <View style={styles.header}>
            <Feather name="edit-3" size={22} color="#89964E" style={{ marginRight: 8 }} />
            <Text style={styles.headerText}>Edit Plan</Text>
          </View>

          {/* Plan Name */}
          <Text style={styles.label}>Plan Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Plan Name"
            placeholderTextColor="#A2A57B"
            value={plan.name}
            onChangeText={text => onChangeField('name', text)}
          />

          {/* Percentage */}
          <Text style={styles.label}>Percentage</Text>
            <TextInput
              style={styles.input}
              placeholder="Value"
              placeholderTextColor="#A2A57B"
              value={plan.percentage.toString()}
              keyboardType="numeric"
              onChangeText={text => onChangeField('percentage', text)}
              maxLength={3}
            />
          {/* Withdraw */}
          <Text style={styles.label}>Withdraw Amount</Text>
          <TextInput
            style={styles.input}
            placeholder="Withdraw Amount"
            placeholderTextColor="#A2A57B"
            value={plan.withdraw}
            keyboardType="numeric"
            onChangeText={text => onChangeField('withdraw', text)}
          />

          {/* Save Button */}
          <TouchableOpacity style={styles.saveButton} onPress={onSave}>
            <Text style={styles.saveButtonText}>Save Edit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const FONT = Platform.select({ ios: 'Manrope-Regular', android: 'Manrope-Regular' });
const FONT_BOLD = Platform.select({ ios: 'Manrope-Bold', android: 'Manrope-Bold' });
const FONT_SEMIBOLD = Platform.select({ ios: 'Manrope-SemiBold', android: 'Manrope-SemiBold' });

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(130,150,80,0.20)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 28,
    minWidth: 320,
    maxWidth: 380,
    width: '92%',
    shadowColor: '#c4d289',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.13,
    shadowRadius: 18,
    elevation: 10,
    position: 'relative',
  },
  deleteIcon: {
    position: 'absolute',
    top: 20,
    right: 18,
    backgroundColor: '#FDECEC',
    borderRadius: 16,
    padding: 7,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 22,
    justifyContent: 'flex-start',
  },
  headerText: {
    color: '#89964E',
    fontWeight: '700',
    fontSize: 21,
    fontFamily: FONT_BOLD,
    letterSpacing: 0.2,
  },
  label: {
    marginBottom: 6,
    marginTop: 8,
    color: '#768036',
    fontSize: 15.5,
    fontWeight: '600',
    fontFamily: FONT_SEMIBOLD,
    letterSpacing: 0.12,
    textTransform: 'capitalize',
  },
  input: {
    backgroundColor: '#F8F9F4',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D7DEBB',
    marginBottom: 14,
    paddingVertical: 12,
    paddingHorizontal: 15,
    fontSize: 17,
    color: '#697040',
    fontFamily: FONT,
  },
  inputDisabled: {
    color: '#B3B480',
    backgroundColor: '#F3F3EE',
    borderColor: '#E0E5C8',
  },
  inputIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9F4',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D7DEBB',
    marginBottom: 14,
    paddingRight: 5,
  },
  inputIcon: {
    flex: 1,
    marginBottom: 0,
    borderRightWidth: 0,
  },
  icon: {
    marginRight: 14,
  },
  saveButton: {
    backgroundColor: '#89964E',
    borderRadius: 9,
    marginTop: 10,
    paddingVertical: 14,
    alignItems: 'center',
    shadowColor: '#bfcf80',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.09,
    shadowRadius: 6,
    elevation: 4,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 18,
    letterSpacing: 1.1,
    fontFamily: FONT_SEMIBOLD,
  },
});
