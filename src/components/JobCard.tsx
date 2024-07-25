import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Job } from '../types';

interface JobCardProps {
  job: Job;
  onPress: () => void;
  onBookmark: () => void;
  isBookmarked: boolean;
}

const JobCard: React.FC<JobCardProps> = ({ job, onPress, onBookmark, isBookmarked }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.cardContent}>
        <Text style={styles.title}>{job.title}</Text>
        <Text style={styles.company}>{job.company_name}</Text>
        <Text style={styles.location}>{job.location}</Text>
        <Text style={styles.salary}>{job.salary}</Text>
        <Text style={styles.jobType}>{job.job_type}</Text>
      </View>
      <TouchableOpacity style={styles.bookmarkButton} onPress={onBookmark}>
        <Icon name={isBookmarked ? 'bookmark' : 'bookmark-border'} size={24} color="#007AFF" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
  },
  cardContent: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  company: {
    fontSize: 16,
    marginBottom: 4,
  },
  location: {
    fontSize: 14,
    marginBottom: 4,
  },
  salary: {
    fontSize: 14,
    marginBottom: 4,
  },
  jobType: {
    fontSize: 14,
  },
  bookmarkButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 16,
  },
});

export default JobCard;