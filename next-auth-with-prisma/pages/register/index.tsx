import React, { FormEvent } from 'react'
import type { NextPage } from 'next'
import { Container, Box, Typography, TextField, Button, Paper } from '@mui/material'
import Link from 'next/link'
import Head from 'next/head'

interface Props {

}

const Register: NextPage = (props: Props) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPw, setConfirmPw] = React.useState("");
  const [username, setUsername] = React.useState("");

  function handleSubmit(e:FormEvent) {
    e.preventDefault()
  }

  return (
    <Container maxWidth="sm">
      <Head>
        <title>Sign Up</title>
      </Head>
      <Paper sx={{ textAlign: 'center', p: 5, mt: 5, borderRadius: 2 }}>
        <Typography variant="h2" component="h1">Sign Up</Typography>
        <form onSubmit={handleSubmit}>
          <Box sx={{ my: 3 }}>
            <TextField fullWidth label="Username" value={username} onChange={(e) => setUsername(e.target.value)} autoFocus />
          </Box>
          <Box sx={{ my: 3 }}>
            <TextField fullWidth label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </Box>
          <Box sx={{ my: 3 }}>
            <TextField fullWidth label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </Box>
          <Box sx={{ my: 3 }}>
            <TextField fullWidth label="Confirm Password" type="password" value={confirmPw} onChange={(e) => setConfirmPw(e.target.value)} />
          </Box>
          <Box>
            <Button size="large" variant="contained" color="primary">Register</Button>
          </Box>
        </form>
        <Box sx={{ mt: 2 }}>
          <Link href="/login" passHref>
            <Button variant="text" size="small" color="secondary">Already have an account?</Button>
          </Link>
        </Box>
      </Paper>
      <Box sx={{textAlign: "center", mt: 1}}>
        <Link href="/" passHref>
          <Button variant="text" color="primary">
            Back to home
          </Button>
        </Link>
      </Box>
    </Container>
  )
}

export default Register