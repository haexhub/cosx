import { NhostClient } from '@nhost/nhost-js'
import { skipHydrate } from '@pinia/nuxt/dist/runtime/composables'

export const useNhost = () => {
  const client = new NhostClient({
    backendUrl: "http://haex.space",
    devTools: true
  })
  client.auth.client.machine.config.predictableActionArguments = true
  return {
    client,
  }
}

/* export const useGraphql = () => {
  const graphql = new NhostGraphqlClient({
    url: "graphql.haex.space"
  })
} */