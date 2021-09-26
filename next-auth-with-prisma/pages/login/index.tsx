import React, { FormEvent } from 'react'
import type { NextPage } from 'next'
import { Container, Box, Typography, TextField, Button, Paper } from '@mui/material'
import Link from 'next/link'
import Head from 'next/head'

interface Props {

}

const Login: NextPage = (props: Props) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
  }

  return (
    <Container maxWidth="sm">
      <Head>
        <title>Login</title>
      </Head>
      <Paper sx={{ textAlign: 'center', p: 5, mt: 5, borderRadius: 2 }}>
        <Typography variant="h2" component="h1">Login</Typography>
        <form onSubmit={handleSubmit}>
          <Box sx={{ my: 3 }}>
            <TextField fullWidth label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoFocus />
          </Box>
          <Box sx={{ my: 3 }}>
            <TextField fullWidth label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </Box>
          <Box>
            <Button size="large" variant="contained" color="primary">Sign in</Button>
          </Box>
          <Box sx={{ mt: 2 }}>
            <Link href="/register" passHref>
              <Button variant="text" size="small" color="secondary">Not registered?</Button>
            </Link>
          </Box>
        </form>
        <Box sx={{ textAlign: "center", mt: 1 }}>
          <Link href="/" passHref>
            <Button variant="text" color="primary">
              Back to home
            </Button>
          </Link>
        </Box>
      </Paper>
    </Container>
  )
}

export default Login