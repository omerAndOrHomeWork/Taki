var enumCard = (function(){
    return {
        enumColor: Object.freeze({RED: 0, BLUE: 1, GREEN: 2, YELLOW: 3}),
        enumTypes: Object.freeze({
            STOP: 0, CHANGE_COLOR: 1, PLUS: 2, NUMBER: 3, TAKI: 4,
            SUPER_TAKI: 5, TWO_PLUS: 6
        }),
        enumPlayer: Object.freeze({PLAYER: 0, COMPUTER: 1}), //help for extendable

        dives: Object.freeze({
            PLAYER_CARDS: "playerCards", COMPUTER_CARDS: "computerCards",
            STOCK: "stockCards", OPEN_CARDS: "openCards", STOCK_AND_OPEN_CARDS: "stockAndOpenCards", STATISTICS: "statistics",
            CLOCK:"gameClock", PICK_COLOR: "pickColor", BLUE_PICK: "bluePicker", GREEN_PICK: "greenPicker",
            RED_PICK: "redPicker", YELLOW_PICK: "yellowPicker", END_GAME_MODE: "endGameMode",
            MASSAGE: "massage", RESTART_GAME: "restartGame", END_GAME: "endGame", QUIT_GAME: "Quit_Game"
        }),

        cssStyle: Object.freeze({
            OPEN_CARD: "openCard", CLOSE_CARD: "closeCard"
        }),

        images: Object.freeze({
            CLOSE_CARD: "../Images/other/close_card.png",
            MANY_CLOSE_CARDS: "../Images/other/many_close_cards.png",
            FEW_CLOSE_CARDS: "../Images/other/few_close_cards.png"
        }),

        enumResult: Object.freeze({EXTRA_TURN: 0,NEXT_TURN: 1, JUMP_TURN: 2,
            CONTINUE_TURN: 3})
    }
})();
