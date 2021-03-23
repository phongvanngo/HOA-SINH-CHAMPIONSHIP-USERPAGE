import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import React from 'react';
import './Footer.scss';

export default function Copyright() {
    return (
        <div className="user-footer">
            <div style={{ height: '20px' }}></div>
            <Typography variant="body2" color="textSecondary" align="center">
                {'Powered by '}
                <Link target="_blank" color="inherit" href="https://www.facebook.com/webdevstudios.org">
                    Webdev Studio
      </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        </div>
    );
}