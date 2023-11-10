import appConfig from 'config/app.json'

const Test = () => {
  const shortcuts = appConfig.cards.map(card => {
    const shortcut = card.shortcut
    return shortcut !== card.code ? shortcut : card.code
  })

  return (
    shortcuts.map((shortcut) => <div>{shortcut}</div>)
  )
} 

export default Test