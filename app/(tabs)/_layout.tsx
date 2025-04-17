import { Tabs } from 'expo-router';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarStyle: {
          backgroundColor: '#f8f8f8',
        },
        tabBarActiveTintColor: '#1b5e20',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Calculadora',
          headerTitle: 'Verto SeedPro',
          tabBarIcon: ({ size, color }) => (
            Platform.select({
              web: <Ionicons name="calculator" size={size} color={color} />,
              default: <Ionicons name="calculator-outline" size={size} color={color} />
            })
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: 'Sobre',
          tabBarIcon: ({ size, color }) => (
            Platform.select({
              web: <Ionicons name="information-circle" size={size} color={color} />,
              default: <Ionicons name="information-circle-outline" size={size} color={color} />
            })
          ),
        }}
      />
    </Tabs>
  );
}