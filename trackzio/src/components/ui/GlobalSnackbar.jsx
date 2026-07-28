import { Snackbar, Alert } from '@mui/material';
import { useAppContext } from '../../context/AppProvider';

/**
 * Global toast notification component. Reads from AppContext snackbar state.
 * Severity: 'success' | 'error' | 'warning' | 'info'
 */
export default function GlobalSnackbar() {
  const { snackbar, closeSnackbar } = useAppContext();

  return (
    <Snackbar
      open={snackbar.open}
      autoHideDuration={3000}
      onClose={closeSnackbar}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert
        onClose={closeSnackbar}
        severity={snackbar.severity}
        variant="filled"
        sx={{ width: '100%', borderRadius: 2 }}
      >
        {snackbar.message}
      </Alert>
    </Snackbar>
  );
}
