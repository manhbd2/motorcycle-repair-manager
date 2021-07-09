import React from "react";
import { useHistory } from "react-router";
import * as Icons from "pages/maintenancecard/commons/Icons";
import "./styles.scss";
import { connect } from "react-redux";
import pushstate from "../../../../../utils/pushstate";

function TitleAndAction(props) {
  const { saveMaintenanceCard } = props;
  const history = useHistory();
  const onClick = () => {
    pushstate(history, `/maintenance-cards`);
  };
  return (
    <React.Fragment>
      <div className="go-back" onClick={onClick}>
        <Icons.arrowLeft />
        <div style={{ marginTop: 4 }}>
          <span>Danh sách&nbsp;</span>
          <span>phiếu</span>
        </div>
      </div>

      <div className="main-card-create-tilte-action">
        <div className="d-flex list-header">
          <div className="header-title">
            <div style={{ fontSize: "22px" }}>Thêm mới phiếu</div>
          </div>
          <div className="d-flex justify-content-end header-action">
            <div className="dlv-button-cancel" onClick={() => onClick()}>
              Hủy
            </div>
            <div
              className="d-flex align-items-center justify-content-between dlv-button-save"
              onClick={() => saveMaintenanceCard()}
            >
              <div className="icon-button">
                <svg
                  width="22"
                  height="21"
                  viewBox="0 0 22 21"
                  fill="2F80ED"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20.838 5.50565C20.8271 5.39518 20.784 5.28432 20.7085 5.1921C20.6793 5.15644 20.9777 5.45717 16.2552 0.734626C16.1426 0.62205 15.9898 0.562949 15.8406 0.562988C15.4853 0.562988 2.95283 0.562988 2.59885 0.562988C1.62961 0.562988 0.841064 1.35153 0.841064 2.32077V18.8049C0.841064 19.7741 1.62961 20.5627 2.59885 20.5627H19.083C20.0522 20.5627 20.8408 19.7741 20.8408 18.8049C20.8408 4.5791 20.8424 5.55057 20.838 5.50565ZM14.3175 1.73485V5.56291C14.3175 5.88599 14.0546 6.14884 13.7315 6.14884H12.9894V1.73485H14.3175ZM11.8175 1.73485V6.14884H6.3879C6.06481 6.14884 5.80197 5.88599 5.80197 5.56291V1.73485H11.8175ZM14.3175 13.1019H5.80197V12.3597C5.80197 12.0366 6.06481 11.7738 6.3879 11.7738H13.7315C14.0546 11.7738 14.3175 12.0366 14.3175 12.3597V13.1019ZM5.80197 19.3908V14.2737H14.3175V19.3908H5.80197ZM19.6689 18.8049C19.6689 19.128 19.4061 19.3908 19.083 19.3908H15.4893C15.4893 18.627 15.4893 13.2305 15.4893 12.3597C15.4893 11.3904 14.7008 10.6019 13.7315 10.6019L10.0077 10.563L6.3879 10.6019C5.41865 10.6019 4.63011 11.3904 4.63011 12.3597V19.3908H2.59889C2.27581 19.3908 2.01296 19.128 2.01296 18.8049V2.32077C2.01296 1.99769 2.27581 1.73485 2.59889 1.73485H4.63011V5.56291C4.63011 6.53216 5.41865 7.3207 6.3879 7.3207H13.7315C14.7008 7.3207 15.4893 6.53216 15.4893 5.56291V1.73485H15.5982L19.6689 5.80564V18.8049Z"
                    fill="#2F80ED"
                    stroke="#2F80ED"
                    strokeWidth="0.5"
                  />
                </svg>
              </div>
              <div className="separate">
                <svg
                  width="2"
                  height="20"
                  viewBox="0 0 2 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect x="0.228516" width="1" height="20" fill="#0088FF" />
                </svg>
              </div>
              <span>Lưu</span>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
TitleAndAction.defaultProps = {};

export default React.memo(connect(null, null)(TitleAndAction));
