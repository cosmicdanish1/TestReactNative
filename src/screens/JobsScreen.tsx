import React, { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { fetchJobs } from '../services/jobsApi';
import { addBookmark, removeBookmark } from '../database/database';
import JobCard from '../components/JobCard';
import { Job, RootStackParamList } from '../types';

type JobsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'JobsList'>;

interface JobsScreenProps {
  navigation: JobsScreenNavigationProp;
}

const JobsScreen: React.FC<JobsScreenProps> = ({ navigation }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bookmarks, setBookmarks] = useState<Record<string, boolean>>({});

  const loadJobs = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const newJobs = await fetchJobs(page);
      setJobs((prevJobs) => [...prevJobs, ...newJobs]);
      setPage((prevPage) => prevPage + 1);
      setError(null);
    } catch (err) {
      setError('Failed to load jobs. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  const handleBookmark = async (job: Job) => {
    try {
      if (bookmarks[job.id]) {
        await removeBookmark(job.id);
        setBookmarks((prev) => ({ ...prev, [job.id]: false }));
      } else {
        await addBookmark(job);
        setBookmarks((prev) => ({ ...prev, [job.id]: true }));
      }
    } catch (err) {
      console.error('Error toggling bookmark:', err);
    }
  };

  const renderItem = ({ item }: { item: Job }) => (
    <JobCard
      job={item}
      onPress={() => navigation.navigate('JobDetail', { job: item })}
      onBookmark={() => handleBookmark(item)}
      isBookmarked={!!bookmarks[item.id]}
    />
  );

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={jobs}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      onEndReached={loadJobs}
      onEndReachedThreshold={0.1}
      ListFooterComponent={() => (loading ? <ActivityIndicator size="large" color="#0000ff" /> : null)}
      ListEmptyComponent={() => (
        <View style={styles.centerContainer}>
          <Text>No jobs found.</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default JobsScreen;