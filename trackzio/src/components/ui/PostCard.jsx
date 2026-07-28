import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
  Box,
  Collapse,
  TextField,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Dialog,
  DialogContent,
  DialogTitle,
  Chip,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutlined';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import { useState } from 'react';
import { useAppContext } from '../../context/AppProvider';
import { FALLBACK_IMAGE } from '../../data/mockData';

/**
 * Community Feed post card. Supports like, save, expandable comments,
 * add comment, detail modal, and image fallback.
 */
export default function PostCard({ post }) {
  const { toggleLikePost, toggleSavePost, addComment } = useAppContext();
  const [expanded, setExpanded] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [detailOpen, setDetailOpen] = useState(false);
  const [imgSrc, setImgSrc] = useState(post.image || FALLBACK_IMAGE);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      addComment(post.id, commentText);
      setCommentText('');
    }
  };

  const commentsCount = post.commentsList?.length ?? 0;

  return (
    <>
      <Card sx={{ mb: 3, borderRadius: 2, overflow: 'hidden' }}>
        {/* ── Header ── */}
        <CardHeader
          avatar={
            <Avatar
              src={post.user.avatar}
              aria-label={post.user.name}
              sx={{ cursor: 'pointer' }}
            />
          }
          title={
            <Typography variant="subtitle1" fontWeight={600}>
              {post.user.name}
            </Typography>
          }
          subheader={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="caption" color="text.secondary">
                {new Date(post.datePosted).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
              </Typography>
              {post.category && (
                <Chip label={post.category} size="small" variant="outlined" color="primary" sx={{ height: 18, fontSize: 10 }} />
              )}
            </Box>
          }
          action={
            <IconButton aria-label="open post detail" onClick={() => setDetailOpen(true)}>
              <OpenInFullIcon fontSize="small" />
            </IconButton>
          }
        />

        {/* ── Image ── */}
        <CardMedia
          component="img"
          image={imgSrc}
          alt={post.caption}
          onError={() => setImgSrc(FALLBACK_IMAGE)}
          loading="lazy"
          sx={{ maxHeight: 480, objectFit: 'cover', cursor: 'pointer' }}
          onClick={() => setDetailOpen(true)}
        />

        {/* ── Action bar ── */}
        <CardActions disableSpacing sx={{ px: 2, pt: 1, pb: 0 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mr: 1 }}>
            <IconButton aria-label="like post" onClick={() => toggleLikePost(post.id)}>
              {post.isLiked ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
            </IconButton>
            <Typography variant="body2" fontWeight={500}>{post.likes}</Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton aria-label="toggle comments" onClick={() => setExpanded(!expanded)}>
              <ChatBubbleOutlineIcon />
            </IconButton>
            <Typography variant="body2" fontWeight={500}>{commentsCount}</Typography>
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          <IconButton aria-label="save post" onClick={() => toggleSavePost(post.id)}>
            {post.isSaved ? <BookmarkIcon color="primary" /> : <BookmarkBorderIcon />}
          </IconButton>
        </CardActions>

        {/* ── Caption ── */}
        <CardContent sx={{ pt: 1 }}>
          <Typography variant="body2" color="text.secondary">
            <Box component="span" sx={{ fontWeight: 700, color: 'text.primary', mr: 0.5 }}>
              {post.user.name}
            </Box>
            {post.caption}
          </Typography>
          {commentsCount > 0 && !expanded && (
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ mt: 0.5, display: 'block', cursor: 'pointer', '&:hover': { color: 'text.primary' } }}
              onClick={() => setExpanded(true)}
            >
              View all {commentsCount} comment{commentsCount !== 1 ? 's' : ''}
            </Typography>
          )}
        </CardContent>

        {/* ── Comments panel ── */}
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent sx={{ pt: 0, borderTop: '1px solid', borderColor: 'divider' }}>
            <List dense disablePadding>
              {post.commentsList && post.commentsList.map((c) => (
                <ListItem key={c.id} alignItems="flex-start" sx={{ px: 0, py: 0.5 }}>
                  <ListItemAvatar sx={{ minWidth: 36 }}>
                    <Avatar sx={{ width: 28, height: 28, fontSize: 12 }}>
                      {c.author.charAt(0).toUpperCase()}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography variant="subtitle2" component="span" fontWeight={600} sx={{ fontSize: 13 }}>
                        {c.author}
                      </Typography>
                    }
                    secondary={
                      <Typography variant="body2" color="text.secondary" component="span" sx={{ display: 'block', fontSize: 13 }}>
                        {c.text}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
              {(!post.commentsList || post.commentsList.length === 0) && (
                <Typography variant="body2" color="text.secondary" sx={{ py: 1 }}>
                  No comments yet. Be the first!
                </Typography>
              )}
            </List>

            <Box component="form" onSubmit={handleCommentSubmit} sx={{ display: 'flex', mt: 1.5, gap: 1 }}>
              <TextField
                fullWidth
                size="small"
                variant="outlined"
                placeholder="Add a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
              />
              <Button type="submit" variant="contained" size="small" disabled={!commentText.trim()}>
                Post
              </Button>
            </Box>
          </CardContent>
        </Collapse>
      </Card>

      {/* ── Post Detail Modal ── */}
      <Dialog open={detailOpen} onClose={() => setDetailOpen(false)} maxWidth="sm" fullWidth scroll="paper">
        <DialogTitle sx={{ pb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Avatar src={post.user.avatar} sx={{ width: 40, height: 40 }} />
            <Box>
              <Typography variant="subtitle1" fontWeight={700}>{post.user.name}</Typography>
              <Typography variant="caption" color="text.secondary">
                {new Date(post.datePosted).toLocaleDateString()}
              </Typography>
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent dividers sx={{ p: 0 }}>
          <Box
            component="img"
            src={imgSrc}
            alt="Post detail"
            onError={() => setImgSrc(FALLBACK_IMAGE)}
            loading="lazy"
            sx={{ width: '100%', maxHeight: 400, objectFit: 'cover' }}
          />
          <Box sx={{ p: 2 }}>
            {post.category && (
              <Chip label={post.category} color="primary" variant="outlined" size="small" sx={{ mb: 1.5 }} />
            )}
            <Typography variant="body1" sx={{ mb: 2 }}>{post.caption}</Typography>
            <Divider sx={{ mb: 2 }} />

            {/* Like & save in modal */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <IconButton size="small" onClick={() => toggleLikePost(post.id)}>
                  {post.isLiked ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
                </IconButton>
                <Typography variant="body2">{post.likes} likes</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <ChatBubbleOutlineIcon fontSize="small" color="action" />
                <Typography variant="body2">{commentsCount} comments</Typography>
              </Box>
              <Box sx={{ flexGrow: 1 }} />
              <IconButton size="small" onClick={() => toggleSavePost(post.id)}>
                {post.isSaved ? <BookmarkIcon color="primary" /> : <BookmarkBorderIcon />}
              </IconButton>
            </Box>

            {/* Comments in modal */}
            <Divider sx={{ mb: 1.5 }} />
            <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1 }}>
              Comments ({commentsCount})
            </Typography>
            <List dense disablePadding>
              {post.commentsList?.map((c) => (
                <ListItem key={c.id} alignItems="flex-start" sx={{ px: 0, py: 0.5 }}>
                  <ListItemAvatar sx={{ minWidth: 36 }}>
                    <Avatar sx={{ width: 28, height: 28, fontSize: 12 }}>
                      {c.author.charAt(0).toUpperCase()}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={<Typography variant="subtitle2" fontWeight={600} sx={{ fontSize: 13 }}>{c.author}</Typography>}
                    secondary={<Typography variant="body2" color="text.secondary" sx={{ fontSize: 13 }}>{c.text}</Typography>}
                  />
                </ListItem>
              ))}
              {commentsCount === 0 && (
                <Typography variant="body2" color="text.secondary" sx={{ py: 1 }}>
                  No comments yet.
                </Typography>
              )}
            </List>
            <Box component="form" onSubmit={(e) => { handleCommentSubmit(e); }} sx={{ display: 'flex', mt: 1.5, gap: 1 }}>
              <TextField
                fullWidth
                size="small"
                placeholder="Add a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
              />
              <Button type="submit" variant="contained" size="small" disabled={!commentText.trim()}>Post</Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
