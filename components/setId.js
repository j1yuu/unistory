import { content } from "./content"

export const settingId = (num) => {
    let ids = []
    content.forEach((item) => {
        ids.push(item.id)
    })

    // let a = false
    // while (a == false) {
    //     let id = Math.floor(Math.random() * num)
    //     let b = 1
    //     for (var i = 0; i < ids.length; i++) {
    //         if (id == ids.lenth) break
    //         b = b + 1
    //     }
    //     if (b == ids.length) return id, (a = true)
    // }
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