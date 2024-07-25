import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';

type JobDetailScreenRouteProp = RouteProp<RootStackParamList, 'JobDetail'>;

interface JobDetailScreenProps {
  route: JobDetailScreenRouteProp;
}

const JobDetailScreen: React.FC<JobDetailScreenProps> = ({ route }) => {
  const { job } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{job.title}</Text>
      <Text style={styles.section}>Location: {job.location}</Text>
      <Text style={styles.section}>Salary: {job.salary}</Text>
      <Text style={styles.section}>Phone: {job.phone}</Text>
      <Text style={styles.description}>{job.description}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  section: {
    fontSize: 18,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    marginTop: 16,
  },
});

export default JobDetailScreen;