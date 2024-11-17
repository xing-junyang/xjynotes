/* type.ts */
export interface NavLink {
    icon?: string | { svg: string }
    badge?:
        | string
        | {
        text?: string
        type?: 'info' | 'tip' | 'warning' | 'danger'
    }
    title: string
    desc?: string
    link: string
}

export interface NavData {
    title: string
    items: NavLink[]
}