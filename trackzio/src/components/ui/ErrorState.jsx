import { Box, Typography, Button } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutlined';

/**
 * Generic error state component.
 * @param {string} message - Error description to show the user
 * @param {function} onRetry - Optional callback to retry the failed action
 */
export default function ErrorState({ message = 'Something went wrong.', onRetry }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: 12,
        gap: 2,
      }}
    >
      <ErrorOutlineIcon sx={{ fontSize: 56, color: 'error.main', opacity: 0.7 }} />
      <Typography variant="h6" color="text.secondary" align="center">
        {message}
      </Typography>
      {onRetry && (
        <Button variant="outlined" color="error" onClick={onRetry}>
          Try Again
        </Button>
      )}
    </Box>
  );
}
