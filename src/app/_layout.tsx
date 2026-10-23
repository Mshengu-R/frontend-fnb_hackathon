import { DarkTheme, DefaultTheme, Stack, ThemeProvider, router, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, useColorScheme, View } from 'react-native';

import { AuthProvider, useAuth } from '@/auth/auth-context';

function AppNavigator() {
  const { state } = useAuth();
  const segments = useSegments();
  useEffect(() => {
    if (state.status === 'restoring') return;

    const firstSegment = segments[0];
    const isAuthRoute = firstSegment === 'login' || firstSegment === 'signup';
    const isPublicRoute = isAuthRoute || firstSegment === 'privacy';

    if (state.status === 'signedIn' && isAuthRoute) {
      router.replace('/');
    } else if (state.status !== 'signedIn' && !isPublicRoute) {
      router.replace('/login');
    }
  }, [segments, state.status]);

  if (state.status === 'restoring') {
    return (
      <View style={styles.loading}>
        <ActivityIndicator color="#1F6758" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="login" />
      <Stack.Screen name="signup" />
      <Stack.Screen name="privacy" />
      <Stack.Screen name="chat" />
    </Stack>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <AuthProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <AppNavigator />
      </ThemeProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  loading: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F7F8F3' },
});
