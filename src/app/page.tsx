import styles from './styles.module.css'

export default function Home() {
  return (
    <div>
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <h5 className={styles.helloText}>Hello, World.</h5>
          <h1 className={styles.nameText}>I&apos;m Hashith Karunarathne</h1>
          <p className={styles.titleText}>
            <span className={styles.title}>Full Stack Developer</span>
          </p>
          <p className={styles.subTitle}>
            <span><i>Focus</i> on <b>BigPicture</b>; $yntax doesn&apos;t matter</span>
          </p>
        </div>
      </div>
      <div className={styles.bottomContainer}>
        <div className={styles.horizontalList}>
          <span className={styles.horizontalListItem}>
            <a className={styles.listText} href="https://stackoverflow.com/users/5702705/el173"  rel="noopener noreferrer" target="_blank">
              stackoverflow
            </a>
          </span>
          <span className={styles.horizontalListItem}>
            <a className={styles.listText} href="https://code.hashith.com" rel="noopener noreferrer" target="_blank">
              github
            </a>
          </span>
          <span className={styles.horizontalListItem}>
            <a className={styles.listText} href="https://hub.docker.com/u/el173" rel="noopener noreferrer" target="_blank">
              docker
            </a>
          </span>
          <span className={styles.horizontalListItem}>
            <a className={styles.listText} href="https://www.npmjs.com/~el173" rel="noopener noreferrer" target="_blank">
              npm
            </a>
          </span>
          <span className={styles.horizontalListItem}>
            <a className={styles.listText} href="https://www.linkedin.com/in/hashithkarunarathne/" rel="noopener noreferrer" target="_blank">
              linkedin
            </a>
          </span>
          <span className={styles.horizontalListItem}>
            <a className={styles.listText} href="https://hashithkarunarathne.medium.com/" rel="noopener noreferrer" target="_blank">
              medium
            </a>
          </span>
          <span className={styles.horizontalListItem}>
            <a className={styles.listText} href="mailto:info@hashith.com?Subject=Hello%20Hashith" target="_top">
              mail
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}