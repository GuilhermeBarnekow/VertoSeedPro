import { useState } from 'react';
import {
  Alert,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Linking,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { TextInputMask } from 'react-native-masked-text';

export default function CalculatorScreen() {
  const [speed, setSpeed] = useState('');
  const [seedRate, setSeedRate] = useState('');
  const [spacing, setSpacing] = useState('');
  const [spacingUnit, setSpacingUnit] = useState<'m' | 'cm'>('m');
  const [result, setResult] = useState<number | null>(null);

  // Estados para erro em cada input
  const [speedError, setSpeedError] = useState('');
  const [seedRateError, setSeedRateError] = useState('');
  const [spacingError, setSpacingError] = useState('');

  /**
   * Converte a string numérica para número, tratando os formatos:
   * - Se houver ponto e vírgula, verifica qual ocorre por último:
   *    - Se a vírgula ocorre depois do ponto, assume formato BR: remove os pontos e converte vírgula para ponto.
   *    - Caso contrário, remove vírgulas (separador de milhar) e mantém o ponto.
   * - Se houver apenas vírgula, converte para ponto.
   */
  const parseInput = (value: string): number => {
    let sanitized = value.trim();
    sanitized = sanitized.replace(/[^0-9.,-]/g, '');

    if (sanitized.includes('.') && sanitized.includes(',')) {
      if (sanitized.lastIndexOf(',') > sanitized.lastIndexOf('.')) {
        // Formato brasileiro: "1.234,56" -> remove pontos e troca vírgula por ponto
        sanitized = sanitized.replace(/\./g, '');
        sanitized = sanitized.replace(/,/g, '.');
      } else {
        // Formato inglês: "1,234.56" -> remove vírgulas
        sanitized = sanitized.replace(/,/g, '');
      }
    } else if (sanitized.includes(',')) {
      // Se tiver só vírgula, troca por ponto
      sanitized = sanitized.replace(/,/g, '.');
    }
    const parsed = parseFloat(sanitized);
    return isNaN(parsed) ? 0 : parsed;
  };

  // Função para validar cada campo individualmente
  const validateField = (value: string, fieldName: string): string => {
    const numberValue = parseInput(value);
    if (!value || value.trim() === '') {
      return 'Campo obrigatório';
    }
    if (isNaN(numberValue) || numberValue <= 0) {
      return 'Insira um valor numérico válido';
    }
    return '';
  };

  const handleSpeedBlur = () => {
    setSpeedError(validateField(speed, 'speed'));
  };

  const handleSeedRateBlur = () => {
    setSeedRateError(validateField(seedRate, 'seedRate'));
  };

  const handleSpacingBlur = () => {
    setSpacingError(validateField(spacing, 'spacing'));
  };

  const calculateResult = () => {
    // Validação dos campos
    const errSpeed = validateField(speed, 'speed');
    const errSeed = validateField(seedRate, 'seedRate');
    const errSpacing = validateField(spacing, 'spacing');

    setSpeedError(errSpeed);
    setSeedRateError(errSeed);
    setSpacingError(errSpacing);

    if (errSpeed || errSeed || errSpacing) {
      Alert.alert('Atenção', 'Por favor, corrija os erros nos campos.');
      setResult(null);
      return;
    }

    // Conversão das entradas
    const spd = parseInput(speed);     // Velocidade em km/h
    const seed = parseInput(seedRate); // Despejo em kg/ha

    let spacingInM = parseInput(spacing);
    if (spacingUnit === 'cm') {
      spacingInM = spacingInM / 100; // Converte de cm para m, se necessário
    }

    // 1. Converter velocidade de km/h para m/min:
    const speedMMin = (spd * 1000) / 60;  // Ex.: (6 * 1000) / 60 = 100 m/min

    // 2. Converter a taxa de semeadura de kg/ha para g/m²:
    const seedGm2 = (seed * 1000) / 10000; // Ex.: (5 * 1000) / 10000 = 0.5 g/m²

    // 3. Área coberta em 1 minuto:
    const areaM2Min = speedMMin * spacingInM; // Ex.: 100 m/min * 0.45 m = 45 m²/min

    // 4. Cálculo final: gramas por dosador por minuto
    const calculation = areaM2Min * seedGm2; // Ex.: 45 * 0.5 = 22.5 g/min

    setResult(calculation);
  };

  const openWhatsApp = () => {
    Linking.openURL('http://wa.me/5554999112550');
  };

  return (
    <LinearGradient colors={['#f0f7f0', '#e8f5e9']} style={styles.gradient}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.headerContainer}>
            <View style={styles.logoContainer}>
              <Image
                source={require('../../logo.png')}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>
            <TouchableOpacity style={styles.whatsappButton} onPress={openWhatsApp}>
              <LinearGradient
                colors={['#25D366', '#128C7E']}
                style={styles.whatsappGradient}
              >
                <Ionicons
                  name="logo-whatsapp"
                  size={24}
                  color="white"
                  style={styles.whatsappIcon}
                />
                <Text style={styles.whatsappText}>
                  Clique aqui para falar com um especialista
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          <View style={styles.card}>
            {/* Velocidade Média */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Velocidade Média</Text>
              <View style={styles.inputContainer}>
                <TextInputMask
                  type={'custom'}
                  options={{
                    mask: '999.9',
                  }}
                  style={styles.input}
                  keyboardType="decimal-pad"
                  value={speed}
                  onChangeText={setSpeed}
                  onBlur={handleSpeedBlur}
                  placeholder="Ex: 5.5"
                />
                <Text style={styles.unit}>km/h</Text>
              </View>
              {speedError ? <Text style={styles.errorText}>{speedError}</Text> : null}
            </View>

            {/* Despejo de Semente */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Despejo de Semente</Text>
              <View style={styles.inputContainer}>
                <TextInputMask
                  type={'custom'}
                  options={{
                    mask: '999.9',
                  }}
                  style={styles.input}
                  keyboardType="decimal-pad"
                  value={seedRate}
                  onChangeText={setSeedRate}
                  onBlur={handleSeedRateBlur}
                  placeholder="Ex: 60"
                />
                <Text style={styles.unit}>kg/ha</Text>
              </View>
              {seedRateError ? <Text style={styles.errorText}>{seedRateError}</Text> : null}
            </View>

            {/* Espaçamento com Picker para a unidade */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Espaçamento</Text>
              <View style={styles.inputContainer}>
                <TextInputMask
                  type={'custom'}
                  options={{
                    mask: spacingUnit === 'cm' ? '999' : '9.99',
                  }}
                  style={[styles.input, { flex: 2 }]}
                  keyboardType="decimal-pad"
                  value={spacing}
                  onChangeText={setSpacing}
                  onBlur={handleSpacingBlur}
                  placeholder={spacingUnit === 'cm' ? 'Ex: 45' : 'Ex: 0.45'}
                />
                <Picker
                  selectedValue={spacingUnit}
                  style={[styles.unitPicker, { flex: 1 }]}
                  onValueChange={(itemValue: 'm' | 'cm') => setSpacingUnit(itemValue)}
                >
                  <Picker.Item label="m" value="m" />
                  <Picker.Item label="cm" value="cm" />
                </Picker>
              </View>
              {spacingError ? <Text style={styles.errorText}>{spacingError}</Text> : null}
            </View>

            <TouchableOpacity style={styles.button} onPress={calculateResult}>
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
                    <Text style={styles.resultUnit}>
                      Gramas por Dosador / Por Minuto
                    </Text>
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
    shadowOffset: { width: 0, height: 2 },
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
    shadowOffset: { width: 0, height: 2 },
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
    shadowOffset: { width: 0, height: 2 },
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
    padding: 12,
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  unit: {
    paddingRight: 12,
    color: '#666',
    fontSize: 14,
  },
  unitPicker: {
    backgroundColor: '#f5f5f5',
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
    flexWrap: 'wrap',
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
  errorText: {
    color: '#D32F2F',
    marginTop: 4,
    marginLeft: 4,
    fontSize: 12,
  },
});
