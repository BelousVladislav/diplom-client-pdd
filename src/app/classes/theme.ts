import { task } from './task'
class theme{
    id?: number;
    name: string;
    min_balls?: number;
    datachange?: Date;
    user_add?: string;
    tasks: task[];
    constructor(name: string, min_balls?: number, id?: number, datachange?:Date,  user_add?: string){
        this.id = id;
        this.name = name;
        this.min_balls = min_balls;
        this.datachange = datachange;
        this.user_add = user_add;
        this.tasks = []
    }
}

export { theme }