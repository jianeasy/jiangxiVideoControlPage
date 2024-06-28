import React, {useState} from "react";
import styles from './index.module.scss'
import playIcon from '@/assets/play.svg'
import rePlayIcon from '@/assets/repeat.svg'
import pauseIcon from '@/assets/pause.svg'
export default ()=>{
  const [] = useState(false)
  
  return <div style={{width:'1rem', height:'1rem'}}>
    <img className={styles.icon} src={playIcon}></img>
    <img className={styles.icon} src={rePlayIcon}></img>
    <img className={styles.icon} src={pauseIcon}></img>
  </div>
}