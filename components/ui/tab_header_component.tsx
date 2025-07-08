import { TouchableOpacity , Text } from "react-native"
import { Feather } from '@expo/vector-icons';
interface TabHeaderComponentProps {
    activeTab: 'plans' | 'goals';
    setActiveTab: (tab: 'plans' | 'goals') => void;
    tabName: string; // Optional prop if you want to use it for something else
    }

export default function TabHeaderComponent({ tabName, activeTab, setActiveTab }: TabHeaderComponentProps) {
    const isActive = activeTab === tabName.toLowerCase();
    return (
            <TouchableOpacity
              className={`flex-row items-center px-4 py-2 rounded-full w-1/3 justify-center ${
            isActive ? 'bg-brand' : 'bg-transparent'
              }`}
              onPress={() => setActiveTab(tabName.toLowerCase() as 'plans' | 'goals')}
            >
              <Feather
            name="file-text"
            size={18}
            color={isActive ? 'white' : '#89964E'}
            style={{ marginRight: 4 }}
              />
              <Text className={`text-lg font-manrope-semibold ${isActive ? 'text-white' : 'text-brand'}`}>
            {tabName}
              </Text>
            </TouchableOpacity>
          );
    
}