import { content } from "./content"

export const settingId = (num) => {
    let ids = []
    content.forEach((item) => {
        ids.push(item.id)
    })

    let x = false
    while (x == false) {
        let id = Math.floor(Math.random() * num)
        let a = false

        for (var i = 0; i < ids.length; i++) {
            if (id == ids[i]) {
                a = true
                break
            }
        }
        if (a == false) return id
    }
}