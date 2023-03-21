import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react';
import { getServerSession } from "next-auth/next"
import { setUser } from 'redux/slices/user-slice';
import { setLabels } from 'redux/slices/deck-slice'
import { useDispatch } from 'react-redux';
import { authOptions } from 'pages/api/auth/[...nextauth]'
import MainLayout from './layout/main-layout';
import { getLabelsByUsername } from 'lib/queries'

export default function Home({ user, labels }) {
  console.log(labels)
  useDispatch(setUser(user))
  useDispatch(setLabels(labels))
  
  return (
    <MainLayout>
      
    </MainLayout>
  );
}

export async function getServerSideProps({ req, res}) {
  const session = await getServerSession(req, res, authOptions)
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false
      }
    }
  }
  
  const labels = await getLabelsByUsername(session.user.email)

  return {
    props: {
      user: session.user,
      labels: labels?.data?.userByUsername?.decks?.data
    }
  }
}