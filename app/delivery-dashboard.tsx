import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Truck, MapPin, Clock, CircleCheck as CheckCircle, Phone, Navigation } from 'lucide-react-native';
import { router } from 'expo-router';

export default function DeliveryDashboardPage() {
  const [selectedTab, setSelectedTab] = useState<'pending' | 'active' | 'completed'>('pending');

  const deliveries = {
    pending: [
      {
        id: 'DEL-001',
        orderId: 'ORD-2024-001',
        customer: 'أحمد محمد',
        address: 'شارع الحمرا، بيروت',
        phone: '+961 70 123 456',
        amount: 299,
        distance: '2.5 كم',
        estimatedTime: '15 دقيقة',
      },
      {
        id: 'DEL-002',
        orderId: 'ORD-2024-002',
        customer: 'فاطمة علي',
        address: 'منطقة الأشرفية، بيروت',
        phone: '+961 71 234 567',
        amount: 150,
        distance: '4.2 كم',
        estimatedTime: '25 دقيقة',
      },
    ],
    active: [
      {
        id: 'DEL-003',
        orderId: 'ORD-2024-003',
        customer: 'محمد حسن',
        address: 'شارع فردان، بيروت',
        phone: '+961 76 345 678',
        amount: 450,
        distance: '1.8 كم',
        estimatedTime: '10 دقائق',
        startedAt: '14:30',
      },
    ],
    completed: [
      {
        id: 'DEL-004',
        orderId: 'ORD-2024-004',
        customer: 'سارة أحمد',
        address: 'منطقة الروشة، بيروت',
        phone: '+961 78 456 789',
        amount: 320,
        completedAt: '13:45',
        rating: 5,
      },
    ],
  };

  const stats = {
    todayDeliveries: 12,
    totalEarnings: 180,
    averageRating: 4.8,
    completionRate: 95,
  };

  const renderDeliveryCard = (delivery: any, status: string) => (
    <View key={delivery.id} style={styles.deliveryCard}>
      <View style={styles.deliveryHeader}>
        <Text style={styles.orderId}>{delivery.orderId}</Text>
        <Text style={styles.amount}>${delivery.amount}</Text>
      </View>
      
      <Text style={styles.customerName}>{delivery.customer}</Text>
      <View style={styles.addressContainer}>
        <MapPin size={16} color="#9CA3AF" />
        <Text style={styles.address}>{delivery.address}</Text>
      </View>
      
      {status === 'pending' && (
        <View style={styles.deliveryInfo}>
          <View style={styles.infoItem}>
            <Navigation size={14} color="#8B5CF6" />
            <Text style={styles.infoText}>{delivery.distance}</Text>
          </View>
          <View style={styles.infoItem}>
            <Clock size={14} color="#F59E0B" />
            <Text style={styles.infoText}>{delivery.estimatedTime}</Text>
          </View>
        </View>
      )}
      
      {status === 'active' && (
        <View style={styles.deliveryInfo}>
          <View style={styles.infoItem}>
            <Clock size={14} color="#10B981" />
            <Text style={styles.infoText}>بدأ في {delivery.startedAt}</Text>
          </View>
          <View style={styles.infoItem}>
            <Navigation size={14} color="#8B5CF6" />
            <Text style={styles.infoText}>{delivery.estimatedTime}</Text>
          </View>
        </View>
      )}
      
      {status === 'completed' && (
        <View style={styles.deliveryInfo}>
          <View style={styles.infoItem}>
            <CheckCircle size={14} color="#10B981" />
            <Text style={styles.infoText}>اكتمل في {delivery.completedAt}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.rating}>⭐ {delivery.rating}</Text>
          </View>
        </View>
      )}
      
      <View style={styles.deliveryActions}>
        <TouchableOpacity style={styles.phoneButton}>
          <Phone size={16} color="#FFFFFF" />
          <Text style={styles.phoneButtonText}>اتصال</Text>
        </TouchableOpacity>
        
        {status === 'pending' && (
          <TouchableOpacity style={styles.acceptButton}>
            <Text style={styles.acceptButtonText}>قبول</Text>
          </TouchableOpacity>
        )}
        
        {status === 'active' && (
          <TouchableOpacity style={styles.completeButton}>
            <Text style={styles.completeButtonText}>تم التسليم</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>لوحة المندوب</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Truck size={20} color="#8B5CF6" />
              <Text style={styles.statValue}>{stats.todayDeliveries}</Text>
              <Text style={styles.statLabel}>توصيلات اليوم</Text>
            </View>
            
            <View style={styles.statCard}>
              <Text style={styles.statValue}>${stats.totalEarnings}</Text>
              <Text style={styles.statLabel}>الأرباح</Text>
            </View>
          </View>
          
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{stats.averageRating}⭐</Text>
              <Text style={styles.statLabel}>التقييم</Text>
            </View>
            
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{stats.completionRate}%</Text>
              <Text style={styles.statLabel}>معدل الإنجاز</Text>
            </View>
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          {(['pending', 'active', 'completed'] as const).map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, selectedTab === tab && styles.activeTab]}
              onPress={() => setSelectedTab(tab)}
            >
              <Text
                style={[styles.tabText, selectedTab === tab && styles.activeTabText]}
              >
                {tab === 'pending' ? 'قيد الانتظار' : 
                 tab === 'active' ? 'نشط' : 'مكتمل'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Deliveries List */}
        <View style={styles.deliveriesContainer}>
          {deliveries[selectedTab].map((delivery) => 
            renderDeliveryCard(delivery, selectedTab)
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontFamily: 'Inter-Bold',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  statsContainer: {
    marginVertical: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  statCard: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 6,
  },
  statValue: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    marginTop: 4,
    marginBottom: 4,
  },
  statLabel: {
    color: '#9CA3AF',
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#1F2937',
    borderRadius: 8,
    padding: 4,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 6,
  },
  activeTab: {
    backgroundColor: '#8B5CF6',
  },
  tabText: {
    color: '#9CA3AF',
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  deliveriesContainer: {
    marginBottom: 20,
  },
  deliveryCard: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  deliveryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  orderId: {
    color: '#8B5CF6',
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  amount: {
    color: '#10B981',
    fontSize: 16,
    fontFamily: 'Inter-Bold',
  },
  customerName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    marginBottom: 8,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  address: {
    color: '#9CA3AF',
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    marginLeft: 8,
    flex: 1,
  },
  deliveryInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    color: '#9CA3AF',
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    marginLeft: 4,
  },
  rating: {
    color: '#FCD34D',
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
  deliveryActions: {
    flexDirection: 'row',
    gap: 8,
  },
  phoneButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#374151',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flex: 1,
    justifyContent: 'center',
  },
  phoneButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    marginLeft: 4,
  },
  acceptButton: {
    backgroundColor: '#8B5CF6',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  acceptButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Inter-Bold',
  },
  completeButton: {
    backgroundColor: '#10B981',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  completeButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Inter-Bold',
  },
});