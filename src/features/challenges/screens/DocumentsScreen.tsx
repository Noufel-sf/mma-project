import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  FileText,
  Download,
  ExternalLink,
  Search,
  BookOpen,
  FileCode,
  ShieldAlert,
} from 'lucide-react-native';

interface DocumentItem {
  id: string;
  title: string;
  category: 'Specs' | 'Templates' | 'Guidelines' | 'Rules';
  fileSize: string;
  format: 'PDF' | 'DOCX' | 'ZIP' | 'FIGMA';
  updatedAt: string;
}

const mockDocuments: DocumentItem[] = [
  {
    id: 'doc-1',
    title: 'Point.43 Official Submission Guidelines & Criteria',
    category: 'Guidelines',
    fileSize: '1.4 MB',
    format: 'PDF',
    updatedAt: 'Updated Nov 2026',
  },
  {
    id: 'doc-2',
    title: 'AI Smart Waste IoT Technical Architecture Spec',
    category: 'Specs',
    fileSize: '3.8 MB',
    format: 'PDF',
    updatedAt: 'Updated Nov 2026',
  },
  {
    id: 'doc-3',
    title: 'Solution Seeker Starter Template & Boilerplate',
    category: 'Templates',
    fileSize: '12.5 MB',
    format: 'ZIP',
    updatedAt: 'Updated Oct 2026',
  },
  {
    id: 'doc-4',
    title: 'Intellectual Property & Code Rights Agreement',
    category: 'Rules',
    fileSize: '820 KB',
    format: 'PDF',
    updatedAt: 'Updated Nov 2026',
  },
  {
    id: 'doc-5',
    title: 'Telemedicine Mobile API OpenAPI 3.0 Specs',
    category: 'Specs',
    fileSize: '450 KB',
    format: 'DOCX',
    updatedAt: 'Updated Nov 2026',
  },
  {
    id: 'doc-6',
    title: 'Design System Tokens & Figma UI Kit',
    category: 'Templates',
    fileSize: '24.2 MB',
    format: 'FIGMA',
    updatedAt: 'Updated Nov 2026',
  },
];

const categories = ['All', 'Specs', 'Templates', 'Guidelines', 'Rules'] as const;

export const DocumentsScreen: React.FC = () => {
  const [selectedCat, setSelectedCat] = useState<string>('All');
  const [search, setSearch] = useState('');

  const filtered = mockDocuments.filter((doc) => {
    const matchesCat = selectedCat === 'All' || doc.category === selectedCat;
    const matchesSearch = doc.title.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleDownload = (doc: DocumentItem) => {
    Alert.alert(
      'Download Started',
      `Downloading "${doc.title}" (${doc.fileSize}). Saved to your device documents.`,
      [{ text: 'OK' }]
    );
  };

  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={{ flex: 1, backgroundColor: '#F9FAFB' }}>
      {/* Header */}
      <View className="px-6 pt-3 pb-3 bg-white border-b border-[#F3F4F6]">
        <View className="flex-row items-center justify-between mb-3">
          <View>
            <Text className="text-xs font-semibold text-[#7E5DF6] uppercase tracking-wider">
              Resources & Library
            </Text>
            <Text className="text-2xl font-bold text-[#111827]">
              Documents & Specs
            </Text>
          </View>
          <View
            className="w-10 h-10 rounded-full items-center justify-center"
            style={{ backgroundColor: 'rgba(126, 93, 246, 0.1)' }}
          >
            <BookOpen size={20} color="#7E5DF6" />
          </View>
        </View>

        {/* Search */}
        <View className="h-11 bg-[#F3F4F6] rounded-2xl px-4 flex-row items-center mb-3">
          <Search size={16} color="#9CA3AF" />
          <TextInput
            placeholder="Search specs, templates, guidelines..."
            placeholderTextColor="#9CA3AF"
            value={search}
            onChangeText={setSearch}
            className="flex-1 ml-2 text-xs text-[#111827]"
          />
        </View>

        {/* Category Chips */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row gap-2 pb-1">
          {categories.map((cat) => {
            const isSelected = selectedCat === cat;
            return (
              <TouchableOpacity
                key={cat}
                activeOpacity={0.8}
                onPress={() => setSelectedCat(cat)}
                className={`px-3.5 py-1.5 rounded-full ${
                  isSelected ? 'bg-[#7E5DF6]' : 'bg-[#F3F4F6]'
                }`}
              >
                <Text
                  className={`text-xs font-semibold ${
                    isSelected ? 'text-white' : 'text-[#6B7280]'
                  }`}
                >
                  {cat}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <ScrollView className="flex-1 px-6 py-5" showsVerticalScrollIndicator={false}>
        <Text className="text-base font-bold text-[#111827] mb-3">
          Available Documents ({filtered.length})
        </Text>

        {filtered.map((doc) => (
          <View
            key={doc.id}
            className="bg-white rounded-[20px] p-4 mb-3.5 border border-[#E8EFF3] flex-row items-center justify-between"
            style={{ elevation: 1 }}
          >
            <View className="flex-row items-start gap-3 flex-1 pr-3">
              <View
                className="w-10 h-10 rounded-2xl items-center justify-center mt-0.5"
                style={{ backgroundColor: 'rgba(126, 93, 246, 0.1)' }}
              >
                {doc.category === 'Templates' ? (
                  <FileCode size={20} color="#7E5DF6" />
                ) : doc.category === 'Rules' ? (
                  <ShieldAlert size={20} color="#7E5DF6" />
                ) : (
                  <FileText size={20} color="#7E5DF6" />
                )}
              </View>

              <View className="flex-1">
                <Text className="text-[14px] font-bold text-[#111827] leading-5 mb-1">
                  {doc.title}
                </Text>
                <Text className="text-[11px] text-[#9CA3AF]">
                  {doc.format} • {doc.fileSize} • {doc.updatedAt}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => handleDownload(doc)}
              className="w-10 h-10 rounded-full bg-[#F3F4F6] items-center justify-center"
            >
              <Download size={18} color="#7E5DF6" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};
