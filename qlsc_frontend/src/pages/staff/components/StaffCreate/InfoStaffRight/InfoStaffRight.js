import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import "./styles.scss";
import { staff_role } from "../../../commons/staffConstants";
function InfoStaffRight(props) {
  const { staff, onChangeStaff, onChangeStatusValidate, actionSave } = props;
  const [showRole, setShowRole] = useState(false);
  const [isInvalidEmail, setIsInvalidEmail] = useState(false);
  const [isInvalidPassword, setIsInvalidPassword] = useState(false);

  useEffect(() => {
    if (actionSave) {
      if (!staff.email) setIsInvalidEmail(true);
      if (!staff.password) setIsInvalidPassword(true);
    }
  }, [actionSave]);

  useEffect(() => {
    if (staff.email) setIsInvalidEmail(false);
  }, [staff.email]);

  useEffect(() => {
    if (staff.password) setIsInvalidPassword(false);
  }, [staff.password]);

  const onBlurEmail = () => {
    if (!staff.email) {
      onChangeStatusValidate(true);
      setIsInvalidEmail(true);
    } else {
      onChangeStatusValidate(false);
    }
  };
  const onBlurPassword = () => {
    if (!staff.password) {
      onChangeStatusValidate(true);
      setIsInvalidPassword(true);
    } else {
      onChangeStatusValidate(false);
    }
  };

  const handleClickRole = (role) => {
    onChangeStaff("role", role.id);
    setShowRole(!showRole);
  };
  const handleTextRole = () => {
    const defaultText = "Chọn vai trò nhân viên";
    if (staff && staff.role) {
      const role = staff_role.find((role) => role.id === staff.role);
      if (role) return role.name;
      return defaultText;
    }
    return defaultText;
  };
  return (
    <div className="info-staff-right">
      <div className="card info-staff-right-01">
        <div className="title">Tài khoản & mật khẩu</div>
        <div className="content">
          <div className="field form-group">
            <span style={{ color: "red", marginRight: "4px" }}>*</span>
            <label className="control-label">Email nhân viên</label>
            <div className="controls">
              <input
                className="input"
                data-tip=""
                data-for="_extends_popup_error"
                name="email"
                style={
                  isInvalidEmail ? { border: "1px solid red" } : {}
                }
                onBlur={() => onBlurEmail()}
                value={staff.email || ""}
                onChange={(e) => onChangeStaff("email", e.target.value)}
                placeholder="Nhập email"
              />
            </div>
          </div>
          <div className="field form-group">
            <span style={{ color: "red", marginRight: "4px" }}>*</span>
            <label className="control-label">Mật khẩu </label>
            <div className="controls">
              <input
                className="input"
                data-tip=""
                data-for="_extends_popup_error"
                type="password"
                name="password"
                style={
                  isInvalidPassword ? { border: "1px solid red" } : {}
                }
                onBlur={() => onBlurPassword()}
                value={staff.password || ""}
                onChange={(e) => onChangeStaff("password", e.target.value)}
                placeholder="Nhập mật khẩu"
              />
            </div>
          </div>
          <div className="field form-group">
            <span style={{ color: "red", marginRight: "4px" }}>*</span>
            <label className="control-label">Vai trò nhân viên</label>
            <div
              className="controls btn-chosse-role"
              type="button"
              onClick={() => setShowRole(!showRole)}
            >
              {handleTextRole()}
              {showRole ? (
                <div className="list-role">
                  {staff_role.map((role) => {
                    const active = role.id === (staff && staff.role);
                    return (
                      <div
                        key={role.id}
                        className="dropdown-item"
                        onClick={() => handleClickRole(role)}
                        style={active ? { background: "#0084ff", color: "#fff" } : {}}
                      >
                        {role.name}
                      </div>
                    );
                  })}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
InfoStaffRight.defaultProps = {};

export default React.memo(connect(null, null)(InfoStaffRight));
