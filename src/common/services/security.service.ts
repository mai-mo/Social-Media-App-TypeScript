import { generateDecryption, generateEncryption, compareHash, generateHash } from "../utils/security";

export class securityService {

    constructor() {

    }
    genearteHash = generateHash
    compareHash = compareHash

    generateEncryption = generateEncryption
    generateDecryption = generateDecryption


}

