import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import styles from "../styles/HomePage.module.scss"
import { content } from "../db/content"

let i = 4

export default function HomePage() {
  const [modal, setModal] = useState(false)

  //toggling modal
  const handleAddClick = (e) => {
    e.preventDefault()
    setModal(modal = !modal)
  }

  //getting data from modal
  const handleClick = (e) => {
    e.preventDefault()
    var inpText = document.getElementById('inpText').value
    var inpTitle = document.getElementById('inpTitle').value

    content.push({
      id: i,
      title: inpTitle,
      text: inpText
    })

    // and also cleaning modal 
    setModal(modal = !modal)
    i++
    document.getElementById('inpTitle').value = ""
    document.getElementById('inpText').value = ""
  }


  return (
    <div className={styles.page}>
      <Head>
        <title>Unistory | Тестовое задание</title>
        <meta name="description" content="compleated by kkashin" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className='container'>
          <h1 className={styles.main__title}>Блог</h1>
          <div className={styles.main__posts}>
            {content.map(({ id, title, text }) => {
              return (
                <div className={styles.main__post} key={id}>
                  <p className={styles.main__postTitle}>{title}</p>
                  <textarea className={styles.main__postText} defaultValue={text} />
                  <Link href={`/posts/${id}`}>
                    <a className={styles.main__link}>Перейти</a>
                  </Link>
                </div>
              )
            })}
          </div>
          <button onClick={handleAddClick} className={styles.main__add}>+ Добавить</button>
        </div>
      </main>

      <div className={modal ? 'modal-active' : 'modal-inactive'}>
        <div onClick={handleAddClick} className='void'></div>

        <form onSubmit={handleClick} className={styles.modal__form}>
          <div className={styles.modal__container}>
            <input id="inpTitle" name="inpTitle" type="text" placeholder='Заголовок записи' required />
            <textarea id="inpText" name="inpText" placeholder='Контент записи' required />
          </div>
          <div className={styles.modal__buttons}>
            <button type="button" onClick={handleAddClick} className={styles.modal__reject}>Отмена</button>
            <button type="submit" className={styles.modal__save}>Сохранить</button>
          </div>
        </form>

      </div>
    </div>
  )
}
