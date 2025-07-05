import { Image, View } from 'react-native';

export default function Intro() {
    return (
        <View className='flex-1 items-center justify-center bg-white'>
                <Image
                    source={require('@/assets/images/primary_logo.png')}
                    className='w-1/5 h-1/5 mb-4'
                />
        </View>
    );
}