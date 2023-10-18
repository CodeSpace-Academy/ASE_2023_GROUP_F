import React from 'react';
import { Skeleton } from '@mui/material';

const CardSkeleton = () => {
  return (
    <div style={{ width: '100%', height: '500px', display: 'flex', flexWrap: 'wrap' }}>
      {Array.from({ length: 20 }, (_, index) => (
        <div key={index} style={{ width: '25%', padding: '20px' }}>
          <Skeleton variant="rectangular" width="100%" height={200} />
          <Skeleton variant="circular" width={40} height={40} style={{ marginTop: '10px' }} />
        </div>
      ))}
    </div>
  );
};

export default CardSkeleton;
