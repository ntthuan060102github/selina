const SELINA_API_SERVICE_INFOS = {
    auth: {
        staging: {
            domain: "https://selina-auth-staging.herokuapp.com/selina-auth-api"
        },
        production: {
            domain: "https://selina-auth.herokuapp.com/selina-auth-api"
        }
    },
    profile: {
        staging: {
            domain: "https://selina-profile-staging.herokuapp.com/selina-profile-api"
        },
        production: {
            domain: "https://selina-profile.herokuapp.com/selina-profile-api"
        }
    },
    bookshelves: {
        staging: {
            domain: "https://selina-bookshelves-staging.herokuapp.com/selina-bookshelves-api"
        },
        production: {
            domain: "https://selina-bookshelves.herokuapp.com/selina-bookshelves-api"
        }
    }
}

module.exports = SELINA_API_SERVICE_INFOS