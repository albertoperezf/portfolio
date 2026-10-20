import { Document, Link, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import {
  certifications,
  earlierExperience,
  education,
  experience,
  profile,
  skills,
  spokenLanguages,
  type Experience,
} from '@/content/profile';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/dictionaries/en';
import { formatMonthYear, interpolate } from '@/lib/format';

const ACCENT = '#c2410c';
const MUTED = '#57534e';

const styles = StyleSheet.create({
  page: {
    paddingVertical: 40,
    paddingHorizontal: 44,
    fontFamily: 'Helvetica',
    fontSize: 9.5,
    lineHeight: 1.45,
    color: '#1c1917',
  },
  name: { fontFamily: 'Helvetica-Bold', fontSize: 22, letterSpacing: -0.3 },
  headline: { fontSize: 11, marginTop: 4, color: MUTED },
  links: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 8, columnGap: 12, rowGap: 2 },
  link: { color: '#1c1917', textDecoration: 'none' },
  section: { marginTop: 16 },
  sectionTitle: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 10,
    color: ACCENT,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    paddingBottom: 3,
    marginBottom: 6,
    borderBottomWidth: 0.75,
    borderBottomColor: '#d6d3d1',
  },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  bold: { fontFamily: 'Helvetica-Bold' },
  muted: { color: MUTED },
  job: { marginBottom: 9 },
  tech: { marginTop: 2, color: MUTED, fontSize: 8.5 },
});

function period(start: string, end: string | undefined, locale: Locale, present: string) {
  return `${formatMonthYear(start, locale)} – ${end ? formatMonthYear(end, locale) : present}`;
}

function Job({
  item,
  locale,
  present,
  compact,
}: {
  item: Experience;
  locale: Locale;
  present: string;
  compact?: boolean;
}) {
  return (
    <View style={styles.job} wrap={false}>
      <View style={styles.row}>
        <Text style={styles.bold}>{item.company}</Text>
        <Text style={styles.muted}>{item.location[locale]}</Text>
      </View>
      {item.roles.map((role) => (
        <View key={`${role.title.en}-${role.start}`} style={styles.row}>
          <Text>{role.title[locale]}</Text>
          <Text style={styles.muted}>{period(role.start, role.end, locale, present)}</Text>
        </View>
      ))}
      {!compact && <Text style={{ marginTop: 2 }}>{item.description[locale]}</Text>}
      {!compact && item.tech && <Text style={styles.tech}>{item.tech.join(' · ')}</Text>}
    </View>
  );
}

export function CvDocument({
  locale,
  t,
  years,
  siteUrl,
}: {
  locale: Locale;
  t: Dictionary;
  years: number;
  siteUrl: string;
}) {
  const present = t.about.present;
  const links = [
    { href: `${siteUrl}/${locale}`, label: siteUrl.replace(/^https?:\/\//, '') },
    { href: profile.links.linkedin, label: 'linkedin.com/in/albertojpf' },
    { href: profile.links.github, label: 'github.com/albertoperezf' },
    { href: profile.links.stackOverflow, label: 'stackoverflow.com/users/6450931' },
  ];

  return (
    <Document
      title={`${profile.fullName} · CV`}
      author={profile.fullName}
      subject={t.meta.description}
      language={locale}
      creator={siteUrl}
      producer={siteUrl}
    >
      <Page size="A4" style={styles.page}>
        <Text style={styles.name}>{profile.fullName}</Text>
        <Text style={styles.headline}>Senior Frontend Developer · {t.about.summary.locationValue}</Text>
        <View style={styles.links}>
          {links.map((link) => (
            <Link key={link.href} src={link.href} style={styles.link}>
              {link.label}
            </Link>
          ))}
        </View>

        <View style={styles.section}>
          <Text>{interpolate(t.home.intro, { years })}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.about.skillsTitle}</Text>
          {skills.map((group) => (
            <Text key={group.name.en} style={{ marginBottom: 2 }}>
              <Text style={styles.bold}>{group.name[locale]}: </Text>
              {group.items[locale].join(', ')}
            </Text>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.about.experienceTitle}</Text>
          {experience.map((item) => (
            <Job key={item.id} item={item} locale={locale} present={present} />
          ))}
        </View>

        <View style={styles.section} wrap={false}>
          <Text style={styles.sectionTitle}>{t.about.earlierTitle}</Text>
          {earlierExperience.map((item) => (
            <Job key={item.id} item={item} locale={locale} present={present} compact />
          ))}
        </View>

        <View style={styles.section} wrap={false}>
          <Text style={styles.sectionTitle}>{t.about.educationTitle}</Text>
          <View style={styles.row}>
            <Text style={styles.bold}>{education.degree[locale]}</Text>
            <Text style={styles.muted}>
              {education.start}–{education.end}
            </Text>
          </View>
          <Text>
            {education.school} · {education.location[locale]}
          </Text>
        </View>

        <View style={styles.section} wrap={false}>
          <Text style={styles.sectionTitle}>{t.about.certificationsTitle}</Text>
          {certifications.map((cert) => (
            <View key={cert.name} style={styles.row}>
              <Text style={cert.highlight ? styles.bold : undefined}>{cert.name}</Text>
              <Text style={styles.muted}>{[cert.issuer, cert.year].filter(Boolean).join(' · ')}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section} wrap={false}>
          <Text style={styles.sectionTitle}>{t.about.languagesTitle}</Text>
          {spokenLanguages.map((language) => (
            <Text key={language.name.en}>
              <Text style={styles.bold}>{language.name[locale]}: </Text>
              {language.level[locale]}
            </Text>
          ))}
        </View>
      </Page>
    </Document>
  );
}
