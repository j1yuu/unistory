import Link from "next/link"
import { content } from "../content"
import { useState, useEffect } from "react"
import styles from './id.module.scss'
import Head from "next/head"

export default function Post() {
    const [post, setPost] = useState(content)
    const [modal, setModal] = useState(false)
    const [notDeleted, setNotDeleted] = useState(true)

    //toggling modal, nothing special
    function toggleModal() {
        setModal(!modal)
    }

    //getting post id
    function getPostId() {
        let path = window.location.pathname
        let Id = new Number(path.slice(7))
        return Id
    }

    //geting post data 
    function getPostsData() {
        let Id = getPostId()
        // finding post with this id
        let thisPost = content.find(post => {
            if (post.id == Id) return post
        })
        return thisPost
    }

    //editing post
    function editPost() {
        //getting necessary vars
        var newTitle = document.getElementById('editTitle').value
        var newText = document.getElementById('editText').value
        var Id = getPostId()

        //searching and editing post 
        content.forEach((post) => {
            if (post.id == Id) {
                post.title = newTitle
                post.text = newText
                document.getElementById('postTitle').textContent = `Запись "${newTitle}"`
            }
        })
    }

    // deleting post
    function deletePost() {
        // getting id and showing setting state of not-deleted as false
        var Id = getPostId()
        setNotDeleted(false);

        // searching for the necessary post and returning array without it
        content.forEach((post, idx) => {
            if (post.id == Id) return content.splice(idx, 1)
        })
        // checking array
        console.log(content);
    }

    //honestly idk what i`ve done here but only that way my code could get correct array`s child
    useEffect(() => {
        setPost(getPostsData())
        setNotDeleted(true)
    }, [post])

    return (
        <div className={styles.page}>
            <Head>
                <title>Unistory | Тестовое задание</title>
                <meta name="description" content="compleated by kkashin" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {
                notDeleted ?
                    (
                        // if not deleted
                        <>
                            <div className="container">
                                <Link href="/">
                                    <a className={styles.link}>Назад</a>
                                </Link>
                                <div className={styles.post}>
                                    <h1 id="postTitle" className={styles.post__title}>Запись "{post.title}"</h1>
                                    <input type="text" id="editTitle" name="editTitle" defaultValue={post.title} />
                                    <textarea id="editText" name="editText" defaultValue={post.text} />
                                    <div className={styles.buttons}>
                                        <button onClick={toggleModal}>Удалить</button>
                                        <button onClick={editPost}>Сохранить</button>
                                    </div>
                                </div>
                            </div>
                            <div className={modal ? 'modal-active' : 'modal-inactive'}>
                                <div onClick={toggleModal} className='void' />
                                <div className={styles.modal__container}>
                                    <h2 className={styles.modal__title}>Удалить?</h2>
                                    <div className={styles.modal__buttons}>
                                        <button onClick={deletePost} className={styles.modal__buttonYes}>Да</button>
                                        <button onClick={toggleModal} className={styles.modal__buttonNo}>Нет</button>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        // if deleted
                        <>
                            <div className="container">
                                <div className={styles.deleted}>
                                    <h1>Пост был удалён</h1>
                                    <Link href="/">
                                        <a>Назад</a>
                                    </Link>
                                </div>
                            </div>
                        </>
                    )
            }
        </div>
    )
}
