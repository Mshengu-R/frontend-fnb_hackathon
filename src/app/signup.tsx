import { Link, router } from 'expo-router';
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

export default function SignupScreen() {
  const { signUp } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async () => {
    setError('');
    if (!name.trim() || !email.trim() || !gender.trim() || !password) {
      setError('Complete all fields to create your account.');
      return;
    }
    if (password.length < 6) {
      setError('Use a password with at least 6 characters.');
      return;
    }
    setBusy(true);
    try {
      await signUp({ name: name.trim(), email: email.trim(), gender: gender.trim(), password });
      router.replace({ pathname: '/login', params: { registered: 'true' } });
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Could not create your account.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          <Pressable accessibilityRole="button" onPress={() => router.replace('/login')}><Text style={styles.back}>‹  Back to sign in</Text></Pressable>
          <Text style={styles.eyebrow}>START YOUR JOURNEY</Text>
          <Text style={styles.title}>Create your account</Text>
          <Text style={styles.copy}>A few details help us make your study pathway personal to you.</Text>
          <View style={styles.form}>
            <Text style={styles.label}>Full name</Text>
            <TextInput accessibilityLabel="Full name" autoCapitalize="words" onChangeText={setName} placeholder="Your name" placeholderTextColor="#929D95" style={styles.input} value={name} />
            <Text style={styles.label}>Email address</Text>
            <TextInput accessibilityLabel="Email address" autoCapitalize="none" autoComplete="email" keyboardType="email-address" onChangeText={setEmail} placeholder="you@example.com" placeholderTextColor="#929D95" style={styles.input} value={email} />
            {/* <Text style={styles.label}>Gender</Text> */}
            {/* <TextInput accessibilityLabel="Gender" onChangeText={setGender} placeholder="Enter how you describe your gender" placeholderTextColor="#929D95" style={styles.input} value={gender} /> */}
            <Text style={styles.label}>Password</Text>
            <TextInput accessibilityLabel="Password" autoCapitalize="none" autoComplete="new-password" onChangeText={setPassword} placeholder="At least 6 characters" placeholderTextColor="#929D95" secureTextEntry style={styles.input} value={password} />
            {/* <Text style={styles.note}>Your password is protected by the Lets Learn backend and is never stored in plain text.</Text> */}
            {error ? <Text accessibilityRole="alert" style={styles.error}>{error}</Text> : null}
            <Pressable accessibilityRole="button" disabled={busy} onPress={submit} style={({ pressed }) => [styles.button, (pressed || busy) && styles.pressed]}>
              {busy ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.buttonText}>Create account</Text>}
            </Pressable>
          </View>
          <Text style={styles.footer}>By continuing, you acknowledge our <Link href="/privacy" style={styles.link}>privacy & data policy</Link>.</Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F7F8F3' },
  flex: { flex: 1 },
  scroll: { width: '100%', maxWidth: 500, alignSelf: 'center', padding: 24, paddingTop: 22, paddingBottom: 50 },
  back: { color: '#1F6758', fontSize: 14, paddingVertical: 10 },
  eyebrow: { color: '#1F6758', fontSize: 14, textAlign: 'center', letterSpacing: 1.4, marginTop: 22 },
  title: { color: '#173B35', fontSize: 31, fontWeight: '700', marginTop: 9 },
  copy: { color: '#75817A', fontSize: 14, lineHeight: 21, marginTop: 7 },
  form: { backgroundColor: '#FFFFFF', borderColor: '#E7EBE4', borderWidth: 1, borderRadius: 20, padding: 18, marginTop: 20 },
  label: { color: '#173B35', fontSize: 15, marginTop: 10, marginBottom: 6 },
  input: { color: '#173B35', backgroundColor: '#FAFBF8', borderColor: '#E7EBE4', borderWidth: 1, borderRadius: 11, minHeight: 46, paddingHorizontal: 12, fontSize: 14 },
  note: { color: '#75817A', fontSize: 11, lineHeight: 16, marginTop: 10 },
  button: { backgroundColor: '#1F6758', borderRadius: 12, minHeight: 49, alignItems: 'center', justifyContent: 'center', marginTop: 17 },
  buttonText: { color: '#FFFFFF', fontSize: 14, fontWeight: '600' },
  pressed: { opacity: 0.75 },
  error: { color: '#A33D34', fontSize: 12, lineHeight: 17, marginTop: 12 },
  footer: { color: '#75817A', fontSize: 12, lineHeight: 19, textAlign: 'center', marginTop: 20 },
  link: { color: '#1F6758', fontWeight: '600' },
});
