import styles from './styles.module.css';

import {
  IconStackOverflow,
  IconBxlGithub,
  IconLogoDocker,
  IconLogoNpm,
  IconBxlLinkedinSquare,
  IconMedium,
  IconEmailArrowRightOutline,
} from './icons';

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
              <IconStackOverflow/>
            </a>
          </span>
          <span className={styles.horizontalListItem}>
            <a className={styles.listText} href="https://github.com/el173" rel="noopener noreferrer" target="_blank">
              <IconBxlGithub/>
            </a>
          </span>
          <span className={styles.horizontalListItem}>
            <a className={styles.listText} href="https://hub.docker.com/u/el173" rel="noopener noreferrer" target="_blank">
              <IconLogoDocker/>
            </a>
          </span>
          <span className={styles.horizontalListItem}>
            <a className={styles.listText} href="https://www.npmjs.com/~el173" rel="noopener noreferrer" target="_blank">
              <IconLogoNpm/>
            </a>
          </span>
          <span className={styles.horizontalListItem}>
            <a className={styles.listText} href="https://www.linkedin.com/in/hashithkarunarathne/" rel="noopener noreferrer" target="_blank">
              <IconBxlLinkedinSquare/>
            </a>
          </span>
          <span className={styles.horizontalListItem}>
            <a className={styles.listText} href="https://hashithkarunarathne.medium.com/" rel="noopener noreferrer" target="_blank">
              <IconMedium/>
            </a>
          </span>
          <span className={styles.horizontalListItem}>
            <a className={styles.listText} href="mailto:hashithkarunarathne@live.com?Subject=Hello%20Hashith" target="_top">
              <IconEmailArrowRightOutline/>
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}
