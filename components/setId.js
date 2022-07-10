import { content } from "./content"

export const settingId = (num) => {
    let ids = []
    content.forEach((item) => {
        ids.push(item.id)
    })

    let id = Math.floor(Math.random() * num)
    let a = false

    for (var i = 0; i < ids.length; i++) {
        if (id !== ids[i]) { a = true }
    }

    if (a == true) return id
}