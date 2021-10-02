import React from "react";
import type { GetServerSideProps, NextPage } from "next";
import { getSession, useSession } from "next-auth/client";
import Layout from "../../components/Layout";
import { CircularProgress, Container, Typography } from "@mui/material";
import type { Session } from "next-auth";
import { Box } from "@mui/system";
import { blue } from '@mui/material/colors';

interface Props {
  session: Session;
}

const Dashboard: NextPage<Props> = (props) => {
  const [session, loading] = useSession();

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Layout>
      <Container maxWidth="md">
        <Box sx={{ mt: 5 }}>
          <Typography variant="h4">
            Signed in as{' '}
            <Box component="span" sx={{color: blue[600]}}>
              {props.session.user?.email}
            </Box>
          </Typography>
        </Box>
      </Container>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
};

export default Dashboard;
