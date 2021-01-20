import axios, {AxiosResponse} from 'axios';
import { IUserData } from '../types';

export default class Worker {

    /**
     * Constructor.
     */
    private static username: string;
    constructor(in_username: string) {
        console.log("Users.Worker.constructor", in_username);
        Worker.username = in_username;
    } /* End constructor(). */   

    /**
     * getUserFromTorre: Get user info from Torre API
     *
     * @return Object with user info from JSON response.
     */
    private async getUserFromTorre(): Promise<AxiosResponse> {
        const user_data: AxiosResponse = await axios.get(`https://bio.torre.co/api/bios/${Worker.username}`);
        return user_data.data
    } /* End of getUserFromTorre() */

    /**
     * getUserData: Unpacks the interesting user data from Torre response.
     *
     * @return An objects containing user data.
     */
    public async getUserData(): Promise<IUserData|undefined> {
        console.log('User.Worker.getUserData()');
        const torre_user_data: any = await this.getUserFromTorre(); 
        let user_data: IUserData | undefined;

        // Check if person was found
        if (torre_user_data.person !== undefined) {
            user_data = {
                name: torre_user_data.person.name,
                picture: torre_user_data.person.picture,
                professionalHeadline: torre_user_data.person.professionalHeadline,
                summaryOfBio: torre_user_data.person.summaryOfBio,
                strengths: torre_user_data.strengths.map( (strenght: any) => {return strenght.name} ),
                username: Worker.username
            };
        } else {
            user_data = undefined;
        }

        return user_data;
        
    } /* End of getUserData() */


} /* End of class */