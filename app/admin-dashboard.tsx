import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Users, Store, Package, DollarSign, TrendingUp, Settings, ChartBar as BarChart3, Shield, Bell } from 'lucide-react-native';
import { router } from 'expo-router';

export default function AdminDashboardPage() {
  const [selectedPeriod, setSelectedPeriod] = useState<'today' | 'week' | 'month'>('today');

  const stats = {
    today: {
      users: 1250,
      merchants: 45,
      orders: 234,
      revenue: 15680,
      growth: 12.5,
    },
    week: {
      users: 8750,
      merchants: 45,
      orders: 1567,
      revenue: 89420,
      growth: 18.3,
    },
    month: {
      users: 35200,
      merchants: 45,
      orders: 6420,
      revenue: 342800,
      growth: 24.7,
    },
  };

  const currentStats = stats[selectedPeriod];

  const recentActivities = [
    { id: 1, type: 'user', message: 'انضم مستخدم جديد: أحمد محمد', time: '5 دقائق' },
    { id: 2, type: 'merchant', message: 'تاجر جديد: متجر الإلكترونيات', time: '15 دقيقة' },
    { id: 3, type: 'order', message: 'طلب جديد بقيمة $299', time: '30 دقيقة' },
    { id: 4, type: 'system', message: 'تحديث النظام مكتمل', time: '1 ساعة' },
  ];

  const quickActions = [
    { title: 'إدارة المستخدمين', icon: Users, color: '#3B82F6' },
    { title: 'إدارة التجار', icon: Store, color: '#10B981' },
    { title: 'إدارة الطلبات', icon: Package, color: '#F59E0B' },
    { title: 'التقارير المالية', icon: BarChart3, color: '#8B5CF6' },
    { title: 'الأمان', icon: Shield, color: '#EF4444' },
    { title: 'الإعدادات', icon: Settings, color: '#6B7280' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>لوحة الإدارة</Text>
        <TouchableOpacity style={styles.notificationButton}>
          <Bell size={24} color="#8B5CF6" />
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

        {/* Main Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Users size={24} color="#3B82F6" />
              <Text style={styles.statValue}>{currentStats.users.toLocaleString()}</Text>
              <Text style={styles.statLabel}>المستخدمين</Text>
            </View>
            
            <View style={styles.statCard}>
              <Store size={24} color="#10B981" />
              <Text style={styles.statValue}>{currentStats.merchants}</Text>
              <Text style={styles.statLabel}>التجار</Text>
            </View>
          </View>
          
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Package size={24} color="#F59E0B" />
              <Text style={styles.statValue}>{currentStats.orders.toLocaleString()}</Text>
              <Text style={styles.statLabel}>الطلبات</Text>
            </View>
            
            <View style={styles.statCard}>
              <DollarSign size={24} color="#8B5CF6" />
              <Text style={styles.statValue}>${currentStats.revenue.toLocaleString()}</Text>
              <Text style={styles.statLabel}>الإيرادات</Text>
            </View>
          </View>
        </View>

        {/* Growth Card */}
        <View style={styles.growthCard}>
          <View style={styles.growthHeader}>
            <TrendingUp size={24} color="#10B981" />
            <Text style={styles.growthTitle}>معدل النمو</Text>
          </View>
          <Text style={styles.growthValue}>+{currentStats.growth}%</Text>
          <Text style={styles.growthSubtitle}>مقارنة بالفترة السابقة</Text>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>إجراءات سريعة</Text>
          
          <View style={styles.actionsGrid}>
            {quickActions.map((action, index) => {
              const IconComponent = action.icon;
              return (
                <TouchableOpacity key={index} style={styles.actionCard}>
                  <IconComponent size={24} color={action.color} />
                  <Text style={styles.actionText}>{action.title}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Recent Activities */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>النشاطات الأخيرة</Text>
          
          {recentActivities.map((activity) => (
            <View key={activity.id} style={styles.activityCard}>
              <View style={styles.activityIcon}>
                {activity.type === 'user' && <Users size={16} color="#3B82F6" />}
                {activity.type === 'merchant' && <Store size={16} color="#10B981" />}
                {activity.type === 'order' && <Package size={16} color="#F59E0B" />}
                {activity.type === 'system' && <Settings size={16} color="#6B7280" />}
              </View>
              
              <View style={styles.activityContent}>
                <Text style={styles.activityMessage}>{activity.message}</Text>
                <Text style={styles.activityTime}>منذ {activity.time}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* System Status */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>حالة النظام</Text>
          
          <View style={styles.statusContainer}>
            <View style={styles.statusItem}>
              <View style={[styles.statusIndicator, { backgroundColor: '#10B981' }]} />
              <Text style={styles.statusText}>الخوادم</Text>
              <Text style={styles.statusValue}>متصل</Text>
            </View>
            
            <View style={styles.statusItem}>
              <View style={[styles.statusIndicator, { backgroundColor: '#10B981' }]} />
              <Text style={styles.statusText}>قاعدة البيانات</Text>
              <Text style={styles.statusValue}>متصل</Text>
            </View>
            
            <View style={styles.statusItem}>
              <View style={[styles.statusIndicator, { backgroundColor: '#F59E0B' }]} />
              <Text style={styles.statusText}>الدفع</Text>
              <Text style={styles.statusValue}>تحديث</Text>
            </View>
          </View>
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
  notificationButton: {
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
    marginBottom: 20,
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
  growthCard: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginBottom: 24,
  },
  growthHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  growthTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    marginLeft: 8,
  },
  growthValue: {
    color: '#10B981',
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    marginBottom: 4,
  },
  growthSubtitle: {
    color: '#9CA3AF',
    fontSize: 14,
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
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    marginTop: 8,
    textAlign: 'center',
  },
  activityCard: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#374151',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityMessage: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    marginBottom: 4,
  },
  activityTime: {
    color: '#9CA3AF',
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
  statusContainer: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 16,
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 12,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    flex: 1,
  },
  statusValue: {
    color: '#9CA3AF',
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
});