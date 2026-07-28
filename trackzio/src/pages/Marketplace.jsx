import { useState, useMemo } from 'react';
import { Container, Grid, Typography, Box } from '@mui/material';
import { useAppContext } from '../context/AppProvider';
import ItemCard from '../components/ui/ItemCard';
import FilterBar from '../components/ui/FilterBar';
import SkeletonCard from '../components/ui/SkeletonCard';
import EmptyState from '../components/ui/EmptyState';
import ErrorState from '../components/ui/ErrorState';
import { CATEGORIES, CONDITIONS } from '../data/mockData';
import useDebounce from '../hooks/useDebounce';

/**
 * Marketplace page — browse, search, filter, and sort all collectible listings.
 * Supports debounced search, category/condition filters, multi-sort,
 * skeleton loading, error state, and add-to-collection actions.
 */
export default function Marketplace() {
  const { items, isLoading } = useAppContext();

  const [searchInput, setSearchInput] = useState('');
  const [category, setCategory] = useState('All');
  const [condition, setCondition] = useState('All');
  const [sort, setSort] = useState('newest');

  // Debounce the raw search input — avoids re-filtering on every keystroke
  const searchQuery = useDebounce(searchInput, 300);

  const filteredItems = useMemo(() => {
    let result = [...items];

    if (searchQuery) {
      result = result.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.sellerName?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (category !== 'All') {
      result = result.filter((item) => item.category === category);
    }
    if (condition !== 'All') {
      result = result.filter((item) => item.condition === condition);
    }

    switch (sort) {
      case 'price_asc':    result.sort((a, b) => a.price - b.price); break;
      case 'price_desc':   result.sort((a, b) => b.price - a.price); break;
      case 'value_desc':   result.sort((a, b) => (b.estimatedValue || 0) - (a.estimatedValue || 0)); break;
      case 'name_asc':     result.sort((a, b) => a.title.localeCompare(b.title)); break;
      case 'newest':
      default:             result.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded)); break;
    }

    return result;
  }, [items, searchQuery, category, condition, sort]);

  const hasActiveFilters = searchQuery || category !== 'All' || condition !== 'All';

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom fontWeight={700}>
        Marketplace
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        Discover rare collectibles from around the world.
      </Typography>

      <FilterBar
        searchQuery={searchInput}
        setSearchQuery={setSearchInput}
        category={category}
        setCategory={setCategory}
        categories={CATEGORIES}
        condition={condition}
        setCondition={setCondition}
        conditions={CONDITIONS}
        sort={sort}
        setSort={setSort}
      />

      {/* Loading skeleton grid */}
      {isLoading ? (
        <Grid container spacing={3}>
          {Array.from({ length: 8 }).map((_, i) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
              <SkeletonCard />
            </Grid>
          ))}
        </Grid>
      ) : filteredItems.length === 0 ? (
        <EmptyState
          variant={hasActiveFilters ? 'no-results' : 'empty'}
          title={hasActiveFilters ? 'No listings match your search' : 'No listings available'}
          subtitle={hasActiveFilters ? 'Try adjusting your filters or search term.' : 'Check back later for new items.'}
        />
      ) : (
        <>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Showing {filteredItems.length} listing{filteredItems.length !== 1 ? 's' : ''}
          </Typography>
          <Grid container spacing={3}>
            {filteredItems.map((item) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                <ItemCard item={item} mode="marketplace" />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Container>
  );
}
