export interface IEmpresas{
    codigo: string;
    nombre: string;
    status: string;
    created?: Date;
    updated?: Date;
    observacion?: string;
}



export class Empresas{
    /*private currentEmpresas: IEmpresas = {
        codigo: "",
        nombre: "",
        status: "",
        created: undefined,
        updated: undefined
    }*/
    private empresas : IEmpresas[];
    constructor(){
        this.empresas = [];
    }
    add(nuevaEmpresa : IEmpresas){
        const date = new Date();
        const nueva: IEmpresas = {
            ...nuevaEmpresa,
            codigo: (Math.random()*1000).toString() + new Date().getTime().toString(),
            created: date,
            updated: date 
        }
        this.empresas.push(nueva);
        return true;
    }
    getAll(){
        return this.empresas;
    }
    update(updateEmpresa: IEmpresas){
        const newEmpresas: IEmpresas[] = this.empresas.map((emp)=>{
            if (emp.codigo === updateEmpresa.codigo){
                return {...emp, ...updateEmpresa, updated : new Date()};
            } 
            return emp;       
        });
        this.empresas = newEmpresas;
        return true;
    }
}