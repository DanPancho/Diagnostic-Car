export interface contenido {
    header:string
    content:string
    img:string
}

export interface producto {
    img:string
    descripcion:string
    precio:number
    marca:string
    nombre:string
    tipo:string
}

export interface tipo { 
    img:string
    descripcion:string
    marca:string
    nombre:string
    precio:number
}

export interface carrito {
    userid:string | undefined
    productos:{
        productoId:string,
        producto:tipo
    }
    total:number
    estado:boolean
}