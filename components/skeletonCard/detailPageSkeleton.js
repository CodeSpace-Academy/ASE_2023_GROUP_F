import { Skeleton } from "@mui/material";
import React from 'react';

const DetailPageSkeleton = () => {
    return (
        <div style={{ width: '100%', height: '100%', display: 'flex', flexWrap: 'wrap' }}>
            <Skeleton variant="rectangular" width='100%' height='50%' style={{ marginTop: '10px', color: 'red' }} />
        </div>
    );
}

export default DetailPageSkeleton;
