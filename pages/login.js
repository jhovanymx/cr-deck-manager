import Link from "next/link";
import Image from "next/image";
import IdentityLayout from "components/layout/IdentityLayout";
import styles from 'styles/Form.module.css';
import { signIn} from 'next-auth/react';
import { HiAtSymbol, HiFingerPrint } from 'react-icons/hi';
import { useFormik } from 'formik';
import { useState } from "react";
import { loginValidate } from 'services/form-service';
import { useRouter } from "next/router";
import { ToastContainer, toast } from 'react-toastify'
import { authOptions } from 'pages/api/auth/[...nextauth]'
import { getServerSession } from "next-auth/next"

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const onSignGitHub = () => {
    signIn("github", {callbackUrl: process.env.NEXTAUTH_URL})
  }

  const onSubmit = async ({email, password}) => {
    const status = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl: "/"
    })

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
      <ToastContainer position="top-center" />
      <section className="mx-auto w-3/4 flex flex-col gap-10 rounded-md">
        <div>
          <h1 className="text-3xl text-bold text-gray-900 py-3">Clash Royale Manager</h1>
          <span className="mx-auto w-3/4 text-xs text-gray-500">Edit easily your favorites decks. Store and manage your decks using labels and colors</span>
        </div>
        <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
          <div className={`${styles.input_group} ${errorClassName("email")}`}>
            <input
              type="email"
              name="email"
              placeholder="Email"
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
              placeholder="Password"
              className={styles.input_text}
              {...formik.getFieldProps("password")}
            />
            <span className="flex items-center px-4" onClick={() => setShowPassword(!showPassword)}>
              <HiFingerPrint size={20} />
            </span>
          </div>
          <div className="input-button">
            <button type="submit" className={styles.button}>Login</button>
          </div>
          <div className="input-button">
            <button type="button" className={styles.button_custom} onClick={onSignGitHub}>
              Sign In with GitHub <Image src="/images/github-mark.svg" width={10} height={10} alt="Github Image" className="w-8 h-8" />
            </button>
          </div>
          <p className="text-center text-gray-400">
            Don't have a account yet? <Link href="/register" className="text-blue-500">Register</Link>
          </p>
        </form>
      </section>
    </IdentityLayout>
  );
};

export async function getServerSideProps({ req, res }) {
  const session = await getServerSession(req, res, authOptions)
  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false
      }
    }
  }

  return {props: {}}
}