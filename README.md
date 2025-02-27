# Calculadora Verto

Aplicativo de calculadora para despejo de sementes da Verto Soluções Agrícolas.

## Recursos

- Cálculo de despejo de sementes baseado em:
  - Velocidade média (km/h)
  - Taxa de despejo (kg/ha)
  - Espaçamento entre dosadores (m)
- Interface intuitiva e responsiva
- Suporte para dispositivos Android e iOS

## Processo de Build e Publicação

### Pré-requisitos

1. Conta no [Expo](https://expo.dev/)
2. Conta de desenvolvedor no [Google Play Console](https://play.google.com/console/)
3. Node.js e npm instalados

### Configuração Inicial

```bash
# Instalar dependências
npm install

# Instalar EAS CLI
npm install -g eas-cli

# Login no Expo
eas login
```

### Configuração do Projeto

```bash
# Configurar o projeto no EAS
eas build:configure
```

### Builds para Teste

```bash
# Criar build de preview (APK)
npm run build:android
```

### Build de Produção

```bash
# Criar build de produção (AAB)
npm run build:production
```

### Submissão para Google Play

1. Crie uma chave de API de serviço no Google Play Console
2. Salve a chave como `pc-api-key.json` na raiz do projeto
3. Execute o comando de submissão:

```bash
npm run submit:android
```

## Estrutura do Projeto

```
/
├── app/                  # Rotas e navegação (Expo Router)
│   ├── _layout.tsx       # Layout principal
│   ├── (tabs)/           # Navegação por abas
│   │   ├── _layout.tsx   # Configuração das abas
│   │   ├── index.tsx     # Tela da calculadora
│   │   └── about.tsx     # Tela sobre
│   └── +not-found.tsx    # Página 404
├── assets/               # Recursos estáticos
│   └── images/           # Imagens e ícones
├── components/           # Componentes reutilizáveis
└── package.json          # Dependências e scripts
```

## Licença

Propriedade da Verto Soluções Agrícolas. Todos os direitos reservados.