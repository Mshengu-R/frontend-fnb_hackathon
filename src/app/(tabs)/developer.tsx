import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const palette = {
  ink: '#173B35',
  green: '#1F6758',
  paper: '#F7F8F3',
  white: '#FFFFFF',
  muted: '#75817A',
  line: '#E7EBE4',
  gold: '#F3C86A',
};

const skills = [
  { title: 'Languages', items: ['Java 25', 'JavaScript', 'C++', 'SQL', 'TypeScript'] },
  { title: 'Frameworks', items: ['Spring Boot', 'Spring Cloud', 'Hibernate / JPA', 'Express', 'Quarkus'] },
  { title: 'Data and messaging', items: ['PostgreSQL', 'Redis', 'Kafka', 'MongoDB'] },
  { title: 'Delivery and tests', items: ['Docker', 'Kubernetes', 'AWS', 'GitHub Actions', 'JUnit 5'] },
];

const experience = [
  {
    role: 'Software Engineer',
    company: 'Nkarhi Safaris',
    period: '2026 - Present',
    detail: 'Building and maintaining an e-commerce web application for Nkarhi Safaris.',
  },
  {
    role: 'Software Engineer',
    company: 'Mbhombi-Financial-Services',
    period: '2026 - Present',
    detail: 'Building a bank system for personal and community accounts, with Kafka microservices for fraud detection, accounts, payments, notifications and transactions.',
  },
  {
    role: 'Software Engineer',
    company: 'FNB Hackathon',
    period: '2026 - Present',
    detail: 'Designed a student aid application focused on applications, mental health and academic guidance using React Native and Express.',
  },
  {
    role: 'Junior Developer',
    company: 'Personal project',
    period: '2025 - 2026',
    detail: 'Built a subscription management system with Express, React, MongoDB and PostgreSQL.',
  },
];

const projects = [
  {
    name: 'Mbhombi-Financial-Services',
    text: 'A digital bank for community and personal accounts.',
    tags: ['Java', 'Spring Boot', 'Kafka', 'PostgreSQL', 'React'],
    url: 'https://github.com/Mshengu-R',
  },
  {
    name: 'Subscription Management',
    text: 'A dashboard for creating, updating and removing subscriptions.',
    tags: ['JavaScript', 'Express', 'React'],
    url: 'https://github.com/Mshengu-R',
  },
  {
    name: "Let's Learn",
    text: 'A student assistant for planning and maintaining academic studies.',
    tags: ['React Native', 'Express', 'PostgreSQL'],
    url: 'https://frontend-fnbhackathon.vercel.app/',
  },
];

