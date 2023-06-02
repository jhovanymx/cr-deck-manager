const I18nextBrowserLanguageDetector = require("i18next-browser-languagedetector").default

module.exports = {
  i18n: {
    defaultLocale: "en",
    locales: ["en", "es"],
    localeDetection: true
  },
  localePath:
    typeof window === "undefined"
      ? require("path").resolve("./public/lang")
      : "/lang"
}