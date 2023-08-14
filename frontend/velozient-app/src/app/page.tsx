'use client';
import styles from './page.module.css'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faEdit } from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Home() {

  const callAPI = async () => {
    try {
      const res = await fetch(`http://localhost:8040/password-cards`);
      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main className={styles.main}>
    
      <h1 className={styles.title}>Password Manager</h1>

      <div className={styles.grid}>
        <div className={styles.card}>
        <button onClick={callAPI}>Make API call</button>
          <FontAwesomeIcon icon={faEdit} className={styles.iconsm2} />
          <FontAwesomeIcon icon={faTrash} className={styles.iconsm}/>
          <h3 className={styles.nameOf}>Name</h3>
          <p className={styles.paragraph}>
            <a href="#">URL</a><br/>
            Username<br/>
            Password<br/>
          </p>
        </div>

        <div className={styles.card}>
          <FontAwesomeIcon icon={faEdit} className={styles.iconsm2}/>
          <FontAwesomeIcon icon={faTrash} className={styles.iconsm}/>
          <h3 className={styles.nameOf}>Name</h3>
          <p className={styles.paragraph}>
            <a href="#">URL</a><br/>
            Username<br/>
            Password<br/>
          </p>
        </div>

        <div className={styles.card}>
          <FontAwesomeIcon icon={faEdit} className={styles.iconsm2}/>
          <FontAwesomeIcon icon={faTrash} className={styles.iconsm}/>
          <h3 className={styles.nameOf}>Name</h3>
          <p className={styles.paragraph}>
            <a href="#">URL</a><br/>
            Username<br/>
            Password<br/>
          </p>
        </div>
      </div>
    </main>
  )
}
