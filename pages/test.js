import { useQuery, gql } from '@apollo/client';

const ALL_CARDS = gql`
{
  allCards{
    data{
      code
      elixirCost
      rarity
      type
      isWinCondition
    }
  }
}
`;

const Test = () => {
  const { loading, error, data } = useQuery(ALL_CARDS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  const cards = data.allCards.data;

  return (
    cards.map((c) => <div>{c.code}</div>)
  )
} 

export default Test