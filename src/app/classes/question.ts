class question{
    id?: number;
    name: string;
    task_id: number;
    image_id?: number;

    constructor(name:string, task_id: number, id?: number, image_id?: number){
        this.id = id;
        this.name = name;
        this.task_id = task_id;
        this.image_id = image_id;
    }
}

// const getQuestions = (id?:number) => {
//     clientInformation.
// }

export { question }