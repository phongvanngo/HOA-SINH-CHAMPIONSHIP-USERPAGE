import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import React from 'react';
import CopyrightSection from "./../../../common/component/CopyrightSection/CopyrightSection";
import { useStyles } from "./LoginView.style";

export default function LoginView(props) {
    const { handleLogin } = props;

    const classes = useStyles();

    const refUsernameInput = React.useRef(null);
    const refPasswordInput = React.useRef(null);

    const onButtonLoginClick = () => {
        let username = refUsernameInput.current.value;
        let password = refPasswordInput.current.value;
        handleLogin({ username, password });
    }

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        HOA SINH CHAMPIONSHIP 2021
          </Typography>
                    <Typography component="h2" variant="h6">
                        Trang quản trị
          </Typography>
                    <form className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Tên đăng nhập"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            inputRef={refUsernameInput}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Mật khẩu"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            inputRef={refPasswordInput}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Nhớ mật khẩu"
                        />
                        <Button
                            onClick={onButtonLoginClick}
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Đăng nhập
            </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Quên mật khẩu
                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    {"Chưa có tài khoản ? Đăng ký"}
                                </Link>
                            </Grid>
                        </Grid>
                        <Box mt={5}>
                            <CopyrightSection />
                        </Box>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
}