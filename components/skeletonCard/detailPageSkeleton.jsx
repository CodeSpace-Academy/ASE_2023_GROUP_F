import { Skeleton } from '@mui/material';
import React from 'react';

/**
 * RecipeSkeleton Component
 *
 * A React component for displaying a skeleton or loading state for a recipe.
 * It includes placeholders for an image and various text elements.
 * */

function RecipeSkeleton() {
  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ width: '80%', height: '300px', marginTop: '20px', position: 'relative' }}>
        <Skeleton variant="rectangular" width="100%" height="100%" style={{ borderRadius: '8px' }} />
      </div>
      <div style={{ width: '80%', marginTop: '20px', textAlign: 'left' }}>
        <Skeleton variant="text" width="50%" height="20px" style={{ marginBottom: '10px', borderRadius: '4px' }} />
        <Skeleton variant="text" width="80%" height="20px" style={{ marginBottom: '10px', borderRadius: '4px' }} />
        <Skeleton variant="text" width="60%" height="20px" style={{ marginBottom: '10px', borderRadius: '4px' }} />
        <Skeleton variant="text" width="70%" height="20px" style={{ marginBottom: '10px', borderRadius: '4px' }} />
        <Skeleton variant="text" width="90%" height="20px" style={{ marginBottom: '10px', borderRadius: '4px' }} />
      </div>
    </div>
  );
}

export default RecipeSkeleton;
