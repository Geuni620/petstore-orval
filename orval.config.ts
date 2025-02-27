export default {
  petstore: {
    output: {
      mode: 'tags-split', // split
      target: './src/api/petstore.ts',
      schemas: './src/api/models',
      client: 'fetch',
    },
    input: {
      target: './petstore.yaml',

      filters: {
        tags: [/store/],
      },
    },
  },
};
