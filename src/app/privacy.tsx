import { Link } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PrivacyScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        <Link href="/" style={styles.back}>‹  Back to Lets Learn</Link>
        <Text style={styles.eyebrow}>PRIVACY & DATA</Text>
        <Text style={styles.title}>Your privacy is our priority</Text>
        <View style={styles.notice}>
          <Text style={styles.noticeTitle}>South Africa has enforced Protection Of Personal Information (POPI act)[2013]</Text>
          <Text style={styles.body}>When you use our services, you’re trusting us with your information.
            We do not share your content with any third parties.
             We understand that this is a big responsibility and we work hard to protect your information and put you in control. We are very considerate for your information and with that being said we would like to let you know that we handle your information with care.</Text>
        </View>
        <Text style={styles.heading}>Information about you that we collect</Text>
        <Text style={styles.body}>We have your email and names so we may offer personal assistance and also trace fraud.</Text>
        <Text style={styles.heading}>Why it is used</Text>
        <Text style={styles.body}>Account information supports sign-in, profile changes and account deletion. Study support guides, budget estimates and wellbeing check-ins are designed to run on your device unless you choose to send information to a connected service.</Text>
        <Text style={styles.heading}>Your choices</Text>
        <Text style={styles.body}>You can review and update your profile, sign out, or request account deletion from Profile. Keep in mind that other features are yet to be added</Text>
        <Text style={styles.heading}>Chat assistant</Text>
        <Text style={styles.body}>When you send a chat message, it is sent to our backend AI service to generate a reply. Do not share sensitive personal information. AI responses can be inaccurate, so verify important study, funding and application details with the relevant official provider. The service operator should publish the AI provider, retention period and process for requesting deletion before launch.</Text>
        <Text style={styles.heading}>Contact and retention details</Text>
        <Text style={styles.body}>[If you need further, privacy officer email, data retention period, and complaint/contact process before release.]</Text>
        <View style={styles.footer}>
          <Text style={styles.footerText}>If you do not agree with these we advice you not to use our website.</Text>
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
