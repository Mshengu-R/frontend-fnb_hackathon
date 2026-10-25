import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
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
import { api } from '@/services/api';

const ink = '#173B35';
const green = '#1F6758';
const paper = '#F7F8F3';
const muted = '#75817A';
const line = '#E7EBE4';

export default function ProfileScreen() {
  const { state, updateProfile, signOut, deleteAccount } = useAuth();
  const session = state.status === 'signedIn' ? state.session : null;
  const [name, setName] = useState(session?.user.name ?? '');
  const [email, setEmail] = useState(session?.user.email ?? '');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!session) return;
    let active = true;
    api.getUser(session.user.id, session.token)
      .then((user) => {
        if (!active) return;
        setName(user.name);
        setEmail(user.email);
      })
      .catch((cause: unknown) => {
        if (active) setError(cause instanceof Error ? cause.message : 'Could not load your profile.');
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [session]);

  const save = async () => {
    setError('');
    if (!name.trim() || !email.trim()) {
      setError('Name and email are required.');
      return;
    }
    setSaving(true);
    try {
      await updateProfile({
        name: name.trim(),
        email: email.trim(),
        ...(password ? { password } : {}),
      });
      setPassword('');
      Alert.alert('Profile updated', 'Your details have been saved.');
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Could not update your profile.');
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = () => {
    const remove = async () => {
      try {
        await deleteAccount();
        router.replace('/login');
      } catch (cause) {
        setError(cause instanceof Error ? cause.message : 'Could not delete your account.');
      }
    };
    Alert.alert('Delete your account?', 'This permanently deletes your account and associated data. This cannot be undone.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete account', style: 'destructive', onPress: remove },
    ]);
  };

  const leave = async () => {
    try {
      await signOut();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'The backend sign-out request failed.');
    } finally {
      router.replace('/login');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.flex}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <Text style={styles.eyebrow}>YOUR ACCOUNT</Text>
          <Text style={styles.title}>Your profile</Text>
          <Text style={styles.subtitle}>Review and update the personal details Lets Learn stores for your account.</Text>
          <View style={styles.card}>
            {loading && <ActivityIndicator color={green} style={styles.loader} />}
            <Text style={styles.label}>Full name</Text>
            <TextInput value={name} onChangeText={setName} autoCapitalize="words" style={styles.input} accessibilityLabel="Full name" />
            <Text style={styles.label}>Email address</Text>
            <TextInput value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" style={styles.input} accessibilityLabel="Email address" />
            <Text style={styles.label}>New password</Text>
            <View style={styles.passwordInput}>
              <TextInput value={password} onChangeText={setPassword} secureTextEntry={!passwordVisible} autoCapitalize="none" style={styles.passwordTextInput} placeholder="Leave blank to keep current password" accessibilityLabel="New password" />
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={passwordVisible ? 'Hide password' : 'Show password'}
                onPress={() => setPasswordVisible((visible) => !visible)}
                hitSlop={8}
              >
                <Text style={styles.passwordToggle}>{passwordVisible ? 'Hide' : 'Show'}</Text>
              </Pressable>
            </View>
            <Text style={styles.helper}>Your password is never shown here. Enter a new one only if you want to change it.</Text>
            {error ? <Text accessibilityRole="alert" style={styles.error}>{error}</Text> : null}
            <Pressable onPress={save} disabled={saving || loading} style={({ pressed }) => [styles.primaryButton, (pressed || saving) && styles.pressed]}>
              <Text style={styles.primaryText}>{saving ? 'Saving…' : 'Save changes'}</Text>
            </Pressable>
          </View>
          <Pressable style={styles.linkRow} onPress={() => router.push('/about')}>
            <Text style={styles.linkText}>About Lets Learn</Text><Text style={styles.arrow}>›</Text>
          </Pressable>
          <Pressable style={styles.linkRow} onPress={() => router.push('/privacy')}>
            <Text style={styles.linkText}>Privacy & data policy</Text><Text style={styles.arrow}>›</Text>
          </Pressable>
          <Pressable style={styles.linkRow} onPress={leave}>
            <Text style={styles.linkText}>Sign out</Text><Text style={styles.arrow}>›</Text>
          </Pressable>
          <Pressable style={styles.deleteButton} onPress={confirmDelete}>
            <Text style={styles.deleteText}>Delete my account and data</Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: paper },
  flex: { flex: 1 },
  content: { width: '100%', maxWidth: 600, alignSelf: 'center', padding: 22, paddingBottom: 120 },
  eyebrow: { color: green, fontSize: 10, letterSpacing: 1.3 },
  title: { color: ink, fontSize: 31, fontWeight: '700', marginTop: 8 },
  subtitle: { color: muted, fontSize: 14, lineHeight: 21, marginTop: 8 },
  card: { backgroundColor: '#FFFFFF', borderColor: line, borderWidth: 1, borderRadius: 18, padding: 18, marginTop: 22 },
  loader: { marginBottom: 12 },
  label: { color: ink, fontSize: 12, marginTop: 13, marginBottom: 6 },
  input: { color: ink, backgroundColor: '#FAFBF8', borderColor: line, borderWidth: 1, borderRadius: 11, height: 46, paddingHorizontal: 12, fontSize: 14 },
  passwordInput: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FAFBF8', borderColor: line, borderWidth: 1, borderRadius: 11, height: 46, paddingHorizontal: 12 },
  passwordTextInput: { flex: 1, color: ink, fontSize: 14 },
  passwordToggle: { color: green, fontSize: 13, fontWeight: '600', paddingLeft: 12, paddingVertical: 8 },
  helper: { color: muted, fontSize: 11, lineHeight: 16, marginTop: 8 },
  error: { color: '#A33D34', fontSize: 12, lineHeight: 17, marginTop: 12 },
  primaryButton: { backgroundColor: green, borderRadius: 12, minHeight: 48, alignItems: 'center', justifyContent: 'center', marginTop: 18 },
  primaryText: { color: '#FFFFFF', fontSize: 14, fontWeight: '600' },
  pressed: { opacity: 0.75 },
  linkRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#FFFFFF', borderColor: line, borderWidth: 1, borderRadius: 13, padding: 16, marginTop: 11 },
  linkText: { color: ink, fontSize: 14 },
  arrow: { color: green, fontSize: 22 },
  deleteButton: { alignItems: 'center', padding: 17, marginTop: 12 },
  deleteText: { color: '#A33D34', fontSize: 13 },
});
