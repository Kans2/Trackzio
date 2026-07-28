import { Container, Typography, Box, Avatar, Paper, Grid, Divider } from '@mui/material';
import { useAppContext } from '../context/AppProvider';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PostCard from '../components/ui/PostCard';

export default function Profile() {
  const { currentUser, posts } = useAppContext();

  // Find posts by the current user to display in their profile
  const userPosts = posts.filter(post => post.user.name === currentUser.name);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={2} sx={{ p: { xs: 3, md: 5 }, borderRadius: 3, mb: 4 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item>
            <Avatar
              src={currentUser.avatar}
              sx={{ width: 120, height: 120, border: '4px solid', borderColor: 'primary.main' }}
            />
          </Grid>
          <Grid item xs>
            <Typography variant="h4" fontWeight="700" gutterBottom>
              {currentUser.name}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              {currentUser.username}
            </Typography>
            <Typography variant="body1" sx={{ mt: 2, mb: 2 }}>
              {currentUser.bio}
            </Typography>
            <Box sx={{ display: 'flex', gap: 3, alignItems: 'center', color: 'text.secondary' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <CalendarTodayIcon fontSize="small" />
                <Typography variant="body2">Joined {currentUser.joinDate}</Typography>
              </Box>
              <Typography variant="body2">
                <Box component="span" fontWeight="700" color="text.primary">{currentUser.following}</Box> Following
              </Typography>
              <Typography variant="body2">
                <Box component="span" fontWeight="700" color="text.primary">{currentUser.followers}</Box> Followers
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <Typography variant="h5" fontWeight="700" sx={{ mb: 3 }}>
        Recent Activity
      </Typography>
      <Divider sx={{ mb: 3 }} />

      {userPosts.length > 0 ? (
        <Box sx={{ maxWidth: 600, mx: 'auto' }}>
          {userPosts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </Box>
      ) : (
        <Typography variant="body1" color="text.secondary" align="center" sx={{ py: 5 }}>
          You haven't posted anything yet.
        </Typography>
      )}
    </Container>
  );
}
