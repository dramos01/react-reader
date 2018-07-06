

export default class TextParser {

    constructor(text){
        if(!text){
            throw new Error('text is required');
        }
        this.text = text
    }

    /**
     * @returns array of separated words and characters
     */
    parse() {
        console.log("STRING ", this.text)
        return this.text.split(" ");
    }

    pad(char){
        this.text = this.text.replace(`/${char}/g`, ` ${char} `);
        return this
    }

    flatten(){
        this.text = this.text.replace(/\n/g, " ");
        return this
    }

}