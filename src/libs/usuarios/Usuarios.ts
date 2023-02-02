export interface IUsuarios {
    codigo: string;
    correo: string;
    nombre: string;
    password: string;
    roles?: string;
    created?: Date;
    ultimoAcceso?: Date;
    observacion?: string;
}


export class Usuarios {

private usuarios : IUsuarios[];
    constructor(){
    this.usuarios = [];
    }
    getAll(){
    return this.usuarios;
    }
    getById(codigo: string){
    const usuarioToReturn = this.usuarios.find((usr)=>{
        return usr.codigo === codigo;
    });
    return usuarioToReturn;
    }
    add(nuevoUsuario : IUsuarios) {
    const date = new Date();
    const nueva: IUsuarios = {
        ...nuevoUsuario,
        codigo: (Math.random()* 1000).toString()+new Date().getTime().toString(),
        roles: "Usuario Basico",
        created: date,
        ultimoAcceso: date
    }
    this.usuarios.push(nueva);
    return true;
    }

    update(updateUsuario: IUsuarios){
    const newUsuarios: IUsuarios[] = this.usuarios.map((usr)=>{
        if ( usr.codigo === updateUsuario.codigo ) {
        return {...usr, ...updateUsuario, updated: new Date()};
        }
        return usr;
    });
    this.usuarios = newUsuarios;
    return true;
    }
    delete(codigo: string){
    const usuarioToDelete = this.usuarios.find((usr)=>{
        return usr.codigo === codigo;
    });
    if(usuarioToDelete){
        const newUsuarios: IUsuarios[] = this.usuarios.filter((usr)=>{
        return usr.codigo !== codigo;
        });
        this.usuarios = newUsuarios;
        return true;
    }
    return false;
    }
}