import * as dotenv from 'dotenv';

dotenv.config({ path: './env/.env' })

interface PublicEnv {
    teamId: string
    appId: string
    privateKeyId: string    
}
  
export const publicEnv: PublicEnv = {
    teamId: process.env.TEAM_ID! as string,
    appId: process.env.APP_ID! as string,
    privateKeyId: process.env.PRIVATE_KEY_ID! as string,
}
