import { Feather } from '@expo/vector-icons';
import { Text, View } from 'react-native';

interface AddPlanWarningProps {
    currentPercentage?: number;
}

export function AddPlanWarning({ currentPercentage = 0 }: AddPlanWarningProps) {
    const maxPercentage = 100;
    const remaining = maxPercentage - currentPercentage;
    const reachedLimit = currentPercentage >= maxPercentage;

    // Define colors based on reachedLimit
    const colors = reachedLimit
        ? {
                background: 'rgba(255, 99, 71, 0.18)', // light red
                icon: '#FF6347', // tomato red
                title: '#FF6347', // tomato red
                text: '#B22222', // firebrick
            }
        : {
                background: 'rgba(209, 232, 108, 0.4)', // original color
                icon: '#89964E', // original icon color
                title: '#89964E', // match icon color
                text: '#6B7280', // original muted text
            };

    return (
        <View
            style={{
                backgroundColor: colors.background,
            }}
            className="flex-row items-start border-0 rounded-2xl p-5 mx-4 mb-4"
        >
            <View className="pt-1 mr-3">
                <Feather 
                    name="info" 
                    size={24} 
                    color={colors.icon}
                    style={{ opacity: reachedLimit ? 0.8 : 0.7 }} 
                />
            </View>
            <View className="flex-1">
                <Text
                    className="font-manrope-semibold text-base mb-1"
                    style={{ color: colors.title }}
                >
                    {reachedLimit ? 'Maximum Percentage Reached' : 'Plan Percentage Remaining'}
                </Text>
                <Text
                    className="text-sm font-manrope-regular"
                    style={{ color: colors.text }}
                >
                    {reachedLimit
                        ? "You've allocated 100% of your available income. To add a new plan, please remove or adjust an existing one."
                        : (
                            <>
                                You can allocate up to{' '}
                                <Text className="font-manrope-bold" style={{ color: colors.title }}>{remaining}%</Text>
                                {' '}more. If you reach the 100% limit, you'll need to delete a plan before adding a new one.
                            </>
                        )}
                </Text>
            </View>
        </View>
    );
}
