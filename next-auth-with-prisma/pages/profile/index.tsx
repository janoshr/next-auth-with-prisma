import React from 'react'
import type { GetServerSideProps, NextPage } from 'next'
import { getSession, session, useSession } from 'next-auth/client'
import Layout from '../../components/Layout';
import { CircularProgress, Container, Typography } from '@mui/material';


interface Props {
  session: any
}

const Dashboard: NextPage<Props> = (props) => {
  const [session, loading] = useSession();

  if (loading) {
    return (
      <CircularProgress />
    )
  }

  return (
    <Layout>
      <Container maxWidth="md">
        <Typography variant="h3">Signed in as {session?.user?.email}</Typography>
      </Container>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });
  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }
  return {
    props: { session }
  }
}


export default Dashboard