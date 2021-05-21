const conf = require('../../config.json');

class Tools {
    static encodeArrayToString(array){
        return String.fromCharCode.apply(null, Uint16Array.from(array));
    }
    
    static decodeStringToArray(bufString){
        var buffer = new Uint16Array(new ArrayBuffer(bufString.length * 2));
        var array = [];
    
        //String to Buffer
        for(var i = 0, strLen = bufString.length; i < strLen; i++){
            buffer[i] = bufString.charCodeAt(i);
        }
        //Buffer to Array
        for(var i = 0, bufLen = buffer.length; i < bufLen; i++){
            array.push(buffer[i]);
        }
    
        return array;
    }

    static getCards_nb(cards){
        if(Number.isInteger(cards)){
            if(cards > conf.DEFAULT_DECK){
                return conf.DEFAULT_DECK;
            }
            else if(cards < 1){
                return 1;
            }
            else{
                return cards;
            }
        }
        return 1;
    }
    
    static getPlayers_nb(players){
        if(Number.isInteger(players)){
            if(players > conf.DEFAULT_MAX_PLAYERS){
                return conf.DEFAULT_MAX_PLAYERS;
            }
            else if(players < 1){
                return 1;
            }
            else{
                return players;
            }
        }
        return 1;
    }
}

module.exports = Tools