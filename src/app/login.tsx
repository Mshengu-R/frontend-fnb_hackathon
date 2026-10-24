import { Link, router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAuth } from '@/auth/auth-context';

export default function LoginScreen() {
  const { signIn, state } = useAuth();
  const params = useLocalSearchParams<{ registered?: string }>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async () => {
    setError('');
    if (!email.trim() || !password) {
      setError('Enter your email address and password.');
      return;
    }
    setBusy(true);
    try {
      await signIn(email.trim(), password);
      router.replace('/');
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Could not sign in.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          <View style={styles.brandMark}><Text style={styles.mark}>L</Text></View>
          <Text style={styles.brand}>Lets Learn</Text>
          <Text style={styles.eyebrow}>YOUR NEXT CHAPTER STARTS HERE</Text>
          <Text style={styles.title}>Welcome back</Text>
          <Text style={styles.copy}>Sign in to continue planning your study journey.</Text>
          {params.registered === 'true' && <Text style={styles.success}>Account created. Sign in to get started.</Text>}
          {state.status === 'error' && <Text accessibilityRole="alert" style={styles.error}>{state.message}</Text>}
          <View style={styles.form}>
            <Text style={styles.label}>Email address</Text>
            <TextInput
              accessibilityLabel="Email address"
              autoCapitalize="none"
              autoComplete="email"
              keyboardType="email-address"
              onChangeText={setEmail}
              placeholder="you@example.com"
              placeholderTextColor="#929D95"
              style={styles.input}
              value={email}
            />
            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordInput}>
              <TextInput
                accessibilityLabel="Password"
                autoCapitalize="none"
                autoComplete="password"
                onChangeText={setPassword}
                onSubmitEditing={submit}
                placeholder="Enter your password"
                placeholderTextColor="#929D95"
                secureTextEntry={!passwordVisible}
                style={styles.passwordTextInput}
                value={password}
              />
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={passwordVisible ? 'Hide password' : 'Show password'}
                onPress={() => setPasswordVisible((visible) => !visible)}
                hitSlop={8}
              >
                <Text style={styles.passwordToggle}>{passwordVisible ? 'Hide' : 'Show'}</Text>
              </Pressable>
            </View>
            {error ? <Text accessibilityRole="alert" style={styles.error}>{error}</Text> : null}
            <Pressable accessibilityRole="button" disabled={busy} onPress={submit} style={({ pressed }) => [styles.button, (pressed || busy) && styles.pressed]}>
              {busy ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.buttonText}>Sign in</Text>}
            </Pressable>
          </View>
          <Text style={styles.footer}>New to Lets Learn? <Link href="/signup" style={styles.link}>Create an account</Link></Text>
          <Link href="/privacy" style={styles.policy}>Privacy & data policy</Link>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F7F8F3' },
  flex: { flex: 1 },
  scroll: { width: '100%', maxWidth: 500, alignSelf: 'center', padding: 24, paddingTop: 40, paddingBottom: 50 },
  brandMark: { width: 46, height: 46, borderRadius: 16, backgroundColor: '#1F6758', alignItems: 'center', justifyContent: 'center' },
  mark: { color: '#FFFFFF', fontSize: 29, fontWeight: '700' },
  brand: { color: '#173B35', fontSize: 19, fontWeight: '700', marginTop: 12 },
  eyebrow: { color: '#1F6758', fontSize: 9, letterSpacing: 1.4, marginTop: 42 },
  title: { color: '#173B35', fontSize: 33, fontWeight: '700', marginTop: 10 },
  copy: { color: '#75817A', fontSize: 14, lineHeight: 21, marginTop: 7 },
  form: { backgroundColor: '#FFFFFF', borderColor: '#E7EBE4', borderWidth: 1, borderRadius: 20, padding: 18, marginTop: 25 },
  label: { color: '#173B35', fontSize: 15, marginTop: 11, marginBottom: 7 },
  input: { color: '#173B35', backgroundColor: '#FAFBF8', borderColor: '#E7EBE4', borderWidth: 1, borderRadius: 11, minHeight: 47, paddingHorizontal: 12, fontSize: 14 },
  passwordInput: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FAFBF8', borderColor: '#E7EBE4', borderWidth: 1, borderRadius: 11, minHeight: 47, paddingHorizontal: 12 },
  passwordTextInput: { flex: 1, color: '#173B35', fontSize: 14, paddingVertical: 10 },
  passwordToggle: { color: '#1F6758', fontSize: 13, fontWeight: '600', paddingLeft: 12, paddingVertical: 8 },
  button: { backgroundColor: '#1F6758', borderRadius: 12, minHeight: 49, alignItems: 'center', justifyContent: 'center', marginTop: 20 },
  buttonText: { color: '#FFFFFF', fontSize: 14, fontWeight: '600' },
  pressed: { opacity: 0.75 },
  error: { color: '#A33D34', fontSize: 12, lineHeight: 17, marginTop: 12 },
  success: { color: '#1F6758', fontSize: 13, marginTop: 15 },
  footer: { textAlign: 'center', color: '#75817A', fontSize: 13, marginTop: 22 },
  link: { color: '#1F6758', fontWeight: '600' },
  policy: { color: '#75817A', fontSize: 13, textAlign: 'center', marginTop: 19 },
});
