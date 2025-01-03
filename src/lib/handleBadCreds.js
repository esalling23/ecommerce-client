
const handleBadCreds = (err, history, clearUser) => {
  if (err.response.status === 401) {
    clearUser()
    history.push('/sign-in')
  }
}

module.exports = handleBadCreds
