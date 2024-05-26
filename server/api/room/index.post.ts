import { serverSupabaseClient } from '#supabase/server'
import type { Database } from '../../utils/types/supabase'

export default defineEventHandler(async (event) => {

    const client = await serverSupabaseClient<Database>(event)
    const {
      name = '',
      players = []
    } = await readBody(event)
  
    if (!name) {
      throw createError({
        statusCode: 400,
        message: "Room Name Required",
      })
    }
    if (!players?.length || !Array.isArray(players)) {
      throw createError({
        statusCode: 400,
        message: "player must be at least 1",
      })
    }
    const { data } = await client.from('room').insert({name, players});
    
    setResponseStatus(event, 201)
    return { message: "success create room" }
})