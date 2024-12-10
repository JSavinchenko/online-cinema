import styles from './App.module.scss';
import {Header} from './components/Header';
import {Movies} from './components/Movies';

function App() {
  return (
    <div className={styles.container}>
      <Header />
      <Movies />
    </div>
  );
}

export default App;
