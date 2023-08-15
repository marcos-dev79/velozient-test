'use client';
import styles from './page.module.css'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from "react";
import Modal from 'react-modal';

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
  const customStyles = { overlay: { backgroundColor: 'rgba(0, 0, 0, 0.6)' }, content: { top: '50%', left: '50%', right: 'auto', bottom: 'auto', marginRight: '-50%', transform: 'translate(-50%, -50%)' } }
  const [isOpen, setIsOpen] = useState(false)
  const [formSuccess, setFormSuccess] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    url:"",
    username: "",  
    password: "",
  });

  const handleInput = (e: any) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
  
    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue
    }));
  }

  const submitForm = (e: any) => {
    e.preventDefault()
  
    const formURL = e.target.action
    const data = JSON.stringify(formData)

    fetch(formURL, {
      method: "POST",
      body: data,
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json())
    .then(() => {
      setFormData({ 
        name: "", 
        url: "",
        username: "",
        password: "",
      })
      setIsOpen(false);
      fetch('http://localhost:8040/password-cards')
        .then((res) => res.json())
        .then((cardsinfo) => {
          setcardsinfo(cardsinfo.data);
          setLoading(false);
        });

    })
  }

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
              </div>
            );
          }) : (
              <div>
                <h3 className={styles.nameOf}>No passwords added.</h3>
                <p className={styles.paragraph}>
                  Add one by clicking the button:
                </p>
              </div>
          )}

          <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} style={customStyles}> 
            <h3>Add Password</h3>
            <form action="http://localhost:8040/password-cards" method="POST" onSubmit={submitForm}> 
              
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" value={formData.name} placeholder="Name" required onChange={handleInput} className={styles.field}/>

              <label htmlFor="url">URL</label>
              <input type="text" id="url" name="url" value={formData.url} placeholder="URL" required onChange={handleInput} className={styles.field}/>

              <label htmlFor="username">Username</label>
              <input type="text" id="username" name="username" value={formData.username} placeholder="Username" required onChange={handleInput} className={styles.field}/>

              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" value={formData.password} placeholder="Password" required onChange={handleInput} className={styles.field}/>

           

              <button onClick={() => setIsOpen(false)}>Close</button>
              <button type="submit" className={styles.mgleft} >Save</button>
            </form>
          
           </Modal>

          <FontAwesomeIcon onClick={() => setIsOpen(true)} icon={faPlus} className={styles.iconbg} />
      </div>
    </main>
  )
}
