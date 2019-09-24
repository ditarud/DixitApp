export interface UserI {
    id?: string;
    name?: string;
    email?: string;
    friends?: Array<string>;
    friendsRequestSend?: Array<string>;
    friendsRequestReceived?: Array<string>;


}