import { LinearProgress } from '@mui/material';
import { styled } from '@mui/system';
import React from 'react';

const ProgressBar = () => {
    return <StyledProgressBar />;
};

const StyledProgressBar = styled(LinearProgress)(() => ({
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
}));

export default ProgressBar;
