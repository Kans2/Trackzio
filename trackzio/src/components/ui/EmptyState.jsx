import { Box, Typography } from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';
import SearchOffIcon from '@mui/icons-material/SearchOff';

/**
 * Reusable empty state component.
 * @param {'empty'|'no-results'} variant - 'empty' for no data, 'no-results' for failed search
 * @param {string} title - Main heading
 * @param {string} subtitle - Subtext guidance
 */
export default function EmptyState({ variant = 'empty', title, subtitle }) {
  const Icon = variant === 'no-results' ? SearchOffIcon : InboxIcon;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: 12,
        gap: 2,
        color: 'text.secondary',
      }}
    >
      <Icon sx={{ fontSize: 64, opacity: 0.4 }} />
      <Typography variant="h6" align="center" fontWeight={600}>
        {title || (variant === 'no-results' ? 'No results found' : 'Nothing here yet')}
      </Typography>
      {subtitle && (
        <Typography variant="body2" align="center" sx={{ maxWidth: 360 }}>
          {subtitle}
        </Typography>
      )}
    </Box>
  );
}
