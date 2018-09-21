const getOneSong = (_, { id }) => {
    return Song.findById(id).exec()
}

export const songResolvers = {
    Query: {
        Song: getOneSong
    }
}