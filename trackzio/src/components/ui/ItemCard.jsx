import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Box,
  Menu,
  MenuItem,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { useState } from 'react';
import { useAppContext } from '../../context/AppProvider';
import { FALLBACK_IMAGE } from '../../data/mockData';

/**
 * Versatile card used in both Marketplace (mode='marketplace') and
 * My Collection (mode='collection'). Handles: seller info, image fallback,
 * detail modal, add/move/remove via contextual menu.
 */
export default function ItemCard({ item, mode = 'marketplace', collectionName = '' }) {
  const { addToCollection, removeFromCollection, moveItem } = useAppContext();
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [imgSrc, setImgSrc] = useState(item.image || FALLBACK_IMAGE);

  const handleMenuOpen = (e) => { e.stopPropagation(); setMenuAnchorEl(e.currentTarget); };
  const handleMenuClose = () => setMenuAnchorEl(null);
  const handleDetailOpen = () => setDetailOpen(true);
  const handleDetailClose = () => setDetailOpen(false);

  const handleAction = (action, targetCol = '') => {
    handleMenuClose();
    if (action === 'add') addToCollection(targetCol, item);
    else if (action === 'remove') removeFromCollection(collectionName, item.id);
    else if (action === 'move') moveItem(collectionName, targetCol, item.id);
  };

  const formattedDate = item.dateAdded
    ? new Date(item.dateAdded).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
    : '—';

  return (
    <>
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          cursor: 'pointer',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          '&:hover': { transform: 'translateY(-4px)', boxShadow: 8 },
        }}
        onClick={handleDetailOpen}
      >
        {/* ── Image ── */}
        <CardMedia
          component="img"
          height="200"
          image={imgSrc}
          alt={item.title}
          onError={() => setImgSrc(FALLBACK_IMAGE)}
          sx={{ objectFit: 'cover' }}
          loading="lazy"
        />

        {/* ── Content ── */}
        <CardContent sx={{ flexGrow: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, lineHeight: 1.2, flex: 1 }}>
              {item.title}
            </Typography>
            {mode === 'collection' && (
              <IconButton
                size="small"
                onClick={handleMenuOpen}
                aria-label="collection actions"
                sx={{ ml: 0.5, mt: -0.5 }}
              >
                <MoreVertIcon />
              </IconButton>
            )}
          </Box>

          {/* Category + Condition chips */}
          <Box sx={{ display: 'flex', gap: 1, mb: 1.5, flexWrap: 'wrap' }}>
            <Chip label={item.category} size="small" color="primary" variant="outlined" />
            <Chip label={item.condition} size="small" color="secondary" variant="outlined" />
          </Box>

          {/* Description preview */}
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
          >
            {item.description || 'No description provided.'}
          </Typography>

          {/* Price */}
          <Typography variant="h6" color="primary.main" sx={{ fontWeight: 700 }}>
            ${item.price.toLocaleString()}
          </Typography>

          {/* Marketplace-specific: seller + location */}
          {mode === 'marketplace' && (
            <Box sx={{ mt: 1, display: 'flex', flexDirection: 'column', gap: 0.4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
                <PersonIcon fontSize="small" sx={{ mr: 0.5, fontSize: 14 }} />
                <Typography variant="caption">{item.sellerName || 'Unknown Seller'}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
                <LocationOnIcon fontSize="small" sx={{ mr: 0.5, fontSize: 14 }} />
                <Typography variant="caption">{item.location || 'Unknown Location'}</Typography>
              </Box>
            </Box>
          )}

          {/* Collection-specific: date added + estimated value */}
          {mode === 'collection' && (
            <Box sx={{ mt: 1, display: 'flex', flexDirection: 'column', gap: 0.4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
                <CalendarTodayIcon fontSize="small" sx={{ mr: 0.5, fontSize: 14 }} />
                <Typography variant="caption">Added {formattedDate}</Typography>
              </Box>
              {item.estimatedValue && (
                <Box sx={{ display: 'flex', alignItems: 'center', color: 'success.main' }}>
                  <TrendingUpIcon fontSize="small" sx={{ mr: 0.5, fontSize: 14 }} />
                  <Typography variant="caption" sx={{ fontWeight: 600 }}>
                    Est. ${item.estimatedValue.toLocaleString()}
                  </Typography>
                </Box>
              )}
            </Box>
          )}
        </CardContent>

        {/* ── Actions (marketplace only) ── */}
        {mode === 'marketplace' && (
          <CardActions sx={{ p: 2, pt: 0, justifyContent: 'space-between' }} onClick={(e) => e.stopPropagation()}>
            <Button size="small" variant="contained" onClick={handleMenuOpen}>
              Add to...
            </Button>
            <Button size="small" color="inherit" onClick={handleDetailOpen}>
              Details
            </Button>
          </CardActions>
        )}
      </Card>

      {/* ── Context Menu ── */}
      <Menu anchorEl={menuAnchorEl} open={Boolean(menuAnchorEl)} onClose={handleMenuClose}>
        {mode === 'marketplace'
          ? [
              <MenuItem key="owned" onClick={() => handleAction('add', 'Owned')}>Add to Owned</MenuItem>,
              <MenuItem key="wish" onClick={() => handleAction('add', 'Wishlist')}>Add to Wishlist</MenuItem>,
              <MenuItem key="sell" onClick={() => handleAction('add', 'Selling')}>Add to Selling</MenuItem>,
            ]
          : [
              collectionName !== 'Owned' && <MenuItem key="mv-owned" onClick={() => handleAction('move', 'Owned')}>Move to Owned</MenuItem>,
              collectionName !== 'Wishlist' && <MenuItem key="mv-wish" onClick={() => handleAction('move', 'Wishlist')}>Move to Wishlist</MenuItem>,
              collectionName !== 'Selling' && <MenuItem key="mv-sell" onClick={() => handleAction('move', 'Selling')}>Move to Selling</MenuItem>,
              <Divider key="divider" />,
              <MenuItem key="remove" onClick={() => handleAction('remove')} sx={{ color: 'error.main' }}>
                Remove from Collection
              </MenuItem>,
            ].filter(Boolean)}
      </Menu>

      {/* ── Detail Modal ── */}
      <Dialog open={detailOpen} onClose={handleDetailClose} maxWidth="sm" fullWidth scroll="paper">
        <DialogTitle sx={{ fontWeight: 700 }}>{item.title}</DialogTitle>
        <DialogContent dividers>
          <Box
            component="img"
            src={imgSrc}
            alt={item.title}
            onError={() => setImgSrc(FALLBACK_IMAGE)}
            loading="lazy"
            sx={{ width: '100%', borderRadius: 2, mb: 2, maxHeight: 320, objectFit: 'cover' }}
          />

          {/* Chips */}
          <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
            <Chip label={item.category} color="primary" variant="outlined" />
            <Chip label={item.condition} color="secondary" variant="outlined" />
          </Box>

          <Typography variant="body1" sx={{ mb: 2 }}>
            {item.description || 'No description available.'}
          </Typography>

          <Divider sx={{ my: 2 }} />

          {/* Details grid */}
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
            <Box>
              <Typography variant="caption" color="text.secondary">Price</Typography>
              <Typography variant="h6" fontWeight={700} color="primary.main">
                ${item.price.toLocaleString()}
              </Typography>
            </Box>
            {item.estimatedValue && (
              <Box>
                <Typography variant="caption" color="text.secondary">Estimated Value</Typography>
                <Typography variant="h6" fontWeight={700} color="success.main">
                  ${item.estimatedValue.toLocaleString()}
                </Typography>
              </Box>
            )}
            {item.sellerName && (
              <Box>
                <Typography variant="caption" color="text.secondary">Seller</Typography>
                <Typography variant="body1" fontWeight={500}>{item.sellerName}</Typography>
              </Box>
            )}
            {item.location && (
              <Box>
                <Typography variant="caption" color="text.secondary">Location</Typography>
                <Typography variant="body1">{item.location}</Typography>
              </Box>
            )}
            {item.dateAdded && (
              <Box>
                <Typography variant="caption" color="text.secondary">Date Added</Typography>
                <Typography variant="body1">{formattedDate}</Typography>
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          {mode === 'marketplace' && (
            <>
              <Button variant="contained" onClick={() => { addToCollection('Wishlist', item); handleDetailClose(); }}>
                Add to Wishlist
              </Button>
              <Button variant="outlined" onClick={() => { addToCollection('Owned', item); handleDetailClose(); }}>
                Add to Owned
              </Button>
            </>
          )}
          <Button onClick={handleDetailClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
