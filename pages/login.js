import { useState } from "react"
import { useDispatch } from 'react-redux'
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/router"
import { getServerSession } from "next-auth/next"
import IdentityLayout from "components/layout/IdentityLayout"
import OverlayLoader from 'components/OverlayLoader'
import styles from 'styles/Form.module.css'
import { signIn} from 'next-auth/react'
import { HiAtSymbol, HiFingerPrint } from 'react-icons/hi'
import { useFormik } from 'formik'
import { loginValidate } from 'services/form-service'
import { ToastContainer, toast } from 'react-toastify'
import { authOptions } from 'pages/api/auth/[...nextauth]'
import { showLoader, hideLoader } from 'redux/slices/app-slice'
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

export default function Login() {
  const { t } = useTranslation()
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  const dispatch = useDispatch()

  const onSignGitHub = () => {
    signIn("github", {callbackUrl: process.env.NEXTAUTH_URL})
  }

  const onSubmit = async ({email, password}) => {
    dispatch(showLoader())
    const status = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl: "/"
    })
    dispatch(hideLoader())

    if (status.ok) {
      router.push(status.url)
    } else {
      const error = status.error || "Unknown error"
      toast.error(error)
    }
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    onSubmit,
    validate: loginValidate
  })

  const errorClassName = (field) => {
    return formik.errors[field] && formik.touched[field] && "border-rose-600"
  }

  return (
    <IdentityLayout>
      <OverlayLoader />
      <ToastContainer position="top-center" />
      <section className="mx-auto w-3/4 flex flex-col gap-10 rounded-md">
        <div>
          <h1 className="text-3xl text-bold text-gray-900 py-3">CR Manager</h1>
          <span className="mx-auto w-3/4 text-xs text-gray-500">{t("login.description")}</span>
        </div>
        <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
          <div className={`${styles.input_group} ${errorClassName("email")}`}>
            <input
              type="email"
              name="email"
              placeholder={t("login.email")}
              className={styles.input_text}
              {...formik.getFieldProps("email")}
            />
            <span className="flex items-center px-4">
              <HiAtSymbol size={20} />
            </span>
          </div>
          <div className={`${styles.input_group} ${errorClassName("password")}`}>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder={t("login.password")}
              className={styles.input_text}
              {...formik.getFieldProps("password")}
            />
            <span className="flex items-center px-4" onClick={() => setShowPassword(!showPassword)}>
              <HiFingerPrint size={20} />
            </span>
          </div>
          <div className="input-button">
            <button type="submit" className={styles.button}>{t("login.login")}</button>
          </div>
          <div className="input-button">
            <button type="button" className={styles.button_custom} onClick={onSignGitHub}>
            {t("login.signGithub")} <Image src="/images/github-mark.svg" width={10} height={10} alt="Github Image" className="w-8 h-8" />
            </button>
          </div>
          <p className="text-center text-gray-400">
            {t("login.dontHaveAccount")} <Link href="/register" className="text-blue-500">{t("login.register")}</Link>
          </p>
        </form>
      </section>
    </IdentityLayout>
  )
}

export async function getServerSideProps({ req, res, locale }) {
  const session = await getServerSession(req, res, authOptions)
  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false
      }
    }
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "common"
      ]))
    }
  }
}