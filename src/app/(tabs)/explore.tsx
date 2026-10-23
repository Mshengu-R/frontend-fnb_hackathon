import { useState } from 'react';
import {
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

import { ExternalLink } from '@/components/external-link';

const palette = {
  ink: '#173B35',
  green: '#1F6758',
  greenLight: '#E8F3ED',
  paper: '#F7F8F3',
  white: '#FFFFFF',
  muted: '#75817A',
  line: '#E7EBE4',
  gold: '#F3C86A',
};

type Category = 'All' | 'Funding' | 'Money' | 'Wellbeing' | 'Study' | 'Access';
type OfficialLink = 'https://www.nsfas.org.za/' | 'https://www.careerhelp.org.za/';

type Guide = {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: Exclude<Category, 'All'>;
  color: string;
  steps: string[];
  link?: OfficialLink;
  linkLabel?: string;
};

const categories: Category[] = ['All', 'Funding', 'Money', 'Wellbeing', 'Study', 'Access'];

const guides: Guide[] = [
  {
    id: 'nsfas',
    title: 'NSFAS, made clearer',
    description: 'Understand the application journey and what to prepare.',
    icon: '🎓',
    category: 'Funding',
    color: '#E8F3ED',
    steps: [
      'Check the current eligibility rules on the official NSFAS site.',
      'Prepare your South African ID and the supporting documents listed for your situation.',
      'Apply through the official portal, then keep your reference number safe.',
      'Check your application status regularly and respond to any requests before their due date.',
    ],
    link: 'https://www.nsfas.org.za/',
    linkLabel: 'Visit the official NSFAS website',
  },

  {
    id: 'bursaries',
    title: 'Find a bursary that fits',
    description: 'A simple way to search, compare and apply with confidence.',
    icon: '🔎',
    category: 'Funding',
    color: '#F5EFE0',
    steps: [
      'Search by your field of study, province and academic year.',
      'Check whether the bursary covers tuition, accommodation, books or travel.',
      'Note the closing date and eligibility rules; requirements differ between funders.',
      'Submit clear copies of requested documents and keep a copy of every application.',
    ],
    link: 'https://www.careerhelp.org.za/',
    linkLabel: 'Explore career and funding guidance',
  },
  {
    id: 'budget',
    title: 'Build a monthly money plan',
    description: 'See what’s coming in, plan essentials and keep a little buffer.',
    icon: '💸',
    category: 'Money',
    color: '#F9E6D9',
    steps: [
      'Start with money you can count on this month, such as allowance or confirmed funding.',
      'List essentials first: food, transport, data, rent and study materials.',
      'Subtract planned costs from your available amount before making extra purchases.',
      'If there is a shortfall, contact your campus financial-aid office early.',
    ],
  },
  {
    id: 'wellness',
    title: 'A kind check-in',
    description: 'Pause, name how you’re feeling and choose one small reset.',
    icon: '🌱',
    category: 'Wellbeing',
    color: '#EEE9F8',
    steps: [
      'Take a slow breath in, then let it out a little longer.',
      'Name one thing that feels manageable in the next ten minutes.',
      'Reach out to someone you trust or your campus counselling service if you need support.',
      'If you feel unsafe or in immediate danger, contact local emergency services now.',
    ],
  },
  {
    id: 'study',
    title: 'Keep your studies moving',
    description: 'Break a big assignment into smaller, doable actions.',
    icon: '📚',
    category: 'Study',
    color: '#E5EFF8',
    steps: [
      'Write down the next deadline and the smallest action you can do today.',
      'Try a focused 25-minute study session, then take a short screen-free break.',
      'Ask a tutor, lecturer or classmate for help as soon as you get stuck.',
      'Protect sleep and meal breaks; steady progress beats an all-nighter.',
    ],
  },
  {
    id: 'access',
    title: 'Learn on your connection',
    description: 'Practical ideas for low-data and more accessible study.',
    icon: '📶',
    category: 'Access',
    color: '#E5F1EF',
    steps: [
      'Download lecture notes and readings on campus Wi-Fi to use offline later.',
      'Choose audio-only or lower video quality when data is limited.',
      'Use your phone’s text size, screen reader, captions and contrast settings to suit you.',
      'Ask your institution about accessible formats, device loans and student data support.',
    ],
  },
];

const moods = [
  { label: 'Low', icon: '🌧️', message: 'It’s okay to take things slowly. What is one gentle thing you can do for yourself?' },
  { label: 'Okay', icon: '🌤️', message: 'Steady is good. Choose one small task and give yourself credit for starting.' },
  { label: 'Good', icon: '☀️', message: 'Lovely. Save some of that energy for a break, too.' },
];

function MoneyPlanner() {
  const [income, setIncome] = useState('');
  const [costs, setCosts] = useState('');
  const available = Number(income) || 0;
  const planned = Number(costs) || 0;
  const balance = available - planned;

  return (
    <View style={styles.planner}>
      <Text style={styles.plannerTitle}>Your monthly snapshot</Text>
      <Text style={styles.plannerCopy}>An estimate to help you plan — amounts stay on this device.</Text>
      <View style={styles.inputRow}>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Money available</Text>
          <View style={styles.currencyInput}>
            <Text style={styles.currency}>R</Text>
            <TextInput
              accessibilityLabel="Money available this month in rand"
              keyboardType="number-pad"
              onChangeText={setIncome}
              placeholder="0"
              placeholderTextColor="#9BA69E"
              style={styles.input}
              value={income}
            />
          </View>
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Planned essentials</Text>
          <View style={styles.currencyInput}>
            <Text style={styles.currency}>R</Text>
            <TextInput
              accessibilityLabel="Planned essential costs in rand"
              keyboardType="number-pad"
              onChangeText={setCosts}
              placeholder="0"
              placeholderTextColor="#9BA69E"
              style={styles.input}
              value={costs}
            />
          </View>
        </View>
      </View>
      <View style={[styles.balanceBox, balance < 0 && styles.balanceAlert]}>
        <Text style={styles.balanceLabel}>{balance < 0 ? 'Amount to plan for' : 'Estimated left over'}</Text>
        <Text style={styles.balanceAmount}>R {Math.abs(balance).toLocaleString('en-ZA')}</Text>
      </View>
      <Text style={styles.disclaimer}>Planning guide only, not financial advice. Confirm funding details with your provider.</Text>
    </View>
  );
}

function WellnessCheckIn() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const mood = moods.find((item) => item.label === selectedMood);

  return (
    <View style={styles.wellnessBox}>
      <Text style={styles.plannerTitle}>How are you feeling today?</Text>
      <Text style={styles.plannerCopy}>No right answer. Just a moment for you.</Text>
      <View style={styles.moodRow}>
        {moods.map((item) => (
          <Pressable
            key={item.label}
            accessibilityRole="radio"
            accessibilityState={{ selected: selectedMood === item.label }}
            onPress={() => setSelectedMood(item.label)}
            style={({ pressed }) => [
              styles.moodButton,
              selectedMood === item.label && styles.moodSelected,
              pressed && styles.pressed,
            ]}>
            <Text style={styles.moodIcon}>{item.icon}</Text>
            <Text style={styles.moodLabel}>{item.label}</Text>
          </Pressable>
        ))}
      </View>
      {mood && <Text style={styles.moodMessage}>{mood.message}</Text>}
    </View>
  );
}

