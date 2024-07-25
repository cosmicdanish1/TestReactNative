import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, ActivityIndicator, Text, StyleSheet, Button } from 'react-native';
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
  const [hasMoreJobs, setHasMoreJobs] = useState(true);

  const loadJobs = useCallback(async () => {
    if (loading || !hasMoreJobs) return;
    setLoading(true);
    try {
      console.log('Loading jobs for page:', page);
      const newJobs = await fetchJobs(page);
      console.log(`Received ${newJobs.length} new jobs`);
      if (newJobs.length === 0) {
        setHasMoreJobs(false);
      } else {
        setJobs((prevJobs) => {
          const updatedJobs = [...prevJobs, ...newJobs];
          console.log(`Total jobs after update: ${updatedJobs.length}`);
          return updatedJobs;
        });
        setPage((prevPage) => prevPage + 1);
      }
      setError(null);
    } catch (err) {
      console.error('Error in loadJobs:', err);
      setError('Failed to load jobs. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [page, loading, hasMoreJobs]);

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

  const handleRefresh = useCallback(() => {
    console.log('Refreshing jobs');
    setJobs([]);
    setPage(1);
    setHasMoreJobs(true);
    loadJobs();
  }, [loadJobs]);

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text>{error}</Text>
        <Button title="Retry" onPress={handleRefresh} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
     <FlatList
  data={jobs}
  renderItem={renderItem}
  keyExtractor={(item) => item.id ? item.id.toString() : 'unknown'}
  onEndReached={loadJobs}
  onEndReachedThreshold={0.1}
  ListFooterComponent={() => (
    loading ? (
      <ActivityIndicator size="large" color="#0000ff" />
    ) : !hasMoreJobs && jobs.length > 0 ? (
      <Text style={styles.endMessage}>No more jobs to load</Text>
    ) : null
  )}
  ListEmptyComponent={() => (
    <View style={styles.centerContainer}>
      <Text>No jobs found. Pull down to refresh.</Text>
    </View>
  )}
  refreshing={loading}
  onRefresh={handleRefresh}
/>

      <Text>Total Jobs: {jobs.length}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  endMessage: {
    textAlign: 'center',
    padding: 16,
  },
});

export default JobsScreen;