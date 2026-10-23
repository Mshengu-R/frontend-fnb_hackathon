import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAuth } from '@/auth/auth-context';

const palette = {
  ink: '#173B35',
  green: '#1F6758',
  greenLight: '#cdd4d0',
  paper: '#F7F8F3',
  white: '#FFFFFF',
  muted: '#75817A',
  line: '#E7EBE4',
  gold: '#F3C86A',
  peach: '#F9E6D9',
  lilac: '#EEE9F8',
  blue: '#E5EFF8',
};

const milestones = [
  { id: 'documents', title: 'Gather your documents', note: 'ID, results & proof of income' },
  { id: 'funding', title: 'Explore funding options', note: 'NSFAS, bursaries & scholarships' },
  { id: 'apply', title: 'Apply to your institution', note: 'Check each application deadline' },
];

const quickLinks = [
  { icon: '🎓', title: 'Funding guide', subtitle: 'NSFAS & bursaries', color: palette.greenLight },
  { icon: '💸', title: 'Money plan', subtitle: 'Make your rand go further', color: palette.peach },
  { icon: '🌱', title: 'Wellbeing', subtitle: 'Check in with yourself', color: palette.lilac },
  { icon: '📚', title: 'Study support', subtitle: 'Keep moving forward', color: palette.blue },
];

