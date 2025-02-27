import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Linking, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function AboutScreen() {
  const openWhatsApp = () => {
    Linking.openURL('https://api.whatsapp.com/message/YAQQQC23PA6ZP1?autoload=1&app_absent=0');
  };

  return (
    <LinearGradient
      colors={['#f0f7f0', '#e8f5e9']}
      style={styles.gradient}
    >
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <View style={styles.headerContainer}>
            <View style={styles.logoContainer}>
              <Image
                source={{ uri: 'https://stackblitz.com/storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBMUdKWUE9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--319a3049cf1c3d928c024ae013ee747be75c4ea8/2fdf7bcd-f288-43fe-ac80-8992348bfb09.png' }}
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
                {Platform.select({
                  web: <Ionicons name="logo-whatsapp" size={24} color="white" style={styles.whatsappIcon} />,
                  default: <Ionicons name="logo-whatsapp" size={24} color="white" style={styles.whatsappIcon} />
                })}
                <Text style={styles.whatsappText}>Clique aqui para falar com um especialista</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
          
          <Text style={styles.title}>Verto Soluções Agrícolas</Text>
          
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Sobre o Aplicativo</Text>
            <Text style={styles.text}>
              Esta calculadora foi desenvolvida para auxiliar no cálculo preciso de
              despejo de sementes, considerando a velocidade média, taxa de despejo
              e espaçamento entre dosadores.
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Como Usar</Text>
            <View style={styles.stepContainer}>
              <View style={styles.step}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>1</Text>
                </View>
                <Text style={styles.stepText}>Insira a velocidade média em km/h</Text>
              </View>
              
              <View style={styles.step}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>2</Text>
                </View>
                <Text style={styles.stepText}>Digite a taxa de despejo em kg/ha</Text>
              </View>
              
              <View style={styles.step}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>3</Text>
                </View>
                <Text style={styles.stepText}>Informe o espaçamento em metros</Text>
              </View>
              
              <View style={styles.step}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>4</Text>
                </View>
                <Text style={styles.stepText}>Pressione "Calcular" para obter o resultado</Text>
              </View>
            </View>
          </View>

          <View style={[styles.card, styles.disclaimerCard]}>
            <Text style={[styles.sectionTitle, styles.disclaimerTitle]}>Isenção de Responsabilidade</Text>
            <Text style={styles.disclaimerText}>
              As informações fornecidas por este aplicativo são meramente informativas e não substituem o aconselhamento técnico especializado. O usuário assume total responsabilidade pela aplicação dos cálculos de dispersão de sementes em sua lavoura, isentando os desenvolvedores de quaisquer danos ou prejuízos decorrentes do uso indevido dos dados.
            </Text>
          </View>
        </View>
      </ScrollView>
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
  content: {
    padding: 20,
  },
  headerContainer: {
    gap: 16,
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1b5e20',
    textAlign: 'center',
    marginVertical: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 24,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  disclaimerCard: {
    backgroundColor: '#fff8e1',
    borderWidth: 1,
    borderColor: '#ffecb3',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2e7d32',
    marginBottom: 16,
  },
  disclaimerTitle: {
    color: '#f57c00',
  },
  text: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
  },
  disclaimerText: {
    fontSize: 14,
    color: '#795548',
    lineHeight: 22,
    fontStyle: 'italic',
  },
  stepContainer: {
    gap: 16,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#e8f5e9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepNumberText: {
    color: '#1b5e20',
    fontSize: 16,
    fontWeight: '600',
  },
  stepText: {
    flex: 1,
    fontSize: 16,
    color: '#555',
  },
});