import { useState } from 'react';
import { TextInput, View } from 'react-native';

interface ModernInputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  isPassword?: boolean;
}

export default function FormInput({
  placeholder,
  value,
  onChangeText,
  isPassword = false,
}: ModernInputProps) {
  const [focused, setFocused] = useState(false);

  return (
    <View className="w-full mb-4">
      <TextInput
        // className={`
        //   w-full px-4 py-3 text-base rounded-lg border bg-white text-gray-900
        //   ${focused ? 'border-[#89964E] shadow-md shadow-[#89964E]' : 'border-gray-300'}
        // `}
      className={`
    w-full px-4 py-3 text-base rounded-lg border bg-white text-gray-900
    ${focused ? 'border-[#89964E] shadow-md shadow-[#89964E]' : 'border-gray-300 shadow-none'}
  `}
        placeholder={placeholder}
        placeholderTextColor="#A3A3A3"
        secureTextEntry={isPassword}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}
