import * as bcrypt from 'bcrypt';

export class HashProvider {
    private static saltRounds = 10;

    public static async hash(password: string): Promise<string> {
        return await bcrypt.hash(password, this.saltRounds);
    }

    public static async compare(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash);
    }
}
