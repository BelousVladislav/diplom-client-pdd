import { answer } from './answer';
import { image }from '../classes/image';

class question{
    id?: number;
    name: string;
    task_id: number;
    image_id?: number;
    answers: answer[] = [];
    imageObj: image;
    constructor(name:string, task_id: number, id?: number, image_id?: number){
        this.id = id;
        this.name = name;
        this.task_id = task_id;
        this.image_id = image_id;
        this.answers = []
    }
}

// const getQuestions = (id?:number) => {
//     clientInformation.
// }

export { question }