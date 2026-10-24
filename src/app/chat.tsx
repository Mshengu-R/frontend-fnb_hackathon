import { Link } from 'expo-router';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAuth } from '@/auth/auth-context';
import MetaChatBot from '@/components/metachatChatBot';

export default function ChatScreen() {
  const { state } = useAuth();
  const token = state.status === 'signedIn' ? state.session.token : null;

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <Link href="/" style={styles.back}>‹</Link>
        <View style={styles.headerCopy}>
          <Text style={styles.title}>Study pathway chat</Text>
          <Text style={styles.subtitle}>AI study assistant</Text>
        </View>
        <Text style={styles.icon}>✳</Text>
      </View>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.flex}>
        <MetaChatBot token={token} />
        <Link href="/privacy" style={styles.policy}>
          Chat messages are sent to our AI service. Verify important information with official sources.
        </Link>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F7F8F3' },
  flex: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 19, paddingVertical: 14, borderBottomColor: '#E7EBE4', borderBottomWidth: 1 },
  back: { color: '#1F6758', fontSize: 27, paddingHorizontal: 4 },
  headerCopy: { flex: 1 },
  title: { color: '#173B35', fontSize: 17, fontWeight: '600' },
  subtitle: { color: '#75817A', fontSize: 11, marginTop: 2 },
  icon: { color: '#1F6758', fontSize: 21 },
  policy: { color: '#75817A', textAlign: 'center', fontSize: 10, paddingHorizontal: 16, paddingBottom: 12 },
});
