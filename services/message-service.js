export function showErrorMesssages(toast, t, errors) {
  let i = 0
  const errorMessage = <div>
    <ul>
      <span>{t("errors.check")}</span>
      {
        errors.map(error => (
          <li key={i++} className="list-disc ml-4">
            { t(error.key, error.params) }
          </li>
        ))
      }
    </ul>
  </div>
  toast.error(errorMessage)
}