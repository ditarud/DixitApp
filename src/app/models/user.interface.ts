export interface UserI {
    id?: string;
    name?: string;
    email?: string;
    status?: string;
    friends?: Array<string>;
    friendsRequestSend?: Array<string>;
    friendsRequestReceived?: Array<string>;
    pendingPlayInvitations?: Array<string>;


}