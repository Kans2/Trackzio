import { useState, useMemo } from 'react';
import { Container, Typography, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useAppContext } from '../context/AppProvider';
import PostCard from '../components/ui/PostCard';
import EmptyState from '../components/ui/EmptyState';
import FilterBar from '../components/ui/FilterBar';
import { CATEGORIES } from '../data/mockData';
import useDebounce from '../hooks/useDebounce';

/**
 * Community Feed page — browse, search, and filter community posts.
 * Supports debounced search, category filter, like/save/comment interactions.
 */
export default function CommunityFeed() {
  const { posts } = useAppContext();

  const [searchInput, setSearchInput] = useState('');
  const [category, setCategory] = useState('All');

  // Debounce search input
  const searchQuery = useDebounce(searchInput, 300);

  const filteredPosts = useMemo(() => {
    let result = [...posts];

    if (searchQuery) {
      result = result.filter(
        (post) =>
          post.caption.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.user.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (category !== 'All') {
      result = result.filter((post) => post.category === category);
    }

    // Newest first
    result.sort((a, b) => new Date(b.datePosted) - new Date(a.datePosted));
    return result;
  }, [posts, searchQuery, category]);

  const hasActiveFilters = searchQuery || category !== 'All';

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom fontWeight={700}>
        Community Feed
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        See what collectors around the world are sharing.
      </Typography>

      {/* Filter bar — search + category */}
      <FilterBar
        searchQuery={searchInput}
        setSearchQuery={setSearchInput}
        category={category}
        setCategory={setCategory}
        categories={CATEGORIES}
      />

      {filteredPosts.length === 0 ? (
        <EmptyState
          variant={hasActiveFilters ? 'no-results' : 'empty'}
          title={hasActiveFilters ? 'No posts match your search' : 'No posts yet'}
          subtitle={
            hasActiveFilters
              ? 'Try different keywords or a different category.'
              : 'Be the first to share something with the community!'
          }
        />
      ) : (
        <Box sx={{ maxWidth: 620, mx: 'auto' }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {filteredPosts.length} post{filteredPosts.length !== 1 ? 's' : ''}
          </Typography>
          {filteredPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </Box>
      )}
    </Container>
  );
}
