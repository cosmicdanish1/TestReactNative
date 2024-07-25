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
        <Text style={styles.location}>{job.location}</Text>
        <Text style={styles.salary}>{job.salary}</Text>
        <Text style={styles.phone}>{job.phone}</Text>
      </View>
      <TouchableOpacity style={styles.bookmarkButton} onPress={onBookmark}>
        <Icon name={isBookmarked ? 'bookmark' : 'bookmark-border'} size={24} color="#007AFF" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // ... (same styles as before)
});

export default JobCard;