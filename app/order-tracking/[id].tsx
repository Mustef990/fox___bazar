import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Package, Truck, CircleCheck as CheckCircle, Clock, MapPin } from 'lucide-react-native';
import { router, useLocalSearchParams } from 'expo-router';

interface OrderStatus {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  timestamp?: string;
  icon: any;
}

const orderStatuses: OrderStatus[] = [
  {
    id: '1',
    title: 'تم تأكيد الطلب',
    description: 'تم استلام طلبك وتأكيده',
    completed: true,
    timestamp: '2024-01-15 10:30',
    icon: CheckCircle,
  },
  {
    id: '2',
    title: 'جاري التحضير',
    description: 'يتم تحضير طلبك للشحن',
    completed: true,
    timestamp: '2024-01-15 14:20',
    icon: Package,
  },
  {
    id: '3',
    title: 'تم الشحن',
    description: 'تم شحن طلبك وهو في الطريق إليك',
    completed: true,
    timestamp: '2024-01-16 09:15',
    icon: Truck,
  },
  {
    id: '4',
    title: 'قيد التوصيل',
    description: 'المندوب في طريقه إليك',
    completed: false,
    icon: MapPin,
  },
  {
    id: '5',
    title: 'تم التسليم',
    description: 'تم تسليم الطلب بنجاح',
    completed: false,
    icon: CheckCircle,
  },
];

export default function OrderTrackingPage() {
  const { id } = useLocalSearchParams();
  const [currentStep, setCurrentStep] = useState(2);

  const orderInfo = {
    id: id || 'ORD-2024-001',
    total: 1548.00,
    estimatedDelivery: '2024-01-17',
    trackingNumber: 'TRK123456789',
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>تتبع الطلب</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Order Info */}
        <View style={styles.orderInfoCard}>
          <Text style={styles.orderNumber}>طلب رقم: {orderInfo.id}</Text>
          <Text style={styles.orderTotal}>الإجمالي: ${orderInfo.total.toFixed(2)}</Text>
          <Text style={styles.trackingNumber}>رقم التتبع: {orderInfo.trackingNumber}</Text>
          <Text style={styles.estimatedDelivery}>
            التسليم المتوقع: {orderInfo.estimatedDelivery}
          </Text>
        </View>

        {/* Progress Timeline */}
        <View style={styles.timelineContainer}>
          <Text style={styles.timelineTitle}>حالة الطلب</Text>
          
          {orderStatuses.map((status, index) => {
            const IconComponent = status.icon;
            const isCompleted = status.completed;
            const isActive = index === currentStep;
            
            return (
              <View key={status.id} style={styles.timelineItem}>
                <View style={styles.timelineLeft}>
                  <View
                    style={[
                      styles.timelineIcon,
                      isCompleted && styles.timelineIconCompleted,
                      isActive && styles.timelineIconActive,
                    ]}
                  >
                    <IconComponent
                      size={20}
                      color={isCompleted ? '#FFFFFF' : isActive ? '#8B5CF6' : '#6B7280'}
                    />
                  </View>
                  {index < orderStatuses.length - 1 && (
                    <View
                      style={[
                        styles.timelineLine,
                        isCompleted && styles.timelineLineCompleted,
                      ]}
                    />
                  )}
                </View>
                
                <View style={styles.timelineContent}>
                  <Text
                    style={[
                      styles.timelineTitle,
                      isCompleted && styles.timelineTitleCompleted,
                      isActive && styles.timelineTitleActive,
                    ]}
                  >
                    {status.title}
                  </Text>
                  <Text style={styles.timelineDescription}>
                    {status.description}
                  </Text>
                  {status.timestamp && (
                    <Text style={styles.timelineTimestamp}>
                      {status.timestamp}
                    </Text>
                  )}
                </View>
              </View>
            );
          })}
        </View>

        {/* Delivery Info */}
        <View style={styles.deliveryCard}>
          <View style={styles.deliveryHeader}>
            <Truck size={20} color="#8B5CF6" />
            <Text style={styles.deliveryTitle}>معلومات التوصيل</Text>
          </View>
          
          <View style={styles.deliveryInfo}>
            <Text style={styles.deliveryLabel}>شركة الشحن:</Text>
            <Text style={styles.deliveryValue}>شركة التوصيل السريع</Text>
          </View>
          
          <View style={styles.deliveryInfo}>
            <Text style={styles.deliveryLabel}>المندوب:</Text>
            <Text style={styles.deliveryValue}>أحمد محمد</Text>
          </View>
          
          <View style={styles.deliveryInfo}>
            <Text style={styles.deliveryLabel}>رقم الهاتف:</Text>
            <Text style={styles.deliveryValue}>+963 999 123 456</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>اتصل بالمندوب</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.actionButton, styles.secondaryButton]}>
            <Text style={[styles.actionButtonText, styles.secondaryButtonText]}>
              إلغاء الطلب
            </Text>
          </TouchableOpacity>
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
  orderInfoCard: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 16,
    marginVertical: 16,
  },
  orderNumber: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    marginBottom: 8,
  },
  orderTotal: {
    color: '#8B5CF6',
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    marginBottom: 4,
  },
  trackingNumber: {
    color: '#9CA3AF',
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    marginBottom: 4,
  },
  estimatedDelivery: {
    color: '#10B981',
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  timelineContainer: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  timelineTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    marginBottom: 20,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  timelineLeft: {
    alignItems: 'center',
    marginRight: 16,
  },
  timelineIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#374151',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#6B7280',
  },
  timelineIconCompleted: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  timelineIconActive: {
    backgroundColor: '#1F2937',
    borderColor: '#8B5CF6',
  },
  timelineLine: {
    width: 2,
    height: 40,
    backgroundColor: '#374151',
    marginTop: 4,
  },
  timelineLineCompleted: {
    backgroundColor: '#10B981',
  },
  timelineContent: {
    flex: 1,
    paddingTop: 4,
  },
  timelineTitleCompleted: {
    color: '#10B981',
  },
  timelineTitleActive: {
    color: '#8B5CF6',
  },
  timelineDescription: {
    color: '#9CA3AF',
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    marginBottom: 4,
  },
  timelineTimestamp: {
    color: '#6B7280',
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
  deliveryCard: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  deliveryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  deliveryTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    marginLeft: 8,
  },
  deliveryInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  deliveryLabel: {
    color: '#9CA3AF',
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  deliveryValue: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  actionsContainer: {
    gap: 12,
    marginBottom: 32,
  },
  actionButton: {
    backgroundColor: '#8B5CF6',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#EF4444',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter-Bold',
  },
  secondaryButtonText: {
    color: '#EF4444',
  },
});