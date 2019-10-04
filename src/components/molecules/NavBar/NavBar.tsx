import React from 'react'
import { NavLink } from 'react-router-dom'
import Text from 'components/atoms/Text'
import styles from './NavBar.module.scss'

const NavBar: React.FunctionComponent = () => {
  return (
    <div className={styles.navContainer}>
      <div className={styles.itemContainer}>
        <NavLink to="" activeClassName={styles.active}>
          <Text white large>
            Home
          </Text>
        </NavLink>
        <NavLink to="/product">
          <Text white large>
            Product
          </Text>
        </NavLink>
        <NavLink to="/about">
          <Text white large>
            About
          </Text>
        </NavLink>
      </div>
    </div>
  )
}

export default NavBar
