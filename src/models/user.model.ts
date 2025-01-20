export class User {
    public constructor(
        public username: string,

        public id: number
    ) { }

    public toJSON() {
        return {
            username: this.username,

            id: this.id
        }
    }

    public static fromJSON(data: any): User {
        return new User(data.username, data.id);
    }
}