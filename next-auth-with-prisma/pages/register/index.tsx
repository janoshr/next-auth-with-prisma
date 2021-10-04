import React, { FormEvent } from "react";
import type { NextPage } from "next";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
} from "@mui/material";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { getSession, signIn } from "next-auth/client";

const Register: NextPage = () => {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [confirmPw, setConfirmPw] = React.useState<string>("");
  const [username, setUsername] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | boolean>(false);
  const [success, setSucess] = React.useState<boolean>(false);
  const router = useRouter();

  React.useEffect(() => {
    if (success) {
      signIn("credentials", {
        redirect: false,
        email: email,
        password: password,
      }).then((res) => {
        console.log(res);
        if (res?.error) {
          console.log("Autologin failed please try manually");
          console.log("Redirecting...");
          router.push("/login");
        } else {
          router.push("/profile");
        }
      });
    }
  }, [success]);

  React.useEffect(() => {
    getSession().then((session) => {
      if (session) {
        router.replace("/profile");
      } else {
        setLoading(false);
      }
    });
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    if (!email) {
      setError("Invalid email address");
    } else if (!password || password !== confirmPw) {
      setError("Passwords missmatch or empty");
    }
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        username: username,
      }),
    });
    if (res.ok) {
      setSucess(true);
    } else {
      const data = await res.json();
      console.log(data);
      setError(data.message);
      setLoading(false);
    }
  }

  return (
    <Container maxWidth="sm">
      <Head>
        <title>Sign Up</title>
      </Head>
      <Paper sx={{ textAlign: "center", p: 5, mt: 5, borderRadius: 2 }}>
        <Typography variant="h2" component="h1">
          Sign Up
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box sx={{ my: 3 }}>
            <TextField
              fullWidth
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoFocus
              disabled={loading}
              helperText={error}
              error={typeof error === 'string' || error}
            />
          </Box>
          <Box sx={{ my: 3 }}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              error={typeof error === 'string' || error}
            />
          </Box>
          <Box sx={{ my: 3 }}>
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
          </Box>
          <Box sx={{ my: 3 }}>
            <TextField
              fullWidth
              label="Confirm Password"
              type="password"
              value={confirmPw}
              onChange={(e) => setConfirmPw(e.target.value)}
              disabled={loading}
            />
          </Box>
          <Box>
            <Button
              size="large"
              variant="contained"
              color="primary"
              type="submit"
              disabled={loading || confirmPw !== password}
            >
              Register
            </Button>
          </Box>
        </form>
        <Box sx={{ mt: 2 }}>
          <Link href="/login" passHref>
            <Button variant="text" size="small" color="secondary">
              Already have an account?
            </Button>
          </Link>
        </Box>
      </Paper>
      <Box sx={{ textAlign: "center", mt: 1 }}>
        <Link href="/" passHref>
          <Button variant="text" color="primary">
            Back to home
          </Button>
        </Link>
      </Box>
    </Container>
  );
};

export default Register;
