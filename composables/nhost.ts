import { NhostClient, NhostGraphqlClient } from '@nhost/nhost-js'
import { skipHydrate } from '@pinia/nuxt/dist/runtime/composables'

export const useNhost = () => {
  const nhost = new NhostClient({
    backendUrl: "http://haex.space",
  })
  return nhost
}

export const useGraphql = () => {
  const graphql = new NhostGraphqlClient({
    url: "graphql.haex.space"
  })
}