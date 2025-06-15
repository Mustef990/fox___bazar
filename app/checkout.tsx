import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, CreditCard, MapPin, Truck, CheckCircle } from 'lucide-react-native';
import { router } from 'expo-router';

export default function CheckoutPage() {
  const [selectedPayment, setSelectedPayment] = useState<string>('card');
  const [selectedDelivery, setSelectedDelivery] = useState<string>('standard');
  const [address, setAddress] = useState({
    street: '',
    city: '',
    phone: '',
  });

  const orderTotal = 1548.00;
  const tax = 154.80;
  const shipping = 15.00;
  const total = orderTotal + tax + shipping;

  const handlePlaceOrder = () => {
    if (!address.street || !address.city || !address.phone) {
      Alert.alert('خطأ', 'يرجى ملء جميع بيانات التوصيل');
      return;
    }

    Alert.alert(
      'تأكيد الطلب',
      `إجمالي الطلب: $${total.toFixed(2)}\nهل تريد تأكيد الطلب؟`,
      [
        { text: 'إلغاء', style: 'cancel' },
        {
          text: 'تأكيد',
          onPress: () => {
            Alert.alert('تم الطلب', 'تم تأكيد طلبك بنجاح!', [
              { text: 'موافق', onPress: () => router.push('/(tabs)') }
            ]);
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>إتمام الطلب</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Delivery Address */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MapPin size={20} color="#8B5CF6" />
            <Text style={styles.sectionTitle}>عنوان التوصيل</Text>
          </View>
          
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="الشارع والحي"
              placeholderTextColor="#9CA3AF"
              value={address.street}
              onChangeText={(text) => setAddress({...address, street: text})}
            />
            
            <TextInput
              style={styles.input}
              placeholder="المدينة"
              placeholderTextColor="#9CA3AF"
              value={address.city}
              onChangeText={(text) => setAddress({...address, city: text})}
            />
            
            <TextInput
              style={styles.input}
              placeholder="رقم الهاتف"
              placeholderTextColor="#9CA3AF"
              keyboardType="phone-pad"
              value={address.phone}
              onChangeText={(text) => setAddress({...address, phone: text})}
            />
          </View>
        </View>

        {/* Delivery Options */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Truck size={20} color="#8B5CF6" />
            <Text style={styles.sectionTitle}>خيارات التوصيل</Text>
          </View>
          
          <TouchableOpacity
            style={[styles.option, selectedDelivery === 'standard' && styles.selectedOption]}
            onPress={() => setSelectedDelivery('standard')}
          >
            <View style={styles.optionContent}>
              <Text style={styles.optionTitle}>توصيل عادي</Text>
              <Text style={styles.optionSubtitle}>3-5 أيام عمل</Text>
            </View>
            <Text style={styles.optionPrice}>$15.00</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.option, selectedDelivery === 'express' && styles.selectedOption]}
            onPress={() => setSelectedDelivery('express')}
          >
            <View style={styles.optionContent}>
              <Text style={styles.optionTitle}>توصيل سريع</Text>
              <Text style={styles.optionSubtitle}>1-2 أيام عمل</Text>
            </View>
            <Text style={styles.optionPrice}>$25.00</Text>
          </TouchableOpacity>
        </View>

        {/* Payment Method */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <CreditCard size={20} color="#8B5CF6" />
            <Text style={styles.sectionTitle}>طريقة الدفع</Text>
          </View>
          
          <TouchableOpacity
            style={[styles.option, selectedPayment === 'card' && styles.selectedOption]}
            onPress={() => setSelectedPayment('card')}
          >
            <View style={styles.optionContent}>
              <Text style={styles.optionTitle}>بطاقة ائتمان</Text>
              <Text style={styles.optionSubtitle}>Visa, Mastercard</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.option, selectedPayment === 'cash' && styles.selectedOption]}
            onPress={() => setSelectedPayment('cash')}
          >
            <View style={styles.optionContent}>
              <Text style={styles.optionTitle}>الدفع عند التسليم</Text>
              <Text style={styles.optionSubtitle}>نقداً للمندوب</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Order Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ملخص الطلب</Text>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>المجموع الفرعي</Text>
            <Text style={styles.summaryValue}>${orderTotal.toFixed(2)}</Text>
          </View>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>الضريبة</Text>
            <Text style={styles.summaryValue}>${tax.toFixed(2)}</Text>
          </View>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>التوصيل</Text>
            <Text style={styles.summaryValue}>
              ${selectedDelivery === 'express' ? '25.00' : '15.00'}
            </Text>
          </View>
          
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>الإجمالي</Text>
            <Text style={styles.totalValue}>
              ${(orderTotal + tax + (selectedDelivery === 'express' ? 25 : 15)).toFixed(2)}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Place Order Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.placeOrderButton} onPress={handlePlaceOrder}>
          <CheckCircle size={20} color="#FFFFFF" />
          <Text style={styles.placeOrderText}>تأكيد الطلب</Text>
        </TouchableOpacity>
      </View>
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
  section: {
    marginVertical: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    marginLeft: 8,
  },
  inputContainer: {
    gap: 12,
  },
  input: {
    backgroundColor: '#1F2937',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1F2937',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedOption: {
    borderColor: '#8B5CF6',
    backgroundColor: '#4C1D95',
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    marginBottom: 4,
  },
  optionSubtitle: {
    color: '#9CA3AF',
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  optionPrice: {
    color: '#8B5CF6',
    fontSize: 16,
    fontFamily: 'Inter-Bold',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryLabel: {
    color: '#9CA3AF',
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  summaryValue: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter-Medium',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#374151',
    paddingTop: 12,
    marginTop: 8,
  },
  totalLabel: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Inter-Bold',
  },
  totalValue: {
    color: '#8B5CF6',
    fontSize: 20,
    fontFamily: 'Inter-Bold',
  },
  bottomContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#374151',
  },
  placeOrderButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8B5CF6',
    borderRadius: 12,
    paddingVertical: 16,
  },
  placeOrderText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    marginLeft: 8,
  },
});