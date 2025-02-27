import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Linking,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function CalculatorScreen() {
  const [speed, setSpeed] = useState('');
  const [seedRate, setSeedRate] = useState('');
  const [spacing, setSpacing] = useState('');
  const [result, setResult] = useState<number | null>(null);

  const calculateResult = () => {
    if (speed && seedRate && spacing) {
      const calculation = (Number(speed) * Number(seedRate) * Number(spacing)) / 60;
      setResult(calculation);
    }
  };

  const openWhatsApp = () => {
    Linking.openURL('https://api.whatsapp.com/message/YAQQQC23PA6ZP1?autoload=1&app_absent=0');
  };

  return (
    <LinearGradient
      colors={['#f0f7f0', '#e8f5e9']}
      style={styles.gradient}
    >
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.headerContainer}>
            <View style={styles.logoContainer}>
              <Image
                source={require('../../2fdf7bcd-f288-43fe-ac80-8992348bfb09.png')}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>
            <TouchableOpacity 
              style={styles.whatsappButton}
              onPress={openWhatsApp}
            >
              <LinearGradient
                colors={['#25D366', '#128C7E']}
                style={styles.whatsappGradient}
              >
                <Ionicons name="logo-whatsapp" size={24} color="white" style={styles.whatsappIcon} />
                <Text style={styles.whatsappText}>Clique aqui para falar com um especialista</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
          
          <View style={styles.card}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Velocidade Média</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  keyboardType="decimal-pad"
                  value={speed}
                  onChangeText={setSpeed}
                  placeholder="Ex: 5.5"
                />
                <Text style={styles.unit}>km/h</Text>
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Despejo de Semente</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  keyboardType="decimal-pad"
                  value={seedRate}
                  onChangeText={setSeedRate}
                  placeholder="Ex: 60"
                />
                <Text style={styles.unit}>kg/ha</Text>
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Espaçamento</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  keyboardType="decimal-pad"
                  value={spacing}
                  onChangeText={setSpacing}
                  placeholder="Ex: 0.45"
                />
                <Text style={styles.unit}>m</Text>
              </View>
            </View>

            <TouchableOpacity 
              style={styles.button}
              onPress={calculateResult}
            >
              <LinearGradient
                colors={['#2e7d32', '#1b5e20']}
                style={styles.buttonGradient}
              >
                <Text style={styles.buttonText}>Calcular</Text>
              </LinearGradient>
            </TouchableOpacity>

            {result !== null && (
              <View style={styles.resultContainer}>
                <LinearGradient
                  colors={['#e8f5e9', '#c8e6c9']}
                  style={styles.resultGradient}
                >
                  <Text style={styles.resultLabel}>Resultado</Text>
                  <View style={styles.resultRow}>
                    <Text style={styles.resultValue}>{result.toFixed(2)}</Text>
                    <Text style={styles.resultUnit}>Gramas por Dosador</Text>
                  </View>
                </LinearGradient>
              </View>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  headerContainer: {
    gap: 16,
    marginBottom: 20,
  },
  logoContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logo: {
    width: '100%',
    height: 120,
  },
  whatsappButton: {
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  whatsappGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  whatsappIcon: {
    marginLeft: 8,
  },
  whatsappText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#2e7d32',
    marginBottom: 8,
    fontWeight: '600',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    overflow: 'hidden',
  },
  input: {
    flex: 1,
    padding: 12,
    fontSize: 16,
    color: '#333',
  },
  unit: {
    paddingRight: 12,
    color: '#666',
    fontSize: 14,
  },
  button: {
    marginTop: 10,
    borderRadius: 8,
    overflow: 'hidden',
  },
  buttonGradient: {
    padding: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  resultContainer: {
    marginTop: 24,
    borderRadius: 8,
    overflow: 'hidden',
  },
  resultGradient: {
    padding: 20,
    alignItems: 'center',
  },
  resultLabel: {
    fontSize: 16,
    color: '#1b5e20',
    marginBottom: 8,
    fontWeight: '500',
  },
  resultRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  resultValue: {
    fontSize: 28,
    color: '#1b5e20',
    fontWeight: 'bold',
  },
  resultUnit: {
    fontSize: 16,
    color: '#2e7d32',
    fontWeight: '500',
  },
});