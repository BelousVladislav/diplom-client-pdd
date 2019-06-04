class answer{
    id?: number;
    name: string;
    question_id: number;
    f_right: boolean;

    constructor(name:string, question_id: number, f_right:boolean, id?:number){
        this.id = id;
        this.name = name;
        this.question_id = question_id;
        this.f_right = f_right;
    }
}

export { answer }