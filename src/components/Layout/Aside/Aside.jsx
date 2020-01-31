import React from "react";
import { Link } from "react-router-dom";
import {
  IoMdHome,
  IoIosMan,
  IoIosContacts,
  IoIosSchool,
  IoMdMedal,
  IoIosCalendar
} from "react-icons/io";
import classes from "./Aside.module.scss";
import { Tooltip } from "@material-ui/core";

const Aside = ({ currentTab, onAsideTabChange }) => {
  const tabs = [
    {
      path: "/",
      label: "dashboard",
      icon: <IoMdHome className="icon" />
    },
    {
      path: "/employee",
      label: "employees",
      icon: <IoIosMan className="icon" />
    },
    {
      path: "/departments",
      label: "departments",
      icon: <IoIosContacts className="icon" />
    },
    {
      path: "/training-schedules",
      label: "training schedules",
      icon: <IoIosCalendar className="icon" />
    },
    {
      path: "/training-records",
      label: "training records",
      icon: <IoMdHome className="icon" />
    },
    {
      path: "/successions",
      label: "successions",
      icon: <IoMdMedal className="icon" />
    },
    {
      path: "/careers",
      label: "careers",
      icon: <IoIosSchool className="icon" />
    },
    {
      path: "/job-incidence",
      label: "job incidence",
      icon: <IoMdHome className="icon" />
    },
    { path: "/reports", label: "reports", icon: <IoMdHome className="icon" /> },
    { key: 1 },
    {
      path: "/preferences",
      label: "preferences",
      icon: <IoMdHome className="icon" />
    },
    { path: "/support", label: "support", icon: <IoMdHome className="icon" /> }
  ];
  const getClass = tab => (currentTab === tab ? classes.Active : null);

  return (
    <aside className={classes.Aside}>
      <div className={classes.Brand}>
        <h1>
          <span>N R C</span> - HR
        </h1>
      </div>

      <div className={classes.Menu}>
        <ul>
          {tabs.map(tab => {
            return tab.path ? (
              <Tooltip title={tab.label} key={tab.path + tab.label}>
                <li
                  className={getClass(tab.label)}
                  onClick={onAsideTabChange.bind(null, tab.label)}
                >
                  <Link to={tab.path}>
                    <span className="icon">{tab.icon}</span>
                    <span>{tab.label}</span>
                  </Link>
                </li>
              </Tooltip>
            ) : (
              <React.Fragment key={tab.key}>
                <br />
                <br />
              </React.Fragment>
            );
          })}
          
        </ul>
      </div>
    </aside>
  );
};

export default Aside;
