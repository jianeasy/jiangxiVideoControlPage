import styles from "./index.module.scss";
// import Map from "@/pages/Map";
import { Outlet } from "react-router-dom";
export default () => {
  return (
    <div className={styles.container}>
      <Outlet />
    </div>
  );
};