export default function DeveloperScreen() {
  const openUrl = (url: string) => {
    void Linking.openURL(url);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <Text style={styles.eyebrow}>JAVA SOFTWARE ENGINEER</Text>
          <Text style={styles.name}>Risima Chabalala</Text>
          <Text style={styles.headline}>
            Backend developer focused on secure, scalable systems through practical projects and current software development study.
          </Text>
          <View style={styles.actions}>
            <Pressable style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]} onPress={() => openUrl('mailto:risimachabalala9@gmail.com')}>
              <Text style={styles.primaryButtonText}>Email me</Text>
            </Pressable>
            <Pressable style={({ pressed }) => [styles.secondaryButton, pressed && styles.pressed]} onPress={() => openUrl('https://github.com/Mshengu-R')}>
              <Text style={styles.secondaryButtonText}>GitHub</Text>
            </Pressable>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Skills</Text>
        <View style={styles.skillsGrid}>
          {skills.map((group) => (
            <View key={group.title} style={styles.skillCard}>
              <Text style={styles.cardTitle}>{group.title}</Text>
              {group.items.map((item) => (
                <Text key={item} style={styles.skillItem}>• {item}</Text>
              ))}
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Experience</Text>
        <View style={styles.timeline}>
          {experience.map((job) => (
            <View key={`${job.company}-${job.period}`} style={styles.job}>
              <View style={styles.timelineDot} />
              <Text style={styles.jobRole}>{job.role}</Text>
              <Text style={styles.jobCompany}>{job.company}</Text>
              <Text style={styles.jobPeriod}>{job.period}</Text>
              <Text style={styles.jobDetail}>{job.detail}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Projects</Text>
        <View style={styles.projectsGrid}>
          {projects.map((project) => (
            <Pressable
              key={project.name}
              style={({ pressed }) => [styles.projectCard, pressed && styles.pressed]}
              onPress={() => openUrl(project.url)}
            >
              <Text style={styles.projectName}>{project.name}</Text>
              <Text style={styles.projectText}>{project.text}</Text>
              <View style={styles.tags}>
                {project.tags.map((tag) => (
                  <Text key={tag} style={styles.tag}>{tag}</Text>
                ))}
              </View>
              <Text style={styles.projectLink}>View project ↗</Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.contact}>
          <Text style={styles.contactTitle}>Let’s work together</Text>
          <Text style={styles.contactText}>Open to backend engineering roles and contract work.</Text>
          <Pressable style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]} onPress={() => openUrl('mailto:risimachabalala9@gmail.com')}>
            <Text style={styles.primaryButtonText}>risimachabalala9@gmail.com</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: palette.paper },
  content: { width: '100%', maxWidth: 720, alignSelf: 'center', padding: 22, paddingBottom: 120 },
  hero: { paddingVertical: 18, marginBottom: 20 },
  eyebrow: { color: palette.green, fontSize: 10, fontWeight: '800', letterSpacing: 1.5 },
  name: { color: palette.ink, fontSize: 42, lineHeight: 46, fontWeight: '800', marginTop: 8 },
  headline: { color: palette.muted, fontSize: 16, lineHeight: 24, marginTop: 12, maxWidth: 520 },
  actions: { flexDirection: 'row', gap: 10, marginTop: 20 },
  primaryButton: { minHeight: 46, borderRadius: 12, backgroundColor: palette.green, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16 },
  primaryButtonText: { color: palette.white, fontSize: 13, fontWeight: '700' },
  secondaryButton: { minHeight: 46, borderRadius: 12, borderWidth: 1, borderColor: palette.line, backgroundColor: palette.white, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16 },
  secondaryButtonText: { color: palette.ink, fontSize: 13, fontWeight: '700' },
  pressed: { opacity: 0.78 },
  sectionTitle: { color: palette.ink, fontSize: 26, fontWeight: '800', marginTop: 18, marginBottom: 14 },
  skillsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  skillCard: { width: '48%', flexGrow: 1, minWidth: 180, backgroundColor: palette.white, borderRadius: 16, borderWidth: 1, borderColor: palette.line, padding: 16 },
  cardTitle: { color: palette.ink, fontSize: 15, fontWeight: '700', marginBottom: 8 },
  skillItem: { color: palette.muted, fontSize: 12, lineHeight: 21 },
  timeline: { borderLeftWidth: 2, borderLeftColor: palette.line, marginLeft: 7, paddingLeft: 22 },
  job: { position: 'relative', paddingBottom: 28 },
  timelineDot: { position: 'absolute', left: -29, top: 4, width: 12, height: 12, borderRadius: 6, backgroundColor: palette.green },
  jobRole: { color: palette.ink, fontSize: 17, fontWeight: '700' },
  jobCompany: { color: palette.green, fontSize: 13, marginTop: 2 },
  jobPeriod: { color: palette.muted, fontSize: 11, marginTop: 2 },
  jobDetail: { color: palette.muted, fontSize: 12, lineHeight: 20, marginTop: 7 },
  projectsGrid: { gap: 10 },
  projectCard: { backgroundColor: palette.white, borderWidth: 1, borderColor: palette.line, borderRadius: 16, padding: 18 },
  projectName: { color: palette.ink, fontSize: 18, fontWeight: '700' },
  projectText: { color: palette.muted, fontSize: 13, lineHeight: 20, marginTop: 6 },
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: 7, marginTop: 12 },
  tag: { color: palette.ink, backgroundColor: '#EDF1EC', borderRadius: 7, paddingHorizontal: 8, paddingVertical: 4, fontSize: 10 },
  projectLink: { color: palette.green, fontSize: 12, fontWeight: '700', marginTop: 14 },
  contact: { backgroundColor: palette.ink, borderRadius: 18, padding: 20, marginTop: 24 },
  contactTitle: { color: palette.white, fontSize: 22, fontWeight: '800' },
  contactText: { color: '#CFDCD4', fontSize: 13, lineHeight: 20, marginTop: 6, marginBottom: 14 },
});
