import React, { useState, useEffect } from "react";
import KanbanBoard from "./components/KanbanBoard";
import "./App.css";
import axios from "axios";
import Dropdown from "./components/Dropdown";

const App = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [dropdown, setDropdown] = useState(false);
  const [grouping, setGrouping] = useState(
    localStorage.getItem("grouping") || "status"
  );
  const [sorting, setSorting] = useState(
    localStorage.getItem("sorting") || "priority"
  );

  const priorityLabels = {
    0: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          opacity="0.9"
          d="M4.5 7.34375H2.75C2.50838 7.34375 2.3125 7.53963 2.3125 7.78125V8.21875C2.3125 8.46037 2.50838 8.65625 2.75 8.65625H4.5C4.74162 8.65625 4.9375 8.46037 4.9375 8.21875V7.78125C4.9375 7.53963 4.74162 7.34375 4.5 7.34375Z"
          fill="#5E5E5F"
        />
        <path
          opacity="0.9"
          d="M8.875 7.34375H7.125C6.88338 7.34375 6.6875 7.53963 6.6875 7.78125V8.21875C6.6875 8.46037 6.88338 8.65625 7.125 8.65625H8.875C9.11662 8.65625 9.3125 8.46037 9.3125 8.21875V7.78125C9.3125 7.53963 9.11662 7.34375 8.875 7.34375Z"
          fill="#5E5E5F"
        />
        <path
          opacity="0.9"
          d="M13.25 7.34375H11.5C11.2584 7.34375 11.0625 7.53963 11.0625 7.78125V8.21875C11.0625 8.46037 11.2584 8.65625 11.5 8.65625H13.25C13.4916 8.65625 13.6875 8.46037 13.6875 8.21875V7.78125C13.6875 7.53963 13.4916 7.34375 13.25 7.34375Z"
          fill="#5E5E5F"
        />
      </svg>
    ),
    2: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3.5 8H2.5C1.94772 8 1.5 8.44772 1.5 9V13C1.5 13.5523 1.94772 14 2.5 14H3.5C4.05228 14 4.5 13.5523 4.5 13V9C4.5 8.44772 4.05228 8 3.5 8Z"
          fill="#5C5C5E"
        />
        <path
          d="M8.5 5H7.5C6.94772 5 6.5 5.44772 6.5 6V13C6.5 13.5523 6.94772 14 7.5 14H8.5C9.05228 14 9.5 13.5523 9.5 13V6C9.5 5.44772 9.05228 5 8.5 5Z"
          fill="#5C5C5E"
          fill-opacity="0.4"
        />
        <path
          d="M13.5 2H12.5C11.9477 2 11.5 2.44772 11.5 3V13C11.5 13.5523 11.9477 14 12.5 14H13.5C14.0523 14 14.5 13.5523 14.5 13V3C14.5 2.44772 14.0523 2 13.5 2Z"
          fill="#5C5C5E"
          fill-opacity="0.4"
        />
      </svg>
    ),
    3: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3.5 8H2.5C1.94772 8 1.5 8.44772 1.5 9V13C1.5 13.5523 1.94772 14 2.5 14H3.5C4.05228 14 4.5 13.5523 4.5 13V9C4.5 8.44772 4.05228 8 3.5 8Z"
          fill="#5C5C5E"
        />
        <path
          d="M8.5 5H7.5C6.94772 5 6.5 5.44772 6.5 6V13C6.5 13.5523 6.94772 14 7.5 14H8.5C9.05228 14 9.5 13.5523 9.5 13V6C9.5 5.44772 9.05228 5 8.5 5Z"
          fill="#5C5C5E"
        />
        <path
          d="M13.5 2H12.5C11.9477 2 11.5 2.44772 11.5 3V13C11.5 13.5523 11.9477 14 12.5 14H13.5C14.0523 14 14.5 13.5523 14.5 13V3C14.5 2.44772 14.0523 2 13.5 2Z"
          fill="#5C5C5E"
          fill-opacity="0.4"
        />
      </svg>
    ),
    4: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3.5 8H2.5C1.94772 8 1.5 8.44772 1.5 9V13C1.5 13.5523 1.94772 14 2.5 14H3.5C4.05228 14 4.5 13.5523 4.5 13V9C4.5 8.44772 4.05228 8 3.5 8Z"
          fill="#5C5C5E"
        />
        <path
          d="M8.5 5H7.5C6.94772 5 6.5 5.44772 6.5 6V13C6.5 13.5523 6.94772 14 7.5 14H8.5C9.05228 14 9.5 13.5523 9.5 13V6C9.5 5.44772 9.05228 5 8.5 5Z"
          fill="#5C5C5E"
        />
        <path
          d="M13.5 2H12.5C11.9477 2 11.5 2.44772 11.5 3V13C11.5 13.5523 11.9477 14 12.5 14H13.5C14.0523 14 14.5 13.5523 14.5 13V3C14.5 2.44772 14.0523 2 13.5 2Z"
          fill="#5C5C5E"
        />
      </svg>
    ),
    1: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3 1C1.91067 1 1 1.91067 1 3V13C1 14.0893 1.91067 15 3 15H13C14.0893 15 15 14.0893 15 13V3C15 1.91067 14.0893 1 13 1H3ZM7 4H9L8.75391 8.99836H7.25L7 4ZM9 11C9 11.5523 8.55228 12 8 12C7.44772 12 7 11.5523 7 11C7 10.4477 7.44772 10 8 10C8.55228 10 9 10.4477 9 11Z"
          fill="#FB773F"
        />
      </svg>
    ),
  };

  const userLabels = users.reduce((labels, user) => {
    const nameParts = user.name.split(" ");
    const firstName = nameParts[0];
    const lastName = nameParts.length > 1 ? nameParts[1] : "";
    const firstLetterFirstName = firstName.charAt(0).toUpperCase();
    const firstLetterLastName = lastName.charAt(0).toUpperCase();

    const randomColor = getRandomColor();

    labels[user.id] = (
      <div className="user-label">
        <div
          className="user-pic"
          style={{
            backgroundColor: randomColor,
          }}
        >
          {firstLetterFirstName}
          {lastName && ` ${firstLetterLastName}`}
        </div>
        {user.name}
      </div>
    );
    return labels;
  }, {});

  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 7)];
    }
    return color;
  }

  useEffect(() => {
    getDetails();
  }, []);

  useEffect(() => {
    localStorage.setItem("grouping", grouping);
    localStorage.setItem("sorting", sorting);
  }, [grouping, sorting]);

  const getDetails = async () => {
    try {
      const { data } = await axios.get(
        "https://api.quicksell.co/v1/internal/frontend-assignment"
      );
      const updatedTickets = data.tickets.map((ticket) => {
        if (ticket.priority === 1) {
          ticket.priority = 2;
        } else if (ticket.priority === 2) {
          ticket.priority = 3;
        } else if (ticket.priority === 3) {
          ticket.priority = 4;
        } else if (ticket.priority === 4) {
          ticket.priority = 1;
        }
        return ticket;
      });
      setTickets(updatedTickets);
      setUsers(data.users);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const organizeTickets = () => {
    const organizedData = {};

    if (grouping === "status") {
      const ticketStatus = {
        Backlog: [],
        Todo: [],
        "In progress": [],
        Done: [],
        Cancelled: [],
      };

      tickets.forEach((ticket) => {
        if (ticketStatus[ticket.status]) {
          ticketStatus[ticket.status].push(ticket);
        }
      });

      return ticketStatus;
    } else if (grouping === "priority") {
      const priorityStatus = {
        0: [],
        1: [],
        2: [],
        3: [],
        4: [],
      };

      tickets.forEach((ticket) => {
        if (priorityStatus[ticket.priority]) {
          priorityStatus[ticket.priority].push(ticket);
        }
      });

      return priorityStatus;
    } else if (grouping === "user") {
      const userStatus = {
        "usr-1": [],
        "usr-2": [],
        "usr-3": [],
        "usr-4": [],
        "usr-5": [],
      };

      tickets.forEach((ticket) => {
        if (userStatus[ticket.userId]) {
          userStatus[ticket.userId].push(ticket);
        }
      });

      return userStatus;
    }

    return organizedData;
  };

  const sortByPriority = (tickets) => {
    return [...tickets].sort((a, b) => b.priority - a.priority);
  };

  const sortByTitle = (tickets) => {
    return [...tickets].sort((a, b) => a.title.localeCompare(b.title));
  };

  const handleGroupingChange = (newGrouping) => {
    console.log(newGrouping);
    setGrouping(newGrouping);
    localStorage.setItem("grouping", newGrouping);
    setDropdown(false);
  };

  const handleSortingChange = (newSorting) => {
    console.log(newSorting);
    setSorting(newSorting);
    localStorage.setItem("sorting", newSorting);
    setDropdown(false);
  };

  const sortedTickets = (tickets) => {
    const sortingFunctions = {
      priority: sortByPriority,
      title: sortByTitle,
    };

    const sortingFunction = sortingFunctions[sorting];

    if (sortingFunction) {
      return sortingFunction(tickets);
    }

    return tickets;
  };

  const boards = organizeTickets();

  const handledropdown = () => {
    console.log(dropdown);

    setDropdown(!dropdown);
  };

  return (
    <div className="app">
      <header style={{ zIndex: "1000" }}>
        <div
          style={{
            paddingBottom: "20px",
            paddingLeft: "40px",
            paddingTop: "20px",
            display: "flex",
            gap: "5px",
            fontSize: "15px",
            padding: "12px",
            borderRadius: "4px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M9.5 10.5C9.63261 10.5 9.75979 10.5527 9.85355 10.6464C9.94732 10.7402 10 10.8674 10 11V14C10 14.1326 9.94732 14.2598 9.85355 14.3536C9.75979 14.4473 9.63261 14.5 9.5 14.5H8.5C8.36739 14.5 8.24021 14.4473 8.14645 14.3536C8.05268 14.2598 8 14.1326 8 14V11C8 10.8674 8.05268 10.7402 8.14645 10.6464C8.24021 10.5527 8.36739 10.5 8.5 10.5H9.5ZM7 11.5V13H1.75C1.55109 13 1.36032 12.921 1.21967 12.7803C1.07902 12.6397 1 12.4489 1 12.25C1 12.0511 1.07902 11.8603 1.21967 11.7197C1.36032 11.579 1.55109 11.5 1.75 11.5H7ZM14.25 11.5C14.4489 11.5 14.6397 11.579 14.7803 11.7197C14.921 11.8603 15 12.0511 15 12.25C15 12.4489 14.921 12.6397 14.7803 12.7803C14.6397 12.921 14.4489 13 14.25 13H11V11.5H14.25ZM5.5 6C5.63261 6 5.75979 6.05268 5.85355 6.14645C5.94732 6.24021 6 6.36739 6 6.5V9.5C6 9.63261 5.94732 9.75979 5.85355 9.85355C5.75979 9.94732 5.63261 10 5.5 10H4.5C4.36739 10 4.24021 9.94732 4.14645 9.85355C4.05268 9.75979 4 9.63261 4 9.5V6.5C4 6.36739 4.05268 6.24021 4.14645 6.14645C4.24021 6.05268 4.36739 6 4.5 6H5.5ZM3 7.25V8.75H1.75C1.55109 8.75 1.36032 8.67098 1.21967 8.53033C1.07902 8.38968 1 8.19891 1 8C1 7.80109 1.07902 7.61032 1.21967 7.46967C1.36032 7.32902 1.55109 7.25 1.75 7.25H3ZM14.25 7.25C14.4489 7.25 14.6397 7.32902 14.7803 7.46967C14.921 7.61032 15 7.80109 15 8C15 8.19891 14.921 8.38968 14.7803 8.53033C14.6397 8.67098 14.4489 8.75 14.25 8.75H7V7.25H14.25ZM11.5 1.75C11.6326 1.75 11.7598 1.80268 11.8536 1.89645C11.9473 1.99021 12 2.11739 12 2.25V5.25C12 5.38261 11.9473 5.50979 11.8536 5.60355C11.7598 5.69732 11.6326 5.75 11.5 5.75H10.5C10.3674 5.75 10.2402 5.69732 10.1464 5.60355C10.0527 5.50979 10 5.38261 10 5.25V2.25C10 2.11739 10.0527 1.99021 10.1464 1.89645C10.2402 1.80268 10.3674 1.75 10.5 1.75H11.5ZM9 3V4.5H1.75C1.55109 4.5 1.36032 4.42098 1.21967 4.28033C1.07902 4.13968 1 3.94891 1 3.75C1 3.55109 1.07902 3.36032 1.21967 3.21967C1.36032 3.07902 1.55109 3 1.75 3H9ZM14.25 3C14.4489 3 14.6397 3.07902 14.7803 3.21967C14.921 3.36032 15 3.55109 15 3.75C15 3.94891 14.921 4.13968 14.7803 4.28033C14.6397 4.42098 14.4489 4.5 14.25 4.5H13V3H14.25Z"
              fill="#5C5C5E"
            />
          </svg>
          <span>Display</span>
          <div onClick={handledropdown} style={{ cursor: "pointer" }}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.99583 12.75C9.89583 12.75 9.80208 12.7326 9.71458 12.6979C9.62708 12.6632 9.5486 12.6111 9.47916 12.5416L5.52791 8.59038C5.37041 8.43288 5.29513 8.25343 5.30208 8.05204C5.30902 7.85065 5.38888 7.67357 5.54166 7.52079C5.69444 7.36801 5.87152 7.29163 6.07291 7.29163C6.2743 7.29163 6.45138 7.36801 6.60416 7.52079L9.99999 10.9375L13.4167 7.52079C13.5694 7.36801 13.7465 7.2951 13.9479 7.30204C14.1493 7.30899 14.3264 7.38885 14.4792 7.54163C14.6319 7.6944 14.7083 7.87149 14.7083 8.07288C14.7083 8.27426 14.6296 8.45329 14.4721 8.60996L10.5208 12.5416C10.4458 12.6111 10.3646 12.6632 10.2771 12.6979C10.1896 12.7326 10.0958 12.75 9.99583 12.75Z"
                fill="#535961"
              />
            </svg>
          </div>
        </div>
      </header>

      <div
        style={{
          display: dropdown ? "block" : "none",
          zIndex: "100",
          position: "absolute",
          backgroundColor: "white",
          padding: "10px",
          top: "55px",
          border: "1px solid #dcdcdc",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          flexDirection: "column",
          gap: "10px",
          left: "30px",
        }}
      >
        <Dropdown
          label="Grouping"
          options={[
            { key: "status", value: "Status" },
            { key: "user", value: "User" },
            { key: "priority", value: "Priority" },
          ]}
          onChange={handleGroupingChange}
        />
        <Dropdown
          label="Ordering"
          options={[
            { key: "priority", value: "Priority" },
            { key: "title", value: "Title" },
          ]}
          onChange={handleSortingChange}
        />
      </div>

      <div className="app-outer-container">
        <div className="app-boards">
          {Object.keys(boards).map((boardKey) => (
            <KanbanBoard
              key={boardKey}
              title={
                grouping === "priority"
                  ? priorityLabels[boardKey]
                  : grouping === "user"
                  ? userLabels[boardKey]
                  : boardKey
              }
              count={boards[boardKey].length}
              tickets={sortedTickets(boards[boardKey])}
              sorting={sorting}
              grouping={grouping}
              users={users}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
