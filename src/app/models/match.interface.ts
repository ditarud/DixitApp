export interface MatchI {
    id?: string;
    status?: string;
    players?: Array<string>;
    maxScore?: number;
    boardId?: string;
    duration?: number;
    playerMaster?: string;
    deckId?: string;
    date?: string;
    deck: Array<string>;
    cardsInGame: Array<string>;
    discardedCards: Array<string>;

}