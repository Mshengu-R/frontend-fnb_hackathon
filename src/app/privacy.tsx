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
          <Text style={styles.noticeTitle}>Your privacy is important to us</Text>
          <Text style={styles.body}>We value your privacy and are committed to protecting your personal information in accordance with the Protection of Personal Information Act (POPIA), 2013 of South Africa.

By using our website, you trust us with your information, and we take that responsibility seriously.</Text>
        </View>
        <Text style={styles.heading}>Information about you that we collect</Text>
        <Text style={styles.body}>We only collect the following information when you create an account:
Username
Email address
Password (stored securely and encrypted)</Text>


        <Text style={styles.heading}>How We Use Your Information</Text>
        <Text style={styles.body}>Your information is used solely to:
Create and manage your account
Authenticate and secure your login
Communicate important account-related information
Detect and prevent fraud, abuse, or unauthorized access
Improve the security and functionality of our services</Text>

        <Text style={styles.heading}>Information Sharing</Text>
        <Text style={styles.body}>We do not sell, rent, or share your personal information with third parties for marketing purposes.
We may disclose information only when:
Required by law
Necessary to protect our rights, users, or the security of our services</Text>

        <Text style={styles.heading}>Data Security</Text>
        <Text style={styles.body}>We implement reasonable technical and organizational measures to protect your information against:
Unauthorized access
Loss
Misuse
Disclosure
Alteration
Although we strive to protect your data, no internet transmission or storage method is completely secure.</Text>

        <Text style={styles.heading}>Chat assistant</Text>
        <Text style={styles.body}>When you send a chat message, it is sent to our backend AI service to generate a reply. Do not share sensitive personal information. AI responses can be inaccurate, so verify important study, funding and application details with the relevant official provider. The service operator should publish the AI provider, retention period and process for requesting deletion before launch.</Text>
        <Text style={styles.heading}>Contact and retention details</Text>

      <Text style={styles.heading}>Account Deletion</Text>
      <Text style={styles.body}>You may request the deletion of your account at any time. Once processed, your personal information will be removed from our systems, unless we are required to retain it by law.</Text>

      <Text style={styles.heading}>Passwords</Text>
      <Text style={styles.body}>We store your password securely using industry-standard encryption techniques. We cannot retrieve it for you. If you forget your password, you can reset it using the "Forgot Password".</Text>

      <Text style={styles.heading}>Changes to This Policy</Text>
      <Text style={styles.body}>We may update this Privacy Policy from time to time. Any changes will be posted on this page, and continued use of our website constitutes acceptance of the updated policy.</Text>

        <Text style={styles.heading}>Contact Information</Text>
        <Text style={styles.body}>[If you need further information, please contact our privacy officer at risima@letsLearn.com.]</Text>
        <View style={styles.footer}>
          <Text style={styles.footerText}>If you do not agree with these terms, we advise you not to use our website.</Text>
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
