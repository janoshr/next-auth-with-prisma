import type { NextPage } from 'next'
import Head from 'next/head'
import { Container, Typography } from '@mui/material'
import Layout from '../components/Layout'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Container maxWidth="md">
          <Typography variant="h2" component="h1" sx={{ textAlign: 'center', mt: 5 }}>Wellcome!</Typography>
        </Container>
      </Layout>
    </div>
  )
}

export default Home