export default function ExploreScreen() {
  const [category, setCategory] = useState<Category>('All');
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState<string | null>('nsfas');
  const [studyDone, setStudyDone] = useState(false);
  const filteredGuides = guides.filter((guide) => {
    const matchesCategory = category === 'All' || guide.category === category;
    const query = search.trim().toLowerCase();
    const matchesSearch = !query || `${guide.title} ${guide.description} ${guide.category}`.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.flex}>
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          <View style={styles.page}>
            <View style={styles.topline}>
              <View style={styles.brand}>
                <View style={styles.brandMark}>
                  <Text style={styles.brandMarkText}>e</Text>
                </View>
                <Text style={styles.brandName}>Lets Learn</Text>
              </View>
              <Text style={styles.topTag}>YOUR SUPPORT SPACE</Text>
            </View>

            <View style={styles.intro}>
              <Text style={styles.eyebrow}>A LITTLE HELP GOES A LONG WAY</Text>
              <Text style={styles.title}>Find your next step.</Text>
              <Text style={styles.introCopy}>
                Straightforward guidance for the things that matter at university and beyond.
              </Text>
            </View>

            <View style={styles.searchBox}>
              <Text style={styles.searchIcon}>⌕</Text>
              <TextInput
                accessibilityLabel="Search student support guides"
                onChangeText={setSearch}
                placeholder="Search funding, study, wellbeing..."
                placeholderTextColor="#929D95"
                style={styles.searchInput}
                value={search}
              />
              {search.length > 0 && (
                <Pressable accessibilityRole="button" accessibilityLabel="Clear search" onPress={() => setSearch('')}>
                  <Text style={styles.clearSearch}>×</Text>
                </Pressable>
              )}
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryList}>
              {categories.map((item) => (
                <Pressable
                  key={item}
                  accessibilityRole="tab"
                  accessibilityState={{ selected: category === item }}
                  onPress={() => setCategory(item)}
                  style={({ pressed }) => [
                    styles.categoryChip,
                    category === item && styles.categorySelected,
                    pressed && styles.pressed,
                  ]}>
                  <Text style={[styles.categoryText, category === item && styles.categorySelectedText]}>{item}</Text>
                </Pressable>
              ))}
            </ScrollView>

            {category === 'Money' && <MoneyPlanner />}
            {category === 'Wellbeing' && <WellnessCheckIn />}

            {category === 'Study' && (
              <Pressable
                accessibilityRole="checkbox"
                accessibilityState={{ checked: studyDone }}
                onPress={() => setStudyDone((value) => !value)}
                style={({ pressed }) => [styles.studyNudge, pressed && styles.pressed]}>
                <View style={[styles.studyCheck, studyDone && styles.studyCheckDone]}>
                  <Text style={styles.studyCheckText}>{studyDone ? '✓' : ''}</Text>
                </View>
                <View style={styles.studyNudgeCopy}>
                  <Text style={styles.studyNudgeTitle}>{studyDone ? 'You showed up for yourself.' : 'One small study step for today'}</Text>
                  <Text style={styles.studyNudgeSubtitle}>Tap to mark your study check-in</Text>
                </View>
              </Pressable>
            )}

            <View style={styles.resultsHeading}>
              <Text style={styles.resultsTitle}>{category === 'All' ? 'Support for your journey' : `${category} support`}</Text>
              <Text style={styles.resultsCount}>{filteredGuides.length} {filteredGuides.length === 1 ? 'guide' : 'guides'}</Text>
            </View>

            {filteredGuides.map((guide) => {
              const isExpanded = expanded === guide.id;
              return (
                <View key={guide.id} style={styles.guideCard}>
                  <Pressable
                    accessibilityRole="button"
                    accessibilityState={{ expanded: isExpanded }}
                    onPress={() => setExpanded(isExpanded ? null : guide.id)}
                    style={({ pressed }) => [styles.guideHeader, pressed && styles.pressed]}>
                    <View style={[styles.guideIconBox, { backgroundColor: guide.color }]}>
                      <Text style={styles.guideIcon}>{guide.icon}</Text>
                    </View>
                    <View style={styles.guideText}>
                      <Text style={styles.guideCategory}>{guide.category.toUpperCase()}</Text>
                      <Text style={styles.guideTitle}>{guide.title}</Text>
                      <Text style={styles.guideDescription}>{guide.description}</Text>
                    </View>
                    <Text style={styles.guideChevron}>{isExpanded ? '−' : '+'}</Text>
                  </Pressable>
                  {isExpanded && (
                    <View style={styles.guideDetails}>
                      <View style={styles.detailDivider} />
                      <Text style={styles.detailHeading}>A few steps to get started</Text>
                      {guide.steps.map((step, index) => (
                        <View key={step} style={styles.stepRow}>
                          <View style={styles.stepNumber}>
                            <Text style={styles.stepNumberText}>{index + 1}</Text>
                          </View>
                          <Text style={styles.stepText}>{step}</Text>
                        </View>
                      ))}
                      {guide.link && guide.linkLabel && (
                        <ExternalLink href={guide.link} style={styles.officialLink}>
                          <Text style={styles.officialLinkText}>{guide.linkLabel} ↗</Text>
                        </ExternalLink>
                      )}
                    </View>
                  )}
                </View>
              );
            })}

            {filteredGuides.length === 0 && (
              <View style={styles.emptyState}>
                <Text style={styles.emptyIcon}>⌕</Text>
                <Text style={styles.emptyTitle}>No guides found just yet</Text>
                <Text style={styles.emptyText}>Try another search or choose a different support topic.</Text>
              </View>
            )}

            <View style={styles.trustNote}>
              <Text style={styles.trustIcon}>ⓘ</Text>
              <Text style={styles.trustText}>
                Funding rules and deadlines can change. Always confirm details with the official provider or your institution.
              </Text>
            </View>
            <Text style={styles.footer}>EduPath SA · Here for your next step 🇿🇦</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  safeArea: { flex: 1, backgroundColor: palette.paper },
  scrollContent: { paddingBottom: 112 },
  page: { width: '100%', maxWidth: 720, alignSelf: 'center', paddingHorizontal: 22 },
  topline: { height: 70, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  brand: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  brandMark: { width: 37, height: 37, borderRadius: 13, backgroundColor: palette.green, alignItems: 'center', justifyContent: 'center' },
  brandMarkText: { color: palette.white, fontSize: 25, lineHeight: 30, fontWeight: '600' },
  brandName: { color: palette.ink, fontSize: 15, fontWeight: '600', letterSpacing: -0.4 },
  topTag: { color: palette.muted, fontSize: 8, fontWeight: '600', letterSpacing: 1.1 },
  intro: { paddingTop: 21, paddingBottom: 20 },
  eyebrow: { color: palette.green, fontSize: 9, fontWeight: '600', letterSpacing: 1.4 },
  title: { color: palette.ink, fontSize: 32, fontWeight: '600', letterSpacing: -1.1, marginTop: 8 },
  introCopy: { color: palette.muted, fontSize: 13, lineHeight: 20, marginTop: 7, maxWidth: 410 },
  searchBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: palette.white, borderColor: palette.line, borderWidth: 1, height: 48, borderRadius: 15, paddingHorizontal: 13, marginBottom: 15 },
  searchIcon: { fontSize: 27, lineHeight: 31, color: palette.green, marginRight: 8 },
  searchInput: { flex: 1, color: palette.ink, fontSize: 12, paddingVertical: 8 },
  clearSearch: { color: palette.muted, fontSize: 24, paddingHorizontal: 6 },
  categoryList: { gap: 7, paddingBottom: 19 },
  categoryChip: { paddingVertical: 8, paddingHorizontal: 14, borderRadius: 20, borderWidth: 1, borderColor: '#E1E7DF', backgroundColor: palette.white },
  categorySelected: { backgroundColor: palette.ink, borderColor: palette.ink },
  categoryText: { color: '#59675F', fontSize: 10, fontWeight: '500' },
  categorySelectedText: { color: palette.white },
  resultsHeading: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12, marginTop: 4 },
  resultsTitle: { color: palette.ink, fontSize: 17, fontWeight: '600', letterSpacing: -0.4 },
  resultsCount: { color: palette.muted, fontSize: 10, fontWeight: '600' },
  guideCard: { backgroundColor: palette.white, borderColor: palette.line, borderWidth: 1, borderRadius: 17, marginBottom: 10, overflow: 'hidden' },
  guideHeader: { minHeight: 98, padding: 14, flexDirection: 'row', alignItems: 'center', gap: 12 },
  guideIconBox: { width: 43, height: 43, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
  guideIcon: { fontSize: 20 },
  guideText: { flex: 1 },
  guideCategory: { color: palette.green, fontSize: 8, fontWeight: '600', letterSpacing: 1.1 },
  guideTitle: { color: palette.ink, fontSize: 13, fontWeight: '500', marginTop: 4 },
  guideDescription: { color: palette.muted, fontSize: 10, lineHeight: 15, marginTop: 4 },
  guideChevron: { color: palette.green, fontSize: 21, paddingHorizontal: 2 },
  guideDetails: { paddingHorizontal: 15, paddingBottom: 16 },
  detailDivider: { height: 1, backgroundColor: palette.line, marginBottom: 14 },
  detailHeading: { color: palette.ink, fontSize: 11, fontWeight: '600', marginBottom: 12 },
  stepRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 9, marginBottom: 10 },
  stepNumber: { width: 19, height: 19, borderRadius: 10, backgroundColor: palette.greenLight, alignItems: 'center', justifyContent: 'center', marginTop: 1 },
  stepNumberText: { color: palette.green, fontSize: 9, fontWeight: '600' },
  stepText: { color: '#59675F', fontSize: 10, lineHeight: 16, flex: 1 },
  officialLink: { alignSelf: 'flex-start', backgroundColor: palette.greenLight, borderRadius: 11, paddingHorizontal: 12, paddingVertical: 10, marginTop: 5 },
  officialLinkText: { color: palette.green, fontSize: 10, fontWeight: '600' },
  planner: { backgroundColor: '#F4F6F0', borderRadius: 14, padding: 13, marginTop: 9 },
  plannerTitle: { color: palette.ink, fontSize: 12, fontWeight: '600' },
  plannerCopy: { color: palette.muted, fontSize: 9, lineHeight: 14, marginTop: 4 },
  inputRow: { flexDirection: 'row', gap: 9, marginTop: 12 },
  inputGroup: { flex: 1 },
  inputLabel: { color: '#5F6C63', fontSize: 8, fontWeight: '500', marginBottom: 5 },
  currencyInput: { height: 39, borderRadius: 10, backgroundColor: palette.white, borderWidth: 1, borderColor: palette.line, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 9 },
  currency: { color: palette.green, fontSize: 11, fontWeight: '600', marginRight: 5 },
  input: { color: palette.ink, fontSize: 11, flex: 1, paddingVertical: 5 },
  balanceBox: { marginTop: 10, backgroundColor: palette.greenLight, borderRadius: 10, paddingHorizontal: 11, paddingVertical: 9, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  balanceAlert: { backgroundColor: '#F9E6D9' },
  balanceLabel: { color: palette.ink, fontSize: 9, fontWeight: '500' },
  balanceAmount: { color: palette.green, fontSize: 13, fontWeight: '600' },
  disclaimer: { color: '#89938B', fontSize: 8, lineHeight: 12, marginTop: 8 },
  wellnessBox: { backgroundColor: '#F4F0FA', borderRadius: 15, padding: 14, marginBottom: 13 },
  moodRow: { flexDirection: 'row', gap: 8, marginTop: 12 },
  moodButton: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 4, minHeight: 56, backgroundColor: palette.white, borderColor: '#E6E0EF', borderWidth: 1, borderRadius: 12 },
  moodSelected: { borderColor: palette.green, backgroundColor: palette.greenLight },
  moodIcon: { fontSize: 17 },
  moodLabel: { color: palette.ink, fontSize: 9, fontWeight: '500' },
  moodMessage: { color: '#56665D', fontSize: 10, lineHeight: 16, marginTop: 11 },
  studyNudge: { backgroundColor: '#EAF2F7', padding: 13, borderRadius: 14, flexDirection: 'row', alignItems: 'center', gap: 11, marginBottom: 14 },
  studyCheck: { height: 20, width: 20, borderRadius: 7, borderWidth: 1.5, borderColor: '#B9C7BD', alignItems: 'center', justifyContent: 'center' },
  studyCheckDone: { backgroundColor: palette.green, borderColor: palette.green },
  studyCheckText: { color: palette.white, fontSize: 12, fontWeight: '600' },
  studyNudgeCopy: { flex: 1 },
  studyNudgeTitle: { color: palette.ink, fontSize: 10, fontWeight: '500' },
  studyNudgeSubtitle: { color: palette.muted, fontSize: 8, marginTop: 3 },
  emptyState: { backgroundColor: palette.white, borderRadius: 16, padding: 24, alignItems: 'center', marginBottom: 13 },
  emptyIcon: { color: palette.green, fontSize: 28 },
  emptyTitle: { color: palette.ink, fontSize: 13, fontWeight: '600', marginTop: 8 },
  emptyText: { color: palette.muted, fontSize: 10, textAlign: 'center', marginTop: 5 },
  trustNote: { flexDirection: 'row', alignItems: 'flex-start', gap: 9, backgroundColor: '#F1EFE6', borderRadius: 13, padding: 12, marginTop: 11 },
  trustIcon: { color: '#98762F', fontSize: 15, fontWeight: '700' },
  trustText: { color: '#786D52', fontSize: 9, lineHeight: 14, flex: 1 },
  footer: { color: '#97A097', fontSize: 9, textAlign: 'center', paddingTop: 18 },
  pressed: { opacity: 0.76 },
});
