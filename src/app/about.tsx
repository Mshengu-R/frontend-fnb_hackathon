import { Link } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const values = [
  {
    number: '01',
    title: 'Student-first support',
    description:
      'Every study journey is different. We aim to make guidance feel practical, encouraging, and useful for the next step in front of you.',
  },
  {
    number: '02',
    title: 'Progress over pressure',
    description:
      'Big goals are easier to approach one step at a time. Lets Learn helps you plan at your own pace, without expecting you to have everything figured out today.',
  },
  {
    number: '03',
    title: 'Guidance with care',
    description:
      'From funding and applications to budgeting and wellbeing, we bring student-life topics together with care and respect for your choices.',
  },
  {
    number: '04',
    title: 'Honest, responsible information',
    description:
      'Guidance should help you make informed decisions. Check important deadlines and requirements with the relevant institution or official provider.',
  },
];

export default function AboutScreen() {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Link href="/login" style={styles.backLink}>‹  Back to Lets Learn</Link>

        <View style={styles.hero}>
          <View style={styles.brandMark} accessibilityElementsHidden importantForAccessibility="no">
            <Text style={styles.brandMarkText}>L</Text>
          </View>
          <Text style={styles.eyebrow}>ABOUT LETS LEARN</Text>
          <Text style={styles.title}>Your next step deserves support.</Text>
          <Text style={styles.intro}>
            Lets Learn is a study-journey companion created to help students across South Africa
            find their next step with more confidence.
          </Text>
        </View>

        <View style={styles.missionCard}>
          <Text style={styles.missionEyebrow}>WHY WE’RE HERE</Text>
          <Text style={styles.missionTitle}>Make the path ahead feel a little clearer.</Text>
          <Text style={styles.body}>
            Planning what comes after school or choosing how to keep studying can feel like a lot.
            We bring together helpful starting points for study planning, funding, applications,
            money and wellbeing, so you can focus on one step at a time.
          </Text>
        </View>

        <View style={styles.valuesSection}>
          <Text style={styles.sectionEyebrow}>WHAT MATTERS TO US</Text>
          <Text style={styles.sectionTitle}>Our values</Text>
          <Text style={styles.sectionIntro}>
            These principles shape how we want Lets Learn to support your journey.
          </Text>
          {values.map((value) => (
            <View key={value.number} style={styles.valueCard}>
              <Text style={styles.valueNumber}>{value.number}</Text>
              <View style={styles.valueCopy}>
                <Text style={styles.valueTitle}>{value.title}</Text>
                <Text style={styles.body}>{value.description}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.closingCard}>
          <Text style={styles.closingTitle}>Your journey. Your pace.</Text>
          <Text style={styles.closingBody}>
            You don’t have to figure it all out today. We’re here to help you keep moving forward.
          </Text>
          <Link href="/login" style={styles.signInLink}>Continue to Lets Learn  ↗</Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F7F8F3' },
  content: { width: '100%', maxWidth: 680, alignSelf: 'center', padding: 22, paddingBottom: 50 },
  backLink: { color: '#1F6758', fontSize: 13, paddingVertical: 8 },
  hero: { paddingTop: 29, paddingBottom: 25 },
  brandMark: {
    width: 46,
    height: 46,
    borderRadius: 16,
    backgroundColor: '#1F6758',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandMarkText: { color: '#FFFFFF', fontSize: 28, fontWeight: '700' },
  eyebrow: { color: '#1F6758', fontSize: 10, fontWeight: '700', letterSpacing: 1.5, marginTop: 23 },
  title: { color: '#173B35', fontSize: 35, lineHeight: 42, fontWeight: '700', marginTop: 9 },
  intro: { color: '#65746B', fontSize: 15, lineHeight: 23, marginTop: 10 },
  missionCard: { backgroundColor: '#173B35', borderRadius: 20, padding: 20 },
  sectionEyebrow: { color: '#1F6758', fontSize: 9, fontWeight: '700', letterSpacing: 1.4 },
  missionEyebrow: { color: '#C5DCCB', fontSize: 9, fontWeight: '700', letterSpacing: 1.4 },
  missionTitle: { color: '#FFFFFF', fontSize: 21, lineHeight: 27, fontWeight: '700', marginTop: 10 },
  body: { color: '#65746B', fontSize: 13, lineHeight: 21, marginTop: 7 },
  valuesSection: { marginTop: 29 },
  sectionTitle: { color: '#173B35', fontSize: 25, fontWeight: '700', marginTop: 7 },
  sectionIntro: { color: '#75817A', fontSize: 13, lineHeight: 20, marginTop: 5, marginBottom: 13 },
  valueCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 13,
    backgroundColor: '#FFFFFF',
    borderColor: '#E7EBE4',
    borderWidth: 1,
    borderRadius: 16,
    padding: 15,
    marginTop: 9,
  },
  valueNumber: { color: '#1F6758', fontSize: 11, fontWeight: '700', paddingTop: 2 },
  valueCopy: { flex: 1 },
  valueTitle: { color: '#173B35', fontSize: 14, fontWeight: '600' },
  closingCard: { backgroundColor: '#E8F3ED', borderRadius: 18, padding: 18, marginTop: 25 },
  closingTitle: { color: '#173B35', fontSize: 18, fontWeight: '700' },
  closingBody: { color: '#65746B', fontSize: 13, lineHeight: 20, marginTop: 6 },
  signInLink: {
    alignSelf: 'flex-start',
    color: '#1F6758',
    fontSize: 13,
    fontWeight: '700',
    marginTop: 14,
  },
});
