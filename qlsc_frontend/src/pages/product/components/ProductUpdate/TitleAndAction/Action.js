import React, { useEffect, useRef, useState } from "react";
import * as Icons from "pages/product/commons/Icons";
import "./stylesAction.scss";

const arr = [
  {
    id: 1,
    name: "Linh kiện",
  },
  {
    id: 2,
    name: "Dịch vụ",
  },
];
function Action(props) {
  const { showContent } = props;
  const [show, setShow] = useState(false);
  const myRef = useRef();

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });

  const handleClickOutside = (e) => {
    if (!myRef.current.contains(e.target)) {
      setShow(false);
    }
  };

  const handleSelect = (item) => {
    setCurrentShow(item);
  };

  const handleName= () => {
    const item = arr.find((item) => item.id === showContent);
    if (item) return item.name;
    return '';
  }

  return (
    <div
      className="report-filter-group-by"
      style={{ cursor: 'not-allowed' }}
      //onClick={() => setShow(!show)}
      ref={myRef}
    >
      <div
        className="d-flex align-items-center report-group-by"
        style={{ cursor: 'not-allowed' }}
        //onClick={() => setShow(!show)}
      >
        <Icons.groupByIcon />
        <div className="content">
          Loại sản phẩm:
          <span>&nbsp;{handleName()}</span>
        </div>
        <Icons.dropdownIcon />
      </div>
      {show ? (
        <div className="position-absolute select-time-type">
          {arr.map((item, index) => {
            return (
              <div
                className="d-flex align-items-center justify-content-between group-by-item"
                key={index}
                onClick={() => {
                  handleSelect(item);
                  setShowContent(item.id);
                }}
              >
                <span>{item.name}</span>
                {showContent === item.id ? <Icons.tick /> : null}
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

export default Action;
