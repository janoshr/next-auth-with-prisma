import React, { ReactNode } from 'react'
import { Container, AppBar, Button, Toolbar, Typography, Box } from '@mui/material'
import Link from 'next/link'

interface Props {
  children: ReactNode
}

const Layout = (props: Props) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar color="default">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>Next-Auth with Prisma</Typography>
          <Box sx={{ mr: 1 }}>
            <Link href="/login" passHref>
              <Button color="primary" variant="outlined">
                Login
              </Button>
            </Link>
          </Box>
          <Box sx={{ mr: 1 }}>
            <Link href="/register" passHref>
              <Button color="primary" variant="contained">
                Register
              </Button>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
      <Box sx={{ flexGrow: 1, mt: 8 }}>
        <main>
          {props.children}
        </main>
      </Box>
      <Box sx={{width: '100%', bgcolor: '#f0f0f0'}}>
        <Container maxWidth="lg">
          <Typography sx={{ p:2, fontWeight: 'bold', textAlign: 'center'}}>
            Created by János Hajdu Ráfis
          </Typography>
        </Container>
      </Box>
    </Box>
  )
}

export default Layout
