'use client';
import styles from './page.module.css'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { get } from 'http';
import { useEffect, useState } from "react";

interface Carddata {
  id: number;
  name: string;
  url: string;
  username: string;
  password: string;
}

export default function Home() {

  const [cardsinfo, setcardsinfo] = useState<Carddata[]>([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:8040/password-cards')
      .then((res) => res.json())
      .then((cardsinfo) => {
        setcardsinfo(cardsinfo.data);
        setLoading(false);
      });
  }, []);

  return (
    <main className={styles.main}>
    
      <h1 className={styles.title}>Password Manager</h1>

      <div className={styles.grid}>

        {cardsinfo ? cardsinfo.map((card) => {
            return (
              <div key={card.id} className={styles.card}>
                <FontAwesomeIcon icon={faEdit} className={styles.iconsm2} />
                <FontAwesomeIcon icon={faTrash} className={styles.iconsm}/>
                <h3 className={styles.nameOf}>{card.name}</h3>
                <p className={styles.paragraph}>
                  <a href={card.url} target='_blank'>{card.url}</a><br/>
                  {card.username}<br/>
                  {card.password}<br/>
                </p>

                <FontAwesomeIcon icon={faPlus} className={styles.iconsm} />
              </div>
            );
          }) : (
              <div>
                <h3 className={styles.nameOf}>No passwords added.</h3>
                <p className={styles.paragraph}>
                  Add one by clicking the button:
                  <FontAwesomeIcon icon={faPlus} className={styles.iconsm} />
                </p>
              </div>
          )}

      </div>
    </main>
  )
}
