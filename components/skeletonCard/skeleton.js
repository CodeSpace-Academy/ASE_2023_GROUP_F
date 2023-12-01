import React from 'react';
import { Skeleton } from '@mui/material';
import { useMediaQuery } from 'react-responsive';
/**
 * RecipeSkeleton Component
 * A component that represents a skeleton loader for a recipe card.
 * 
 * @returns {JSX.Element} RecipeSkeleton component
 */


const CardSkeleton = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return (
    <div style={{ width: '100%', height: '500px', display: 'flex', flexWrap: 'wrap' }}>
      {Array.from({ length: 20 }, (_, index) => (
        <div key={index} style={{ width: isMobile ? '100%' : '25%', padding: '20px' }}>
          <Skeleton variant="rectangular" width="100%" height={300} style={{ borderRadius:'5px'}} />
          <Skeleton variant="rectangular" width='100%' height={40} style={{ marginTop: '10px' }} />
          <Skeleton variant="rectangular" width='100%' height={40} style={{ marginTop: '10px' }} />
        </div>
      ))}
    </div>
  );
};

export default CardSkeleton;
