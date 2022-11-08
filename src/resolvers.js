const resolvers = {
  Mutation: {
    // increments a track's numberOfViews property
    incrementTrackViews: async (_, { id }, { dataSources }) => {
      try {
        const track = await dataSources.tracksApi.incrementTrackViews(id);
        return {
          code: 200,
          success: true,
          message: `Successfully incremented number of views for track ${id}`,
          track,
        };
      } catch (err) {
        return {
          code: err.extensions?.response.status || 500,
          success: false,
          message: err.extensions?.response.body || JSON.stringify(err),
          track: null,
        };
      }
    },
  },
  Query: {
    tracksForHome: (_, __, { dataSources }) => {
      return dataSources.tracksApi.getTracksForHome();
    },
    track: (_, { id }, { dataSources }) => {
      return dataSources.tracksApi.getTrack(id);
    },
    module: (_, { id }, { dataSources }) => {
      return dataSources.tracksApi.getModule(id);
    },
  },
  Track: {
    author: (parent, __, { dataSources }) => {
      return dataSources.tracksApi.getAuthor(parent.authorId);
    },
    modules: ({ id }, __, { dataSources }) => {
      return dataSources.tracksApi.getTrackModules(id);
    },
    durationInSeconds: ({ length }) => length,
  },
  Module: {
    durationInSeconds: ({ length }) => length,
  },
  // Different approach, seems to be a bad practice
  // Module: {
  //   track: (parent, _, { dataSources }) => {
  //     return dataSources.tracksApi.getTrack(parent.trackId);
  //   },
  // },
};

module.exports = resolvers;
