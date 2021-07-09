import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import InfoCustomerLeft from "./InfoCustomerLeft/InfoCustomerLeft";
import InfoCustomerRight from "./InfoCustomerRight/InfoCustomerRight";
import InfoCustomerFooter from "./InfoCustomerFooter/InfoCustomerFooter";
import { updateCustomer, getCustomerById } from "../../actions/customerAction";
import { receiveWard, getWard } from "../../actions/locationActions";
import { useParams } from "react-router-dom";
import pushstate from "utils/pushstate";
import "./styles.scss";
import TitleAndAction from "./TitleAndAction/TitleAndAction";
import { toastError } from "../../../../utils/toast";

const initialState = {
  name: null,
  code: null,
  phone: null,
  email: null,
  address: null,
  city: null,
  ward: null,
  description: null,
};
function CustomerUpdate(props) {
  const {
    onClearWards,
    onSaveCustomer,
    onGetCustomerById,
    onGetWard,
    cities,
    wards,
  } = props;
  const [customer, setCustomer] = useState(initialState);
  const [isValid, setIsValid] = useState(false);
  const [actionSave, setActionSave] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      onGetCustomerById(id).then((json) => {
        if (json) {
          const obj = {
            name: json.name,
            code: json.code,
            phone: json.phone,
            email: json.email,
            address: json.address,
            description: json.description,
            city: null,
            ward: null,
          };
          if (json.ward) {
            const codeWard = json.ward.code;
            onGetWard(json.ward.district.code)
              .then((json) => {
                if (json) {
                  const ward = Object.values(json).find(
                    (item) => item.code === codeWard
                  );
                  obj.ward = ward;
                }
              })
              .then(() => {
                const codeDistrict = json.ward.district.code;
                const district = Object.values(cities).find(
                  (item) => item.code === codeDistrict
                );
                obj.city = district;
                setCustomer(obj);
              });
          } else {
            setCustomer(obj);
          }
        }
      });
    }
  }, []);

  const onChangeCustomer = (type, value) => {
    setActionSave(false);
    if (type === "city") {
      setCustomer(() => {
        return {
          ...customer,
          [type]: value,
          ward: null,
        };
      });
    } else {
      setCustomer(() => {
        return {
          ...customer,
          [type]: value,
        };
      });
    }
  };

  const saveCustomer = () => {
    setActionSave(true);
    if (isValid) {
      toastError("Vui lòng điền đầy đủ thông tin!");
      return;
    }
    if (!customer.city) {
      toastError("Vui lòng chọn khu vực!");
      return;
    }
    if (!customer.ward) {
      toastError("Vui lòng chọn phường xã!");
      return;
    }
    onSaveCustomer(id, customer).then((json) => {
      if (json ) {
        setCustomer(initialState);
        onClearWards();
        pushstate(props.history, "/customers");
      }
    });
  };

  const onChangeStatusValid = (status) => {
    setIsValid(status);
  };

  const cancel = () => {
    setCustomer(initialState);
    onClearWards();
    pushstate(props.history, "/customers");
  };

  return (
    <div className="customer-screen-wrapper-create">
      <TitleAndAction saveCustomer={saveCustomer} cancel={cancel}/>
      <div className="row">
        <div className="col-md-8">
          <InfoCustomerLeft
            actionSave={actionSave}
            onChangeStatusValid={onChangeStatusValid}
            onChangeCustomer={onChangeCustomer}
            customer={customer}
          />
        </div>
        <div className="col-md-4">
          <InfoCustomerRight
            onChangeCustomer={onChangeCustomer}
            customer={customer}
          />
        </div>
      </div>
    </div>
  );
}
CustomerUpdate.defaultProps = {};

const mapStateToProps = (state) => {
  const {
    customer: { customer },
    locations: { city, ward },
  } = state;
  return {
    customer,
    cities: city,
    wards: ward,
  };
};
const mapDispatchToProps = (dispatch) => ({
  onSaveCustomer: (id, customer) => dispatch(updateCustomer(id, customer)),
  onGetWard: (id) => dispatch(getWard(id)),
  onClearWards: () => dispatch(receiveWard([])),
  onGetCustomerById: (id) => dispatch(getCustomerById(id)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CustomerUpdate)
);
