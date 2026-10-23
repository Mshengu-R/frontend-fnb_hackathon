import { Link } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PrivacyScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        <Link href="/" style={styles.back}>‹  Back to Lets Learn</Link>
        <Text style={styles.eyebrow}>PRIVACY & DATA</Text>
        <Text style={styles.title}>Your information matters</Text>
        <View style={styles.notice}>
          <Text style={styles.noticeTitle}>Draft policy — needs review before publication</Text>
          <Text style={styles.body}>This is a starter summary for the prototype, not legal advice or a final POPIA policy. Add your organisation&apos;s legal name, privacy contact, retention schedule and approved policy before launch.</Text>
        </View>
        <Text style={styles.heading}>Information used</Text>
        <Text style={styles.body}>The current account features use your name, email address and gender to create and manage your profile. Your password is sent to the backend for authentication and should only be stored there as a secure hash. A JWT sign-in token is kept on your device to authenticate requests.</Text>
        <Text style={styles.heading}>Why it is used</Text>
        <Text style={styles.body}>Account information supports sign-in, profile changes and account deletion. Study support guides, budget estimates and wellbeing check-ins are designed to run on your device unless you choose to send information to a connected service.</Text>
        <Text style={styles.heading}>Your choices</Text>
        <Text style={styles.body}>You can review and update your profile, sign out, or request account deletion from Profile. Deletion removes the account through the configured backend; confirm any retention obligations and backups with the service operator.</Text>
        <Text style={styles.heading}>Chat assistant</Text>
        <Text style={styles.body}>The chatbot is not connected yet. Before enabling it, publish what messages are sent, which provider processes them, how long they are retained, and how to request deletion.</Text>
        <Text style={styles.heading}>Contact and retention details</Text>
        <Text style={styles.body}>[Add the responsible organisation, privacy officer email, data retention period, and complaint/contact process before release.]</Text>
        <View style={styles.footer}>
          <Text style={styles.footerText}>Please replace this draft with a reviewed privacy notice before collecting real student information.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F7F8F3' },
  content: { width: '100%', maxWidth: 650, alignSelf: 'center', padding: 22, paddingBottom: 50 },
  back: { color: '#1F6758', fontSize: 13, paddingVertical: 8 },
  eyebrow: { color: '#1F6758', fontSize: 10, letterSpacing: 1.4, marginTop: 25 },
  title: { color: '#173B35', fontSize: 31, lineHeight: 38, fontWeight: '700', marginTop: 8, marginBottom: 18 },
  notice: { backgroundColor: '#FFF4D9', borderRadius: 14, padding: 15, marginBottom: 18 },
  noticeTitle: { color: '#72571E', fontSize: 13, fontWeight: '600', marginBottom: 7 },
  heading: { color: '#173B35', fontSize: 16, fontWeight: '600', marginTop: 17, marginBottom: 6 },
  body: { color: '#65746B', fontSize: 13, lineHeight: 21 },
  footer: { backgroundColor: '#E8F3ED', borderRadius: 12, padding: 14, marginTop: 24 },
  footerText: { color: '#1F6758', fontSize: 12, lineHeight: 18 },
});
