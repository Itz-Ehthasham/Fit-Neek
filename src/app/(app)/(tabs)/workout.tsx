import React from 'react'
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function workout() {
  return (
    <SafeAreaView className='flex flex-1 items-center justify-center'>  
        <Text>Workout Screen   </Text>
    </SafeAreaView>
  );
}

export default workout;