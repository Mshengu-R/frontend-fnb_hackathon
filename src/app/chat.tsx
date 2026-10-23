import { Link } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ChatScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <Link href="/" style={styles.back}>‹</Link>
        <View style={styles.headerCopy}>
          <Text style={styles.title}>Study pathway chat</Text>
          <Text style={styles.subtitle}>A future Lets Learn assistant</Text>
        </View>
        <Text style={styles.icon}>✳</Text>
      </View>
      <ScrollView contentContainerStyle={styles.messages}>
        <View style={styles.notice}>
          <Text style={styles.noticeTitle}>Chatbot connection coming soon</Text>
          <Text style={styles.noticeBody}>This chat screen is ready for the assistant integration. It is not connected to an AI service yet, so no message will be sent or answered here.</Text>
        </View>
        <Text style={styles.promptHeading}>Things the assistant can help with</Text>
        {['Finding a suitable study pathway', 'Comparing bursaries and NSFAS guidance', 'Preparing application documents', 'Planning student costs and study habits'].map((item) => (
          <View key={item} style={styles.prompt}>
            <Text style={styles.bullet}>•</Text><Text style={styles.promptText}>{item}</Text>
          </View>
        ))}
        <Text style={styles.helper}>When connected, check important funding dates and requirements with the official provider.</Text>
      </ScrollView>
      <View style={styles.composer}>
        <TextInput editable={false} placeholder="Chat will be available soon" placeholderTextColor="#89938B" style={styles.input} accessibilityLabel="Chat input, unavailable until the assistant is connected" />
        <Pressable disabled accessibilityRole="button" style={styles.send}><Text style={styles.sendText}>↑</Text></Pressable>
      </View>
      <Link href="/privacy" style={styles.policy}>Privacy & how chat data will be handled</Link>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F7F8F3' },
  header: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 19, paddingVertical: 14, borderBottomColor: '#E7EBE4', borderBottomWidth: 1 },
  back: { color: '#1F6758', fontSize: 27, paddingHorizontal: 4 },
  headerCopy: { flex: 1 },
  title: { color: '#173B35', fontSize: 17, fontWeight: '600' },
  subtitle: { color: '#75817A', fontSize: 11, marginTop: 2 },
  icon: { color: '#1F6758', fontSize: 21 },
  messages: { width: '100%', maxWidth: 680, alignSelf: 'center', padding: 20, flexGrow: 1 },
  notice: { backgroundColor: '#E8F3ED', borderRadius: 17, padding: 17, marginTop: 10 },
  noticeTitle: { color: '#173B35', fontSize: 15, fontWeight: '600' },
  noticeBody: { color: '#65746B', fontSize: 13, lineHeight: 20, marginTop: 7 },
  promptHeading: { color: '#173B35', fontSize: 14, fontWeight: '600', marginTop: 25, marginBottom: 8 },
  prompt: { flexDirection: 'row', gap: 9, paddingVertical: 10 },
  bullet: { color: '#1F6758', fontSize: 17 },
  promptText: { color: '#65746B', fontSize: 13, lineHeight: 19, flex: 1 },
  helper: { color: '#75817A', fontSize: 11, lineHeight: 17, marginTop: 18 },
  composer: { flexDirection: 'row', gap: 9, paddingHorizontal: 18, paddingVertical: 12, borderTopColor: '#E7EBE4', borderTopWidth: 1 },
  input: { flex: 1, minHeight: 45, borderRadius: 14, borderColor: '#E7EBE4', borderWidth: 1, backgroundColor: '#FFFFFF', paddingHorizontal: 13, fontSize: 13 },
  send: { height: 45, width: 45, borderRadius: 15, backgroundColor: '#BFCFC5', alignItems: 'center', justifyContent: 'center' },
  sendText: { color: '#FFFFFF', fontSize: 22 },
  policy: { color: '#75817A', textAlign: 'center', fontSize: 10, paddingBottom: 12 },
});
