import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import React from 'react';

export default function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Powered by '}
            <Link target="_blank" color="inherit" href="https://www.facebook.com/webdevstudios.org">
                Webdev Studio
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}