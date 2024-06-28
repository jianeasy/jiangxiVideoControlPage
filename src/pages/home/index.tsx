import { useState } from 'react';
import styles from './index.module.scss';
import { Outlet, useNavigate } from 'react-router-dom';
import cn from 'classnames';
export default () => {
  const navigate = useNavigate();
  const list = [
    {
      title: '光雕投影',
      name: 'map',
    },
    {
      title: '滑轨屏',
      name: 'video',
    },
    {
      title: 'Cave影片',
      name: 'cave',
    },
  ];
  const [activeMenu, setActiveMenu] = useState(list[0]);
  const handleSelect = (item) => {
    setActiveMenu(item);
    navigate(item.name);
  };
  return (
    <div className={styles.container}>
      <div className={styles.leftSide}>
        {list.map((item) => {
          return (
            <div
              className={cn(
                styles.item,
                activeMenu.name === item.name ? styles.activeItem : ''
              )}
              key={item.name}
              onClick={() => {
                handleSelect(item);
              }}
            >
              {item.title}
            </div>
          );
        })}
      </div>
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
};
