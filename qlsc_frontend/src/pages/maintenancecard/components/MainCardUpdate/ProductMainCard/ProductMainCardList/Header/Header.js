import React from "react";

function Header() {
  return (
    <div className="d-flex align-items-center delivery-collation-order-row header">
      <div className="order">Mã</div>
      <div className="track-code">Tên</div>
      <div className="track-code">Loại</div>
      <div className="tenant">Số lượng</div>
      <div className="d-flex align-items-center tenant">Đơn giá</div>
      <div className="d-flex item-list">Bảo hành</div>
      <div className="d-flex align-items-center justify-content-center tenant">
        Trạng thái
      </div>
    </div>
  );
}

export default Header;
