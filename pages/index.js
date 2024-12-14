import { getServerSession } from "next-auth/next"
import { setUser } from 'redux/slices/user-slice'
import { setLabels } from 'redux/slices/app-slice'
import { useDispatch } from 'react-redux'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { authOptions } from 'pages/api/auth/[...nextauth]'
import { getUserByUsername, getLabelsByUserId } from 'repositories/fauna-repository'
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

  const result = {
    ...(await serverSideTranslations(locale, [
      "common"
    ]))
  }
  
  const userInfo = await getUserByUsername(session.user.email)
  if (userInfo) {
    result.labels = await getLabelsByUserId(userInfo.id)
    result.user = {
      ...session.user,
      ...userInfo
    }
  }

  return {
    props: result
  }
}