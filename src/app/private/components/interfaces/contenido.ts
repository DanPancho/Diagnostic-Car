export interface Contenido {
    header:string
    content:string
    img:string
}

export interface Producto {
    img:string
    descripcion:string
    precio:number
    marca:string
    nombre:string
    tipo:string
}

export interface Tipo { 
    img:string
    descripcion:string
    marca:string
    nombre:string
    precio:number
}

export interface Carrito {
    userid:string | undefined
    productos:{
        productoId:string,
        producto:Tipo
    }
    total:number
    estado:boolean
}