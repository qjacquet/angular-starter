export class User {
    id: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    token: string;
    personalDetails: {
        nationality: string,
        birthDate: Date,
        birthCountry: string,
        birthCity: string
    };
    contact: {
        firstName: string,
        lastName: string,
        address: {
            number: number,
            name: string,
            zipcode: string,
            city: string
        },
        phone: string,
        email: string
    };

    public constructor(init?: Partial<User>) {
        Object.assign(this, init);
    }
}
