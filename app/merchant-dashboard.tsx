import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Store, Package, DollarSign, TrendingUp, Eye, Plus } from 'lucide-react-native';
import { router } from 'expo-router';

export default function MerchantDashboardPage() {
  const [selectedPeriod, setSelectedPeriod] = useState<'today' | 'week' | 'month'>('today');

  const stats = {
    today: {
      sales: 1250,
      orders: 23,
      products: 156,
      views: 1840,
    },
    week: {
      sales: 8750,
      orders: 167,
      products: 156,
      views: 12680,
    },
    month: {
      sales: 35200,
      orders: 642,
      products: 156,
      views: 48920,
    },
  };

  const currentStats = stats[selectedPeriod];

  const recentOrders = [
    { id: 'ORD-001', customer: 'أحمد محمد', amount: 299, status: 'pending' },
    { id: 'ORD-002', customer: 'فاطمة علي', amount: 150, status: 'shipped' },
    { id: 'ORD-003', customer: 'محمد حسن', amount: 450, status: 'delivered' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return '#F59E0B';
      case 'shipped': return '#3B82F6';
      case 'delivered': return '#10B981';
      default: return '#6B7280';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'قيد المراجعة';
      case 'shipped': return 'تم الشحن';
      case 'delivered': return 'تم التسليم';
      default: return 'غير محدد';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>لوحة التاجر</Text>
        <TouchableOpacity style={styles.addButton}>
          <Plus size={24} color="#8B5CF6" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Period Selector */}
        <View style={styles.periodSelector}>
          {(['today', 'week', 'month'] as const).map((period) => (
            <TouchableOpacity
              key={period}
              style={[
                styles.periodButton,
                selectedPeriod === period && styles.periodButtonActive,
              ]}
              onPress={() => setSelectedPeriod(period)}
            >
              <Text
                style={[
                  styles.periodButtonText,
                  selectedPeriod === period && styles.periodButtonTextActive,
                ]}
              >
                {period === 'today' ? 'اليوم' : period === 'week' ? 'الأسبوع' : 'الشهر'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <DollarSign size={24} color="#10B981" />
              <Text style={styles.statValue}>${currentStats.sales}</Text>
              <Text style={styles.statLabel}>المبيعات</Text>
            </View>
            
            <View style={styles.statCard}>
              <Package size={24} color="#3B82F6" />
              <Text style={styles.statValue}>{currentStats.orders}</Text>
              <Text style={styles.statLabel}>الطلبات</Text>
            </View>
          </View>
          
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Store size={24} color="#8B5CF6" />
              <Text style={styles.statValue}>{currentStats.products}</Text>
              <Text style={styles.statLabel}>المنتجات</Text>
            </View>
            
            <View style={styles.statCard}>
              <Eye size={24} color="#F59E0B" />
              <Text style={styles.statValue}>{currentStats.views}</Text>
              <Text style={styles.statLabel}>المشاهدات</Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>إجراءات سريعة</Text>
          
          <View style={styles.actionsGrid}>
            <TouchableOpacity style={styles.actionCard}>
              <Plus size={24} color="#8B5CF6" />
              <Text style={styles.actionText}>إضافة منتج</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionCard}>
              <Package size={24} color="#3B82F6" />
              <Text style={styles.actionText}>إدارة الطلبات</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionCard}>
              <TrendingUp size={24} color="#10B981" />
              <Text style={styles.actionText}>التقارير</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionCard}>
              <Store size={24} color="#F59E0B" />
              <Text style={styles.actionText}>إعدادات المتجر</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Orders */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>الطلبات الأخيرة</Text>
          
          {recentOrders.map((order) => (
            <View key={order.id} style={styles.orderCard}>
              <View style={styles.orderInfo}>
                <Text style={styles.orderId}>{order.id}</Text>
                <Text style={styles.customerName}>{order.customer}</Text>
              </View>
              
              <View style={styles.orderDetails}>
                <Text style={styles.orderAmount}>${order.amount}</Text>
                <View
                  style={[
                    styles.statusBadge,
                    { backgroundColor: getStatusColor(order.status) },
                  ]}
                >
                  <Text style={styles.statusText}>{getStatusText(order.status)}</Text>
                </View>
              </View>
            </View>
          ))}
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
  addButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  periodSelector: {
    flexDirection: 'row',
    backgroundColor: '#1F2937',
    borderRadius: 8,
    padding: 4,
    marginVertical: 16,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 6,
  },
  periodButtonActive: {
    backgroundColor: '#8B5CF6',
  },
  periodButtonText: {
    color: '#9CA3AF',
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  periodButtonTextActive: {
    color: '#FFFFFF',
  },
  statsContainer: {
    marginBottom: 24,
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
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    color: '#9CA3AF',
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    marginBottom: 16,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    width: '48%',
    marginBottom: 12,
  },
  actionText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    marginTop: 8,
    textAlign: 'center',
  },
  orderCard: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderInfo: {
    flex: 1,
  },
  orderId: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    marginBottom: 4,
  },
  customerName: {
    color: '#9CA3AF',
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  orderDetails: {
    alignItems: 'flex-end',
  },
  orderAmount: {
    color: '#8B5CF6',
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    marginBottom: 4,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Inter-Bold',
  },
});