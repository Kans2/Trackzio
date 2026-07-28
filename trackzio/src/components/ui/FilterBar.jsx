import { Box, TextField, MenuItem, Select, FormControl, InputLabel, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

/**
 * Reusable filter/sort bar used in Marketplace and My Collection.
 * All props are optional — the bar renders only the controls that have props.
 *
 * @param {string}   searchQuery     - Controlled search value
 * @param {function} setSearchQuery  - Setter for search value
 * @param {string}   category        - Selected category
 * @param {function} setCategory     - Category setter
 * @param {string[]} categories      - Array of available categories
 * @param {string}   condition       - Selected condition
 * @param {function} setCondition    - Condition setter
 * @param {string[]} conditions      - Array of available conditions
 * @param {string}   sort            - Selected sort value
 * @param {function} setSort         - Sort setter
 */
export default function FilterBar({
  searchQuery,
  setSearchQuery,
  category,
  setCategory,
  categories,
  sort,
  setSort,
  condition,
  setCondition,
  conditions,
}) {
  return (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 4, mt: 2 }}>
      {/* Search */}
      <TextField
        label="Search"
        variant="outlined"
        size="small"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ flexGrow: 1, minWidth: '200px' }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon fontSize="small" />
            </InputAdornment>
          ),
        }}
      />

      {/* Category filter */}
      {categories && setCategory && (
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Category</InputLabel>
          <Select value={category} label="Category" onChange={(e) => setCategory(e.target.value)}>
            <MenuItem value="All">All Categories</MenuItem>
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>{cat}</MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      {/* Condition filter */}
      {conditions && setCondition && (
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Condition</InputLabel>
          <Select value={condition} label="Condition" onChange={(e) => setCondition(e.target.value)}>
            <MenuItem value="All">All Conditions</MenuItem>
            {conditions.map((cond) => (
              <MenuItem key={cond} value={cond}>{cond}</MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      {/* Sort */}
      {setSort && (
        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel>Sort By</InputLabel>
          <Select value={sort} label="Sort By" onChange={(e) => setSort(e.target.value)}>
            <MenuItem value="newest">Newest</MenuItem>
            <MenuItem value="price_asc">Price: Low to High</MenuItem>
            <MenuItem value="price_desc">Price: High to Low</MenuItem>
            <MenuItem value="value_desc">Estimated Value: High</MenuItem>
            <MenuItem value="name_asc">Name: A–Z</MenuItem>
          </Select>
        </FormControl>
      )}
    </Box>
  );
}
