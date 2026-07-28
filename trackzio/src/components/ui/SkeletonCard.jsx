import { Card, Skeleton, Box } from '@mui/material';

/**
 * Skeleton loader card used during initial data loading state.
 * Matches the visual footprint of ItemCard for a seamless transition.
 */
export default function SkeletonCard() {
  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Skeleton variant="rectangular" height={200} animation="wave" />
      <Box sx={{ p: 2 }}>
        <Skeleton variant="text" height={32} width="80%" animation="wave" />
        <Skeleton variant="text" height={20} width="50%" animation="wave" />
        <Box sx={{ display: 'flex', gap: 1, my: 1 }}>
          <Skeleton variant="rounded" height={24} width={70} animation="wave" />
          <Skeleton variant="rounded" height={24} width={60} animation="wave" />
        </Box>
        <Skeleton variant="text" height={16} animation="wave" />
        <Skeleton variant="text" height={16} width="70%" animation="wave" />
        <Skeleton variant="text" height={28} width="40%" sx={{ mt: 1 }} animation="wave" />
      </Box>
      <Box sx={{ px: 2, pb: 2, display: 'flex', justifyContent: 'space-between' }}>
        <Skeleton variant="rounded" height={36} width={90} animation="wave" />
        <Skeleton variant="rounded" height={36} width={70} animation="wave" />
      </Box>
    </Card>
  );
}
