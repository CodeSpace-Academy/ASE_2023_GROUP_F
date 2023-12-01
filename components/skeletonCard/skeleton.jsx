import React from 'react';
import { Skeleton } from '@mui/material';
import classes from "./CardSkeleton.module.css"


/**
 * CardSkeleton Component
 * 
 * A React component that displays a skeleton loading state for a card layout.
 * 
 * @component
 * @returns {JSX.Element} The rendered CardSkeleton component.
 */

function CardSkeleton() {


  return (
    <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap' }}>
      {Array.from({ length: 20 }, (_, index) => (
        <div key={index} style={{ padding: '20px' }} className={classes.cardSkeletonItem}>
          <Skeleton variant="rectangular" width="100%" height={300} style={{ borderRadius: '5px' }} />
          <Skeleton variant="rectangular" width='100%' height={40} style={{ marginTop: '10px' }} />
          <Skeleton variant="rectangular" width='100%' height={40} style={{ marginTop: '10px' }} />
        </div>
      ))}
    </div>
  );
}

export default CardSkeleton;
