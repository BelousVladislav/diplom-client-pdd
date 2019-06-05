import { question } from './question';
import { image }from '../classes/image';
class task{
    id?: number;
    name: string;
    text: string;
    theme_id: number;
    datachange: Date;
    image_id?: number;
    questions:question[];
    imageObj: image;
    
    constructor(name: string, text: string, theme_id: number, id?: number,  datachange?: Date, image_id?: number){
        this.id = id;
        this.name = name;
        this.text = text;
        this.theme_id = theme_id;
        this.datachange = datachange;
        this.image_id = image_id;
        this.questions = [];
    }
}
export { task }