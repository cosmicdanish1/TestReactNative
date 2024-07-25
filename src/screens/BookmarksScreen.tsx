import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { getBookmarks, removeBookmark } from '../database/database';
import JobCard from '../components/JobCard';
import { Job, RootStackParamList } from '../types';

type BookmarksScreenNavigationProp = StackNavigationProp<RootStackParamList, 'JobsList'>;

interface BookmarksScreenProps {
  navigation: BookmarksScreenNavigationProp;
}

const BookmarksScreen: React.FC<BookmarksScreenProps> = ({ navigation }) => {
  const [bookmarks, setBookmarks] = useState<Job[]>([]);

  useEffect(() => {
    loadBookmarks();
  }, []);

  const loadBookmarks = async () => {
    try {
      const bookmarkedJobs = await getBookmarks();
      setBookmarks(bookmarkedJobs);
    } catch (err) {
      console.error('Error loading bookmarks:', err);
    }
  };

  const handleRemoveBookmark = async (jobId: string) => {
    try {
      await removeBookmark(jobId);
      setBookmarks((prev) => prev.filter((job) => job.id !== jobId));
    } catch (err) {
      console.error('Error removing bookmark:', err);
    }
  };

  const renderItem = ({ item }: { item: Job }) => (
    <JobCard
      job={item}
      onPress={() => navigation.navigate('JobDetail', { job: item })}
      onBookmark={() => handleRemoveBookmark(item.id)}
      isBookmarked={true}
    />
  );

  return (
    <FlatList
      data={bookmarks}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      ListEmptyComponent={() => (
        <View style={styles.centerContainer}>
          <Text>No bookmarked jobs.</Text>
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

export default BookmarksScreen;