import Link from "next/link";
import Image from "next/image";
import IdentityLayout from "components/layout/IdentityLayout";
import styles from 'styles/Form.module.css';
import { HiAtSymbol, HiFingerPrint } from 'react-icons/hi';
import { useState } from "react";
import { useFormik } from 'formik';
import { useRouter } from "next/router";
import { registerValidate } from 'lib/validate-form';
import { ToastContainer, toast } from 'react-toastify'

export default function Register() {
  const [showPassword, setShowPassword] = useState(false)
  const [showCpassword, setShowCpassword] = useState(false)
  const router = useRouter()

  const onSubmit = async (values) => {
    const url = `/api/auth/signup`
    const options = {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(values)
    }

    const result = await fetch(url, options)
    if (result.ok) {
      router.push("/")
    } else {
      const { message } = await result.json()
      toast.error(message)
    }
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      cpassword: ""
    },
    onSubmit,
    validate: registerValidate
  })

  const errorClassName = (field) => {
    return formik.errors[field] && formik.touched[field] && "border-rose-600"
  }

  return (
    <IdentityLayout>
      <ToastContainer position="top-center"/>
      <section className="mx-auto w-3/4 flex flex-col gap-10">
        <div>
          <h1 className="text-3xl text-bold text-gray-900 py-3">Register</h1>
          <span className="mx-auto w-3/4 text-xs text-gray-500">Clash Royale Manager</span>
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
          <div className={`${styles.input_group} ${errorClassName("cpassword")}`}>
            <input
              type={showCpassword ? "text" : "password"}
              name="cpassword"
              placeholder="Confirm Password"
              className={styles.input_text}
              {...formik.getFieldProps("cpassword")}
            />
            <span className="flex items-center px-4" onClick={() => setShowCpassword(!showCpassword)}>
              <HiFingerPrint size={20} />
            </span>
          </div>
          <div className="input-button">
            <button type="submit" className={styles.button}>Register</button>
          </div>
        </form>
      </section>
    </IdentityLayout>
  );
};