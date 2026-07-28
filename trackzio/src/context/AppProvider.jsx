import { createContext, useContext, useState, useMemo, useCallback, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { mockCollections, mockPosts, mockItems, currentUser, CATEGORIES, CONDITIONS } from '../data/mockData';

// ─── Context ──────────────────────────────────────────────────────────────────
const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

// ─── Helpers ──────────────────────────────────────────────────────────────────
const loadFromStorage = (key, fallback) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch {
    return fallback;
  }
};

// ─── Provider ─────────────────────────────────────────────────────────────────
export const AppProvider = ({ children }) => {
  // Theme — persisted
  const [mode, setMode] = useState(() => loadFromStorage('theme', 'light'));

  // Data — collections persisted, items & posts from mock
  const [collections, setCollections] = useState(() => loadFromStorage('collections', mockCollections));
  const [posts, setPosts] = useState(mockPosts);
  const [items] = useState(mockItems);

  // Loading simulation
  const [isLoading, setIsLoading] = useState(true);

  // Snackbar state
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Simulate initial data fetch
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Persist to localStorage
  useEffect(() => { localStorage.setItem('theme', JSON.stringify(mode)); }, [mode]);
  useEffect(() => { localStorage.setItem('collections', JSON.stringify(collections)); }, [collections]);

  // ─── Theme ────────────────────────────────────────────────────────────────
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: { main: '#6366f1' },
          secondary: { main: '#ec4899' },
          background: {
            default: mode === 'light' ? '#f8fafc' : '#0f172a',
            paper: mode === 'light' ? '#ffffff' : '#1e293b',
          },
        },
        typography: {
          fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        },
        shape: { borderRadius: 12 },
        components: {
          MuiButton: {
            styleOverrides: {
              root: { textTransform: 'none', fontWeight: 600 },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                backgroundImage: 'none',
                boxShadow:
                  mode === 'light'
                    ? '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
                    : '0 4px 6px -1px rgb(0 0 0 / 0.5), 0 2px 4px -2px rgb(0 0 0 / 0.5)',
              },
            },
          },
        },
      }),
    [mode]
  );

  const toggleTheme = () => setMode((prev) => (prev === 'light' ? 'dark' : 'light'));

  // ─── Snackbar helpers ─────────────────────────────────────────────────────
  const showSnackbar = useCallback((message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  }, []);

  const closeSnackbar = useCallback(() => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  }, []);

  // ─── Collection actions ───────────────────────────────────────────────────
  const addToCollection = useCallback((collectionName, item) => {
    setCollections((prev) => {
      const target = prev[collectionName] || [];
      if (target.some((i) => i.id === item.id)) {
        showSnackbar(`"${item.title}" is already in ${collectionName}`, 'warning');
        return prev;
      }
      showSnackbar(`Added "${item.title}" to ${collectionName}`, 'success');
      return {
        ...prev,
        [collectionName]: [
          ...target,
          { ...item, dateAdded: new Date().toISOString().split('T')[0] },
        ],
      };
    });
  }, [showSnackbar]);

  const removeFromCollection = useCallback((collectionName, itemId) => {
    setCollections((prev) => {
      const item = (prev[collectionName] || []).find((i) => i.id === itemId);
      showSnackbar(`Removed "${item?.title || 'Item'}" from ${collectionName}`, 'info');
      return {
        ...prev,
        [collectionName]: (prev[collectionName] || []).filter((i) => i.id !== itemId),
      };
    });
  }, [showSnackbar]);

  const moveItem = useCallback((fromCollection, toCollection, itemId) => {
    setCollections((prev) => {
      const itemToMove = prev[fromCollection].find((i) => i.id === itemId);
      if (!itemToMove) return prev;

      const newFrom = prev[fromCollection].filter((i) => i.id !== itemId);
      const targetCol = prev[toCollection] || [];

      if (targetCol.some((i) => i.id === itemId)) {
        showSnackbar(`"${itemToMove.title}" already exists in ${toCollection}`, 'warning');
        return { ...prev, [fromCollection]: newFrom };
      }

      showSnackbar(`Moved "${itemToMove.title}" to ${toCollection}`, 'success');
      return {
        ...prev,
        [fromCollection]: newFrom,
        [toCollection]: [...targetCol, itemToMove],
      };
    });
  }, [showSnackbar]);

  // ─── Post actions ─────────────────────────────────────────────────────────
  const toggleLikePost = useCallback((postId) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            isLiked: !post.isLiked,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          };
        }
        return post;
      })
    );
  }, []);

  const toggleSavePost = useCallback((postId) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          const wasSaved = post.isSaved;
          showSnackbar(wasSaved ? 'Post unsaved' : 'Post saved!', 'info');
          return { ...post, isSaved: !wasSaved };
        }
        return post;
      })
    );
  }, [showSnackbar]);

  const addComment = useCallback((postId, text) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          const newComment = {
            id: crypto.randomUUID(),
            author: currentUser.name,
            text,
            timestamp: new Date().toISOString(),
          };
          return { ...post, commentsList: [...(post.commentsList || []), newComment] };
        }
        return post;
      })
    );
    showSnackbar('Comment posted!', 'success');
  }, [showSnackbar]);

  // ─── Value ────────────────────────────────────────────────────────────────
  const value = {
    mode,
    toggleTheme,
    collections,
    addToCollection,
    removeFromCollection,
    moveItem,
    posts,
    toggleLikePost,
    toggleSavePost,
    addComment,
    items,
    currentUser,
    isLoading,
    snackbar,
    closeSnackbar,
    showSnackbar,
  };

  return (
    <AppContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppContext.Provider>
  );
};
