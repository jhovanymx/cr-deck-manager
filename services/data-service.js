export function extractFromQuery(queryResult, callback) {
  const { loading, error, data} = queryResult
  if (data) {
    callback(data)
  }
}