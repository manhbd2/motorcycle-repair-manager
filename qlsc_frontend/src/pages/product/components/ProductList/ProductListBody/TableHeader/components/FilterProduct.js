import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "../styles/filterProduct.scss";
import * as Icons from "pages/maintenancecard/commons/Icons";
function FilterProduct(props) {
  const { handleInputOnchange, search } = props;

  return (
    <div id="filter-product-wrapper">
      <div id="filter-product-by-tab-wrapper">
        <ul id="filter-product-by-tab">
          <li className="filter-product-tab active">Tất cả linh kiện</li>
        </ul>
      </div>
      <div id="filter-product-option-wrapper">
        <div id="filter-product-search">
          <div id="filter-product-search-icon">
            <Icons.Search />
          </div>
          <input
            id="filter-product-search-input"
            placeholder="Tìm kiếm linh kiện theo mã linh kiện hoặc tên linh kiện"
            value={search}
            onChange={(e) => handleInputOnchange(e)}
          />
        </div>
      </div>
    </div>
  );
}

FilterProduct.defaultProps = {};

export default connect(null, null)(FilterProduct);
