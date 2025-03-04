// orval.config.ts
import type { GeneratorVerbOptions } from '@orval/core';
import { defineConfig } from 'orval';

export default defineConfig({
  petstore: {
    output: {
      mode: 'tags-split', // split
      target: './src/api/petstore.ts',
      schemas: './src/api/models',
      client: 'fetch',
      override: {
        // here! 🙋‍♂️
        transformer: (verb: GeneratorVerbOptions): GeneratorVerbOptions => {
          if (verb.response?.definition.errors === 'void') {
            verb.response.definition.errors = 'null';
          }

          return verb;
        },

        mutator: {
          path: './src/api/http-client.ts',
          name: 'customFetch',
        },
      },
    },
    input: {
      target: './petstore.yaml',

      filters: {
        tags: [/store/],
      },
    },
  },
});
