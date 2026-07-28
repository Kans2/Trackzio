import { useState, useMemo } from 'react';
import {
  Container,
  Typography,
  Box,
  Tabs,
  Tab,
  Grid,
  Paper,
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { useAppContext } from '../context/AppProvider';
import ItemCard from '../components/ui/ItemCard';
import FilterBar from '../components/ui/FilterBar';
import EmptyState from '../components/ui/EmptyState';
import { CATEGORIES, CONDITIONS } from '../data/mockData';
import useDebounce from '../hooks/useDebounce';

/**
 * My Collection page — manage Owned, Wishlist, and Selling collections.
 * Features: tabbed navigation, search, category + condition filter, sort,
 * estimated portfolio value, remove and move-between-collections actions.
 */
export default function MyCollection() {
  const { collections } = useAppContext();

  const [activeTab, setActiveTab] = useState(0);
  const [searchInput, setSearchInput] = useState('');
  const [category, setCategory] = useState('All');
  const [condition, setCondition] = useState('All');
  const [sort, setSort] = useState('newest');

  const searchQuery = useDebounce(searchInput, 300);

  const collectionNames = Object.keys(collections);
  const currentCollectionName = collectionNames[activeTab] || 'Owned';
  const currentItems = collections[currentCollectionName] || [];

  const handleTabChange = (_, newValue) => {
    setActiveTab(newValue);
    // Reset filters when switching tabs
    setSearchInput('');
    setCategory('All');
    setCondition('All');
    setSort('newest');
  };

  const filteredItems = useMemo(() => {
    let result = [...currentItems];

    if (searchQuery) {
      result = result.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category?.toLowerCase().includes(searchQuery.toLowerCase())
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
  }, [currentItems, searchQuery, category, condition, sort]);

  // Portfolio stats for the Owned tab
  const totalValue = currentItems.reduce((acc, item) => acc + (item.price || 0), 0);
  const totalEstimated = currentItems.reduce((acc, item) => acc + (item.estimatedValue || item.price || 0), 0);
  const hasActiveFilters = searchQuery || category !== 'All' || condition !== 'All';

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* ── Header ── */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: { sm: 'flex-start' },
          mb: 3,
          gap: 2,
        }}
      >
        <Box>
          <Typography variant="h4" component="h1" gutterBottom fontWeight={700}>
            My Collection
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage your personal items and wishlist.
          </Typography>
        </Box>

        {/* Portfolio value card — only on Owned tab */}
        {currentCollectionName === 'Owned' && currentItems.length > 0 && (
          <Paper
            elevation={0}
            sx={{
              p: 2.5,
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
              borderRadius: 3,
              minWidth: 200,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
              <TrendingUpIcon fontSize="small" />
              <Typography variant="caption" sx={{ opacity: 0.9 }}>Portfolio Value</Typography>
            </Box>
            <Typography variant="h5" fontWeight={700}>${totalEstimated.toLocaleString()}</Typography>
            <Typography variant="caption" sx={{ opacity: 0.75 }}>
              Purchase cost: ${totalValue.toLocaleString()}
            </Typography>
          </Paper>
        )}
      </Box>

      {/* ── Tabs ── */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={activeTab} onChange={handleTabChange} aria-label="collection tabs">
          {collectionNames.map((name, index) => (
            <Tab
              key={name}
              label={`${name} (${collections[name].length})`}
              id={`collection-tab-${index}`}
              aria-controls={`collection-tabpanel-${index}`}
            />
          ))}
        </Tabs>
      </Box>

      {/* ── Filter bar — full set for collection ── */}
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

      {/* ── Items grid ── */}
      {filteredItems.length === 0 ? (
        <EmptyState
          variant={hasActiveFilters ? 'no-results' : 'empty'}
          title={
            hasActiveFilters
              ? 'No items match your filters'
              : `Your ${currentCollectionName} list is empty`
          }
          subtitle={
            hasActiveFilters
              ? 'Try adjusting your search or filters.'
              : 'Browse the Marketplace to discover items and add them here.'
          }
        />
      ) : (
        <>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {filteredItems.length} item{filteredItems.length !== 1 ? 's' : ''}
          </Typography>
          <Grid container spacing={3}>
            {filteredItems.map((item) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                key={item.id}
                role="region"
                aria-label={item.title}
              >
                <ItemCard item={item} mode="collection" collectionName={currentCollectionName} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Container>
  );
}
