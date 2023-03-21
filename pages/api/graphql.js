import { gql } from '@apollo/client';
import client from 'utils/apollo-client'

export default async function handler(req, res) {
  const { query, variables } = req.body;
  const { data } = await client.query({query: gql`${query}`, variables});
  res.status(200).json({data});
}