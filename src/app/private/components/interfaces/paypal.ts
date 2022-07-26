export interface Item {
    name:string
    quantity: string
    unit_amount:{
        value: string
        currency_code:string
        
    }
}

export interface Amount { 
    currency_code: string
    value: string
    breakdown: {
      item_total: {
        currency_code: string
        value: string
      }
    }
}