import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to the School Management System</h1>
      <nav className={styles.nav}>
        <button onClick={() => window.location.href='/addSchool'}>Add School data</button>
        <button onClick={() => window.location.href='/showSchools'}>Show School data</button>
      </nav>
    </div>
  );
}
