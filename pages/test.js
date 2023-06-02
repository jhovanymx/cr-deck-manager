import { useQuery, gql } from '@apollo/client';
import appConfig from 'config/app.json'

const Test = () => {
  const shortcuts = appConfig.cards.map(card => {
    const shortcut = card.shortcuts[0]
    return shortcut !== card.code ? shortcut : card.code
  })

  return (
    shortcuts.map((shortcut) => <div>{shortcut}</div>)
  )
} 

export default Test