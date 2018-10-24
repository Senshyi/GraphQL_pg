const { GraphQLServer } = require('graphql-yoga')


const resolvers = {
  Query: {
    info: () => `This is SOMETHING`,
    feed: () => links,
    link: (root, args) => links.find(obj => obj.id === args.id)
  },
  Mutation: {
    post: (root, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url
      }
      links.push(link)
      return link
    },
    deleteLink: (root, args) => {
      let deletedLink = links.find(link => link.id === args.id)
      links = links.filter(link => {
        return link.id !== args.id
      })
      return deletedLink
    },
    updateLink: (_, args) => {
      let updatedLink

      links = links.map(link => {
        if (link.id === args.id) {
          updatedLink = {
            id: link.id,
            url: args.url ? args.url : link.url,
            description: args.description ? args.description : link.description,
          }
          return updatedLink
        } else return link
      })
      return updatedLink
    }
  }
}

// 3
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
})
server.start(() => console.log(`Server is running on http://localhost:4000`))