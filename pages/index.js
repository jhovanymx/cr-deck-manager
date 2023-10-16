import { getServerSession } from "next-auth/next"
import { setUser } from 'redux/slices/user-slice'
import { setLabels } from 'redux/slices/app-slice'
import { useDispatch } from 'react-redux'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { authOptions } from 'pages/api/auth/[...nextauth]'
import { getLabelsByUsername, getUserByUsername } from 'graphql/queries'
import MainLayout from 'components/layout/MainLayout'
import Dashboard from 'components/Dashboard'
import OverlayLoader from 'components/OverlayLoader'

export default function Home({ user, labels }) {
  const dispatch = useDispatch()
  dispatch(setUser(user))
  dispatch(setLabels(labels))

  return (
    <MainLayout>
      <Dashboard />
      <OverlayLoader />
    </MainLayout>
  );
}

export async function getServerSideProps({ req, res, locale }) {
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
  const userData = await getUserByUsername(session.user.email)

  if (userData.data?.userByUsername) {
    const userInfo = userData.data.userByUsername
    session.user = {
      ...session.user,
      ...userInfo
    }
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "common"
      ])),
      user: session.user,
      labels: labels.data.labelsByUsername.data
    }
  }
}