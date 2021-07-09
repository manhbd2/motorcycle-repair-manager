import React from "react";
import * as Icons from "pages/maintenancecard/commons/Icons";
import "./styles.scss";

function InfoCustomer(props) {
  const { customer } = props;
  return (
    <div className="info-customer-warpper">
      <div className="title">Thông tin khách hàng</div>
      <div className="d-flex content-info">
        <div className="icon">
          <Icons.IconCustomer />
        </div>
        <div>
          <h4>{customer.name}</h4>
          <div style={{ fontWeight: 600, marginTop: 5 }}>{customer.phone}</div>
        </div>
      </div>
    </div>
  );
}

export default InfoCustomer;
