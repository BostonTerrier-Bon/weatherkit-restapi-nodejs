import fs from "fs";
import { publicEnv } from "./env";

const jwt = require('jsonwebtoken')

const AUTH_KEY_PATH = './cert/AuthKey.p8'
const JWT_PATH = './jwt/token'

export class JWT {

    getToken(): string {
        // check Cached Token Exp
        if( this.isExistingValidToken() ){
            console.log('Use Local Cached Token');            
            return this.readToken()
        }
        // Expired
        console.log('Use New Token');        
        this.refreshToken()
        return this.readToken()
    }

    private isExistingValidToken(): boolean{
        if( fs.existsSync(JWT_PATH) === false ) return false
        try {
            const decoded = jwt.verify(
                this.readToken(),
                this.readPrivateKey(),
                {
                    algorithms: ['ES256'],                
                })
            if( decoded ) return true
            console.log('Local Token is invalid');            
            return false
        } catch (error) {
            console.log('Local Token is invalid');
            return false
        }
    }

    private readToken(): string {
        return fs.readFileSync(JWT_PATH).toString();
    }

    private readPrivateKey(): string {
        return fs.readFileSync(AUTH_KEY_PATH).toString();
    }


    private refreshToken(){
        const token = this.generateToken()
        this.saveToken(token)
    }

    private generateToken(): string {
        const token = jwt.sign(
            {
                "iss": `${publicEnv.teamId}`, // Team ID
                "iat": Math.floor(Date.now() / 1000),
                "exp": Math.floor(Date.now() / 1000) + (60 * 60), // 1h
                "sub": `${publicEnv.appId}`, // AppID
            },
            this.readPrivateKey(),
            {
                algorithm: 'ES256',
                keyid: `${publicEnv.privateKeyId}`,
                header: {
                    "id": `${publicEnv.teamId}.${publicEnv.appId}`, // TeamID + AppID
                }
            }
        )
        return token
    }

    private saveToken(token: string){
        fs.writeFileSync(JWT_PATH, token)
    }

}

