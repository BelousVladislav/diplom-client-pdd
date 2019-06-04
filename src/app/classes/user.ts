 class user{
    public id: number;
    private _name: string;
    private _last_name: string;
    private _otchestvo: string;
    private _login: string;
    private _password: string;
    public is_admin: boolean;
    public user_add: number;
    public datachange: Date;
    public get name(){
        return this._name;
    }
    public set name(value: string){
        this._name = value;
    }
    get last_name(){
        return this._last_name;
    }
    set last_name(value: string){
        this._last_name = value;
    }
    get otchestvo(){
        return this._otchestvo;
    }
    set otchestvo(value: string){
        this._otchestvo = value;
    }
    get login(){
        return this._login;
    }
    set login(value: string){
        this._login = value;
    }
    get password(){
        return this._password;
    }
    set password(value: string){
        this._password = value;
    }  
    constructor(name: string, last_name: string, otchestvo: string, login: string, password: string, id?: number, is_admin?: boolean, user_add?: number){
        if (id != undefined){
            this.id = id;
        }
        this._name = name;
        this._last_name = last_name;
        this._otchestvo = otchestvo;
        this._login = login;
        this._password = password;
        if (is_admin != undefined || is_admin != null){
            this.is_admin = is_admin;
        }else this.is_admin = false;
        if (user_add != undefined || user_add != null){
            this.user_add = user_add;
        }else this.user_add = 1;
        
    }
}
export {user};