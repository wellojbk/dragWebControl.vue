export interface dragElements {
    type: string,
    text: string,
    style: dragElementsStyle
}

export interface dragElementsStyle {
    top: string, left: string, background: string, width?: string, height?: string,fontSize?:string
}

