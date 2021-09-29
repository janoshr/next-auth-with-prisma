import React, { FormEvent } from 'react'
import type { NextPage } from 'next'
import { Container, Box, Typography, TextField, Button, Paper } from '@mui/material'
import Link from 'next/link'
import Head from 'next/head'
import { signIn } from 'next-auth/client'
import { useRouter } from 'next/router'

interface Props {

}

const Login: NextPage = (props: Props) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [success, setSuccess] = React.useState(false);
  const router = useRouter();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const status = await signIn('credentials', {
      redirect: false,
      email: email,
      password: password,
    })
    console.log(status)
    setSuccess(true)
  }

  React.useEffect(() => {
    if (success) {
      router.push('/profile')
    }
  }, [success])

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
            <Button size="large" variant="contained" color="primary" type="submit">Sign in</Button>
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