import React from "react";
import * as Icons from "pages/maintenancecard/commons/Icons";
import SearchCustomer from "./SearchCustomer/SearchCustomer";

import "./styles.scss";

function InfoCustomer(props) {
  const { setCustomer, customer, showFilterCustomer, setShowFilterCustomer } =
    props;
  return (
    <div className="info-customer-warpper">
      <div className="title">Thông tin khách hàng</div>
      {showFilterCustomer ? (
        <div className="d-flex content-info">
          <div className="icon">
            <Icons.IconCustomer />
          </div>
          <div>
            <h4>{customer.name}</h4>
            <div style={{ fontWeight: 600, marginTop: 5 }}>
              {customer.phone}
            </div>
          </div>
          <div className="remove" onClick={() => props.removeCustomer()}>
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="#798c9c"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.251763 0.251763C0.331366 0.171957 0.425932 0.10864 0.530044 0.0654386C0.634156 0.0222369 0.745768 0 0.858488 0C0.971207 0 1.08282 0.0222369 1.18693 0.0654386C1.29104 0.10864 1.38561 0.171957 1.46521 0.251763L6.00022 4.78849L10.5352 0.251763C10.6149 0.172086 10.7095 0.108884 10.8136 0.065763C10.9177 0.0226426 11.0293 0.000448674 11.142 0.000448674C11.2546 0.000448674 11.3662 0.0226426 11.4703 0.065763C11.5744 0.108884 11.669 0.172086 11.7487 0.251763C11.8284 0.331439 11.8916 0.426028 11.9347 0.53013C11.9778 0.634232 12 0.745808 12 0.858488C12 0.971167 11.9778 1.08274 11.9347 1.18685C11.8916 1.29095 11.8284 1.38554 11.7487 1.46521L7.21196 6.00022L11.7487 10.5352C11.8284 10.6149 11.8916 10.7095 11.9347 10.8136C11.9778 10.9177 12 11.0293 12 11.142C12 11.2546 11.9778 11.3662 11.9347 11.4703C11.8916 11.5744 11.8284 11.669 11.7487 11.7487C11.669 11.8284 11.5744 11.8916 11.4703 11.9347C11.3662 11.9778 11.2546 12 11.142 12C11.0293 12 10.9177 11.9778 10.8136 11.9347C10.7095 11.8916 10.6149 11.8284 10.5352 11.7487L6.00022 7.21196L1.46521 11.7487C1.38554 11.8284 1.29095 11.8916 1.18685 11.9347C1.08274 11.9778 0.971167 12 0.858488 12C0.745808 12 0.634232 11.9778 0.53013 11.9347C0.426028 11.8916 0.331439 11.8284 0.251763 11.7487C0.172086 11.669 0.108884 11.5744 0.065763 11.4703C0.0226426 11.3662 0.000448674 11.2546 0.000448674 11.142C0.000448674 11.0293 0.0226426 10.9177 0.065763 10.8136C0.108884 10.7095 0.172086 10.6149 0.251763 10.5352L4.78849 6.00022L0.251763 1.46521C0.171957 1.38561 0.10864 1.29104 0.0654386 1.18693C0.0222369 1.08282 0 0.971207 0 0.858488C0 0.745768 0.0222369 0.634156 0.0654386 0.530044C0.10864 0.425932 0.171957 0.331366 0.251763 0.251763Z"
                fill="#798c9c"
              />
            </svg>
          </div>
        </div>
      ) : (
        <SearchCustomer
          setCustomer={(a) => setCustomer(a)}
          setShowFilterCustomer={(a) => setShowFilterCustomer(a)}
          setShowModalCustomer={(a) => props.setShowModalCustomer(a)}
        />
      )}
    </div>
  );
}

export default InfoCustomer;
