import { generateDecryption, generateEncryption, compareHash, generateHash } from "../utils/security";

export class SecurityService {

    constructor() {

    }
    genearteHash = generateHash
    compareHash = compareHash

    generateEncryption = generateEncryption
    generateDecryption = generateDecryption


}