export default function HomeScreen() {
  const { state } = useAuth();
  const [completed, setCompleted] = useState<string[]>(['documents']);
  const progress = Math.round((completed.length / milestones.length) * 100);

  const toggleMilestone = (id: string) => {
    setCompleted((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.page}>
          <View style={styles.header}>
            <View style={styles.brand}>
              <View style={styles.brandMark}>
                <Text style={styles.brandMarkText}>e</Text>
              </View>
              <View>
                <Text style={styles.brandName}>Lets Learn</Text>
                <Text style={styles.brandCaption}>AN AID FOR YOUR JOURNEY</Text>
              </View>
            </View>
            <View style={styles.headerBadge}>
              <Text style={styles.headerBadgeText}>SA</Text>
            </View>
          </View>

          <View style={styles.greeting}>
            <Text style={styles.eyebrow}>PLAN YOUR STUDIES FUTURE, ONE STEP AT A TIME</Text>
            <Text style={styles.heading}>
              {state.status === 'signedIn' ? `You’ve got this, ${state.session.user.name.split(' ')[0]}.` : 'You’ve got this.'}
            </Text>
            <Text style={styles.greetingCopy}>
              We are here to help you on your next step, get the support you need, and keep going.
            </Text>
          </View>

          <View style={styles.heroCard}>
            <View style={styles.heroCopy}>
              <View style={styles.heroPill}>
                <Text style={styles.heroPillText}>A little progress adds up</Text>
              </View>
              <Text style={styles.heroTitle}>Do not wait for tomorrow; planning your studies{'\n'}starts here.</Text>
              <Text style={styles.heroDescription}>
                Funding, study and wellbeing guidance — made for your journey.
              </Text>
              <Pressable
                accessibilityRole="button"
                onPress={() => router.push('/explore')}
                style={({ pressed }) => [styles.heroButton, pressed && styles.pressed]}>
                <Text style={styles.heroButtonText}>Explore your support</Text>
                <Text style={styles.heroButtonArrow}>↗</Text>
              </Pressable>
            </View>
            <View style={styles.heroArt} accessibilityElementsHidden importantForAccessibility="no">
              <View style={styles.sun} />
              <Text style={styles.artBook}>✳</Text>
              <View style={styles.artLine} />
              <Text style={styles.artCaption}>KEEP GROWING</Text>
            </View>
          </View>

          <View style={styles.sectionHeading}>
            <View>
              <Text style={styles.sectionTitle}>Your next steps</Text>
              <Text style={styles.sectionSubtitle}>Your plan can change as you do.</Text>
            </View>
            <Text style={styles.progressLabel}>{completed.length} of 3</Text>
          </View>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
          <View style={styles.milestoneCard}>
            {milestones.map((item, index) => {
              const isComplete = completed.includes(item.id);
              return (
                <Pressable
                  key={item.id}
                  accessibilityRole="checkbox"
                  accessibilityState={{ checked: isComplete }}
                  onPress={() => toggleMilestone(item.id)}
                  style={({ pressed }) => [
                    styles.milestoneRow,
                    index < milestones.length - 1 && styles.milestoneDivider,
                    pressed && styles.pressed,
                  ]}>
                  <View style={[styles.checkCircle, isComplete && styles.checkCircleDone]}>
                    <Text style={[styles.checkMark, isComplete && styles.checkMarkDone]}>
                      {isComplete ? '✓' : ''}
                    </Text>
                  </View>
                  <View style={styles.milestoneText}>
                    <Text style={[styles.milestoneTitle, isComplete && styles.milestoneDoneText]}>
                      {item.title}
                    </Text>
                    <Text style={styles.milestoneNote}>{item.note}</Text>
                  </View>
                  <Text style={styles.rowArrow}>›</Text>
                </Pressable>
              );
            })}
          </View>

          <View style={styles.sectionHeading}>
            <View>
              <Text style={styles.sectionTitle}>Here for all of it</Text>
              <Text style={styles.sectionSubtitle}>Support for student life in one place.</Text>
            </View>
          </View>
          <View style={styles.quickGrid}>
            {quickLinks.map((item) => (
              <Pressable
                key={item.title}
                accessibilityRole="button"
                onPress={() => router.push('/explore')}
                style={({ pressed }) => [
                  styles.quickCard,
                  { backgroundColor: item.color },
                  pressed && styles.pressed,
                ]}>
                <Text style={styles.quickIcon}>{item.icon}</Text>
                <Text style={styles.quickTitle}>{item.title}</Text>
                <Text style={styles.quickSubtitle}>{item.subtitle}</Text>
                <Text style={styles.quickArrow}>↗</Text>
              </Pressable>
            ))}
          </View>

          <View style={styles.reminderCard}>
            <View style={styles.reminderIcon}>
              <Text style={styles.reminderEmoji}>☀</Text>
            </View>
            <View style={styles.reminderCopy}>
              <Text style={styles.reminderEyebrow}>A GENTLE REMINDER</Text>
              <Text style={styles.reminderTitle}>Rest is part of the plan.</Text>
              <Text style={styles.reminderText}>
                You don’t have to figure everything out today. One small step is enough.
              </Text>
            </View>
          </View>

          <Pressable
            accessibilityRole="button"
            onPress={() => router.push('/chat')}
            style={({ pressed }) => [styles.chatCard, pressed && styles.pressed]}>
            <Text style={styles.chatIcon}>✳</Text>
            <View style={styles.chatCopy}>
              <Text style={styles.chatTitle}>Study pathway chat</Text>
              <Text style={styles.chatDescription}>A guided chat space is being prepared for you.</Text>
            </View>
            <Text style={styles.rowArrow}>›</Text>
          </Pressable>

          <Text style={styles.footer}>Made with care for students across South Africa 🇿🇦</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: palette.paper },
  scrollContent: { paddingBottom: 112 },
  page: { width: '100%', maxWidth: 720, alignSelf: 'center', paddingHorizontal: 22 },
  header: {
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brand: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  brandMark: {
    width: 39,
    height: 39,
    borderRadius: 14,
    backgroundColor: palette.green,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandMarkText: { color: palette.white, fontSize: 27, fontWeight: '800', lineHeight: 32 },
  brandName: { color: palette.ink, fontSize: 16, fontWeight: '700', letterSpacing: -0.4 },
  brandCaption: { color: palette.muted, fontSize: 8, fontWeight: '700', letterSpacing: 1.2, marginTop: 2 },
  headerBadge: {
    height: 36,
    width: 36,
    borderRadius: 18,
    backgroundColor: '#E8EEE8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerBadgeText: { color: palette.green, fontSize: 11, fontWeight: '800' },
  greeting: { paddingTop: 20, paddingBottom: 20 },
  eyebrow: { color: palette.green, fontSize: 9, fontWeight: '800', letterSpacing: 1.5 },
  heading: { color: palette.ink, fontSize: 34, fontWeight: '800', letterSpacing: -1.3, marginTop: 8 },
  greetingCopy: { color: palette.muted, fontSize: 14, lineHeight: 21, fontWeight: '400', marginTop: 6, maxWidth: 390 },
  heroCard: {
    borderRadius: 25,
    padding: 22,
    backgroundColor: palette.ink,
    minHeight: 260,
    flexDirection: 'row',
    overflow: 'hidden',
    marginBottom: 27,
  },
  heroCopy: { flex: 1, zIndex: 1 },
  heroPill: { backgroundColor: '#31594E', alignSelf: 'flex-start', paddingVertical: 6, paddingHorizontal: 10, borderRadius: 20 },
  heroPillText: { color: '#D4E5D6', fontSize: 10, fontWeight: '400' },
  heroTitle: { color: palette.white, fontSize: 31, lineHeight: 34, fontWeight: '800', letterSpacing: -0.8, marginTop: 15 },
  heroDescription: { color: '#CFDCD4', fontSize: 12, lineHeight: 18, marginTop: 9, maxWidth: 230 },
  heroButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 13,
    marginTop: 17,
    paddingVertical: 11,
    paddingHorizontal: 13,
    borderRadius: 13,
    backgroundColor: palette.gold,
  },
  heroButtonText: { color: palette.ink, fontSize: 11, fontWeight: '600' },
  heroButtonArrow: { color: palette.ink, fontSize: 14, fontWeight: '800' },
  heroArt: { width: 110, alignItems: 'center', justifyContent: 'center', marginLeft: 2 },
  sun: { position: 'absolute', right: 1, top: 23, width: 87, height: 87, borderRadius: 50, backgroundColor: '#45695C' },
  artBook: { color: palette.gold, fontSize: 75, lineHeight: 95, fontWeight: '300', marginTop: 7 },
  artLine: { width: 68, height: 1, backgroundColor: '#87A294', marginTop: -8 },
  artCaption: { color: '#D4E5D6', fontSize: 7, letterSpacing: 1.4, fontWeight: '700', marginTop: 10 },
  sectionHeading: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 13 },
  sectionTitle: { color: palette.ink, fontSize: 19, fontWeight: '800', letterSpacing: -0.5 },
  sectionSubtitle: { color: palette.muted, fontSize: 11, marginTop: 4 },
  progressLabel: { color: palette.green, fontSize: 11, fontWeight: '500' },
  progressTrack: { height: 5, borderRadius: 3, backgroundColor: '#E6EAE4', marginBottom: 11 },
  progressFill: { height: 5, borderRadius: 3, backgroundColor: palette.green },
  milestoneCard: { backgroundColor: palette.white, borderWidth: 1, borderColor: palette.line, borderRadius: 18, paddingHorizontal: 14, marginBottom: 29 },
  milestoneRow: { minHeight: 68, flexDirection: 'row', alignItems: 'center', gap: 12 },
  milestoneDivider: { borderBottomColor: palette.line, borderBottomWidth: StyleSheet.hairlineWidth },
  checkCircle: { width: 21, height: 21, borderRadius: 11, borderWidth: 1.5, borderColor: '#CCD5CD', alignItems: 'center', justifyContent: 'center' },
  checkCircleDone: { backgroundColor: palette.green, borderColor: palette.green },
  checkMark: { fontSize: 13, lineHeight: 16, color: palette.white, fontWeight: '800' },
  checkMarkDone: { color: palette.white },
  milestoneText: { flex: 1 },
  milestoneTitle: { color: palette.ink, fontSize: 12, fontWeight: '500' },
  milestoneDoneText: { color: palette.green },
  milestoneNote: { color: palette.muted, fontSize: 10, marginTop: 4 },
  rowArrow: { color: '#AAB5AC', fontSize: 23, marginRight: 1 },
  quickGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 11, marginBottom: 22 },
  quickCard: { width: '48%', minHeight: 132, borderRadius: 17, padding: 14, position: 'relative', flexGrow: 1 },
  quickIcon: { fontSize: 21, marginBottom: 9 },
  quickTitle: { color: palette.ink, fontSize: 13, fontWeight: '500' },
  quickSubtitle: { color: '#65746B', fontSize: 9, marginTop: 4, paddingRight: 8 },
  quickArrow: { color: palette.green, fontSize: 16, position: 'absolute', right: 13, bottom: 11 },
  reminderCard: { borderRadius: 17, backgroundColor: '#F0EDE2', padding: 16, flexDirection: 'row', gap: 13, marginBottom: 21 },
  reminderIcon: { width: 36, height: 36, borderRadius: 13, backgroundColor: '#F9E4B4', alignItems: 'center', justifyContent: 'center' },
  reminderEmoji: { color: '#9E7024', fontSize: 20 },
  reminderCopy: { flex: 1 },
  reminderEyebrow: { color: '#927643', fontSize: 8, fontWeight: '800', letterSpacing: 1 },
  reminderTitle: { color: palette.ink, fontSize: 13, fontWeight: '600', marginTop: 5 },
  reminderText: { color: '#6D756B', fontSize: 10, lineHeight: 15, marginTop: 4 },
  chatCard: { backgroundColor: palette.white, borderColor: palette.line, borderWidth: 1, borderRadius: 17, padding: 15, flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 20 },
  chatIcon: { color: palette.green, fontSize: 22 },
  chatCopy: { flex: 1 },
  chatTitle: { color: palette.ink, fontSize: 13, fontWeight: '600' },
  chatDescription: { color: palette.muted, fontSize: 10, lineHeight: 15, marginTop: 3 },
  footer: { textAlign: 'center', color: '#97A097', fontSize: 9, paddingBottom: 5 },
  pressed: { opacity: 0.78 },
});
