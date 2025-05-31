import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Search, ChevronRight, MessageCircle, Book, CircleHelp as HelpCircle, Mail } from 'lucide-react-native';

export default function Help() {
  const [searchQuery, setSearchQuery] = useState('');

  const faqs = [
    {
      id: '1',
      question: 'How do I set up my first goal?',
      answer: 'To set up your first goal, go to the Goals tab and click the "+" button. Fill in the goal details including title, description, and target date.',
      category: 'Getting Started',
    },
    {
      id: '2',
      question: 'How do accountability partners work?',
      answer: 'Accountability partners are matched based on similar goals and interests. They help keep you motivated and on track with your goals through regular check-ins and support.',
      category: 'Partners',
    },
    {
      id: '3',
      question: 'Can I change my privacy settings?',
      answer: 'Yes, you can customize your privacy settings in the Settings menu under Privacy & Security. This includes profile visibility and who can send you partner requests.',
      category: 'Privacy',
    },
  ];

  const categories = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: Book,
      color: '#3B82F6',
    },
    {
      id: 'account',
      title: 'Account & Settings',
      icon: HelpCircle,
      color: '#8B5CF6',
    },
    {
      id: 'partners',
      title: 'Partners & Community',
      icon: MessageCircle,
      color: '#10B981',
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      <View style={styles.header}>
        <Text style={styles.title}>Help Center</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color="#6B7280" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search help articles..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>Browse by Category</Text>
          <View style={styles.categoriesGrid}>
            {categories.map(category => (
              <TouchableOpacity 
                key={category.id} 
                style={styles.categoryCard}
              >
                <View style={[styles.categoryIcon, { backgroundColor: `${category.color}20` }]}>
                  <category.icon size={24} color={category.color} />
                </View>
                <Text style={styles.categoryTitle}>{category.title}</Text>
                <ChevronRight size={20} color="#6B7280" />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.faqSection}>
          <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
          {faqs.map(faq => (
            <TouchableOpacity key={faq.id} style={styles.faqCard}>
              <View style={styles.faqHeader}>
                <Text style={styles.faqQuestion}>{faq.question}</Text>
                <ChevronRight size={20} color="#6B7280" />
              </View>
              <Text style={styles.faqCategory}>{faq.category}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.contactSection}>
          <Text style={styles.sectionTitle}>Need More Help?</Text>
          <TouchableOpacity style={styles.contactCard}>
            <View style={styles.contactInfo}>
              <View style={styles.contactIcon}>
                <Mail size={24} color="#3B82F6" />
              </View>
              <View>
                <Text style={styles.contactTitle}>Contact Support</Text>
                <Text style={styles.contactDescription}>
                  Get help from our support team
                </Text>
              </View>
            </View>
            <ChevronRight size={20} color="#6B7280" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#1F2937',
  },
  searchContainer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 44,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1F2937',
  },
  content: {
    flex: 1,
  },
  categoriesSection: {
    padding: 16,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1F2937',
    marginBottom: 16,
  },
  categoriesGrid: {
    gap: 12,
  },
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  categoryTitle: {
    flex: 1,
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1F2937',
  },
  faqSection: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    marginTop: 8,
  },
  faqCard: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  faqHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  faqQuestion: {
    flex: 1,
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#1F2937',
    marginRight: 16,
  },
  faqCategory: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  contactSection: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    marginTop: 8,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
  },
  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#EBF5FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  contactTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 4,
  },
  contactDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
  },
});