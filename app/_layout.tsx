import React from 'react';
import { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, Platform, Dimensions } from 'react-native';
import { Video, ResizeMode } from 'expo-av';

declare global {
  interface Window {
    frameworkReady?: () => void;
  }
}

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const VIDEO_ASPECT_RATIO = 9 / 16; // Proporção vertical (9:16)

export default function RootLayout() {
  const [showVideo, setShowVideo] = useState(true);

  useEffect(() => {
    window.frameworkReady?.();
  }, []);

  // Calcula as dimensões do vídeo mantendo a proporção 9:16
  const videoWidth = Math.min(SCREEN_WIDTH, SCREEN_HEIGHT * VIDEO_ASPECT_RATIO);
  const videoHeight = videoWidth / VIDEO_ASPECT_RATIO;

  if (showVideo && Platform.OS !== 'web') {
    return (
      <View style={styles.videoContainer}>
        <Video
          // Como o vídeo está na raiz do projeto e este arquivo está em "app",
          // o caminho relativo deve subir um nível:
          source={require('../encerramento-verto-fundo-branco.mp4')}
          style={[
            styles.video,
            {
              width: videoWidth,
              height: videoHeight,
            }
          ]}
          shouldPlay
          useNativeControls={false}
          isLooping={false}
          resizeMode={ResizeMode.COVER}
          onPlaybackStatusUpdate={(status: any) => {
            if (status.isLoaded && status.didJustFinish) {
              setShowVideo(false);
            }
          }}
        />
      </View>
    );
  }

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}

const styles = StyleSheet.create({
  videoContainer: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    backgroundColor: 'white',
  },
});
